import { CategoryCard } from './components/CategoryCard';

export const MainSection = () => {
  return (
    <section className='container-max grid w-full px-6 py-12 tablet:px-10 lg:grid-cols-[1fr_0.8fr] lg:gap-3 lg:px-18 lg:py-12'>
      <div className='grid gap-6 lg:grid-rows-[repeat(2,minmax(min-content,270px))]'>
        <CategoryCard
          name='lacteos-section'
          title='Del campo a tu mesa: lácteos frescos y artesanales'
          linkUrl='/categorias/lacteos'
          imageSrc='/assets/images/content/products/kefir-de-leche/background.webp'
          imageAlt='Productos lácteos artesanales'
        />

        <CategoryCard
          name='kefir-section'
          title='Descubre si el Kéfir es para ti'
          linkUrl='/categorias/kefir'
          imageSrc='/assets/images/categories/kefires.webp'
          imageAlt='Variedad de kéfires frutados'
        />
      </div>

      {/* Contenedor para dos cards: Mantequilla, Chucrut */}
      <div className='grid grid-rows-2 gap-3 tablet:grid-cols-2'></div>
    </section>
  );
};
