import React from 'react';
import {Img, staticFile} from 'remotion';
import {rampa} from '../anim';

/*
  Producto héroe: se posiciona por el centro de su base (x, base), con sombra de contacto,
  sombra proyectada del color del fondo, reflejo opcional en el piso y un brillo especular que lo recorre una vez.
  El brillo usa la propia imagen como máscara, así nunca se sale de la silueta.
*/
export const Producto: React.FC<{
  src: string; ancho: number; alto: number; x: number; base: number; t: number;
  rot?: number; rotY?: number; escala?: number; opacidad?: number; desenfoque?: number;
  sombra?: string; contacto?: number; brillo?: number; reflejo?: number; origen?: string; children?: React.ReactNode;
}> = ({src, ancho, alto, x, base, t, rot = 0, rotY = 0, escala = 1, opacidad = 1, desenfoque = 0, sombra = 'rgba(0,0,0,.35)', contacto = 1, brillo, reflejo = 0, origen = '50% 100%', children}) => {
  const url = staticFile(src);
  const pb = brillo === undefined ? 0 : rampa(t, brillo, brillo + 1.1, 0, 1, (v) => v);
  return (
    <>
      {reflejo > 0 && (
        // la máscara va en coordenadas de la imagen sin voltear: opaca en la base, se apaga hacia la tapa
        <Img src={url} style={{position: 'absolute', left: x - ancho / 2, top: base - 4, width: ancho, height: alto, transform: 'scaleY(-1)', opacity: reflejo * opacidad, filter: 'blur(3px)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,.95) 0%, rgba(0,0,0,.35) 14%, transparent 34%)', maskImage: 'linear-gradient(to top, rgba(0,0,0,.95) 0%, rgba(0,0,0,.35) 14%, transparent 34%)'}} />
      )}
      {contacto > 0 && (
        <div style={{position: 'absolute', left: x - ancho * 0.62 * escala, top: base - ancho * 0.085 * escala, width: ancho * 1.24 * escala, height: ancho * 0.17 * escala, borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,.55) 0%, rgba(0,0,0,.22) 42%, transparent 70%)', filter: 'blur(7px)', opacity: contacto * opacidad}} />
      )}
      <div style={{position: 'absolute', left: x - ancho / 2, top: base - alto, width: ancho, height: alto, transformOrigin: origen, opacity: opacidad,
        transform: `perspective(1600px) rotate(${rot}deg) rotateY(${rotY}deg) scale(${escala})`, filter: desenfoque ? `blur(${desenfoque}px)` : undefined}}>
        <Img src={url} style={{width: ancho, height: alto, display: 'block', filter: `drop-shadow(0 ${ancho * 0.07}px ${ancho * 0.1}px ${sombra})`}} />
        {brillo !== undefined && pb > 0 && pb < 1 && (
          <div style={{position: 'absolute', inset: 0, WebkitMaskImage: `url(${url})`, maskImage: `url(${url})`, WebkitMaskSize: '100% 100%', maskSize: '100% 100%', mixBlendMode: 'screen',
            background: `linear-gradient(104deg, transparent ${pb * 150 - 40}%, rgba(255,255,255,.5) ${pb * 150 - 26}%, rgba(255,255,255,.06) ${pb * 150 - 18}%, transparent ${pb * 150 - 12}%)`}} />
        )}
        {children}
      </div>
    </>
  );
};
