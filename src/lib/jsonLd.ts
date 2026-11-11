import { CONTACT_EMAIL, CURRENCY, LOGO_PATH, SITE_NAME, SITE_URL, WHATSAPP_NUMBER } from '@/lib/site';
import { getProductUrl } from '@/lib/routes';
import { getProductImage, type Product, type ProductAvailability } from '@/features/products';

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const SOCIAL_PROFILES = ['https://www.instagram.com/trialferi/', 'https://www.tiktok.com/@trialferi'];

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  url: SITE_URL,
  description:
    'Kéfir de leche de vaca y cabra, kéfires frutados, kéfir de agua, kombucha y productos tradicionales. Fermentos vivos artesanales, sin conservantes.',
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}${LOGO_PATH}`,
    width: 1224,
    height: 1138,
  },
  image: `${SITE_URL}${LOGO_PATH}`,
  email: CONTACT_EMAIL,
  telephone: `+${WHATSAPP_NUMBER}`,
  areaServed: {
    '@type': 'Country',
    name: 'Perú',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: `+${WHATSAPP_NUMBER}`,
    email: CONTACT_EMAIL,
    areaServed: 'PE',
    availableLanguage: ['Spanish'],
  },
  sameAs: SOCIAL_PROFILES,
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'es-PE',
  publisher: { '@id': ORGANIZATION_ID },
};

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/*
  Migas de pan para el resultado de búsqueda: Google reemplaza la URL cruda
  por la ruta legible (Inicio › Probióticos › Kéfir...). Debe reflejar las
  migas visibles de la página.
*/
export const buildBreadcrumbJsonLd = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

const schemaAvailability: Record<ProductAvailability, string> = {
  available: 'https://schema.org/InStock',
  'coming-soon': 'https://schema.org/PreOrder',
  'sold-out': 'https://schema.org/OutOfStock',
};

/* `availability` ausente = disponible. Se publica tal cual, para no afirmar stock que no hay. */
const getAvailability = (product: Product): ProductAvailability => product.availability ?? 'available';

/*
  schema.org Product. Toda ficha publica el Offer de su propia talla (el precio que
  muestra); un AggregateOffer con el rango del grupo contradecía el precio visible.
  El name es el título de la ficha, con la talla.
*/
export const buildProductJsonLd = (product: Product, categoryTitle?: string) => {
  const url = `${SITE_URL}${getProductUrl(product.slug)}`;

  const offers = {
    '@type': 'Offer',
    price: product.price,
    priceCurrency: CURRENCY,
    availability: schemaAvailability[getAvailability(product)],
    url,
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.shortDescription,
    image: `${SITE_URL}${getProductImage(product)}`,
    brand: { '@type': 'Brand', name: SITE_NAME },
    ...(categoryTitle ? { category: categoryTitle } : {}),
    offers,
  };
};
