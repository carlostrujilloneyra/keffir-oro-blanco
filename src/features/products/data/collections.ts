import { allProducts } from './products';

// 2. Exportamos cada "lista de reproducción" como una constante
export const newProductsCollection = allProducts.filter((p) => p.tags?.includes('new'));

export const bestSellersCollection = allProducts.filter((p) => p.tags?.includes('best-seller'));

export const recommendedCollection = allProducts.filter((p) => p.tags?.includes('recommended'));

export const promotedCollection = allProducts.filter((p) => p.tags?.includes('discover'));

// También puedes exportar colecciones más complejas
export const featuredHomeProducts = allProducts.slice(0, 4);
