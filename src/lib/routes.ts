/* Única fuente de las rutas públicas: no armar '/products/...' ni '/categorias/...' a mano. */
export const CATALOG_URL = '/products';

export const getProductUrl = (slug: string) => `${CATALOG_URL}/${slug}`;

export const getCategoryUrl = (category: string) => `/categorias/${category}`;

export const getSubcategoryUrl = (category: string, subcategory: string) =>
  `${getCategoryUrl(category)}/${subcategory}`;
