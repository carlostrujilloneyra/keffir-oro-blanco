import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {cl, muelle, rampa} from '../anim';
import {ALTO, ANCHO, PALETAS, Tono} from '../tema';

/*
  Los cuatro sabores en franjas: cada una muestra la botella de su foto IA (public/img/*-hero.webp, 1080x1913)
  bajo el color del sabor. `cx`, `tapa` y `base` ubican la botella dentro de la foto (px a 1080 de ancho):
  con eso las cuatro se ven del mismo alto y apoyadas en la misma línea.
*/
export const SABORES: {src: string; tono: Tono; cx: number; tapa: number; base: number}[] = [
  {src: 'img/fresa-hero.webp', tono: 'fresa', cx: 770, tapa: 768, base: 1770},
  {src: 'img/arandanos-hero.webp', tono: 'arandanos', cx: 810, tapa: 504, base: 1740},
  {src: 'img/frutos-bosque-hero.webp', tono: 'frutos', cx: 818, tapa: 840, base: 1716},
  {src: 'img/chocolate-hero.webp', tono: 'cacao', cx: 762, tapa: 609, base: 1821},
];

const FUNDE = 'linear-gradient(to bottom, transparent 0%, #000 17%, #000 93%, transparent 100%)';

// `desde`: las franjas solo se ven por debajo de esa altura (cierre: arriba va el texto sobre fondo tinta).
export const Franjas: React.FC<{t: number; en: number; base?: number; alto?: number; desde?: number}> = ({t, en, base = 1600, alto = 620, desde}) => {
  const W = ANCHO / SABORES.length;
  const mascara = desde === undefined ? undefined : `linear-gradient(to bottom, transparent ${desde - 80}px, #000 ${desde + 90}px)`;
  return (
    <AbsoluteFill style={{WebkitMaskImage: mascara, maskImage: mascara}}>
      {SABORES.map((s, i) => {
        const p = PALETAS[s.tono];
        const sube = muelle(t, en + i * 0.07);
        const k = alto / (s.base - s.tapa);
        // cada botella sigue acercándose despacio; las pares y las impares derivan en sentidos opuestos
        const acerca = 1.12 - sube * 0.12 + rampa(t, en, en + 6, 0, 0.06, (v) => v);
        const deriva = rampa(t, en, en + 6, 0, 1, (v) => v) * (i % 2 ? -14 : 14);
        return (
          <div key={s.src} style={{position: 'absolute', left: i * W, top: 0, width: W + 1, height: ALTO, overflow: 'hidden', translate: `0 ${(1 - sube) * 620}px`, opacity: cl(sube * 3),
            background: `linear-gradient(to bottom, ${p.base} 0%, ${p.sombra} 56%, #0C0808 100%)`}}>
            <Img src={staticFile(s.src)} style={{position: 'absolute', left: W / 2 - s.cx * k, top: base - s.base * k + deriva, width: ANCHO * k, height: 1913 * k, maxWidth: 'none',
              transformOrigin: `${s.cx * k}px ${s.base * k}px`, scale: `${acerca}`, WebkitMaskImage: FUNDE, maskImage: FUNDE}} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
