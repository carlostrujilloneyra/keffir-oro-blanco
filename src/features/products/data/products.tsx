import { Product } from '../types/product.type';
import { ProductCategory } from './categories';

const compactSize = (size: string) =>
  size
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/^(\d+)l$/, '$1lt'); // 1 L → 1lt (475 ml y 200 g quedan igual)

const make = (product: Omit<Product, 'slug'>): Product => ({
  ...product,
  slug: product.size ? `${product.name}-${compactSize(product.size)}` : product.name,
});

const vacaNatural = {
  shortDescription: 'El clásico probiótico, cremoso y lleno de beneficios.',
  longDescription: (
    <>
      <p>
        Bebida fermentada, cremosa y de sabor suave, elaborada con leche fresca de <strong>vaca de establo</strong>.
        Gracias a su proceso de fermentación natural, contiene cultivos vivos propios del <strong>kéfir</strong>, que le
        aportan su textura característica y un sabor ligeramente ácido.
      </p>
      <p>
        Es una opción ideal para quienes buscan incorporar alimentos fermentados de manera habitual en su alimentación
        diaria.
      </p>
    </>
  ),
  galleryImages: [
    '/assets/images/content/products/kefir-de-leche/gallery-01.webp',
    '/assets/images/content/products/kefir-de-leche/gallery-02.webp',
    '/assets/images/content/products/kefir-de-leche/gallery-03.webp',
    '/assets/images/content/products/kefir-de-leche/gallery-04.webp',
  ],
  benefits: [
    'Refuerza la **flora intestinal** con bacterias buenas.',
    'Mantiene tu sistema digestivo **saludable** y apoya el tránsito intestinal.',
    'Apoya tu **sistema inmunológico** naturalmente.',
    'Producto 100% natural, sin conservantes ni aditivos.',
    'Apto para personas con **intolerancia a la lactosa**, ya que el kéfir tiene un % bajo de lactosa.',
  ],
  howToUse: (
    <>
      <p>Listo para consumir. Puede tomarse solo o acompañar frutas, cereales y otras preparaciones frías.</p>
      <p>
        Para personas que lo consumen por <strong>primera vez</strong>, se sugiere iniciar con porciones pequeñas{' '}
        <strong>(shots de 30 ml)</strong> e incrementar gradualmente según tolerancia.
      </p>
    </>
  ),
  shelfLife: '21 días',
};

const cabraNatural = {
  shortDescription: 'Nutritivo, suave y más fácil de digerir.',
  longDescription: (
    <>
      <p>
        Bebida fermentada elaborada con leche de cabra de <strong>libre pastoreo</strong>, de sabor característico y
        ligeramente ácido. Gracias a su proceso de fermentación natural, contiene cultivos vivos propios del kéfir y se
        presenta como una alternativa al kéfir de leche de vaca.
      </p>
      <p>
        La leche de cabra contiene principalmente <strong>caseína A2</strong> y, al tratarse de un producto fermentado,
        es preferida por personas que buscan opciones con <strong>menor contenido de lactosa</strong>, así como sabores
        y texturas diferentes.
      </p>
    </>
  ),
  benefits: [
    'Aporta **cultivos vivos** propios del kéfir.',
    'Producto fermentado de sabor característico y textura ligera.',
    'Elaborado con **leche de cabra**, una alternativa al kéfir de leche de vaca.',
    'Producto 100% natural, sin conservantes ni aditivos.',
    'Durante la fermentación, el contenido de **lactosa se reduce de forma natural**.',
  ],
  howToUse: (
    <>
      <p>
        Listo para consumir. Puede tomarse solo o acompañar{' '}
        <strong>frutas, cereales y otras preparaciones frías</strong>. Para quienes lo consumen por primera vez, se
        sugiere iniciar con <strong>shots de 30 ml</strong> e incrementar gradualmente según tolerancia.
      </p>
      <p>
        En niños a partir de los 2 años, puede incorporarse en pequeñas cantidades (por ejemplo, 5 cucharaditas) como
        parte de su alimentación habitual.
      </p>
    </>
  ),
  shelfLife: '21 días',
};

const aguaKefir = {
  shortDescription: 'La bebida probiótica refrescante, vegana y naturalmente burbujeante.',
  longDescription: (
    <>
      <p>
        Descubre la alternativa <strong>vegana y sin lácteos</strong> al kéfir tradicional. Nuestro Kéfir de Agua es una
        bebida <strong>viva, fermentada y deliciosamente refrescante</strong>, elaborada mediante fermentación natural
        con tibicos (gránulos de kéfir de agua).
      </p>
      <p>
        Llena de millones de probióticos que ayudan a equilibrar tu flora intestinal y a potenciar tu energía. Con su{' '}
        <strong>efervescencia natural</strong> y sabor suave, es una alternativa saludable a las gaseosas comerciales.
      </p>
    </>
  ),
  benefits: [
    '**100% vegano**, sin lácteos, ideal para dietas plant-based.',
    'Refuerza la **flora intestinal** con probióticos naturales.',
    '**Naturalmente burbujeante**, alternativa saludable a las gaseosas.',
    'Bajo en calorías y **sin azúcares añadidos**.',
    'Producto 100% natural, sin conservantes ni aditivos artificiales.',
  ],
  howToUse: (
    <>
      <p>
        Listo para consumir. Disfrútalo <strong>bien frío</strong> en cualquier momento del día. Agita suavemente antes
        de servir para distribuir los probióticos.
      </p>
      <p>
        Para quienes lo consumen por <strong>primera vez</strong>, se sugiere iniciar con porciones pequeñas y aumentar
        gradualmente según tolerancia.
      </p>
    </>
  ),
  shelfLife: '30 días',
};

const kombuchaNatural = {
  shortDescription: 'Té fermentado, burbujeante y lleno de probióticos.',
  longDescription: (
    <>
      <p>
        Bebida ancestral fermentada a base de <strong>té y cultivos vivos</strong> (SCOBY). Refrescante, ligeramente
        ácida y naturalmente burbujeante, la kombucha es una fuente natural de probióticos que acompañan tu digestión.
      </p>
      <p>Sin lácteos y con una efervescencia suave, es una alternativa viva y saludable a las bebidas azucaradas.</p>
    </>
  ),
  benefits: [
    'Fuente natural de **probióticos** que cuidan tu digestión.',
    '**Naturalmente burbujeante**, sin gas añadido.',
    '**Sin lácteos**, apta para dietas veganas.',
    'Producto 100% natural, sin conservantes ni aditivos artificiales.',
    'Refrescante y **ligera**, ideal para acompañar tus comidas.',
  ],
  howToUse: (
    <>
      <p>
        Listo para consumir. Disfrútala <strong>bien fría</strong>. Agita suavemente antes de servir para distribuir los
        cultivos.
      </p>
      <p>Para quienes la prueban por primera vez, se sugiere empezar con porciones pequeñas.</p>
    </>
  ),
  shelfLife: '30 días',
};

const mantecaCerdo = {
  shortDescription: 'El secreto de la cocina tradicional para un sabor inigualable.',
  longDescription: (
    <>
      <p>
        Vuelve al origen del sabor con nuestra <strong>Manteca de Cerdo 100% natural y artesanal</strong>. Elaborada de
        forma tradicional, sin aditivos ni conservantes, rescatando el auténtico sabor de la cocina de nuestras abuelas.
      </p>
      <p>
        Ideal para freír, hornear o dar un toque de sabor auténtico a tus guisos. Es una{' '}
        <strong>alternativa saludable a los aceites procesados</strong>: rica en grasas estables al calor y con un punto
        de humo alto, perfecta para cocinar a altas temperaturas sin oxidarse.
      </p>
    </>
  ),
  galleryImages: [
    '/assets/images/content/products/manteca-de-cerdo/gallery-02.webp',
    '/assets/images/content/products/manteca-de-cerdo/gallery-03.webp',
    '/assets/images/content/products/manteca-de-cerdo/gallery-04.webp',
    '/assets/images/content/products/manteca-de-cerdo/gallery-05.webp',
  ],
  benefits: [
    '**100% natural y artesanal**, elaborada de forma tradicional sin aditivos.',
    'Rica en **grasas estables al calor**, ideal para freír a altas temperaturas.',
    '**Alternativa saludable** a los aceites vegetales procesados e hidrogenados.',
    'Aporta **sabor auténtico** y textura inigualable a tus preparaciones.',
    'Alto punto de humo, **no se oxida** fácilmente durante la cocción.',
  ],
  howToUse: (
    <>
      <p>
        Perfecta para <strong>freír, hornear, saltear y cocinar</strong> todo tipo de alimentos. Úsala en lugar de
        aceites vegetales para mejores resultados y un sabor más auténtico.
      </p>
      <p>
        <strong>Conservación:</strong> mantener en lugar fresco y seco. Puede refrigerarse para mayor duración.
      </p>
    </>
  ),
  shelfLife: '1 año',
};

const mermeladaHowToUse = (
  <>
    <p>
      Perfecta para <strong>untar en pan y tostadas</strong>, acompañar yogur o kéfir, y darle un toque dulce a tus
      desayunos y meriendas.
    </p>
    <p>
      <strong>Conservación:</strong> mantener refrigerada una vez abierta y consumir dentro de las semanas siguientes.
    </p>
  </>
);

/* ── Catálogo ───────────────────────────────────────────────────────────── */

export const allProducts: Product[] = [
  /* ── Probióticos · Kéfir de leche de vaca (grupo de tallas) ──────────── */
  make({
    id: 'kefir-vaca-1l',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-leche-vaca',
    title: 'Kéfir de leche de vaca natural 1 L',
    size: '1 L',
    price: 24.0,
    tags: ['probiotic', 'best-seller'],
    featuredImage: '/assets/images/content/products/kefir-de-leche/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-leche/featured.webp',
    ...vacaNatural,
  }),
  make({
    id: 'kefir-vaca-475',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-leche-vaca',
    title: 'Kéfir de leche de vaca natural 475 ml',
    size: '475 ml',
    price: 14.0,
    tags: ['probiotic', 'lactose-free'],
    featuredImage: '/assets/images/content/products/kefir-de-leche-475ml/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-leche-475ml/featured.webp',
    ...vacaNatural,
  }),
  make({
    id: 'kefir-vaca-250',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-leche-vaca',
    title: 'Kéfir de leche de vaca natural 250 ml',
    size: '250 ml',
    price: 8.9,
    tags: ['probiotic'],
    featuredImage: '/assets/images/content/products/kefir-de-leche-250ml/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-leche-250ml/featured.webp',
    ...vacaNatural,
  }),

  /* ── Probióticos · Kéfir de leche de cabra (grupo de tallas) ─────────── */
  make({
    id: 'kefir-cabra-1l',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-leche-cabra',
    title: 'Kéfir de leche de cabra natural 1 L',
    size: '1 L',
    price: 25.0,
    tags: ['probiotic', 'lactose-free', 'best-seller'],
    featuredImage: '/assets/images/content/products/kefir-de-leche-de-cabra/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-leche-de-cabra/featured.webp',
    ...cabraNatural,
  }),
  make({
    id: 'kefir-cabra-475',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-leche-cabra',
    title: 'Kéfir de leche de cabra natural 475 ml',
    size: '475 ml',
    price: 15.0,
    tags: ['probiotic', 'lactose-free'],
    featuredImage: '/assets/images/content/products/kefir-de-leche-de-cabra/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-leche-de-cabra/featured.webp',
    ...cabraNatural,
  }),
  make({
    id: 'kefir-cabra-250',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-leche-cabra',
    title: 'Kéfir de leche de cabra natural 250 ml',
    size: '250 ml',
    price: 9.9,
    tags: ['probiotic'],
    featuredImage: '/assets/images/content/products/kefir-de-leche-de-cabra/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-leche-de-cabra/featured.webp',
    ...cabraNatural,
  }),

  /* ── Probióticos · Kéfires frutados (475 ml, talla única) ────────────── */
  make({
    id: 'kefir-fresa',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-pulpa-fresa',
    title: 'Kéfir de leche de vaca con pulpa de fresa 475 ml',
    size: '475 ml',
    price: 17.0,
    tags: ['best-seller', 'recommended', 'sugar-free', 'probiotic'],
    featuredImage: '/assets/images/content/products/kefir-con-fresa/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-con-fresa/featured.webp',
    shortDescription: 'El sabor clásico que cuida de ti, con pulpa de fresa natural.',
    longDescription: (
      <>
        <p>
          Fusionamos la cremosidad de nuestro kéfir de leche con la dulzura natural de la{' '}
          <strong>pulpa de fresa</strong>. Un balance perfecto entre sabor y bienestar.
        </p>
        <p>
          Cada sorbo aporta <strong>probióticos y vitamina C</strong> que cuidan tu digestión, fortalecen tus defensas y
          te llenan de energía.
        </p>
      </>
    ),
    benefits: [
      'Refuerza la **flora intestinal** con bacterias buenas.',
      'Apoya tu **sistema inmunológico** naturalmente.',
      'Rico en **vitamina C** gracias a la fresa natural.',
      'Producto 100% natural, sin conservantes ni aditivos.',
    ],
    howToUse: vacaNatural.howToUse,
    shelfLife: '19 días',
  }),
  make({
    id: 'kefir-arandanos',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-pulpa-arandanos',
    title: 'Kéfir de leche de vaca con pulpa de arándanos 475 ml',
    size: '475 ml',
    price: 17.9,
    tags: ['best-seller', 'recommended', 'sugar-free'],
    featuredImage: '/assets/images/content/products/kefir-con-arandanos/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-con-arandanos/featured.webp',
    shortDescription: 'Un impulso de antioxidantes y probióticos.',
    galleryImages: [
      '/assets/images/content/products/kefir-con-arandanos/gallery-01.webp',
      '/assets/images/content/products/kefir-con-arandanos/gallery-02.webp',
      '/assets/images/content/products/kefir-con-arandanos/gallery-03.webp',
      '/assets/images/content/products/kefir-con-arandanos/gallery-04.webp',
      '/assets/images/content/products/kefir-con-arandanos/gallery-05.webp',
      '/assets/images/content/products/kefir-con-arandanos/gallery-06.webp',
    ],
    longDescription: (
      <>
        <p>
          La combinación perfecta de nuestro cremoso kéfir de leche con <strong>pulpa de arándanos</strong>.
        </p>
        <p>
          Cada sorbo es una explosión de sabor cargada de antioxidantes y probióticos que fortalecen tu sistema inmune y
          cuidan tu digestión.
        </p>
      </>
    ),
    benefits: [
      'Refuerza la **flora intestinal** con bacterias buenas.',
      'Apoya tu **sistema inmunológico** naturalmente.',
      'Rico en **antioxidantes** gracias a los arándanos.',
      'Producto 100% natural, sin conservantes ni aditivos.',
    ],
    howToUse: vacaNatural.howToUse,
    shelfLife: '19 días',
  }),
  make({
    id: 'kefir-aguaymanto',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-aguaymanto',
    title: 'Kéfir de leche de vaca con aguaymanto 475 ml',
    size: '475 ml',
    price: 17.0,
    tags: ['recommended', 'sugar-free', 'probiotic'],
    featuredImage: '/assets/images/content/products/kefir-con-aguaymanto/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-con-aguaymanto/featured.webp',
    shortDescription: 'Un tesoro andino lleno de vitaminas y probióticos.',
    longDescription: (
      <>
        <p>
          La cremosidad del kéfir de leche con el sabor natural del <strong>aguaymanto</strong>.
        </p>
        <p>
          Una experiencia andina cargada de <strong>probióticos, vitamina A y antioxidantes</strong> que fortalecen tu
          sistema inmune y cuidan tu digestión.
        </p>
      </>
    ),
    benefits: [
      'Refuerza la **flora intestinal** con bacterias buenas.',
      'Apoya tu **sistema inmunológico** naturalmente.',
      'Rico en **vitamina A y antioxidantes** gracias al aguaymanto.',
      'Producto 100% natural, sin conservantes ni aditivos.',
    ],
    howToUse: vacaNatural.howToUse,
    shelfLife: '19 días',
  }),
  make({
    id: 'kefir-frutos-bosque',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-frutos-bosque',
    title: 'Kéfir de leche de vaca con frutos del bosque 475 ml',
    size: '475 ml',
    price: 18.5,
    isNew: true,
    tags: ['new', 'probiotic', 'sugar-free'],
    // TODO: imagen real (placeholder: arándanos).
    featuredImage: '/assets/images/content/products/kefir-con-arandanos/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-con-arandanos/featured.webp',
    shortDescription: 'Nuestra novedad: la mezcla de frutos del bosque, cremosa y probiótica.',
    longDescription: (
      <>
        <p>
          Nuestra nueva propuesta: la cremosidad del kéfir de leche con una mezcla de <strong>frutos del bosque</strong>
          .
        </p>
        <p>
          Sabor intenso y natural, cargado de <strong>antioxidantes y probióticos</strong> que cuidan tu digestión y tus
          defensas.
        </p>
      </>
    ),
    benefits: [
      'Refuerza la **flora intestinal** con bacterias buenas.',
      'Apoya tu **sistema inmunológico** naturalmente.',
      'Rico en **antioxidantes** de los frutos del bosque.',
      'Producto 100% natural, sin conservantes ni aditivos.',
    ],
    howToUse: vacaNatural.howToUse,
    shelfLife: '19 días',
  }),
  make({
    id: 'kefir-chocolate',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-chocolate',
    title: 'Kéfir de leche de vaca con chocolate 475 ml',
    size: '475 ml',
    price: 17.9,
    tags: ['probiotic', 'recommended'],
    featuredImage: '/assets/images/content/products/kefir-de-chocolate/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-chocolate/featured.webp',
    shortDescription: 'Cremosidad probiótica con el poder del cacao artesanal.',
    longDescription: (
      <>
        <p>
          La cremosidad de nuestro kéfir de leche enriquecida con <strong>cacao 100% artesanal</strong> de los valles de
          Moyobamba y Quillabamba.
        </p>
        <p>
          Cada sorbo aporta <strong>hierro, calcio y magnesio</strong>, además de antioxidantes del cacao. Placer y
          bienestar, sin azúcares añadidos.
        </p>
      </>
    ),
    benefits: [
      'Refuerza la **flora intestinal** con bacterias buenas del kéfir.',
      'Rico en **minerales**: hierro, calcio y magnesio del cacao.',
      'Fuente de **antioxidantes** del cacao artesanal.',
      'Producto 100% natural, **sin azúcares añadidos**.',
    ],
    howToUse: vacaNatural.howToUse,
    shelfLife: '15 días',
  }),

  /* ── Probióticos · Kéfir de agua (grupo de tallas) ───────────────────── */
  make({
    id: 'kefir-agua-1l',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-agua',
    title: 'Kéfir de agua 1 L',
    size: '1 L',
    price: 19.0,
    tags: ['recommended', 'best-seller', 'vegan'],
    featuredImage: '/assets/images/content/products/kefir-de-agua/background.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-agua/background.webp',
    ...aguaKefir,
  }),
  make({
    id: 'kefir-agua-475',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-agua',
    title: 'Kéfir de agua 475 ml',
    size: '475 ml',
    price: 10.0,
    tags: ['vegan', 'probiotic'],
    featuredImage: '/assets/images/content/products/kefir-de-agua/background.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-agua/background.webp',
    ...aguaKefir,
  }),

  /* ── Probióticos · Kombucha natural (grupo de tallas) ────────────────── */
  make({
    id: 'kombucha-1l',
    category: ProductCategory.PROBIOTICOS,
    name: 'kombucha-natural',
    title: 'Kombucha natural 1 L',
    size: '1 L',
    price: 21.5,
    isNew: true,
    tags: ['new', 'vegan', 'probiotic'],
    // TODO: imagen real de kombucha (placeholder: kéfir de agua).
    featuredImage: '/assets/images/content/products/kefir-de-agua/background.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-agua/background.webp',
    ...kombuchaNatural,
  }),
  make({
    id: 'kombucha-475',
    category: ProductCategory.PROBIOTICOS,
    name: 'kombucha-natural',
    title: 'Kombucha natural 475 ml',
    size: '475 ml',
    price: 12.5,
    isNew: true,
    tags: ['new', 'vegan', 'probiotic'],
    featuredImage: '/assets/images/content/products/kefir-de-agua/background.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-agua/background.webp',
    ...kombuchaNatural,
  }),

  /* ── Tradicionales · Manteca de cerdo (grupo de tallas) ──────────────── */
  make({
    id: 'manteca-100',
    category: ProductCategory.TRADICIONALES,
    name: 'manteca-de-cerdo',
    title: 'Manteca de cerdo artesanal 100 ml',
    size: '100 ml',
    price: 8.0,
    tags: ['artisan'],
    featuredImage: '/assets/images/content/products/manteca-de-cerdo/gallery-01.webp',
    thumbnailImage: '/assets/images/content/products/manteca-de-cerdo/thumbnail.webp',
    ...mantecaCerdo,
  }),
  make({
    id: 'manteca-300',
    category: ProductCategory.TRADICIONALES,
    name: 'manteca-de-cerdo',
    title: 'Manteca de cerdo artesanal 300 ml',
    size: '300 ml',
    price: 24.0,
    tags: ['artisan'],
    featuredImage: '/assets/images/content/products/manteca-de-cerdo/gallery-01.webp',
    thumbnailImage: '/assets/images/content/products/manteca-de-cerdo/thumbnail.webp',
    ...mantecaCerdo,
  }),
  make({
    id: 'manteca-500',
    category: ProductCategory.TRADICIONALES,
    name: 'manteca-de-cerdo',
    title: 'Manteca de cerdo artesanal 500 ml',
    size: '500 ml',
    price: 32.0,
    tags: ['artisan', 'best-seller'],
    featuredImage: '/assets/images/content/products/manteca-de-cerdo/gallery-01.webp',
    thumbnailImage: '/assets/images/content/products/manteca-de-cerdo/thumbnail.webp',
    ...mantecaCerdo,
  }),
  make({
    id: 'manteca-1l',
    category: ProductCategory.TRADICIONALES,
    name: 'manteca-de-cerdo',
    title: 'Manteca de cerdo artesanal 1 L',
    size: '1 L',
    price: 60.0,
    tags: ['artisan'],
    featuredImage: '/assets/images/content/products/manteca-de-cerdo/gallery-01.webp',
    thumbnailImage: '/assets/images/content/products/manteca-de-cerdo/thumbnail.webp',
    ...mantecaCerdo,
  }),

  /* ── Tradicionales · Mermeladas (200 g, envase de vidrio, talla única) ─ */
  make({
    id: 'mermelada-fresa',
    category: ProductCategory.TRADICIONALES,
    name: 'mermelada-fresa',
    title: 'Mermelada de fresa natural 200 g',
    size: '200 g',
    price: 13.5,
    isNew: true,
    tags: ['new', 'natural'],
    // TODO: imagen real de la mermelada (placeholder temporal).
    featuredImage: '/assets/images/content/products/kefir-con-fresa/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-con-fresa/featured.webp',
    shortDescription: 'Mermelada artesanal de fresa, dulce y natural, en envase de vidrio.',
    longDescription: (
      <>
        <p>
          Mermelada artesanal de <strong>fresa</strong>, dulce y natural, sin conservantes. Elaborada en pequeños lotes
          y envasada en <strong>vidrio</strong>.
        </p>
        <p>Perfecta para acompañar tus desayunos y meriendas.</p>
      </>
    ),
    benefits: [
      'Elaborada con **fruta natural**, sin conservantes.',
      'Producto artesanal en pequeños lotes.',
      'Envase de **vidrio**, más limpio y reutilizable.',
    ],
    howToUse: mermeladaHowToUse,
    shelfLife: '6 meses',
  }),
  make({
    id: 'mermelada-quito-quito',
    category: ProductCategory.TRADICIONALES,
    name: 'mermelada-quito-quito',
    title: 'Mermelada de Quito Quito 200 g',
    size: '200 g',
    price: 13.5,
    isNew: true,
    tags: ['new', 'recommended', 'natural'],
    // TODO: imagen real de la mermelada (placeholder temporal).
    featuredImage: '/assets/images/content/products/kefir-con-aguaymanto/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-con-aguaymanto/featured.webp',
    shortDescription: 'Explosión de sabor andino con frutos de Quito Quito de Oxapampa.',
    longDescription: (
      <>
        <p>
          Mermelada artesanal elaborada con frutos de <strong>Quito Quito</strong> traídos directamente de{' '}
          <strong>Oxapampa</strong>. Dulce y suave, en envase de <strong>vidrio</strong>.
        </p>
        <p>Perfecta para convertir tu desayuno en un momento especial. 100% natural y sin conservantes.</p>
      </>
    ),
    benefits: [
      'Elaborada con **frutos de Oxapampa**, sin conservantes.',
      'Producto artesanal en pequeños lotes.',
      'Envase de **vidrio**, más limpio y reutilizable.',
    ],
    howToUse: mermeladaHowToUse,
    shelfLife: '6 meses',
  }),

  /* ── Tradicionales · Otros (sin cambios; confirmar si siguen en catálogo) */
  make({
    id: 'sal-de-maras',
    category: ProductCategory.TRADICIONALES,
    name: 'sal-de-maras',
    title: 'Sal rosada de Maras, Cusco',
    price: 19,
    isNew: true,
    tags: ['new', 'natural', 'artisan'],
    featuredImage: '/assets/images/content/products/sal-de-maras/featured.webp',
    thumbnailImage: '/assets/images/content/products/sal-de-maras/thumbnail.webp',
    shortDescription: 'Sal gourmet extraída de las salineras milenarias de Maras, Cusco.',
    longDescription: (
      <>
        <p>
          Extraída a mano en las <strong>salineras milenarias de Maras</strong>, en el Valle Sagrado de los Incas
          (Cusco), esta sal gourmet es un tesoro ancestral cosechado de la misma forma durante más de 500 años.
        </p>
        <p>
          Rica en minerales naturales como <strong>magnesio, zinc, potasio y hierro</strong>. Sin flúor ni aditivos
          químicos: 100% natural.
        </p>
      </>
    ),
    benefits: [
      'Extraída **artesanalmente** de las salineras milenarias de Maras.',
      'Rica en **minerales naturales**: magnesio, zinc, potasio y hierro.',
      '**100% natural**, sin flúor ni aditivos químicos.',
      'Tradición ancestral de más de **500 años**.',
    ],
    howToUse: (
      <>
        <p>
          Perfecta para <strong>sazonar todo tipo de alimentos</strong>. Por sus cristales gruesos, se recomienda usar
          un moledor de sal.
        </p>
        <p>
          <strong>Conservación:</strong> mantener en lugar fresco y seco, en recipiente hermético.
        </p>
      </>
    ),
    shelfLife: 'Indefinida',
  }),
  make({
    id: 'vinagre-de-manzana',
    category: ProductCategory.TRADICIONALES,
    name: 'vinagre-de-manzana',
    title: 'Vinagre de Manzana',
    price: 17,
    isNew: true,
    tags: ['new', 'natural', 'healthy'],
    featuredImage: '/assets/images/content/products/vinagre-de-manzana/featured.webp',
    thumbnailImage: '/assets/images/content/products/vinagre-de-manzana/thumbnail.webp',
    galleryImages: [
      '/assets/images/content/products/vinagre-de-manzana/gallery-01.webp',
      '/assets/images/content/products/vinagre-de-manzana/gallery-03.webp',
      '/assets/images/content/products/vinagre-de-manzana/gallery-02.webp',
    ],
    shortDescription: 'Vinagre artesanal con madre, suave y lleno de beneficios.',
    longDescription: (
      <>
        <p>
          Hecho con <strong>manzanas 100% ecológicas</strong> y un proceso artesanal que transforma su sabor: suave,
          equilibrado y delicioso. Conserva la <strong>&ldquo;madre&rdquo;</strong> con enzimas y probióticos.
        </p>
        <p>Ideal diluido en agua o para dar vida a ensaladas, aderezos y marinados.</p>
      </>
    ),
    benefits: [
      'Elaborado con **manzanas 100% ecológicas** mediante fermentación natural.',
      'Conserva la **“madre”** con enzimas y probióticos beneficiosos.',
      'Apoya la **digestión saludable**.',
      '**100% natural**, sin pasteurizar ni filtrar.',
    ],
    howToUse: (
      <>
        <p>
          <strong>Para beber:</strong> diluye 1-2 cucharadas en un vaso de agua tibia, en ayunas o antes de las comidas.
        </p>
        <p>
          <strong>Conservación:</strong> lugar fresco y oscuro. Agita antes de usar.
        </p>
      </>
    ),
    shelfLife: '2 años',
  }),
  make({
    id: 'chucrut-morado',
    category: ProductCategory.PROBIOTICOS,
    name: 'chucrut-morado',
    title: 'Chucrut Morado Fermentado',
    price: 14,
    tags: ['recommended', 'discover', 'vegan', 'natural'],
    featuredImage: '/assets/images/content/products/chucrut-morado/featured.webp',
    thumbnailImage: '/assets/images/content/products/chucrut-morado/thumbnail.png',
    galleryImages: [
      '/assets/images/content/products/chucrut-morado/gallery-01.webp',
      '/assets/images/content/products/chucrut-morado/gallery-03.webp',
      '/assets/images/content/products/chucrut-morado/gallery-02.webp',
    ],
    shortDescription: 'Un superalimento crujiente para tu salud intestinal.',
    longDescription: (
      <>
        <p>
          <strong>Col morada fermentada</strong> lentamente de forma natural: un alimento probiótico crujiente y
          delicioso mediante lactofermentación ancestral.
        </p>
        <p>
          Acompañamiento perfecto para ensaladas, carnes, sándwiches y bowls. Fuente de{' '}
          <strong>vitaminas, enzimas y antioxidantes</strong>.
        </p>
      </>
    ),
    benefits: [
      'Mejora tu **digestión** con probióticos naturales.',
      'Fuente de **antioxidantes** y vitaminas C y K.',
      '**100% vegano**, sin lácteos.',
    ],
    howToUse: (
      <>
        <p>
          Úsalo como <strong>acompañamiento</strong> en ensaladas, sándwiches, bowls o guarnición. Consúmelo frío para
          preservar sus probióticos.
        </p>
        <p>
          <strong>Conservación:</strong> mantener refrigerado. Una vez abierto, consumir en 2 semanas.
        </p>
      </>
    ),
    shelfLife: '3 meses',
  }),
  make({
    id: 'crema-de-kefir-aceituna',
    category: ProductCategory.PROBIOTICOS,
    name: 'crema-de-kefir-aceituna',
    title: 'Crema de Kéfir con aceitunas',
    price: 15,
    tags: ['recommended', 'discover', 'probiotic'],
    featuredImage: '/assets/images/content/products/crema-de-kefir-aceitunas/featured.webp',
    thumbnailImage: '/assets/images/content/products/crema-de-kefir-aceitunas/thumbnail.png',
    galleryImages: [
      '/assets/images/content/products/crema-de-kefir-aceitunas/gallery-01.webp',
      '/assets/images/content/products/crema-de-kefir-aceitunas/gallery-03.webp',
      '/assets/images/content/products/crema-de-kefir-aceitunas/gallery-02.webp',
    ],
    shortDescription: 'Cremosidad probiótica con el sabor mediterráneo de las aceitunas.',
    longDescription: (
      <>
        <p>
          Combina la suavidad del <strong>kéfir fermentado</strong> con el sabor de las{' '}
          <strong>aceitunas mediterráneas</strong>. Natural, fermentada y llena de vida, ideal para untar o como dip.
        </p>
        <p>
          Aporta <strong>probióticos</strong> del kéfir y <strong>grasas saludables</strong> de las aceitunas.
        </p>
      </>
    ),
    benefits: [
      'Aporta **probióticos naturales** del kéfir.',
      'Rica en **grasas saludables** (omega-9).',
      '**100% natural**, sin conservantes.',
    ],
    howToUse: (
      <>
        <p>
          Perfecta para <strong>untar</strong> en pan o crackers, como dip o base para sándwiches gourmet.
        </p>
        <p>
          <strong>Conservación:</strong> mantener refrigerado. Una vez abierto, consumir en 1 semana.
        </p>
      </>
    ),
    shelfLife: '15 días',
  }),
];
