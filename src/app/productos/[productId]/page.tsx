import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  allProducts,
  categoryDetails,
  getProductBySlug,
  getRelatedProducts,
  getSizeVariants,
  getProductBaseTitle,
  getProductImage,
  buildProductMetaDescription,
  isAttributeTag,
} from '@/features/products';
import { ProductImageGallery } from '@/features/products/components/ProductImageGallery/ProductImageGallery';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion/accordion';
import { formatPrice } from '@/lib/formatPrice';
import { buildWhatsAppUrl, CURRENCY, SITE_NAME, SITE_URL } from '@/lib/site';
import { buildBreadcrumbJsonLd } from '@/lib/jsonLd';
import { buildPageMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/JsonLd';
import { Reveal, Stagger } from '@/components/ui/Motion/Motion';
import {
  BenefitsList,
  LabelClaims,
  ProductTags,
  RelatedProducts,
  ShelfLife,
  SizeSelector,
  UsageInstructions,
} from './_components';
import { getCategoryUrl, getProductUrl } from '@/lib/routes';
import { Button } from '@/components/ui/Button/Button';
import { keepUnitsTogether } from '@/lib/keepUnitsTogether';

interface ProductPageProps {
  params: {
    productId: string;
  };
}

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.productId);

  if (!product) {
    return {
      title: 'Producto no encontrado',
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata({
    title: product.title,
    description: buildProductMetaDescription(product),
    path: getProductUrl(product.slug),
    image: product.shareImage ?? product.thumbnailImage,
  });
}

// Generar rutas estáticas en build time
export async function generateStaticParams() {
  return allProducts.map((product) => ({
    productId: product.slug,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.productId);

  if (!product) {
    notFound();
  }

  const galleryImages = [getProductImage(product), ...(product.galleryImages || [])].filter(Boolean);

  const category = categoryDetails[product.category];
  const tags = product.tags ?? [];
  const curationTags = tags.filter((tag) => !isAttributeTag(tag));
  const attributeTags = tags.filter(isAttributeTag);
  const sizeVariants = getSizeVariants(product);
  const relatedProducts = getRelatedProducts(product);

  /* Ausente = disponible, para no tener que marcar los 25 productos. */
  const isAvailable = product.available !== false;

  // Datos estructurados (schema.org Product) → resultados enriquecidos en Google.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.shortDescription,
    image: `${SITE_URL}${getProductImage(product)}`,
    brand: { '@type': 'Brand', name: SITE_NAME },
    ...(category ? { category: category.title } : {}),
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: CURRENCY,
      /*
        Antes estaba fijo en InStock: la página le afirmaba a Google que todo
        estaba siempre disponible. Ahora sigue el dato real del catálogo.
      */
      availability: isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${SITE_URL}${getProductUrl(product.slug)}`,
    },
  };

  /* Refleja las migas visibles de abajo, para que Google muestre la ruta. */
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Inicio', path: '/' },
    ...(category ? [{ name: category.title, path: getCategoryUrl(category.slug) }] : []),
    { name: product.title, path: getProductUrl(product.slug) },
  ]);

  /* Sin carrito: el pedido es por WhatsApp con el producto precargado; la talla va en su propia línea. */
  const { size } = product;
  const baseTitle = getProductBaseTitle(product);

  const orderUrl = buildWhatsAppUrl(
    [
      'Hola, quisiera pedir:',
      '',
      `*${baseTitle}*`,
      size ? `Presentación: ${size} — ${formatPrice(product.price)}` : `Precio: ${formatPrice(product.price)}`,
      'Cantidad: 1',
      '',
      '¿Me confirmas y coordinamos la entrega?',
    ].join('\n'),
  );

  const restockUrl = buildWhatsAppUrl(`Hola, ¿cuándo vuelve a haber *${baseTitle}*${size ? ` de ${size}` : ''}?`);

  const accordionTrigger = 'font-display text-base font-semibold text-tinta hover:no-underline tablet:text-lg';

  return (
    <div className='py-6 tablet:py-8 lg:py-10'>
      {/* Datos estructurados para SEO (schema.org) */}
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Migas de pan */}
      <nav aria-label='Migas de pan' className='mb-8 text-sm text-tinta-suave lg:mb-10'>
        <Link
          href={category ? getCategoryUrl(category.slug) : '/'}
          className='-ml-1 inline-flex min-h-11 items-center gap-1 pr-2 font-medium transition-colors hover:text-verde tablet:hidden'
        >
          <ChevronLeft className='h-4 w-4' />
          {category ? category.title : 'Inicio'}
        </Link>

        <div className='hidden flex-wrap items-center gap-x-2.5 gap-y-1 tablet:flex'>
          <Link href='/' className='font-medium transition-colors hover:text-verde'>
            Inicio
          </Link>

          {category && (
            <>
              <ChevronRight className='h-4 w-4 text-tinta-suave/50' />
              <Link href={getCategoryUrl(category.slug)} className='font-medium transition-colors hover:text-verde'>
                {category.title}
              </Link>
            </>
          )}
          <ChevronRight className='h-4 w-4 text-tinta-suave/50' />
          <span className='font-semibold text-tinta'>{product.title}</span>
        </div>
      </nav>

      <article className='grid gap-8 lg:grid-cols-2 lg:gap-14'>
        {/* Columna de imágenes con carrusel */}
        {/* min-w-0: sin esto el grid dimensiona la columna por el max-content
            del carrusel y se dispara el ancho (scroll horizontal en móvil). */}
        <div className='min-w-0 lg:sticky lg:top-24 lg:self-start'>
          <Reveal x={-18}>
            <ProductImageGallery images={galleryImages} productTitle={product.title} />
          </Reveal>
        </div>

        {/* Columna de información (entrada en cascada) */}
        <Stagger delay={0.1} className='flex flex-col gap-8'>
          {/* Lo esencial primero: curaduría, nombre, precio y talla. */}
          <div className='flex flex-col gap-4'>
            <ProductTags tags={curationTags} />
            <div className='flex flex-col gap-2'>
              <h1 className='font-display text-3xl font-semibold leading-[1.05] tracking-tight text-tinta lg:text-5xl'>
                {keepUnitsTogether(product.title)}
              </h1>
              <p className='font-display text-3xl font-bold tracking-tight text-tinta'>{formatPrice(product.price)}</p>
            </div>
            <SizeSelector variants={sizeVariants} currentSlug={product.slug} />
          </div>

          {/* CTA principal */}
          {/*
            El estado sigue a `available` para no contradecir al JSON-LD: si la
            página ofrece pedir, Google lee InStock; si no, OutOfStock.
          */}
          <div className='flex flex-col gap-2'>
            <Button asChild variant={isAvailable ? 'primary' : 'dark'} className='w-full py-4 text-base lg:py-4'>
              <Link href={isAvailable ? orderUrl : restockUrl} target='_blank' rel='noopener noreferrer'>
                {isAvailable ? 'Pedir por WhatsApp' : 'Avísame cuando vuelva'}
                <ArrowUpRight className='h-4 w-4' />
              </Link>
            </Button>
            <p className='text-center text-xs text-tinta-suave'>
              {isAvailable
                ? 'Coordinamos entrega y pago por WhatsApp.'
                : 'Este lote está agotado. Escríbenos y te avisamos del siguiente.'}
            </p>
          </div>

          <LabelClaims tags={attributeTags} />

          {/* Beneficios (siempre visibles) */}
          <BenefitsList benefits={product.benefits || []} />

          {/* Detalles en acordeón (descripción abierta por defecto) */}
          <Accordion type='single' collapsible defaultValue='description' className='mt-1'>
            {product.longDescription && (
              <AccordionItem value='description' className='w-full'>
                <AccordionTrigger className={accordionTrigger}>Descripción</AccordionTrigger>
                <AccordionContent>
                  <div className='flex flex-col gap-3 text-sm leading-relaxed text-tinta-media tablet:text-base'>
                    {product.longDescription}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            <UsageInstructions howToUse={product.howToUse || ''} />
            <ShelfLife shelfLife={product.shelfLife || ''} />
          </Accordion>
        </Stagger>
      </article>

      {/* Productos relacionados */}
      <Reveal inView y={24}>
        <RelatedProducts products={relatedProducts} />
      </Reveal>
    </div>
  );
}
