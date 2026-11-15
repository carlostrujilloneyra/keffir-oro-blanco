// Recorta el margen transparente de las botellas (para posicionarlas por su base) y genera el grano del fondo.
import {readdirSync} from 'fs';
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
  Fotos héroe (3840x2560, producto a la derecha sobre fondo oscuro): se recorta la mitad derecha (2140x2560).
  En la escena se colocan sobre una base de 1498x1792 (el 70 %); la de vaca + cabra se guarda a resolución completa
  porque la escena de lactosa hace zoom sobre la botella de cabra.
  No llevan alfa: en la escena se funden con el fondo, que usa el mismo color oscuro de la foto.
*/
const mitad = (src) => sharp(`${O}/kefir/${src}`).extract({left: 1700, top: 0, width: 2140, height: 2560});
await mitad('hero-vaca-cabra.png').png({compressionLevel: 9}).toFile(D + 'hero-vaca-cabra.png');
await mitad('hero-frutos-bosque-vaso.png').resize(1498, 1792).png({compressionLevel: 9}).toFile(D + 'hero-frutos-vaso.png');

// Fotos IA de cada sabor (assets/kefir/ia/*.png, 1536x2720): a webp, sin reducir, para que los acercamientos se vean nítidos.
for (const f of readdirSync(`${O}/kefir/ia`).filter((n) => n.endsWith('.png')))
  await sharp(`${O}/kefir/ia/${f}`).resize({width: 1536, withoutEnlargement: true}).webp({quality: 90}).toFile(D + f.replace('.png', '.webp'));

// Grano: ruido gris a media resolución (se estira x2 y se mezcla con overlay sobre cada fondo).
const W = 540, H = 960, buf = Buffer.alloc(W * H);
let s = 1234567;
const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
for (let i = 0; i < W * H; i++) buf[i] = Math.max(0, Math.min(255, 128 + (rnd() + rnd() + rnd() - 1.5) * 150));
await sharp(buf, {raw: {width: W, height: H, channels: 1}}).png().toFile(D + 'grano.png');
console.log('ok');
