import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { CATALOG_URL } from '@/lib/routes';

export default function ProductNotFound() {
  return (
    <div className='container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center'>
      <h1 className='mb-4 text-4xl font-bold text-gray-900'>Producto no encontrado</h1>
      <p className='mb-8 text-lg text-gray-600'>Lo sentimos, el producto que buscas no existe o ha sido eliminado.</p>
      <div className='flex gap-4'>
        <Button asChild>
          <Link href={CATALOG_URL}>Ver todos los productos</Link>
        </Button>
        <Button asChild variant='dark'>
          <Link href='/'>Volver al inicio</Link>
        </Button>
      </div>
    </div>
  );
}
