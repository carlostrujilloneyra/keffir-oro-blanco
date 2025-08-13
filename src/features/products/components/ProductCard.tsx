'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card/card';
import Image from 'next/image';
import { Button } from '@/components/ui/Button/Button';
import Link from 'next/link';

export const ProductCard = () => {
  return (
    <Card className='max-w-60 p-3'>
      <CardHeader className=''>
        <div className='relative aspect-video h-[180px] w-full tablet:h-[220px]'>
          <Image
            className='object-contain'
            fill
            sizes='(min-width: 600px) 220px, 180px'
            src={'/aua'}
            alt='aua de imagen'
          />
        </div>
      </CardHeader>

      <CardContent className='mt-6'>
        <p className='text-xs font-semibold uppercase tracking-wide tablet:text-sm'>Tradicionales</p>

        <CardTitle asChild>
          <h3 className='text-sm font-normal'>Sal de Maras, Cusco</h3>
        </CardTitle>

        {/* Para precios (a futuro) */}
      </CardContent>

      <CardFooter>
        <Button className='flex items-center gap-2 px-5 py-4 uppercase lg:px-6' asChild theme='primary'>
          <Link href={''}>Ver Producto</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
