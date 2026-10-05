/** @type {import('next').NextConfig} */
const nextConfig = {
  // 308 permanentes: conservan enlaces ya compartidos y el posicionamiento de las URLs viejas.
  async redirects() {
    return [
      { source: '/products', destination: '/productos', permanent: true },
      { source: '/products/:slug', destination: '/productos/:slug', permanent: true },
      // /categorias no tiene índice propio: el catálogo agrupado cumple ese rol.
      { source: '/categorias', destination: '/productos', permanent: true },
    ];
  },
};

export default nextConfig;
