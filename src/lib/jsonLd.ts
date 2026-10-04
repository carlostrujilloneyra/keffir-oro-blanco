import { CONTACT_EMAIL, SITE_NAME, SITE_URL, WHATSAPP_DISPLAY } from '@/lib/site';

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
    url: `${SITE_URL}/og-image.png`,
    width: 1080,
    height: 1080,
  },
  image: `${SITE_URL}/og-image.png`,
  email: CONTACT_EMAIL,
  telephone: WHATSAPP_DISPLAY,
  areaServed: {
    '@type': 'Country',
    name: 'Perú',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: WHATSAPP_DISPLAY,
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
