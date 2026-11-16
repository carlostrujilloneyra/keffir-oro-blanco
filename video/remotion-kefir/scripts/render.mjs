/*
  Render completo de una variante: video mudo (Remotion) + mezcla de audio (ffmpeg) + unión.
  Uso: node scripts/render.mjs natural --prueba   → out/kefir-natural-720p.mp4 (prueba rápida a 720x1280)
       node scripts/render.mjs natural            → out/kefir-natural.mp4 y out/kefir-natural-sin-musica.mp4 (1080x1920)
*/
import {spawnSync} from 'child_process';
import path from 'path';
import {NOMBRES, VARIANTES} from './variantes.mjs';

const variante = process.argv[2];
const prueba = process.argv.includes('--prueba');
if (!VARIANTES[variante]) throw new Error(`Uso: node scripts/render.mjs <${NOMBRES}> [--prueba]`);

const raiz = path.resolve(import.meta.dirname, '..');
const correr = (cmd, args) => {
  const r = spawnSync(cmd, args, {cwd: raiz, stdio: 'inherit'});
  if (r.status !== 0) process.exit(r.status ?? 1);
};

const {id} = VARIANTES[variante];
const base = `out/kefir-${variante}${prueba ? '-720p' : ''}`;
// --gl=angle por las escenas 3D; --muted porque el audio se mezcla aparte
correr('npx', ['remotion', 'render', 'src/index.ts', id, `${base}-mudo.mp4`, '--muted', '--gl=angle', '--crf=17', ...(prueba ? [`--scale=${2 / 3}`] : [])]);

const unir = (wav, salida) =>
  correr('ffmpeg', ['-y', '-v', 'error', '-i', `${base}-mudo.mp4`, '-i', wav, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', salida]);

correr('node', ['scripts/mezcla.mjs', variante]);
unir(`out/mezcla-${variante}.wav`, `${base}.mp4`);
if (!prueba) {
  correr('node', ['scripts/mezcla.mjs', variante, '--sin-musica']);
  unir(`out/mezcla-${variante}-sin-musica.wav`, `${base}-sin-musica.mp4`);
}
console.log(`Listo: ${base}.mp4`);
