import React from 'react';

/**
 * Icono de Fresa estilo Glifo (sólido) - Versión Mejorada.
 * Presenta una silueta más elegante e integrada.
 * Usa `fill="currentColor"` para heredar el color del texto.
 */
export const StrawberryIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' {...props}>
    {/*
      Este es un único <path> continuo que dibuja tanto las hojas como el cuerpo.
      Es la forma más limpia y profesional de construir un glifo.
    */}
    <path d='M12,2C11.5,2,11,2.2,10.6,2.6L10.3,2.9C10.4,2.9,10.5,3,10.6,3.1C11,3.5,11,4.1,10.6,4.5C10.2,4.9,9.6,4.9,9.2,4.5C8.8,4.1,8.8,3.5,9.2,3.1L9.4,2.9C8.3,3.7,7.4,4.8,6.9,6.1C5.4,10.2,7.3,14.8,11.2,17.7C11.6,18,12.4,18,12.8,17.7C16.7,14.8,18.6,10.2,17.1,6.1C16.6,4.8,15.7,3.7,14.6,2.9L14.8,3.1C15.2,3.5,15.2,4.1,14.8,4.5C14.4,4.9,13.8,4.9,13.4,4.5C13,4.1,13,3.5,13.4,3.1C13.5,3,13.6,2.9,13.7,2.9L13.4,2.6C13,2.2,12.5,2,12,2z M9.5,8.5C10.3,8.5,11,9.2,11,10C11,10.8,10.3,11.5,9.5,11.5C8.7,11.5,8,10.8,8,10C8,9.2,8.7,8.5,9.5,8.5z M12,10.5C12.8,10.5,13.5,11.2,13.5,12C13.5,12.8,12.8,13.5,12,13.5C11.2,13.5,10.5,12.8,10.5,12C10.5,11.2,11.2,10.5,12,10.5z M14.5,8.5C15.3,8.5,16,9.2,16,10C16,10.8,15.3,11.5,14.5,11.5C13.7,11.5,13,10.8,13,10C13,9.2,13.7,8.5,14.5,8.5z' />
  </svg>
);
