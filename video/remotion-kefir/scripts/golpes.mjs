/*
  Detecta los golpes (beats) de la música y los guarda en src/datos/golpes.json.
  Método: envolvente de ataques (subidas de energía, total + graves) → tempo por autocorrelación →
  se afina el periodo y la fase con un peine sobre toda la pista (tempo constante) → compás por energía de graves.
  Uso: node scripts/golpes.mjs [ruta.mp3]
*/
import {execFileSync} from 'child_process';
import {writeFileSync} from 'fs';
import path from 'path';

const raiz = path.resolve(import.meta.dirname, '..');
const pista = process.argv[2] ?? path.join(raiz, 'public/audio/musica-kefir.mp3');
const SR = 11025, HOP = 64, FPS = SR / HOP; // ~172 cuadros/s → 5.8 ms de resolución

const pcm = (filtro) => {
  const buf = execFileSync('ffmpeg', ['-v', 'error', '-i', pista, '-ac', '1', '-ar', String(SR), ...(filtro ? ['-af', filtro] : []), '-f', 'f32le', '-'], {maxBuffer: 1 << 28});
  return new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
};

// subida de la energía (en dB) entre cuadros vecinos; solo cuenta lo que sube
const ataques = (x) => {
  const n = Math.floor(x.length / HOP), e = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    let s = 0;
    for (let j = 0; j < HOP * 4 && i * HOP + j < x.length; j++) s += x[i * HOP + j] ** 2;
    e[i] = Math.log10(1e-7 + s / (HOP * 4));
  }
  const o = new Float32Array(n);
  for (let i = 2; i < n; i++) o[i] = Math.max(0, e[i] - e[i - 2]);
  return o;
};

const total = ataques(pcm()), graves = ataques(pcm('lowpass=f=140'));
const n = Math.min(total.length, graves.length);
const env = new Float32Array(n);
for (let i = 0; i < n; i++) env[i] = total[i] + 1.5 * graves[i];
const media = env.reduce((a, b) => a + b, 0) / n;
for (let i = 0; i < n; i++) env[i] = Math.max(0, env[i] - media);

// 1) tempo aproximado: autocorrelación entre 70 y 180 BPM
let mejor = {lag: 0, v: -1};
for (let lag = Math.round((FPS * 60) / 180); lag <= Math.round((FPS * 60) / 70); lag++) {
  let v = 0;
  for (let i = 0; i + lag < n; i++) v += env[i] * env[i + lag];
  v /= n - lag;
  if (v > mejor.v) mejor = {lag, v};
}

// 2) periodo y fase finos: peine de golpes sobre toda la pista (ventana de ±1 cuadro)
const peine = (periodo, fase) => {
  let v = 0, k = 0;
  for (let t = fase; t < n - 1; t += periodo, k++) {
    const i = Math.round(t);
    v += Math.max(env[i - 1] ?? 0, env[i], env[i + 1] ?? 0);
  }
  return v / Math.max(1, k);
};
let fino = {v: -1, periodo: mejor.lag, fase: 0};
for (let periodo = mejor.lag * 0.97; periodo <= mejor.lag * 1.03; periodo += mejor.lag * 0.0002)
  for (let fase = 0; fase < periodo; fase += 1) {
    const v = peine(periodo, fase);
    if (v > fino.v) fino = {v, periodo, fase};
  }

const periodoS = fino.periodo / FPS, faseS = fino.fase / FPS, dur = n / FPS;
const golpes = [];
for (let t = faseS; t < dur; t += periodoS) golpes.push(+t.toFixed(3));

// 3) compás: de los 4 posibles primeros tiempos, el que más graves acumula
const fuerza = (t) => {
  const i = Math.round(t * FPS);
  return Math.max(graves[i - 1] ?? 0, graves[i] ?? 0, graves[i + 1] ?? 0);
};
const porTiempo = [0, 1, 2, 3].map((k) => golpes.filter((_, i) => i % 4 === k).reduce((a, t) => a + fuerza(t), 0));
const primero = porTiempo.indexOf(Math.max(...porTiempo));

// qué tan marcado es el pulso: energía de ataques sobre los golpes frente a la media
const nitidez = fino.v / (env.reduce((a, b) => a + b, 0) / n);
const salida = {pista: path.basename(pista), bpm: +(60 / periodoS).toFixed(2), periodo: +periodoS.toFixed(4), primerGolpe: +faseS.toFixed(3), primerTiempo: primero, golpes};
writeFileSync(path.join(raiz, 'src/datos/golpes.json'), JSON.stringify(salida));
console.log(`${salida.bpm} BPM · periodo ${salida.periodo} s · primer golpe ${salida.primerGolpe} s · ${golpes.length} golpes · nitidez x${nitidez.toFixed(1)}`);
console.log('graves por tiempo del compás:', porTiempo.map((v) => v.toFixed(1)).join('  '), '→ el compás empieza en el golpe', primero);
