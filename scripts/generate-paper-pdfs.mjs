import { createServer } from 'node:http';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { tmpdir } from 'node:os';
import { extname, join, resolve } from 'node:path';

const execFileAsync = promisify(execFile);

const distDir = resolve('dist');
const outDir = resolve('public/papers');
if (!existsSync(distDir)) {
  console.error('Missing dist/. Run `npm run build` first.');
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

const browserCandidates = [
  process.env.PDF_BROWSER,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome',
].filter(Boolean);

const browser = browserCandidates.find((p) => existsSync(p));
if (!browser) {
  console.error('No headless Chromium/Edge/Chrome found for PDF generation.');
  process.exit(1);
}

// Keep Paper 1's bespoke `cockpit-orchestrator-paper.pdf` untouched; generate crisp print-ready
// A4 PDFs directly from the built English technical report pages for Papers 2..17.
const papers = [
  'cockpit-zero-vision',
  'cockpit-distributed',
  'cockpit-algebraic-compression',
  'meson-finance-erp',
  'meson-management-erp',
  'meson-offline-mesh',
  'meson-rust-edge',
  'cockpit-resilience-fingerprinting',
  'cockpit-rtk-telemetry-pipelines',
  'meson-nosql-to-sql',
  'certified-arith-preproc',
  'certified-disjunctive-interpolants',
  'certified-veronese-homological-prg',
  'meson-edge-nlu-automation',
  'meson-brasas-game-architecture',
  'axion-biomechanical-input-telemetry',
];

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
};

const server = createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  let filePath = join(distDir, urlPath);
  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, 'index.html');
  }
  if (!existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  const type = mimeTypes[extname(filePath)] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': type });
  res.end(readFileSync(filePath));
});

await new Promise((r) => server.listen(0, '127.0.0.1', r));
const { port } = server.address();
const baseUrl = `http://127.0.0.1:${port}`;

const profileDir = mkdtempSync(join(tmpdir(), 'paper-pdf-'));

try {
  for (const slug of papers) {
    const outPdf = join(outDir, `${slug}.pdf`);
    const url = `${baseUrl}/en/lab/${slug}/`;
    await execFileAsync(
      browser,
      [
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--no-first-run',
        '--disable-extensions',
        '--disable-background-networking',
        '--disable-sync',
        `--user-data-dir=${profileDir}`,
        '--no-pdf-header-footer',
        '--virtual-time-budget=2500',
        `--print-to-pdf=${outPdf}`,
        url,
      ],
      { timeout: 25_000 },
    );
    const kb = (statSync(outPdf).size / 1024).toFixed(1);
    console.log(`Generated public/papers/${slug}.pdf (${kb} KB)`);
  }
} finally {
  server.close();
  try {
    rmSync(profileDir, { recursive: true, force: true });
  } catch {}
}
