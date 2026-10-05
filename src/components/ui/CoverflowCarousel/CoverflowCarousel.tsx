'use client';

import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  STAGE_VERTICAL_PADDING,
  SWIPE_THRESHOLD,
  buildLayout,
  getCardStyle,
  getCircularOffset,
  getContentWidth,
} from './layout';
import styles from './CoverflowCarousel.module.css';

type Props<T extends { id: number | string }> = {
  products: T[];
  /** isCenter = true cuando la card es la central (la grande). */
  renderCard: (product: T, isCenter: boolean) => ReactNode;
};

export function CoverflowCarousel<T extends { id: number | string }>({ products, renderCard }: Props<T>) {
  const total = products.length;

  const [activeIndex, setActiveIndex] = useState(() => Math.floor(total / 2));
  const [isMobile, setIsMobile] = useState(false);

  const layout = useMemo(() => buildLayout(isMobile, total), [isMobile, total]);

  // Offset previo de cada card, para detectar cuándo "da la vuelta" del loop.
  const previousOffsetsRef = useRef<Record<string, number>>({});
  const touchStartXRef = useRef<number | null>(null);

  // Detecta viewport mobile (evita mismatch SSR: arranca en desktop).
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  // Mantiene el índice en rango si cambia la cantidad de productos.
  useEffect(() => {
    setActiveIndex((current) => (current >= total ? 0 : current));
  }, [total]);

  // Guarda el offset previo de cada card para detectar el wrap.
  useEffect(() => {
    const nextOffsets: Record<string, number> = {};
    products.forEach((product, index) => {
      nextOffsets[String(product.id)] = getCircularOffset(index, activeIndex, total);
    });
    previousOffsetsRef.current = nextOffsets;
  }, [activeIndex, products, total]);

  // Loop infinito: las flechas nunca llegan a un extremo, dan la vuelta.
  const goToPrevious = () => setActiveIndex((c) => (c - 1 + total) % total);
  const goToNext = () => setActiveIndex((c) => (c + 1) % total);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    if (deltaX < 0) goToNext();
    else goToPrevious();
  };

  const stageHeight = layout.cardHeight * layout.centerScale + STAGE_VERTICAL_PADDING;

  return (
    <div className={styles.coverflow} style={{ width: getContentWidth(layout), maxWidth: '100%' }}>
      <div
        className={styles.stage}
        style={{ height: stageHeight }}
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
      >
        {products.map((product, index) => {
          const offset = getCircularOffset(index, activeIndex, total);
          const previousOffset = previousOffsetsRef.current[String(product.id)];

          // La card "dio la vuelta" si su offset saltó más de media rueda.
          const isWrapping = previousOffset !== undefined && Math.abs(offset - previousOffset) > total / 2;
          const isHidden = Math.abs(offset) > layout.visibleSideCards;
          const isCenter = offset === 0;

          // Anima salvo cuando da la vuelta Y queda oculta: ahí la teletransporta (salto invisible).
          const shouldAnimate = !(isWrapping && isHidden);
          const style = getCardStyle(offset, shouldAnimate, layout);

          // Card central: contenedor simple (su "Ver producto" navega al detalle).
          if (isCenter) {
            return (
              <div key={product.id} className={`${styles.slot} ${styles.slotActive}`} style={style}>
                {renderCard(product, true)}
              </div>
            );
          }

          // Cards laterales: clic (o Enter/Espacio) las centra, no navegan.
          return (
            <div
              key={product.id}
              className={styles.slot}
              style={style}
              role='button'
              tabIndex={isHidden ? -1 : 0}
              aria-hidden={isHidden}
              aria-label='Centrar producto'
              onClick={() => setActiveIndex(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveIndex(index);
                }
              }}
            >
              {renderCard(product, false)}
            </div>
          );
        })}
      </div>

      {!isMobile && (
        <div className={styles.navigation}>
          <button className={`${styles.arrow} ${styles.arrowPrev}`} onClick={goToPrevious} aria-label='Anterior'>
            <ChevronLeft className='h-5 w-5' />
          </button>
          <button className={`${styles.arrow} ${styles.arrowNext}`} onClick={goToNext} aria-label='Siguiente'>
            <ChevronRight className='h-5 w-5' />
          </button>
        </div>
      )}

      {/* Dots de paginación: indican cuántos productos hay y en cuál estás (clave en mobile). */}
      <div className={styles.dots}>
        {products.map((product, index) => (
          <button
            key={product.id}
            className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Ir al producto ${index + 1}`}
            aria-current={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}
