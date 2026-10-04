import { CSSProperties } from 'react';

/*
   Matemática del carrusel coverflow (loop infinito + scale).
   Adaptado de la guía "Favoritos recomendados 2.0" — sin favoritos ni salidas:
   los productos siempre están presentes. Todo se apoya en el "offset circular"
   de cada card respecto a la central.
*/

export type Layout = {
  cardWidth: number;
  cardHeight: number;
  cardGap: number;
  centerScale: number;
  sideScale: number;
  visibleSideCards: number;
};

// Aire vertical extra para que la card central escalada no se recorte.
export const STAGE_VERTICAL_PADDING = 56;

// Distancia mínima (px) de un swipe para que cuente como cambio de card en mobile.
export const SWIPE_THRESHOLD = 40;

// Medidas ajustadas al tamaño real de la ProductShowcaseCard.
const DESKTOP_LAYOUT = {
  cardWidth: 300,
  cardHeight: 440,
  cardGap: 28,
  maxSideCards: 2,
  centerScale: 1.14,
  sideScale: 0.84,
};

// Mobile: card central con buen ancho, gap corto y laterales al 80% para que
// aun así "asomen" a los costados (que se note que hay más productos).
const MOBILE_LAYOUT = {
  cardWidth: 236,
  cardHeight: 400,
  cardGap: 8,
  maxSideCards: 1,
  centerScale: 1.04,
  sideScale: 0.8,
};

/* Distancia circular de una card respecto a la central (loop infinito con las flechas):
   camino más corto en el anillo, así los extremos reaparecen por el lado opuesto.
   0 = central, negativo = izquierda, positivo = derecha.
*/
export const getCircularOffset = (index: number, activeIndex: number, total: number): number => {
  const half = total / 2;
  let offset = index - activeIndex;
  if (offset > half) offset -= total;
  else if (offset < -half) offset += total;
  return offset;
};

/** Posición horizontal (px) del centro de una card según su offset, con gap uniforme. */
export const getTranslateX = (offset: number, layout: Layout): number => {
  if (offset === 0) return 0;

  const direction = Math.sign(offset);
  const steps = Math.abs(offset);
  const centerHalf = (layout.cardWidth * layout.centerScale) / 2;
  const sideHalf = (layout.cardWidth * layout.sideScale) / 2;

  const centerToFirstSide = centerHalf + layout.cardGap + sideHalf;
  const betweenSides = layout.cardWidth * layout.sideScale + layout.cardGap;

  return direction * (centerToFirstSide + (steps - 1) * betweenSides);
};

// Ancho total del contenido visible (para centrar el carrusel y pegar las flechas a sus bordes).
export const getContentWidth = (layout: Layout): number => {
  const sideHalf = (layout.cardWidth * layout.sideScale) / 2;
  return 2 * (getTranslateX(layout.visibleSideCards, layout) + sideHalf);
};

/** Estilo inline de cada card según su offset. */
export const getCardStyle = (offset: number, animate: boolean, layout: Layout): CSSProperties => {
  const distance = Math.min(Math.abs(offset), layout.visibleSideCards);
  const clampedOffset = Math.sign(offset) * distance;
  const isHidden = Math.abs(offset) > layout.visibleSideCards;

  const scale = offset === 0 ? layout.centerScale : layout.sideScale;

  return {
    width: layout.cardWidth,
    height: layout.cardHeight,
    transform: `translate(-50%, -50%) translateX(${getTranslateX(clampedOffset, layout)}px) scale(${scale})`,
    opacity: isHidden ? 0 : 1,
    zIndex: layout.visibleSideCards + 1 - distance,
    pointerEvents: isHidden ? 'none' : 'auto',
    transition: animate ? undefined : 'none', // 'none' = teletransporte sin animar (al dar la vuelta)
  };
};

/** Config final: elige MOBILE/DESKTOP y calcula cuántas laterales mostrar sin dejar huecos. */
export const buildLayout = (isMobile: boolean, total: number): Layout => {
  const base = isMobile ? MOBILE_LAYOUT : DESKTOP_LAYOUT;
  const visibleSideCards = Math.min(base.maxSideCards, Math.floor((total - 1) / 2));
  return {
    cardWidth: base.cardWidth,
    cardHeight: base.cardHeight,
    cardGap: base.cardGap,
    centerScale: base.centerScale,
    sideScale: base.sideScale,
    visibleSideCards,
  };
};
