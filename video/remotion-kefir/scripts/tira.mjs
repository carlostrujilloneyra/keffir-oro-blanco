/*
  Tira de frames para revisar el movimiento sin renderizar video: fotos pequeñas en los segundos que se pidan.
  Uso: node scripts/tira.mjs natural 0 0.1 0.2 0.4      → out/tira-natural.jpg
       node scripts/tira.mjs frutado 9.3:10.2:0.1       → rango desde:hasta:paso
*/
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import {mkdirSync} from 'fs';
import {createRequire} from 'module';
import path from 'path';

const [variante, ...args] = process.argv.slice(2);
const raiz = path.resolve(import.meta.dirname, '..');
mkdirSync(path.join(raiz, 'out/tira'), {recursive: true});
const tiempos = args.flatMap((a) => {
  if (!a.includes(':')) return [+a];
  const [d, h, p] = a.split(':').map(Number), r = [];
  for (let t = d; t <= h + 1e-6; t += p) r.push(+t.toFixed(3));
  return r;
});
const serveUrl = await bundle({entryPoint: path.join(raiz, 'src/index.ts'), publicDir: path.join(raiz, 'public')});
const chromiumOptions = {gl: 'angle'};
const composition = await selectComposition({serveUrl, id: variante === 'natural' ? 'KefirNatural' : 'KefirFrutado', chromiumOptions});
const archivos = [];
for (const t of tiempos) {
  const output = path.join(raiz, `out/tira/${variante}-${t.toFixed(2)}.jpg`);
  await renderStill({composition, serveUrl, output, frame: Math.min(composition.durationInFrames - 1, Math.round(t * composition.fps)), chromiumOptions, scale: 0.3, imageFormat: 'jpeg', jpegQuality: 86});
  archivos.push([t, output]);
}
const sharp = createRequire(path.join(raiz, '../node_modules/'))('sharp');
const cols = Math.min(8, archivos.length), W = 324, H = 576, g = 6;
const piezas = archivos.map(([t, f], i) => [
  {input: f, left: g + (i % cols) * (W + g), top: g + Math.floor(i / cols) * (H + g)},
  {input: Buffer.from(`<svg width="90" height="30"><rect width="90" height="30" fill="#000"/><text x="6" y="22" font-size="20" font-family="Helvetica" fill="#ff0">${t.toFixed(2)}</text></svg>`), left: g + (i % cols) * (W + g), top: g + Math.floor(i / cols) * (H + g)},
]).flat();
const destino = path.join(raiz, `out/tira-${variante}.jpg`);
await sharp({create: {width: g + cols * (W + g), height: g + Math.ceil(archivos.length / cols) * (H + g), channels: 3, background: '#111111'}}).composite(piezas).jpeg({quality: 86}).toFile(destino);
console.log(destino);
