/*
  Mide los silencios reales de cada voz (ffmpeg silencedetect) y los guarda en src/datos/silencios.json.
  ritmo.ts los usa como ventanas donde un corte puede moverse hacia un golpe sin pisar la voz
  (los finales de palabra de Whisper se estiran hasta la palabra siguiente y no sirven para esto).
*/
import {spawnSync} from 'child_process';
import {writeFileSync} from 'fs';
import path from 'path';

const raiz = path.resolve(import.meta.dirname, '..');
const salida = {};
for (const variante of ['natural', 'frutado']) {
  const {stderr} = spawnSync('ffmpeg', ['-hide_banner', '-i', path.join(raiz, `public/audio/voz-kefir-${variante}-v2.mp3`), '-af', 'silencedetect=noise=-32dB:d=0.14', '-f', 'null', '-'], {encoding: 'utf8'});
  const ini = [...stderr.matchAll(/silence_start: ([\d.]+)/g)].map((m) => +m[1]);
  const fin = [...stderr.matchAll(/silence_end: ([\d.]+)/g)].map((m) => +m[1]);
  salida[variante] = ini.map((a, i) => [+a.toFixed(3), +(fin[i] ?? a).toFixed(3)]).filter(([a, b]) => b > a);
  console.log(variante, salida[variante].length, 'silencios');
}
writeFileSync(path.join(raiz, 'src/datos/silencios.json'), JSON.stringify(salida));
