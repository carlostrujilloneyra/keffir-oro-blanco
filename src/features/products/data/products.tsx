import { Product } from '../types/product.type';
import { ProductCategory } from './categories';

export const allProducts: Product[] = [
  {
    id: 'prod_001',
    category: ProductCategory.TRADICIONALES,
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
    category: ProductCategory.TRADICIONALES,
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

  {
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
    tags: ['new'],
  },
];
