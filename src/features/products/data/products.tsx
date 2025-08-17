import { Product } from '../types/product.type';
import { ProductCategory } from './categories';

export const allProducts: Product[] = [
  {
    id: 'prod_001',
    category: ProductCategory.OTROS,
    name: 'sal-de-maras',
    title: 'Sal de Maras, Cusco',
    isNew: true,
    linkUrl: '/productos/sal-de-maras',

    bgImageSrc: '/assets/images/content/products/sal-de-maras/bg-card.webp',
    featuredImage: '/assets/images/content/products/sal-de-maras/featured.webp',
    thumbnailImage: '/assets/images/content/products/sal-de-maras/thumbnail.webp',

    hasDifferentOrder: true,

    shortDescription: 'Sal de Maras, Cusco',
    longDescription: (
      <>
        Extraída a mano en las salineras milenarias de <strong>Maras</strong>, esta sal gourmet realza tus comidas y
        aporta minerales como magnesio, zinc, potasio y hierro. {''}
        <strong>Sin flúor ni aditivos químicos</strong>, es 100% natural y fiel a una tradición ancestral. Por sus
        cristales duros y gruesos, se recomienda usar un moledor para aprovechar al máximo su sabor y textura.
      </>
    ),

    presentations: [
      { id: 'sal-1kg', name: '1 Kg', price: 19.0 },
      { id: 'sal-2kg', name: '2 Kg', price: 35.0 },
    ],

    tags: ['new'],
  },

  {
    id: 'prod_002',
    category: ProductCategory.PROBIOTICOS,
    name: 'vinage-de-manzana',
    title: 'Vinagre de Manzana',
    isNew: true,
    linkUrl: '/productos/vinagre-de-manzana',

    bgImageSrc: '/assets/images/content/products/vinagre-de-manzana/bg-card.webp',
    featuredImage: '/assets/images/content/products/vinagre-de-manzana/featured.webp',
    thumbnailImage: '/assets/images/content/products/vinagre-de-manzana/thumbnail.webp',

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
    tags: ['new'],
  },

  {
    id: 'prod_003',
    category: ProductCategory.KEFIR_FRUTADO,
    name: 'kefir-chocolate',
    title: 'Kefir de Leche con Chocolate',
    isNew: true,
    linkUrl: '/productos/kefir-chocolate',

    bgImageSrc: '/assets/images/content/products/kefir-de-chocolate/bg-card.webp',
    featuredImage: '/assets/images/content/products/kefir-de-chocolate/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-chocolate/thumbnail.webp',

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
      { id: 'kefir-choco-500', name: '500 ml', price: 17.0 },
    ],

    tags: ['new'],
  },

  /* {
    id: 'prod_004',
    category: ProductCategory.TRADICIONALES,
    name: 'mermelada-quito-quito',
    title: 'Mermelada de Quito Quito',
    isNew: true,
    linkUrl: '/productos/mermelada-quito-quito',

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

  {
    id: 'prod_005',
    category: ProductCategory.LACTEOS,
    name: 'mantequilla-artesanal',
    title: 'Mantequilla Artesanal',
    isNew: false,
    linkUrl: '/productos/mantequilla-artesanal',
    tags: ['best-seller', 'main-product'],

    featuredImage: '/assets/images/content/products/mantequilla-artesanal/featured.webp',
    thumbnailImage: '/assets/images/content/products/mantequilla-artesanal/thumbnail.webp',

    hasDifferentOrder: false,

    shortDescription: 'Sabor y cremosidad 100% natural, sin aditivos.',
    benefits: [
      '100% Natural, sin conservantes.',
      'Elaborada con pura nata de leche.',
      'Sabor y cremosidad incomparables.',
      'Duración: 15 días.',
    ],

    longDescription: (
      <>
        Descubre el auténtico sabor de la mantequilla de verdad. Elaborada artesanalmente con{' '}
        <strong>nata de leche fresca de Canta</strong>, nuestra mantequilla no contiene aditivos ni conservantes. Su
        textura cremosa y su sabor puro son ideales para tus desayunos, postres o para darle un toque gourmet a
        cualquier platillo.
      </>
    ),

    presentations: [
      { id: 'mantequilla-200g', name: '200 g' },
      { id: 'mantequilla-250g', name: '250 g' },
      { id: 'mantequilla-500g', name: '500 g' },
    ],
  },

  {
    id: 'prod_006',
    category: ProductCategory.LACTEOS,
    name: 'queso-cuajo-cabra',
    title: 'Queso con Cuajo de Cabra',
    isNew: false,
    linkUrl: '/productos/queso-cuajo-cabra',
    tags: ['recommended'],

    bgImageSrc: '/assets/images/content/products/queso-natural/bg-card.webp',
    featuredImage: '/assets/images/content/products/queso-natural/featured.webp',
    thumbnailImage: '/assets/images/content/products/sal-de-maras/thumbnail.webp',

    hasDifferentOrder: false,

    shortDescription: 'Queso fresco y artesanal de sabor único.',
    longDescription: (
      <>
        Nuestro queso fresco se elabora siguiendo la tradición, utilizando{' '}
        <strong>leche fresca de cabras de libre pastoreo y cuajo natural</strong>. El resultado es un queso de textura
        suave y sabor delicado, perfecto para ensaladas, piqueos o simplemente para disfrutar de un producto 100%
        natural y lleno de carácter.
      </>
    ),

    presentations: [{ id: 'queso-500g', name: 'Diferentes pesos' }],
  },

  {
    id: 'prod_007',
    category: ProductCategory.KEFIR_FRUTADO,
    name: 'kefir-arandanos',
    title: 'Kéfir de Leche con Arándanos',
    isNew: false,
    linkUrl: '/productos/kefir-arandanos',
    tags: ['best-seller', 'recommended'],

    featuredImage: '/assets/images/content/products/kefir-frutado-arandanos/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-frutado-arandanos/thumbnail.webp',

    hasDifferentOrder: false,

    shortDescription: 'Un impulso de antioxidantes y probióticos.',
    longDescription: (
      <>
        Potencia tu bienestar con la combinación perfecta de nuestro cremoso kéfir de leche y{' '}
        <strong>arándanos silvestres</strong>. Cada sorbo es una explosión de sabor y un impulso para tu salud, cargado
        de antioxidantes y probióticos que fortalecen tu sistema inmune y cuidan tu digestión.
      </>
    ),

    presentations: [
      { id: 'kefir-arandanos-300', name: '300 ml', price: 10.0 },
      { id: 'kefir-arandanos-500', name: '500 ml', price: 15.0 },
      { id: 'kefir-arandanos-1l', name: '1 Litro', price: 27.0 },
    ],
  },

  {
    id: 'prod_008',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-de-agua',
    title: 'Kéfir de Agua',
    isNew: false,
    linkUrl: '/productos/kefir-de-agua',
    tags: ['recommended'],

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
      { id: 'kefir-agua-500', name: '500 ml', price: 16.0 },
      { id: 'kefir-agua-1l', name: '1 Litro', price: 28.0 },
    ],
  },

  {
    id: 'prod_009',
    category: ProductCategory.TRADICIONALES,
    name: 'manteca-de-cerdo',
    title: 'Manteca de Cerdo Artesanal',
    isNew: false,
    linkUrl: '/productos/manteca-de-cerdo',
    tags: ['recommended', 'best-seller'],

    featuredImage: '/assets/images/content/products/manteca-de-cerdo/featured.webp',
    thumbnailImage: '/assets/images/content/products/manteca-de-cerdo/thumbnail.webp',

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
    id: 'prod_010',
    category: ProductCategory.PROBIOTICOS,
    name: 'chucrut-morado',
    title: 'Chucrut Morado Fermentado',
    isNew: false,
    linkUrl: '/productos/chucrut-morado',
    tags: ['recommended', 'main-product'],

    featuredImage: '/assets/images/content/products/vinagre-de-manzana/thumbnail.webp',
    thumbnailImage: '/assets/images/content/products/vinagre-de-manzana/thumbnail.webp',

    hasDifferentOrder: false,

    shortDescription: 'Un superalimento crujiente para tu salud intestinal.',
    benefits: [
      'Rico en probióticos y vitaminas.',
      'Potente fuente de antioxidantes.',
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
    id: 'prod_011',
    category: ProductCategory.LACTEOS,
    name: 'kefir-leche-vaca',
    title: 'Kéfir de Leche de Vaca',
    isNew: false,
    linkUrl: '/productos/kefir-leche-vaca',
    tags: ['best-seller'],

    featuredImage: '/assets/images/content/products/kefir-de-leche/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-leche/thumbnail.webp',

    hasDifferentOrder: false,

    shortDescription: 'El clásico probiótico, cremoso y lleno de beneficios.',
    longDescription: (
      <>
        El pilar del bienestar digestivo. Nuestro Kéfir de Leche de Vaca es un probiótico natural, cremoso y de sabor
        suave, elaborado con <strong>leche fresca de pastoreo</strong>. Cada sorbo está lleno de millones de
        microorganismos beneficiosos que trabajan para{' '}
        <strong>fortalecer tu microbiota, mejorar tu digestión y reforzar tu sistema inmune</strong>.
      </>
    ),

    presentations: [
      { id: 'kefir-vaca-500', name: '500 ml', price: 13.0 },
      { id: 'kefir-vaca-1l', name: '1 Litro', price: 23.0 },
    ],
  },

  {
    id: 'prod_012',
    category: ProductCategory.LACTEOS,
    name: 'kefir-leche-cabra',
    title: 'Kéfir de Leche de Cabra',
    isNew: false,
    linkUrl: '/productos/kefir-leche-cabra',
    tags: ['recommended'],

    featuredImage: '/assets/images/content/products/vinagre-de-manzana/thumbnail.webp',
    thumbnailImage: '/assets/images/content/products/vinagre-de-manzana/thumbnail.webp',

    hasDifferentOrder: false,

    shortDescription: 'Nutritivo, suave y más fácil de digerir.',
    longDescription: (
      <>
        Para quienes buscan una opción aún más nutritiva y suave. El Kéfir de Leche de Cabra es conocido por ser{' '}
        <strong>más fácil de digerir</strong> que el de vaca, gracias a sus moléculas de grasa más pequeñas. Disfruta de
        todos los beneficios probióticos con un <strong>perfil nutricional superior</strong> y un sabor ligeramente más
        ácido y característico.
      </>
    ),

    presentations: [
      { id: 'kefir-cabra-500', name: '500 ml', price: 14.0 },
      { id: 'kefir-cabra-1l', name: '1 Litro', price: 24.0 },
    ],
  },
];
