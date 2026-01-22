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
    tags: ['new', 'natural', 'artisan'],

    bgImageSrc: '/assets/images/content/products/sal-de-maras/bg-card.webp',
    featuredImage: '/assets/images/content/products/sal-de-maras/featured.webp',
    thumbnailImage: '/assets/images/content/products/sal-de-maras/thumbnail.webp',

    hasDifferentOrder: false,

    shortDescription: 'Sal gourmet extraída de las salineras milenarias de Maras, Cusco.',
    longDescription: (
      <>
        <p>
          Extraída a mano en las <strong>salineras milenarias de Maras</strong>, ubicadas en el Valle Sagrado de los
          Incas en Cusco, esta sal gourmet es un tesoro ancestral que ha sido cosechado de la misma forma durante más de
          500 años.
        </p>

        <p>
          Rica en minerales naturales como <strong>magnesio, zinc, potasio y hierro</strong>, esta sal rosada realza el
          sabor de tus comidas mientras aporta nutrientes esenciales. <strong>Sin flúor ni aditivos químicos</strong>,
          es 100% natural y fiel a una tradición que se remonta a la época preincaica.
        </p>

        <p>
          Por sus cristales duros y gruesos, se recomienda usar un <strong>moledor de sal</strong> para aprovechar al
          máximo su sabor, textura y propiedades.
        </p>
      </>
    ),

    presentations: [
      { id: 'sal-1kg', name: '1 kilo', price: 19.0 },
      { id: 'sal-2kg', name: '2 kilos', price: 35.0 },
    ],

    benefits: [
      'Extraída <strong>artesanalmente</strong> de las salineras milenarias de Maras, Cusco.',
      'Rica en <strong>minerales naturales</strong>: magnesio, zinc, potasio y hierro.',
      '<strong>100% natural</strong>, sin flúor, yodo añadido ni aditivos químicos.',
      'Sal gourmet de <strong>calidad premium</strong> con sabor único y distintivo.',
      'Tradición ancestral de más de <strong>500 años</strong> de historia.',
      'Ideal para <strong>realzar el sabor</strong> de cualquier preparación culinaria.',
    ],

    howToUse: (
      <>
        <p>
          Perfecta para <strong>sazonar todo tipo de alimentos</strong>: carnes, pescados, ensaladas, sopas, guisos y
          más. Su sabor suave y equilibrado realza los ingredientes sin dominarlos.
        </p>
        <p>
          Debido a sus <strong>cristales gruesos y duros</strong>, se recomienda usar un moledor de sal para obtener la
          textura deseada. También puedes usarla en grano grueso como sal de acabado para dar un toque gourmet a tus
          platos.
        </p>
        <p>
          <strong>Conservación:</strong> Mantener en un lugar fresco y seco, en un recipiente hermético para preservar
          sus propiedades.
        </p>
      </>
    ),

    shelfLife: 'Indefinida',
  },

  {
    id: 'prod_002',
    category: ProductCategory.TRADICIONALES,
    name: 'manteca-de-cerdo',
    slug: generateSlug('Manteca de Cerdo Artesanal'),
    title: 'Manteca de Cerdo Artesanal',
    price: 20.0,
    isNew: false,
    linkUrl: '/products/manteca-de-cerdo',
    tags: ['artisan', 'best-seller'],

    featuredImage: '/assets/images/content/products/manteca-de-cerdo/gallery-01.webp',
    thumbnailImage: '/assets/images/content/products/manteca-de-cerdo/thumbnail.webp',
    galleryImages: [
      '/assets/images/content/products/manteca-de-cerdo/gallery-02.webp',
      '/assets/images/content/products/manteca-de-cerdo/gallery-03.webp',
      '/assets/images/content/products/manteca-de-cerdo/gallery-04.webp',
      '/assets/images/content/products/manteca-de-cerdo/gallery-05.webp',
    ],

    hasDifferentOrder: false,

    shortDescription: 'El secreto de la cocina tradicional para un sabor inigualable.',
    longDescription: (
      <>
        <p>
          Vuelve al origen del sabor con nuestra <strong>Manteca de Cerdo 100% natural y artesanal</strong>. Elaborada
          de forma tradicional, sin aditivos ni conservantes, rescatando el auténtico sabor de la cocina de nuestras
          abuelas.
        </p>

        <p>
          Ideal para freír, hornear o dar un toque de sabor auténtico a tus guisos, es una{' '}
          <strong>alternativa saludable a los aceites procesados</strong>. Rica en grasas estables al calor y con un
          punto de humo alto, es perfecta para cocinar a altas temperaturas sin oxidarse.
        </p>
      </>
    ),

    presentations: [
      { id: 'manteca-300g', name: '300 g', price: 20.0 },
      { id: 'manteca-500g', name: '500 g', price: 32.0 },
      { id: 'manteca-1kilo', name: '1 Kilo', price: 61.5 },
    ],

    benefits: [
      '<strong>100% natural y artesanal</strong>, elaborada de forma tradicional sin aditivos.',
      'Rica en <strong>grasas estables al calor</strong>, ideal para freír y cocinar a altas temperaturas.',
      '<strong>Alternativa saludable</strong> a los aceites vegetales procesados e hidrogenados.',
      'Aporta <strong>sabor auténtico</strong> y textura inigualable a tus preparaciones.',
      'Alto punto de humo, <strong>no se oxida</strong> fácilmente durante la cocción.',
      'Fuente de <strong>vitaminas liposolubles</strong> (A, D, E, K) que el cuerpo absorbe mejor.',
    ],

    howToUse: (
      <>
        <p>
          Perfecta para <strong>freír, hornear, saltear y cocinar</strong> todo tipo de alimentos. Úsala en lugar de
          aceites vegetales para obtener mejores resultados y un sabor más auténtico.
        </p>
        <p>
          Ideal para preparar <strong>chicharrones, papas fritas, tamales, empanadas</strong> y cualquier receta
          tradicional. También puedes usarla para enriquecer guisos, arroces y sopas con un toque de sabor único.
        </p>
        <p>
          <strong>Conservación:</strong> Mantener en lugar fresco y seco. Puede refrigerarse para mayor duración.
        </p>
      </>
    ),

    shelfLife: '1 año',
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
    tags: ['new', 'natural', 'healthy'],

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

    shortDescription: 'Vinagre artesanal con madre, suave y lleno de beneficios.',
    longDescription: (
      <>
        <p>
          ¿Y si el vinagre de manzana no supiera a vinagre? Olvida la acidez fuerte. Descubre una experiencia de
          bienestar <strong>hecha con manzanas 100% ecológicas</strong> y un proceso artesanal que transforma su sabor:
          suave, equilibrado y delicioso.
        </p>

        <p>
          Nuestro vinagre de manzana conserva la <strong>&ldquo;madre&rdquo; del vinagre</strong>, esa nube natural que
          contiene enzimas, probióticos y ácidos orgánicos beneficiosos. Ideal para tomarlo diluido en agua o darle vida
          a tus ensaladas, aderezos y marinados.
        </p>

        <p>
          Un aliado natural para <strong>tu digestión, defensas y bienestar diario</strong>, elaborado con paciencia y
          respeto por la tradición.
        </p>
      </>
    ),

    presentations: [
      { id: 'vinagre-500', name: '500 ml', price: 17.0 },
      { id: 'vinagre-1l', name: '1 Litro', price: 30.0 },
    ],

    benefits: [
      'Elaborado con <strong>manzanas 100% ecológicas</strong> mediante fermentación natural.',
      'Conserva la <strong>&ldquo;madre&rdquo; del vinagre</strong> con enzimas y probióticos beneficiosos.',
      'Apoya la <strong>digestión saludable</strong> y el equilibrio del pH estomacal.',
      'Sabor <strong>suave y equilibrado</strong>, sin la acidez agresiva de vinagres industriales.',
      '<strong>100% natural</strong>, sin pasteurizar, sin filtrar, sin aditivos.',
      'Versátil en la cocina: aderezos, marinados, bebidas y más.',
    ],

    howToUse: (
      <>
        <p>
          <strong>Para beber:</strong> Diluye 1-2 cucharadas en un vaso de agua tibia, preferiblemente en ayunas o antes
          de las comidas. Puedes agregar miel para endulzar.
        </p>
        <p>
          <strong>En la cocina:</strong> Úsalo en aderezos para ensaladas, marinados para carnes, salsas, encurtidos y
          como toque ácido en sopas y guisos.
        </p>
        <p>
          <strong>Conservación:</strong> Mantener en lugar fresco y oscuro. La &ldquo;madre&rdquo; puede sedimentarse,
          agita antes de usar.
        </p>
      </>
    ),

    shelfLife: '2 años',
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
    price: 11.0,
    isNew: true,
    linkUrl: '/products/kefir-chocolate',
    tags: ['new', 'probiotic'],

    bgImageSrc: '/assets/images/content/products/kefir-de-chocolate/bg-card.webp',
    featuredImage: '/assets/images/content/products/kefir-de-chocolate/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-chocolate/featured.webp',

    hasDifferentOrder: false,

    shortDescription: 'Cremosidad probiótica con el poder del cacao artesanal.',
    longDescription: (
      <>
        <p>
          Sumérgete en la cremosidad de nuestro kéfir de leche, ahora enriquecido con el sabor profundo del auténtico{' '}
          <strong>cacao 100% artesanal</strong>. Traído desde los fértiles valles de Moyobamba y Quillabamba, este
          superalimento combina los beneficios probióticos del kéfir con las propiedades del cacao puro.
        </p>

        <p>
          Cada sorbo recarga tu cuerpo con <strong>minerales esenciales como hierro, calcio y magnesio</strong>, además
          de antioxidantes naturales del cacao. Es el equilibrio perfecto entre placer y bienestar, sin azúcares
          añadidos ni saborizantes artificiales.
        </p>
      </>
    ),

    presentations: [
      { id: 'kefir-choco-350', name: '350 ml', price: 11.0 },
      { id: 'kefir-choco-475', name: '475 ml', price: 17.0 },
      { id: 'kefir-choco-1l', name: '1 Litro', price: 29.0 },
    ],

    benefits: [
      'Refuerza la <strong>flora intestinal</strong> con bacterias buenas del kéfir.',
      'Rico en <strong>minerales esenciales</strong>: hierro, calcio y magnesio del cacao.',
      'Fuente de <strong>antioxidantes naturales</strong> del cacao 100% artesanal.',
      'Apoya tu <strong>sistema inmunológico</strong> y digestivo naturalmente.',
      'Producto 100% natural, <strong>sin azúcares añadidos</strong> ni saborizantes artificiales.',
      'Apto para personas que tienen <strong>intolerancia a la lactosa</strong> debido a que el Kéfir cuenta con un % bajo de lactosa.',
    ],

    howToUse: (
      <>
        <p>
          Listo para consumir. Puede tomarse solo como un delicioso snack saludable o acompañar frutas, granola y otras
          preparaciones frías.
        </p>
        <p>
          Para personas que lo consumen por <strong>primera vez</strong>, se sugiere iniciar con porciones pequeñas{' '}
          <strong>(shots de 30 ml)</strong> e incrementar gradualmente según tolerancia.
        </p>
        <p>
          Ideal como <strong>post-entreno</strong> o como alternativa saludable a los batidos de chocolate procesados.
        </p>
      </>
    ),

    shelfLife: '15 días',
  },

  {
    id: 'prod_012',
    category: ProductCategory.PROBIOTICOS,
    name: 'kefir-de-agua',
    slug: generateSlug('Kéfir de Agua'),
    title: 'Kéfir de Agua',
    price: 16.0,
    isNew: false,
    linkUrl: '/products/kefir-de-agua',
    tags: ['recommended', 'best-seller', 'vegan'],

    bgImageSrc: '/assets/images/content/products/kefir-de-agua/bg-card.webp',
    featuredImage: '/assets/images/content/products/kefir-de-agua/featured.webp',
    thumbnailImage: '/assets/images/content/products/kefir-de-agua/featured.webp',

    hasDifferentOrder: false,

    shortDescription: 'La bebida probiótica refrescante, vegana y naturalmente burbujeante.',
    longDescription: (
      <>
        <p>
          Descubre la alternativa <strong>vegana y sin lácteos</strong> al kéfir tradicional. Nuestro Kéfir de Agua es
          una bebida <strong>viva, fermentada y deliciosamente refrescante</strong>, elaborada mediante fermentación
          natural con tibicos (gránulos de kéfir de agua).
        </p>

        <p>
          Llena de millones de probióticos que ayudan a equilibrar tu flora intestinal y a potenciar tu energía, es la
          forma perfecta de hidratarte y cuidarte al mismo tiempo. Con su <strong>efervescencia natural</strong> y sabor
          suave, es una alternativa saludable a las bebidas gaseosas comerciales.
        </p>
      </>
    ),

    presentations: [
      { id: 'kefir-agua-475', name: '475 ml', price: 16.0 },
      { id: 'kefir-agua-1l', name: '1 Litro', price: 28.0 },
    ],

    benefits: [
      '<strong>100% vegano</strong>, sin lácteos, ideal para dietas plant-based.',
      'Refuerza la <strong>flora intestinal</strong> con probióticos naturales.',
      '<strong>Naturalmente burbujeante</strong>, alternativa saludable a las gaseosas.',
      'Bajo en calorías y <strong>sin azúcares añadidos</strong>.',
      'Hidrata y <strong>potencia tu energía</strong> de forma natural.',
      'Producto 100% natural, sin conservantes ni aditivos artificiales.',
    ],

    howToUse: (
      <>
        <p>
          Listo para consumir. Disfrútalo <strong>bien frío</strong> como bebida refrescante en cualquier momento del
          día. Ideal para acompañar comidas o como alternativa saludable a las bebidas azucaradas.
        </p>
        <p>
          Para personas que lo consumen por <strong>primera vez</strong>, se sugiere iniciar con porciones pequeñas{' '}
          <strong>(shots de 30 ml)</strong> e incrementar gradualmente según tolerancia.
        </p>
        <p>
          <strong>Tip:</strong> Agita suavemente antes de servir para distribuir los probióticos. Puedes agregar frutas
          frescas o hierbas para personalizar el sabor.
        </p>
      </>
    ),

    shelfLife: '15 días',
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
    tags: ['recommended', 'discover', 'vegan', 'natural'],

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
    longDescription: (
      <>
        <p>
          Añade un toque de color y un universo de beneficios a tus platos. Nuestro Chucrut Morado es{' '}
          <strong>col morada fermentada lentamente de forma natural</strong>, creando un alimento probiótico crujiente y
          delicioso mediante el proceso ancestral de lactofermentación.
        </p>

        <p>
          Es el acompañamiento perfecto para ensaladas, carnes, sándwiches y bowls, y una fuente increíble de{' '}
          <strong>vitaminas, enzimas digestivas y antioxidantes</strong>. Su sabor suave y ligeramente ácido realza
          cualquier preparación mientras cuida tu salud intestinal.
        </p>
      </>
    ),

    presentations: [
      { id: 'chucrut-170g', name: '170 g', price: 14.0 },
      { id: 'chucrut-360g', name: '360 g', price: 25.0 },
    ],

    benefits: [
      'Mejora tu <strong>digestión</strong> y equilibra tu flora intestinal con probióticos naturales.',
      'Potente fuente de <strong>antioxidantes</strong> que protegen tus células del envejecimiento.',
      'Sabor <strong>suave y ligeramente dulce</strong>, perfecto para acompañar cualquier plato.',
      'Fortalece el <strong>sistema inmunológico</strong> de forma natural.',
      '<strong>100% vegano</strong>, sin lácteos, ideal para todas las dietas.',
      'Rico en <strong>vitamina C y K</strong>, fibra y enzimas digestivas.',
    ],

    howToUse: (
      <>
        <p>
          Listo para consumir. Úsalo como <strong>acompañamiento</strong> en ensaladas, sándwiches, hamburguesas, tacos,
          bowls o como guarnición para carnes y pescados.
        </p>
        <p>
          <strong>Tip culinario:</strong> No lo cocines, consúmelo frío o a temperatura ambiente para preservar sus
          probióticos vivos. Agrega un tenedor lleno a tus comidas para un toque crujiente y saludable.
        </p>
        <p>
          <strong>Conservación:</strong> Mantener refrigerado. Una vez abierto, consumir dentro de 2 semanas.
        </p>
      </>
    ),

    shelfLife: '3 meses',
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
    tags: ['recommended', 'discover', 'probiotic'],

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

    shortDescription: 'Cremosidad probiótica con el sabor mediterráneo de las aceitunas.',
    longDescription: (
      <>
        <p>
          Nuestra Crema de Kéfir con Aceitunas combina la suavidad del <strong>kéfir fermentado</strong> con el sabor
          único e intenso de las <strong>aceitunas mediterráneas</strong>. Es una crema natural, fermentada y llena de
          vida, ideal para untar en pan, acompañar comidas o usar como dip saludable.
        </p>

        <p>
          El kéfir aporta <strong>probióticos que cuidan tu digestión</strong>, mientras que las aceitunas añaden{' '}
          <strong>grasas saludables</strong> y un toque mediterráneo delicioso. Perfecta para quienes buscan opciones
          gourmet y nutritivas.
        </p>
      </>
    ),

    presentations: [
      { id: 'crema-kefir-250g', name: '250 g', price: 15.0 },
      { id: 'crema-kefir-500g', name: '500 g', price: 27.0 },
    ],

    benefits: [
      '<strong>Cremosidad irresistible</strong> con el auténtico sabor de las aceitunas mediterráneas.',
      'Aporta <strong>probióticos naturales</strong> del kéfir que cuidan tu digestión.',
      'Rica en <strong>grasas saludables</strong> de las aceitunas (omega-9).',
      'Textura cremosa y suave, perfecta para <strong>untar o acompañar</strong> tus comidas.',
      '<strong>100% natural</strong>, sin conservantes ni aditivos artificiales.',
      'Ideal para quienes buscan una opción <strong>nutritiva y gourmet</strong> para el día a día.',
    ],

    howToUse: (
      <>
        <p>
          Perfecta para <strong>untar en pan, tostadas o crackers</strong>. También puedes usarla como dip para
          vegetales crudos, como base para sándwiches gourmet o como acompañamiento para carnes y pescados.
        </p>
        <p>
          <strong>Tip culinario:</strong> Úsala como alternativa saludable a la mayonesa o crema ácida en tus recetas.
          Combina deliciosamente con tomates, pepinos y pimientos.
        </p>
        <p>
          <strong>Conservación:</strong> Mantener refrigerado. Una vez abierto, consumir dentro de 1 semana.
        </p>
      </>
    ),

    shelfLife: '15 días',
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
