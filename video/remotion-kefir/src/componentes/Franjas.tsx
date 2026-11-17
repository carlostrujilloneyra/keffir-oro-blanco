import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {cl, muelle, rampa} from '../anim';
import {ALTO, ANCHO, PALETAS, Tono} from '../tema';

/*
  Los cuatro sabores en franjas: cada una muestra la botella de su foto IA (public/img/*-hero.webp, 1080x1913)
  bajo el color del sabor. `cx`, `tapa` y `base` ubican la botella dentro de la foto (px a 1080 de ancho):
  con eso las cuatro se ven del mismo alto y apoyadas en la misma línea.
*/
// `degradado`: [arriba, medio] de la franja, si no van los de la paleta del tono. `recorte`: foto sin fondo, lleva sombra de apoyo
// `k`: escala fija de la foto (si falta, la que da `alto`); `estira`: factor horizontal extra (la imagen fija de EcoCultivo)
export type Sabor = {src: string; tono: Tono; cx: number; tapa: number; base: number; degradado?: [string, string]; recorte?: boolean; k?: number; estira?: number};
export const SABORES: Sabor[] = [
  {src: 'img/fresa-hero.webp', tono: 'fresa', cx: 773, tapa: 745, base: 1750},
  {src: 'img/arandanos-hero.webp', tono: 'arandanos', cx: 790, tapa: 480, base: 1720},
  {src: 'img/frutos-bosque-hero.webp', tono: 'frutos', cx: 796, tapa: 845, base: 1730},
  {src: 'img/chocolate-hero.webp', tono: 'cacao', cx: 760, tapa: 585, base: 1790},
];

const FUNDE = 'linear-gradient(to bottom, transparent 0%, #000 17%, #000 93%, transparent 100%)';

/*
  Natural (475 ml), con el mismo encuadre que las frutadas: lo usa la imagen fija de EcoCultivo. Es el recorte sin fondo
  ni vaso (scripts/recorte-natural.mjs), sobre una franja azul apagada, la de la etiqueta natural.
*/
export const NATURAL: Sabor = {src: 'img/natural-475-botella.png', tono: 'leche', cx: 773, tapa: 451, base: 1683, degradado: ['#2F5B82', '#0F1D2C'], recorte: true};

// `desde`: las franjas solo se ven por debajo de esa altura (cierre: arriba va el texto sobre fondo tinta).
export const Franjas: React.FC<{t: number; en: number; base?: number; alto?: number; desde?: number; sabores?: Sabor[]}> = ({t, en, base = 1600, alto = 620, desde, sabores = SABORES}) => {
  const W = ANCHO / sabores.length;
  const mascara = desde === undefined ? undefined : `linear-gradient(to bottom, transparent ${desde - 80}px, #000 ${desde + 90}px)`;
  return (
    <AbsoluteFill style={{WebkitMaskImage: mascara, maskImage: mascara}}>
      {sabores.map((s, i) => {
        const [arriba, medio] = s.degradado ?? [PALETAS[s.tono].base, PALETAS[s.tono].sombra];
        const sube = muelle(t, en + i * 0.07);
        const k = s.k ?? alto / (s.base - s.tapa), kx = k * (s.estira ?? 1);
        // cada botella sigue acercándose despacio; las pares y las impares derivan en sentidos opuestos
        const acerca = 1.12 - sube * 0.12 + rampa(t, en, en + 6, 0, 0.06, (v) => v);
        const deriva = rampa(t, en, en + 6, 0, 1, (v) => v) * (i % 2 ? -14 : 14);
        return (
          <div key={s.src} style={{position: 'absolute', left: i * W, top: 0, width: W + 1, height: ALTO, overflow: 'hidden', translate: `0 ${(1 - sube) * 620}px`, opacity: cl(sube * 3),
            background: `linear-gradient(to bottom, ${arriba} 0%, ${medio} 56%, #0C0808 100%)`}}>
            {s.recorte && (
              <div style={{position: 'absolute', left: W * 0.06, width: W * 0.88, top: base - 26 + deriva, height: 52, borderRadius: '50%',
                background: 'radial-gradient(closest-side, rgba(0,0,0,.7), transparent)', filter: 'blur(8px)'}} />
            )}
            <Img src={staticFile(s.src)} style={{position: 'absolute', left: W / 2 - s.cx * kx, top: base - s.base * k + deriva, width: ANCHO * kx, height: 1913 * k, maxWidth: 'none',
              transformOrigin: `${s.cx * kx}px ${s.base * k}px`, scale: `${acerca}`, WebkitMaskImage: FUNDE, maskImage: FUNDE}} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
