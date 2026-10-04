/* URL base del sitio. Se usa en metadata, sitemap, robots y JSON-LD.
  En Vercel sale de VERCEL_PROJECT_PRODUCTION_URL: hoy trialferi.vercel.app y,
  al conectar un dominio propio, ese dominio (sin tocar código). */
const PRODUCTION_HOST = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL = PRODUCTION_HOST ? `https://${PRODUCTION_HOST}` : 'http://localhost:3000';

export const SITE_NAME = 'TRIALFERI';
export const LOGO_PATH = '/assets/images/ui/logos/trialferi-logo.png';
export const CURRENCY = 'PEN';

export const WHATSAPP_NUMBER = '51923676457';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const WHATSAPP_DISPLAY = '+51 923 676 457';
export const CONTACT_EMAIL = 'aua@trialferi.com';

/* Enlace a WhatsApp con un mensaje precargado. */
export const buildWhatsAppUrl = (message: string) => `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
