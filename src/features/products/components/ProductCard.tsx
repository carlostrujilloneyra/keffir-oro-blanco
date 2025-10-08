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
import { CircleCheck, MoveRight } from 'lucide-react';

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
        default: 'h-[180px] w-[180px] tablet:h-[220px] tablet:w-[220px]',
        large: 'h-[240px] w-[240px] tablet:h-[270px] tablet:w-[270px] min-[1400px]:h-[260px]',
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
  className?: string;
};

interface ProductCardDescriptionProps {
  description?: string[];
}

interface ProductCardFeatureListProps {
  features?: string[];
  className?: string;
}

interface ProductCardActionProps {
  href: string;
  hasIcon?: boolean;
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
      <h3 className='inline-block leading-[1.22] text-gray-700 tablet:leading-[1]'>{title}</h3>
    </CardTitle>
  );
};

const ProductCardFeatureList = ({ features, className }: ProductCardFeatureListProps) => {
  if (!features) return null;

  return (
    <ul className={cn('my-2 space-y-2 text-[13.5px] text-gray-600', className)}>
      {features.map((feature, idx) => (
        <li className='flex items-center gap-2 leading-[1.2]' key={idx}>
          <div>
            <CircleCheck className='h-4 w-4' />
          </div>
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
    <div className={cn('mt-2 flex flex-wrap gap-2', className)}>
      {presentations.map((variant) => (
        <Badge key={variant.id} variant='stone'>
          {variant.name}
        </Badge>
      ))}
    </div>
  );
};

const ProductCardDescription = ({ description }: ProductCardDescriptionProps) => {
  if (!description) return null;

  return <p className='mt-1 text-justify text-sm leading-tight text-gray-600'>{description}</p>;
};

const ProductCardAction = ({ href, hasIcon }: ProductCardActionProps) => (
  <Button
    className='flex w-full items-center justify-center gap-2 px-6 py-3 text-center uppercase'
    asChild
    theme='primary'
  >
    <Link href={href}>
      Ver más
      {hasIcon && <MoveRight className='h-5 w-5' />}
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
  ProductCardAction,
};
