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
      id: '08-mapa', tipo: 'mapa', inicio: 30.36, tono: 'leche', foto: [31.0, 35.3, 39.5],
      // carteles con la voz ("Mercado San Felipe", "Calle El Carmen"); pin y tarjeta algo antes de lo pedido para que
      // la tarjeta quede 1.5 s completa antes del cierre
      ola: '#FFFFFF',
      textos: {...TIENDA, giro1: 'Av. San Felipe', giro2: 'Ca. El Carmen'},
      cues: {baja: 31.6, ruta: 32.4, giro1: 34.3, giro2: 36.4, pin: 37.55, tarjeta: 37.65},
    },
    {
      id: '09-cierre', tipo: 'cierreTienda', inicio: 39.88, tono: 'tinta', foto: [42.0, 46.0],
      // fase A: logos + CTA; fase B en "Escríbenos" (cue `escribe`): dirección y número
      transicion: 'flash', ola: AZUL_ETIQUETA,
      textos: {cta: 'Encuéntralo|en EcoCultivo', resalta: 'ecocultivo', tam: '80', direccion: 'Ca. El Carmen 1159 · Surquillo', whatsapp: 'WhatsApp', numero: TIENDA.numero, acento: '#7CC8FF'},
      cues: {morph: 41.0, cta: 40.5, escribe: 43.1, g1: 44.19, g2: 45.03, g3: 46.07, luz: 46.7},
      imagenes: {heroe: 'img/hero-vaca-cabra.png'},
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
    // un sabor cada 1.05 s con fundido de 0.35 s bajo "4 sabores, cero conservantes"; en 4.2 "¿cuál eliges?" y las franjas (1.6 s)
    de(frutado, '01-gancho', {foto: [0.5, 1.6, 2.7, 3.8, 5.0],
      textos: {pre1: '4 sabores', pre2: 'cero|conservantes|añadidos', l1: '¿Cuál', l2: 'eliges?'},
      cues: {pre1: 0, pre2: 0.1, l1: 4.2, l2: 4.3, fresa: 0, arandanos: 1.05, frutos: 2.1, chocolate: 3.15, todos: 4.2, cruce: 0.35}}),
    de(frutado, '02-fruta-de-verdad', {inicio: 5.84, foto: [8.0, 11.9], cues: {empuje: 5.6, l1: 5.92, l2: 6.04, sin1: 7.0, sin2: 9.5, color: 11.2}}),
    // "Fresas del Fundo San Isidro" en relevo con la vitamina C
    de(frutado, '03-fresa', {inicio: 12.75, foto: [14.0, 18.4], cues: {nombre: 12.8}, lista: [
      {txt: 'Fresas del Fundo San Isidro', en: 13.0},
      {txt: 'Vitamina C de la fresa', en: 17.6},
    ]}),
    de(frutado, '04-arandanos', {inicio: 19.45, foto: [21.2], cues: {nombre: 19.5}, lista: [{txt: 'Fuente de antioxidantes', en: 20.3}]}),
    de(frutado, '05-frutos-del-bosque', {inicio: 22.09, foto: [23.0, 25.0], textos: {l1: 'Frutos', l2: 'del bosque', sello2: '4|FRUTOS EN 1'}, cues: {nombre: 22.2, cuatro: 23.6}}),
    de(frutado, '06-chocolate', {inicio: 25.77, foto: [27.6], textos: {nombre: 'Chocolate', tam: '166'}, cues: {nombre: 25.82}, lista: [{txt: 'Con cacao de Quillabamba', en: 26.5}]}),
    // las cuatro botellas: "Dulces, con stevia" y, en "¿sabías que también los hay de leche de cabra?", el sello
    de(frutado, '07-stevia', {inicio: 28.2, foto: [29.8, 32.6], textos: {l1: 'Dulces,', l2: 'con stevia', resalta: 'stevia', sello: 'TAMBIÉN|DE LECHE|DE CABRA'}, cues: {l1: 28.3, l2: 28.45, sello: 31.3}}),
    {
      id: '08-mapa', tipo: 'mapa', inicio: 33.2, tono: 'leche', foto: [33.9, 37.0, 41.1],
      ola: '#FFFFFF',
      textos: {...TIENDA, giro1: 'Av. San Felipe', giro2: 'Ca. El Carmen'},
      cues: {baja: 34.5, ruta: 35.0, giro1: 36.0, giro2: 38.0, pin: 39.2, tarjeta: 39.3},
    },
    {
      id: '09-cierre', tipo: 'cierreTienda', inicio: 41.55, tono: 'tinta', foto: [43.0, 47.0],
      transicion: 'flash', ola: PALETAS.frutos.luz,
      textos: {cta: 'Encuéntralos|en EcoCultivo', resalta: 'ecocultivo', tam: '80', direccion: 'Ca. El Carmen 1159 · Surquillo', cinta: 'Comenta cuál eliges 👇', whatsapp: 'WhatsApp', numero: TIENDA.numero, acento: '#FF8FBF'},
      cues: {morph: 42.5, cta: 42.0, cinta: 41.6, escribe: 44.1, g1: 45.15, g2: 46.12, g3: 47.15, luz: 47.8},
    },
  ],
};
