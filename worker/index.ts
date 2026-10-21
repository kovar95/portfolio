/**
 * The site is static; this Worker only sees /api/* (run_worker_first in
 * wrangler.jsonc). POST /api/inquiry checks the Turnstile token and emails the
 * services-page inquiry to the INQUIRY_TO address.
 */

const ACTION = 'inquiry';
const SITEVERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const FROM = { email: 'website@kovar95.dev', name: 'kovar95.dev' };
const MAX_BODY_BYTES = 32 * 1024;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = { name: 100, email: 200, phone: 40, website: 200, service: 80, message: 5000 } as const;
type Field = keyof typeof LIMITS;

type Siteverify = {
  success?: boolean;
  'error-codes'?: string[];
  action?: string;
  hostname?: string;
  metadata?: { result_with_testing_key?: boolean };
};

const json = (body: { ok: boolean; error?: string }, status = 200) => Response.json(body, { status });

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/inquiry') {
      if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
      }
      return handleInquiry(request, env);
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

async function handleInquiry(request: Request, env: Env): Promise<Response> {
  if (Number(request.headers.get('Content-Length') ?? 0) > MAX_BODY_BYTES) {
    return json({ ok: false, error: 'invalid' }, 413);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: 'invalid' }, 400);
  }

  const value = (field: Field) => {
    const raw = form.get(field);
    return typeof raw === 'string' ? raw.trim() : '';
  };
  const data = Object.fromEntries(
    (Object.keys(LIMITS) as Field[]).map((field) => [field, value(field)]),
  ) as Record<Field, string>;

  const tooLong = (Object.keys(LIMITS) as Field[]).some((field) => data[field].length > LIMITS[field]);
  if (!data.name || !data.message || !EMAIL.test(data.email) || tooLong) {
    return json({ ok: false, error: 'invalid' }, 400);
  }

  if (!(await verifyTurnstile(form.get('cf-turnstile-response'), request, env))) {
    return json({ ok: false, error: 'verification' }, 403);
  }

  const lang = form.get('lang') === 'sr' ? 'srpska' : 'engleska';
  try {
    await env.MAILER.send({
      to: env.INQUIRY_TO,
      from: FROM,
      replyTo: data.email,
      subject: oneLine(`Upit sa sajta: ${data.service || 'usluga nije izabrana'} — ${data.name}`),
      text: [
        `Novi upit sa kovar95.dev (${lang} verzija stranice)`,
        '',
        `Ime: ${data.name}`,
        `Email: ${data.email}`,
        `Telefon: ${data.phone || '—'}`,
        `Sajt: ${data.website || '—'}`,
        `Usluga: ${data.service || '—'}`,
        '',
        data.message,
        '',
        '— Odgovor na ovaj mejl ide direktno pošiljaocu.',
      ].join('\n'),
    });
  } catch (error) {
    console.error('Sending the inquiry email failed', error);
    return json({ ok: false, error: 'send' }, 502);
  }

  return json({ ok: true });
}

/** Canonical server-side siteverify. Any failure, including a network error, rejects. */
async function verifyTurnstile(token: unknown, request: Request, env: Env) {
  const hostnames = new Set(
    (env.TURNSTILE_HOSTNAMES ?? '')
      .split(',')
      .map((hostname) => hostname.trim())
      .filter(Boolean),
  );
  if (typeof token !== 'string' || token.length === 0 || token.length > 2048 || hostnames.size === 0) {
    return false;
  }

  const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token });
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) body.set('remoteip', ip);

  let result: Siteverify;
  try {
    const response = await fetch(SITEVERIFY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return false;
    result = await response.json();
  } catch {
    return false;
  }

  /* Turnstile's test keys return no action. Accepting them is opt-in and only
     set in the local .dev.vars; a production secret never yields such tokens. */
  const testKey =
    env.TURNSTILE_ALLOW_TEST_KEYS === 'true' && result.metadata?.result_with_testing_key === true;

  const ok =
    result.success === true &&
    (testKey || result.action === ACTION) &&
    hostnames.has(result.hostname ?? '');
  if (!ok) {
    /* No token or secret in here — just enough to tell a bot from a misconfiguration. */
    console.warn('Turnstile rejected the inquiry', {
      errors: result['error-codes'],
      action: result.action,
      hostname: result.hostname,
    });
  }
  return ok;
}

/** Keeps user input from adding lines to the subject header. */
const oneLine = (text: string) => text.replace(/[\r\n]+/g, ' ').slice(0, 200);
