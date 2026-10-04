import { InstagramIcon, TiktokIcon } from '@/components/ui/icons';
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
      { label: 'Kéfir de leche de vaca', href: '/products/kefir-leche-vaca-1lt' },
      { label: 'Kéfir de leche de cabra', href: '/products/kefir-leche-cabra-1lt' },
      { label: 'Kéfir con arándanos', href: '/products/kefir-pulpa-arandanos-475ml' },
      { label: 'Kéfir con fresa', href: '/products/kefir-pulpa-fresa-475ml' },
      { label: 'Kéfir de agua', href: '/products/kefir-agua-1lt' },
      { label: 'Kombucha', href: '/products/kombucha-natural-1lt' },
    ],
  },
  {
    title: 'Tradicionales',
    links: [
      { label: 'Manteca de cerdo', href: '/products/manteca-de-cerdo-500ml' },
      { label: 'Mermelada de Quito Quito', href: '/products/mermelada-quito-quito-200g' },
      { label: 'Mermelada de fresa', href: '/products/mermelada-fresa-200g' },
      { label: 'Sal rosada de Maras', href: '/products/sal-de-maras' },
    ],
  },
  {
    title: 'Explora',
    links: [
      { label: 'Inicio', href: '/' },
      { label: 'Todos los productos', href: '/products' },
      { label: 'Probióticos', href: '/categorias/probioticos' },
      { label: 'Tradicionales', href: '/categorias/tradicionales' },
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
