import { NewProducts } from './components/NewProducts';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';

/* Gradiente de marca (black-infused) con un glow verde suave arriba-izquierda. */
const SECTION_BG =
  'radial-gradient(90% 110% at 0% 0%, rgba(47,125,82,0.28), rgba(22,32,26,0) 55%),' +
  'radial-gradient(80% 100% at 100% 100%, rgba(242,183,5,0.10), rgba(22,32,26,0) 60%),' +
  '#16201A';

export const NewProductsSection = () => {
  return (
    <section aria-labelledby='novedades-titulo' className='w-full px-4 py-section tablet:px-10 lg:px-18'>
      <div
        className='container-max flex flex-col gap-8 overflow-hidden rounded-[28px] px-6 py-10 tablet:px-10 tablet:py-12 lg:px-16 lg:py-16'
        style={{ background: SECTION_BG }}
      >
        <div className='flex flex-col gap-3 lg:max-w-2xl'>
          <Eyebrow tone='miel' className='text-xs tracking-[0.18em] text-miel'>
            Novedades
          </Eyebrow>

          <h2
            id='novedades-titulo'
            className='font-display text-4xl font-semibold leading-[1.05] tracking-tight text-papel lg:text-5xl'
          >
            ¡Recién salidos del taller!
          </h2>

          <p className='max-w-2xl text-[15px] leading-relaxed text-papel/70 tablet:text-base lg:text-justify'>
            Nuestra pasión es crear. Te presentamos nuestras últimas innovaciones en bienestar, elaboradas con los
            mismos ingredientes puros y el cuidado artesanal de siempre. Descubre nuevos sabores, nuevas texturas y
            nuevas formas de sentirte bien.
          </p>
        </div>

        <NewProducts />
      </div>
    </section>
  );
};
