import React from 'react';
import { Tabs } from '../../ui/Tabs/tabs';
import Image from 'next/image';
import { Button } from '@/components/ui/Button/Button';
import Link from 'next/link';

interface TabConfig {
  title: string;
  value: string;
  content: React.ReactNode;
}

interface CategoryContentProps {
  title: string;
  description: string;
  href: string;
  image: {
    src: string;
    alt: string;
  };
}

const categoryData: (CategoryContentProps & { tabTitle: string; value: string })[] = [
  {
    tabTitle: 'Lácteos artesanales',
    value: 'lacteos-artesanales',
    title: 'Lácteos artesanales: Enfoque en Frescura y Bienestar',
    description:
      'Redescubre la frescura y cremosidad de los lácteos hechos como antes. Cada producto es una muestra de tradición y cuidado, directo a tu mesa.',
    href: 'aua',
    image: {
      src: '/assets/images/categories/lacteos.webp',
      alt: 'Imagen de categoría de lácteos',
    },
  },
];

const CategoryContent = ({ title, description, href, image }: CategoryContentProps) => {
  return (
    <div className='relative grid h-[600px] w-full overflow-hidden rounded-2xl bg-gradient-to-r from-black via-[#2d2d2d] to-[#181717] text-xl text-white tablet:grid-cols-2 lg:gap-9 lg:px-20 lg:py-10'>
      <div className='flex flex-col justify-center gap-5'>
        <h2 className='text-[28px] font-semibold tablet:text-4xl xl:text-[34px]'>{title}</h2>

        <p className='text-justify text-base lg:w-10/12'>{description}</p>

        <Button
          asChild
          className='mt-3 max-w-[200px] bg-white px-5 py-4 !text-sm font-bold uppercase text-black tablet:px-6'
          theme='primary'
        >
          <Link href={href}>Ver categoría</Link>
        </Button>
      </div>

      {/* Imagen */}
      <div className='flex items-center justify-end'>
        <Image className='h-[500px] w-[400px] rounded-lg' width={400} height={400} src={image.src} alt={image.alt} />
      </div>
    </div>
  );
};

const tabs: TabConfig[] = categoryData.map((category) => ({
  title: category.tabTitle,
  value: category.value,
  content: <CategoryContent {...category} />,
}));

export const CategoriesSection = () => {
  return (
    <section className='container-max relative h-[600px] w-full overflow-hidden lg:h-[800px] lg:p-18'>
      <Tabs tabs={tabs} />
    </section>
  );
};
