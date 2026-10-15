import { StaggerList } from '@/components/ui/Motion/Motion';
import type { ProductGroup } from '../data/collections';
import type { Product } from '../types/product.type';
import { ProductShowcaseCard } from './ProductShowcaseCard';

type Props = { products: Product[]; groups?: never } | { groups: ProductGroup[]; products?: never };

/* Con `products`, una tarjeta por talla; con `groups`, una por producto con su precio "Desde". */
export const ProductGrid = ({ products, groups }: Props) => {
  const cards = groups
    ? groups.map(({ product, fromPrice, sizes }) => ({
        product,
        fromPrice: sizes > 1 ? fromPrice : undefined,
        hideSize: sizes > 1,
      }))
    : products.map((product) => ({ product, fromPrice: undefined, hideSize: false }));

  return (
    <StaggerList className='grid grid-cols-2 gap-4 tablet:gap-5 md:grid-cols-3 lg:grid-cols-4' itemClassName='h-full'>
      {cards.map(({ product, fromPrice, hideSize }) => (
        <ProductShowcaseCard key={product.id} product={product} fromPrice={fromPrice} hideSize={hideSize} />
      ))}
    </StaggerList>
  );
};
