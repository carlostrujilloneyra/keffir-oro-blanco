export { allProducts } from './data/products';
export { ProductCategory, categoryDetails, isProductCategory } from './data/categories';
export {
  bestSellersCollection,
  promotedCollection,
  getProductById,
  getProductBySlug,
  getProductUrlById,
  getSizeVariants,
  getDefaultVariant,
  getRelatedProducts,
  getProductGroups,
} from './data/collections';
export type { ProductGroup } from './data/collections';
export {
  subcategoryDetails,
  getSubcategoryProducts,
  getSubcategorySummary,
  getSubcategoryImage,
  resolveSubcategory,
} from './data/subcategories';

export { getCategoryPack, getPackProducts } from './data/packs';
export type { Pack } from './data/packs';

export type { Product } from './types/product.type';
export type { SubcategoryDetail, SubcategoryComparison } from './data/subcategories';
export type { Tone, SectionTone } from './lib/productAccent';

export { getProductBaseTitle, getProductImage } from './lib/productDisplay';
export { buildProductMetaDescription } from './lib/productSeo';
export { toneStyles } from './lib/productAccent';
export { badgeConfig, isAttributeTag } from './data/badgeConfig';
export type { BadgeType } from './data/badgeConfig';
