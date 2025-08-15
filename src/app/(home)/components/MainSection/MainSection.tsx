import { mainCollection, ProductCard } from '@/features/products';
import { CategoryCard } from './components/CategoryCard';
import {
  ProductCardAction,
  ProductCardCategory,
  ProductCardDescription,
  ProductCardImage,
  ProductCardPresentations,
  ProductCardTitle,
} from '@/features/products/components/ProductCard';
import { CardContent, CardFooter } from '@/components/ui/Card/card';

export const MainSection = () => {
  return (
    <section className='container-max grid w-full px-6 py-12 tablet:gap-4 tablet:px-10 lg:grid-cols-[1fr_.9fr] lg:px-18 lg:py-12'>
      <div className='grid gap-6 tablet:gap-4 lg:grid-rows-[repeat(2,minmax(min-content,240px))]'>
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
      <div className='grid gap-4 tablet:grid-cols-2'>
        {mainCollection.map((product) => {
          return (
            <ProductCard key={product.id}>
              <ProductCardImage src={product.thumbnailImage} alt={product.title} size={'large'} />

              <CardContent className='mb-3 flex flex-grow flex-col pt-3'>
                <ProductCardCategory category={product.category} />
                <ProductCardTitle className='text-[18px]' title={product.title} />

                <ProductCardDescription description='Esta es una descripción para poder llenar el card del producto.' />

                <div>
                  <ProductCardPresentations presentations={product?.presentations} />
                </div>
              </CardContent>

              <CardFooter>
                <ProductCardAction href={product.linkUrl} />
              </CardFooter>
            </ProductCard>
          );
        })}
      </div>
    </section>
  );
};
