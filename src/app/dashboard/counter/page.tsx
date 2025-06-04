import { Metadata } from 'next';
import { Counter } from './components/Counter';

export const metadata: Metadata = {
  title: 'CounterPage - SN',
  description: 'Esta página es donde se mostrará el contador.',
};

export default function CounterPage() {
  return (
    <>
      <span>Página del contador</span>

      {/*  <div className='relative mt-3 aspect-[70/45] w-1/2 max-w-[600px]'>
        <Image
          alt='Plaza Mayor'
          className='h-auto w-full rounded-lg object-cover'
          fill
          sizes='(min-width:600px) 100vw, 360px'
          src='https://images.unsplash.com/photo-1592602228110-2a482b293e42'
        />
      </div> */}

      <div className='mt-3 flex items-center'>
        <Counter />
      </div>
    </>
  );
}
