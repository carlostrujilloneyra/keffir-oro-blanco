import Image from 'next/image';
import { Button } from '@/components/shared/Button/Button';

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
    <div className='relative grid h-full grid-cols-1 gap-3 lg:w-full lg:grid-cols-2'>
      <div className='flex flex-col justify-center gap-3'>
        <h1 className='font-bold uppercase leading-[1.4] text-white md:text-5xl lg:text-[54px]'>{title}</h1>
        <p className='justify-center text-[#C6C6C6] md:text-[17px] lg:w-3/4'>{description}</p>

        <div className='lg:mt-3'>
          <Button className='rounded uppercase' theme='secondary' />
        </div>
      </div>

      <Image width={400} height={400} src={image} alt={imageAlt} />
    </div>
  );
};
