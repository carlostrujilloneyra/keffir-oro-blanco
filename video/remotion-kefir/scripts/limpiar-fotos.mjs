/*
  Copias limpias de las fotos de fresa y frutos del bosque para la imagen fija de EcoCultivo: quita el borde del vaso
  y las gotas sueltas que, con la botella más chica, asoman en el borde de la franja. Las originales no se tocan.
  En cada zona (px a 1080 de ancho, fuera de la botella) los píxeles más claros que el fondo se funden con el color del fondo
  en esa misma fila, tomado de `ref` (una columna de fondo liso a la derecha de la botella).
*/
import {createRequire} from 'module';
const sharp = createRequire(new URL('../../node_modules/', import.meta.url))('sharp');
const FOTOS = [
  {src: 'fresa-hero', ref: 1050, zonas: [[500, 564, 880, 1760], [520, 586, 860, 960]]},
  {src: 'frutos-bosque-hero', ref: 1040, zonas: [[560, 660, 860, 1000], [560, 620, 1000, 1045]]},
];
const lum = (d, i) => d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11;

for (const {src, ref, zonas} of FOTOS) {
  const {data, info} = await sharp(`../assets/kefir/ia/${src}.png`).removeAlpha().raw().toBuffer({resolveWithObject: true});
  const W = info.width, f = W / 1080;
  for (const [x0, x1, y0, y1] of zonas)
    for (let y = Math.round(y0 * f); y <= Math.round(y1 * f); y++) {
      const r = (y * W + Math.round(ref * f)) * 3, fondo = lum(data, r);
      for (let x = Math.round(x0 * f); x <= Math.round(x1 * f); x++) {
        const i = (y * W + x) * 3;
        // cuánto más claro que el fondo: de 12 a 40 de luminancia pasa de la foto al fondo
        const w = Math.max(0, Math.min(1, (lum(data, i) - fondo - 12) / 28));
        for (let c = 0; c < 3; c++) data[i + c] = Math.round(data[i + c] * (1 - w) + data[r + c] * w);
      }
    }
  await sharp(data, {raw: {width: W, height: info.height, channels: 3}}).webp({quality: 92}).toFile(`public/img/${src}-limpia.webp`);
  console.log('→', `public/img/${src}-limpia.webp`);
}
