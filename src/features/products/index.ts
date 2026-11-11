export { allProducts, productFamilies } from './data/products';
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
  getAvailableFromPrice,
  isAvailable,
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

export type { Product, ProductAvailability, ProductFamily, ProductVariant } from './types/product.type';
export type { SubcategorySlug } from './data/subcategoryIndex';
export type { SubcategoryDetail, SubcategoryComparison, SubcategoryPanel } from './data/subcategories';
export type { Tone, SectionTone } from './lib/productAccent';

export { getProductBaseTitle, getProductImage, getProductShortName } from './lib/productDisplay';
export { buildProductMetaDescription } from './lib/productSeo';
export { accentFor, toneStyles, tonePanelBackground } from './lib/productAccent';
export { badgeConfig, getDisplayTags, isAttributeTag } from './data/badgeConfig';
export type { BadgeType } from './data/badgeConfig';
