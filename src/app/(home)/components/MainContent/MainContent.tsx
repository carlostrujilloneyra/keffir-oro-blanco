import { NewProducts } from '../NewProducts/NewProducts';

export const MainContent = () => {
  return (
    <main className='border-1 container-max flex flex-col gap-9 p-0 py-14 tablet:px-6 lg:px-16 lg:py-20'>
      <div className='px-6 lg:max-w-3xl lg:p-0'>
        <h2 className='text-[32px] font-semibold text-gray-800 tablet:text-[40px] lg:mb-3 lg:text-[42px]'>
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
