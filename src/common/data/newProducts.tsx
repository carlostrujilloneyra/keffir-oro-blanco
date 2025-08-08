interface NewProduct {
  bgImageSrc: string;
  description: React.ReactNode;
  hasDifferentOrder?: boolean;
  imageAlt: string;
  imageSrc: string;
  isNew: boolean;
  linkUrl: string;
  name: string;
  title: string;
}

export const newProducts: NewProduct[] = [
  {
    bgImageSrc: '/assets/images/content/products/sal-de-maras/bg-card.webp',
    name: 'sal-de-maras',
    isNew: true,
    title: 'Sal de Maras, Cusco',
    imageSrc: '/assets/images/content/products/sal-de-maras/featured.webp',
    imageAlt: 'Bolsa de Sal de Maras',
    hasDifferentOrder: true,
    description: (
      <>
        Extraída a mano en las salineras milenarias de <strong>Maras</strong>, esta sal gourmet realza tus comidas y
        aporta minerales como magnesio, zinc, potasio y hierro. {''}
        <strong>Sin flúor ni aditivos químicos</strong>, es 100% natural y fiel a una tradición ancestral. Por sus
        cristales duros y gruesos, se recomienda usar un moledor para aprovechar al máximo su sabor y textura.
      </>
    ),

    linkUrl: 'aua',
  },

  {
    bgImageSrc: '/assets/images/content/products/vinagre-de-manzana/bg-card.webp',
    name: 'vinage-de-manzana',
    isNew: true,
    title: 'Vinagre de Manzana',
    imageSrc: '/assets/images/content/products/vinagre-de-manzana/featured.webp',
    imageAlt: 'Botella de Vinagre de Manzana',

    description: (
      <>
        ¿Y si el vinagre de manzana no supiera a vinagre? Olvida la acidez fuerte. Descubre una experiencia de bienestar{' '}
        {''}
        <strong>hecha con manzanas 100% ecológicas</strong> y un proceso artesanal que transforma su sabor: suave,
        equilibrado y delicioso. Ideal para tomarlo diluido o darle vida a tus comidas. Un aliado natural para{' '}
        <strong>tu digestión, defensas y bienestar diario.</strong>
      </>
    ),

    linkUrl: 'aua',
  },

  {
    bgImageSrc: '/assets/images/content/products/kefir-de-chocolate/bg-card.webp',
    name: 'kefir-chocolate',
    isNew: true,
    title: 'Kefir de Leche con Chocolate',
    imageSrc: '/assets/images/content/products/kefir-de-chocolate/featured.png',
    imageAlt: 'Botella de Kéfir de Leche con Chocolate',
    description: (
      <>
        Sumérgete en la cremosidad de nuestro kéfir de leche <strong>(vaca o cabra)</strong>, ahora enriquecido con el
        sabor profundo del auténtico <strong>cacao 100% artesanal</strong>. Traído desde los fértiles valles de
        Moyobamba y Quillabamba, este superalimento recarga tu cuerpo con minerales esenciales como hierro, calcio y
        magnesio. Disfruta el delicioso poder de sentirte bien.
      </>
    ),

    linkUrl: 'aua',
  },

  {
    bgImageSrc: '/assets/images/content/products/vinagre-de-manzana/bg-card.webp',
    name: 'mermelada-quito-quito',
    isNew: true,
    title: 'Mermelada de Quito Quito',
    imageSrc: '/assets/images/content/products/kefir-de-chocolate/featured.png',
    imageAlt: 'Envase de mermelada Quito Quito',
    description: (
      <>
        Descubre la explosión de sabor andino con nuestra mermelada de Quito Quito, elaborada con frutos frescos traídos
        directamente de <strong>Oxapampa</strong>. Su textura suave y su dulzura natural la hacen perfecta para
        acompañar tus desayunos o snacks. Disponible con <strong>azúcar o stevia</strong>, para que elijas cómo
        disfrutarla.
      </>
    ),

    linkUrl: 'aua',
  },
];
