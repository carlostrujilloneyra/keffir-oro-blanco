export enum ProductCategory {
  LACTEOS_ARTESANALES = 'lacteos-artesanales',
  PROBIOTICOS = 'probioticos',
  TRADICIONALES = 'otros',
}

export const categoryDetails = {
  [ProductCategory.LACTEOS_ARTESANALES]: {
    title: 'Lácteos Artesanales',
    slug: 'lacteos-artesanales',
    description: 'Descripción para completar para los lácteos',
    imageUrl: '',
  },

  [ProductCategory.PROBIOTICOS]: {
    title: 'Probioticos',
    slug: 'probioticos',
    description: 'Descripción para completar para los fermentos',
    imageUrl: '',
  },

  [ProductCategory.TRADICIONALES]: {
    title: 'Tradicionales',
    slug: 'tradicionales',
    description: 'Descripción para completar para otros productos',
    imageUrl: '',
  },
};
