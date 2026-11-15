import {AZUL_ETIQUETA, PALETAS} from '../tema';
import type {VideoKefirProps} from './tipos';

const LECHE = '#F6F1E6';

/*
  Kéfir natural v2 · voz-kefir-natural-v2.mp3 (49.9 s). Cada `inicio` cae en el silencio previo a su frase y los cues son
  el arranque de la palabra que nombra lo que aparece (ritmo.ts los cuadra con la música).
  Reglas del texto en pantalla: solo frases de la etiqueta aprobada y nunca más de 7 palabras a la vez. Por eso varias
  escenas tienen dos tiempos (el texto del primero sale cuando entra el del segundo) y algunos cues van antes que la voz:
  ningún texto sale antes de 1.5 s de haber terminado de aparecer.
*/
export const natural: VideoKefirProps = {
  variante: 'natural',
  duracion: 50.5,
  voz: 'audio/voz-kefir-natural-v2.mp3',
  musica: 'audio/musica-kefir.mp3',
  musicaDesde: 0,
  escenas: [
    {
      // "Mucha gente cree que el kéfir es yogurt… y NO lo es": el golpe cae en el "no"
      id: '01-gancho', tipo: 'ganchoNatural', inicio: 0, tono: 'natural', foto: [1.4, 3.4],
      textos: {l1: 'Esto no es', l2: 'Yogurt'},
      cues: {l1: 0, l2: 0.1, golpe: 2.95},
      imagenes: {heroe: 'img/leche-splash.webp'},
    },
    {
      // "100 % kéfir vivo" entra entero al abrir la escena; en "hecho a mano" (cue `mano`) cambia el titular.
      // Esta escena y la de beneficios usan el PNG original de la foto (sin comprimir): el zoom llega a 1.5x
      id: '02-que-es', tipo: 'queEs', inicio: 4.06, tono: 'noche', foto: [4.9, 7.15, 9.3],
      ola: LECHE,
      textos: {cien: '100 % kéfir vivo', resalta: 'vivo', mano: 'Hecho a mano', lote: 'Lote a lote'},
      cues: {cien: 4.2, mano: 7.66, lote: 7.95},
      imagenes: {heroe: 'img/natural-vaca-hero.png'},
    },
    {
      id: '03-beneficios', tipo: 'beneficios', inicio: 9.68, tono: 'noche', foto: [10.4, 12.7, 15.3],
      // el único corte fuerte entre el gancho y el cierre
      transicion: 'whip',
      textos: {},
      cues: {},
      lista: [
        {txt: 'Fortalece tu microbiota', en: 9.72},
        {txt: 'Alto en probióticos vivos', en: 11.36},
        {txt: 'Digestión equilibrada', en: 13.3},
      ],
      imagenes: {heroe: 'img/natural-475-hero.png'},
    },
    {
      id: '04-sin-anadidos', tipo: 'sinAnadidos', inicio: 15.77, tono: 'leche', foto: [18.5, 20.5],
      transicion: 'fundido',
      textos: {sin1: 'Sin azúcar añadida', sin2: 'Sin conservantes añadidos', sello: '100 %|ARTESANAL'},
      cues: {sin1: 15.82, sin2: 17.12, sello: 18.9},
      imagenes: {heroe: 'img/leche-duo.png'},
    },
    {
      // sin lugar de origen: solo lo que dice la etiqueta (cabra de libre pastoreo, ollas de acero quirúrgico)
      id: '05-origen', tipo: 'origen', inicio: 20.89, tono: 'noche', foto: [22.9, 28.0],
      ola: LECHE,
      textos: {titulo: 'Vaca o cabra', resalta: 'cabra', c1: 'Cabra de pastoreo libre', c2: 'Ollas de acero quirúrgico'},
      cues: {titulo: 20.95, c1: 21.5, c2: 25.6},
      imagenes: {heroe: 'img/hero-vaca-cabra.png'},
    },
    {
      // "Por la fermentación" entra 0.6 s antes que la voz para quedar 1.5 s completo antes del segundo tiempo;
      // en ese segundo tiempo (cue `cabra`) la foto pasa a la botella de cabra de `imagenes.cabra`
      id: '06-lactosa', tipo: 'lactosa', inicio: 28.5, tono: 'noche', foto: [30.9, 32.4, 34.1],
      transicion: 'fundido',
      textos: {l1: 'Bajos en', l2: 'lactosa', c1: 'Por la fermentación', l3: 'El de cabra', resalta: 'cabra', c2: 'Se digiere más fácil'},
      cues: {l1: 28.55, l2: 28.68, c1: 29.3, cabra: 31.4, c2: 32.3},
      imagenes: {heroe: 'img/natural-475-hero.webp', cabra: 'img/hero-vaca-cabra.png'},
    },
    {
      // servido: de la inclinación (34.56) a la línea de 30 ml (37.85) pasan 3.3 s; el contador sube con el llenado
      id: '07-primera-vez', tipo: 'servido', inicio: 34.5, tono: 'marino', foto: [36.3, 38.3],
      ola: PALETAS.natural.luz,
      textos: {titulo: '¿Primera vez?'},
      cues: {titulo: 34.38, inclina: 34.56, sirve: 35.44, lleno: 37.85, fin: 38.6, pasos: 36.6},
      lista: [
        {txt: 'En ayunas', en: 36.6},
        {txt: 'En la noche', en: 36.68},
      ],
    },
    {
      id: '08-combinalo', tipo: 'combinalo', inicio: 38.66, tono: 'noche', foto: [40.6, 42.6],
      transicion: 'fundido',
      textos: {l1: 'Tu desayuno', l2: 'favorito', resalta: 'favorito', tam: '136'},
      cues: {titulo: 38.7, clave: 42.2},
      lista: [
        {txt: 'Granola', en: 38.88},
        {txt: 'Cereales', en: 39.6},
        {txt: 'Frutas', en: 40.26},
      ],
      imagenes: {heroe: 'img/natural-bowl.webp'},
    },
    {
      // el número entra completo con un golpe al abrir la escena (no espera a la voz); g1-g3 son los grupos dichos
      id: '09-cierre', tipo: 'cierre', inicio: 43.14, tono: 'tinta', foto: [44.4, 49.3],
      transicion: 'zoom', ola: AZUL_ETIQUETA,
      textos: {cta: 'Separa el|tuyo hoy', resalta: 'hoy', tam: '110', whatsapp: 'WhatsApp', numero: '941 462 492', acento: '#7CC8FF'},
      cues: {cta: 43.3, luz: 45.73, numero: 43.8, g1: 46.86, g2: 47.68, g3: 48.79},
      imagenes: {heroe: 'img/hero-vaca-cabra.png'},
    },
  ],
};
