import React from 'react';

export const HamburgerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='32'
    height='32'
    viewBox='0 0 32 32'
    fill='none'
    stroke='currentColor'
    strokeWidth='2' // Antes: stroke-width
    strokeLinecap='round' // Antes: stroke-linecap
    strokeLinejoin='round' // Antes: stroke-linejoin
    {...props}
  >
    <path d='M4 6l16 0' />
    <path d='M4 12l16 0' />
    <path d='M4 18l16 0' />
  </svg>
);
