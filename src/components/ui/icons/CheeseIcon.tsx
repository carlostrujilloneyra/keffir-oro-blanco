import React from 'react';

export const CheeseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2' // Antes: stroke-width
    strokeLinecap='round' // Antes: stroke-linecap
    strokeLinejoin='round' // Antes: stroke-linejoin
    // El 'class' del SVG se ignora, porque lo controlaremos con 'className' a través de los props.
    // {...props} pasa cualquier prop extra (como className) al elemento SVG.
    {...props}
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M4.519 20.008l16.481 -.008v-3.5a2 2 0 1 1 0 -4v-3.5h-16.722' />
    <path d='M21 9l-9.385 -4.992c-2.512 .12 -4.758 1.42 -6.327 3.425c-1.423 1.82 -2.288 4.221 -2.288 6.854c0 2.117 .56 4.085 1.519 5.721' />
    <path d='M15 13v.01' />
    <path d='M8 13v.01' />
    <path d='M11 16v.01' />
  </svg>
);
