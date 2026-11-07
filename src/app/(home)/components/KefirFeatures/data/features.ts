import { ProductCategory } from '@/features/products';
import { FAQ_URL, getSubcategoryUrl } from '@/lib/routes';

export type FeatureMedia =
  /* `bleed`: la foto se corta abajo (mano, muñeca) y debe salir del borde del panel. */
  | { type: 'image'; src: string; alt: string; bleed?: boolean }
  /* Tomas en public/assets/videos/features/. */
  | { type: 'video'; src: string; poster: string; alt: string };

export type Feature = {
  id: string;
  title: string;
  /* Solo lo que dicen las etiquetas, en máximo 2 líneas. */
  description: string;
  media: FeatureMedia;
  link?: { label: string; href: string };
};

const IMAGES = '/assets/images/content/products';

export const features: Feature[] = [
  {
    id: 'cultivos-vivos',
    title: 'Cultivos vivos',
    description: 'Fermentado con nódulos de kéfir, lote a lote.',
    media: { type: 'image', src: `${IMAGES}/kefir-de-leche/gallery-03.webp`, alt: 'Botella de kéfir de leche natural' },
  },
  {
    id: 'vaca-o-cabra',
    title: 'Vaca o cabra',
    description: 'Leche de vaca de establo o de cabra de libre pastoreo, tratada en ollas de acero quirúrgico.',
    media: {
      type: 'image',
      src: `${IMAGES}/kefir-de-leche-de-cabra/featured.webp`,
      alt: 'Botella de kéfir de leche de cabra',
    },
    link: { label: 'Ver kéfir natural', href: getSubcategoryUrl(ProductCategory.PROBIOTICOS, 'kefir-natural') },
  },
  {
    id: 'pulpa-de-fruta',
    title: 'Pulpa de fruta real',
    description: 'Fresa, arándanos y frutos del bosque, sin conservantes añadidos.',
    media: {
      type: 'image',
      src: `${IMAGES}/kefir-con-fresa/gallery-05.webp`,
      alt: 'Mano sosteniendo un kéfir de fresa',
    },
    link: { label: 'Ver kéfires frutados', href: getSubcategoryUrl(ProductCategory.PROBIOTICOS, 'kefir-frutado') },
  },
  {
    id: 'stevia',
    title: 'Endulzado con stevia',
    description: 'Los frutados, con stevia. Los naturales, con 0% azúcar añadida.',
    media: {
      type: 'image',
      src: `${IMAGES}/kefir-con-arandanos/gallery-04.webp`,
      alt: 'Dos botellas de kéfir de arándanos',
    },
  },
  {
    id: 'como-tomarlo',
    title: 'Cómo tomarlo',
    description: 'Empieza con 30 ml al día y mantenlo refrigerado.',
    media: {
      type: 'image',
      src: `${IMAGES}/kefir-con-frutos-del-bosque/gallery-05.webp`,
      alt: 'Mano sosteniendo un kéfir de frutos del bosque',
      bleed: true,
    },
    link: { label: 'Conoce el kéfir', href: FAQ_URL },
  },
];
