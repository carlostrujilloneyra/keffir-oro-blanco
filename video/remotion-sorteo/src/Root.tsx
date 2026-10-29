import React from 'react';
import {Composition, staticFile} from 'remotion';
import {loadFont} from '@remotion/fonts';
import {Teaser, DURATION} from './Teaser';
import {Prueba3D, PRUEBA_3D_DURATION} from './Prueba3D';
import {PruebaParallax, PRUEBA_PARALLAX_DURATION} from './PruebaParallax';

loadFont({family: 'Tight', url: staticFile('inter-tight-latin-900-normal.woff2'), weight: '900'});
loadFont({family: 'Tight', url: staticFile('inter-tight-latin-800-normal.woff2'), weight: '800'});
loadFont({family: 'Tight', url: staticFile('inter-tight-latin-600-normal.woff2'), weight: '600'});
loadFont({family: 'Serif', url: staticFile('instrument-serif-latin-400-italic.woff2'), style: 'italic', weight: '400'});

export const Root: React.FC = () => (
  <>
    <Composition id="SorteoTeaser" component={Teaser} durationInFrames={Math.round(DURATION * 30)} fps={30} width={1080} height={1920} />
    {/* pruebas del entorno 3D */}
    <Composition id="Prueba3D" component={Prueba3D} durationInFrames={PRUEBA_3D_DURATION * 30} fps={30} width={1080} height={1920} />
    <Composition id="PruebaParallax" component={PruebaParallax} durationInFrames={PRUEBA_PARALLAX_DURATION * 30} fps={30} width={1080} height={1920} />
  </>
);
