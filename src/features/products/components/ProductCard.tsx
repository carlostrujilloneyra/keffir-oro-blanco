import { Button } from '@/components/ui/Button/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card/card';
import Image from 'next/image';
import Link from 'next/link';

export const ProductCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className='relative aspect-video w-full'>
          <Image src={'aua'} alt='aua de imagen' fill className='object-contain' />
        </div>
      </CardHeader>

      <CardContent>
        {/* Categoría del producto */}
        <p>Categoría</p>
        <CardTitle asChild>Sal de Maras, Cusco</CardTitle>
        {/* Para precios (a futuro) */}
      </CardContent>

      <CardFooter>
        <Button asChild theme='primary'>
          <Link href={''}>Ver Producto</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
