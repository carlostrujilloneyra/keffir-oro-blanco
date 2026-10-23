/* Genera index.html (composición HyperFrames) desde los datos de abajo.
   Uso: node scripts/build.mjs  (con --sin-musica genera la versión reels: voz + efectos)
   Variante para una biotienda: --store verde-raiz → index-verde-raiz-degustacion.html
   (con --sin-degustacion → index-verde-raiz.html). Ver STORES.
   La voz es la pista maestra: cada escena empieza en la palabra de <voz>.transcript.json
   (whisper) que la nombra. */
import fs from 'node:fs';
import path from 'node:path';

// ── Variantes por biotienda ─────────────────────────────────────────────
const STORES = {
  'verde-raiz': {
    name: 'VerdeRaíz', slogan: 'Raíces limpias, vida sana',
    logo: {
      hojas: 'assets/stores/verde-raiz-hojas.png',
      raices: 'assets/stores/verde-raiz-raices.png',
      texto: 'assets/stores/verde-raiz-texto.png',
      planta: 'assets/stores/verde-raiz-planta.png',
      hojasClaro: 'assets/stores/verde-raiz-hojas-claro.png',
      raicesClaro: 'assets/stores/verde-raiz-raices-claro.png',
      textoCrema: 'assets/stores/verde-raiz-texto-crema.png',
    },
    ubicacion: 'C.C. Unicachi · Tienda 77 · Comas',
    referencia: 'Ref.: Mall de Comas',
    whatsapp: '942 469 453', tiktok: '@bioverderaiz',
    showKombucha: false, showSorteo: false, showCottage: true,
    degustacion: {
      show: true, gratis: true,
      dia: 'DOM', numero: '25', mes: 'OCTUBRE',
      sticker: '🥄 DEGUSTACIÓN GRATIS · DOM 25 OCT',
      horario: '8:30 a. m. – 1:00 p. m.',
      nota: 'Sin compromiso',
      productos: ['kefir-natural', 'kefir-fresa', 'kefir-arandanos', 'kefir-frutos-del-bosque'],
    },
    voice: 'assets/sfx/voz-verde-raiz.mp3',
    voiceSinDegustacion: 'assets/sfx/voz-verde-raiz-sin-degustacion.mp3',
  },
};
const argAfter = (flag) => { const i = process.argv.indexOf(flag); return i > -1 ? process.argv[i + 1] : null; };
const STORE_ID = argAfter('--store');
const STORE = STORE_ID ? STORES[STORE_ID] : null;
if (STORE_ID && !STORE) throw new Error(`tienda desconocida: ${STORE_ID} (hay: ${Object.keys(STORES).join(', ')})`);
const DEG = !!STORE && STORE.degustacion.show && !process.argv.includes('--sin-degustacion');
// id de producto → botella a escala real (REAL)
const PRODUCT_BOTTLE = { 'kefir-natural': 'kefir1L', 'kefir-fresa': 'fresa', 'kefir-arandanos': 'arandanos', 'kefir-frutos-del-bosque': 'frutos' };

const FPS = 30;
const snap = (t) => Math.round(t * FPS) / FPS;
const r = (n) => +(+n).toFixed(3);
/* Los límites de escena van medio frame antes del corte: así cada frame cae dentro de una sola
   escena (con el redondeo a ms, un fin podía quedar 1 ms antes del siguiente inicio y ese frame
   salía de color liso). */
const edge = (t) => (t <= 0 ? 0 : t >= END - 1e-6 ? r(END) : r(t - 1 / 60));
const clipTime = (a, b) => `data-start="${edge(a)}" data-duration="${r(edge(b) - edge(a))}"`;

// ── Voz ─────────────────────────────────────────────────────────────────
/* Por cada voz: música sola antes de la voz (vo), largo del archivo, fin real de la última palabra
   (energía; whisper no separa el número), grupos del número medidos por energía y los inicios que
   whisper pega a la palabra anterior cuando hay signos ("bosque?¡Cuatro", "kefir.¿Es"): segundos del archivo. */
const VOICES = {
  'assets/sfx/voz.mp3': { vo: 0.5, len: 64.287, end: 64.12, num: [60.8, 62.0, 63.12], onset: { cuatro: 2.56, fresa: 5.06, es: 19.02, lo: 24.78, muy: 45.7 } },
  'assets/sfx/voz-verde-raiz.mp3': { vo: 0.3, len: 67.474, end: 67.38, num: [64.51, 65.2, 66.34], onset: { ya: 6.56, es: 25.03, lo: 30.62, productos: 40.89, te: 46.76, estamos: 56.6 } },
};
const VOICE_SRC = STORE ? (DEG ? STORE.voice : STORE.voiceSinDegustacion) : 'assets/sfx/voz.mp3';
const TRANSCRIPT = `${path.basename(VOICE_SRC, '.mp3')}.transcript.json`;
if (!fs.existsSync(new URL(`../${VOICE_SRC}`, import.meta.url))) throw new Error(`falta la voz ${VOICE_SRC}`);
if (!VOICES[VOICE_SRC] || !fs.existsSync(new URL(`../${TRANSCRIPT}`, import.meta.url))) {
  throw new Error(`la voz ${VOICE_SRC} aún no está medida: transcríbela a ${TRANSCRIPT} y agrega sus datos en VOICES`);
}
const VOICE = VOICES[VOICE_SRC];
const VO = VOICE.vo;
const VOICE_FILE_LEN = VOICE.len;
const VOICE_END = VOICE.end;
const NUM_GROUPS = VOICE.num.map((t) => snap(t + VO));
const ONSET = VOICE.onset;
const on = (k) => snap(ONSET[k] + VO);
// Fecha de lanzamiento de las kombuchas: si tiene valor, aparece bajo "MUY PRONTO" (ej. 'Noviembre 2026').
const LAUNCH_DATE = '';
const CLOSE_MAX = 10; // el cierre dura como máximo 10 s
const HOLD_END = 2; // variante tienda: el cierre queda 2 s tras la última palabra (para leer la dirección)
const WORDS = JSON.parse(fs.readFileSync(new URL(`../${TRANSCRIPT}`, import.meta.url), 'utf8'));
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9%]/g, '');
function w(word, nth = 1) {
  const hits = WORDS.filter((x) => norm(x.text) === norm(word));
  if (!hits[nth - 1]) throw new Error(`palabra no encontrada en la voz: ${word} #${nth}`);
  return snap(hits[nth - 1].start + VO);
}

// ── Paleta ──────────────────────────────────────────────────────────────
const CREMA = '#F5F2EA';
const TINTA = '#16201A';
const MIEL = '#F2B705';
const BG = {
  fucsia: { c: ['#FBD9E8', '#E683B6', '#B0186B'], stops: [0, 18, 46], at: '50% 70%', dark: true, kw: '#FFC4E0', arch: 'rgba(90, 0, 45, 0.28)', drop: '#F7A8CB' },
  verdoso: { c: ['#FFFFFF', '#EEF6EF', '#CDE5D3'], dark: false, kw: '#2F7D52', arch: 'rgba(47, 125, 82, 0.13)', drop: '#FFFFFF' },
  morado: { c: ['#E2D7F6', '#9A7FD4', '#47297F'], dark: true, kw: '#D8C8FF', arch: 'rgba(30, 10, 70, 0.3)', drop: '#B9A4EA' },
  rosa: { c: ['#FFF1F4', '#FAC6D3', '#F29AB2'], dark: false, kw: '#A0123F', arch: 'rgba(160, 18, 63, 0.14)', drop: '#E8456B' },
  cacao: { c: ['#EEDFCF', '#AE7C5C', '#573220'], dark: true, kw: '#F3CBA4', arch: 'rgba(40, 18, 6, 0.32)', drop: '#7A4A2E' },
  violeta: { c: ['#E7DAFB', '#8B57D6', '#3A1873'], dark: true, kw: '#D5BFFF', arch: 'rgba(25, 5, 60, 0.32)', drop: '#A77AF0' },
  turquesa: { c: ['#D9F6F8', '#5CC9D4', '#0B6A77'], dark: true, kw: '#9DEFF6', arch: 'rgba(0, 45, 55, 0.3)', drop: '#5CD6E4' },
  sorteo: { style: 'linear-gradient(150deg, #C2187A 0%, #8E1F82 48%, #5B2A86 100%)', dark: true, kw: MIEL, wave: '#C2187A', mid: '#8E1F82' },
  noche: { style: 'radial-gradient(circle at 50% 62%, #2A1638 0%, #120A1A 62%)', dark: true, kw: '#E9D5FF', wave: '#120A1A', mid: '#3A1F4E' },
  bosque: { style: 'linear-gradient(170deg, #16201A 0%, #1E3A2F 100%)', dark: true, kw: '#9FD8B4', wave: '#1E3A2F', mid: '#2F5A47' },
  poster: { style: 'radial-gradient(55% 28% at 50% 22%, rgba(143, 209, 158, 0.28), transparent 70%), radial-gradient(60% 30% at 78% 62%, rgba(242, 183, 5, 0.16), transparent 70%), linear-gradient(180deg, #183026 0%, #14231B 55%, #0F1A14 100%)', dark: true, kw: '#8FD19E', wave: '#14231B', mid: '#1E3528' },
  papel: { c: ['#FFFDF8', '#F8EFDD', '#EAD7B4'], stops: [0, 40, 80], dark: false, kw: '#1E5A3A', arch: 'rgba(30, 90, 58, 0.1)', wave: '#F2B705', mid: '#FBF4EC' },
};
const waveFront = (bg) => BG[bg].wave || BG[bg].c[2];
const waveBack = (bg) => BG[bg].mid || BG[bg].c[1];

// Tamaño natural de cada imagen (para la caja con su proporción exacta).
const SIZE = {
  'assets/kefir/vertido-frutos.webp': [1024, 1536],
  'assets/kefir/frutos-botella.webp': [1049, 1499],
  'assets/kefir/leche-splash.webp': [1023, 1537],
  'assets/kefir/vertido-fresa.webp': [1024, 1536],
  'assets/kefir/sabores/fresa-botella.webp': [1086, 1448],
  'assets/kefir/sabores/arandanos-botella.webp': [1024, 1536],
  'assets/kefir/sabores/chocolate-botella.webp': [1024, 1536],
  'assets/scenes/kombucha-guisante.png': [1122, 1402],
  'assets/scenes/kombucha-espirulina.png': [1024, 1536],
  'assets/scenes/canasta-trialferi.webp': [4511, 3800],
  'assets/scenes/kombucha-pitahaya.webp': [1009, 1600],
  'assets/scenes/kombucha-pitahaya-diagonal.webp': [1059, 1600],
  'assets/scenes/kefir-trio-frutos.png': [1122, 1402],
};

// ── Tiempos (palabras de la voz) ─────────────────────────────────────────
// Variante tienda: gancho de degustación → kéfir (igual) → artesanal → degustación → cierre con la tienda.
const storeTimes = () => ({
  ...(DEG ? {
    g: 0,
    este: w('este'),
    degust: w('degustacion'),
    kefirG: w('kefir'),
    biotienda: w('biotienda'),
  } : {}),
  h1: DEG ? on('ya') : 0,
  h2: w('cuatro'),
  fruits: [w('fresa'), w('frambuesa'), w('arandano'), w('sarsamura')],
  A: w('yel'),
  vaca: w('vaca'),
  cabra: w('cabra'),
  ribbons: [w('pasteurizado'), w('sin'), w('100%')],
  acero: w('acero'),
  primera: on('es'),
  steps: [w('empieza'), w('ayunas'), w('aumentando')],
  treinta: w('30'),
  fr: on('lo'),
  frFresa: w('fresa', 2),
  frArand: w('arandanos'),
  frChoc: w('chocolate'),
  todos: w('todos'),
  stevia: w('estevia'),
  art: on('productos'), // "Productos 100% artesanales, sin conservantes añadidos, hecho a mano, lote a lote."
  artesanales: w('artesanales'),
  sinC: w('sin', 2),
  hecho: w('hecho'),
  ...(DEG ? {
    deg: on('te'), // "¡Te esperamos este domingo 25 de octubre…"
    degDomingo: w('domingo', 2),
    deg25: w('25', 2),
    octubre: w('octubre'),
    ocho: w('8'),
    gratis: w('gratis'),
    naturales: w('naturales'),
    sinComp: w('sin', 3),
  } : {}),
  cierre: on('estamos'),
  verde: w('verderais'),
  complejo: w('complejo'),
  comas: w('comas'),
  t77: w('77'),
  unicachi: w('unikachi'),
  whatsapp: w('whatsapp'),
});
const T = STORE ? storeTimes() : {
  h1: 0,
  h2: on('cuatro'),
  fruits: [on('fresa'), w('frambuesa'), w('arandano'), w('sarsamura')],
  A: w('yel'), // "Y el clásico, kéfir de leche de vaca o de cabra…"
  vaca: w('vaca'),
  cabra: w('cabra'),
  ribbons: [w('pasteurizado'), w('sin'), w('100%')],
  acero: w('acero'),
  primera: on('es'), // "¿Es tu primera vez?"
  steps: [w('empieza'), w('ayunas'), w('aumentando')],
  treinta: w('30'),
  fr: on('lo'), // "¿Lo prefieres con fruta?"
  frFresa: w('fresa'),
  frArand: w('arandanos'),
  frChoc: w('chocolate'),
  todos: w('todos'),
  stevia: w('estevia'),
  // Teaser de kombuchas (aún no están a la venta)
  kt: w('yse'), // "Y se viene algo nuevo…"
  llegan: w('llegan'), // "¡Llegan las kombuchas Trialféri!"
  flor: w('flor'),
  espirulina: w('espirulina'),
  pitahaya: w('pitahaya'),
  kp: w('burgujiantes'), // "Burbujeantes, artesanales y hechas con té verde"
  artesanalesK: w('artesanales', 1),
  teVerde: w('hechas'),
  muy: on('muy'), // "¡Muy pronto! ¡No te las pierdas!"
  sorteo: w('este'),
  ticket: w('compras'),
  tear: w('sorteo'),
  cierre: w('artesanales', 2),
  sealB: w('sin', 2),
  hecho: w('echo'),
  pide: w('pide'),
};
const END = STORE ? snap(VO + VOICE_END + HOLD_END) : snap(T.cierre + CLOSE_MAX);
if (END - VO - VOICE_END < 0.5) throw new Error('la cola tras la voz quedó en menos de 0.5 s');
const STICKER = DEG ? { a: T.h1, b: T.deg } : null; // sticker fijo de la degustación (entre el gancho y la escena DEGUSTACIÓN)

/* Volúmenes (RMS en su momento más fuerte). Voz ≈ -18 dB. Música 0.85 sin voz,
   0.255 (30 %) bajo la voz ≈ -29 dB. Prioridad: voz > música > vertido/splash/destape
   (≈ -32) > burbujas/brindis (≈ -35) > woosh/pop (≈ -39). */
const VOL = { voz: 1, music: 0.85, duck: 0.255, duckDeep: 0.15, burbujasLejos: 0.1, destapeSuave: 0.13, vertido: 0.7, splash: 0.22, splashSoft: 0.13, destape: 0.21, burbujas: 0.24, brindis: 0.12, woosh: 0.04, pop: 0.08, sello: 0.14, 'raices-crecen': 0.14, 'campanita-tienda': 0.16 };
const SFX_LEN = { vertido: 2.08, splash: 2.08, burbujas: 2.0, woosh: 2.0, pop: 0.69, destape: 1.6, brindis: 0.81, sello: 0.69, 'raices-crecen': 1.6, 'campanita-tienda': 1.6 };
const PEAK = { woosh: 0.6, destape: 0.25, brindis: 0.2 };

// ── helpers ─────────────────────────────────────────────────────────────
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attrJson = (o) => esc(JSON.stringify(o)).replace(/"/g, '&quot;');
function mulberry32(a) { return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const seedOf = (s) => s.split('').reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) | 0, 7);

function words(title) {
  const out = [];
  let kw = false;
  for (const tok of title.split(' ')) {
    let x = tok;
    const open = x.startsWith('[');
    const close = x.endsWith(']');
    if (open) { kw = true; x = x.slice(1); }
    if (close) x = x.slice(0, -1);
    out.push(`<span class="w${kw ? ' kw' : ''}">${esc(x)}</span>`);
    if (close) kw = false;
  }
  return out.join(' ');
}
// texto con una frase que se ilumina con la voz: "ollas de {acero quirúrgico}"
const hl = (text) => esc(text).replace(/\{([^}]+)\}/g, '<span class="hl">$1</span>');

function bgStyle(name) {
  const b = BG[name];
  if (b.style) return `background: ${b.style}`;
  const [c0, c1, c2] = b.c;
  const [s0, s1, s2] = b.stops || [0, 30, 64];
  return `background: radial-gradient(circle farthest-corner at ${b.at || '50% 62%'}, ${c0} ${s0}%, ${c1} ${s1}%, ${c2} ${s2}%, ${c2} 100%)`;
}

// Caja con la proporción exacta de la imagen: el brillo y la tapa se ubican en % de la foto.
function imgBox(src, extra = '') {
  const [iw, ih] = SIZE[src] || [1000, 1500];
  return `<div class="imgbox" style="aspect-ratio: ${iw} / ${ih}"><img src="${src}" alt="" /><div class="shine" style="-webkit-mask-image: url('${src}'); mask-image: url('${src}')"></div>${extra}</div>`;
}

/* Botella a escala real: [src, alto visible px, caja visible medida en la foto (l, t, r, b, ancho, alto)].
   La caja recorta el aire transparente de la foto; debajo va un reflejo. */
const REAL = {
  guisante: ['assets/scenes/kombucha-guisante-botella.png', [290, 7, 733, 1528, 1024, 1536]],
  espirulina: ['assets/scenes/kombucha-espirulina-botella.png', [313, 26, 712, 1500, 1024, 1536]],
  pitahaya: ['assets/scenes/kombucha-pitahaya-botella.webp', [19, 19, 459, 1580, 479, 1600]],
  kefir1L: ['assets/scenes/kefir-leche-botella.webp', [287, 41, 737, 1489, 1024, 1536]],
  frutos: ['assets/kefir/frutos-botella.webp', [225, 4, 809, 1465, 1049, 1499]],
  // fotos inclinadas: se enderezan girando la imagen (3.er valor); la caja se midió ya girada
  fresa: ['assets/kefir/sabores/fresa-botella.webp', [332, 25, 843, 1325, 1086, 1448], -14],
  arandanos: ['assets/kefir/sabores/arandanos-botella.webp', [296, 103, 746, 1330, 1024, 1536], -11],
};
// Alto relativo por capacidad (1 L : 475 ml = 620 : 480)
const ML_H = { kefir1L: 620, frutos: 480, fresa: 480, arandanos: 480 };
// Ancho visible de la botella cuando mide H px de alto.
const realWidth = (key, H) => { const [, [l, t, rr, bb]] = REAL[key]; return Math.round(((rr - l) * H) / (bb - t)); };
function realBottle(key, H, id, { style = '', extra = '' } = {}) {
  const [src, [l, t, rr, bb, iw, ih], rot] = REAL[key];
  const s = H / (bb - t);
  const box = `width: ${Math.round((rr - l) * s)}px; height: ${H}px`;
  const img = `width: ${Math.round(iw * s)}px; height: ${Math.round(ih * s)}px; left: ${-Math.round(l * s)}px; top: ${-Math.round(t * s)}px${rot ? `; transform: rotate(${rot}deg)` : ''}`;
  return `<div class="real" id="${id}" style="${box}${style ? '; ' + style : ''}"><div class="real-crop" data-layout-allow-overflow><img src="${src}" alt="" style="${img}" /></div><div class="real-refl" data-layout-allow-overflow><img src="${src}" alt="" style="${img}" /></div>${extra}</div>`;
}

const LEAVES = '<path d="M-2 14C-14 10-18-2-14-16C-2-14 4-4-2 14Z" /><path d="M2 14C14 10 18-2 14-16C2-14-4-4 2 14Z" opacity="0.75" /><path d="M0 18V2" stroke-width="2" fill="none" />';
function sealHtml(kind, id, cls = '') {
  const ring = kind === 'sin' ? 'SIN CONSERVANTES AÑADIDOS · SIN CONSERVANTES AÑADIDOS ·' : '100% ARTESANAL · HECHO A MANO · 100% ARTESANAL ·';
  const center = kind === 'sin'
    ? `<g transform="translate(75 77)" class="seal-ink">${LEAVES}</g>`
    : '<text x="75" y="86" text-anchor="middle" class="seal-big">100%</text>';
  return `<div id="${id}" class="seal ${cls}"><svg viewBox="0 0 150 150" aria-hidden="true">
            <defs><path id="${id}-p" d="M75 75m-55 0a55 55 0 1 1 110 0a55 55 0 1 1 -110 0" /></defs>
            <circle cx="75" cy="75" r="72" class="seal-bg" /><circle cx="75" cy="75" r="66" class="seal-line" /><circle cx="75" cy="75" r="42" class="seal-line" />
            <text class="seal-ring"><textPath href="#${id}-p" textLength="340">${ring}</textPath></text>${center}
          </svg></div>`;
}
const WA_ICON = '<svg class="wa-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="M32 6C17.6 6 6 17.4 6 31.5c0 4.9 1.4 9.5 3.9 13.4L6 58l13.5-3.8c3.7 2 8 3.1 12.5 3.1 14.4 0 26-11.4 26-25.5S46.4 6 32 6z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><path d="M24.5 19.5c-.8-.1-1.8 0-2.6.9-1.3 1.4-3 3.2-3 6.6 0 6.5 7.9 15.7 16.4 18.8 3.8 1.4 6.4 1.2 8.3-.4 1.3-1.1 1.8-2.6 1.8-3.8 0-.7-.4-1.2-1-1.5l-5.2-2.5c-.7-.3-1.4-.1-1.9.5l-2 2.5c-.4.5-1.1.6-1.6.3-3.4-1.7-6.3-4.5-8.1-7.8-.3-.6-.2-1.2.2-1.6l1.9-2.1c.5-.5.6-1.2.3-1.9l-2.3-5.6c-.3-.6-.7-1-1.2-1.1z" fill="currentColor"/></svg>';
const CHECK = '<svg class="check" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18" /><path d="M11 21l6 6 12-13" /></svg>';
const BRUSH = '<svg class="brush" viewBox="0 0 520 120" preserveAspectRatio="none" aria-hidden="true"><path d="M18 64 C 90 40, 170 76, 250 58 S 410 44, 500 62" /></svg>';

// ── construcción ────────────────────────────────────────────────────────
const bgClips = [];
const content = [];
const overlays = [];
const ANIM = [];
const audio = [];
const A = (o) => ANIM.push(Object.fromEntries(Object.entries(o).map(([k, v]) => [k, typeof v === 'number' ? r(v) : v])));

function pushAudio(file, start, extra = {}) {
  if (!fs.existsSync(new URL(`../assets/sfx/${file}.mp3`, import.meta.url))) return; // efecto opcional que aún no existe
  const s0 = r(Math.max(0, start));
  const dur = r(Math.min(extra.duration ?? SFX_LEN[file], END - s0));
  if (dur <= 0.05) return;
  const n = audio.filter((a) => a.file === file).length + 1;
  audio.push({ id: `sfx-${file}-${n}`, file, start: s0, dur, vol: extra.vol ?? VOL[file], fadeOut: extra.fadeOut });
}
const pop = (at) => pushAudio('pop', at - 0.02, { duration: 0.18, fadeOut: 0.08 });

function bg(id, a, b, name) {
  bgClips.push(`<div id="bg-${id}" class="clip bg" ${clipTime(a, b)} data-track-index="0"><div class="fill" style="${bgStyle(name)}"></div></div>`);
}
function section(id, a, b, cls, inner) {
  // el sticker de la degustación ocupa la franja de y ≈ 245: los títulos de esas escenas bajan
  if (STICKER && a >= STICKER.a - 0.01 && b <= STICKER.b + 0.01) cls += ' bajo-sticker';
  content.push(`<section id="${id}" class="clip scene ${cls}" ${clipTime(a, b)} data-track-index="1">
        ${inner}
      </section>`);
}
const ribbon = (text, cls = '') => `<span class="ribbon-wrap ${cls}"><span class="ribbon">${hl(text)}</span></span>`;
const kefirWord = (id) => `<div class="brand-word" id="${id}"><span class="bw-outline">KÉFIR</span><span class="bw-fill">KÉFIR</span></div>`;

function dropsHtml(id, x, y, n, color, at) {
  const rnd = mulberry32(seedOf(id));
  const out = [];
  for (let i = 0; i < n; i++) {
    const size = 10 + Math.round(rnd() * 16);
    const did = `${id}-drop-${i}`;
    out.push(`<span id="${did}" class="drop" style="left: ${x - size / 2}px; top: ${y - size / 2}px; width: ${size}px; height: ${size}px; background: ${color}"></span>`);
    const dir = i % 2 ? 1 : -1;
    A({ k: 'drop', sel: '#' + did, at: at + rnd() * 0.25, dx: Math.round(dir * (120 + rnd() * 320)), up: Math.round(160 + rnd() * 300), fall: Math.round(700 + rnd() * 500), dur: 1.0 + rnd() * 0.5 });
  }
  return `<div class="drops">${out.join('')}</div>`;
}

// Salida: primero el texto (300 ms), al final el producto (300 ms).
function exitScene(id, b, { text = '.copy', product = '.enter' } = {}) {
  const sel = text.split(',').map((s) => (s.trim().startsWith('#') ? s.trim() : `#${id} ${s.trim()}`)).join(', ');
  A({ k: 'fade', sel, at: b - 0.55, dur: 0.3 });
  A({ k: 'exit', sel: `#${id} ${product}`, at: b - 0.3, dur: 0.3 });
}

const scenes = [];
const cutsWhoosh = [];
const waves = [];

// ── TIENDA · GANCHO: "¡Este domingo 25, degustación gratuita…!" (frame 0 ya con contenido) ──
const shelfRow = (prefix, keys, unit, gap = 18) => {
  // fila de botellas a escala real entre sí; devuelve el html y el ancho total
  let x = 0;
  const items = keys.map((k, i) => {
    const H = Math.round(ML_H[k] * unit);
    const wd = realWidth(k, H);
    const html = realBottle(k, H, `${prefix}-${i}`, { style: `position: absolute; left: ${x}px; bottom: 0` });
    x += wd + gap;
    return html;
  });
  return { html: items.join(''), width: x - gap };
};
const DEG_BOTTLES = DEG ? STORE.degustacion.productos.map((p) => PRODUCT_BOTTLE[p]) : [];
if (DEG) {
  const id = 'g0', a = T.g, b = T.h1;
  const d = STORE.degustacion;
  bg(id, a, b, 'bosque');
  const row = shelfRow('g0-b', DEG_BOTTLES, 0.62, 22);
  section(id, a, b, 'gancho', `<div class="g-light"></div>
        <div class="copy on-dark g-copy">
          <h1 class="g-title"><span class="g-l1">ESTE</span><span class="g-l2">DOMINGO</span><span class="g-l3">${esc(d.numero)}</span></h1>
        </div>
        <div class="g-pill-slot"><span class="g-pill" id="g0-pill">DEGUSTACIÓN GRATIS</span></div>
        <div class="g-store"><span class="g-circle"><img src="${STORE.logo.planta}" alt="" /></span><span class="g-en">en Biotienda ${esc(STORE.name)}</span></div>
        <div class="g-row" style="top: 1880px; left: ${540 - Math.round(row.width / 2)}px; width: ${row.width}px">${row.html}</div>
        <div class="flash g-flash" id="g0-flash"></div>`);
  // frame 0: destello de luz sobre el verde y el título ya cayendo
  A({ k: 'flashIn', sel: '#g0-flash', at: a });
  A({ k: 'impact', sel: '#g0 .g-title', at: a, land: T.este, dur: 0.25 });
  pushAudio('sello', T.este - 0.02, { duration: 0.5, fadeOut: 0.1 });
  A({ k: 'parallax', sel: '#bg-g0 .fill', at: a, dur: b - a, to: 1.04 });
  A({ k: 'glowBg', sel: '#g0 .g-light', at: a, end: b });
  A({ k: 'pop', sel: '#g0-pill', at: T.degust }); pop(T.degust);
  A({ k: 'fromBelow', sel: '#g0 .g-row .real', at: T.kefirG - 0.1, stagger: 0.1 });
  A({ k: 'rise', sel: '#g0 .g-store', at: T.biotienda - 0.1 }); pop(T.biotienda);
  // la pill se encoge y vuela al lugar del sticker; el resto sale
  // centro de la pill (490, 1047) → centro del sticker (540, 218)
  A({ k: 'toSticker', sel: '#g0-pill', at: b - 0.4, dur: 0.4, dx: 50, dy: -829, scale: 0.6 });
  A({ k: 'fade', sel: '#g0 .g-copy, #g0 .g-store', at: b - 0.4, dur: 0.3 });
  A({ k: 'exit', sel: '#g0 .g-row', at: b - 0.3, dur: 0.3 });
  scenes.push([id, a, b]);
}

// ── GANCHO 1: vertido de frutos del bosque (frame 0 completo) ───────────
{
  const id = 'h1', a = T.h1, b = T.h2;
  bg(id, a, b, 'fucsia');
  section(id, a, b, 'vertido', `<div class="copy on-dark" style="--kw: ${BG.fucsia.kw}">
          ${kefirWord('h1-kefir')}
          <div class="flavor-line">de frutos del bosque</div>
          <div class="chips">${ribbon('Endulzado con {stevia}')}</div>
        </div>
        <div class="stage"><div class="arch" style="--arch: ${BG.fucsia.arch}"></div><div class="shadow"></div><div class="enter"><div class="float">${imgBox('assets/kefir/vertido-frutos.webp')}</div></div></div>`);
  A({ k: 'zoom', sel: '#h1 .enter', at: a, dur: b - a - 0.3, from: 1, to: 1.08 });
  A({ k: 'parallax', sel: '#bg-h1 .fill', at: a, dur: b - a, to: 1.03 });
  A({ k: 'drift', sel: '#h1 .copy', at: a, dur: b - a - 0.55, y: -12 });
  A({ k: 'ribbon', sel: '#h1 .ribbon', at: a + 0.5 }); pop(a + 0.5);
  A({ k: 'shine', sel: '#h1 .shine', at: a + 0.3 });
  exitScene(id, b);
  pushAudio('vertido', a);
  if (a > 0) cutsWhoosh.push(a);
  scenes.push([id, a, b]);
}

// ── GANCHO 2: 4 frutos en 1 botella (las frutas llegan volando al nombrarlas) ──
{
  const id = 'h2', a = T.h2, b = T.A;
  bg(id, a, b, 'fucsia');
  const tags = [
    { text: 'Fresa', x: 60, y: 880, from: [-520, -160] },
    { text: 'Frambuesa', x: 150, y: 1020, from: [-560, 120] },
    { text: 'Arándano', x: 60, y: 1160, from: [-520, -90] },
    { text: 'Zarzamora', x: 150, y: 1300, from: [-560, 160] },
  ];
  section(id, a, b, 'product', `<div class="copy on-dark" style="--kw: ${BG.fucsia.kw}">
          <h1 class="title">${words('[4 frutos] en 1 botella')}</h1>
        </div>
        <div class="stage right"><div class="arch" style="--arch: ${BG.fucsia.arch}"></div><div class="shadow"></div><div class="enter"><div class="splash"><img src="assets/kefir/splash-frutos.png" alt="" /></div><div class="float">${imgBox('assets/kefir/frutos-botella.webp')}</div></div></div>
        ${tags.map((t, k) => `<span class="tag fly" id="h2-tag-${k}" style="left: ${t.x}px; top: ${t.y}px">${esc(t.text)}</span>`).join('')}
        ${dropsHtml('h2', 330, 1150, 10, BG.fucsia.drop, a + 0.1)}`);
  A({ k: 'bottle', sel: '#h2 .enter', at: a });
  A({ k: 'shine', sel: '#h2 .shine', at: a + 0.35 });
  A({ k: 'splash', sel: '#h2 .splash', at: a + 0.04, end: b - 0.3 });
  A({ k: 'words', sel: '#h2 .title .w', at: a + 0.15 });
  A({ k: 'float', sel: '#h2 .float', at: a, end: b });
  tags.forEach((t, k) => { A({ k: 'flyIn', sel: `#h2-tag-${k}`, at: T.fruits[k] - 0.1, fx: t.from[0], fy: t.from[1], rot: k % 2 ? 24 : -24 }); pop(T.fruits[k]); });
  exitScene(id, b, { text: '.copy, .tag' });
  pushAudio('splash', a + 0.02);
  cutsWhoosh.push(a);
  scenes.push([id, a, b]);
}

// ── KÉFIR NATURAL: vaca o cabra con el splash; una sola cinta que cambia de texto ──
{
  const id = 'kN', a = T.A, b = T.primera;
  bg(id, a, b, 'verdoso');
  const src = 'assets/scenes/kefir-leche-duo.png';
  const lines = ['Pasteurizado en ollas de {acero quirúrgico}', '0% de azúcar añadida', '100% kéfir natural, no es yogurt estilo kéfir'];
  section(id, a, b, 'duo', `<div class="copy on-light" style="--kw: ${BG.verdoso.kw}">
          ${kefirWord('kN-kefir')}
          <div class="flavor-line">de vaca o de cabra</div>
          <div class="chips"><span class="ribbon-wrap swap"><span class="ribbon"><span class="rs-slot">${lines.map((t, k) => `<span class="rs" id="kN-rs-${k}">${hl(t)}</span>`).join('')}</span></span></span></div>
        </div>
        <div class="duo-box">
          <div class="arch" style="--arch: ${BG.verdoso.arch}"></div>
          <div class="duo-art">
            <div class="duo-ext" data-layout-allow-overflow><img src="${src}" alt="" /></div>
            <div class="duo-refl" data-layout-allow-overflow><img src="${src}" alt="" /></div>
            <img class="duo-full" src="${src}" alt="" />
          </div>
          <img class="duo-l" src="${src}" alt="" />
          <img class="duo-r" src="${src}" alt="" />
          <div class="duo-tag" style="left: 42%"><span class="tag" id="kN-tag-cabra">Libre pastoreo</span></div>
          <div class="duo-tag" style="left: 66%"><span class="tag" id="kN-tag-vaca">Leche de establo</span></div>
        </div>
        ${dropsHtml('kN', 540, 1250, 8, '#FFFFFF', a + 0.6)}`);
  A({ k: 'liquid', sel: '#kN-kefir .bw-fill', at: a + 0.05, dur: 0.9 });
  A({ k: 'rise', sel: '#kN .flavor-line', at: a + 0.3 });
  A({ k: 'sideIn', sel: '#kN .duo-l', at: a, fx: -240 });
  A({ k: 'sideIn', sel: '#kN .duo-r', at: a, fx: 240 });
  A({ k: 'meet', sel: '#kN .duo-full', at: a + 0.55, hide: '#kN .duo-l, #kN .duo-r' });
  A({ k: 'archIn', sel: '#kN .arch', at: a });
  A({ k: 'slowZoom', sel: '#kN .duo-art', at: a + 0.9, dur: b - a - 1.5, to: 1.03 });
  A({ k: 'fadeIn', sel: '#kN .duo-ext, #kN .duo-refl', at: a + 0.6 });
  A({ k: 'pop', sel: '#kN-tag-vaca', at: T.vaca }); pop(T.vaca);
  A({ k: 'pop', sel: '#kN-tag-cabra', at: T.cabra }); pop(T.cabra);
  // la cinta se despliega con la primera frase; luego solo cambia el texto (sale arriba, entra desde abajo)
  A({ k: 'ribbon', sel: '#kN .ribbon', at: T.ribbons[0] - 0.1 }); pop(T.ribbons[0] - 0.1);
  T.ribbons.forEach((t, k) => {
    if (k > 0) A({ k: 'swapOut', sel: `#kN-rs-${k - 1}`, at: t - 0.05 });
    A({ k: 'swapIn', sel: `#kN-rs-${k}`, at: k ? t : t - 0.1, first: k === 0 });
  });
  A({ k: 'glow', sel: '#kN .hl', at: T.acero });
  exitScene(id, b, { text: '.copy, .duo-tag', product: '.duo-box' });
  pushAudio('splash', a + 0.5);
  waves.push({ at: a, bg: 'verdoso' });
  scenes.push([id, a, b]);
}

// ── PRIMERA VEZ ─────────────────────────────────────────────────────────
{
  const id = 'pv', a = T.primera, b = T.fr;
  bg(id, a, b, 'verdoso');
  const steps = ['Empieza con un shot de {30 ml}', 'En ayunas', 'Aumenta poco a poco'];
  section(id, a, b, 'primera', `<div class="copy on-light" style="--kw: ${BG.verdoso.kw}">
          <h1 class="title mid">${words('¿Primera vez con [kéfir?]')}</h1>
        </div>
        <div class="steps-row">
          <ol class="steps">${steps.map((s, k) => `<li class="step"><span class="num">${k + 1}</span><span class="step-text">${hl(s)}</span>${CHECK}</li>`).join('')}</ol>
          <div class="shot">
            <svg viewBox="0 0 200 260" aria-hidden="true">
              <defs><clipPath id="shot-clip"><path d="M30 20 H170 L152 236 Q150 246 140 246 H60 Q50 246 48 236 Z" /></clipPath></defs>
              <g clip-path="url(#shot-clip)"><rect class="shot-liquid" x="0" y="90" width="200" height="170" /></g>
              <path class="shot-glass" d="M30 20 H170 L152 236 Q150 246 140 246 H60 Q50 246 48 236 Z" />
              <line class="shot-mark" x1="36" y1="90" x2="164" y2="90" />
            </svg>
            <span class="shot-label">30 ml</span>
          </div>
        </div>
        <div class="stage arch-photo"><div class="photo enter"><img src="assets/kefir/primera-vez.webp" alt="" /></div></div>`);
  A({ k: 'words', sel: '#pv .title .w', at: a + 0.1 });
  A({ k: 'bottle', sel: '#pv .photo', at: a });
  A({ k: 'slowZoom', sel: '#pv .photo img', at: a + 0.6, dur: b - a - 1.2, to: 1.06 });
  A({ k: 'rise', sel: '#pv .shot', at: a + 0.5 });
  A({ k: 'fillShot', sel: '#pv .shot-liquid', at: T.treinta - 0.3 });
  T.steps.forEach((t, k) => {
    A({ k: 'step', sel: `#pv .step:nth-child(${k + 1})`, at: t }); pop(t);
    A({ k: 'check', sel: `#pv .step:nth-child(${k + 1}) .check path`, at: t + 0.3 });
  });
  A({ k: 'glow', sel: '#pv .hl', at: T.treinta, color: '#2F7D52' });
  exitScene(id, b, { text: '.copy, .steps-row', product: '.photo' });
  cutsWhoosh.push(a);
  scenes.push([id, a, b]);
}

// ── FRUTADOS: corte de continuidad (la botella no se mueve; cambia de sabor) ──
{
  const id = 'fr', a = T.fr, b = STORE ? T.art : T.kt;
  const phases = [
    { key: 'fresa', at: T.frFresa, bg: 'rosa', name: 'Fresa', line: 'con pulpa natural', brush: '#C81D3A', img: 'assets/kefir/sabores/fresa-botella.webp',
      splashes: [{ src: 'assets/kefir/sabores/fresa-splash-1.png', cls: 'bl' }, { src: 'assets/kefir/sabores/fresa-splash-2.png', cls: 'br' }] },
    { key: 'arand', at: T.frArand, bg: 'morado', name: 'Arándanos', line: 'con pulpa natural', brush: '#5A36A8', img: 'assets/kefir/sabores/arandanos-botella.webp',
      splashes: [{ src: 'assets/kefir/sabores/arandanos-splash-1.png', cls: 'bl wide' }, { src: 'assets/kefir/sabores/arandanos-splash-2.png', cls: 'tr wide' }] },
    { key: 'choc', at: T.frChoc, bg: 'cacao', name: 'Chocolate', line: 'con cacao de Quillabamba', brush: '#3E2416', img: 'assets/kefir/sabores/chocolate-botella.webp',
      splashes: [{ src: 'assets/kefir/sabores/chocolate-splash.png', cls: 'center' }] },
  ];
  // Fresa es una sola escena: arranca en "¿Lo prefieres con fruta?" con el vertido rosa y pasa a la botella en "fresa".
  phases.forEach((p, k) => { p.end = k < phases.length - 1 ? phases[k + 1].at : b; bg(`fr-${p.key}`, k ? p.at : a, p.end, p.bg); });
  const sabor = phases.map((p) => `<div class="sabor" id="fr-sabor-${p.key}"><span class="sabor-tag">SABOR</span><span class="sabor-name">${BRUSH.replace('<path', `<path style="stroke: ${p.brush}"`)}<span>${esc(p.name)}</span></span></div>`).join('');
  const lines = phases.map((p) => `<div class="flavor-line fr-line" id="fr-line-${p.key}">${esc(p.line)}</div>`).join('');
  const splashes = phases.map((p) => p.splashes.map((s, j) => `<div class="pspl ${s.cls}" id="fr-spl-${p.key}-${j}"><img src="${s.src}" alt="" /></div>`).join('')).join('');
  const bottles = phases.map((p) => `<div class="fr-bottle" id="fr-bottle-${p.key}">${imgBox(p.img)}</div>`).join('');
  section(id, a, b, 'frutados', `<div class="copy on-light" id="fr-copy" style="--kw: ${BG.rosa.kw}">
          ${kefirWord('fr-kefir')}
          <div class="sabores"><div class="sabor fr-ask" id="fr-ask">¿Lo prefieres con fruta?</div>${sabor}</div>
          <div class="fr-lines">${lines}</div>
          <div class="chips">${ribbon('Endulzado con {stevia}')}</div>
        </div>
        <div class="stage"><div class="arch" style="--arch: ${BG.rosa.arch}"></div><div class="shadow"></div>${splashes}
          <div class="enter"><div class="fr-vertido">${imgBox('assets/kefir/vertido-fresa.webp')}</div><div class="float">${bottles}</div></div>
        </div>
        ${phases.map((p) => dropsHtml(`fr-${p.key}`, 540, 1250, 10, BG[p.bg].drop, p.at + 0.05)).join('')}`);
  A({ k: 'bottle', sel: '#fr .fr-vertido', at: a });
  A({ k: 'zoom', sel: '#fr .fr-vertido .imgbox', at: a, dur: T.frFresa - a, from: 1, to: 1.08 });
  A({ k: 'xfadeOut', sel: '#fr .fr-vertido', at: T.frFresa - 0.15 });
  A({ k: 'liquid', sel: '#fr-kefir .bw-fill', at: a + 0.05, dur: 0.9 });
  A({ k: 'rise', sel: '#fr-ask', at: a + 0.2 });
  A({ k: 'fadeQuick', sel: '#fr-ask', at: T.frFresa - 0.25 });
  A({ k: 'ribbon', sel: '#fr .ribbon', at: T.todos }); pop(T.todos);
  A({ k: 'glow', sel: '#fr .hl', at: T.stevia });
  A({ k: 'archIn', sel: '#fr .arch', at: a });
  A({ k: 'float', sel: '#fr .float', at: a, end: b });
  pushAudio('vertido', a - 0.15, { duration: r(Math.min(SFX_LEN.vertido, T.frFresa - a + 0.15)), fadeOut: 0.15 });
  phases.forEach((p, k) => {
    if (k > 0) {
      // la ola cambia el fondo; la botella se funde al nuevo sabor en el mismo lugar
      waves.push({ at: p.at, bg: p.bg });
      A({ k: 'setVar', sel: '#fr-copy', at: p.at, vars: { '--ink': BG[p.bg].dark ? CREMA : TINTA, '--kw': BG[p.bg].kw } });
      A({ k: 'xfadeOut', sel: `#fr-bottle-${phases[k - 1].key}`, at: p.at - 0.05 });
      A({ k: 'fadeQuick', sel: `#fr-sabor-${phases[k - 1].key}, #fr-line-${phases[k - 1].key}`, at: p.at - 0.25 });
      phases[k - 1].splashes.forEach((_, j) => A({ k: 'fadeQuick', sel: `#fr-spl-${phases[k - 1].key}-${j}`, at: p.at - 0.2 }));
    }
    A({ k: 'xfadeIn', sel: `#fr-bottle-${p.key}`, at: p.at });
    A({ k: 'shine', sel: `#fr-bottle-${p.key} .shine`, at: p.at + 0.25 });
    p.splashes.forEach((_, j) => A({ k: 'burst', sel: `#fr-spl-${p.key}-${j}`, at: p.at, rot: j % 2 ? 14 : -14 }));
    A({ k: 'sabor', sel: `#fr-sabor-${p.key}`, at: p.at + 0.05 }); pop(p.at + 0.05);
    A({ k: 'rise', sel: `#fr-line-${p.key}`, at: p.at + 0.12, dur: 0.4 });
    pushAudio('splash', p.at + 0.02, { vol: VOL.splashSoft, duration: 1.2, fadeOut: 0.2 });
  });
  exitScene(id, b, { text: '.copy', product: '.enter' });
  phases.at(-1).splashes.forEach((_, j) => A({ k: 'fadeQuick', sel: `#fr-spl-${phases.at(-1).key}-${j}`, at: b - 0.3 }));
  waves.push({ at: a, bg: 'rosa' });
  scenes.push([id, a, b]);
}

// ── VARIANTE TIENDA: artesanal → degustación → cierre con la tienda ─────
function buildStoreScenes() {
  const d = STORE.degustacion;
  // ARTESANAL: "Productos 100 % artesanales, sin conservantes añadidos, hecho a mano, lote a lote."
  {
    const id = 'art', a = T.art, b = DEG ? T.deg : T.cierre;
    bg(id, a, b, 'verdoso');
    section(id, a, b, 'artesanal', `<div class="copy on-light" style="--kw: ${BG.verdoso.kw}">
          <h1 class="title mid">${words('[100%] artesanales')}</h1>
          <div class="flavor-line art-sin">sin conservantes añadidos</div>
          <div class="chips">${ribbon('Hecho a mano, {lote a lote}')}</div>
        </div>
        <div class="stage"><div class="arch" style="--arch: ${BG.verdoso.arch}"></div><div class="shadow"></div><div class="enter"><div class="float">${imgBox('assets/scenes/kefir-trio-frutos.png')}</div></div>
          ${sealHtml('art', 'art-seal-art', 'art-seal art-seal-l')}${sealHtml('sin', 'art-seal-sin', 'art-seal art-seal-r')}
        </div>`);
    A({ k: 'words', sel: '#art .title .w', at: a + 0.1 });
    A({ k: 'bottle', sel: '#art .enter', at: a });
    A({ k: 'archIn', sel: '#art .arch', at: a });
    A({ k: 'shine', sel: '#art .shine', at: a + 0.4 });
    A({ k: 'float', sel: '#art .float', at: a, end: b });
    A({ k: 'stamp', sel: '#art-seal-art', at: T.artesanales }); pushAudio('sello', T.artesanales + 0.2, { duration: 0.5, fadeOut: 0.1 });
    A({ k: 'rise', sel: '#art .art-sin', at: T.sinC });
    A({ k: 'stamp', sel: '#art-seal-sin', at: T.sinC + 0.3 }); pushAudio('sello', T.sinC + 0.5, { duration: 0.5, fadeOut: 0.1 });
    A({ k: 'ribbon', sel: '#art .ribbon', at: T.hecho }); pop(T.hecho);
    exitScene(id, b, { text: '.copy, .art-seal', product: '.enter' });
    waves.push({ at: a, bg: 'verdoso' });
    scenes.push([id, a, b]);
  }

  // DEGUSTACIÓN: "¡Te esperamos este domingo 25 de octubre de 8 y media…! Ven a probar gratis…"
  if (DEG) {
    const id = 'deg', a = T.deg, b = T.cierre;
    bg(id, a, b, 'papel');
    const row = shelfRow('deg-b', DEG_BOTTLES, 0.74, 34);
    section(id, a, b, 'degusta', `<div class="copy on-light deg-copy">
          <h1 class="deg-title"><span class="dl dl-row"><span class="dl-t">¡VEN A</span>${d.gratis ? '<span class="deg-gratis-tilt"><span class="deg-gratis" id="deg-gratis">GRATIS</span></span>' : ''}</span><span class="dl"><span class="dl-t">PROBARLOS!</span></span></h1>
        </div>
        <div class="cal-wrap">
          <div class="cal" id="deg-cal"><div class="cal-head">${esc(d.dia)}</div><div class="cal-num">${esc(d.numero)}</div><div class="cal-mes">${esc(d.mes)}</div><span class="cal-ring l"></span><span class="cal-ring r"></span></div>
          <div class="deg-stamp" id="deg-stamp"><span>DEGUSTACIÓN</span></div>
        </div>
        <div class="deg-info"><p class="deg-hora" id="deg-hora">🕘 ${esc(d.horario)}</p><p class="deg-nota" id="deg-nota">${esc(d.nota)}</p></div>
        <div class="deg-row" style="top: 1820px; left: ${540 - Math.round(row.width / 2)}px; width: ${row.width}px">${row.html}</div>`);
    A({ k: 'words', sel: '#deg .deg-title .dl', at: a + 0.05 });
    if (d.gratis) { A({ k: 'pop', sel: '#deg-gratis', at: a + 0.45 }); pop(a + 0.45); A({ k: 'bump', sel: '#deg-gratis', at: T.gratis }); }
    // la hoja del calendario cae y rebota con "domingo"; el 25 late con la voz; el sello cae encima
    A({ k: 'calFall', sel: '#deg-cal', at: T.degDomingo - 0.35 });
    pop(T.degDomingo + 0.2);
    A({ k: 'bump', sel: '#deg .cal-num', at: T.deg25 });
    A({ k: 'stamp', sel: '#deg-stamp', at: T.octubre + 0.15 }); pushAudio('sello', T.octubre + 0.35, { duration: 0.5, fadeOut: 0.1 });
    A({ k: 'rise', sel: '#deg-hora', at: T.ocho - 0.1 });
    A({ k: 'rise', sel: '#deg-nota', at: T.sinComp });
    A({ k: 'fromBelow', sel: '#deg .deg-row .real', at: T.naturales - 0.35, stagger: 0.12 });
    // chin-chin: las dos del medio se inclinan hasta tocarse
    const chin = b - 1.15;
    A({ k: 'chin', sel: '#deg-b-1', at: chin, rot: 9 });
    A({ k: 'chin', sel: '#deg-b-2', at: chin, rot: -9 });
    pushAudio('brindis', chin + 0.28 - PEAK.brindis);
    exitScene(id, b, { text: '.deg-copy, .cal-wrap, .deg-info', product: '.deg-row' });
    waves.push({ at: a, bg: 'papel' });
    scenes.push([id, a, b]);
  }

  /* CIERRE: póster editorial (valores de assets/stores/referencia-cierre-verde-raiz.html).
     La planta se arma por partes (hojas → raíces), luego las raíces decorativas, el nombre, los datos,
     el sello de la degustación y los productos. */
  {
    const id = 'cierre', a = T.cierre, b = END;
    bg(id, a, b, 'poster');
    const [lugar, ...resto] = STORE.ubicacion.split(' · ');
    // [src, centro x, top, alto (o ancho para los cottage), z]; de atrás hacia adelante = orden de entrada
    const PRODUCTS = [
      ['natural', 'assets/scenes/kefir-leche-botella.webp', 580, 1262, { h: 560 }, 4, [1024, 1536]],
      ['arandanos', 'assets/stores/arandanos-botella-recta.png', 385, 1372, { h: 430 }, 3, [472, 1231]],
      ['fresa', 'assets/stores/fresa-botella-recta.png', 765, 1372, { h: 430 }, 3, [556, 1307]],
      ['frutos', 'assets/kefir/frutos-botella.webp', 240, 1440, { h: 410 }, 5, [1049, 1499]],
      ...(STORE.showCottage ? [
        ['cottage-ajo', 'assets/stores/cottage-cabra-ajo.png', 905, 1600, { w: 230 }, 6, [484, 493]],
        ['cottage-olivo', 'assets/stores/cottage-cabra-olivo.png', 760, 1660, { w: 260 }, 7, [521, 412]],
      ] : []),
    ];
    // sin cottage: el grupo de botellas se recentra en la pantalla
    const widthOf = ([, , , , sz, , [iw, ih]]) => (sz.w || (sz.h * iw) / ih);
    const lo = Math.min(...PRODUCTS.map((p) => p[2] - widthOf(p) / 2)), hi = Math.max(...PRODUCTS.map((p) => p[2] + widthOf(p) / 2));
    const shift = STORE.showCottage ? 0 : Math.round(540 - (lo + hi) / 2);
    const products = PRODUCTS.map(([key, src, x, top, sz, z]) => `<div class="cv-p" style="left: ${x + shift}px; top: ${top}px; z-index: ${z}"><img id="cv-${key}" src="${src}" alt="" style="${sz.h ? `height: ${sz.h}px` : `width: ${sz.w}px`}" /></div>`).join('');
    const seal = DEG ? `<div class="cv-seal" id="cv-seal"><span class="cv-seal-a">DEGUSTACIÓN</span>${d.gratis ? '<span class="cv-seal-g">GRATIS</span>' : ''}<span class="cv-seal-n">${esc(d.dia)} ${esc(d.numero)}</span><span class="cv-seal-h">${esc(d.horario)}</span></div>` : '';
    const WA = '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 6C17.6 6 6 17.4 6 31.5c0 4.9 1.4 9.5 3.9 13.4L6 58l13.5-3.8c3.7 2 8 3.1 12.5 3.1 14.4 0 26-11.4 26-25.5S46.4 6 32 6z" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/><path d="M24.5 19.5c-.8-.1-1.8 0-2.6.9-1.3 1.4-3 3.2-3 6.6 0 6.5 7.9 15.7 16.4 18.8 3.8 1.4 6.4 1.2 8.3-.4 1.3-1.1 1.8-2.6 1.8-3.8 0-.7-.4-1.2-1-1.5l-5.2-2.5c-.7-.3-1.4-.1-1.9.5l-2 2.5c-.4.5-1.1.6-1.6.3-3.4-1.7-6.3-4.5-8.1-7.8-.3-.6-.2-1.2.2-1.6l1.9-2.1c.5-.5.6-1.2.3-1.9l-2.3-5.6c-.3-.6-.7-1-1.2-1.1z" fill="currentColor"/></svg>';
    section(id, a, b, 'poster', `<svg class="cv-grain" data-layout-allow-overflow aria-hidden="true"><filter id="cv-noise"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter><rect width="100%" height="100%" filter="url(#cv-noise)" /></svg>
        <svg class="cv-roots" viewBox="0 0 1080 1920" fill="none" stroke="#8FD19E" stroke-linecap="round" aria-hidden="true">
          <path pathLength="1" d="M540 545 C 470 620, 300 640, 170 720 S 70 840, 64 900" stroke-width="4" />
          <path pathLength="1" d="M64 900 C 56 1000, 60 1100, 66 1160" stroke-width="3" />
          <path pathLength="1" d="M540 545 C 640 615, 820 640, 930 740 S 1000 860, 990 900" stroke-width="4" />
          <path pathLength="1" d="M170 720 C 130 700, 100 690, 70 700" stroke-width="2.5" />
          <path pathLength="1" d="M930 740 C 960 720, 990 715, 1020 720" stroke-width="2.5" />
        </svg>
        <div class="cv-top" id="cv-top"><i></i><span id="cv-tf">TRIALFERI</span><i></i></div>
        <div class="cv-kick" id="cv-kick">${DEG ? 'ESTAMOS EN' : 'ENCUÉNTRALOS EN'}</div>
        <div class="cv-plant"><img id="cv-hojas" src="${STORE.logo.hojasClaro}" alt="" /><img id="cv-raices" src="${STORE.logo.raicesClaro}" alt="" /></div>
        <img class="cv-word" id="cv-word" src="${STORE.logo.textoCrema}" alt="${esc(STORE.name)}" />
        <div class="cv-info">
          <div class="cv-donde"><div class="cv-lab"><b>📍</b>DÓNDE</div><div class="cv-big">${esc(lugar.toUpperCase())}</div><div class="cv-med">${esc(resto.join(' · '))}</div><div class="cv-sm">${esc(STORE.referencia)}</div></div>
          <div class="cv-sep" id="cv-sep"></div>
          <div class="cv-pedidos"><div class="cv-lab"><b class="cv-wa">${WA}</b>PEDIDOS</div><div class="cv-big">${esc(STORE.whatsapp)}</div><div class="cv-med">WhatsApp · ${esc(STORE.tiktok)}</div></div>
        </div>
        <div class="cv-floor"></div>
        ${products}
        ${seal}`);
    // 1. TRIALFERI y "ESTAMOS EN" con fade; hojas con pop; raíces de arriba hacia abajo en "Verde Raíz"
    A({ k: 'fadeIn', sel: '#cv-top, #cv-kick', at: a });
    A({ k: 'tighten', sel: '#cv-tf', at: a });
    A({ k: 'sprout', sel: '#cv-hojas', at: a + 0.3 }); pop(a + 0.3);
    A({ k: 'rootsGrow', sel: '#cv-raices', at: T.verde - 0.05, dur: 1.2 });
    pushAudio('raices-crecen', T.verde - 0.05, { duration: 1.4, fadeOut: 0.3 });
    // 2. al terminar las raíces, las líneas decorativas se dibujan hacia los bordes
    A({ k: 'draw', sel: '#cierre .cv-roots path', at: T.verde + 1.15, dur: 0.9 });
    // 3. nombre de la tienda
    A({ k: 'riseIn', sel: '#cv-word', at: T.verde + 0.6 });
    pushAudio('campanita-tienda', T.verde + 0.6, { duration: 1.2, fadeOut: 0.3 });
    // 4. datos: DÓNDE con "Unicachi", PEDIDOS con "WhatsApp"
    A({ k: 'lineIn', sel: '#cierre .cv-donde > *', at: T.unicachi - 0.1, stagger: 0.08 });
    A({ k: 'fadeIn', sel: '#cv-sep', at: T.whatsapp - 0.3 });
    A({ k: 'lineIn', sel: '#cierre .cv-pedidos > *', at: T.whatsapp - 0.1, stagger: 0.08 });
    // 5. sello de la degustación (cuando la voz termina la dirección)
    if (DEG) { A({ k: 'sealDrop', sel: '#cv-seal', at: T.t77 + 0.6 }); pushAudio('sello', T.t77 + 0.95, { duration: 0.5, fadeOut: 0.1 }); }
    // 6. productos en cascada de atrás hacia adelante; los cottage rebotan al aterrizar
    const pa = a + 0.35;
    PRODUCTS.forEach(([key], i) => {
      const at = pa + i * 0.1;
      A({ k: key.startsWith('cottage') ? 'landBounce' : 'riseUp', sel: `#cv-${key}`, at });
      if (key.startsWith('cottage')) pushAudio('pop', at + 0.42, { vol: VOL.pop * 0.6, duration: 0.18, fadeOut: 0.08 });
    });
    waves.push({ at: a, bg: 'poster' });
    scenes.push([id, a, b]);
  }
}
if (STORE) buildStoreScenes();

// ── KOMBUCHAS: teaser de lanzamiento (aún no están a la venta) ───────────
const KT_ROW = ['guisante', 'espirulina', 'pitahaya']; // 355 ml las tres: misma altura real
// a) intriga: siluetas a contraluz · b) revelación: destello y pasan a color
if (!STORE) {
  const id = 'kt', a = T.kt, b = T.flor;
  bg(id, a, b, 'noche');
  section(id, a, b, 'teaser', `<div class="copy on-dark" style="--kw: ${BG.noche.kw}">
          <div class="kt-slot">
            <p class="kt-tease" id="kt-tease">Se viene algo nuevo…</p>
            <div class="kt-brand brand kombu" id="kt-brand"><div class="kb-stack"><span>KOM</span><span>BU</span><span>CHA</span></div><span class="nuevo" id="kt-nuevo">Nuevo</span></div>
          </div>
        </div>
        <div class="kt-halo"></div>
        <div class="kt-row sil" id="kt-row">${KT_ROW.map((k, i) => realBottle(k, 860, `kt-b-${i}`)).join('')}</div>
        <div class="flash" id="kt-flash"></div>`);
  A({ k: 'slowZoom', sel: '#kt-row', at: a, dur: b - a, to: 1.04 });
  A({ k: 'glowBg', sel: '#kt .kt-halo', at: a, end: T.llegan });
  A({ k: 'rise', sel: '#kt-tease', at: a + 0.15, dur: 1.0 });
  // revelación en "¡Llegan las kombuchas…!"
  A({ k: 'flash', sel: '#kt-flash', at: T.llegan - 0.06 });
  A({ k: 'colorize', sel: '#kt .real img', at: T.llegan });
  A({ k: 'fadeQuick', sel: '#kt-tease', at: T.llegan - 0.1 });
  A({ k: 'brandIn', sel: '#kt-brand', at: T.llegan + 0.05 });
  A({ k: 'stamp', sel: '#kt-nuevo', at: T.llegan + 0.45 }); pop(T.llegan + 0.45);
  A({ k: 'shake', sel: '#kt-row', at: T.llegan });
  exitScene(id, b, { text: '.copy', product: '.kt-row' });
  // suspenso: burbujas lejanas; destape en la revelación
  pushAudio('burbujas', a + 0.1, { vol: VOL.burbujasLejos, duration: r(Math.min(SFX_LEN.burbujas, T.llegan - a - 0.1)), fadeOut: 0.4 });
  pushAudio('destape', T.llegan - PEAK.destape, { vol: VOL.destapeSuave });
  waves.push({ at: a, bg: 'noche' });
  scenes.push(['kt-intriga', a, T.llegan], ['kt-reveal', T.llegan, b]);
}

// c) desfile: una botella grande por nombre, corte seco en cada palabra
if (!STORE) {
  const id = 'kd', a = T.flor, b = T.kp;
  const phases = [
    { key: 'guisante', at: T.flor, img: 'assets/scenes/kombucha-guisante.png', halo: 'rgba(139, 87, 214, 0.42)', flavor: 'con flor de guisante', cap: [61, 4.5] },
    { key: 'espirulina', at: T.espirulina, img: 'assets/scenes/kombucha-espirulina.png', halo: 'rgba(24, 178, 196, 0.36)', flavor: 'con espirulina azul', cap: [53, 3.5] },
    { key: 'pitahaya', at: T.pitahaya, img: 'assets/scenes/kombucha-pitahaya.webp', halo: 'rgba(200, 0, 90, 0.34)', flavor: 'con pitahaya', cap: [48.5, 3.2, 22, 4.6], diagonal: 'assets/scenes/kombucha-pitahaya-diagonal.webp' },
  ];
  phases.forEach((p, k) => { p.end = k < phases.length - 1 ? phases[k + 1].at : b; });
  bg(id, a, b, 'noche');
  const bottle = (p) => {
    const rnd = mulberry32(seedOf(p.key));
    const bubbles = Array.from({ length: 12 }, () => `<span class="bubble" style="left: ${Math.round(30 + rnd() * 40)}%; top: ${Math.round(18 + rnd() * 50)}%; width: ${8 + Math.round(rnd() * 14)}px; height: ${8 + Math.round(rnd() * 14)}px"></span>`).join('');
    const capSize = p.cap[2] ? `; width: ${p.cap[2]}%; height: ${p.cap[3]}%; margin-left: ${-p.cap[2] / 2}%` : '';
    const cap = `<span class="cap" style="left: ${p.cap[0]}%; top: ${p.cap[1]}%${capSize}"><span class="cap-body"></span></span>`;
    const diag = p.diagonal ? `<div class="kd-diag" id="kd-diag-${p.key}">${imgBox(p.diagonal)}</div>` : '';
    return `<div class="kd-bottle" id="kd-${p.key}"><div class="kd-halo" style="background: radial-gradient(closest-side, ${p.halo}, rgba(0, 0, 0, 0))"></div>${diag}<div class="kd-main" id="kd-main-${p.key}"><div class="float">${imgBox(p.img, cap + bubbles)}</div></div></div>`;
  };
  section(id, a, b, 'product kombucha', `<div class="cam"><div class="copy on-dark" style="--kw: ${BG.noche.kw}">
          <div class="brand kombu"><div class="kb-stack"><span>KOM</span><span>BU</span><span>CHA</span></div><div class="kd-flavors">${phases.map((p) => `<div class="flavor-line" id="kd-fl-${p.key}">${esc(p.flavor)}</div>`).join('')}</div></div>
        </div>
        <div class="stage"><div class="shadow"></div><div class="enter">${phases.map(bottle).join('')}</div></div></div>`);
  phases.forEach((p, k) => {
    // corte seco: el sabor anterior desaparece en el mismo frame en que entra el nuevo
    // (10 ms antes del frame del corte, para que ese frame ya muestre el sabor nuevo)
    A({ k: 'show', sel: `#kd-${p.key}, #kd-fl-${p.key}`, at: p.at - 0.01 });
    if (k < phases.length - 1) A({ k: 'hide', sel: `#kd-${p.key}, #kd-fl-${p.key}`, at: p.end - 0.01 });
    if (p.diagonal) {
      // pitahaya: entra en diagonal y gira hasta quedar vertical
      A({ k: 'tiltIn', sel: `#kd-diag-${p.key}`, at: p.at, rot: -18 });
      A({ k: 'xfadeOut', sel: `#kd-diag-${p.key}`, at: p.at + 0.2 });
      A({ k: 'xfadeIn', sel: `#kd-main-${p.key}`, at: p.at + 0.2 });
    } else {
      A({ k: 'bottle', sel: `#kd-main-${p.key}`, at: p.at });
    }
    A({ k: 'capPop', sel: `#kd-${p.key} .cap`, at: p.at + 0.08 });
    A({ k: 'bubbles', sel: `#kd-${p.key} .bubble`, at: p.at + 0.15, end: p.end + 0.6 });
    A({ k: 'float', sel: `#kd-${p.key} .float`, at: p.at, end: p.end });
    A({ k: 'shine', sel: `#kd-${p.key} .shine`, at: p.at + 0.15 });
    pushAudio('destape', p.at + 0.08 - PEAK.destape, { vol: VOL.destapeSuave });
  });
  A({ k: 'shake', sel: '#kd .cam', at: a + 0.08 });
  A({ k: 'brandIn', sel: '#kd .brand', at: a });
  pushAudio('burbujas', a + 0.3, { duration: r(Math.min(SFX_LEN.burbujas, b - a - 0.3)), fadeOut: 0.3 });
  // la pitahaya dura menos de 1 s: el texto se queda hasta el corte y solo sale el producto
  A({ k: 'exit', sel: '#kd .enter', at: b - 0.3, dur: 0.3 });
  scenes.push(['kt-desfile', a, b]);
}

// d) muy pronto: eyebrow → cinta → pills; las tres en V (pitahaya adelante, con "Nuevo")
if (!STORE) {
  const id = 'kp', a = T.kp, b = T.sorteo;
  bg(id, a, b, 'noche');
  const attrs = [['Burbujeantes', T.kp], ['Artesanales', T.artesanalesK], ['Con té verde', T.teVerde]];
  // [botella, centro x, base y, alto, z, halo]: los lados atrás (base más alta), la pitahaya al frente y 10 % más grande
  const V = [
    ['guisante', 250, 1700, 1110, 1, 'rgba(139, 87, 214, 0.75)'],
    ['espirulina', 830, 1700, 1110, 1, 'rgba(24, 178, 196, 0.7)'],
    ['pitahaya', 540, 1800, 1220, 3, 'rgba(200, 0, 90, 0.7)'],
  ];
  const bottles = V.map(([key, cx, base, H, z, halo], i) => {
    const wd = realWidth(key, H);
    const rnd = mulberry32(seedOf('kp' + key));
    const bubbles = Array.from({ length: 9 }, () => `<span class="bubble small" style="left: ${Math.round(20 + rnd() * 60)}%; top: ${Math.round(40 + rnd() * 40)}%; width: ${6 + Math.round(rnd() * 8)}px; height: ${6 + Math.round(rnd() * 8)}px"></span>`).join('');
    const sticker = key === 'pitahaya' ? '<span class="nuevo kp-nuevo" id="kp-nuevo">Nuevo</span>' : '';
    return realBottle(key, H, `kp-b-${i}`, {
      style: `position: absolute; left: ${cx - wd / 2}px; top: ${base - H}px; z-index: ${z}`,
      extra: `<div class="kp-halo" data-layout-allow-overflow style="background: radial-gradient(closest-side, ${halo}, rgba(0, 0, 0, 0))"></div><div class="kp-bubbles">${bubbles}</div>${sticker}`,
    });
  });
  section(id, a, b, 'teaser kp-scene', `<div class="copy on-dark" style="--kw: ${BG.noche.kw}">
          <p class="kp-eyebrow">KOMBUCHAS</p>
          <div class="kp-pronto"><span class="ribbon-wrap"><span class="ribbon big">MUY PRONTO</span></span></div>
          ${LAUNCH_DATE ? `<p class="kp-date">${esc(LAUNCH_DATE)}</p>` : ''}
          <div class="kp-pills">${attrs.map(([t], i) => `<span class="kp-pill" id="kp-a-${i}">${esc(t)}</span>`).join('')}</div>
        </div>
        <div class="kp-v" id="kp-row">${bottles.join('')}</div>`);
  A({ k: 'rise', sel: '#kp .kp-eyebrow', at: a });
  A({ k: 'bottle', sel: '#kp-b-0, #kp-b-1', at: a, stagger: 0.07 });
  A({ k: 'bottle', sel: '#kp-b-2', at: a + 0.14 });
  V.forEach((_, i) => {
    A({ k: 'float', sel: `#kp-b-${i}`, at: a + 0.9 + i * 0.25, end: b - 0.3 });
    A({ k: 'bubbles', sel: `#kp-b-${i} .bubble`, at: a + 0.4 + i * 0.2, end: b - 0.3 });
  });
  A({ k: 'stamp', sel: '#kp-nuevo', at: a + 0.7 }); pop(a + 0.7);
  attrs.forEach(([, t], i) => { A({ k: 'pop', sel: `#kp-a-${i}`, at: t }); pop(t); });
  A({ k: 'ribbon', sel: '#kp .ribbon', at: T.muy }); pop(T.muy);
  if (LAUNCH_DATE) A({ k: 'rise', sel: '#kp .kp-date', at: T.muy + 0.4 });
  exitScene(id, b, { text: '.copy', product: '.kp-v' });
  pushAudio('burbujas', a + 0.2, { vol: VOL.burbujasLejos, duration: SFX_LEN.burbujas, fadeOut: 0.5 });
  scenes.push(['kt-pronto', a, b]);
}

// ── SORTEO: el ticket se arranca por la línea punteada + ráfaga de confeti ──
if (!STORE) {
  const id = 's9', a = T.sorteo, b = T.cierre;
  bg(id, a, b, 'sorteo');
  const rnd = mulberry32(2024);
  const colors = ['#F2B705', '#F5F2EA', '#18B2C4', '#A77AF0', '#F29AB2', '#FFC4E0'];
  const conf = [];
  for (let k = 0; k < 30; k++) {
    const cid = `s9-conf-${k}`;
    const wd = 12 + Math.round(rnd() * 10);
    conf.push(`<span id="${cid}" class="confetti" style="left: ${Math.round(rnd() * 1060)}px; width: ${wd}px; height: ${Math.round(wd * (1.4 + rnd()))}px; background: ${colors[k % colors.length]}"></span>`);
    const dur = 2.6 + rnd() * 1.4;
    A({ k: 'confetti', sel: '#' + cid, at: a + rnd() * Math.max(0.1, b - a - dur * 0.6), dur, drift: Math.round((rnd() - 0.5) * 220), rot: Math.round((rnd() - 0.5) * 900) });
  }
  const burst = [];
  for (let k = 0; k < 22; k++) {
    const bid = `s9-burst-${k}`;
    burst.push(`<span id="${bid}" class="confetti burst" style="width: 14px; height: 22px; background: ${colors[k % colors.length]}"></span>`);
    const ang = (k / 22) * Math.PI * 2 + rnd() * 0.3;
    const dist = 260 + rnd() * 260;
    A({ k: 'burstPiece', sel: '#' + bid, at: T.tear, dx: Math.round(Math.cos(ang) * dist), dy: Math.round(Math.sin(ang) * dist * 0.7), rot: Math.round((rnd() - 0.5) * 720) });
  }
  section(id, a, b, 'sorteo', `<div class="confettis" data-layout-allow-overflow>${conf.join('')}</div>
        <div class="copy on-dark" style="--kw: ${MIEL}">
          <div class="pre">${ribbon('Solo en octubre')}</div>
          <h1 class="title big"><span class="line">${words('Sorteamos una')}</span> <span class="line">${words('[canasta] TRIALFERI')}</span></h1>
        </div>
        <div class="ticket-wrap"><div class="ticket">
          <div class="ticket-stub"><svg viewBox="0 0 190 200" preserveAspectRatio="none" aria-hidden="true"><path class="ticket-shape" d="M24 0H190V200H24A24 24 0 0 1 0 176V128A28 28 0 0 0 0 72V24A24 24 0 0 1 24 0Z" /><path class="star" transform="translate(53 58) scale(0.84)" d="M50 8l11 27 29 2-22 19 7 28-25-15-25 15 7-28-22-19 29-2z"/></svg></div>
          <div class="ticket-main"><svg viewBox="0 0 570 200" preserveAspectRatio="none" aria-hidden="true"><path class="ticket-shape" d="M0 0H546A24 24 0 0 1 570 24V72A28 28 0 0 0 570 128V176A24 24 0 0 1 546 200H0Z" /><line x1="2" y1="18" x2="2" y2="182" class="ticket-dash" /></svg>
            <div class="ticket-body"><p class="t1">Por compras mayores a S/20</p><p class="t2">pide tu ticket</p></div></div>
          <div class="burst-origin" data-layout-allow-overflow>${burst.join('')}</div>
        </div></div>
        <div class="stage sorteo-stage"><div class="glow"></div><div class="enter"><div class="float">${imgBox('assets/scenes/canasta-trialferi.webp')}</div></div></div>`);
  A({ k: 'ribbon', sel: '#s9 .ribbon', at: a + 0.1 }); pop(a + 0.1);
  A({ k: 'words', sel: '#s9 .title .w', at: a + 0.25 });
  A({ k: 'bottle', sel: '#s9 .enter', at: a });
  A({ k: 'shine', sel: '#s9 .shine', at: a + 0.5 });
  A({ k: 'glowBg', sel: '#s9 .glow', at: a + 0.1, end: b });
  A({ k: 'float', sel: '#s9 .float', at: a, end: b });
  A({ k: 'ticket', sel: '#s9 .ticket', at: T.ticket }); pop(T.ticket);
  A({ k: 'tear', sel: '#s9 .ticket-stub', at: T.tear });
  pushAudio('splash', T.tear, { vol: VOL.splashSoft, duration: 0.8, fadeOut: 0.2 });
  exitScene(id, b, { text: '.copy, .ticket-wrap', product: '.enter' });
  waves.push({ at: a, bg: 'sorteo' });
  scenes.push([id, a, b]);
}

// ── CIERRE: logo, WhatsApp por grupos y estante con 4 botellas a escala real ─────
if (!STORE) {
  const id = 's10', a = T.cierre, b = END;
  bg(id, a, b, 'bosque');
  /* Proporción real entre ellas (1 L : 475 ml : 355 ml = 620 : 480 : 430); el grupo se escala para
     llenar el espacio bajo el texto. Base en y = 1700. Las kombuchas (aún no a la venta) llevan "Pronto"
     y van un poco adelante, solapando las de kéfir. */
  const BASE = 1700, K = 880 / 620;
  const SHELF = [
    { key: 'guisante', H: 430, z: 3, overlap: 0, pronto: true, seal: 'art' },
    { key: 'frutos', H: 480, z: 1, overlap: 10 },
    { key: 'kefir1L', H: 620, z: 2, overlap: 4 },
    { key: 'pitahaya', H: 430, z: 3, overlap: 12, pronto: true, seal: 'sin' },
  ].map((x) => ({ ...x, H: Math.round(x.H * K) }));
  let x0 = 0;
  SHELF.forEach((x) => { x.w = realWidth(x.key, x.H); x.left = x0 - x.overlap; x0 = x.left + x.w; });
  // centrado en la columna de texto (x 80–920), así la pill "Pronto" de la derecha no entra en la franja de 160 px
  const shift = Math.round(500 - x0 / 2);
  const shelf = SHELF.map((x, i) => {
    const seal = x.seal ? sealHtml(x.seal, `s10-seal-${x.seal}`, `seal-light seal-on seal-on-${i ? 'r' : 'l'}`) : '';
    const pronto = x.pronto ? '<div class="pronto-pos"><span class="pronto">Pronto</span></div>' : '';
    return realBottle(x.key, x.H, `s10-b-${i}`, { style: `position: absolute; left: ${x.left + shift}px; top: ${BASE - x.H}px; z-index: ${x.z}`, extra: pronto + seal });
  });
  const FLAG = '<svg class="flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="10" height="20" fill="#D91023"/><rect x="10" width="10" height="20" fill="#FFFFFF"/><rect x="20" width="10" height="20" fill="#D91023"/></svg>';
  section(id, a, b, 'closing', `<div class="logo-glow"></div>
        <div class="logo"><img src="assets/trialferi-logo.png" alt="TRIALFERI" /></div>
        <div class="wa-slot"><div class="wa-wrap"><div class="wa-ring"></div><div class="wa-btn">${WA_ICON}<span class="wa-num"><span class="g">941</span> <span class="g">462</span> <span class="g">492</span></span></div></div></div>
        <p class="cta-line">Pide por WhatsApp <span class="cta-sep">·</span> <span class="cta-handle">@trialferi</span></p>
        <p class="cta-made">Hecho a mano, lote a lote <span class="cta-sep">·</span> ${FLAG} Producto peruano</p>
        <div class="shelf-light"></div>
        <div class="shelf">${shelf.join('')}</div>`);
  A({ k: 'bottle', sel: '#s10 .logo', at: a });
  A({ k: 'glowBg', sel: '#s10 .logo-glow', at: a, end: b });
  A({ k: 'float', sel: '#s10 .logo img', at: a, end: b });
  // botellas de izquierda a derecha, 0.12 s entre cada una
  A({ k: 'bottle', sel: '#s10 .real', at: a, stagger: 0.12 });
  A({ k: 'pop', sel: '#s10 .pronto', at: a + 0.75 }); pop(a + 0.75);
  A({ k: 'stamp', sel: '#s10-seal-art', at: a + 0.45 }); pop(a + 0.45);
  A({ k: 'stamp', sel: '#s10-seal-sin', at: T.sealB }); pop(T.sealB);
  A({ k: 'rise', sel: '#s10 .cta-made', at: T.hecho });
  A({ k: 'rise', sel: '#s10 .cta-line', at: T.pide });
  A({ k: 'button', sel: '#s10 .wa-wrap', at: NUM_GROUPS[0] - 0.12 });
  NUM_GROUPS.forEach((t, k) => A({ k: 'group', sel: `#s10 .wa-num .g:nth-child(${k + 1})`, at: t }));
  A({ k: 'ring', sel: '#s10 .wa-ring', at: NUM_GROUPS[2] + 0.35 });
  A({ k: 'pulse', sel: '#s10 .wa-btn', at: NUM_GROUPS[2] + 0.6, end: b });
  // el brindis suena cuando el número queda completo
  pushAudio('brindis', NUM_GROUPS[2] + 0.35 - PEAK.brindis);
  waves.push({ at: a, bg: 'bosque' });
  scenes.push([id, a, b]);
}

// ── Olas de líquido (cambian de color justo en el corte) y whoosh ─────────
/* Franja de ~600 px que cruza la pantalla en 0.7 s: en el corte ocupa solo la franja central,
   arriba y abajo se ven las escenas (nunca hay un frame de color liso). */
const WAVE_DUR = 0.7;
waves.filter((v) => v.at > 0).forEach((c, k) => {
  const wid = `wave-${k}`;
  overlays.push(`<div id="${wid}" class="clip wave" data-start="${r(c.at - WAVE_DUR / 2)}" data-duration="${r(WAVE_DUR)}" data-track-index="3">
        <svg class="wave-svg" data-layout-allow-overflow viewBox="0 0 2160 800" preserveAspectRatio="none" aria-hidden="true">
          <path fill="${waveBack(c.bg)}" d="M0 90 C 180 20 360 20 540 90 S 900 160 1080 90 S 1440 20 1620 90 S 1980 160 2160 90 V 700 C 1980 770 1800 770 1620 700 S 1260 630 1080 700 S 720 770 540 700 S 180 630 0 700 Z" />
          <path fill="${waveFront(c.bg)}" d="M0 150 C 180 70 360 70 540 150 S 900 230 1080 150 S 1440 70 1620 150 S 1980 230 2160 150 V 620 C 1980 690 1800 690 1620 620 S 1260 550 1080 620 S 720 690 540 620 S 180 550 0 620 Z" />
        </svg>
      </div>`);
  A({ k: 'wave', sel: `#${wid} .wave-svg`, at: c.at - WAVE_DUR / 2, dur: WAVE_DUR });
  pushAudio('splash', c.at - 0.3, { vol: VOL.splashSoft, duration: 1.0, fadeOut: 0.25 });
});
cutsWhoosh.forEach((c) => pushAudio('woosh', c - PEAK.woosh, { duration: 1.2, fadeOut: 0.3 }));

// Sticker de la degustación: fijo bajo la barra de progreso de los estados de WhatsApp, encima de las olas.
if (STICKER) {
  overlays.push(`<div id="sticker" class="clip sticker-clip" ${clipTime(STICKER.a, STICKER.b)} data-track-index="2"><div class="sticker-pos"><span class="sticker" id="sticker-pill">${esc(STORE.degustacion.sticker)}</span></div></div>`);
  A({ k: 'breathe', sel: '#sticker-pill', at: STICKER.a + 0.15, end: STICKER.b - 0.3 });
  A({ k: 'fadeQuick', sel: '#sticker-pill', at: STICKER.b - 0.25 });
}

// Grano animado (cambia cada 2 frames), 3 % de opacidad.
overlays.push(`<div id="grain" class="clip grain" data-start="0" data-duration="${END}" data-track-index="9"></div>`);
A({ k: 'grain', sel: '#grain', at: 0, end: END });

// ── Audio ────────────────────────────────────────────────────────────────
function duckLane() {
  /* La voz trae sus propias pausas (≤ 0.4 s): la música queda al 30 % de punta a punta
     de la voz, sin subir entre frases. */
  const on0 = WORDS[0].start + VO;
  const off = VO + VOICE_END;
  // en la intriga de las kombuchas baja un poco más (suspenso) y vuelve al 30 % en la revelación
  if (STORE) {
    // sin teaser: 30 % bajo toda la voz y fundido de salida en los últimos 2 s
    return [{ t: 0, v: VOL.music }, { t: r(on0 - 0.08), v: VOL.music }, { t: r(on0 + 0.02), v: VOL.duck }, { t: r(END - 2), v: VOL.duck }, { t: END, v: 0 }];
  }
  const deep = [{ t: r(T.kt - 0.3), v: VOL.duck }, { t: r(T.kt + 0.2), v: VOL.duckDeep }, { t: r(T.llegan - 0.1), v: VOL.duckDeep }, { t: r(T.llegan + 0.15), v: VOL.duck }];
  return [{ t: 0, v: 0 }, { t: r(VO - 0.02), v: VOL.music }, { t: r(on0 - 0.08), v: VOL.music }, { t: r(on0 + 0.02), v: VOL.duck }, ...deep, { t: r(off), v: VOL.duck }, { t: r(off + 0.15), v: VOL.music }, { t: r(END - 0.3), v: VOL.music }, { t: END, v: 0 }];
}
/* musica.mp3 dura 30 s: se repite con cortes limpios en compás (sale en 27.454 s,
   retoma en 4.597 s) con micro-fundidos de 40 ms. */
const LOOP_OUT = 27.454, LOOP_IN = 4.597;
const lane = (points) => attrJson({ version: 1, lanes: [{ target: 'volume', points }] });
const musicClips = [];
for (let t0 = 0, media = 0, k = 0; t0 < END - 0.001; k++) {
  const len = Math.min(LOOP_OUT - media, END - t0);
  const last = t0 + len >= END - 0.001;
  const pts = [{ t: 0, v: k === 0 ? 1 : 0 }, { t: 0.04, v: 1 }];
  if (!last) pts.push({ t: r(len), v: 1 }, { t: r(len + 0.04), v: 0 });
  musicClips.push(`<audio id="music-${k}"${k === 0 ? ' data-timeline-role="music"' : ''} data-audio-group="musica" src="assets/sfx/musica.mp3" data-start="${r(t0)}"${media ? ` data-media-start="${media}"` : ''} data-duration="${r(last ? len : len + 0.04)}" data-track-index="${5 + (k % 2) * 7}" data-volume="1" data-automation="${lane(pts)}"></audio>`);
  t0 += len;
  media = LOOP_IN;
}
const NO_MUSIC = process.argv.includes('--sin-musica'); // versión reels: voz + efectos
const musicHtml = NO_MUSIC ? [] : [`<hf-audio-group id="musica" data-label="Música" data-volume="1" data-automation="${lane(duckLane())}"></hf-audio-group>`, ...musicClips];
const voiceHtml = `<audio id="voz" data-audio-group="voz" src="${VOICE_SRC}" data-start="${VO}" data-duration="${r(Math.min(VOICE_FILE_LEN, END - VO))}" data-track-index="4" data-volume="${VOL.voz}"></audio>`;

const TRACK = { vertido: 7, splash: 8, destape: 7, burbujas: 9, brindis: 9, woosh: 10, pop: 11, sello: 11, 'raices-crecen': 7, 'campanita-tienda': 9 };
const lanes = {};
for (const x of audio.sort((p, q) => p.start - q.start)) {
  let t = TRACK[x.file];
  let tries = 0;
  while ((lanes[t] || []).some((y) => y.start < x.start + x.dur && x.start < y.start + y.dur)) t = 20 + TRACK[x.file] * 4 + tries++;
  (lanes[t] ??= []).push(x);
  x.track = t;
}
const sfxHtml = audio.map((x) => {
  const auto = x.fadeOut ? ` data-automation="${lane([{ t: 0, v: 1 }, { t: r(x.dur - x.fadeOut), v: 1 }, { t: x.dur, v: 0 }])}"` : '';
  return `<audio id="${x.id}" data-audio-group="sfx" src="assets/sfx/${x.file}.mp3" data-start="${x.start}" data-duration="${x.dur}" data-track-index="${x.track}" data-volume="${x.vol}"${auto}></audio>`;
});
const MASTER = attrJson({ version: 1, nodes: [{ type: 'truepeak', id: 'n1', label: 'Techo de entrega', params: { ceiling: -3, lookahead: 3, release: 80 } }] });

// ── documento ───────────────────────────────────────────────────────────
// la variante tienda suma sus estilos y animaciones propias (la versión original no cambia)
const read = (f) => fs.readFileSync(new URL(f, import.meta.url), 'utf8');
const css = read('./style.css') + (STORE ? read('./tiendas.css') : '');
const LOOP_MARK = '      for (const a of ANIM) {';
const anim = STORE ? read('./timeline.js').replace(LOOP_MARK, read('./tiendas.js') + LOOP_MARK) : read('./timeline.js');
const OUT = STORE ? `index-${STORE_ID}${DEG ? '-degustacion' : ''}.html` : 'index.html';
const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <title>${STORE ? `TRIALFERI × ${esc(STORE.name)}${DEG ? ' — degustación' : ''}` : 'TRIALFERI — promo kéfir'}</title>
    <!-- Generado por scripts/build.mjs: edita los datos allí y vuelve a correr \`node scripts/build.mjs\`. -->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
${css}
    </style>
  </head>
  <body>
    <div
      id="root"
      data-composition-id="main"
      data-start="0"
      data-duration="${END}"
      data-width="1080"
      data-height="1920"
      data-fx-chain="${MASTER}"
    >
      ${bgClips.join('\n      ')}

      ${content.join('\n\n      ')}

      ${overlays.join('\n      ')}

      ${voiceHtml}
      ${musicHtml.join('\n      ')}
      ${sfxHtml.join('\n      ')}
    </div>
    <script>
      const ANIM = ${JSON.stringify(ANIM)};
${anim}
    </script>
  </body>
</html>
`;
fs.writeFileSync(new URL(`../${OUT}`, import.meta.url), html);
console.log(`${OUT}: ${r(END)} s · ${audio.length} efectos · ${ANIM.length} animaciones`);
console.log(scenes.map(([id, a, b]) => `${id} ${r(a)}–${r(b)} (${r(b - a)} s)`).join('\n'));
