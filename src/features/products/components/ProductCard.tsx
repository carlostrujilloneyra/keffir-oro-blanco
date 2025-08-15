'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card/card';
import { Button } from '@/components/ui/Button/Button';
import { Badge } from '@/components/ui/Badge/badge';
import { Product } from '../types/product.type';
import { categoryDetails } from '../data/categories';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { thumbnailImage, title, category, linkUrl, presentations } = product;

  return (
    <Card className='h-full w-full gap-2 px-3 py-4 tablet:gap-3'>
      <CardHeader className='flex items-center justify-center p-0'>
        <div className='relative aspect-square h-[160px] w-[160px] overflow-hidden rounded-md tablet:h-[190px] tablet:w-[190px]'>
          <Image
            className='object-contain'
            fill
            /* placeholder='blur'
            blurDataURL={thumbnailImage} */
            sizes='(min-width: 600px) 190px, 160px'
            src={thumbnailImage}
            alt={title}
            priority
          />
        </div>
      </CardHeader>

      <CardContent className='mb-3 flex flex-grow flex-col pt-3'>
        <p className='mb-1 text-xs font-bold uppercase tracking-wide text-gray-500 tablet:text-sm'>
          {categoryDetails[category].title}
        </p>

        <CardTitle asChild>
          <span className='inline-block min-h-8 text-[15px] font-normal leading-[1.2] text-gray-700 tablet:min-h-12 tablet:text-base tablet:leading-[1]'>
            {title}
          </span>
        </CardTitle>

        {/* Presentaciones, variaciones */}
        {presentations && presentations.length > 0 && (
          <div className='flex-grow'>
            <div className='flex flex-wrap gap-2'>
              {presentations.map((variant) => (
                <Badge key={variant.id} variant='stone'>
                  {variant.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className='mt-auto justify-center'>
        <Button className='flex w-full justify-center gap-2 px-8 py-3 text-center uppercase' asChild theme='primary'>
          <Link href={linkUrl}>Ver Producto</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
