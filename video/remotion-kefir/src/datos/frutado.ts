import {PALETAS} from '../tema';
import type {VideoKefirProps} from './tipos';

/*
  Kéfir frutado · voz-kefir-frutado.mp3 (44.4 s). Mismas reglas que natural.ts.
  El barrido entre escenas lleva el color del sabor que llega.
  Varios cues van algo antes que la voz para que cada texto dure al menos 1.5 s completo en pantalla.
*/
export const frutado: VideoKefirProps = {
  variante: 'frutado',
  duracion: 45,
  voz: 'audio/voz-kefir-frutado.mp3',
  musica: 'audio/musica-kefir.mp3',
  musicaDesde: 0,
  escenas: [
    {
      id: '01-gancho', tipo: 'ganchoFrutado', inicio: 0, tono: 'rosa', foto: [4.1],
      textos: {l1: '¿Algo', l2: 'más rico?', apoyo: 'También tenemos', cinta: 'Kéfir con pulpa de fruta'},
      cues: {l1: 0.55, l2: 0.92, apoyo: 1.94, cinta: 2.45},
      imagenes: {heroe: 'img/trio-frutos.png'},
    },
    {
      // dura hasta que la voz ya dice "Fresa": así "El color es de la fruta" queda 1.5 s completo
      id: '02-fruta-de-verdad', tipo: 'frutaDeVerdad', inicio: 4.46, tono: 'leche', foto: [9.6],
      ola: '#FFFFFF',
      textos: {l1: 'Fruta', l2: 'de verdad', sin1: 'Sin colorantes', sin2: 'Sin saborizantes', color: 'El color es de la fruta'},
      cues: {l1: 4.62, l2: 5.3, sin1: 6.25, sin2: 6.86, color: 7.8},
    },
    {
      id: '03-fresa', tipo: 'sabor', inicio: 10.02, tono: 'fresa', foto: [13.9],
      ola: PALETAS.fresa.luz,
      textos: {pre: 'Kéfir de', nombre: 'Fresa', tam: '290', escalaSplash: '1.5', pulpa: 'Con pulpa natural', dato: 'Antioxidantes|y vitamina C|de la fresa'},
      cues: {nombre: 10.05, pulpa: 10.5, dato: 11.86},
      imagenes: {heroe: 'img/vertido-fresa.webp', splash1: 'img/sp-fresa1.png', splash2: 'img/sp-fresa2.png'},
    },
    {
      id: '04-arandanos', tipo: 'sabor', inicio: 14.46, tono: 'arandanos', foto: [18.2],
      ola: PALETAS.arandanos.luz,
      textos: {pre: 'Kéfir de', nombre: 'Arándanos', tam: '166', escalaSplash: '1.15', pulpa: 'Con pulpa natural', dato: 'Fuente de|antioxidantes'},
      cues: {nombre: 14.56, pulpa: 15.9, dato: 16.65},
      imagenes: {heroe: 'img/vertido-arandanos.webp', splash1: 'img/sp-ara1.png', splash2: 'img/sp-ara2.png'},
    },
    {
      // las cuatro frutas se muestran con "Cuatro frutos…" y cada una pulsa cuando la voz la nombra
      id: '05-frutos-del-bosque', tipo: 'frutosDelBosque', inicio: 18.54, tono: 'mora', foto: [26.2],
      ola: PALETAS.frutos.luz,
      textos: {l1: 'Frutos', l2: 'del bosque', sello1: 'EL MÁS|PEDIDO', sello2: '4|FRUTOS EN 1'},
      cues: {pedido: 18.84, nombre: 19.92, cuatro: 21.3},
      lista: [
        {txt: 'Fresa', en: 22.0, pulso: 23.68},
        {txt: 'Frambuesa', en: 22.2, pulso: 24.1},
        {txt: 'Arándano', en: 22.4, pulso: 24.98},
        {txt: 'Zarzamora', en: 22.6, pulso: 25.7},
      ],
      imagenes: {heroe: 'img/hero-frutos-vaso.png'},
    },
    {
      id: '06-chocolate', tipo: 'chocolate', inicio: 26.7, tono: 'cacao', foto: [29.6],
      ola: PALETAS.cacao.luz,
      textos: {l1: '¿Te gusta el', l2: 'chocolate?', cinta: 'Con cacao de Quillabamba'},
      cues: {l1: 26.82, l2: 27.22, cinta: 28.0},
      imagenes: {heroe: 'img/chocolate-mano.png', splash: 'img/chocolate-splash.png'},
    },
    {
      id: '07-todos', tipo: 'todos', inicio: 30.08, tono: 'tinta', foto: [34.6],
      ola: PALETAS.frutos.luz,
      textos: {l1: 'Endulzados', l2: 'con stevia', c1: 'Alto en probióticos', c2: 'Sin conservantes añadidos'},
      cues: {l1: 30.32, l2: 30.98, c1: 31.95, c2: 33.0},
    },
    {
      id: '08-combinalo', tipo: 'combinalo', inicio: 35.12, tono: 'leche', foto: [39.1],
      ola: '#FFFFFF',
      textos: {titulo: 'Disfrútalos', apoyo: 'solos o con'},
      cues: {titulo: 35.2, apoyo: 35.86, granola: 36.57, cereales: 37.31, frutas: 38.26},
      lista: [
        {txt: 'Granola', en: 36.3},
        {txt: 'Cereales', en: 36.8},
        {txt: 'Tus frutas favoritas', en: 37.3},
      ],
      imagenes: {heroe: 'img/frutos.png'},
    },
    {
      id: '09-cierre', tipo: 'cierre', inicio: 39.46, tono: 'tinta', foto: [44.3],
      ola: PALETAS.frutos.luz,
      textos: {lema: 'Hecho a mano, lote a lote', pide: 'Pídelos por WhatsApp', numero: '941 462 492', tiktok: '@trialferi', tamanos: '4 sabores · Botella de 475 ml', acento: '#FF8FBF', luz: '#C81F6E'},
      cues: {lema: 39.75, pide: 39.56, g1: 40.72, g2: 42.03, g3: 43.13},
    },
  ],
};
