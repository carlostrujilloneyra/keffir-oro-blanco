import type { Product, ProductFamily } from '../types/product.type';
import { subcategoryCategory } from './subcategoryIndex';

const compactSize = (size: string) =>
  size
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/^(\d+)l$/, '$1lt'); // 1 L → 1lt (475 ml y 200 g quedan igual)

/* Un Product por variante: datos de la familia + los de la talla (los overrides de la variante ganan). */
const toProducts = ({ subcategory, title, variants, ...family }: ProductFamily): Product[] =>
  variants.map(({ size, ...variant }) => ({
    ...family,
    category: subcategoryCategory[subcategory],
    title: size ? `${title} ${size}` : title,
    ...(size ? { size } : {}),
    ...variant,
    slug: size ? `${family.name}-${compactSize(size)}` : family.name,
  }));

const vacaNatural = {
  containsDairy: true,
  shortDescription: 'El clásico de la casa: kéfir de leche de vaca, cremoso y fermentado a mano.',
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
  containsDairy: true,
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

const KOMBUCHA_275 = '275 ml';
const KOMBUCHA_355 = '355 ml';

const kombucha355 = {
  subcategory: 'kombucha-y-kefir-de-agua' as const,
  // TODO: fotos reales de cada sabor (placeholder: kéfir de agua, igual que la kombucha natural).
  featuredImage: '/assets/images/content/products/kefir-de-agua/background.webp',
  thumbnailImage: '/assets/images/content/products/kefir-de-agua/background.webp',
  howToUse: kombuchaNatural.howToUse,
  // TODO: confirmar la vida útil de la presentación de 355 ml (hoy copia la de la kombucha natural).
  shelfLife: kombuchaNatural.shelfLife,
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
  /* TEMPORAL: la carpeta manteca-de-cerdo/ está vacía. Volver a featured/thumbnail/gallery
    propios cuando estén las fotos nuevas. */
  featuredImage: '/assets/images/categories/manteca-de-cerdo.webp',
  thumbnailImage: '/assets/images/categories/manteca-de-cerdo.webp',
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

/*
  Orden de las familias = orden de allProducts y de las grillas de cada
  subcategoría (productNames se deriva de aquí).
*/
export const productFamilies: ProductFamily[] = [
  /* ── Probióticos · Kéfir de leche natural ────────────────────────────── */
  {
    name: 'kefir-leche-vaca',
    subcategory: 'kefir-natural',
    shortName: 'Vaca',
    title: 'Kéfir de leche de vaca natural',
    featuredImage: '/assets/images/content/products/kefir-de-leche/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-leche/featured.webp',
    ...vacaNatural,
    variants: [
      { id: 'kefir-vaca-1l', size: '1 L', price: 24.0, tags: ['probiotic', 'best-seller'] },
      {
        id: 'kefir-vaca-475',
        size: '475 ml',
        price: 14.0,
        tags: ['probiotic'],
        featuredImage: '/assets/images/content/products/kefir-de-leche-475ml/featured.webp',
        thumbnailImage: '/assets/images/content/products/kefir-de-leche-475ml/featured.webp',
      },
      {
        id: 'kefir-vaca-250',
        size: '250 ml',
        price: 8.9,
        tags: ['probiotic'],
        featuredImage: '/assets/images/content/products/kefir-de-leche-250ml/featured.webp',
        thumbnailImage: '/assets/images/content/products/kefir-de-leche-250ml/featured.webp',
      },
    ],
  },
  {
    name: 'kefir-leche-cabra',
    subcategory: 'kefir-natural',
    shortName: 'Cabra',
    title: 'Kéfir de leche de cabra natural',
    featuredImage: '/assets/images/content/products/kefir-de-leche-de-cabra/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-leche-de-cabra/featured.webp',
    ...cabraNatural,
    variants: [
      { id: 'kefir-cabra-1l', size: '1 L', price: 25.0, tags: ['probiotic', 'best-seller'] },
      { id: 'kefir-cabra-475', size: '475 ml', price: 15.0, tags: ['probiotic'] },
      { id: 'kefir-cabra-250', size: '250 ml', price: 9.9, tags: ['probiotic'] },
    ],
  },

  /* ── Probióticos · Kéfires frutados (475 ml, talla única) ────────────── */
  {
    name: 'kefir-pulpa-fresa',
    subcategory: 'kefir-frutado',
    shortName: 'Fresa',
    title: 'Kéfir de leche de vaca con pulpa de fresa',
    containsDairy: true,
    featuredImage: '/assets/images/content/products/kefir-con-fresa/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-con-fresa/featured.webp',
    galleryImages: [
      '/assets/images/content/products/kefir-con-fresa/gallery-01.webp',
      '/assets/images/content/products/kefir-con-fresa/gallery-02.webp',
      '/assets/images/content/products/kefir-con-fresa/gallery-03.webp',
      '/assets/images/content/products/kefir-con-fresa/gallery-04.webp',
      '/assets/images/content/products/kefir-con-fresa/gallery-05.webp',
    ],
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
    variants: [
      {
        id: 'kefir-fresa',
        size: '475 ml',
        price: 17.0,
        tags: ['best-seller', 'recommended', 'sugar-free', 'probiotic'],
      },
    ],
  },
  {
    name: 'kefir-pulpa-arandanos',
    subcategory: 'kefir-frutado',
    shortName: 'Arándanos',
    title: 'Kéfir de leche de vaca con pulpa de arándanos',
    containsDairy: true,
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
    variants: [
      {
        id: 'kefir-arandanos',
        size: '475 ml',
        price: 17.9,
        tags: ['best-seller', 'recommended', 'sugar-free', 'probiotic'],
      },
    ],
  },
  {
    name: 'kefir-frutos-bosque',
    subcategory: 'kefir-frutado',
    shortName: 'Frutos del bosque',
    title: 'Kéfir de leche de vaca con frutos del bosque',
    containsDairy: true,
    featuredImage: '/assets/images/content/products/kefir-con-frutos-del-bosque/gallery-01.webp',
    thumbnailImage: '/assets/images/content/products/kefir-con-frutos-del-bosque/gallery-01.webp',
    galleryImages: [
      '/assets/images/content/products/kefir-con-frutos-del-bosque/gallery-02.webp',
      '/assets/images/content/products/kefir-con-frutos-del-bosque/gallery-03.webp',
      '/assets/images/content/products/kefir-con-frutos-del-bosque/gallery-04.webp',
      '/assets/images/content/products/kefir-con-frutos-del-bosque/gallery-05.webp',
      '/assets/images/content/products/kefir-con-frutos-del-bosque/gallery-06.webp',
    ],
    shortDescription: 'Nuestra novedad: la mezcla de frutos del bosque, cremosa y probiótica.',
    longDescription: (
      <>
        <p>
          Nuestra nueva propuesta: la cremosidad del kéfir de leche con una mezcla de <strong>frutos del bosque</strong>
          : fresas, frambuesas, arándanos y zarzamoras, endulzado con stevia.
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
    variants: [
      { id: 'kefir-frutos-bosque', size: '475 ml', price: 18.5, tags: ['best-seller', 'probiotic', 'sugar-free'] },
    ],
  },
  {
    name: 'kefir-chocolate',
    subcategory: 'kefir-frutado',
    shortName: 'Chocolate',
    title: 'Kéfir de leche de vaca con chocolate',
    containsDairy: true,
    featuredImage: '/assets/images/content/products/kefir-de-chocolate/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-chocolate/featured.webp',
    galleryImages: [
      '/assets/images/content/products/kefir-de-chocolate/gallery-01.webp',
      '/assets/images/content/products/kefir-de-chocolate/gallery-02.webp',
      '/assets/images/content/products/kefir-de-chocolate/gallery-03.webp',
      '/assets/images/content/products/kefir-de-chocolate/gallery-04.webp',
      '/assets/images/content/products/kefir-de-chocolate/gallery-05.webp',
    ],
    shortDescription: 'Cremosidad probiótica con el poder del cacao artesanal.',
    longDescription: (
      <>
        <p>
          La cremosidad de nuestro kéfir de leche con <strong>chocolate 100% cacao chuncho</strong> de Quillabamba,
          endulzado con stevia.
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
    variants: [
      { id: 'kefir-chocolate', size: '475 ml', price: 17.9, tags: ['probiotic', 'recommended', 'sugar-free'] },
    ],
  },

  /* ── Probióticos · Kombucha y kéfir de agua ─────────────────────────── */
  {
    name: 'kombucha-natural',
    subcategory: 'kombucha-y-kefir-de-agua',
    shortName: 'Kombucha natural',
    title: 'Kombucha natural',
    // TODO: imagen real de kombucha (placeholder: kéfir de agua).
    featuredImage: '/assets/images/content/products/kefir-de-agua/background.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-agua/background.webp',
    ...kombuchaNatural,
    variants: [
      { id: 'kombucha-1l', size: '1 L', price: 21.5, tags: ['new', 'vegan', 'probiotic'] },
      { id: 'kombucha-475', size: '475 ml', price: 12.5, tags: ['new', 'vegan', 'probiotic'] },
    ],
  },

  /* ── Probióticos · Kombuchas de sabores (275 y 355 ml, cada una es un producto) ── */
  {
    name: 'kombucha-flor-de-guisante',
    shortName: 'Flor de guisante',
    title: 'Kombucha de flor de guisante con limón',
    ...kombucha355,
    shortDescription: 'Té fermentado con flor de guisante y un toque cítrico de limón.',
    longDescription: (
      <>
        <p>
          Nuestra kombucha de <strong>té fermentado con cultivos vivos</strong>, infusionada con{' '}
          <strong>flor de guisante</strong> y terminada con <strong>limón</strong>.
        </p>
        <p>Floral, cítrica y naturalmente burbujeante, en botella de vidrio de 355 ml.</p>
      </>
    ),
    benefits: [
      'Elaborada con **té fermentado** y cultivos vivos.',
      'Infusionada con **flor de guisante** y **limón**.',
      '**Naturalmente burbujeante**, sin gas añadido.',
      '**Sin lácteos**, apta para dietas veganas.',
    ],
    variants: [
      {
        id: 'kombucha-flor-de-guisante-275',
        size: KOMBUCHA_275,
        price: 10.5,
        tags: ['new', 'vegan', 'probiotic'],
        availability: 'coming-soon',
      },
      {
        id: 'kombucha-flor-de-guisante',
        size: KOMBUCHA_355,
        price: 13.0,
        tags: ['new', 'vegan', 'probiotic'],
        availability: 'coming-soon',
      },
    ],
  },
  {
    name: 'kombucha-espirulina-azul',
    shortName: 'Espirulina azul',
    title: 'Kombucha de espirulina azul con hierba luisa',
    ...kombucha355,
    shortDescription: 'Té fermentado con espirulina azul y el aroma fresco de la hierba luisa.',
    longDescription: (
      <>
        <p>
          Nuestra kombucha de <strong>té fermentado con cultivos vivos</strong>, con <strong>espirulina azul</strong> y{' '}
          <strong>hierba luisa</strong>.
        </p>
        <p>Herbal, refrescante y naturalmente burbujeante, en botella de vidrio de 355 ml.</p>
      </>
    ),
    benefits: [
      'Elaborada con **té fermentado** y cultivos vivos.',
      'Con **espirulina azul** y **hierba luisa**.',
      '**Naturalmente burbujeante**, sin gas añadido.',
      '**Sin lácteos**, apta para dietas veganas.',
    ],
    variants: [
      {
        id: 'kombucha-espirulina-azul-275',
        size: KOMBUCHA_275,
        price: 10.5,
        tags: ['new', 'vegan', 'probiotic'],
        availability: 'coming-soon',
      },
      {
        id: 'kombucha-espirulina-azul',
        size: KOMBUCHA_355,
        price: 12.0,
        tags: ['new', 'vegan', 'probiotic'],
        availability: 'coming-soon',
      },
    ],
  },
  {
    name: 'kombucha-arandanos',
    shortName: 'Arándanos',
    title: 'Kombucha de arándanos con menta',
    ...kombucha355,
    shortDescription: 'Té fermentado con arándanos y menta fresca.',
    longDescription: (
      <>
        <p>
          Nuestra kombucha de <strong>té fermentado con cultivos vivos</strong>, con <strong>arándanos</strong> y{' '}
          <strong>menta</strong>.
        </p>
        <p>Frutal, fresca y naturalmente burbujeante, en botella de vidrio de 355 ml.</p>
      </>
    ),
    benefits: [
      'Elaborada con **té fermentado** y cultivos vivos.',
      'Con **arándanos** y **menta**.',
      '**Naturalmente burbujeante**, sin gas añadido.',
      '**Sin lácteos**, apta para dietas veganas.',
    ],
    variants: [
      {
        id: 'kombucha-arandanos-275',
        size: KOMBUCHA_275,
        price: 9.9,
        tags: ['new', 'vegan', 'probiotic'],
        availability: 'coming-soon',
      },
      {
        id: 'kombucha-arandanos',
        size: KOMBUCHA_355,
        price: 12.0,
        tags: ['new', 'vegan', 'probiotic'],
        availability: 'coming-soon',
      },
    ],
  },
  {
    name: 'kombucha-pitahaya',
    shortName: 'Pitahaya',
    title: 'Kombucha de pitahaya',
    ...kombucha355,
    shortDescription: 'Edición especial: té fermentado con pitahaya.',
    longDescription: (
      <>
        <p>
          Nuestra <strong>edición especial</strong>: kombucha de <strong>té fermentado con cultivos vivos</strong> y{' '}
          <strong>pitahaya</strong>.
        </p>
        <p>Frutal y naturalmente burbujeante, en botella de vidrio de 355 ml.</p>
      </>
    ),
    benefits: [
      'Elaborada con **té fermentado** y cultivos vivos.',
      'Con **pitahaya**, en edición especial.',
      '**Naturalmente burbujeante**, sin gas añadido.',
      '**Sin lácteos**, apta para dietas veganas.',
    ],
    variants: [
      {
        id: 'kombucha-pitahaya-275',
        size: KOMBUCHA_275,
        price: 11.5,
        tags: ['new', 'limited', 'vegan', 'probiotic'],
        availability: 'coming-soon',
      },
      {
        id: 'kombucha-pitahaya',
        size: KOMBUCHA_355,
        price: 14.0,
        tags: ['new', 'limited', 'vegan', 'probiotic'],
        availability: 'coming-soon',
      },
    ],
  },

  /* Va detrás de las kombuchas: es su orden en la subcategoría. */
  {
    name: 'kefir-agua',
    subcategory: 'kombucha-y-kefir-de-agua',
    shortName: 'Kéfir de agua',
    title: 'Kéfir de agua',
    featuredImage: '/assets/images/content/products/kefir-de-agua/background.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-agua/background.webp',
    ...aguaKefir,
    variants: [
      { id: 'kefir-agua-1l', size: '1 L', price: 19.0, tags: ['recommended', 'best-seller', 'vegan', 'probiotic'] },
      { id: 'kefir-agua-475', size: '475 ml', price: 10.0, tags: ['vegan', 'probiotic'] },
    ],
  },

  /* ── Tradicionales · Manteca de cerdo ────────────────────────────────── */
  {
    name: 'manteca-de-cerdo',
    subcategory: 'para-cocinar',
    shortName: 'Manteca',
    title: 'Manteca de cerdo artesanal',
    ...mantecaCerdo,
    variants: [
      { id: 'manteca-370', size: '370 ml', price: 25.0, tags: ['artisan'] },
      { id: 'manteca-580', size: '580 ml', price: 33.9, tags: ['artisan', 'best-seller'] },
      { id: 'manteca-1l', size: '1 L', price: 62.0, tags: ['artisan'] },
    ],
  },

  /* ── Tradicionales · Mermeladas (200 g, envase de vidrio, talla única) ─ */
  {
    name: 'mermelada-fresa',
    subcategory: 'mermeladas',
    shortName: 'Fresa',
    title: 'Mermelada de fresa natural',
    // TODO: foto individual de la mermelada (temporal: la de la subcategoría, con los 3 frascos).
    featuredImage: '/assets/images/subcategories/mermeladas.webp',
    thumbnailImage: '/assets/images/subcategories/mermeladas.webp',
    shortDescription: 'Mermelada artesanal de fresa, hecha con pulpa de fruta y endulzada con stevia.',
    longDescription: (
      <>
        <p>
          Mermelada artesanal hecha con pulpa de <strong>fresa</strong> y endulzada con <strong>stevia</strong>, sin
          colorantes ni conservantes. Elaborada en pequeños lotes y envasada en <strong>vidrio</strong>.
        </p>
        <p>Perfecta para acompañar tus desayunos y meriendas.</p>
      </>
    ),
    benefits: [
      'Hecha con **pulpa de fresa**, endulzada con **stevia**.',
      'Sin colorantes ni conservantes.',
      'Producto artesanal en pequeños lotes.',
      'Envase de **vidrio** reutilizable.',
    ],
    howToUse: mermeladaHowToUse,
    shelfLife: '24 días',
    variants: [{ id: 'mermelada-fresa', size: '200 g', price: 13.5, tags: ['new', 'natural'] }],
  },
  {
    name: 'mermelada-arandanos',
    subcategory: 'mermeladas',
    shortName: 'Arándanos',
    title: 'Mermelada de arándanos natural',
    // TODO: foto individual de la mermelada (temporal: la de la subcategoría, con los 3 frascos).
    featuredImage: '/assets/images/subcategories/mermeladas.webp',
    thumbnailImage: '/assets/images/subcategories/mermeladas.webp',
    shortDescription: 'Mermelada artesanal de arándanos, hecha con pulpa de fruta y endulzada con stevia.',
    longDescription: (
      <>
        <p>
          Mermelada artesanal hecha con pulpa de <strong>arándanos</strong> y endulzada con <strong>stevia</strong>, sin
          colorantes ni conservantes. Elaborada en pequeños lotes y envasada en <strong>vidrio</strong>.
        </p>
        <p>Perfecta para acompañar tus desayunos y meriendas.</p>
      </>
    ),
    benefits: [
      'Hecha con **pulpa de arándanos**, endulzada con **stevia**.',
      'Sin colorantes ni conservantes.',
      'Producto artesanal en pequeños lotes.',
      'Envase de **vidrio** reutilizable.',
    ],
    howToUse: mermeladaHowToUse,
    shelfLife: '24 días',
    variants: [{ id: 'mermelada-arandanos', size: '200 g', price: 13.5, tags: ['new', 'natural'] }],
  },
  {
    name: 'mermelada-quito-quito',
    subcategory: 'mermeladas',
    shortName: 'Quito quito',
    title: 'Mermelada de Quito Quito',
    // TODO: foto individual de la mermelada (temporal: la de la subcategoría, con los 3 frascos).
    featuredImage: '/assets/images/subcategories/mermeladas.webp',
    thumbnailImage: '/assets/images/subcategories/mermeladas.webp',
    shortDescription: 'Mermelada artesanal de Quito Quito de Oxapampa, endulzada con stevia.',
    longDescription: (
      <>
        <p>
          Mermelada artesanal hecha con pulpa de <strong>Quito Quito</strong> traído de <strong>Oxapampa</strong> y
          endulzada con <strong>stevia</strong>, sin colorantes ni conservantes. Envasada en <strong>vidrio</strong>.
        </p>
        <p>Perfecta para convertir tu desayuno en un momento especial.</p>
      </>
    ),
    benefits: [
      'Hecha con **pulpa de Quito Quito** de Oxapampa, endulzada con **stevia**.',
      'Sin colorantes ni conservantes.',
      'Producto artesanal en pequeños lotes.',
      'Envase de **vidrio** reutilizable.',
    ],
    howToUse: mermeladaHowToUse,
    shelfLife: '24 días',
    variants: [{ id: 'mermelada-quito-quito', size: '200 g', price: 13.5, tags: ['new', 'recommended', 'natural'] }],
  },

  /* ── Tradicionales · Otros (sin cambios; confirmar si siguen en catálogo) */
  {
    name: 'sal-de-maras',
    subcategory: 'para-cocinar',
    shortName: 'Sal de Maras',
    title: 'Sal rosada de Maras, Cusco',
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
    variants: [{ id: 'sal-de-maras', price: 19, tags: ['new', 'natural', 'artisan'] }],
  },
  {
    name: 'chucrut-morado',
    subcategory: 'fermentados',
    shortName: 'Chucrut morado',
    title: 'Chucrut Morado Fermentado',
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
    variants: [{ id: 'chucrut-morado', price: 14, tags: ['recommended', 'discover', 'vegan', 'natural', 'probiotic'] }],
  },
  {
    name: 'crema-de-kefir-aceituna',
    subcategory: 'fermentados',
    shortName: 'Crema de kéfir',
    title: 'Crema de Kéfir con aceitunas',
    containsDairy: true,
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
    variants: [{ id: 'crema-de-kefir-aceituna', price: 15, tags: ['recommended', 'discover', 'probiotic'] }],
  },
];

export const allProducts: Product[] = productFamilies.flatMap(toProducts);
