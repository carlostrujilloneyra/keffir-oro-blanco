export enum ProductCategory {
  KEFIR = 'kefir',
  LACTEOS_ARTESANALES = 'lacteos-artesanales',
  FERMENTOS = 'probioticos',
  OTROS = 'otros',
}

export const categoryDetails = {
  [ProductCategory.KEFIR]: {
    title: 'Kéfir',
    slug: 'kefir',
    description: 'Descripción por completar para los kéfires',
    imageUrl: '',
  },
  [ProductCategory.LACTEOS_ARTESANALES]: {
    title: 'Lácteos Artesanales',
    slug: 'lacteos-artesanales',
    description: 'Descripción para completar para los lácteos',
    imageUrl: '',
  },

  [ProductCategory.FERMENTOS]: {
    title: 'Fermentos',
    slug: 'fermentos',
    description: 'Descripción para completar para los fermentos',
    imageUrl: '',
  },

  [ProductCategory.OTROS]: {
    title: 'Otros productos',
    slug: 'otros',
    description: 'Descripción para completar para otros productos',
    imageUrl: '',
  },
};
