// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/data/site-url.mjs';

// Keystone 7A: static output, no adapter on Vercel. Framework Preset must be set
// explicitly in the Vercel project (Astro) or every route returns a platform 404.
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [
    sitemap({
      // Self-growing: the sitemap maps over the same routes the pages generate from.
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      lastmod: new Date('2026-08-17'),
    }),
  ],
  markdown: {
    shikiConfig: { theme: 'github-light', wrap: true },
  },
});
