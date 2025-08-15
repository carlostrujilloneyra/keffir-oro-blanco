// src/features/products/components/ProductCardSkeleton.tsx

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card/card';
import { Skeleton } from '@/components/ui/Skeleton/skeleton';

export const ProductCardSkeleton = () => {
  return (
    <Card className='h-full w-full gap-2 px-3 py-4 tablet:gap-3'>
      {/* 2. El header y el div de la imagen son idénticos en estructura y tamaño. */}
      <CardHeader className='flex items-center justify-center p-0'>
        <div className='relative aspect-square h-[160px] w-[160px] tablet:h-[190px] tablet:w-[190px]'>
          {/* El Skeleton ahora ocupa el 100% de este div, igual que la imagen. */}
          <Skeleton className='h-full w-full rounded-md' />
        </div>
      </CardHeader>

      <CardContent className='mb-3 flex flex-grow flex-col pt-3'>
        {/* Esqueleto para la categoría */}
        <Skeleton className='mb-1 h-4 w-2/3' />

        {/* Esqueleto para el título, con su altura mínima */}
        <div className='min-h-[2.5em] space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-4/5' />
        </div>

        {/* Esqueleto para los badges */}
        <div className='flex-grow'>
          <div className='mt-4 flex flex-wrap gap-2'>
            <Skeleton className='h-6 w-12 rounded-full' />
            <Skeleton className='h-6 w-16 rounded-full' />
          </div>
        </div>
      </CardContent>

      <CardFooter className='mt-auto justify-center'>
        {/* Esqueleto para el botón */}
        <Skeleton className='h-10 w-full rounded-lg' />
      </CardFooter>
    </Card>
  );
};
