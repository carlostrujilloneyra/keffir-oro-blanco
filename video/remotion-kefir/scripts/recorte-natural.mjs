/*
  Botella natural de 475 ml sin fondo, vaso ni salpicaduras (para la imagen fija de EcoCultivo, sobre columna crema).
  Mismo lienzo que la foto original (1536x2720), así la botella conserva sus medidas en `Franjas`.
  El fondo azul marino se quita con un relleno desde los bordes (oscuro y azulado; la tapa negra no es azulada).
  A la izquierda el vaso está pegado al cuerpo: la silueta se arma con la mitad derecha, reflejada sobre el eje
  de la botella (medido en la tapa), y queda simétrica. El borde se suaviza un poco hacia adentro.
*/
import {createRequire} from 'module';
const sharp = createRequire(new URL('../../node_modules/', import.meta.url))('sharp');
const SRC = '../assets/kefir/ia/natural-475-hero.png', OUT = 'public/img/natural-475-botella.png';
const CAJA = {x0: 795, x1: 1424, y1: 2394};

const {data, info} = await sharp(SRC).removeAlpha().raw().toBuffer({resolveWithObject: true});
const {width: W, height: H} = info;
// bajo la etiqueta (y > 2290) solo queda la mesa, casi negra y sin tono azul: ahí basta con que sea muy oscura
const fondo = (i) => {
  const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2];
  return i > 2290 * W ? Math.max(r, g, b) < 45 : Math.max(r, g, b) < 120 && b - r > 10;
};
const fuera = new Uint8Array(W * H);
const pila = [];
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const i = y * W + x;
  if (x < CAJA.x0 || x > CAJA.x1 || y > CAJA.y1) fuera[i] = 1;
  else if ((x === CAJA.x0 || x === CAJA.x1 || y === 0) && fondo(i)) { fuera[i] = 1; pila.push(i); }
}
while (pila.length) {
  const i = pila.pop(), x = i % W, y = (i / W) | 0;
  for (const j of [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, y > 0 ? i - W : -1, y < H - 1 ? i + W : -1])
    if (j >= 0 && !fuera[j] && fondo(j)) { fuera[j] = 1; pila.push(j); }
}
// la botella empieza en la tapa (y 654): lo de arriba son restos del fondo
// eje: punto medio de la tapa (filas 690-760, bordes limpios contra el fondo)
const medios = [];
for (let y = 690; y <= 760; y++) {
  let a = -1, b = -1;
  for (let x = CAJA.x0; x <= CAJA.x1; x++) if (!fuera[y * W + x]) { if (a < 0) a = x; b = x; }
  if (a >= 0) medios.push((a + b) / 2);
}
const eje = Math.round(medios.reduce((n, m) => n + m, 0) / medios.length);
const alfa = Buffer.alloc(W * H);
let arriba = H, abajo = 0, der = 0;
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const xr = x >= eje ? x : 2 * eje - x;
  if (y >= 640 && xr < W && !fuera[y * W + xr]) {
    alfa[y * W + x] = 255;
    arriba = Math.min(arriba, y); abajo = Math.max(abajo, y); der = Math.max(der, xr);
  }
}
// medidas para `NATURAL` en Franjas (a 1080 de ancho)
const k = 1080 / W;
console.log(`eje ${Math.round(eje * k)} · tapa ${Math.round(arriba * k)} · base ${Math.round(abajo * k)} · ancho ${Math.round(2 * (der - eje) * k)}`);
// borde suave: desenfoque y curva que lo mete ~1 px, para que no quede filo del fondo
const borroso = await sharp(alfa, {raw: {width: W, height: H, channels: 1}}).blur(2.2).extractChannel(0).raw().toBuffer();
const mascara = borroso.map((a) => Math.max(0, Math.min(255, ((a - 70) * 255) / 185)));
const rgba = Buffer.alloc(W * H * 4);
for (let i = 0; i < W * H; i++) {
  rgba[i * 4] = data[i * 3]; rgba[i * 4 + 1] = data[i * 3 + 1]; rgba[i * 4 + 2] = data[i * 3 + 2]; rgba[i * 4 + 3] = mascara[i];
}
await sharp(rgba, {raw: {width: W, height: H, channels: 4}}).png().toFile(OUT);
console.log('→', OUT);
