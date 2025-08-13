export enum ProductCategory {
  LACTEOS = 'lacteos',
  PROBIOTICOS = 'probioticos',
  KEFIR_FRUTADO = 'kefir-frutado',
  TRADICIONALES = 'tradicionales',
}

export const categoryDetails = {
  [ProductCategory.LACTEOS]: {
    title: 'Lácteos',
    slug: 'lacteos',
  },
  [ProductCategory.PROBIOTICOS]: {
    title: 'Probióticos',
    slug: 'probioticos',
  },
  [ProductCategory.KEFIR_FRUTADO]: {
    title: 'Kéfir Frutado',
    slug: 'kefir-frutado',
  },
  [ProductCategory.TRADICIONALES]: {
    title: 'Tradicionales',
    slug: 'tradicionales',
  },
};
