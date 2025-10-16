import { NewProducts } from './components/NewProducts';

export const NewProductsSection = () => {
  return (
    <section className='container-max flex w-full flex-col gap-8 overflow-hidden bg-gradient-to-r from-black via-[#2d2d2d] to-[#282626] px-6 pb-0 pt-8 tablet:px-10 tablet:pb-1 tablet:pt-12 lg:w-[calc(100%-120px)] lg:rounded-2xl lg:px-16 lg:pb-6 lg:pt-16 super_desktop:w-[calc(100%-135px)]'>
      <div className='lg:mb-2 lg:max-w-2xl'>
        <h2 className='mb-3 text-[34px] font-semibold leading-[1.1] text-light-100 tablet:text-[40px] lg:text-[42px]'>
          ¡Recién Salidos del Taller!
        </h2>

        <p className='text-justify text-[15px] text-light-300 tablet:text-base lg:leading-[1.3]'>
          Nuestra pasión es crear. Te presentamos nuestras últimas innovaciones en bienestar, elaboradas con los mismos
          ingredientes puros y el cuidado artesanal de siempre. Descubre nuevos sabores, nuevas texturas y nuevas formas
          de sentirte bien.
        </p>
      </div>

      <NewProducts />
    </section>
  );
};
