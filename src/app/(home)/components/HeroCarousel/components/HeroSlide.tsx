import Image from 'next/image';
import { Button } from '@/components/ui/Button/Button';
import Link from 'next/link';

export interface HeroSlideProps {
  description: string;
  image: string;
  isNew?: boolean;
  slug: string;
  title: string;
}

export const HeroSlide = ({ description, image, isNew, slug, title }: HeroSlideProps) => {
  const imageAlt = `Imagen de ${title}`;

  return (
    <div className='relative grid h-full grid-cols-1 grid-rows-[1fr_380px] gap-7 lg:w-full lg:grid-cols-2 lg:grid-rows-[minmax(450px,1fr)]'>
      <div className='flex flex-col justify-center gap-[10px] px-6 py-3 tablet:gap-3 tablet:py-10 tablet:text-center lg:p-18 lg:text-start'>
        {isNew && <span className='text-xs uppercase text-[#8C8C8C]'>Nuevo producto</span>}

        <h1 className='text-4xl font-bold uppercase leading-[1.2] text-white tablet:text-[42px] lg:text-[54px] lg:leading-[1.1]'>
          {title}
        </h1>

        <p className='text-justify text-sm text-light-500 tablet:text-center tablet:text-base lg:w-[85%] lg:text-justify'>
          {description}
        </p>

        <div className='mt-3 tablet:mt-4'>
          <Button asChild className='rounded uppercase' theme='secondary'>
            <Link href={'aua'}>Más información</Link>
          </Button>
        </div>
      </div>

      <div className='relative flex items-center justify-center'>
        <Image sizes='(min-width: 768px) 688px, 360px' className='object-contain' src={image} fill alt={imageAlt} />
      </div>
    </div>
  );
};
