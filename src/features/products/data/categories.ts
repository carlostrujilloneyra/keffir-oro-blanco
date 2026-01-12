export enum ProductCategory {
  PROBIOTICOS = 'probioticos',
  TRADICIONALES = 'otros',
}

export const categoryDetails = {
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
