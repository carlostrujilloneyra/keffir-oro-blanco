/*
  Storyboard: un PNG por escena, tomado en el segundo `foto` de cada escena (su frame más cargado).
  Uso: npm run storyboard            → los dos videos
       npm run storyboard natural    → solo una variante
       npm run storyboard natural 03 → solo las escenas cuyo id empieza por "03"
  Son fotos fijas (renderStill), no un render de video. --gl=angle es necesario por las escenas 3D.
*/
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import {mkdirSync} from 'fs';
import {createRequire} from 'module';
import path from 'path';
import {VARIANTES} from './variantes.mjs';

const [soloVariante, soloEscena] = process.argv.slice(2);
const raiz = path.resolve(import.meta.dirname, '..');
const salida = path.join(raiz, 'storyboard');
mkdirSync(salida, {recursive: true});

const serveUrl = await bundle({entryPoint: path.join(raiz, 'src/index.ts'), publicDir: path.join(raiz, 'public')});
const chromiumOptions = {gl: 'angle'};

// Hoja de contacto: todas las escenas de un video en una sola imagen (sharp viene del proyecto de al lado).
async function hoja(archivos, destino) {
  const sharp = createRequire(path.join(raiz, '../node_modules/'))('sharp');
  const cols = Math.ceil(archivos.length / 2), W = 432, H = 768, g = 12;
  const piezas = await Promise.all(archivos.map(async (f, i) => ({input: await sharp(f).resize(W, H).toBuffer(), left: g + (i % cols) * (W + g), top: g + Math.floor(i / cols) * (H + g)})));
  await sharp({create: {width: g + cols * (W + g), height: g + 2 * (H + g), channels: 3, background: '#111111'}}).composite(piezas).jpeg({quality: 88}).toFile(destino);
  console.log(path.basename(destino));
}

for (const [variante, {id}] of Object.entries(VARIANTES)) {
  if (soloVariante && soloVariante !== variante) continue;
  const hechas = [];
  const composition = await selectComposition({serveUrl, id, chromiumOptions});
  for (const e of composition.props.escenas) {
    if (soloEscena && !e.id.startsWith(soloEscena)) continue;
    for (const [i, seg] of e.foto.entries()) {
      const nombre = `${variante}-${e.id}${e.foto.length > 1 ? `-${i + 1}` : ''}.png`;
      await renderStill({composition, serveUrl, output: path.join(salida, nombre), frame: Math.min(composition.durationInFrames - 1, Math.round(seg * composition.fps)), chromiumOptions});
      console.log(nombre, `· ${seg.toFixed(2)} s`);
      hechas.push(path.join(salida, nombre));
    }
  }
  if (!soloEscena) await hoja(hechas, path.join(salida, `_hoja-${variante}.jpg`));
}
