export { ProductCarousel } from './components/ProductCarousel';

export { allProducts } from './data/products';
export { ProductCategory, categoryDetails, isProductCategory } from './data/categories';
export {
  bestSellersCollection,
  promotedCollection,
  getProductById,
  getProductUrlById,
  getSizeVariants,
  getRelatedProducts,
} from './data/collections';
export {
  subcategoryDetails,
  getSubcategoryProducts,
  getSubcategoryImage,
  resolveSubcategory,
} from './data/subcategories';

export type { Product } from './types/product.type';
