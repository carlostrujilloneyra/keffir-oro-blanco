import { ProductCategory } from './categories';
import { getProductById } from './collections';
import type { Product } from '../types/product.type';

export interface Pack {
  id: string;
  category: ProductCategory;
  title: string;
  description: string;
  /* Productos que incluye, por id: el texto "Incluye…" se arma con sus títulos reales. */
  productIds: string[];
  price: number;
  /* Precio de los productos por separado, para mostrar el ahorro. Opcional. */
  regularPrice?: number;
  image: string;
  /* true = solo se ve en local (npm run dev), nunca en producción. Pasar a false al tener datos reales. */
  draft: boolean;
}

/* TODO(Carlos): reemplazar textos, precios e imagen por los reales y poner draft: false. */
const packs: Pack[] = [
  {
    id: 'pack-bienestar',
    category: ProductCategory.PROBIOTICOS,
    title: 'Pack Bienestar Probiótico',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
    productIds: ['kefir-vaca-1l', 'kefir-fresa', 'kefir-agua-1l'],
    price: 0,
    image: '/assets/images/categories/kefires.png',
    draft: true,
  },
];

const isVisible = (pack: Pack) => !pack.draft || process.env.NODE_ENV !== 'production';

/* Pack visible de una categoría (o undefined): los borradores no salen en producción. */
export const getCategoryPack = (category: ProductCategory): Pack | undefined =>
  packs.find((pack) => pack.category === category && isVisible(pack));

export const getPackProducts = (pack: Pack): Product[] => pack.productIds.map(getProductById);
