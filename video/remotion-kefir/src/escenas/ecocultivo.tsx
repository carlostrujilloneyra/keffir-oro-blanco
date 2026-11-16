import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useT} from '../anim';
import {Fondo} from '../componentes/Fondo';
import type {Escena} from '../datos/tipos';

type FC = React.FC<{e: Escena}>;

// Escenas propias de las variantes EcoCultivo (provisional: solo el fondo hasta aprobar el plan).
const Provisional: FC = ({e}) => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Fondo tono={e.tono} t={t} />
    </AbsoluteFill>
  );
};
export const Cabra = Provisional;
export const Mapa = Provisional;
export const CierreTienda = Provisional;
