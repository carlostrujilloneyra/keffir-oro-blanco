// --- 1. Exportamos los COMPONENTES y VALORES ---
//    (Cosas que se usan en el código que se ejecuta)
export { ProductCard } from './components/ProductCard';

// --- 2.Datos y Colecciones
export { allProducts } from './data/products';
export {
  newProductsCollection,
  bestSellersCollection,
  recommendedCollection,
  featuredHomeProducts,
} from './data/collections';

// --- 3. Exportamos los TIPOS ---
export type { Product, ProductTab } from './types/product.type';
export { ProductCategory, categoryDetails } from './data/categories';
