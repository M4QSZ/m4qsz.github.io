import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, extname, sep } from 'node:path';

const dist = resolve('dist');
if (!existsSync(dist)) {
  console.error('Falta dist/. Ejecuta npm run build primero.');
  process.exit(1);
}

function filesIn(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? filesIn(path) : [path];
  });
}

const files = filesIn(dist);
const sourceFiles = ['src', 'public', 'samples', 'scripts'].flatMap((dir) => filesIn(resolve(dir)));
sourceFiles.push(resolve('README.md'), resolve('package.json'), resolve('astro.config.mjs'));
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const errors = [];
if (htmlFiles.length === 0) errors.push('No se encontraron páginas HTML en dist/.');
const sensitive = [
  [/C:\\Users\\/i, 'ruta privada de Windows'],
  [/(?:sk_live_|sk_test_)[A-Za-z0-9]{8,}/, 'clave de pago'],
  [/re_[A-Za-z0-9]{24,}/, 'posible clave de correo'],
  [/(?:service_role|SUPABASE_SERVICE_ROLE_KEY)\s*[:=]/i, 'clave de servicio'],
];

for (const file of [...files, ...sourceFiles]) {
  if (!/\.(?:html|js|mjs|ts|astro|rs|toml|md|css|json|svg|txt|c|h|cpp|hpp|asm|swift|php)$/.test(file)) continue;
  const content = readFileSync(file, 'utf8');
  for (const [pattern, label] of sensitive) {
    if (pattern.test(content)) errors.push(`${file}: ${label}`);
  }
  if (!file.endsWith('.html') || !file.startsWith(dist)) continue;
  if (!/<html\s+lang="(?:es|en)"/.test(content)) errors.push(`${file}: falta idioma HTML`);
  if (!/<main\s+id="contenido"/.test(content)) errors.push(`${file}: falta destino del enlace de salto`);
  for (const match of content.matchAll(/(?:href|src)="(\/[^"#?]*)[^\"]*"/g)) {
    const pathname = decodeURIComponent(match[1]);
    if (pathname.startsWith('//')) continue;
    const destination = resolve(dist, `.${pathname}`);
    if (!destination.startsWith(`${dist}${sep}`) && destination !== dist) {
      errors.push(`${file}: enlace fuera de dist: ${pathname}`);
      continue;
    }
    const target = extname(destination) ? destination : join(destination, 'index.html');
    if (!existsSync(target)) errors.push(`${file}: enlace inexistente: ${pathname}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Revisión local correcta: ${htmlFiles.length} páginas, enlaces internos y patrones sensibles en sitio y código público.`);
