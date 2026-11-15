/*
  Convierte la transcripción de Whisper (transcripts/*.whisper.json, hecha con
  `npx hyperframes transcribe <voz> -e whisper -m medium -l es`) al formato Caption de Remotion.
  Whisper pega palabras a los signos y oye mal algunas: aquí se corrigen a mano.
  Los grupos del número de WhatsApp se midieron por energía (astats), no los separa Whisper.
*/
import {readFileSync, writeFileSync} from 'fs';

const arreglos = {
  natural: {
    '100%': [['100 %']],
    contribuya: [['contribuye']],
    'añadidos.¿Es': [['añadidos.', 22.22, 22.86], ['¿Es', 23.18, 23.31]],
    '941-462-492.': [['941', 38.25, 39.34], ['462', 39.5, 40.41], ['492', 40.59, 41.6]],
  },
  frutado: {
    Cde: [['C', 13.5, 13.6], ['de', 13.6, 13.71]],
    Yel: [['Y', 18.66, 18.75], ['el', 18.75, 18.86]],
    'zarzamora.¿Te': [['zarzamora.', 25.72, 26.52], ['¿Te', 26.84, 26.91]],
    'quillabamba.': [['Quillabamba.']],
    Disfruta: [['Disfrútalos', 35.23, 35.88]],
    los: [],
    '941-462-492.': [['941', 40.72, 41.85], ['462', 42.03, 42.95], ['492', 43.13, 44.2]],
  },
};

for (const variante of ['natural', 'frutado']) {
  const palabras = JSON.parse(readFileSync(`transcripts/voz-kefir-${variante}.whisper.json`, 'utf8'));
  const fix = arreglos[variante];
  const out = [];
  for (const p of palabras) {
    // "los" solo se descarta cuando sigue a "Disfruta" (Disfrútalos)
    const regla = p.text === 'los' ? (out.at(-1)?.text.trim() === 'Disfrútalos' ? [] : null) : fix[p.text];
    const partes = regla ?? [[p.text]];
    for (const [text, a = p.start, b = p.end] of partes)
      out.push({text: (out.length ? ' ' : '') + text, startMs: Math.round(a * 1000), endMs: Math.round(b * 1000), timestampMs: Math.round(((a + b) / 2) * 1000), confidence: null});
  }
  writeFileSync(`src/datos/captions-${variante}.json`, JSON.stringify(out, null, 1));
  console.log(variante, out.length, 'palabras ·', out.map((c) => c.text.trim()).join(' '));
}
