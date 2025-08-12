import { NewProducts } from '../NewProducts/NewProducts';

export const MainContent = () => {
  return (
    <main className='container-max flex w-full flex-col gap-8 overflow-hidden px-6 py-4 tablet:px-10 tablet:py-9 lg:px-18 lg:py-12'>
      <div className='lg:max-w-2xl'>
        <h2 className='mb-2 text-[32px] font-semibold leading-[1.1] text-gray-800 tablet:mb-1 tablet:text-[40px] lg:text-[42px]'>
          ¡Recién Salidos del Taller!
        </h2>

        <p className='text-justify text-sm text-gray-600 tablet:text-base lg:leading-[1.3]'>
          Nuestra pasión es crear. Te presentamos nuestras últimas innovaciones en bienestar, elaboradas con los mismos
          ingredientes puros y el cuidado artesanal de siempre. Descubre nuevos sabores, nuevas texturas y nuevas formas
          de sentirte bien.
        </p>
      </div>

      <NewProducts />
    </main>
  );
};
