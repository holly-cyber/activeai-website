// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://weareactiveai.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    // Placeholder legal pages are noindex until the live text is ported.
    sitemap({ filter: (page) => !/\/(404|privacy|cookies)$/.test(page) }),
  ],
});
