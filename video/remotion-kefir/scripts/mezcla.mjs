/*
  Mezcla de audio con ffmpeg: voz (pista maestra) + música con ducking al 30 % bajo la voz + efectos en los cortes.
  Los tiempos salen de la composición ya ajustada al ritmo (los mismos que usa el video), así nada se desfasa.
  Uso: node scripts/mezcla.mjs natural              → out/mezcla-natural.wav
       node scripts/mezcla.mjs natural --sin-musica → out/mezcla-natural-sin-musica.wav
*/
import {bundle} from '@remotion/bundler';
import {selectComposition} from '@remotion/renderer';
import {spawnSync} from 'child_process';
import {mkdirSync, readFileSync} from 'fs';
import path from 'path';

const variante = process.argv[2];
const sinMusica = process.argv.includes('--sin-musica');
if (!['natural', 'frutado'].includes(variante)) throw new Error('Uso: node scripts/mezcla.mjs <natural|frutado> [--sin-musica]');

const raiz = path.resolve(import.meta.dirname, '..');
const SFX = path.resolve(raiz, '../assets/sfx');
mkdirSync(path.join(raiz, 'out'), {recursive: true});

const serveUrl = await bundle({entryPoint: path.join(raiz, 'src/index.ts'), publicDir: path.join(raiz, 'public')});
const comp = await selectComposition({serveUrl, id: variante === 'natural' ? 'KefirNatural' : 'KefirFrutado', chromiumOptions: {gl: 'angle'}});
const {escenas, musicaDesde, voz, musica} = comp.props;
const DUR = comp.durationInFrames / comp.fps;

// Efectos: [archivo, segundo, volumen, duración máxima, fundido de entrada]. Sutiles; los woosh van en los cortes.
const ev = [];
const fx = (nombre, t, vol, largo, entrada) => ev.push([nombre, Math.max(0, t), vol, largo, entrada]);
escenas.forEach((e, i) => {
  const c = e.cues, lista = e.lista ?? [];
  if (i) fx('woosh', e.inicio - 0.2, 0.15);
  if (e.tipo === 'ganchoNatural') fx('splash', 0, 0.3);
  if (e.tipo === 'queEs') fx('pop', c.cien, 0.2);
  if (e.tipo === 'beneficios') lista.forEach((b) => fx('pop', b.en, 0.12));
  if (e.tipo === 'diferencia') lista.forEach((b) => fx('pop', b.en + 0.1, 0.11));
  if (e.tipo === 'servido') {
    fx('destape', c.inclina - 0.45, 0.26);
    // el efecto dura 2 s y el servido unos 3: se encadenan dos tomas con fundido
    const largo = c.lleno - c.sirve + 0.3;
    fx('vertido', c.sirve, 0.3, Math.min(largo, 1.9));
    if (largo > 1.9) fx('vertido', c.sirve + 1.5, 0.26, largo - 1.5, 0.35);
  }
  if (e.tipo === 'primeraVez') fx('brindis', e.inicio + 0.12, 0.18);
  if (e.tipo === 'combinalo') [c.granola, c.cereales, c.frutas].forEach((t) => fx('pop', t, 0.15));
  if (e.tipo === 'cierre') {
    fx('burbujas', e.inicio, 0.1);
    [c.g1, c.g2, c.g3].forEach((t) => fx('pop', t, 0.09));
  }
  if (e.tipo === 'ganchoFrutado') fx('splash', 0.05, 0.3);
  if (e.tipo === 'frutaDeVerdad') {
    fx('pop', c.sin1, 0.12);
    fx('pop', c.sin2, 0.12);
    fx('splash', c.color - 0.22, 0.26);
  }
  if (e.tipo === 'sabor') {
    fx('vertido', e.inicio + 0.1, 0.24, 1.7);
    fx('pop', c.pulpa, 0.11);
  }
  if (e.tipo === 'frutosDelBosque') {
    fx('splash', e.inicio - 0.1, 0.22);
    fx('pop', c.pedido, 0.2);
    fx('pop', c.cuatro, 0.2);
    lista.forEach((b) => fx('pop', b.en, 0.11));
  }
  if (e.tipo === 'chocolate') fx('splash', e.inicio - 0.1, 0.2);
  if (e.tipo === 'todos') [0, 1, 2, 3].forEach((k) => fx('pop', e.inicio + 0.1 + k * 0.09, 0.1));
});

// Tramos con voz: todo lo que no sea un silencio de más de 0.7 s. Ahí la música baja al 30 %.
const silencios = JSON.parse(readFileSync(path.join(raiz, 'src/datos/silencios.json'), 'utf8'))[variante];
const durVoz = +spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path.join(raiz, 'public', voz)], {encoding: 'utf8'}).stdout;
const habla = [];
let desde = 0;
for (const [a, b] of [...silencios, [durVoz, durVoz + 99]]) {
  if (b - a > 0.7) {
    if (a - desde > 0.2) habla.push([desde, a]);
    desde = b;
  }
}
const BASE = 0.6, DUCK = 0.3;
// 1 fuera de la voz, 0 dentro, con rampas de 0.3 s para que el cambio no se oiga
const libre = habla.map(([a, b]) => `max(clip((${a.toFixed(2)}-t)/0.3,0,1),clip((t-${b.toFixed(2)})/0.4,0,1))`).reduce((x, y) => `min(${x},${y})`, '1');

const entradas = ['-i', path.join(raiz, 'public', voz)];
const filtros = ['[0:a]aformat=channel_layouts=stereo,volume=1.15,acompressor=threshold=0.12:ratio=2.5:attack=5:release=120[v]'];
const pistas = ['[v]'];
let n = 1;
if (!sinMusica) {
  entradas.push('-ss', String(musicaDesde), '-i', path.join(raiz, 'public', musica));
  filtros.push(`[${n}:a]aformat=channel_layouts=stereo,atrim=0:${DUR},volume='${BASE}*(${DUCK}+${1 - DUCK}*${libre})':eval=frame,afade=t=in:d=0.12,afade=t=out:st=${(DUR - 1.3).toFixed(2)}:d=1.3[m]`);
  pistas.push('[m]');
  n++;
}
const sx = [];
for (const [nombre, t, vol, largo, entrada] of ev) {
  entradas.push('-i', path.join(SFX, `${nombre}.mp3`));
  const corte = (largo ? `atrim=0:${largo.toFixed(2)},afade=t=out:st=${(largo - 0.3).toFixed(2)}:d=0.3,` : '') + (entrada ? `afade=t=in:d=${entrada},` : '');
  filtros.push(`[${n}:a]aformat=channel_layouts=stereo,${corte}volume=${vol},adelay=${Math.round(t * 1000)}:all=1[s${n}]`);
  sx.push(`[s${n}]`);
  n++;
}
filtros.push(`${sx.join('')}amix=inputs=${sx.length}:normalize=0[sx]`);
pistas.push('[sx]');
filtros.push(`${pistas.join('')}amix=inputs=${pistas.length}:normalize=0:duration=longest,atrim=0:${DUR},alimiter=limit=0.95,loudnorm=I=-14:TP=-1:LRA=9[a]`);

const salida = path.join(raiz, `out/mezcla-${variante}${sinMusica ? '-sin-musica' : ''}.wav`);
const r = spawnSync('ffmpeg', ['-y', '-v', 'error', ...entradas, '-filter_complex', filtros.join(';'), '-map', '[a]', '-ac', '2', '-ar', '48000', salida], {stdio: 'inherit'});
if (r.status !== 0) process.exit(r.status ?? 1);
console.log(`${path.relative(raiz, salida)} · ${DUR.toFixed(2)} s · ${ev.length} efectos · música desde ${musicaDesde} s${sinMusica ? ' (sin música)' : `, al ${DUCK * 100} % de su nivel mientras hay voz`}`);
