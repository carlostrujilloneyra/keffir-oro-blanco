import {AZUL_ETIQUETA, PALETAS} from '../tema';
import type {Escena, VideoKefirProps} from './tipos';

const LECHE = '#F6F1E6';

/*
  Los tres pasos de "¿Primera vez?" se muestran en las dos escenas (servido y foto) en la misma posición:
  el primero aparece durante el servido y sigue en pantalla al cambiar de escena.
  "Poco a poco" entra 0.7 s antes que la voz para cumplir la regla de 1.5 s en pantalla.
*/
const PASOS: Escena['lista'] = [
  {txt: 'En ayunas', nota: '1 shot de 30 ml', en: 26.6},
  {txt: 'En la noche', nota: 'otro shot de 30 ml', en: 27.96},
  {txt: 'Poco a poco', nota: 'aumenta la cantidad', en: 28.5},
];

/*
  Kéfir natural · voz-kefir-natural.mp3 (41.7 s). Cada `inicio` cae justo antes de la primera palabra
  de su frase; los cues son el arranque de la palabra que nombra lo que aparece (ritmo.ts los cuadra con la música).
  Los beneficios son, palabra por palabra, los de la etiqueta aprobada.
*/
export const natural: VideoKefirProps = {
  variante: 'natural',
  duracion: 42.3,
  voz: 'audio/voz-kefir-natural.mp3',
  musica: 'audio/musica-kefir.mp3',
  musicaDesde: 0,
  escenas: [
    {
      // el titular entra completo de inmediato y aguanta hasta "Nuestro kéfir…": queda entero más de 1.5 s
      id: '01-gancho', tipo: 'ganchoNatural', inicio: 0, tono: 'natural', foto: [1.9],
      textos: {l1: '¿Ya probaste', l2: 'Kéfir', l3: 'de verdad?'},
      cues: {l1: 0, l2: 0.08, l3: 0.16},
      imagenes: {heroe: 'img/leche-splash.webp'},
    },
    {
      id: '02-que-es', tipo: 'queEs', inicio: 2.6, tono: 'natural', foto: [6.6],
      ola: LECHE,
      textos: {cien: '100 %', kefir: 'Kéfir', natural: 'natural', noEs: 'No es yogurt estilo kéfir'},
      cues: {kefir: 2.7, natural: 3.05, cien: 3.78, noEs: 4.95},
      imagenes: {heroe: 'img/vaca-1l.png'},
    },
    {
      id: '03-beneficios', tipo: 'beneficios', inicio: 7.08, tono: 'marino', foto: [13.6],
      ola: PALETAS.natural.luz,
      textos: {l1: 'En cada', l2: 'botella'},
      cues: {titulo: 7.14},
      lista: [
        {txt: 'Alto en probióticos vivos', en: 7.26},
        {txt: 'Bajo en lactosa', en: 8.86},
        {txt: 'Fortalece tu microbiota', en: 10.2},
        {txt: 'Digestión equilibrada', en: 11.66},
      ],
      imagenes: {heroe: 'img/vaca-1l.png'},
    },
    {
      id: '04-diferencia', tipo: 'diferencia', inicio: 14.12, tono: 'noche', foto: [22.7],
      ola: LECHE,
      textos: {},
      cues: {},
      lista: [
        {txt: 'Artesanal', en: 15.15},
        {txt: 'Leche de vaca o de cabra', en: 16.0},
        {txt: 'Ollas de acero quirúrgico', en: 18.25},
        {txt: 'Sin azúcar añadida', en: 19.8},
        {txt: 'Sin conservantes añadidos', en: 20.85},
      ],
      imagenes: {heroe: 'img/hero-vaca-cabra.png'},
    },
    {
      // servido lento: de la inclinación (23.45) a la línea de 30 ml (27.3) pasan casi 4 s
      id: '05a-servido', tipo: 'servido', inicio: 23.18, tono: 'marino', foto: [27.2],
      ola: PALETAS.natural.luz,
      textos: {titulo: '¿Primera vez?', shot: '1 shot de', ml: '30 ml'},
      cues: {titulo: 23.28, inclina: 23.45, sirve: 24.4, marca: 25.4, lleno: 27.3, fin: 28.3},
      lista: PASOS,
    },
    {
      id: '05b-primera-vez', tipo: 'primeraVez', inicio: 27.9, tono: 'marino', foto: [30.2],
      ola: LECHE,
      textos: {titulo: '¿Primera vez?'},
      cues: {},
      lista: PASOS,
      imagenes: {heroe: 'img/primera-vez.webp'},
    },
    {
      // las cintas de ingredientes entran juntas antes de que la voz los nombre; lo que cae en el bowl sí va con la voz
      id: '06-combinalo', tipo: 'combinalo', inicio: 30.62, tono: 'leche', foto: [34.5],
      ola: '#FFFFFF',
      textos: {titulo: 'Combínalo', apoyo: 'como más te guste, con'},
      cues: {titulo: 30.72, apoyo: 31.38, granola: 32.85, cereales: 33.67, frutas: 34.36},
      lista: [
        {txt: 'Granola', en: 32.5},
        {txt: 'Cereales', en: 32.75},
        {txt: 'Frutas', en: 33.0},
      ],
      imagenes: {heroe: 'img/vaca-1l.png'},
    },
    {
      id: '07-cierre', tipo: 'cierre', inicio: 34.98, tono: 'tinta', foto: [41.2],
      ola: AZUL_ETIQUETA,
      textos: {lema: 'Hecho a mano, lote a lote', pide: 'Pídelo por WhatsApp', numero: '941 462 492', tiktok: '@trialferi', tamanos: 'De vaca o de cabra · 1 L · 475 ml · 250 ml', acento: '#7CC8FF', luz: '#3F86C4'},
      // el número entra con la escena (no espera a la voz): así está completo y en color los 7 s del cierre
      cues: {lema: 35.1, pide: 35.5, g1: 38.25, g2: 39.5, g3: 40.59},
      imagenes: {heroe: 'img/hero-vaca-cabra.png'},
    },
  ],
};
