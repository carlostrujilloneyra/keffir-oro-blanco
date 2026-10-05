import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';

interface FeaturedCardProps {
  eyebrow: string;
  title: string;
  linkUrl: string;
  imageSrc: string;
  imageAlt: string;
  ctaLabel: string;
}

export const FeaturedCard = ({ eyebrow, title, linkUrl, imageSrc, imageAlt, ctaLabel }: FeaturedCardProps) => (
  <Link
    href={linkUrl}
    className='ease-[cubic-bezier(0.32,0.72,0,1)] group flex h-full flex-col gap-2 overflow-hidden rounded-card bg-papel-hueso p-3 transition-all duration-500 hover:-translate-y-1 tablet:min-h-[340px] tablet:flex-row tablet:items-stretch'
  >
    <div className='flex flex-1 flex-col justify-center gap-4 p-5 lg:p-8'>
      <span className='text-sm font-medium text-tinta-suave'>{eyebrow}</span>

      <h3 className='font-display text-3xl font-semibold leading-[1.05] tracking-tight text-tinta lg:text-4xl xl:text-5xl'>
        {title}
      </h3>

      {/* Solo visual: el enlace es la card entera. */}
      <Button asChild className='mt-2'>
        <span>{ctaLabel}</span>
      </Button>
    </div>

    <div className='relative order-first h-60 w-full shrink-0 overflow-hidden rounded-[8px] bg-gradient-to-br from-verde/20 via-verde/10 to-transparent tablet:order-none tablet:h-auto tablet:w-[46%]'>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes='(min-width: 1024px) 320px, (min-width: 600px) 45vw, 90vw'
        className='ease-[cubic-bezier(0.32,0.72,0,1)] object-contain p-3 transition-transform duration-500 group-hover:scale-105 tablet:p-6'
      />
    </div>
  </Link>
);
