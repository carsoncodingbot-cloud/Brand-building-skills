// Zero-dependency static site generator. `node build.mjs` -> dist/
import { mkdirSync, rmSync, writeFileSync, readFileSync, cpSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, REDIRECTS, STATES } from './src/data.mjs';
import { page, abs } from './src/lib.mjs';
import { pages, notFound } from './src/pages.mjs';

const root = dirname(fileURLToPath(import.meta.url)), dist = join(root, 'dist');
rmSync(dist, { recursive: true, force: true }); mkdirSync(join(dist, 'assets'), { recursive: true });
cpSync(join(root, 'public'), dist, { recursive: true });

const css = readFileSync(join(root, 'src/site.css'), 'utf8').replace('/*QUIZ_CSS*/', readFileSync(join(root, 'src/quiz.css'), 'utf8'));
writeFileSync(join(dist, 'assets/site.css'), css);
writeFileSync(join(dist, 'assets/site.js'), readFileSync(join(root, 'src/site.js'), 'utf8'));
writeFileSync(join(dist, 'assets/quiz.js'), readFileSync(join(root, 'src/quiz.js'), 'utf8'));
writeFileSync(join(dist, 'assets/popup.js'), readFileSync(join(root, 'src/popup.js'), 'utf8'));

const states = Object.fromEntries(STATES.map((s) => [s.ab, s.name]));
const out = (path, html) => { const f = path.endsWith('.html') ? join(dist, path) : join(dist, path, 'index.html'); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, html); };
const seen = new Set(), sm = [];
for (const p of [...pages, notFound]) {
  if (seen.has(p.path)) throw new Error('duplicate path ' + p.path); seen.add(p.path);
  let html = page({ ...p, states });
  out(p.path, html);
  if (!p.noindex && p.path !== '/404.html') sm.push(p.path);
}
writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sm.map((u) => `<url><loc>${abs(u)}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);
writeFileSync(join(dist, '_redirects'), REDIRECTS.map(([a, b]) => `${a} ${b} 301`).join('\n') + '\n');
writeFileSync(join(dist, '_headers'), '/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n/fonts/*\n  Cache-Control: public, max-age=31536000, immutable\n');
console.log(`built ${pages.length + 1} pages, ${sm.length} in sitemap -> dist/`);
