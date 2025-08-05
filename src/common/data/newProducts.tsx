interface NewProduct {
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
    name: 'kefir-chocolate',
    isNew: true,
    title: 'Kefir de Leche con Chocolate',
    imageSrc: '/assets/images/content/products/kefir-de-chocolate/featured.png',
    imageAlt: 'Botella de Kéfir de Leche con Chocolate',
    description: (
      <>
        Sumérgete en la cremosidad de nuestro kéfir de leche <strong>(vaca o cabra)</strong>, ahora enriquecido con el
        sabor profundo del auténtico cacao 100% artesanal. Traído desde los fértiles valles de Moyobamba y Quillabamba,
        este superalimento recarga tu cuerpo con minerales esenciales como hierro, calcio y magnesio. Disfruta el
        delicioso poder de sentirte bien.
      </>
    ),

    linkUrl: '',
  },

  {
    name: 'vinage-de-manzana',
    isNew: true,
    title: 'Vinagre de Manzana',
    imageSrc: '/assets/images/content/products/vinagre-de-manzana/featured.webp',
    imageAlt: 'Botella de Vinagre de Manzana',
    hasDifferentOrder: true,
    description: (
      <>
        ¿Y si el vinagre de manzana no supiera a vinagre? Olvida la acidez fuerte. Descubre una experiencia de bienestar
        hecha con manzanas 100% orgánicas y un proceso artesanal que transforma su sabor: suave, equilibrado y
        delicioso. Ideal para tomarlo diluido o darle vida a tus comidas. Un aliado natural para tu digestión, defensas
        y bienestar diario.
      </>
    ),

    linkUrl: '',
  },

  {
    name: 'sal-de-maras',
    isNew: true,
    title: 'Sal de Maras, Cusco',
    imageSrc: '/assets/images/content/products/vinagre-de-manzana/featured.webp',
    imageAlt: 'Bolsa de Sal de Maras',
    description: (
      <>
        Extraída a mano en las salineras milenarias de Maras, en pleno corazón de los Andes, esta sal gourmet no solo
        resalta tus comidas, sino que también cuida tu salud. Rica en minerales esenciales como magnesio, zinc, potasio
        y hierro, <strong>no contiene flúor ni aditivos químicos</strong>. Es 100% natural y conserva la pureza de una
        tradición ancestral.
      </>
    ),

    linkUrl: '',
  },
];
