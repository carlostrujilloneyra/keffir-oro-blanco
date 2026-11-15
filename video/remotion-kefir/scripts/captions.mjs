/*
  Convierte la transcripción de Whisper (transcripts/*-v2.whisper.json, hecha con
  `npx hyperframes transcribe <voz> -e whisper -m medium -l es`) al formato Caption de Remotion.
  Whisper pega palabras a los signos y oye mal algunas: aquí se corrigen a mano.
  Los cortes de palabras pegadas y los grupos del número de WhatsApp salen de los silencios reales (silencios.mjs), no de Whisper.
*/
import {readFileSync, writeFileSync} from 'fs';

const arreglos = {
  natural: {
    '100%': [['100 %']],
    'yogurt,': [['yogurt...']],
    'granolas,': [['granola,']],
    'fácil.¿Primera': [['fácil.', 33.83, 34.2], ['¿Primera', 34.51, 34.94]],
    '941-462-492.': [['941', 46.86, 47.5], ['462', 47.68, 48.6], ['492', 48.79, 49.73]],
  },
  frutado: {
    '¿Fresa,': [['Fresa,']],
    'chocolate?¿Cuál': [['chocolate...', 2.76, 3.62], ['¿cuál', 3.93, 4.11]],
    kefir: [['kéfir']],
    Cde: [['C', 14.29, 14.4], ['de', 14.4, 14.54]],
    Yel: [['Y', 19.18, 19.25], ['el', 19.25, 19.32]],
    'pedido,': [['pedido:']],
    'botella.¿Antojo': [['botella.', 23.3, 23.9], ['¿Antojo', 24.24, 24.52]],
    'quillabamba.': [['Quillabamba.']],
    estevia: [['stevia']],
    Solo: [['Solo,']],
    '941-462-492.': [['941', 37.46, 38.43], ['462', 38.6, 39.46], ['492', 39.64, 40.57]],
  },
};

for (const variante of ['natural', 'frutado']) {
  const palabras = JSON.parse(readFileSync(`transcripts/voz-kefir-${variante}-v2.whisper.json`, 'utf8'));
  const fix = arreglos[variante];
  const out = [];
  for (const p of palabras) {
    const partes = fix[p.text] ?? [[p.text]];
    for (const [text, a = p.start, b = p.end] of partes)
      out.push({text: (out.length ? ' ' : '') + text, startMs: Math.round(a * 1000), endMs: Math.round(b * 1000), timestampMs: Math.round(((a + b) / 2) * 1000), confidence: null});
  }
  writeFileSync(`src/datos/captions-${variante}.json`, JSON.stringify(out, null, 1));
  console.log(variante, out.length, 'palabras ·', out.map((c) => c.text.trim()).join(' '));
}
