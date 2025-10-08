import { promotedCollection, ProductCard } from '@/features/products';
import { CategoryCard } from './components/CategoryCard';
import {
  ProductCardAction,
  ProductCardCategory,
  ProductCardFeatureList,
  ProductCardImage,
  ProductCardPresentations,
  ProductCardTitle,
} from '@/features/products/components/ProductCard';
import { CardContent, CardFooter } from '@/components/ui/Card/card';

export const MainSection = () => {
  return (
    <main className='container-max grid w-full gap-5 px-6 py-8 tablet:gap-6 tablet:p-10 lg:grid-cols-[1fr_.9fr] lg:p-18'>
      <div className='grid gap-5 tablet:gap-6 min-[1400px]:grid-rows-[repeat(2,minmax(min-content,270px))]'>
        <CategoryCard
          name='lacteos-section'
          title='Descubre si el Kéfir es para ti'
          linkUrl='/categorias/lacteos'
          imageSrc='/assets/images/content/products/kefir-de-leche/section-background.webp'
          imageAlt='Productos lácteos artesanales'
        />

        <CategoryCard
          name='manteca-section'
          title='Sabor y tradición: Manteca de Cerdo Artesanal'
          linkUrl='/categorias/kefir'
          imageSrc='/assets/images/content/products/manteca-de-cerdo/section-background.webp'
          imageAlt='Variedad de kéfires frutados'
        />
      </div>

      {/* Contenedor para dos cards: Crema de kéfir, Chucrut */}
      <div className='grid gap-5 tablet:grid-cols-2 tablet:gap-6'>
        {promotedCollection.map((product) => {
          return (
            <ProductCard key={product.id}>
              <ProductCardImage src={product.thumbnailImage} alt={product.title} size={'large'} />

              <CardContent className='mb-3 flex flex-grow flex-col pt-3'>
                <ProductCardCategory category={product.category} />

                <ProductCardTitle className='text-[22px] lg:leading-[1]' title={product.title} />

                <ProductCardFeatureList features={product.benefits} />

                <div className='mt-2 flex flex-col gap-1'>
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
    </main>
  );
};
