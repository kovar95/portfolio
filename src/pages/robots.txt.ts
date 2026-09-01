import type { APIRoute } from 'astro';

/** Cloudflare Pages sets CF_PAGES_BRANCH on every build. */
const PRODUCTION_BRANCHES = ['main', 'master'];
const branch = process.env.CF_PAGES_BRANCH;
const isPreviewDeploy = Boolean(branch) && !PRODUCTION_BRANCHES.includes(branch!);

/**
 * Generated from `site` so the sitemap URL can never drift out of sync with the
 * configured domain (a hand-written public/robots.txt silently would).
 *
 * Preview deployments live on *.pages.dev and serve the same content as
 * production, so they are kept out of the index to avoid duplicate content.
 */
export const GET: APIRoute = ({ site }) => {
  const lines = isPreviewDeploy
    ? ['User-agent: *', 'Disallow: /']
    : ['User-agent: *', 'Allow: /'];

  if (site && !isPreviewDeploy) {
    lines.push('', `Sitemap: ${new URL('sitemap-index.xml', site).href}`);
  }

  return new Response(`${lines.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
