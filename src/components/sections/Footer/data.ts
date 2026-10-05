import { InstagramIcon, TiktokIcon } from '@/components/ui/icons';
import { getProductUrlById, ProductCategory } from '@/features/products';
import { CATALOG_URL, getCategoryUrl } from '@/lib/routes';
export { WHATSAPP_NUMBER, WHATSAPP_URL, WHATSAPP_DISPLAY, CONTACT_EMAIL } from '@/lib/site';

export const SITE_VERSION = 'v1';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Probióticos',
    links: [
      { label: 'Kéfir de leche de vaca', href: getProductUrlById('kefir-vaca-1l') },
      { label: 'Kéfir de leche de cabra', href: getProductUrlById('kefir-cabra-1l') },
      { label: 'Kéfir con arándanos', href: getProductUrlById('kefir-arandanos') },
      { label: 'Kéfir con fresa', href: getProductUrlById('kefir-fresa') },
      { label: 'Kéfir de agua', href: getProductUrlById('kefir-agua-1l') },
      { label: 'Kombucha', href: getProductUrlById('kombucha-1l') },
    ],
  },
  {
    title: 'Tradicionales',
    links: [
      { label: 'Manteca de cerdo', href: getProductUrlById('manteca-500') },
      { label: 'Mermelada de Quito Quito', href: getProductUrlById('mermelada-quito-quito') },
      { label: 'Mermelada de fresa', href: getProductUrlById('mermelada-fresa') },
      { label: 'Sal rosada de Maras', href: getProductUrlById('sal-de-maras') },
    ],
  },
  {
    title: 'Explora',
    links: [
      { label: 'Inicio', href: '/' },
      { label: 'Todos los productos', href: CATALOG_URL },
      { label: 'Probióticos', href: getCategoryUrl(ProductCategory.PROBIOTICOS) },
      { label: 'Tradicionales', href: getCategoryUrl(ProductCategory.TRADICIONALES) },
    ],
  },
];

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/trialferi/', icon: InstagramIcon },
  { label: 'TikTok', href: 'https://www.tiktok.com/@trialferi', icon: TiktokIcon },
];
