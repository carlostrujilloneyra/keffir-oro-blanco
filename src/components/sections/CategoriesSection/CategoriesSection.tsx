import React from 'react';
import { Tabs } from '../../ui/Tabs/tabs';

interface Tabs {
  title: string;
  value: string;
  content: React.ReactNode;
}

const tabs: Tabs[] = [
  {
    title: 'Kéfir',
    value: 'kefir',
    content: (
      <div className='relative h-[500px] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl'>
        <p>Random tab</p>
      </div>
    ),
  },

  {
    title: 'Lácteos Artesanales',
    value: 'lacteos-artesanales',
    content: (
      <div className='relative h-[500px] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl'>
        <p>Random tab 2</p>
      </div>
    ),
  },

  {
    title: 'Fermentos',
    value: 'fermentos',
    content: (
      <div className='relative h-[500px] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl'>
        <p>Random tab 3</p>
      </div>
    ),
  },

  {
    title: 'Otros',
    value: 'otros',
    content: (
      <div className='relative h-[500px] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl'>
        <p>Random tab 4</p>
      </div>
    ),
  },
];

export const CategoriesSection = () => {
  return (
    <section className='container-max relative w-full overflow-hidden lg:h-[720px] lg:p-18'>
      <Tabs tabs={tabs} />
    </section>
  );
};
