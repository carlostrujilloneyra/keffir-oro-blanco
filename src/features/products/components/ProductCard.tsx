'use client';

import React from 'react'; // React es necesario para React.ReactNode
import { Card, CardHeader, CardTitle } from '@/components/ui/Card/card';
import { Button } from '@/components/ui/Button/Button';
import { Badge } from '@/components/ui/Badge/badge';
import { type Product } from '../types/product.type';
import { categoryDetails, ProductCategory } from '../data/categories';
import Image from 'next/image';
import Link from 'next/link';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// --- Definiciones de los Tipos para los Props ---

type ProductCardRootProps = {
  children: React.ReactNode;
  className?: string;
};

const imageVariants = cva(
  'relative aspect-square overflow-hidden rounded-md', // Clases base que se aplican siempre
  {
    variants: {
      size: {
        default: 'h-[160px] w-[160px] tablet:h-[190px] tablet:w-[190px]',
        large: 'h-[160px] w-[160px] tablet:h-[270px] tablet:w-[270px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

const imageSizesPropVariants = {
  default: '(min-width: 768px) 190px, 160px',
  large: '(min-width: 768px) 270px, 160px',
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
};

interface ProductCardDescriptionProps {
  description?: string;
}

interface ProductCardActionProps {
  href: string;
}

// --- Definiciones de los Subcomponentes (con tipos explícitos) ---

const ProductCard = ({ children, className }: ProductCardRootProps) => (
  <Card className={`flex h-full w-full flex-col gap-2 px-3 py-4 tablet:gap-3 ${className || ''}`}>{children}</Card>
);

const ProductCardImage = ({ className, size, src, alt, ...props }: ProductCardImageProps) => {
  // Aseguramos que 'sizeKey' siempre tenga un valor válido para el objeto de 'sizes'
  const sizeKey = size || 'default';

  return (
    <CardHeader className='flex items-center justify-center p-0'>
      <div className={cn(imageVariants({ size }), className)} {...props}>
        <Image className='object-contain' fill sizes={imageSizesPropVariants[sizeKey]} src={src} alt={alt} priority />
      </div>
    </CardHeader>
  );
};

const ProductCardCategory = ({ category }: ProductCardCategoryProps) => {
  return (
    <p className='mb-1 text-xs font-bold uppercase tracking-wide text-gray-500 tablet:text-sm'>
      {categoryDetails[category]?.title || 'Categoría'}
    </p>
  );
};

const ProductCardTitle = ({ title, className }: ProductCardTitleProps) => {
  return (
    <CardTitle asChild className={className}>
      <span className='inline-block min-h-8 leading-[1.2] tablet:min-h-14 tablet:leading-[1]'>{title}</span>
    </CardTitle>
  );
};

const ProductCardPresentations = ({ presentations }: ProductCardPresentationsProps) => {
  if (!presentations || presentations.length === 0) {
    return null;
  }
  return (
    <div className='mt-2 flex flex-wrap gap-2'>
      {presentations.map((variant) => (
        <Badge key={variant.id} variant='stone'>
          {variant.name}
        </Badge>
      ))}
    </div>
  );
};

const ProductCardDescription = ({ description }: ProductCardDescriptionProps) => {
  if (!description) {
    return null;
  }
  return <p className='text-sm leading-tight text-gray-600'>{description}</p>;
};

const ProductCardAction = ({ href }: ProductCardActionProps) => (
  <Button className='flex w-full justify-center gap-2 px-8 py-3 text-center uppercase' asChild theme='primary'>
    <Link href={href}>Ver Producto</Link>
  </Button>
);

export {
  ProductCard,
  ProductCardImage,
  ProductCardCategory,
  ProductCardTitle,
  ProductCardPresentations,
  ProductCardDescription,
  ProductCardAction,
};
