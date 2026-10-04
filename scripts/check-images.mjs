/*
  Valida que toda ruta /assets/... escrita en el código exista en public/.

  Nace de un caso real: se borraron imágenes del repo y el catálogo se quedó
  apuntando a ellas. Next no falla el build por una imagen ausente — se ve como
  un hueco en la página, así que nadie se entera hasta que un cliente lo ve.

  Uso: npm run check:images
*/
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const PUBLIC = join(ROOT, 'public');

/* Rutas absolutas a assets dentro de comillas simples, dobles o backticks. */
const ASSET_RE = /['"`](\/assets\/[^'"`]+?\.(?:webp|png|jpg|jpeg|svg|avif|gif))['"`]/g;

const collectFiles = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? collectFiles(full) : full;
  });

const sourceFiles = collectFiles(SRC).filter((f) => /\.(ts|tsx|js|jsx|json)$/.test(f));

/* Una ruta puede repetirse en varios sitios; se agrupan para no gritar dos veces. */
const missing = new Map();
let checked = 0;

for (const file of sourceFiles) {
  const content = readFileSync(file, 'utf8');

  for (const [, assetPath] of content.matchAll(ASSET_RE)) {
    checked += 1;
    if (existsSync(join(PUBLIC, assetPath))) continue;

    const where = missing.get(assetPath) ?? [];
    where.push(relative(ROOT, file));
    missing.set(assetPath, where);
  }
}

if (missing.size === 0) {
  console.log(`✔ ${checked} rutas de imagen verificadas, todas existen en public/`);
  process.exit(0);
}

console.error(`✘ ${missing.size} imagen(es) referenciada(s) que no existen en public/\n`);

for (const [assetPath, files] of missing) {
  console.error(`  ${assetPath}`);
  for (const file of [...new Set(files)]) console.error(`      ← ${file}`);
}

console.error(`\n${checked} rutas revisadas.`);
process.exit(1);
