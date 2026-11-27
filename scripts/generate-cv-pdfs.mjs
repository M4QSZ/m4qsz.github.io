import { createServer } from 'node:http';
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { tmpdir } from 'node:os';
import { extname, join, resolve } from 'node:path';

const execFileAsync = promisify(execFile);

const distDir = resolve('dist');
const publicDir = resolve('public');
if (!existsSync(distDir)) {
  console.error('Missing dist/. Run `npm run build` first.');
  process.exit(1);
}

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
  console.error('No headless Chromium/Edge/Chrome found for CV PDF generation.');
  process.exit(1);
}

const targets = [
  { route: '/cv/', out: join(publicDir, 'cv-miguel-quevedo-es.pdf') },
  { route: '/en/cv/', out: join(publicDir, 'cv-miguel-quevedo-en.pdf') },
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
const profileDir = mkdtempSync(join(tmpdir(), 'cv-pdf-'));

try {
  for (const { route, out } of targets) {
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
        `--print-to-pdf=${out}`,
        `${baseUrl}${route}`,
      ],
      { timeout: 25_000 },
    );
    const pdfRaw = readFileSync(out).toString('latin1');
    const pages = (pdfRaw.match(/\/Type\s*\/Page\b/g) || []).length;
    const kb = (statSync(out).size / 1024).toFixed(1);
    console.log(`Generated ${out} (${pages} pages, ${kb} KB)`);
  }
} finally {
  server.close();
  try {
    rmSync(profileDir, { recursive: true, force: true });
  } catch {}
}
