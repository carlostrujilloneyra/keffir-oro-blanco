import Image from 'next/image';
import rawCategories from './data/categories.json';
import { ArrowIcon } from '@/components/ui/icons';

interface CategoryProps {
  name: string;
  image: string;
  slug: string;
}

export const Categories = () => {
  const categories: CategoryProps[] = rawCategories;

  return (
    <div className='container-max w-full px-6 pb-10 pt-16 tablet:px-8 lg:p-20'>
      <h2 className='mb-6 text-center text-3xl font-medium text-gray-800 tablet:text-4xl lg:text-[42px]'>Categorías</h2>

      <div className='grid grid-rows-4 justify-center gap-8 tablet:grid-cols-[repeat(2,minmax(min-content,200px))] tablet:grid-rows-2 tablet:gap-12 tablet:p-5 lg:grid-cols-[repeat(4,minmax(min-content,240px))] lg:grid-rows-1 lg:gap-5 2xl:grid-cols-[repeat(4,minmax(min-content,270px))]'>
        {categories.map(({ name, image }, index) => {
          return (
            <div key={index} className='border-1 flex cursor-pointer flex-col items-center gap-[10px]'>
              <div className='lg:mb-2'>
                <Image
                  className='h-[180px] w-[150px] -translate-y-2 object-contain transition-transform duration-300 hover:scale-[1.2]'
                  width={150}
                  height={180}
                  src={image}
                  alt={`Imagen de categoría - ${name}`}
                />
              </div>

              <h3 className='text-center font-semibold uppercase lg:text-[18px]'>{name}</h3>

              <button className='duration-400 flex items-center gap-[6px] text-center text-[13px] font-bold uppercase tracking-[1px] text-[#797979] transition-all hover:text-[#f55947]'>
                Ver más
                <ArrowIcon className='h-5 w-5 text-[#f55947]' />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
