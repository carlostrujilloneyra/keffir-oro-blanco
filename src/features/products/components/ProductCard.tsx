'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { Badge } from '@/components/ui/Badge/badge';

export const ProductCard = () => {
  return (
    <Card className='max-w-60 gap-2 px-3 py-4 tablet:gap-3'>
      <CardHeader className='relative aspect-video h-[180px] w-[180px] tablet:h-[220px] tablet:w-[220px]'>
        <Image
          className='object-contain'
          fill
          sizes='(min-width: 600px) 220px, 180px'
          src={'/assets/images/content/products/sal-de-maras/thumbnail.webp'}
          alt='aua de imagen'
        />
      </CardHeader>

      <CardContent className='tablet:mb-1'>
        <p className='text-xs font-bold uppercase tracking-wide text-gray-500 tablet:text-sm'>Tradicionales</p>

        <CardTitle asChild>
          <span className='text-[15px] font-normal text-gray-700 tablet:text-base'>Sal de Maras, Cusco</span>
        </CardTitle>

        {/* Presentaciones, variaciones */}
        <div></div>
      </CardContent>

      <CardFooter className='justify-center'>
        <Button className='flex w-full justify-center gap-2 px-8 py-3 text-center uppercase' asChild theme='primary'>
          <Link href={''}>Ver Producto</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
