/* Agrega alfa en hex de 2 dígitos a un color #RRGGBB (para degradados en `style`). */
export const withAlpha = (hex: string, alpha: number) =>
  `${hex}${Math.round(alpha * 255)
    .toString(16)
    .padStart(2, '0')}`;
