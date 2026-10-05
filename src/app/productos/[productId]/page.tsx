import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { allProducts } from '@/features/products/data/products';
import { categoryDetails, getRelatedProducts, getSizeVariants } from '@/features/products';
import { buildProductMetaDescription } from '@/features/products/lib/productSeo';
import { ProductImageGallery } from '@/features/products/components/ProductImageGallery/ProductImageGallery';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion/accordion';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/formatPrice';
import { buildWhatsAppUrl, CURRENCY, SITE_NAME, SITE_URL } from '@/lib/site';
import { buildBreadcrumbJsonLd } from '@/lib/jsonLd';
import { JsonLd } from '@/components/JsonLd';
import {
  BenefitsList,
  ProductTags,
  RelatedProducts,
  Reveal,
  ShelfLife,
  SizeSelector,
  Stagger,
  TrustRow,
  UsageInstructions,
} from './_components';
import { getCategoryUrl, getProductUrl } from '@/lib/routes';

interface ProductPageProps {
  params: {
    productId: string;
  };
}

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = allProducts.find((product) => product.slug === params.productId);

  if (!product) {
    return {
      title: 'Producto no encontrado',
      robots: { index: false, follow: false },
    };
  }

  const shareImage = product.shareImage ?? product.thumbnailImage;

  return {
    title: product.title,
    description: buildProductMetaDescription(product),
    alternates: { canonical: getProductUrl(product.slug) },
    openGraph: {
      title: product.title,
      description: product.shortDescription,
      images: [shareImage],
    },
    twitter: {
      card: 'summary_large_image',
      images: [shareImage],
    },
  };
}

// Generar rutas estáticas en build time
export async function generateStaticParams() {
  return allProducts.map((product) => ({
    productId: product.slug,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = allProducts.find((p) => p.slug === params.productId);

  if (!product) {
    notFound();
  }

  const galleryImages = [product.featuredImage || product.thumbnailImage, ...(product.galleryImages || [])].filter(
    Boolean,
  );

  const category = categoryDetails[product.category];
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
    image: `${SITE_URL}${product.featuredImage || product.thumbnailImage}`,
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

  /*
    CTA principal: sin carrito, el pedido es por WhatsApp con el producto
    precargado. El title ya termina en la talla ("... natural 1 L"), así que se
    recorta para no repetirla en la línea de Presentación.
  */
  const presentacion = product.size;
  const nombreBase =
    presentacion && product.title.endsWith(presentacion)
      ? product.title.slice(0, -presentacion.length).trim()
      : product.title;

  const waUrl = buildWhatsAppUrl(
    [
      'Hola, quisiera pedir:',
      '',
      `*${nombreBase}*`,
      presentacion
        ? `Presentación: ${presentacion} — S/ ${formatPrice(product.price)}`
        : `Precio: S/ ${formatPrice(product.price)}`,
      'Cantidad: 1',
      '',
      '¿Me confirmas y coordinamos la entrega?',
    ].join('\n'),
  );

  const consultaStockUrl = buildWhatsAppUrl(
    `Hola, ¿cuándo vuelve a haber *${nombreBase}*${presentacion ? ` de ${presentacion}` : ''}?`,
  );

  const accordionTrigger = 'font-display text-base font-semibold text-tinta hover:no-underline tablet:text-lg';

  return (
    <div className='py-6 tablet:py-8 lg:py-10'>
      {/* Datos estructurados para SEO (schema.org) */}
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Migas de pan */}
      <nav
        aria-label='Migas de pan'
        className='mb-8 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-tinta-suave lg:mb-10'
      >
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
        <Stagger delay={0.1} className='flex flex-col gap-6'>
          {/* Categoría + badges */}
          <div className='flex flex-col gap-4'>
            {category && <Eyebrow>{category.title}</Eyebrow>}
            <ProductTags isNew={product.isNew} tags={product.tags} />
          </div>

          {/* Título + precio */}
          <div className='flex flex-col gap-3'>
            <h1 className='font-display text-3xl font-semibold leading-[1.05] tracking-tight text-tinta lg:text-5xl'>
              {product.title}
            </h1>
            <p className='font-display text-3xl font-bold tracking-tight text-tinta'>S/ {formatPrice(product.price)}</p>
          </div>

          {/* Selector de talla */}
          <SizeSelector variants={sizeVariants} currentSlug={product.slug} />

          {/* CTA principal */}
          {/*
            El estado sigue a `available` para no contradecir al JSON-LD: si la
            página ofrece pedir, Google lee InStock; si no, OutOfStock.
          */}
          <div className='flex flex-col gap-2'>
            <Link
              href={isAvailable ? waUrl : consultaStockUrl}
              target='_blank'
              rel='noopener noreferrer'
              className={cn(
                'inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-200 active:scale-[0.99]',
                isAvailable
                  ? 'bg-gradient-verde text-papel hover:brightness-110'
                  : 'border border-papel-sombra bg-papel-hueso text-tinta hover:bg-papel-sombra/40',
              )}
            >
              {isAvailable ? 'Pedir por WhatsApp' : 'Avísame cuando vuelva'}
              <ArrowUpRight className='h-4 w-4' />
            </Link>
            <p className='text-center text-xs text-tinta-suave'>
              {isAvailable
                ? 'Coordinamos entrega y pago por WhatsApp.'
                : 'Este lote está agotado. Escríbenos y te avisamos del siguiente.'}
            </p>
          </div>

          {/* Fila de confianza */}
          <TrustRow />

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
