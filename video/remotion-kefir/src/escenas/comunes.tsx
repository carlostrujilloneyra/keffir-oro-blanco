import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, staticFile, useVideoConfig} from 'remotion';
import {cl, muelle, rampa, useT} from '../anim';
import {Bowl} from '../componentes/Bowl';
import {Fondo} from '../componentes/Fondo';
import {IconoTikTok, IconoWhatsApp} from '../componentes/Iconos';
import {Producto} from '../componentes/Producto';
import {Cinta, Dato, Linea} from '../componentes/Texto';
import type {Escena, VideoKefirProps} from '../datos/tipos';
import {FUENTE, PALETAS, PAPEL, SEGURA, TINTA} from '../tema';

type FC = React.FC<{e: Escena; variante: VideoKefirProps['variante']}>;

// Resplandor detrás del producto: lo separa del fondo sin recurrir a un borde.
export const Halo: React.FC<{x: number; y: number; d: number; color?: string; fuerza?: number}> = ({x, y, d, color = '#fff', fuerza = 0.45}) => (
  <div style={{position: 'absolute', left: x - d / 2, top: y - d / 2, width: d, height: d, borderRadius: '50%', background: `radial-gradient(circle, ${color} 0%, transparent 68%)`, opacity: fuerza}} />
);

/*
  Foto héroe con fondo oscuro propio (public/img/hero-*.png, 1498x1792): se coloca a escala `k` y se funde con la escena
  desvaneciendo los bordes que no llegan al borde del cuadro. La escena usa de fondo el mismo color oscuro de la foto.
*/
export const FotoHeroe: React.FC<{src: string; k: number; left: number; top: number; arriba?: number; abajo?: number; der?: number; escala?: number; origen?: string; opacidad?: number}> = ({src, k, left, top, arriba = 0, abajo = 0, der = 0, escala = 1, origen = '50% 50%', opacidad = 1}) => {
  const mascara = `linear-gradient(to bottom, transparent 0%, #000 ${arriba}%, #000 ${100 - abajo}%, transparent 100%), linear-gradient(to right, #000 ${100 - der}%, transparent 100%)`;
  return (
    <Img src={staticFile(src)} style={{position: 'absolute', left, top, width: 1498 * k, height: 1792 * k, transformOrigin: origen, scale: `${escala}`, opacity: opacidad,
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

const BOTELLA = {
  natural: {ancho: 358, alto: 1150, base: 1556, bowl: ['#2D7FC4', '#123C63'] as [string, string], kefir: ['#FFFFFF', '#EFE7D6'] as [string, string]},
  frutado: {ancho: 384, alto: 960, base: 1716, bowl: ['#D8336F', '#7A1040'] as [string, string], kefir: ['#FBD3E0', '#F2A9C4'] as [string, string]},
};

// Combínalo: bowl ilustrado; granola, cereales y fruta caen cuando la voz los nombra (las cintas entran antes, para que se lean).
export const Combinalo: FC = ({e, variante}) => {
  const t = useT();
  const b = BOTELLA[variante];
  const s = muelle(t, e.inicio - 0.2, true);
  const nat = variante === 'natural';
  return (
    <AbsoluteFill>
      <Fondo tono={e.tono} t={t} luz={[40, 58]} />
      <Heroe e={e}>
        <Bowl t={t} x={400} y={1240} A={375} bowl={b.bowl} kefir={b.kefir} cues={{granola: e.cues.granola, cereales: e.cues.cereales, frutas: e.cues.frutas}} />
        {/* la botella va delante del bowl y apoyada más abajo: nada tapa su etiqueta */}
        <Producto src={e.imagenes!.heroe} ancho={b.ancho} alto={b.alto} x={884} base={b.base + (1 - s) * 60} reflejo={0.2} t={t} opacidad={cl(s * 3)} sombra="rgba(90,70,30,.3)" brillo={e.inicio + 1.1} />
      </Heroe>
      <Linea txt={e.textos.titulo} t={t} en={e.cues.titulo} y={240} tam={nat ? 176 : 148} color={TINTA} />
      <Dato t={t} en={e.cues.apoyo} y={nat ? 432 : 404} tam={44} color={TINTA}>{e.textos.apoyo}</Dato>
      <div style={{position: 'absolute', left: SEGURA.x0, top: nat ? 524 : 496, width: SEGURA.x1 - SEGURA.x0, display: 'flex', flexWrap: 'wrap', gap: '14px 12px'}}>
        {e.lista!.map((c) => (
          <Cinta key={c.txt} txt={c.txt} t={t} en={c.en} y={0} tam={36} enFlujo />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const FILA_FRUTADOS = [
  {src: 'img/fresa-recta.png', w: 556, h: 1307},
  {src: 'img/arandanos-recta.png', w: 472, h: 1231},
  {src: 'img/frutos.png', w: 585, h: 1463},
  {src: 'img/chocolate-botella.png', w: 465, h: 1300},
];

// Cierre: TRIALFERI como palabra, WhatsApp y TikTok. El número se ve completo y en color desde que aparece; cada grupo pulsa cuando la voz lo dicta.
export const Cierre: FC = ({e, variante}) => {
  const t = useT(), p = PALETAS[e.tono];
  const grupos = e.textos.numero.split(' ');
  const cueGrupo = [e.cues.g1, e.cues.g2, e.cues.g3];
  const sd = rampa(t, e.inicio - 0.25, e.inicio + 0.9);
  return (
    <AbsoluteFill>
      <Fondo tono={e.tono} t={t} luz={[46, 30]} />
      {variante === 'frutado' && <div style={{position: 'absolute', left: 540 - 700, top: 880, width: 1400, height: 1100, borderRadius: '50%', background: `radial-gradient(ellipse, ${e.textos.luz} 0%, transparent 66%)`, opacity: 0.42 * rampa(t, e.inicio + 0.3, e.inicio + 1.4)}} />}
      <Cinta txt={e.textos.lema} t={t} en={e.cues.lema} y={244} tam={34} fondo={p.cinta} color={p.cintaTexto} />
      <Linea txt="TRIALFERI" t={t} en={e.inicio - 0.12} y={330} tam={234} tracking={-1} />
      <Dato t={t} en={e.cues.pide} y={604} tam={40}>
        <span style={{display: 'flex', alignItems: 'center', gap: 16}}><IconoWhatsApp tam={48} />{e.textos.pide}</span>
      </Dato>
      <div style={{position: 'absolute', left: SEGURA.x0, top: 662, display: 'flex', gap: 34, fontFamily: FUENTE.anton, fontSize: 168, lineHeight: 1, opacity: rampa(t, e.cues.pide + 0.1, e.cues.pide + 0.6)}}>
        {grupos.map((g, i) => {
          const c = cueGrupo[i];
          const pulso = t < c + 0.12 ? rampa(t, c, c + 0.12) : 1 - rampa(t, c + 0.2, c + 0.7, 0, 1, (k) => k);
          return <span key={i} style={{color: e.textos.acento, scale: `${1 + pulso * 0.06}`, transformOrigin: '50% 70%'}}>{g}</span>;
        })}
      </div>
      <Dato t={t} en={e.cues.pide + 0.35} y={838} tam={48} peso={600}>
        <span style={{display: 'flex', alignItems: 'center', gap: 14}}><IconoTikTok tam={44} color={PAPEL} />{e.textos.tiktok}</span>
      </Dato>
      <Dato t={t} en={e.cues.pide + 0.5} y={906} tam={34} color="rgba(248,242,230,.78)">{e.textos.tamanos}</Dato>
      {variante === 'natural' ? (
        // foto héroe: las dos botellas al ~63 % del ancho en la mitad inferior; los subtítulos caen sobre el hombro blanco, encima de la etiqueta
        <FotoHeroe src={e.imagenes!.heroe} k={0.8} left={-160} top={900 + (1 - sd) * 70} arriba={16} der={9} origen="58% 40%" escala={1.05 - sd * 0.05} opacidad={cl(sd * 2)} />
      ) : (
        FILA_FRUTADOS.map((b, i) => {
          const s = muelle(t, e.inicio - 0.2 + i * 0.09, true);
          return <Producto key={b.src} src={b.src} ancho={(660 * b.w) / b.h} alto={660} x={165 + i * 250} base={1618 + (1 - s) * 90} reflejo={0.22} t={t} opacidad={cl(s * 3)} sombra="rgba(0,0,0,.6)" brillo={e.inicio + 1 + i * 0.18} />;
        })
      )}
    </AbsoluteFill>
  );
};
