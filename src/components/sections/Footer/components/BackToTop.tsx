'use client';

import { ArrowUp } from 'lucide-react';

/*
  Único fragmento interactivo del footer: por eso se aísla como Client
  Component y el resto del footer sigue siendo Server Component.
*/
export const BackToTop = () => {
  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      type='button'
      onClick={scrollToTop}
      className='group inline-flex items-center gap-2 text-sm font-medium text-papel/60 transition-colors hover:text-papel'
    >
      Volver arriba
      <ArrowUp className='h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5' />
    </button>
  );
};
