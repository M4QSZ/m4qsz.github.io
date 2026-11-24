import type { APIRoute } from 'astro';
import { englishProjects } from '../data/english';
import { labSamples } from '../data/labSamples';

const labPaperSlugs = [
  'cockpit-paper',
  'cockpit-zero-vision',
  'cockpit-distributed',
  'cockpit-algebraic-compression',
  'meson-finance-erp',
  'meson-management-erp',
  'meson-offline-mesh',
  'meson-rust-edge',
  'cockpit-resilience-fingerprinting',
  'cockpit-rtk-telemetry-pipelines',
];

const staticRoutes = [
  '/',
  '/en/',
  '/cv/',
  '/en/cv/',
  '/laboratorio/',
  '/en/lab/',
  ...labPaperSlugs.map((slug) => `/laboratorio/${slug}/`),
  ...labPaperSlugs.map((slug) => `/en/lab/${slug}/`),
  '/muestras/sync-local/',
  '/en/samples/local-sync/',
  ...labSamples.map((sample) => `/muestras/${sample.slug}/`),
  ...labSamples.map((sample) => `/en/samples/${sample.slug}/`),
  ...englishProjects.map((project) => `/proyectos/${project.slug}/`),
  ...englishProjects.map((project) => `/en/projects/${project.slug}/`),
];

export const GET: APIRoute = ({ site }) => {
  const base = site ? site.toString().replace(/\/$/, '') : 'https://m4qsz.github.io';
  const urls = staticRoutes
    .map((route) => `  <url><loc>${base}${route}</loc></url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
