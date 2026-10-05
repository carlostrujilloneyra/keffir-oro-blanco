/* \u00A0 = espacio no separable: el salto de línea nunca separa "475" de "ml". */
export const keepUnitsTogether = (text: string): string => text.replace(/(\d) (?=(ml|l|g|kg)\b)/gi, '$1\u00A0');
