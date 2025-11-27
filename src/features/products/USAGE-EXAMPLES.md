# Ejemplos de Uso - Sistema de Productos

## 1. Enlazar a un producto usando ProductLink

```tsx
import { ProductLink } from '@/features/products/components/ProductLink';

export function MyComponent() {
  return <ProductLink slug='sal-rosada-de-maras-cusco'>Ver Sal de Maras</ProductLink>;
}
```

## 2. Usar ProductCardAction con slug

```tsx
import { ProductCardAction } from '@/features/products/components/ProductCard';

export function ProductCard() {
  return (
    <div>
      {/* Contenido del card */}
      <ProductCardAction slug='kefir-de-leche-de-vaca-1-lt' hasIcon />
    </div>
  );
}
```

## 3. Generar URL manualmente

```tsx
import { getProductUrl } from '@/lib/getProductUrl';
import Link from 'next/link';

export function CustomLink() {
  const productUrl = getProductUrl('vinagre-de-manzana');

  return <Link href={productUrl}>Ver Vinagre de Manzana</Link>;
}
```

## 4. Mostrar lista de productos con enlaces

```tsx
import { allProducts } from '@/features/products/data/products';
import { ProductLink } from '@/features/products/components/ProductLink';

export function ProductList() {
  return (
    <ul>
      {allProducts.map((product) => (
        <li key={product.id}>
          <ProductLink slug={product.slug}>{product.title}</ProductLink>
        </li>
      ))}
    </ul>
  );
}
```

## 5. Buscar producto por slug

```tsx
import { allProducts } from '@/features/products/data/products';

export function findProductBySlug(slug: string) {
  return allProducts.find((product) => product.slug === slug);
}

// Uso
const product = findProductBySlug('kefir-de-agua');
if (product) {
  console.log(product.title); // "Kéfir de Agua"
}
```

## 6. Tarjeta de producto completa

```tsx
import {
  ProductCard,
  ProductCardImage,
  ProductCardCategory,
  ProductCardTitle,
  ProductCardPrice,
  ProductCardPresentations,
  ProductCardAction,
} from '@/features/products/components/ProductCard';

export function MyProductCard({ product }) {
  return (
    <ProductCard>
      <ProductCardImage src={product.featuredImage} alt={product.title} size='large' />
      <ProductCardCategory category={product.category} />
      <ProductCardTitle title={product.title} />
      <ProductCardPrice price={product.price} />
      <ProductCardPresentations presentations={product.presentations} />
      <ProductCardAction slug={product.slug} hasIcon />
    </ProductCard>
  );
}
```

## Rutas Generadas Automáticamente

Todas estas rutas se generan automáticamente en build time:

- `/products/sal-rosada-de-maras-cusco`
- `/products/manteca-de-cerdo-artesanal`
- `/products/vinagre-de-manzana`
- `/products/kefir-de-leche-de-vaca-1-lt`
- `/products/kefir-de-leche-de-vaca-475ml`
- `/products/kefir-de-leche-de-cabra-1-lt`
- `/products/kefir-de-leche-de-vaca-con-arandanos-475ml`
- `/products/kefir-de-leche-de-vaca-con-fresa-475ml`
- `/products/kefir-de-leche-de-vaca-con-aguaymanto-475ml`
- `/products/kefir-de-leche-de-vaca-con-chocolate`
- `/products/kefir-de-agua`
- `/products/chucrut-morado-fermentado`
- `/products/crema-de-kefir-con-aceitunas`
