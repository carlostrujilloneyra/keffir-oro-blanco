import React from 'react';
import {cl, muelle} from '../anim';
import {FUENTE, PAPEL, TINTA} from '../tema';

/*
  Sello de borde ondulado: entra girando y se asienta; el aro de puntos sigue girando lento.
  `centro` son las líneas del texto; si la primera es un número se dibuja grande con la segunda debajo.
  Todo el texto queda por encima de 34 px con el diámetro que usan las escenas (290 px).
*/
export const Sello: React.FC<{
  t: number; en: number; x: number; y: number; d: number; centro: string[]; fondo?: string; color?: string; inclinacion?: number;
}> = ({t, en, x, y, d, centro, fondo = PAPEL, color = TINTA, inclinacion = -10}) => {
  const s = muelle(t, en, true);
  const R = 100, ondas = 20;
  const borde = Array.from({length: 240}, (_, i) => {
    const a = (i / 240) * Math.PI * 2, r = R - 4 + Math.cos(a * ondas) * 3.2;
    return `${i ? 'L' : 'M'}${(Math.cos(a) * r).toFixed(2)} ${(Math.sin(a) * r).toFixed(2)}`;
  }).join('') + 'Z';
  const numero = /^\d+$/.test(centro[0]);
  return (
    <svg width={d} height={d} viewBox="-104 -104 208 208" style={{position: 'absolute', left: x - d / 2, top: y - d / 2, overflow: 'visible', opacity: cl(s * 2.5),
      rotate: `${inclinacion - (1 - s) * 140}deg`, scale: `${0.55 + s * 0.45}`, filter: 'drop-shadow(0 14px 22px rgba(0,0,0,.28))'}}>
      <path d={borde} fill={fondo} />
      <circle r="84" fill="none" stroke={color} strokeWidth="1.3" opacity=".5" />
      <g style={{rotate: `${(t - en) * 10}deg`, transformOrigin: '0 0'}}>
        <circle r="77" fill="none" stroke={color} strokeWidth="3.4" strokeDasharray="0.1 9.577" strokeLinecap="round" opacity=".8" />
      </g>
      {numero ? (
        <>
          <text y="8" textAnchor="middle" fontFamily={FUENTE.anton} fontSize="78" fill={color}>{centro[0]}</text>
          <text y="40" textAnchor="middle" fontFamily={FUENTE.anton} fontSize="25" letterSpacing=".3" fill={color}>{centro[1]}</text>
        </>
      ) : (
        centro.map((l, i) => (
          <text key={l} y={(i - (centro.length - 1) / 2) * 38 + 13} textAnchor="middle" fontFamily={FUENTE.anton} fontSize="37" letterSpacing=".4" fill={color}>{l}</text>
        ))
      )}
    </svg>
  );
};
