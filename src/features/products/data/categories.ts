/* El value de cada categoría es también su slug en la URL (/categorias/<value>). */
export enum ProductCategory {
  PROBIOTICOS = 'probioticos',
  TRADICIONALES = 'tradicionales',
}

export const isProductCategory = (value: string): value is ProductCategory =>
  (Object.values(ProductCategory) as string[]).includes(value);

/* `description` usa **negrita** (inlineMarkdown); en metadata, stripInlineMarkdown. */
export const categoryDetails = {
  [ProductCategory.PROBIOTICOS]: {
    title: 'Probióticos',
    slug: ProductCategory.PROBIOTICOS,
    eyebrow: 'Fermentación viva',
    description:
      'Kéfir de leche de **vaca y cabra**, natural o con pulpa de frutos del bosque, fresa, arándanos y aguaymanto. También **kéfir de agua, kombucha y chucrut**, todos con cultivos vivos.',
    imageUrl: '/assets/images/categories/kefires.png',
    imageAlt: 'Kéfires artesanales TRIALFERI',
    tone: 'verde' as const,
  },

  [ProductCategory.TRADICIONALES]: {
    title: 'Tradicionales',
    slug: ProductCategory.TRADICIONALES,
    eyebrow: 'Recetas de casa',
    description:
      '**Manteca de cerdo artesanal** elaborada con grasa seleccionada y sin aditivos. Además, mermelada de **fresa, durazno, arándanos y quito quito**. Recetas simples que respetan los ingredientes y los procesos de siempre.',
    imageUrl: '/assets/images/categories/manteca-de-cerdo.webp',
    imageAlt: 'Productos tradicionales TRIALFERI',
    tone: 'miel' as const,
  },
};
