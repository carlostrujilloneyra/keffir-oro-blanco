import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge/badge';
import { Button } from '@/components/ui/Button/Button';
import { formatPrice } from '@/lib/formatPrice';
import { buildWhatsAppUrl } from '@/lib/site';
import { getPackProducts, type Pack } from '../data/packs';

interface PackCardProps {
  pack: Pack;
  /* Cierra el menú contenedor al elegir el pack. */
  onSelect?: () => void;
}

export const PackCard = ({ pack, onSelect }: PackCardProps) => {
  const products = getPackProducts(pack);

  return (
    <article className='flex h-full flex-col gap-4 rounded-card bg-papel-hueso p-5'>
      <div className='flex items-center justify-between gap-2'>
        <Badge variant='category'>Pack</Badge>
        {pack.draft && <Badge variant='alert'>Borrador · solo en local</Badge>}
      </div>

      <div className='relative aspect-[4/3] overflow-hidden rounded-[8px] bg-gradient-to-br from-verde/20 via-verde/10 to-transparent'>
        <Image src={pack.image} alt={pack.title} fill sizes='280px' className='object-contain p-3' />
      </div>

      <div className='flex flex-col gap-1.5'>
        <h3 className='font-display text-lg font-semibold leading-tight tracking-tight text-tinta'>{pack.title}</h3>
        <p className='text-sm leading-snug text-tinta-media'>{pack.description}</p>
      </div>

      <div className='text-sm text-tinta-media'>
        <p className='font-semibold text-tinta'>Incluye</p>
        <ul className='mt-1 flex flex-col gap-0.5'>
          {products.map((product) => (
            <li key={product.id}>— {product.title}</li>
          ))}
        </ul>
      </div>

      <div className='mt-auto flex flex-col gap-3'>
        <p className='flex items-baseline gap-2'>
          <span className='font-display text-2xl font-semibold text-tinta'>S/ {formatPrice(pack.price)}</span>
          {pack.regularPrice && (
            <span className='text-sm text-tinta-suave line-through'>S/ {formatPrice(pack.regularPrice)}</span>
          )}
        </p>

        <Button asChild className='w-full'>
          <Link
            href={buildWhatsAppUrl(`Hola, quiero pedir el ${pack.title}.`)}
            target='_blank'
            rel='noopener noreferrer'
            onClick={onSelect}
          >
            Pedir el pack
            <ArrowUpRight className='h-4 w-4' />
          </Link>
        </Button>
      </div>
    </article>
  );
};
