export enum ProductCategory {
  LACTEOS = 'lacteos',
  PROBIOTICOS = 'probioticos',
  KEFIR = 'kefir',
  KEFIR_FRUTADO = 'kefir-frutado',
  TRADICIONALES = 'tradicionales',
  OTROS = 'otros',
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
  [ProductCategory.KEFIR]: {
    title: 'Kéfir',
    slug: 'kefir',
  },
  [ProductCategory.KEFIR_FRUTADO]: {
    title: 'Kéfir Frutado',
    slug: 'kefir-frutado',
  },
  [ProductCategory.TRADICIONALES]: {
    title: 'Tradicionales',
    slug: 'tradicionales',
  },

  [ProductCategory.OTROS]: {
    title: 'Otros productos',
    slug: 'otros',
  },
};
