/*
  Mezcla de audio con ffmpeg: voz (pista maestra) + música con ducking al 30 % bajo la voz + efectos en los cortes y golpes.
  Los tiempos salen de la composición ya ajustada al ritmo (los mismos que usa el video), así nada se desfasa.
  Uso: node scripts/mezcla.mjs natural              → out/mezcla-natural.wav
       node scripts/mezcla.mjs natural --sin-musica → out/mezcla-natural-sin-musica.wav
*/
import {bundle} from '@remotion/bundler';
import {selectComposition} from '@remotion/renderer';
import {spawnSync} from 'child_process';
import {mkdirSync, readFileSync} from 'fs';
import path from 'path';
import {NOMBRES, VARIANTES} from './variantes.mjs';

const variante = process.argv[2];
const sinMusica = process.argv.includes('--sin-musica');
if (!VARIANTES[variante]) throw new Error(`Uso: node scripts/mezcla.mjs <${NOMBRES}> [--sin-musica]`);

const raiz = path.resolve(import.meta.dirname, '..');
const SFX = path.resolve(raiz, '../assets/sfx');
mkdirSync(path.join(raiz, 'out'), {recursive: true});

const serveUrl = await bundle({entryPoint: path.join(raiz, 'src/index.ts'), publicDir: path.join(raiz, 'public')});
const comp = await selectComposition({serveUrl, id: VARIANTES[variante].id, chromiumOptions: {gl: 'angle'}});
const {escenas, musicaDesde, voz, musica} = comp.props;
const DUR = comp.durationInFrames / comp.fps;

// Efectos: [archivo, segundo, volumen, duración máxima, fundido de entrada]. Cada corte suena según su transición y los golpes van en su cue.
const ev = [];
const fx = (nombre, t, vol, largo, entrada) => ev.push([nombre, Math.max(0, t), vol, largo, entrada]);
const CORTE = {
  ola: (t) => fx('woosh', t - 0.2, 0.15),
  fundido: (t) => fx('woosh', t - 0.22, 0.08),
  whip: (t) => fx('whip', t - 0.14, 0.34),
  whipIzq: (t) => fx('whip', t - 0.14, 0.34),
  flash: (t) => fx('impacto', t - 0.04, 0.24),
  zoom: (t) => {
    fx('woosh', t - 0.26, 0.17);
    fx('impacto', t - 0.02, 0.2);
  },
};
escenas.forEach((e, i) => {
  const c = e.cues, lista = e.lista ?? [];
  if (i) CORTE[e.transicion ?? 'ola'](e.inicio);
  if (e.tipo === 'ganchoNatural') {
    fx('splash', 0, 0.3);
    fx('impacto', c.golpe - 0.03, 0.5);
  }
  if (e.tipo === 'queEs') {
    fx('pop', c.mano, 0.14);
    fx('pop', c.lote, 0.11);
  }
  if (e.tipo === 'beneficios') lista.forEach((b) => fx('pop', b.en, 0.14));
  if (e.tipo === 'sinAnadidos') {
    fx('pop', c.sin1, 0.12);
    fx('pop', c.sin2, 0.12);
    fx('sello', c.sello + 0.12, 0.3);
  }
  if (e.tipo === 'origen') {
    fx('pop', c.c1, 0.11);
    fx('pop', c.c2, 0.11);
  }
  if (e.tipo === 'lactosa') {
    fx('splash', e.inicio + 0.05, 0.16);
    fx('pop', c.c1, 0.11);
    fx('woosh', c.cabra - 0.25, 0.08);
    fx('pop', c.c2, 0.11);
  }
  if (e.tipo === 'servido') {
    fx('destape', c.inclina - 0.45, 0.26);
    // el efecto dura 2 s y el servido algo más: se encadenan dos tomas con fundido
    const largo = c.lleno - c.sirve + 0.3;
    fx('vertido', c.sirve, 0.3, Math.min(largo, 1.9));
    if (largo > 1.9) fx('vertido', c.sirve + 1.5, 0.26, largo - 1.5, 0.35);
    fx('pop', c.lleno, 0.16);
    lista.forEach((b) => fx('pop', b.en, 0.1));
  }
  if (e.tipo === 'combinalo') lista.forEach((b) => fx('pop', b.en, 0.15));
  if (e.tipo === 'cierre') {
    // el riser dura 2 s y termina justo en el corte
    fx('riser', e.inicio - 2, 0.24, 2, 0.5);
    fx('burbujas', e.inicio, 0.1);
    fx('brillo-luz', c.luz - 0.05, 0.3);
    fx('impacto', c.numero - 0.03, 0.4);
    [c.g1, c.g2, c.g3].forEach((t) => fx('pop', t, 0.09));
  }
  if (e.tipo === 'ganchoFrutado') {
    fx('splash', 0.05, 0.28);
    // con fundido entre sabores (cue `cruce`) el paso suena con woosh suave en vez de whip
    [c.arandanos, c.frutos, c.chocolate].forEach((t) => (c.cruce === undefined ? fx('whip', t - 0.1, 0.22) : fx('woosh', t - 0.15, 0.1)));
    fx('impacto', c.todos - 0.03, 0.42);
  }
  if (e.tipo === 'frutaDeVerdad') {
    fx('pop', c.sin1, 0.12);
    fx('pop', c.sin2, 0.12);
    fx('splash', c.color - 0.22, 0.26);
  }
  if (e.tipo === 'sabor') {
    fx('splash', e.inicio + 0.05, 0.18);
    lista.forEach((b) => fx('pop', b.en, 0.11));
  }
  if (e.tipo === 'frutosDelBosque') {
    fx('splash', e.inicio + 0.05, 0.2);
    if (c.pedido !== undefined) fx('sello', c.pedido + 0.12, 0.26);
    fx('sello', c.cuatro + 0.12, 0.28);
  }
  if (e.tipo === 'stevia') {
    [0, 1, 2, 3].forEach((k) => fx('pop', e.inicio + 0.1 + k * 0.07, 0.1));
    if (c.c1 !== undefined) fx('pop', c.c1, 0.11);
    if (c.sello !== undefined) fx('sello', c.sello + 0.12, 0.28);
  }
  // escenas EcoCultivo: sin efectos nuevos (pop para el pin, woosh para la ruta y el acercamiento)
  if (e.tipo === 'cabra') fx('pop', c.c1, 0.11);
  if (e.tipo === 'mapa') {
    fx('woosh', c.baja - 0.15, 0.14);
    fx('woosh', c.ruta - 0.1, 0.08);
    fx('pop', c.pin + 0.18, 0.2);
  }
  if (e.tipo === 'cierreTienda') {
    fx('riser', e.inicio - 2, 0.24, 2, 0.5);
    fx('burbujas', e.inicio, 0.1);
    fx('woosh', c.morph - 0.1, 0.1);
    fx('impacto', c.escribe - 0.03, 0.4);
    [c.g1, c.g2, c.g3].forEach((t) => fx('pop', t, 0.09));
    fx('brillo-luz', c.luz - 0.05, 0.3);
  }
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
