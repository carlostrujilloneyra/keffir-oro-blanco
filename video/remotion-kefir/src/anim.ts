import React from 'react';
import {Easing, interpolate, spring, useCurrentFrame} from 'remotion';
import {FPS} from './tema';

// Salida fuerte para entradas, entrada-salida para lo que se mueve en pantalla (nunca ease-in ni linear).
export const EO = Easing.bezier(0.23, 1, 0.32, 1);
export const EIO = Easing.bezier(0.77, 0, 0.175, 1);

export const cl = (x: number) => Math.max(0, Math.min(1, x));

// Interpola el tiempo t (segundos de la voz) entre a y b.
export const rampa = (t: number, a: number, b: number, de = 0, hasta = 1, e: (x: number) => number = EO) =>
  interpolate(t, [a, b], [de, hasta], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e});

// Muelle que arranca en el segundo `en`. Por defecto sin rebote; `rebote` da un asentamiento corto para productos y sellos.
export const muelle = (t: number, en: number, rebote = false) =>
  spring({frame: (t - en) * FPS, fps: FPS, config: rebote ? {damping: 13, stiffness: 150, mass: 0.8} : {damping: 200, stiffness: 170, mass: 0.9}});

/*
  Todas las escenas trabajan en el tiempo real de la voz (segundos desde el inicio del video),
  así los cues salen directo de la transcripción. Cada <Sequence> publica en qué segundo empieza.
*/
export const InicioCtx = React.createContext(0);
export const useT = () => {
  const inicio = React.useContext(InicioCtx);
  return inicio + useCurrentFrame() / FPS;
};
