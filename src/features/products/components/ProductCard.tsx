'use client';

import React from 'react';
import { Card, CardHeader } from '@/components/ui/Card/card';
import { Button } from '@/components/ui/Button/Button';
import { Badge } from '@/components/ui/Badge/badge';
import { type Product } from '../types/product.type';
import { categoryDetails, ProductCategory } from '../data/categories';
import Image from 'next/image';
import Link from 'next/link';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/formatPrice';
import { getProductUrl } from '@/lib/getProductUrl';
import { CircleCheck, MoveRight } from 'lucide-react';

// --- Definiciones de los Tipos para los Props ---

type ProductCardRootProps = {
  children: React.ReactNode;
  className?: string;
};

// La imagen ocupa todo el ancho de la tarjeta sobre un panel papel-hueso.
// El prop `size` se conserva por compatibilidad de API (no altera dimensiones).
const imageVariants = cva('relative aspect-square w-full overflow-hidden rounded-sm bg-papel-hueso', {
  variants: {
    size: {
      default: '',
      large: '',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const imageSizesPropVariants = {
  default: '(min-width: 768px) 260px, 45vw',
  large: '(min-width: 1024px) 340px, 90vw',
};
export interface ProductCardImageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof imageVariants> {
  src: string;
  alt: string;
}

interface ProductCardCategoryProps {
  category: ProductCategory;
}

interface ProductCardTitleProps {
  title: string;
  className?: string;
}

type ProductCardPresentationsProps = {
  presentations: Product['presentations'];
  className?: string;
};

interface ProductCardDescriptionProps {
  description?: string[];
}

interface ProductCardFeatureListProps {
  features?: React.ReactNode[];
  className?: string;
}

interface ProductCardActionProps {
  slug: string;
  hasIcon?: boolean;
}

// Máximo de beneficios visibles en la tarjeta; el resto vive en la ficha de detalle.
const MAX_CARD_FEATURES = 3;

// --- Definiciones de los Subcomponentes (con tipos explícitos) ---

const ProductCard = ({ children, className }: ProductCardRootProps) => (
  <Card
    className={cn(
      'group h-full w-full gap-3 p-3 transition-[transform,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-tinta/25',
      className,
    )}
  >
    {children}
  </Card>
);

const ProductCardImage = ({ className, size, src, alt, ...props }: ProductCardImageProps) => {
  const sizeKey = size || 'default';

  return (
    <CardHeader className='p-0'>
      <div className={cn(imageVariants({ size }), className)} {...props}>
        <Image className='object-contain p-4' fill sizes={imageSizesPropVariants[sizeKey]} src={src} alt={alt} />
      </div>
    </CardHeader>
  );
};

const ProductCardCategory = ({ category }: ProductCardCategoryProps) => {
  return (
    <p className='font-sans text-eyebrow uppercase text-tinta-suave'>
      {categoryDetails[category]?.title || 'Categoría'}
    </p>
  );
};

const ProductCardTitle = ({ title, className }: ProductCardTitleProps) => {
  return <h3 className={cn('font-display text-xl leading-tight text-tinta tablet:text-[22px]', className)}>{title}</h3>;
};

const ProductCardFeatureList = ({ features, className }: ProductCardFeatureListProps) => {
  if (!features || features.length === 0) return null;

  return (
    <ul className={cn('space-y-1.5 text-sm leading-snug text-tinta-media', className)}>
      {features.slice(0, MAX_CARD_FEATURES).map((feature, idx) => (
        <li className='flex items-start gap-2' key={idx}>
          <CircleCheck className='mt-0.5 h-4 w-4 shrink-0 text-verde' />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
};

const ProductCardPresentations = ({ className, presentations }: ProductCardPresentationsProps) => {
  if (!presentations || presentations.length === 0) {
    return null;
  }
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {presentations.map((variant) => (
        <Badge key={variant.id} variant='neutral'>
          {variant.name}
        </Badge>
      ))}
    </div>
  );
};

const ProductCardDescription = ({ description }: ProductCardDescriptionProps) => {
  if (!description) return null;

  return <p className='mt-1 text-sm leading-snug text-tinta-media'>{description}</p>;
};

const ProductCardPrice = ({
  price,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { price: number }) => {
  return (
    <span className={cn('font-display text-xl text-tinta', className)} {...props}>
      S/ {formatPrice(price)}
    </span>
  );
};

const ProductCardAction = ({ slug, hasIcon }: ProductCardActionProps) => (
  <Button className='w-full' asChild variant='primary'>
    <Link href={getProductUrl(slug)}>
      Ver más
      {hasIcon && (
        <MoveRight className='h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1' />
      )}
    </Link>
  </Button>
);

export {
  ProductCard,
  ProductCardImage,
  ProductCardCategory,
  ProductCardTitle,
  ProductCardPresentations,
  ProductCardDescription,
  ProductCardFeatureList,
  ProductCardPrice,
  ProductCardAction,
};
