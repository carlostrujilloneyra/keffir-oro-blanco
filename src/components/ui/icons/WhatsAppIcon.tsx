import React from 'react';

/* Icono propio con el mismo trazo que InstagramIcon y TiktokIcon. */
export const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.75'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
    {...props}
  >
    <path d='M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21' />
    <path d='M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1' />
  </svg>
);
