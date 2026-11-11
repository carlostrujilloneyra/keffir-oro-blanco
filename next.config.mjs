/** @type {import('next').NextConfig} */
const nextConfig = {
  // 308 permanentes: conservan enlaces ya compartidos y el posicionamiento de las URLs viejas.
  async redirects() {
    return [
      /* Productos retirados o renombrados. Van antes del comodín /products/:slug, que no los toca (otro prefijo). */
      {
        source: '/productos/kefir-aguaymanto-475ml',
        destination: '/categorias/probioticos/kefir-frutado',
        permanent: true,
      },
      {
        source: '/productos/kombucha-frambuesa-355ml',
        destination: '/categorias/probioticos/kombucha-y-kefir-de-agua',
        permanent: true,
      },
      {
        source: '/productos/vinagre-de-manzana',
        destination: '/categorias/tradicionales/para-cocinar',
        permanent: true,
      },
      {
        source: '/productos/manteca-de-cerdo-100ml',
        destination: '/productos/manteca-de-cerdo-580ml',
        permanent: true,
      },
      {
        source: '/productos/manteca-de-cerdo-500ml',
        destination: '/productos/manteca-de-cerdo-580ml',
        permanent: true,
      },
      {
        source: '/productos/manteca-de-cerdo-300ml',
        destination: '/productos/manteca-de-cerdo-370ml',
        permanent: true,
      },
      { source: '/products', destination: '/productos', permanent: true },
      { source: '/products/:slug', destination: '/productos/:slug', permanent: true },
      // /categorias no tiene índice propio: el catálogo agrupado cumple ese rol.
      { source: '/categorias', destination: '/productos', permanent: true },
      {
        source: '/categorias/probioticos/kefir-de-agua',
        destination: '/categorias/probioticos/kombucha-y-kefir-de-agua',
        permanent: true,
      },
      {
        source: '/categorias/probioticos/kombucha',
        destination: '/categorias/probioticos/kombucha-y-kefir-de-agua',
        permanent: true,
      },
      {
        source: '/categorias/tradicionales/manteca-de-cerdo',
        destination: '/categorias/tradicionales/para-cocinar',
        permanent: true,
      },
      {
        source: '/categorias/tradicionales/despensa',
        destination: '/categorias/tradicionales/para-cocinar',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
