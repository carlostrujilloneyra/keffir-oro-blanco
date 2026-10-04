// --- 1. Exportamos los COMPONENTES y VALORES ---
//    (Cosas que se usan en el código que se ejecuta)
export { ProductCard } from './components/ProductCard';
export { ProductCarousel } from './components/ProductCarousel';

// --- 2.Datos y Colecciones
export { allProducts } from './data/products';
export {
  newProductsCollection,
  bestSellersCollection,
  recommendedCollection,
  featuredHomeProducts,
  promotedCollection,
  getSizeVariants,
  getRelatedProducts,
} from './data/collections';

export {
  subcategoryDetails,
  getSubcategoryProducts,
  getSubcategoriesOf,
  getSubcategoryImage,
  getSubcategoryUrl,
  resolveSubcategory,
} from './data/subcategories';

// --- 3. Exportamos los TIPOS ---
export type { Product, ProductTab } from './types/product.type';
export type { SubcategoryDetail, SubcategoryTone } from './data/subcategories';
export { ProductCategory, categoryDetails } from './data/categories';
