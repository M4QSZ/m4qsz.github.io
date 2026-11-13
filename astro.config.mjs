import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL || 'https://m4qsz.github.io';

export default defineConfig({
  output: 'static',
  site,
});
