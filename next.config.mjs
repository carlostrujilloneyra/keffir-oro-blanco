/** @type {import('next').NextConfig} */
const nextConfig = {
  // 308 permanentes: conservan enlaces ya compartidos y el posicionamiento de las URLs viejas.
  async redirects() {
    return [
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
