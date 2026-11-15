import golpes from './golpes.json';
import silencios from './silencios.json';
import type {Escena, VideoKefirProps} from './tipos';

/*
  Alinea el video con los golpes de la música sin soltar la voz (que sigue siendo la pista maestra).
  - Los datos (natural.ts / frutado.ts) guardan los tiempos de la voz; aquí se ajustan al ritmo.
  - Cada corte solo puede moverse dentro del silencio entre dos frases: ahí se busca un golpe
    (mejor si es el primer tiempo del compás) o, si no cabe ninguno, un medio golpe.
  - La música se desplaza hasta 4 golpes (`musicaDesde`) para que el mayor número de cortes caiga en golpe.
  - Las entradas (cues) se pegan al golpe o medio golpe más cercano solo si quedan a menos de 3 frames:
    más que eso se notaría contra la voz.
  Los golpes salen de `node scripts/golpes.mjs` (golpes.json).
*/
const P = golpes.periodo;
const TOL_GOLPE = 0.09, TOL_MEDIO = 0.07;

type Ventana = {desde: number; hasta: number};

// silencio real de la voz que rodea al corte (scripts/silencios.mjs); el corte puede entrar un pelo en la palabra siguiente
const ventana = (corte: number, pausas: number[][]): Ventana => {
  const s = pausas.find(([a, b]) => corte >= a - 0.12 && corte <= b + 0.12);
  // si la voz no respira ahí, se deja un margen mínimo alrededor del corte original
  return s ? {desde: s[0] + 0.02, hasta: s[1] + 0.04} : {desde: corte - 0.07, hasta: corte + 0.07};
};

// golpe k (puede ser n + 0.5) en tiempo de video, con la música adelantada `desde` segundos
const tiempo = (k: number, desde: number) => golpes.primerGolpe + k * P - desde;

const mejorEn = (v: Ventana, original: number, desde: number): {t: number; puntos: number} => {
  let mejor = {t: original, puntos: 0, dist: Infinity};
  const k0 = Math.floor((v.desde + desde - golpes.primerGolpe) / P) - 1;
  for (let k = k0; k <= k0 + 4; k += 0.5) {
    const t = tiempo(k, desde);
    if (t < v.desde || t > v.hasta) continue;
    const entero = Number.isInteger(k);
    const puntos = !entero ? 1 : ((k % 4) + 4) % 4 === golpes.primerTiempo ? 3 : 2;
    const dist = Math.abs(t - original);
    if (puntos > mejor.puntos || (puntos === mejor.puntos && dist < mejor.dist)) mejor = {t, puntos, dist};
  }
  return mejor;
};

const pegar = (t: number, desde: number) => {
  const k = (t + desde - golpes.primerGolpe) / P;
  const entero = tiempo(Math.round(k), desde), medio = tiempo(Math.round(k * 2) / 2, desde);
  if (Math.abs(entero - t) <= TOL_GOLPE) return entero;
  if (Math.abs(medio - t) <= TOL_MEDIO) return medio;
  return t;
};

const r3 = (x: number) => Math.round(x * 1000) / 1000;

export const ajustarAlRitmo = (video: VideoKefirProps): VideoKefirProps => {
  const ventanas = video.escenas.map((e, i) => (i ? ventana(e.inicio, silencios[video.variante]) : null));
  // desplazamiento de la música que más cortes deja en golpe
  let mejor = {desde: 0, puntos: -1};
  for (let desde = 0; desde < P * 4; desde += 0.005) {
    const puntos = video.escenas.reduce((s, e, i) => s + (ventanas[i] ? mejorEn(ventanas[i]!, e.inicio, desde).puntos : 0), 0);
    if (puntos > mejor.puntos) mejor = {desde, puntos};
  }
  const desde = r3(mejor.desde);
  const escenas: Escena[] = video.escenas.map((e, i) => {
    const m = ventanas[i] ? mejorEn(ventanas[i]!, e.inicio, desde) : {t: 0, puntos: 0};
    return {
      ...e,
      inicio: r3(m.t),
      enGolpe: i === 0 ? undefined : m.puntos >= 2 ? 'golpe' : m.puntos === 1 ? 'medio' : 'voz',
      cues: Object.fromEntries(Object.entries(e.cues).map(([k, t]) => [k, r3(pegar(t, desde))])),
      lista: e.lista?.map((it) => ({...it, en: r3(pegar(it.en, desde)), ...(it.pulso === undefined ? {} : {pulso: r3(pegar(it.pulso, desde))})})),
    };
  });
  // la foto del storyboard nunca debe caer dentro de la transición a la escena siguiente
  escenas.forEach((e, i) => {
    e.fin = escenas[i + 1]?.inicio ?? video.duracion;
    const tope = e.fin - 0.36;
    e.foto = e.foto.map((f) => Math.min(f, tope));
  });
  return {...video, musicaDesde: desde, escenas};
};
