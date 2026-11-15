import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {EIO, rampa} from '../anim';
import {ALTO, ANCHO} from '../tema';

export const OLA_FRAMES = 16; // duración del barrido
export const OLA_PRE = 8; // frames antes del corte en que arranca (el corte cae a la mitad)

const ONDA = 16; // altura de la ondulación del frente, en px: se lee como líquido sin verse torcido
const FRANJA = 86; // grosor de la franja de color que precede a la escena nueva

// frente horizontal con una ondulación suave y simétrica; todo lo que queda por debajo de `y` es visible
const frente = (y: number, fase: number) => {
  const pts: string[] = [];
  for (let x = 0; x <= ANCHO; x += 36) pts.push(`${x}px ${(y + Math.sin((x / ANCHO) * Math.PI * 3 + fase) * ONDA).toFixed(1)}px`);
  return `polygon(${pts.join(',')},${ANCHO}px ${ALTO + 2}px,0px ${ALTO + 2}px)`;
};

/*
  Transición entre escenas: un barrido limpio de abajo hacia arriba, como un vaso que se llena.
  La escena nueva sube detrás de una franja fina del color del sabor que llega.
  (Antes era una mancha que crecía desde un punto: sobre el producto se leía como un círculo encima de la etiqueta.)
*/
export const Ola: React.FC<{activa: boolean; color?: string; children: React.ReactNode}> = ({activa, color, children}) => {
  const frame = useCurrentFrame();
  if (!activa || frame >= OLA_FRAMES) return <AbsoluteFill>{children}</AbsoluteFill>;
  const p = rampa(frame, 0, OLA_FRAMES, 0, 1, EIO);
  const y = ALTO + ONDA + FRANJA - p * (ALTO + ONDA * 2 + FRANJA * 2);
  const fase = frame * 0.35;
  return (
    <>
      <AbsoluteFill style={{background: color, clipPath: frente(y - FRANJA, fase + 0.8)}} />
      <AbsoluteFill style={{clipPath: frente(y, fase)}}>{children}</AbsoluteFill>
    </>
  );
};
