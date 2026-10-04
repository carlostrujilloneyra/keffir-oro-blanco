import type { MetadataRoute } from 'next';
import { allProducts, categoryDetails, getSubcategoryUrl, subcategoryDetails } from '@/features/products';
import { SITE_URL } from '@/lib/site';

/*
  Sitemap: la lista de todas las URLs del sitio para que Google las descubra.
  Next lo sirve automáticamente en /sitemap.xml a partir de este archivo.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/products`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = Object.values(categoryDetails).map((category) => ({
    url: `${SITE_URL}/categorias/${category.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const subcategoryRoutes: MetadataRoute.Sitemap = subcategoryDetails.map((sub) => ({
    url: `${SITE_URL}${getSubcategoryUrl(sub)}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.65,
  }));

  const productRoutes: MetadataRoute.Sitemap = allProducts.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...subcategoryRoutes, ...productRoutes];
}
