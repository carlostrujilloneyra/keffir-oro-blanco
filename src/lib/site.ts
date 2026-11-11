/* URL base del sitio. Se usa en metadata, sitemap, robots y JSON-LD.
  En Vercel sale de VERCEL_PROJECT_PRODUCTION_URL: hoy trialferi.vercel.app y,
  al conectar un dominio propio, ese dominio (sin tocar código). */
const PRODUCTION_HOST = process.env.VERCEL_PROJECT_PRODUCTION_URL;

/* Sin esta variable, el build de producción publicaría canonical, sitemap y JSON-LD con localhost. */
if (process.env.VERCEL_ENV === 'production' && !PRODUCTION_HOST) {
  throw new Error(
    'Falta VERCEL_PROJECT_PRODUCTION_URL en el build de producción: sin ella el sitio se publicaría con http://localhost:3000.',
  );
}

export const SITE_URL = PRODUCTION_HOST ? `https://${PRODUCTION_HOST}` : 'http://localhost:3000';

export const SITE_NAME = 'TRIALFERI';
export const LOGO_PATH = '/assets/images/ui/logos/trialferi-logo.png';
export const CURRENCY = 'PEN';

export const WHATSAPP_NUMBER = '51941462492';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const WHATSAPP_DISPLAY = '941 462 492';
/* TODO: correo real. Mientras sea undefined no se muestra (footer) ni se publica (JSON-LD). */
export const CONTACT_EMAIL: string | undefined = undefined;

/* Enlace a WhatsApp con un mensaje precargado. */
export const buildWhatsAppUrl = (message: string) => `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
