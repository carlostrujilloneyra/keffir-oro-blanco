import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, staticFile, useVideoConfig} from 'remotion';
import {cl, EIO, pulso, rampa, useT, vaiven} from '../anim';
import {Fondo, Grano} from '../componentes/Fondo';
import {Franjas} from '../componentes/Franjas';
import {IconoWhatsApp} from '../componentes/Iconos';
import {Foto3D} from '../componentes/Parallax3D';
import {Cinta, Dato, Linea} from '../componentes/Texto';
import type {Escena, VideoKefirProps} from '../datos/tipos';
import {ALTO, ANCHO, FUENTE, PALETAS, SEGURA} from '../tema';

type FC = React.FC<{e: Escena; variante: VideoKefirProps['variante']}>;

// Resplandor detrás del producto: lo separa del fondo sin recurrir a un borde.
export const Halo: React.FC<{x: number; y: number; d: number; color?: string; fuerza?: number}> = ({x, y, d, color = '#fff', fuerza = 0.45}) => (
  <div style={{position: 'absolute', left: x - d / 2, top: y - d / 2, width: d, height: d, borderRadius: '50%', background: `radial-gradient(circle, ${color} 0%, transparent 68%)`, opacity: fuerza}} />
);

/*
  Foto héroe con fondo oscuro propio (public/img/hero-*.png, base 1498x1792): se coloca a escala `k` y se funde con la escena
  desvaneciendo los bordes que no llegan al borde del cuadro. La escena usa de fondo el mismo color oscuro de la foto.
  `izq` = [desde, hasta] en % del ancho: oculta todo lo que queda a la izquierda (para encuadrar una sola botella).
  `incl` la inclina unos grados en 3D [horizontal, vertical]; no es un giro, solo volumen.
*/
export const FotoHeroe: React.FC<{src: string; k: number; left: number; top: number; arriba?: number; abajo?: number; der?: number; izq?: [number, number]; escala?: number; origen?: string; opacidad?: number; incl?: [number, number]}> = ({src, k, left, top, arriba = 0, abajo = 0, der = 0, izq = [0, 0], escala = 1, origen = '50% 50%', opacidad = 1, incl = [0, 0]}) => {
  const mascara = `linear-gradient(to bottom, transparent 0%, #000 ${arriba}%, #000 ${100 - abajo}%, transparent 100%), linear-gradient(to right, transparent ${izq[0]}%, #000 ${izq[1]}%, #000 ${100 - der}%, transparent 100%)`;
  return (
    <Img src={staticFile(src)} style={{position: 'absolute', left, top, width: 1498 * k, height: 1792 * k, maxWidth: 'none', transformOrigin: origen, scale: `${escala}`, opacity: opacidad,
      transform: `perspective(2400px) rotateY(${incl[0]}deg) rotateX(${incl[1]}deg)`,
      WebkitMaskImage: mascara, maskImage: mascara, WebkitMaskComposite: 'source-in', maskComposite: 'intersect'}} />
  );
};

/*
  Hueco para grabaciones reales: si la escena trae `clip`, el video ocupa el cuadro (con un velo arriba
  y abajo para que el texto se lea) y reemplaza a la foto de producto. Los textos y subtítulos no cambian.
*/
export const Heroe: React.FC<{e: Escena; children: React.ReactNode}> = ({e, children}) => {
  const {fps} = useVideoConfig();
  if (!e.clip) return <>{children}</>;
  return (
    <AbsoluteFill>
      <OffthreadVideo src={staticFile(e.clip.src)} trimBefore={Math.round((e.clip.desde ?? 0) * fps)} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      <AbsoluteFill style={{background: `linear-gradient(to bottom, ${PALETAS[e.tono].sombra} 0%, transparent 46%, transparent 62%, ${PALETAS[e.tono].sombra} 118%)`, opacity: 0.82}} />
    </AbsoluteFill>
  );
};

/*
  Foto IA a cuadro completo (public/img/*-hero.webp y *-bowl.webp, con su fondo oscuro). Es la cámara de las escenas:
  `z` acerca hacia `foco` (px del cuadro; moverlo con z > 1 es un paneo), `dx`/`dy` desplazan y `giroY`/`giroX` inclinan en 3D.
  Con z ≥ 1 y sin desplazar, la foto siempre cubre el cuadro; si se desplaza, `funde` desvanece los bordes que entran
  ([arriba, izquierda] en %) sobre `fondo`, el color del borde de la foto.
*/
export const FotoIA: React.FC<{src: string; z?: number; foco?: [number, number]; dx?: number; dy?: number; giroY?: number; giroX?: number; desenfoque?: number; funde?: [number, number]; fondo?: string}> = ({src, z = 1, foco = [540, 960], dx = 0, dy = 0, giroY = 0, giroX = 0, desenfoque = 0, funde, fondo}) => {
  const mascara = funde && `linear-gradient(to bottom, transparent 0%, #000 ${funde[0]}%), linear-gradient(to right, transparent 0%, #000 ${funde[1]}%)`;
  return (
    <AbsoluteFill style={{background: fondo, overflow: 'hidden'}}>
      <Img src={staticFile(src)} style={{position: 'absolute', left: 0, top: 0, width: ANCHO, height: ALTO, objectFit: 'cover', transformOrigin: `${foco[0]}px ${foco[1]}px`,
        transform: `perspective(2200px) translate(${dx}px, ${dy}px) rotateY(${giroY}deg) rotateX(${giroX}deg) scale(${z})`, filter: desenfoque ? `blur(${desenfoque}px)` : undefined,
        WebkitMaskImage: mascara, maskImage: mascara, WebkitMaskComposite: 'source-in', maskComposite: 'intersect'}} />
    </AbsoluteFill>
  );
};

// Destello a cuadro completo en el segundo `en`: acompaña a un golpe de sonido.
export const Destello: React.FC<{t: number; en: number; color?: string; fuerza?: number}> = ({t, en, color = '#FFFFFF', fuerza = 0.75}) => {
  const p = pulso(t, en, 0.05, 0.32);
  return p > 0 ? <AbsoluteFill style={{background: color, opacity: p * fuerza, pointerEvents: 'none'}} /> : null;
};

// Trazo de luz que se dibuja de izquierda a derecha (subraya la marca en el cierre); la punta brilla mientras avanza.
export const TrazoLuz: React.FC<{t: number; en: number; x?: number; y: number; ancho: number; color: string; grosor?: number}> = ({t, en, x = SEGURA.x0, y, ancho, color, grosor = 7}) => {
  const p = rampa(t, en, en + 0.75, 0, 1, EIO);
  if (p <= 0) return null;
  const punta = Math.sin(Math.PI * p);
  return (
    <>
      <div style={{position: 'absolute', left: x, top: y, width: ancho * p, height: grosor, borderRadius: grosor, background: `linear-gradient(to right, ${color} 0%, #FFFFFF 100%)`,
        boxShadow: `0 0 16px ${color}, 0 0 44px ${color}`, opacity: 1 - rampa(t, en + 0.75, en + 1.6, 0, 0.35, (k) => k)}} />
      {punta > 0.02 && <div style={{position: 'absolute', left: x + ancho * p - 90, top: y + grosor / 2 - 90, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, #FFFFFF 0%, ${color} 22%, transparent 64%)`, opacity: punta * 0.9, mixBlendMode: 'screen'}} />}
    </>
  );
};

/*
  Combínalo: la foto del bowl con el mismo movimiento de las escenas de producto (la cámara se acerca despacio hacia la tapa
  y el logo de la botella y vuelve a abrir, con una inclinación leve). Las cintas, si hay, entran cuando la voz nombra cada ingrediente.
*/
const FOCO_BOWL: Record<string, [number, number]> = {'img/natural-bowl.webp': [810, 900], 'img/frutado-bowl.webp': [815, 940]};
export const Combinalo: FC = ({e}) => {
  const t = useT(), p = PALETAS[e.tono];
  const a = e.inicio - 0.3, b = e.fin! + 0.3;
  const tam = Number(e.textos.tam);
  return (
    <AbsoluteFill style={{background: PALETAS[e.tono].sombra}}>
      <Heroe e={e}>
        <Foto3D src={e.imagenes!.heroe} t={t} zoom={1 + vaiven(t, a, b) * 0.12} foco={FOCO_BOWL[e.imagenes!.heroe]} incl={[-2 + rampa(t, a, b, 0, 1.4, (k) => k), -0.8]} motas={p.acento} />
      </Heroe>
      <Grano fuerza={0.18} />
      <Linea txt={e.textos.l1} t={t} en={e.cues.titulo} y={240} tam={tam} sombra resalta={e.textos.resalta} colorResalta={p.subtitulo} />
      <Linea txt={e.textos.l2} t={t} en={e.cues.titulo + 0.12} y={240 + tam + 8} tam={tam} sombra resalta={e.textos.resalta} colorResalta={p.subtitulo} />
      {e.lista?.map((c, i) => (
        <Cinta key={c.txt} txt={c.txt} t={t} en={c.en} y={240 + tam * 2 + 52 + i * 86} tam={36} fondo={p.cinta} color={p.cintaTexto} />
      ))}
    </AbsoluteFill>
  );
};

/*
  Cierre: la llamada a la acción, TRIALFERI como palabra con un trazo de luz y el WhatsApp.
  El número entra completo de un golpe (no por partes) al abrir la escena; cada grupo pulsa cuando la voz lo dicta.
  Natural: la foto héroe queda bajo el número, a un tamaño en que el nombre y el logo de las etiquetas terminan justo
  sobre los subtítulos; el zoom crece desde ahí (base de los logos) para que no bajen.
*/
export const Cierre: FC = ({e, variante}) => {
  const t = useT(), c = e.cues;
  const grupos = e.textos.numero.split(' ');
  const cueGrupo = [c.g1, c.g2, c.g3];
  const sd = rampa(t, e.inicio - 0.25, e.inicio + 0.9);
  const llega = rampa(t, c.numero, c.numero + 0.34);
  const golpe = pulso(t, c.numero, 0.07, 0.45);
  const a = e.inicio - 0.3, b = e.fin!;
  return (
    <AbsoluteFill>
      <Fondo tono={e.tono} t={t} luz={[46, 30]} />
      {variante === 'natural' ? (
        <>
          {/* halo del mismo azul oscuro de la foto: sus bordes se pierden en él y no se ve el recuadro sobre el fondo tinta */}
          <div style={{position: 'absolute', left: 540 - 1100, top: 500, width: 2200, height: 2000, borderRadius: '50%', background: 'radial-gradient(closest-side, #060F1E 0%, #060F1E 55%, transparent 74%)', opacity: cl(sd * 2)}} />
          <FotoHeroe src={e.imagenes!.heroe} k={0.7} left={-55} top={728 + (1 - sd) * 60} arriba={14} der={9} origen="615px 742px" escala={1 + vaiven(t, a, b, 0.5, 0.15) * 0.08} opacidad={cl(sd * 2)} incl={[-1.8 + rampa(t, a, b, 0, 3, (k) => k), 0.8]} />
        </>
      ) : (
        <Franjas t={t} en={e.inicio - 0.1} base={1660} alto={600} desde={960} />
      )}
      <Linea txt={e.textos.cta} t={t} en={c.cta} y={240} tam={Number(e.textos.tam)} resalta={e.textos.resalta} colorResalta={e.textos.acento} />
      <Linea txt="TRIALFERI" t={t} en={e.inicio - 0.12} y={346} tam={234} tracking={-1} />
      <TrazoLuz t={t} en={c.luz} y={596} ancho={806} color={e.textos.acento} />
      <Dato t={t} en={c.numero - 0.12} y={636} tam={40}>
        <span style={{display: 'flex', alignItems: 'center', gap: 16}}><IconoWhatsApp tam={48} />{e.textos.whatsapp}</span>
      </Dato>
      <div style={{position: 'absolute', left: SEGURA.x0, top: 700, display: 'flex', gap: 32, fontFamily: FUENTE.anton, fontSize: 156, lineHeight: 1, opacity: cl(llega * 2.5), scale: `${1.28 - llega * 0.28 + golpe * 0.03}`, transformOrigin: '0 60%'}}>
        {grupos.map((g, i) => {
          const dicho = pulso(t, cueGrupo[i], 0.12, 0.6);
          return <span key={i} style={{color: e.textos.acento, scale: `${1 + dicho * 0.06}`, transformOrigin: '50% 70%'}}>{g}</span>;
        })}
      </div>
      <Destello t={t} en={c.numero} color={e.textos.acento} fuerza={0.22} />
    </AbsoluteFill>
  );
};
