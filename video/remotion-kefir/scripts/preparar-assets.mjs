// Recorta el margen transparente de las botellas (para posicionarlas por su base) y genera el grano del fondo.
import {createRequire} from 'module';
const sharp = createRequire(new URL('../../node_modules/', import.meta.url))('sharp');
const O = '../assets', P = '../remotion-sorteo/public', D = 'public/img/';
const recortes = [
  [`${P}/vaca-1l.png`, 'vaca-1l.png', 238, 3, 451, 1449],
  [`${P}/frutos.png`, 'frutos.png', 225, 4, 585, 1463],
  [`${O}/kefir/sabores/chocolate-botella.webp`, 'chocolate-botella.png', 278, 84, 465, 1300],
  [`${O}/kefir/chocolate-mano.webp`, 'chocolate-mano.png', 272, 61, 768, 1267],
];
for (const [src, out, left, top, width, height] of recortes) await sharp(src).extract({left, top, width, height}).png().toFile(D + out);

/*
  Fotos héroe (3840x2560, producto a la derecha sobre fondo oscuro): se recorta la mitad derecha y se baja al 70 %.
  No llevan alfa: en la escena se funden con el fondo, que usa el mismo color oscuro de la foto.
*/
for (const [src, out] of [['hero-vaca-cabra.png', 'hero-vaca-cabra.png'], ['hero-frutos-bosque-vaso.png', 'hero-frutos-vaso.png']])
  await sharp(`${O}/kefir/${src}`).extract({left: 1700, top: 0, width: 2140, height: 2560}).resize(1498, 1792).png({compressionLevel: 9}).toFile(D + out);

// Grano: ruido gris a media resolución (se estira x2 y se mezcla con overlay sobre cada fondo).
const W = 540, H = 960, buf = Buffer.alloc(W * H);
let s = 1234567;
const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
for (let i = 0; i < W * H; i++) buf[i] = Math.max(0, Math.min(255, 128 + (rnd() + rnd() + rnd() - 1.5) * 150));
await sharp(buf, {raw: {width: W, height: H, channels: 1}}).png().toFile(D + 'grano.png');
console.log('ok');
