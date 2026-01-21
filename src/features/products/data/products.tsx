import { Product } from '../types/product.type';
import { ProductCategory } from './categories';
import { generateSlug } from '@/lib/generateSlug';

export const allProducts: Product[] = [
  {
    id: 'prod_001',
    category: ProductCategory.TRADICIONALES,
    name: 'sal-de-maras',
    slug: generateSlug('Sal rosada de Maras, Cusco'),
    title: 'Sal rosada de Maras, Cusco',
    price: 19,
    isNew: true,
    linkUrl: '/products/sal-de-maras',
    tags: ['new'],

    bgImageSrc: '/assets/images/content/products/sal-de-maras/bg-card.webp',
    featuredImage: '/assets/images/content/products/sal-de-maras/featured.webp',
    thumbnailImage: '/assets/images/content/products/sal-de-maras/thumbnail.webp',

    hasDifferentOrder: true,

    shortDescription: 'Sal rosada de Maras, Cusco',
    longDescription: (
      <>
        Extraída a mano en las salineras milenarias de <strong>Maras</strong>, esta sal gourmet realza tus comidas y
        aporta minerales como magnesio, zinc, potasio y hierro. {''}
        <strong>Sin flúor ni aditivos químicos</strong>, es 100% natural y fiel a una tradición ancestral. Por sus
        cristales duros y gruesos, se recomienda usar un moledor para aprovechar al máximo su sabor y textura.
      </>
    ),

    presentations: [
      { id: 'sal-1kg', name: '1 kilo', price: 19.0 },
      { id: 'sal-2kg', name: '2 kilos', price: 35.0 },
    ],
  },

  {
    id: 'prod_002',
    category: ProductCategory.TRADICIONALES,
    name: 'manteca-de-cerdo',
    slug: generateSlug('Manteca de Cerdo Artesanal'),
    title: 'Manteca de Cerdo Artesanal',
    price: 25.5,
    isNew: false,
    linkUrl: '/products/manteca-de-cerdo',
    tags: ['recommended', 'best-seller'],

    featuredImage: '/assets/images/content/products/manteca-de-cerdo/featured.webp',
    thumbnailImage: '/assets/images/content/products/manteca-de-cerdo/thumbnail.webp',
    galleryImages: [
      '/assets/images/content/products/manteca-de-cerdo/gallery-01.webp',
      '/assets/images/content/products/manteca-de-cerdo/gallery-03.webp',
      '/assets/images/content/products/manteca-de-cerdo/gallery-02.webp',
      '/assets/images/content/products/manteca-de-cerdo/gallery-04.webp',
      '/assets/images/content/products/manteca-de-cerdo/gallery-05.webp',
    ],

    hasDifferentOrder: true,

    shortDescription: 'El secreto de la cocina tradicional para un sabor inigualable.',
    longDescription: (
      <>
        Vuelve al origen del sabor con nuestra Manteca de Cerdo 100% natural. Ideal para freír, hornear o dar un toque
        de sabor auténtico a tus guisos, es una <strong>alternativa saludable a los aceites procesados</strong>. Rica en
        grasas estables al calor, es el secreto de las abuelas para comidas más sabrosas y nutritivas.
      </>
    ),

    presentations: [
      { id: 'manteca-300g', name: '300 g', price: 20.0 },
      { id: 'manteca-500g', name: '500 g' },
      { id: 'manteca-1kilo', name: '1 Kilo' },
    ],
  },

  {
    id: 'prod_003',
    category: ProductCategory.TRADICIONALES,
    name: 'vinage-de-manzana',
    slug: generateSlug('Vinagre de Manzana'),
    title: 'Vinagre de Manzana',
    price: 17,
    isNew: true,
    linkUrl: '/products/vinagre-de-manzana',
    tags: ['new'],

    bgImageSrc: '/assets/images/content/products/vinagre-de-manzana/bg-card.webp',
    featuredImage: '/assets/images/content/products/vinagre-de-manzana/featured.webp',
    thumbnailImage: '/assets/images/content/products/vinagre-de-manzana/thumbnail.webp',
    galleryImages: [
      '/assets/images/content/products/vinagre-de-manzana/gallery-01.webp',
      '/assets/images/content/products/vinagre-de-manzana/gallery-03.webp',
      '/assets/images/content/products/vinagre-de-manzana/gallery-02.webp',
      '/assets/images/content/products/vinagre-de-manzana/gallery-04.webp',
      '/assets/images/content/products/vinagre-de-manzana/gallery-05.webp',
    ],

    hasDifferentOrder: false,

    shortDescription: 'Vinagre de Manzana',
    longDescription: (
      <>
        ¿Y si el vinagre de manzana no supiera a vinagre? Olvida la acidez fuerte. Descubre una experiencia de bienestar{' '}
        {''}
        <strong>hecha con manzanas 100% ecológicas</strong> y un proceso artesanal que transforma su sabor: suave,
        equilibrado y delicioso. Ideal para tomarlo diluido o darle vida a tus comidas. Un aliado natural para{' '}
        <strong>tu digestión, defensas y bienestar diario.</strong>
      </>
    ),

    presentations: [{ id: 'vinagre-500', name: '500 ml', price: 17.0 }],
  },

  {
    id: 'prod_005',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-leche-vaca',
    slug: generateSlug('Kéfir de leche de Vaca 1 LT'),
    title: 'Kéfir de leche de Vaca 1 LT',
    price: 24,
    isNew: false,
    linkUrl: '/products/kefir-leche-vaca-1LT',
    tags: ['probiotic', 'best-seller'],

    featuredImage: '/assets/images/content/products/kefir-de-leche/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-leche/featured.webp',
    galleryImages: [
      '/assets/images/content/products/kefir-de-leche/gallery-01.webp',
      '/assets/images/content/products/kefir-de-leche/gallery-03.webp',
      '/assets/images/content/products/kefir-de-leche/gallery-02.webp',
      '/assets/images/content/products/kefir-de-leche/gallery-04.webp',
      '/assets/images/content/products/kefir-de-leche/gallery-05.webp',
    ],

    hasDifferentOrder: false,

    shortDescription: 'El clásico probiótico, cremoso y lleno de beneficios.',
    longDescription: (
      <>
        <p>
          Bebida fermentada, cremosa y de sabor suave, elaborada con leche fresca de <strong>vaca de establo</strong>.
          Gracias a su proceso de fermentación natural, contiene cultivos vivos propios del <strong>kéfir</strong>, que
          le aportan su textura característica y un sabor ligeramente ácido.
        </p>

        <p>
          Es una opción ideal para quienes buscan incorporar alimentos fermentados de manera habitual en su alimentación
          diaria.
        </p>
      </>
    ),

    presentations: [
      { id: 'kefir-vaca-250', name: '250 ml', price: 9.9 },
      { id: 'kefir-vaca-475', name: '475 ml', price: 14.0 },
      { id: 'kefir-vaca-1l', name: '1 Litro', price: 24.0 },
    ],

    benefits: [
      'Refuerza la <strong>flora intestinal</strong> con bacterias buenas.',
      'Mantiene tu sistema digestivo <strong>saludable</strong> y apoya el tránsito intestinal.',
      'Apoya tu <strong>sistema inmunológico</strong> naturalmente.',
      'Producto 100% natural, sin conservantes ni aditivos.',
      'Apto para personas que tienen <strong>intolerancia a la lactosa</strong> debido a que el Kéfir cuenta con un % bajo de lactosa.',
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

    shelfLife: '15 días',
  },

  {
    id: 'prod_006',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-leche-vaca',
    slug: generateSlug('Kéfir de leche de Vaca 475ml'),
    title: 'Kéfir de leche de Vaca 475ml',
    price: 14.5,
    isNew: false,
    linkUrl: '/products/kefir-leche-vaca-natural-475ml',
    tags: ['probiotic', 'lactose-free'],

    featuredImage: '/assets/images/content/products/kefir-de-leche-475ml/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-leche-475ml/featured.webp',
    galleryImages: ['/assets/images/content/products/kefir-de-leche/gallery-01.webp'],

    hasDifferentOrder: false,

    shortDescription: 'El clásico probiótico, cremoso y lleno de beneficios.',
    longDescription: (
      <>
        El pilar del bienestar digestivo. Nuestro Kéfir de Leche de Vaca es un probiótico natural, cremoso y de sabor
        suave, elaborado con <strong>leche fresca de pastoreo</strong>. Cada sorbo está lleno de millones de
        microorganismos beneficiosos que trabajan para{' '}
        <strong>fortalecer tu microbiota, mejorar tu digestión y reforzar tu sistema inmune</strong>. Es el punto de
        partida perfecto para una vida más saludable.
      </>
    ),

    presentations: [
      { id: 'kefir-vaca-250', name: '250 ml', price: 9.9 },
      { id: 'kefir-vaca-475', name: '475 ml', price: 14.0 },
      { id: 'kefir-vaca-1l', name: '1 Litro', price: 24.0 },
    ],

    benefits: [
      'Refuerza la <strong>flora intestinal</strong> con bacterias buenas.',
      'Mantiene tu sistema digestivo <strong>saludable</strong> y apoya el tránsito intestinal.',
      'Refuerza el <strong>sistema inmunológico</strong> naturalmente.',
      'Producto 100% natural, sin conservantes ni aditivos.',
      'Apto para personas que tienen <strong>intolerancia a la lactosa</strong> debido a que el Kéfir cuenta con un % bajo de lactosa.',
    ],

    howToUse: <>Puedes combinarlo con frutas como.... agregando miel y algarrobina...</>,
  },

  {
    id: 'prod_007',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-leche-cabra',
    slug: generateSlug('Kéfir de Leche de Cabra 1 LT'),
    title: 'Kéfir de Leche de Cabra 1 LT',
    price: 25.5,
    isNew: false,
    linkUrl: '/products/kefir-leche-cabra-natural',
    tags: ['probiotic', 'lactose-free', 'best-seller'],

    featuredImage: '/assets/images/content/products/kefir-de-leche-de-cabra/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-leche-de-cabra/featured.webp',

    hasDifferentOrder: false,

    shortDescription: 'Nutritivo, suave y más fácil de digerir.',
    longDescription: (
      <>
        <p>
          Bebida fermentada elaborada con leche de cabra de <strong>libre pastoreo</strong>, de sabor característico y
          ligeramente ácido. Gracias a su proceso de fermentación natural, contiene cultivos vivos propios del kéfir y
          se presenta como una alternativa al kéfir de leche de vaca.
        </p>

        <p>
          {' '}
          La leche de cabra contiene principalmente <strong>caseína A2</strong> y, al tratarse de un producto
          fermentado, es preferida por personas que buscan opciones elaboradas con{' '}
          <strong>menor contenido de lactosa</strong>, así como sabores y texturas diferentes.
        </p>
      </>
    ),

    presentations: [
      { id: 'kefir-cabra-250', name: '250 ml', price: 9.9 },
      { id: 'kefir-cabra-475', name: '475 ml', price: 15.0 },
      { id: 'kefir-cabra-1l', name: '1 Litro', price: 25.5 },
    ],

    benefits: [
      'Aporta <strong>cultivos vivos</strong> propios del kéfir.',
      'Producto fermentado de sabor característico y textura ligera.',
      'Elaborado con <strong>leche de cabra</strong>, una alternativa al kéfir de leche de vaca.',
      'Producto 100% natural, sin conservantes ni aditivos.',
      'Durante la fermentación, el contenido de <strong>lactosa se reduce de forma natural</strong>.',
    ],

    howToUse: (
      <>
        <p>
          Listo para consumir. Puede tomarse solo o acompañar{' '}
          <strong>frutas, cereales y otras preparaciones frías</strong>. Para personas que lo consumen por primera vez,
          se sugiere iniciar con <strong>porciones pequeñas (shots de 30 ml)</strong> e incrementar gradualmente según
          tolerancia.
        </p>

        <p>
          En el caso de niños a partir de los 2 años, puede incorporarse en pequeñas cantidades, por ejemplo 5
          cucharaditas, como parte de su alimentación habitual.
        </p>
      </>
    ),

    shelfLife: '15 días',
  },

  {
    id: 'prod_008',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-con-arandanos',
    slug: generateSlug('Kéfir de leche de vaca con Arándanos 475ml'),
    title: 'Kéfir de leche de vaca con Arándanos 475ml',
    price: 17,
    isNew: false,
    linkUrl: '/products/kefir-con-arandanos',
    tags: ['best-seller', 'recommended', 'sugar-free'],

    featuredImage: '/assets/images/content/products/kefir-con-arandanos/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-con-arandanos/featured.webp',

    hasDifferentOrder: false,

    shortDescription: 'Un impulso de antioxidantes y probióticos.',
    longDescription: (
      <>
        <p>
          Potencia tu bienestar con la combinación perfecta de nuestro cremoso kéfir de leche y{' '}
          <strong>arándanos silvestres</strong>.
        </p>

        <p>
          Cada sorbo es una explosión de sabor y un impulso para tu salud, cargado de antioxidantes y probióticos que
          fortalecen tu sistema inmune y cuidan tu digestión.
        </p>
      </>
    ),

    presentations: [
      { id: 'kefir-arandanos-475', name: '475 ml', price: 17.0 },
      { id: 'kefir-arandanos-1l', name: '1 Litro', price: 29.0 },
    ],

    benefits: [
      'Refuerza la <strong>flora intestinal</strong> con bacterias buenas.',
      'Mantiene tu sistema digestivo <strong>saludable</strong> y apoya el tránsito intestinal.',
      'Apoya tu <strong>sistema inmunológico</strong> naturalmente.',
      'Rico en <strong>antioxidantes</strong> gracias a los arándanos silvestres.',
      'Producto 100% natural, sin conservantes ni aditivos.',
      'Apto para personas que tienen <strong>intolerancia a la lactosa</strong> debido a que el Kéfir cuenta con un % bajo de lactosa.',
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

    shelfLife: '19 días',
  },

  {
    id: 'prod_009',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-con-fresa',
    slug: generateSlug('Kéfir de leche de vaca con Fresa 475ml'),
    title: 'Kéfir de leche de vaca con Fresa 475ml',
    price: 17,
    isNew: false,
    linkUrl: '/products/kefir-con-fresa',
    tags: ['sugar-free', 'recommended', 'best-seller', 'probiotic'],

    featuredImage: '/assets/images/content/products/kefir-con-fresa/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-con-fresa/featured.webp',

    hasDifferentOrder: false,

    shortDescription: 'El sabor clásico que cuida de ti.',
    longDescription: (
      <>
        <p>
          Redescubre el sabor que te encanta, ahora en su versión más saludable y deliciosa. Hemos fusionado la
          increíble cremosidad de nuestro kéfir de leche con la dulzura natural de{' '}
          <strong>fresas frescas y jugosas</strong>.
        </p>

        <p>
          Cada sorbo es un balance perfecto que te transporta a un postre, pero con todos los beneficios de un
          superalimento cargado de <strong>probióticos y vitamina C</strong> que cuida tu digestión, fortalece tus
          defensas y te llena de energía.
        </p>
      </>
    ),

    presentations: [
      { id: 'kefir-fresa-475', name: '475 ml', price: 17.0 },
      { id: 'kefir-fresa-1l', name: '1 Litro', price: 29.0 },
    ],

    benefits: [
      'Refuerza la <strong>flora intestinal</strong> con bacterias buenas.',
      'Mantiene tu sistema digestivo <strong>saludable</strong> y apoya el tránsito intestinal.',
      'Apoya tu <strong>sistema inmunológico</strong> naturalmente.',
      'Rico en <strong>vitamina C</strong> gracias a las fresas naturales.',
      'Producto 100% natural, sin conservantes ni aditivos.',
      'Apto para personas que tienen <strong>intolerancia a la lactosa</strong> debido a que el Kéfir cuenta con un % bajo de lactosa.',
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

    shelfLife: '19 días',
  },

  {
    id: 'prod_010',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-con-aguaymanto',
    slug: generateSlug('Kéfir de leche de vaca con Aguaymanto 475ml'),
    title: 'Kéfir de leche de vaca con Aguaymanto 475ml',
    price: 17,
    isNew: false,
    linkUrl: '/products/kefir-con-aguaymanto',
    tags: ['sugar-free', 'recommended', 'probiotic', 'best-seller'],

    featuredImage: '/assets/images/content/products/kefir-con-aguaymanto/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-con-aguaymanto/featured.webp',

    hasDifferentOrder: false,

    shortDescription: 'Un tesoro andino lleno de vitaminas y probióticos.',
    longDescription: (
      <>
        <p>
          Disfruta la combinación perfecta entre la cremosidad del kéfir de leche y el sabor natural del{' '}
          <strong>aguaymanto</strong>.
        </p>

        <p>
          Cada sorbo es una experiencia exótica que te transporta a los Andes, cargado de{' '}
          <strong>probióticos, vitamina A y antioxidantes</strong> que fortalecen tu sistema inmune, cuidan tu digestión
          y protegen tu visión.
        </p>
      </>
    ),

    presentations: [
      { id: 'kefir-aguaymanto-475', name: '475 ml', price: 17.0 },
      { id: 'kefir-aguaymanto-1l', name: '1 Litro', price: 29.0 },
    ],

    benefits: [
      'Refuerza la <strong>flora intestinal</strong> con bacterias buenas.',
      'Mantiene tu sistema digestivo <strong>saludable</strong> y apoya el tránsito intestinal.',
      'Apoya tu <strong>sistema inmunológico</strong> naturalmente.',
      'Rico en <strong>vitamina A y antioxidantes</strong> gracias al aguaymanto andino.',
      'Producto 100% natural, sin conservantes ni aditivos.',
      'Apto para personas que tienen <strong>intolerancia a la lactosa</strong> debido a que el Kéfir cuenta con un % bajo de lactosa.',
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

    shelfLife: '19 días',
  },

  {
    id: 'prod_011',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-chocolate',
    slug: generateSlug('Kefir de leche de vaca con Chocolate'),
    title: 'Kefir de leche de vaca con Chocolate',
    price: 18,
    isNew: true,
    linkUrl: '/products/kefir-chocolate',
    tags: ['new'],

    bgImageSrc: '/assets/images/content/products/kefir-de-chocolate/bg-card.webp',
    featuredImage: '/assets/images/content/products/kefir-de-chocolate/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-chocolate/featured.webp',

    hasDifferentOrder: true,

    shortDescription: 'Kefir de Leche con Chocolate',
    longDescription: (
      <>
        Sumérgete en la cremosidad de nuestro kéfir de leche <strong>(vaca o cabra)</strong>, ahora enriquecido con el
        sabor profundo del auténtico <strong>cacao 100% artesanal</strong>. Traído desde los fértiles valles de
        Moyobamba y Quillabamba, este superalimento recarga tu cuerpo con minerales esenciales como hierro, calcio y
        magnesio. Disfruta el delicioso poder de sentirte bien.
      </>
    ),

    presentations: [
      { id: 'kefir-choco-300', name: '350 ml', price: 11.0 },
      { id: 'kefir-choco-475', name: '475 ml', price: 17.0 },
    ],
  },

  {
    id: 'prod_012',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-de-agua',
    slug: generateSlug('Kéfir de Agua'),
    title: 'Kéfir de Agua',
    price: 19,
    isNew: false,
    linkUrl: '/products/kefir-de-agua',
    tags: ['recommended', 'best-seller'],

    bgImageSrc: '/assets/images/content/products/kefir-de-agua/bg-card.webp',
    featuredImage: '/assets/images/content/products/kefir-de-agua/featured.webp',
    thumbnailImage: '/assets/images/content/products/sal-de-maras/thumbnail.webp',

    hasDifferentOrder: false,

    shortDescription: 'La bebida probiótica refrescante y naturalmente burbujeante.',
    longDescription: (
      <>
        Descubre la alternativa vegana y sin lácteos al kéfir tradicional. Nuestro Kéfir de Agua es una bebida{' '}
        <strong>viva, fermentada y deliciosamente refrescante</strong>, llena de millones de probióticos que ayudan a
        equilibrar tu flora intestinal y a potenciar tu energía. Es la forma perfecta de hidratarte y cuidarte al mismo
        tiempo.
      </>
    ),

    presentations: [
      { id: 'kefir-agua-475', name: '475 ml', price: 16.0 },
      { id: 'kefir-agua-1l', name: '1 Litro', price: 28.0 },
    ],
  },

  {
    id: 'prod_013',
    category: ProductCategory.PROBIOTICOS,
    name: 'chucrut-morado',
    slug: generateSlug('Chucrut Morado Fermentado'),
    title: 'Chucrut Morado Fermentado',
    price: 14,
    isNew: false,
    linkUrl: '/products/chucrut-morado',
    tags: ['recommended', 'discover'],

    featuredImage: '/assets/images/content/products/chucrut-morado/featured.webp',
    thumbnailImage: '/assets/images/content/products/chucrut-morado/thumbnail.png',
    galleryImages: [
      '/assets/images/content/products/chucrut-morado/gallery-01.webp',
      '/assets/images/content/products/chucrut-morado/gallery-03.webp',
      '/assets/images/content/products/chucrut-morado/gallery-02.webp',
      '/assets/images/content/products/chucrut-morado/gallery-04.webp',
      '/assets/images/content/products/chucrut-morado/gallery-05.webp',
    ],

    hasDifferentOrder: false,

    shortDescription: 'Un superalimento crujiente para tu salud intestinal.',
    benefits: [
      'Mejora tu digestión y equilibra tu flora intestinal.',
      'Potente fuente de antioxidantes que protegen tus células.',
      'Sabor suave y ligeramente dulce.',
      'Fortalece el sistema inmunológico.',
    ],

    longDescription: (
      <>
        Añade un toque de color y un universo de beneficios a tus platos. Nuestro Chucrut Morado es col morada{' '}
        <strong>fermentada lentamente de forma natural</strong>, creando un alimento probiótico crujiente y delicioso.
        Es el acompañamiento perfecto para ensaladas y carnes, y una fuente increíble de{' '}
        <strong>vitaminas y enzimas digestivas</strong>.
      </>
    ),

    presentations: [
      { id: 'chucrut-170g', name: '170 g' },
      { id: 'chucrut-360g', name: '360 g' },
    ],
  },

  {
    id: 'prod_014',
    category: ProductCategory.PROBIOTICOS,
    name: 'crema-de-kefir-aceituna',
    slug: generateSlug('Crema de Kéfir con aceitunas'),
    title: 'Crema de Kéfir con aceitunas',
    price: 15,
    isNew: false,
    linkUrl: '/products/crema-de-kefir-aceituna',
    tags: ['recommended', 'discover'],

    featuredImage: '/assets/images/content/products/crema-de-kefir-aceitunas/featured.webp',
    thumbnailImage: '/assets/images/content/products/crema-de-kefir-aceitunas/thumbnail.png',
    galleryImages: [
      '/assets/images/content/products/crema-de-kefir-aceitunas/gallery-01.webp',
      '/assets/images/content/products/crema-de-kefir-aceitunas/gallery-03.webp',
      '/assets/images/content/products/crema-de-kefir-aceitunas/gallery-02.webp',
      '/assets/images/content/products/crema-de-kefir-aceitunas/gallery-04.webp',
      '/assets/images/content/products/crema-de-kefir-aceitunas/gallery-05.webp',
    ],

    hasDifferentOrder: false,

    shortDescription: 'Un superalimento crujiente para tu salud intestinal.',
    benefits: [
      'Cremosidad irresistible con el auténtico sabor de las aceitunas.',
      'Textura cremosa y suave, perfecta para untar o acompañar tus comidas.',
      '100% natural, sin conservantes. Ideal para quienes buscan una opción nutritiva y sabrosa para el día a día.',
    ],

    longDescription: (
      <>
        Nuestra Crema de Kéfir con Aceitunas combina la suavidad del kéfir con el sabor único de las aceitunas. Es una
        crema natural, fermentada y llena de vida, ideal para untar en pan, acompañar comidas o usar como dip saludable.
        El kéfir aporta probióticos que cuidan tu digestión, mientras que las aceitunas añaden grasas buenas y un toque
        mediterráneo delicioso.
      </>
    ),

    presentations: [{ id: 'chucrut-170g', name: '250 g' }],
  },

  /* {
    id: 'prod_009',
    category: ProductCategory.TRADICIONALES,
    name: 'mermelada-quito-quito',
    title: 'Mermelada de Quito Quito',
    isNew: true,
    linkUrl: '/products/mermelada-quito-quito',

    bgImageSrc: '/assets/images/content/products/kefir-de-chocolate/bg-card.webp',
    featuredImage: '/assets/images/content/products/kefir-de-chocolate/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-chocolate/thumbnail.webp',

    hasDifferentOrder: true,

    shortDescription: 'Sal de Maras, Cusco',
    longDescription: (
      <>
        Descubre la explosión de sabor andino con nuestra mermelada de Quito Quito, elaborada con frutos frescos traídos
        directamente de <strong>Oxapampa</strong>. Su textura suave y su dulzura natural la hacen perfecta para
        acompañar tus desayunos o snacks. Disponible con <strong>azúcar o stevia</strong>, para que elijas cómo
        disfrutarla.
      </>
    ),
    tags: ['new', 'recommended'],
  }, */
];
