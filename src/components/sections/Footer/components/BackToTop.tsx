'use client';

import { ArrowUp } from 'lucide-react';

/*
  Único fragmento interactivo del footer: por eso se aísla como Client
  Component y el resto del footer sigue siendo Server Component.
*/
export const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type='button'
      onClick={scrollToTop}
      className='group inline-flex items-center gap-2 text-sm font-medium text-papel/60 transition-colors hover:text-papel'
    >
      Volver arriba
      <span className='flex h-8 w-8 items-center justify-center rounded-full border border-papel/20 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-papel/50'>
        <ArrowUp className='h-4 w-4' />
      </span>
    </button>
  );
};
