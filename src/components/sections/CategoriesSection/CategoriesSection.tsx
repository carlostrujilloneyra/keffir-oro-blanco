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
    tabTitle: 'Probióticos',
    value: 'probioticos',
    title: 'Probióticos: Fermentación Natural y Vida',
    description:
      'Bebidas y alimentos elaborados mediante fermentación natural, como kéfir de leche de <strong>vaca y cabra</strong>, kéfir frutado y otros fermentos artesanales. Procesos vivos y tradicionales que aportan sabores únicos y una experiencia auténtica.',
    href: '/categorias/probioticos',
    image: {
      src: '/assets/images/categories/kefires.png',
      alt: 'Imagen de categoría de probióticos',
    },
  },
  {
    tabTitle: 'Tradicionales',
    value: 'tradicionales',
    title: 'Tradicionales: Saberes Ancestrales',
    description:
      'Productos elaborados siguiendo métodos tradicionales, como <strong>manteca de cerdo artesanal</strong>, mermelada de quito quito y otras preparaciones caseras. Recetas simples que respetan ingredientes y procesos originales.',
    href: '/categorias/tradicionales',
    image: {
      src: '/assets/images/categories/manteca-de-cerdo.webp',
      alt: 'Imagen de categoría de productos tradicionales',
    },
  },
];

const CategoryContent = ({ title, description, href, image }: CategoryContentProps) => {
  return (
    <div className='relative grid h-full w-full grid-rows-[320px_1fr] gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-black via-[#2d2d2d] to-[#181717] px-6 py-8 text-xl text-white tablet:gap-6 tablet:px-10 lg:grid-cols-2 lg:grid-rows-1 lg:px-20 lg:py-10'>
      <div className='flex flex-col justify-center gap-5'>
        <h2 className='text-[28px] font-semibold tablet:text-4xl xl:text-[34px]'>{title}</h2>

        <p className='text-justify text-base lg:w-10/12' dangerouslySetInnerHTML={{ __html: description }} />

        <Button
          asChild
          className='max-w-[200px] bg-white px-5 py-4 !text-sm font-bold uppercase text-black tablet:px-6'
          theme='primary'
        >
          <Link href={href}>Ver categoría</Link>
        </Button>
      </div>

      {/* Imagen */}
      <div className='relative flex w-full items-center justify-center tablet:justify-end'>
        <Image
          className='rounded-lg lg:object-cover'
          fill
          sizes='(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 400px, 400px'
          src={image.src}
          alt={image.alt}
        />
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
    <section className='container-max relative h-[780px] w-full tablet:h-[860px] lg:h-[800px] lg:p-18'>
      <Tabs tabs={tabs} />
    </section>
  );
};
