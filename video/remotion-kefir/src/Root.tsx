import React from 'react';
import {Composition, staticFile, Still} from 'remotion';
import {loadFont} from '@remotion/fonts';
import {frutadoEcocultivo as frutadoEcoVoz, naturalEcocultivo as naturalEcoVoz} from './datos/ecocultivo';
import {frutado as frutadoVoz} from './datos/frutado';
import {natural as naturalVoz} from './datos/natural';
import {ajustarAlRitmo} from './datos/ritmo';
import {ALTO_IG, ANCHO_IG, InstagramNaturales} from './stills/InstagramNaturales';
import {CualEligesEcocultivo, CualEligesEcocultivoFinal, CualEligesEcocultivoLimpia} from './stills/CualEligesEcocultivo';
import {ALTO, ANCHO, FPS} from './tema';
import {VideoKefir} from './VideoKefir';

loadFont({family: 'Anton', url: staticFile('fuentes/anton.woff2'), weight: '400'});
loadFont({family: 'AlfaSlab', url: staticFile('fuentes/alfaslab.woff2'), weight: '400'});
for (const peso of ['400', '500', '600', '700']) loadFont({family: 'Poppins', url: staticFile(`fuentes/poppins-${peso}.woff2`), weight: peso});

// Los datos traen los tiempos de la voz; aquí se cuadran cortes y entradas con los golpes de la música.
const natural = ajustarAlRitmo(naturalVoz);
const frutado = ajustarAlRitmo(frutadoVoz);
const naturalEco = ajustarAlRitmo(naturalEcoVoz);
const frutadoEco = ajustarAlRitmo(frutadoEcoVoz);

// La duración la define la voz de cada variante (datos/natural.ts y datos/frutado.ts).
export const Root: React.FC = () => (
  <>
    <Composition id="KefirNatural" component={VideoKefir} durationInFrames={Math.round(natural.duracion * FPS)} fps={FPS} width={ANCHO} height={ALTO} defaultProps={natural} />
    <Composition id="KefirFrutado" component={VideoKefir} durationInFrames={Math.round(frutado.duracion * FPS)} fps={FPS} width={ANCHO} height={ALTO} defaultProps={frutado} />
    <Composition id="KefirNaturalEcocultivo" component={VideoKefir} durationInFrames={Math.round(naturalEco.duracion * FPS)} fps={FPS} width={ANCHO} height={ALTO} defaultProps={naturalEco} />
    <Composition id="KefirFrutadoEcocultivo" component={VideoKefir} durationInFrames={Math.round(frutadoEco.duracion * FPS)} fps={FPS} width={ANCHO} height={ALTO} defaultProps={frutadoEco} />
    {/* imagen fija para el estado de WhatsApp de EcoCultivo */}
    <Still id="EcocultivoCualEliges" component={CualEligesEcocultivo} width={ANCHO} height={ALTO} />
    <Still id="EcocultivoCualEligesLimpia" component={CualEligesEcocultivoLimpia} width={ANCHO} height={ALTO} />
    <Still id="EcocultivoCualEligesFinal" component={CualEligesEcocultivoFinal} width={ANCHO} height={ALTO} />
    {/* post de Instagram 3:4 de vaca y cabra 1 L, una por variante de hook */}
    {(['A', 'B', 'C'] as const).map((hook) => <Still key={hook} id={`InstagramNaturales${hook}`} component={InstagramNaturales} width={ANCHO_IG} height={ALTO_IG} defaultProps={{hook}} />)}
    <Still id="InstagramNaturalesA2" component={InstagramNaturales} width={ANCHO_IG} height={ALTO_IG} defaultProps={{hook: 'A', pulido: true}} />
  </>
);
