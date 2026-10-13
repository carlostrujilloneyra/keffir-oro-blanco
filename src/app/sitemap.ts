import type { MetadataRoute } from 'next';
import { allProducts, categoryDetails, subcategoryDetails } from '@/features/products';
import { CATALOG_URL, getCategoryUrl, getProductUrl, getSubcategoryUrl } from '@/lib/routes';
import { SITE_URL } from '@/lib/site';

/*
  Sitemap: la lista de todas las URLs del sitio para que Google las descubra.
  Sin `lastModified`: la fecha del build no es un cambio real y Google deja de fiarse.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}${CATALOG_URL}`, changeFrequency: 'weekly', priority: 0.8 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = Object.values(categoryDetails).map((category) => ({
    url: `${SITE_URL}${getCategoryUrl(category.slug)}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const subcategoryRoutes: MetadataRoute.Sitemap = subcategoryDetails.map((sub) => ({
    url: `${SITE_URL}${getSubcategoryUrl(sub.category, sub.slug)}`,
    changeFrequency: 'weekly',
    priority: 0.65,
  }));

  const productRoutes: MetadataRoute.Sitemap = allProducts.map((product) => ({
    url: `${SITE_URL}${getProductUrl(product.slug)}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...subcategoryRoutes, ...productRoutes];
}
