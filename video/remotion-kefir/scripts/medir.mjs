// Mide el contenido real (sin el margen transparente) de cada imagen de public/img.
import {createRequire} from 'module';
import {readdirSync} from 'fs';
const sharp = createRequire(new URL('../../node_modules/', import.meta.url))('sharp');
for (const f of readdirSync('public/img').sort()) {
  const img = sharp('public/img/' + f);
  const {width, height} = await img.metadata();
  const {data, info} = await img.ensureAlpha().extractChannel('alpha').raw().toBuffer({resolveWithObject: true});
  let x0 = width, y0 = height, x1 = 0, y1 = 0;
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) if (data[y * info.width + x] > 24) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  console.log(f.padEnd(26), `${width}x${height}`.padEnd(11), `contenido x ${x0}-${x1}  y ${y0}-${y1}`);
}
