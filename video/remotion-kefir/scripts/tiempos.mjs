/*
  Imprime la escaleta ya ajustada al ritmo: inicio de cada escena, si el corte cayó en golpe,
  medio golpe o quedó con la voz, y cuánto se recorta la música. Uso: node scripts/tiempos.mjs [variante] [--cues]
*/
import {bundle} from '@remotion/bundler';
import {selectComposition} from '@remotion/renderer';
import path from 'path';
import {VARIANTES} from './variantes.mjs';

const raiz = path.resolve(import.meta.dirname, '..');
const serveUrl = await bundle({entryPoint: path.join(raiz, 'src/index.ts'), publicDir: path.join(raiz, 'public')});
for (const [variante, {id}] of Object.entries(VARIANTES)) {
  const solo = process.argv.slice(2).find((x) => !x.startsWith('--'));
  if (solo && solo !== variante) continue;
  const {props, durationInFrames, fps} = await selectComposition({serveUrl, id, chromiumOptions: {gl: 'angle'}});
  console.log(`\n${id} · ${(durationInFrames / fps).toFixed(2)} s · música desde ${props.musicaDesde} s`);
  for (const e of props.escenas) {
    console.log(`  ${e.inicio.toFixed(3).padStart(7)}  ${(e.enGolpe ?? 'inicio').padEnd(6)}  ${e.id}`);
    const cues = [...Object.entries(e.cues), ...(e.lista ?? []).map((it) => [it.txt, it.en])];
    if (process.argv.includes('--cues')) console.log('           ' + cues.map(([k, v]) => `${k} ${v}`).join(' · '));
  }
}
