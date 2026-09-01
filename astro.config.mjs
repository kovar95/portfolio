// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * The public origin. It makes the canonical link, the hreflang alternates, the OG
 * image URL, the sitemap and robots.txt absolute.
 * SITE_URL can override it (e.g. to build against a staging origin).
 */
const site = process.env.SITE_URL ?? 'https://kovar95.dev';

export default defineConfig({
  site,
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', sr: 'sr-RS' },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
});
