import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { CATALOG_URL } from '@/lib/routes';
import { WHATSAPP_URL } from '@/lib/site';

interface NotFoundProps {
  title: string;
  description: string;
}

/* Contenido compartido por las páginas 404 (general y de producto). */
export const NotFound = ({ title, description }: NotFoundProps) => (
  <section className='flex min-h-[60vh] w-full flex-col items-center justify-center gap-5 py-16 text-center'>
    <Eyebrow>Error 404</Eyebrow>

    <h1 className='font-display text-4xl font-semibold leading-[1.05] tracking-tight text-tinta lg:text-5xl'>
      {title}
    </h1>
    <p className='max-w-md text-tinta-media'>{description}</p>

    <div className='mt-2 flex flex-wrap justify-center gap-3'>
      <Button asChild>
        <Link href={CATALOG_URL}>Ver el catálogo</Link>
      </Button>
      <Button asChild variant='dark'>
        <Link href='/'>Volver al inicio</Link>
      </Button>
    </div>

    <p className='text-sm text-tinta-suave'>
      ¿Buscabas algo en particular?{' '}
      <Link
        href={WHATSAPP_URL}
        target='_blank'
        rel='noopener noreferrer'
        className='font-semibold text-tinta underline decoration-tinta/30 underline-offset-4 hover:decoration-tinta'
      >
        Escríbenos por WhatsApp
      </Link>
    </p>
  </section>
);
