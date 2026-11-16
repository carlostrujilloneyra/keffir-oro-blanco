import {AZUL_ETIQUETA, PALETAS} from '../tema';
import {frutado} from './frutado';
import {natural} from './natural';
import type {Escena, VideoKefirProps} from './tipos';

/*
  Variantes para la Bio Tienda EcoCultivo (las publica la tienda: en pantalla, su tono). Reutilizan las escenas aprobadas de
  natural.ts y frutado.ts: de cada una cambian solo inicio, cues y textos para la voz nueva. Las escenas propias son
  `cabra`, `mapa` y `cierreTienda` (escenas/ecocultivo.tsx). Mismas reglas de texto que natural.ts.
*/
const de = (base: VideoKefirProps, id: string, cambios: Partial<Escena>): Escena => ({...base.escenas.find((e) => e.id === id)!, ...cambios});

// Datos de la tienda (verificados): la tarjeta del mapa y el cierre los comparten
const TIENDA = {nombre: 'Bio Tienda EcoCultivo', mercado: 'Mercado San Felipe · Surquillo', direccion: 'Ca. El Carmen 1159 · Tienda 577', numero: '950 172 732'};

// voz-kefir-natural-ecocultivo.mp3 (47.2 s)
export const naturalEcocultivo: VideoKefirProps = {
  ...natural,
  variante: 'natural-ecocultivo',
  duracion: 47.8,
  voz: 'audio/voz-kefir-natural-ecocultivo.mp3',
  escenas: [
    // "Esto no es yogurt": el golpe cae en "yogurt"; el gancho aguanta hasta "…los confunde"
    de(natural, '01-gancho', {foto: [0.6, 1.6], cues: {l1: 0, l2: 0.1, golpe: 1.08}}),
    de(natural, '02-que-es', {inicio: 3.5, foto: [4.9, 7.2, 9.2], textos: {cien: '100 % natural y vivo', resalta: 'vivo', mano: 'Hecho a mano', lote: 'Lote a lote'}, cues: {cien: 4.4, mano: 7.66, lote: 8.6}}),
    de(natural, '03-beneficios', {inicio: 9.78, foto: [10.5, 12.8, 15.3], lista: [
      {txt: 'Fortalece tu microbiota', en: 9.85},
      {txt: 'Alto en probióticos vivos', en: 11.48},
      {txt: 'Digestión equilibrada', en: 13.4},
    ]}),
    de(natural, '04-sin-anadidos', {inicio: 15.8, foto: [18.6, 20.4], cues: {sin1: 15.85, sin2: 17.14, sello: 18.95}}),
    // "Se hace de leche de vaca y de cabra": solo el titular (la voz ya no nombra el pastoreo ni las ollas)
    de(natural, '05-origen', {inicio: 20.83, foto: [22.6], textos: {titulo: 'Vaca o cabra', resalta: 'cabra'}, cues: {titulo: 20.9}}),
    // solo el primer tiempo (botella de 475 ml): "el de cabra" ya tiene escena propia
    de(natural, '06-lactosa', {inicio: 23.07, foto: [24.8], textos: {l1: 'Bajos en', l2: 'lactosa', c1: 'Por la fermentación'}, cues: {l1: 23.12, l2: 23.25, c1: 23.6}}),
    {
      // push-in a la de 1 L y paneo a la de 475 ml; el titular entra con "no se encuentra"
      id: '07-cabra', tipo: 'cabra', inicio: 25.71, tono: 'noche', foto: [27.4, 29.6],
      transicion: 'fundido',
      textos: {l1: 'No se encuentra', l2: 'en cualquier lado', c1: 'Se digiere más fácil'},
      cues: {l1: 26.4, l2: 26.55, c1: 28.59},
      imagenes: {heroe: 'img/natural-cabra-hero.png'},
    },
    {
      // "¿Dónde lo encuentras?…": vista general, descenso, ruta (San Felipe → El Carmen) y pin que se vuelve tarjeta
      id: '08-mapa', tipo: 'mapa', inicio: 30.36, tono: 'leche', foto: [31.0, 34.0, 37.6],
      transicion: 'zoom', ola: '#FFFFFF',
      textos: {...TIENDA, giro1: 'Av. San Felipe', giro2: 'Ca. El Carmen'},
      cues: {baja: 31.66, ruta: 32.5, giro1: 32.7, giro2: 34.3, pin: 35.8, filas: 36.05},
    },
    {
      id: '09-cierre', tipo: 'cierreTienda', inicio: 39.88, tono: 'tinta', foto: [41.6, 46.9],
      transicion: 'fundido', ola: AZUL_ETIQUETA,
      textos: {cta: 'Encuéntralo en|EcoCultivo', resalta: 'ecocultivo', tam: '96', direccion: 'Ca. El Carmen 1159 · Surquillo', whatsapp: 'WhatsApp', numero: TIENDA.numero, acento: '#7CC8FF'},
      cues: {morph: 40.05, cta: 40.6, direccion: 41.2, numero: 42.9, g1: 44.19, g2: 45.03, g3: 46.07, luz: 46.7},
    },
  ],
};

// voz-kefir-frutado-ecocultivo.mp3 (48.3 s)
export const frutadoEcocultivo: VideoKefirProps = {
  ...frutado,
  variante: 'frutado-ecocultivo',
  duracion: 48.8,
  voz: 'audio/voz-kefir-frutado-ecocultivo.mp3',
  escenas: [
    // cortes por sabor cada 0.8 s bajo "4 sabores · 0 conservantes"; en "¿cuál eliges?" las franjas (1.6 s)
    de(frutado, '01-gancho', {foto: [0.4, 1.2, 2.0, 2.8, 4.2],
      textos: {pre1: '4 sabores ·', pre2: '0 conservantes añadidos', l1: '¿Cuál', l2: 'eliges?'},
      cues: {pre1: 0, pre2: 0.1, l1: 3.2, l2: 3.3, fresa: 0, arandanos: 0.8, frutos: 1.6, chocolate: 2.4, todos: 3.2}}),
    de(frutado, '02-fruta-de-verdad', {inicio: 4.87, foto: [8.0, 11.9], cues: {l1: 4.95, l2: 5.07, sin1: 7.0, sin2: 9.5, color: 11.2}}),
    // "Fresas del Fundo San Isidro" en relevo con la vitamina C
    de(frutado, '03-fresa', {inicio: 12.75, foto: [14.0, 18.4], cues: {nombre: 12.8}, lista: [
      {txt: 'Fresas del Fundo San Isidro', en: 13.0},
      {txt: 'Vitamina C de la fresa', en: 17.6},
    ]}),
    de(frutado, '04-arandanos', {inicio: 19.45, foto: [21.2], cues: {nombre: 19.5}, lista: [{txt: 'Fuente de antioxidantes', en: 20.3}]}),
    de(frutado, '05-frutos-del-bosque', {inicio: 22.09, foto: [23.0, 25.0], cues: {pedido: 22.2, nombre: 22.2, cuatro: 23.9}}),
    de(frutado, '06-chocolate', {inicio: 25.77, foto: [27.6], textos: {nombre: 'Chocolate', tam: '166'}, cues: {nombre: 25.82}, lista: [{txt: 'Con cacao de Quillabamba', en: 26.5}]}),
    // las cuatro botellas: "Dulces, con stevia" y, en "¿sabías que también los hay de leche de cabra?", el sello
    de(frutado, '07-stevia', {inicio: 28.2, foto: [29.8, 32.6], textos: {l1: 'Dulces,', l2: 'con stevia', resalta: 'stevia', sello: 'TAMBIÉN DE|LECHE DE CABRA'}, cues: {l1: 28.3, l2: 28.45, sello: 31.3}}),
    {
      id: '08-mapa', tipo: 'mapa', inicio: 33.2, tono: 'leche', foto: [33.8, 36.8, 40.2],
      transicion: 'zoom', ola: '#FFFFFF',
      textos: {...TIENDA, giro1: 'Av. San Felipe', giro2: 'Ca. El Carmen'},
      cues: {baja: 34.5, ruta: 35.3, giro1: 35.5, giro2: 37.1, pin: 38.6, filas: 38.85},
    },
    {
      id: '09-cierre', tipo: 'cierreTienda', inicio: 41.55, tono: 'tinta', foto: [43.4, 47.9],
      transicion: 'fundido', ola: PALETAS.frutos.luz,
      textos: {cta: 'Encuéntralos en|EcoCultivo', resalta: 'ecocultivo', tam: '88', direccion: 'Ca. El Carmen 1159 · Surquillo', cinta: 'Comenta cuál eliges 👇', whatsapp: 'WhatsApp', numero: TIENDA.numero, acento: '#FF8FBF'},
      cues: {morph: 41.57, cta: 42.2, cinta: 41.7, direccion: 43.6, numero: 44.0, g1: 45.15, g2: 46.12, g3: 47.15, luz: 47.8},
    },
  ],
};
