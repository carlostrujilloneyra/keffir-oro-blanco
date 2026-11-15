import {PALETAS} from '../tema';
import type {VideoKefirProps} from './tipos';

/*
  Kéfir frutado v2 · voz-kefir-frutado-v2.mp3 (40.8 s). Mismas reglas que natural.ts: tiempos de la voz,
  máximo 7 palabras en pantalla y textos visibles al menos 1.5 s. La transición lleva el color del sabor que llega.
*/
export const frutado: VideoKefirProps = {
  variante: 'frutado',
  duracion: 41.3,
  voz: 'audio/voz-kefir-frutado-v2.mp3',
  musica: 'audio/musica-kefir.mp3',
  musicaDesde: 0,
  escenas: [
    {
      // un corte por sabor cuando la voz lo nombra; en "¿cuál eliges?" (cue `todos`) las cuatro en franjas
      id: '01-gancho', tipo: 'ganchoFrutado', inicio: 0, tono: 'mora', foto: [0.4, 1.1, 2.2, 3.4, 4.6],
      textos: {l1: '¿Cuál', l2: 'eliges?'},
      cues: {l1: 0, l2: 0.1, fresa: 0, arandanos: 0.62, frutos: 1.47, chocolate: 2.78, todos: 3.92},
    },
    {
      // el titular entra al abrir la escena ("Es kéfir de verdad, con fruta de verdad"); `color` es el splash que tiñe en "el color es de la fruta"
      id: '02-fruta-de-verdad', tipo: 'frutaDeVerdad', inicio: 4.95, tono: 'leche', foto: [9.3, 11.0],
      transicion: 'flash', ola: '#FFFFFF',
      textos: {l1: 'Fruta', l2: 'de verdad', sin1: 'Sin colorantes', sin2: 'Sin saborizantes'},
      cues: {l1: 5.0, l2: 5.15, sin1: 7.78, sin2: 8.75, color: 9.83},
    },
    {
      id: '03-fresa', tipo: 'sabor', inicio: 11.5, tono: 'grosella', foto: [14.9],
      ola: PALETAS.fresa.luz,
      textos: {nombre: 'Fresa', tam: '250'},
      cues: {nombre: 11.55},
      lista: [
        {txt: 'Con pulpa natural', en: 12.17},
        {txt: 'Y vitamina C', en: 13.3},
      ],
      imagenes: {heroe: 'img/fresa-hero.webp'},
    },
    {
      id: '04-arandanos', tipo: 'sabor', inicio: 15.33, tono: 'uva', foto: [18.8],
      transicion: 'whip',
      textos: {nombre: 'Arándanos', tam: '166'},
      cues: {nombre: 15.38},
      lista: [
        {txt: 'Con pulpa natural', en: 16.2},
        {txt: 'Fuente de antioxidantes', en: 17.3},
      ],
      imagenes: {heroe: 'img/arandanos-hero.webp'},
    },
    {
      // "El más pedido" deja su sitio a "4 frutos en 1" cuando la voz dice "cuatro frutos en una sola botella"
      id: '05-frutos-del-bosque', tipo: 'frutosDelBosque', inicio: 19.16, tono: 'mora', foto: [21.3, 23.8],
      transicion: 'whipIzq',
      textos: {l1: 'Frutos', l2: 'del bosque', sello1: 'EL MÁS|PEDIDO', sello2: '4|FRUTOS EN 1'},
      cues: {pedido: 19.25, nombre: 19.3, cuatro: 21.82},
      imagenes: {heroe: 'img/frutos-bosque-hero.webp'},
    },
    {
      id: '06-chocolate', tipo: 'sabor', inicio: 24.22, tono: 'cacaoNoche', foto: [27.2],
      transicion: 'whip',
      textos: {pre: '¿Antojo de', nombre: 'chocolate?', tam: '156'},
      cues: {nombre: 24.27},
      lista: [{txt: 'Con cacao de Quillabamba', en: 25.6}],
      imagenes: {heroe: 'img/chocolate-hero.webp'},
    },
    {
      id: '07-stevia', tipo: 'stevia', inicio: 27.6, tono: 'tinta', foto: [31.3],
      transicion: 'flash', ola: PALETAS.frutos.luz,
      textos: {l1: 'Dulce,', l2: 'con stevia', resalta: 'stevia', c1: 'Sin conservantes añadidos'},
      cues: {l1: 27.65, l2: 27.8, c1: 29.6},
    },
    {
      id: '08-combinalo', tipo: 'combinalo', inicio: 31.71, tono: 'mora', foto: [34.1],
      ola: PALETAS.frutos.luz,
      textos: {l1: 'Solo, con granola', l2: 'o en tu bowl', resalta: 'bowl', tam: '112'},
      cues: {titulo: 31.76, clave: 33.15},
      imagenes: {heroe: 'img/frutado-bowl.webp'},
    },
    {
      id: '09-cierre', tipo: 'cierre', inicio: 34.58, tono: 'tinta', foto: [36.6, 40.3],
      transicion: 'zoom', ola: PALETAS.frutos.luz,
      textos: {cta: 'Comenta cuál elegirías', resalta: 'elegirías', tam: '80', whatsapp: 'Pídelo por WhatsApp', numero: '941 462 492', acento: '#FF8FBF'},
      cues: {cta: 34.7, luz: 36.1, numero: 36.9, g1: 37.46, g2: 38.6, g3: 39.64},
    },
  ],
};
