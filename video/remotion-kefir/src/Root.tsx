import React from 'react';
import {Composition, staticFile} from 'remotion';
import {loadFont} from '@remotion/fonts';
import {frutado as frutadoVoz} from './datos/frutado';
import {natural as naturalVoz} from './datos/natural';
import {ajustarAlRitmo} from './datos/ritmo';
import {ALTO, ANCHO, FPS} from './tema';
import {VideoKefir} from './VideoKefir';

loadFont({family: 'Anton', url: staticFile('fuentes/anton.woff2'), weight: '400'});
loadFont({family: 'AlfaSlab', url: staticFile('fuentes/alfaslab.woff2'), weight: '400'});
for (const peso of ['400', '500', '600', '700']) loadFont({family: 'Poppins', url: staticFile(`fuentes/poppins-${peso}.woff2`), weight: peso});

// Los datos traen los tiempos de la voz; aquí se cuadran cortes y entradas con los golpes de la música.
const natural = ajustarAlRitmo(naturalVoz);
const frutado = ajustarAlRitmo(frutadoVoz);

// La duración la define la voz de cada variante (datos/natural.ts y datos/frutado.ts).
export const Root: React.FC = () => (
  <>
    <Composition id="KefirNatural" component={VideoKefir} durationInFrames={Math.round(natural.duracion * FPS)} fps={FPS} width={ANCHO} height={ALTO} defaultProps={natural} />
    <Composition id="KefirFrutado" component={VideoKefir} durationInFrames={Math.round(frutado.duracion * FPS)} fps={FPS} width={ANCHO} height={ALTO} defaultProps={frutado} />
  </>
);
