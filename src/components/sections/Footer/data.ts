import { InstagramIcon, TiktokIcon } from '@/components/ui/icons';
import { ProductCategory } from '@/features/products';
import { CATALOG_URL, FAQ_URL, getCategoryUrl } from '@/lib/routes';

export interface FooterLink {
  label: string;
  href: string;
}

/* Solo lo esencial: el detalle de productos ya está en el menú del header. */
export const FOOTER_LINKS: FooterLink[] = [
  { label: 'Catálogo', href: CATALOG_URL },
  { label: 'Probióticos', href: getCategoryUrl(ProductCategory.PROBIOTICOS) },
  { label: 'Tradicionales', href: getCategoryUrl(ProductCategory.TRADICIONALES) },
  { label: 'Preguntas frecuentes', href: FAQ_URL },
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
