import React from 'react';
import {AbsoluteFill, Img, random, staticFile} from 'remotion';
import {ALTO, ANCHO, PALETAS, Tono} from '../tema';

/*
  Fondo de estudio en el color del sabor: foco de luz, dos manchas que derivan lento,
  piso más oscuro y grano. `luz` es la posición del foco en % (por defecto arriba a la izquierda).
*/
export const Fondo: React.FC<{tono: Tono; t: number; luz?: [number, number]; piso?: boolean; plano?: boolean}> = ({tono, t, luz = [34, 30], piso = true, plano}) => {
  const p = PALETAS[tono];
  const claro = tono === 'leche';
  // plano: color base liso con un foco tenue arriba; lo usan las escenas donde una foto héroe trae su propio fondo oscuro
  if (plano)
    return (
      <AbsoluteFill style={{background: p.base, overflow: 'hidden'}}>
        <AbsoluteFill style={{background: `radial-gradient(ellipse 80% 26% at ${luz[0]}% 6%, ${p.luz} 0%, ${p.base} 100%)`}} />
      </AbsoluteFill>
    );
  return (
    <AbsoluteFill style={{background: p.base, overflow: 'hidden'}}>
      <AbsoluteFill style={{background: `radial-gradient(ellipse 92% 62% at ${luz[0]}% ${luz[1]}%, ${p.luz} 0%, ${p.base} 52%, ${p.sombra} 128%)`}} />
      <div style={{position: 'absolute', width: 900, height: 900, borderRadius: '50%', left: 520 + Math.sin(t * 0.35) * 60, top: 1050 + Math.cos(t * 0.3) * 50, background: p.luz, opacity: claro ? 0.5 : 0.22, filter: 'blur(140px)'}} />
      <div style={{position: 'absolute', width: 700, height: 700, borderRadius: '50%', left: -260 + Math.cos(t * 0.3) * 50, top: 620 + Math.sin(t * 0.4) * 60, background: p.sombra, opacity: claro ? 0.16 : 0.3, filter: 'blur(150px)'}} />
      {piso && <AbsoluteFill style={{background: `linear-gradient(to bottom, transparent 60%, ${p.sombra} 122%)`, opacity: claro ? 0.55 : 0.9}} />}
      <Grano fuerza={claro ? 0.2 : 0.3} />
    </AbsoluteFill>
  );
};

export const Grano: React.FC<{fuerza?: number}> = ({fuerza = 0.3}) => (
  <Img src={staticFile('img/grano.png')} style={{position: 'absolute', left: 0, top: 0, width: ANCHO, height: ALTO, mixBlendMode: 'overlay', opacity: fuerza, pointerEvents: 'none'}} />
);

/*
  Gotas desenfocadas en primer plano: dan la tercera capa de profundidad y se mueven
  más rápido que el producto (parallax). `semilla` cambia la distribución por escena.
*/
export const Gotas: React.FC<{t: number; color: string; semilla: string; n?: number; zona?: [number, number, number, number]}> = ({t, color, semilla, n = 9, zona = [0, 900, ANCHO, ALTO]}) => (
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    {Array.from({length: n}, (_, i) => {
      const r = (k: string) => random(`${semilla}-${i}-${k}`);
      const lado = r('l') > 0.5 ? 1 : 0; // se cargan a los bordes para no tapar el producto
      const x = lado ? zona[2] - r('x') * 240 : zona[0] + r('x') * 240;
      const y = zona[1] + r('y') * (zona[3] - zona[1]);
      const s = 14 + r('s') * r('s') * 50;
      const dy = Math.sin(t * (0.5 + r('v')) + i) * 26 - t * (6 + r('w') * 10);
      return (
        <div key={i} style={{position: 'absolute', left: x - s / 2, top: y - s / 2 + dy, width: s, height: s * (1.05 + r('h') * 0.35), borderRadius: '50% 50% 50% 50% / 58% 58% 42% 42%',
          background: `radial-gradient(circle at 35% 30%, #fff 0%, ${color} 62%)`, opacity: 0.4 + r('o') * 0.35, filter: `blur(${2 + s * 0.11}px)`, rotate: `${r('r') * 40 - 20}deg`}} />
      );
    })}
  </AbsoluteFill>
);

// Palabra gigante tono sobre tono detrás del producto.
export const Fantasma: React.FC<{txt: string; t: number; tono: Tono; y: number; tam: number; x?: number; fuente?: string; opacidad?: number}> = ({txt, t, tono, y, tam, x = 0, fuente = 'Anton, sans-serif', opacidad = 0.34}) => (
  <div style={{position: 'absolute', left: x - 40 + Math.sin(t * 0.25) * 18 - t * 4, top: y, fontFamily: fuente, fontSize: tam, lineHeight: 1, whiteSpace: 'nowrap', color: PALETAS[tono].luz, opacity: opacidad, textTransform: 'uppercase', letterSpacing: '-0.01em'}}>
    {txt}
  </div>
);
