/* URL base del sitio (producción). Se usa en metadata, sitemap, robots y JSON-LD. */
export const SITE_URL = 'https://trialferi.com';

export const SITE_NAME = 'TRIALFERI';
export const CURRENCY = 'PEN';

export const WHATSAPP_NUMBER = '51923676457';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const WHATSAPP_DISPLAY = '+51 923 676 457';
export const CONTACT_EMAIL = 'aua@trialferi.com';

/* Enlace a WhatsApp con un mensaje precargado. */
export const buildWhatsAppUrl = (message: string) => `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
