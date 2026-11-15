import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {EIO, EO, rampa} from '../anim';
import type {Transicion} from '../datos/tipos';
import {ANCHO} from '../tema';
import {Ola, OLA_FRAMES, OLA_PRE} from './Ola';

/*
  Corte entre escenas. Todas las transiciones ocupan la misma ventana que el barrido de Ola (OLA_FRAMES, con el corte
  en OLA_PRE): ritmo.ts y la mezcla no cambian, solo lo que se dibuja.
  - ola: barrido de abajo hacia arriba, como un vaso que se llena.
  - fundido: la escena nueva aparece encima asentándose apenas; es la transición suave entre escenas de producto.
  - whip / whipIzq: paneo rápido con desenfoque horizontal; la escena que sale y la que entra viajan juntas.
  - flash: destello del color que trae la escena, corte seco y un punch-in que se asienta.
  - zoom: la escena que sale se acerca hasta desenfocarse y la nueva llega asentándose desde más cerca.
  `entra` es la transición de esta escena; `sale`, la de la siguiente (así también se anima la salida).
*/
const COLA = 6; // frames extra en que zoom y flash terminan de asentarse

export const Corte: React.FC<{id: string; entra?: Transicion; sale?: Transicion; dur: number; color?: string; children: React.ReactNode}> = ({id, entra, sale, dur, color = '#FFFFFF', children}) => {
  const f = useCurrentFrame();
  const x = f - (dur - OLA_FRAMES - 1); // frame dentro de la transición de la escena siguiente
  const entrando = entra !== undefined && f < OLA_FRAMES + COLA;
  const saliendo = sale !== undefined && x >= 0;
  if (entra === 'ola' && f < OLA_FRAMES) return <Ola activa color={color}>{children}</Ola>;
  if (!entrando && !saliendo) return <AbsoluteFill>{children}</AbsoluteFill>;

  let tx = 0, escala = 1, opacidad = 1, barrido = 0, desenfoque = 0, destello = 0;
  const tipo = entrando ? entra : sale;
  if (tipo === 'whip' || tipo === 'whipIzq') {
    const dir = tipo === 'whip' ? 1 : -1;
    const p = rampa(entrando ? f : x, 2, OLA_FRAMES - 2, 0, 1, EIO);
    tx = entrando ? dir * (1 - p) * ANCHO : -dir * p * ANCHO;
    barrido = Math.sin(Math.PI * p) * 64;
  } else if (tipo === 'fundido') {
    if (entrando) {
      opacidad = rampa(f, 1, OLA_FRAMES - 1, 0, 1, EIO);
      escala = 1.04 - rampa(f, 1, OLA_FRAMES + COLA, 0, 0.04, EO);
    }
  } else if (tipo === 'flash') {
    if (entrando) {
      opacidad = f < OLA_PRE ? 0 : 1;
      escala = 1 + (1 - rampa(f, OLA_PRE, OLA_FRAMES + COLA, 0, 1, EO)) * 0.07;
      destello = f < OLA_PRE ? rampa(f, OLA_PRE - 3, OLA_PRE, 0, 0.9, (k) => k) : (1 - rampa(f, OLA_PRE, OLA_PRE + 8, 0, 1, EO)) * 0.9;
    } else escala = 1 + rampa(x, 2, OLA_PRE, 0, 0.05, (k) => k * k);
  } else if (tipo === 'zoom') {
    if (entrando) {
      const q = rampa(f, OLA_PRE, OLA_FRAMES + COLA, 0, 1, EO);
      opacidad = f < OLA_PRE ? 0 : 1;
      escala = 1.32 - q * 0.32;
      desenfoque = (1 - q) * 14;
      destello = f < OLA_PRE ? rampa(f, OLA_PRE - 2, OLA_PRE, 0, 0.5, (k) => k) : (1 - rampa(f, OLA_PRE, OLA_PRE + 6, 0, 1, EO)) * 0.5;
    } else {
      const q = rampa(x, 1, OLA_PRE, 0, 1, (k) => k * k * k);
      escala = 1 + q * 1.1;
      desenfoque = q * 16;
    }
  }
  const filtro = `corte-${id}-${entrando ? 'e' : 's'}`;
  return (
    <>
      {barrido > 0.5 && (
        <svg width="0" height="0" style={{position: 'absolute'}}>
          <filter id={filtro} x="-10%" y="0" width="120%" height="100%">
            <feGaussianBlur stdDeviation={`${barrido.toFixed(1)} 0`} />
          </filter>
        </svg>
      )}
      <AbsoluteFill style={{translate: `${tx}px 0`, scale: `${escala}`, opacity: opacidad, filter: barrido > 0.5 ? `url(#${filtro})` : desenfoque > 0.2 ? `blur(${desenfoque}px)` : undefined}}>{children}</AbsoluteFill>
      {destello > 0 && <AbsoluteFill style={{background: color, opacity: destello}} />}
    </>
  );
};
