import { useEffect, useState, type FocusEvent, type KeyboardEvent, type PointerEvent, type WheelEvent } from 'react';

/*
  Estado del carrusel: slide activo y motivos de pausa. El avance automático no
  vive aquí: lo dispara el fin de la animación de la barra de progreso (`advance`).

  hover, foco de teclado y pestaña oculta pausan mientras duran. Cualquier gesto
  del usuario (tocar, scroll horizontal, flechas, mini-cards) fija `userPaused`,
  y solo el botón de play lo quita: el autoplay nunca se reanuda solo.
*/
export const useHeroCarousel = (total: number) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasChanged, setHasChanged] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const handleVisibility = () => setPageHidden(document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const show = (index: number) => {
    setActiveIndex((index + total) % total);
    setHasChanged(true);
  };

  /* Acciones del usuario: además de mover, pausan. */
  const goTo = (index: number) => {
    setUserPaused(true);
    show(index);
  };
  const next = () => goTo(activeIndex + 1);
  const previous = () => goTo(activeIndex - 1);

  /* Eventos que burbujean de los controles de la región. */
  const regionHandlers = {
    onPointerEnter: (e: PointerEvent) => e.pointerType === 'mouse' && setHovered(true),
    onPointerLeave: () => setHovered(false),
    /* El botón de play corta la propagación: si no, este pointerdown pausaría y su clic reanudaría. */
    onPointerDown: () => setUserPaused(true),
    onWheel: (e: WheelEvent) => Math.abs(e.deltaX) > Math.abs(e.deltaY) && setUserPaused(true),
    /* Solo el foco de teclado pausa: tras un clic el foco se queda dentro. */
    onFocus: (e: FocusEvent) => e.target.matches(':focus-visible') && setFocused(true),
    onBlur: (e: FocusEvent) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false),
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      if (e.key === 'ArrowRight') next();
      else previous();
    },
  };

  return {
    activeIndex,
    hasChanged,
    paused: hovered || focused || pageHidden || userPaused,
    userPaused,
    toggleUserPaused: () => setUserPaused((value) => !value),
    advance: () => show(activeIndex + 1),
    goTo,
    next,
    previous,
    regionHandlers,
  };
};
