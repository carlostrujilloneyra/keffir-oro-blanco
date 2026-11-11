import { ProductCategory } from './categories';

/*
  Identidad de cada subcategoría: su slug y la categoría a la que pertenece.
  Vive aparte de subcategories.ts para que products.tsx pueda derivar la
  categoría de cada familia sin import circular (subcategories importa productos).
  El orden aquí es el de las páginas y el menú.
*/
export const subcategoryCategory = {
  'kefir-natural': ProductCategory.PROBIOTICOS,
  'kefir-frutado': ProductCategory.PROBIOTICOS,
  'kombucha-y-kefir-de-agua': ProductCategory.PROBIOTICOS,
  fermentados: ProductCategory.PROBIOTICOS,
  'para-cocinar': ProductCategory.TRADICIONALES,
  mermeladas: ProductCategory.TRADICIONALES,
} as const satisfies Record<string, ProductCategory>;

export type SubcategorySlug = keyof typeof subcategoryCategory;
