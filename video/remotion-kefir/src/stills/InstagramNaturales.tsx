import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {Grano} from '../componentes/Fondo';
import {IconoArtesanal, IconoFrasco, IconoProbioticos, IconoSinConservantes, IconoWhatsAppLinea} from '../componentes/Iconos';
import {Linea} from '../componentes/Texto';
import {Chip, type Icono} from '../componentes/Vidrio';
import {FUENTE, GRADIENTE_VERDE, PALETAS, PAPEL} from '../tema';

/*
  Post de Instagram 1080x1440 (3:4) sobre la foto de vaca + cabra 1 L (public/img/instagram/naturales-vertical.png, casi 3:4).
  Las botellas y el splash ocupan x 52-100 %, y 26-75 %: el texto va solo en la columna izquierda (64 a 518) y en la franja de abajo.
  Medido en la foto: la botella de vaca empieza en x ≈ 573 y la punta del splash entra a la columna entre y 815 y 1000 (hasta x ≈ 434).
  Render: npx remotion still src/index.ts InstagramNaturalesA ../out/instagram/naturales-hook-A.png (igual B y C).
*/
export const ANCHO_IG = 1080;
export const ALTO_IG = 1440;
const M = 64;
const T = 10; // las entradas de Linea ya asentadas, como en las otras imágenes fijas
const AZUL = PALETAS.noche.subtitulo;

// la línea 2 cortada a mano: más ancha que "sin azúcar añadida" toca la botella de vaca
export const HOOKS = {
  A: {linea1: ['ESTO NO', 'ES YOGURT'], resalta: 'NO', linea2: ['Es kéfir de verdad']},
  B: {linea1: ['¿VACA O', 'CABRA?'], resalta: 'CABRA', linea2: ['Tú eliges', 'tu kéfir natural']},
  C: {linea1: ['KÉFIR', 'NATURAL'], resalta: 'NATURAL', linea2: ['Cremoso,', 'artesanal y', 'sin azúcar añadida']},
};
export type Hook = keyof typeof HOOKS;

/*
  Con íconos los chips van a 30 px: "Sin conservantes añadidos" termina en x ≈ 546, antes de la botella.
  Orden por ancho frente al splash: el largo arriba (termina antes de y 815), el corto a la altura de la punta
  y "Alto en probióticos" (x ≈ 420) más abajo, donde el splash ya se retiró a x ≥ 459.
*/
const CHIPS: [string, Icono][] = [
  ['Sin conservantes añadidos', IconoSinConservantes],
  ['100 % artesanal', IconoArtesanal],
  ['Alto en probióticos', IconoProbioticos],
];
const Y_CHIPS = 736; // el chip largo termina antes de la gota del splash (x ≈ 497, y ≈ 818)
const VIDRIO_IG: React.CSSProperties = {backdropFilter: 'blur(14px) saturate(140%)', WebkitBackdropFilter: 'blur(14px) saturate(140%)',
  border: '1px solid rgba(255,255,255,.3)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.5), 0 8px 24px rgba(0,0,0,.16)'};
const CHIP_IG: React.CSSProperties = {...VIDRIO_IG, fontSize: 30, gap: 10, padding: '0 18px 0 14px', letterSpacing: '-0.01em'};

/*
  Retoques de la versión pulida (por ahora solo A, naturales-hook-A-v2): chips más compactos para dejar ≥ 48 px
  hasta la botella (el largo termina en x ≈ 522), frasco en vez de las cápsulas de probióticos, línea 2 un 10 % más grande
  y botón en verde vivo. B y C siguen con los valores de arriba.
*/
const CHIP_PULIDO: React.CSSProperties = {...CHIP_IG, gap: 8, padding: '0 12px 0 10px', letterSpacing: '-0.02em'};
const BOTON = {base: GRADIENTE_VERDE, pulido: 'linear-gradient(135deg, #2FBF71 0%, #1E9E5A 100%)'};

/*
  Sello de 190 px de diámetro: el PNG (1224x1138) trae margen transparente y el círculo ocupa x 83-1130, y 35-1085,
  así que se escala por el círculo y se desplaza para que su borde caiga en la caja.
*/
const SELLO = 190;
const K = SELLO / 1048;

const LINEA1 = 116;
const PASO = 104; // interlineado ajustado de la línea 1
const LINEA2 = 48;
const INTER2 = 54; // interlineado de la línea 2
const Y_HOOK = M + SELLO + 42;
const Y_CTA = 1124; // 78 %: lo más cerca de los chips que permite la franja inferior

export const InstagramNaturales: React.FC<{hook: Hook; pulido?: boolean}> = ({hook, pulido}) => {
  const h = HOOKS[hook];
  // el hueco que sobra sobre los chips (C, con tres líneas, no tiene) se reparte mitad sobre el hook y mitad bajo la línea 2
  const alto = PASO * (h.linea1.length - 1) + LINEA1 + 20 + INTER2 * h.linea2.length;
  const y0 = Y_HOOK + Math.max(0, Math.round((Y_CHIPS - 46 - Y_HOOK - alto) / 2));
  const yLinea2 = y0 + PASO * (h.linea1.length - 1) + LINEA1 + 20;
  return (
    <AbsoluteFill style={{background: PALETAS.noche.base}}>
      <Img src={staticFile('img/instagram/naturales-vertical.png')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}} />
      {/* luz detrás de los chips para que el vidrio tenga algo que desenfocar; la máscara la apaga antes de la botella */}
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle 520px at 20% 62%, rgba(77,163,255,.22), transparent 70%)', filter: 'blur(60px)',
        maskImage: 'linear-gradient(to right, #000 360px, transparent 540px)', WebkitMaskImage: 'linear-gradient(to right, #000 360px, transparent 540px)'}} />

      {/* viñeta suave en las esquinas, bajo los textos para no apagarlos */}
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,.35) 100%)'}} />

      <div style={{position: 'absolute', left: M, top: M, width: SELLO, height: SELLO}}>
        <Img src={staticFile('img/trialferi-logo.png')} style={{position: 'absolute', left: -83 * K, top: -35 * K, width: 1224 * K, filter: 'drop-shadow(0 8px 24px rgba(0,0,0,.35))'}} />
      </div>
      <div style={{position: 'absolute', left: M + SELLO + 24, top: M, height: SELLO, display: 'flex', alignItems: 'center', fontFamily: FUENTE.txt, fontWeight: 600, fontSize: 34, color: PAPEL}}>@trialferi</div>

      {h.linea1.map((txt, i) => <Linea key={txt} txt={txt} t={T} en={0} x={M} y={y0 + i * PASO} tam={LINEA1} sombra resalta={h.resalta} colorResalta={AZUL} />)}
      <div style={{position: 'absolute', left: M, top: yLinea2, fontFamily: FUENTE.txt, fontStyle: 'italic', fontWeight: 500, fontSize: pulido ? Math.round(LINEA2 * 1.1) : LINEA2, lineHeight: `${INTER2}px`, color: AZUL}}>
        {h.linea2.map((l) => <div key={l} style={{whiteSpace: 'nowrap'}}>{l}</div>)}
      </div>

      <div style={{position: 'absolute', left: M, top: Y_CHIPS, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16}}>
        {CHIPS.map(([txt, Icono]) => (
          <Chip key={txt} txt={txt} Icono={pulido && Icono === IconoProbioticos ? IconoFrasco : Icono} tamIcono={pulido ? 30 : 32} estilo={pulido ? CHIP_PULIDO : CHIP_IG} />
        ))}
      </div>

      {/* franja inferior: botón sólido con el verde `primary` de la web, el elemento más fuerte de abajo */}
      <div style={{position: 'absolute', left: M, top: Y_CTA, height: 88, display: 'flex', alignItems: 'center', gap: 16, padding: '0 32px 0 24px', borderRadius: 10,
        background: pulido ? BOTON.pulido : BOTON.base, boxShadow: `inset 0 1px 0 rgba(255,255,255,.35), 0 10px 30px rgba(37,211,102,${pulido ? 0.3 : 0.28})`,
        textShadow: pulido ? '0 1px 2px rgba(0,0,0,.25)' : undefined, fontFamily: FUENTE.txt, fontWeight: 600, fontSize: 40, color: '#fff'}}>
        <IconoWhatsAppLinea tam={48} color='#fff' />
        Pídelo por WhatsApp
      </div>
      <div style={{position: 'absolute', left: M, top: Y_CTA + 88 + 24, fontFamily: FUENTE.txt, fontWeight: 500, fontSize: 32, lineHeight: 1.2, color: PAPEL}}>Delivery a todo Lima</div>

      {/* grano muy leve sobre todo */}
      <Grano fuerza={0.05} />
    </AbsoluteFill>
  );
};
