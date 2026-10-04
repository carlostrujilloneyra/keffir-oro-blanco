export enum ProductCategory {
  PROBIOTICOS = 'probioticos',
  TRADICIONALES = 'otros',
}

export const categoryDetails = {
  [ProductCategory.PROBIOTICOS]: {
    title: 'Probióticos',
    slug: 'probioticos',
    eyebrow: 'Fermentación viva',
    description:
      'Kéfir de leche de vaca y cabra, kéfires frutados, kéfir de agua y kombucha. Fermentos vivos con cultivos activos, hechos a mano y sin conservantes.',
    imageUrl: '/assets/images/categories/kefires.png',
    tone: 'verde' as const,
  },

  [ProductCategory.TRADICIONALES]: {
    title: 'Tradicionales',
    slug: 'tradicionales',
    eyebrow: 'Saberes ancestrales',
    description:
      'Manteca de cerdo, quesos de cabra, mermeladas y preparaciones caseras. Los saberes de siempre, hechos a mano con ingredientes reales.',
    imageUrl: '/assets/images/categories/manteca-de-cerdo.webp',
    tone: 'miel' as const,
  },
};
