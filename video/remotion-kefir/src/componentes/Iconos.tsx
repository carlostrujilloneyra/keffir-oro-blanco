import React from 'react';
import {rampa} from '../anim';

// Íconos de línea fina dibujados a mano para este video (trazo 1.9, caja de 48).
type P = {tam?: number; color?: string};
const Svg: React.FC<P & {children: React.ReactNode}> = ({tam = 48, color = 'currentColor', children}) => (
  <svg width={tam} height={tam} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink: 0}}>
    {children}
  </svg>
);

export const IconoProbioticos: React.FC<P> = (p) => (
  <Svg {...p}>
    <rect x="7" y="19" width="19" height="9" rx="4.5" transform="rotate(-32 16.5 23.5)" />
    <rect x="23" y="27" width="18" height="8.5" rx="4.25" transform="rotate(18 32 31)" />
    <rect x="26" y="8" width="14" height="7.5" rx="3.75" transform="rotate(-12 33 12)" />
    <circle cx="11" cy="37" r="2" />
    <circle cx="20.5" cy="39.5" r="1.3" />
  </Svg>
);

export const IconoLactosa: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M24 5C24 5 10 20.5 10 29.5a14 14 0 0 0 28 0C38 20.5 24 5 24 5Z" />
    <path d="M24 21v13M18.5 29l5.5 5.5 5.5-5.5" />
  </Svg>
);

export const IconoMicrobiota: React.FC<P> = (p) => (
  <Svg {...p}>
    <circle cx="24" cy="24" r="6" />
    {[0, 60, 120, 180, 240, 300].map((a) => (
      <circle key={a} cx={24 + Math.cos((a * Math.PI) / 180) * 14.5} cy={24 + Math.sin((a * Math.PI) / 180) * 14.5} r={a % 120 ? 3.2 : 4.6} />
    ))}
  </Svg>
);

export const IconoEquilibrio: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M24 9v30M15 39h18M8 15h32" />
    <path d="M8 15l-4.5 11a5.2 5.2 0 0 0 9 0L8 15ZM40 15l-4.5 11a5.2 5.2 0 0 0 9 0L40 15Z" />
  </Svg>
);

export const IconoSol: React.FC<P> = (p) => (
  <Svg {...p}>
    <circle cx="24" cy="24" r="8" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
      const c = Math.cos((a * Math.PI) / 180), s = Math.sin((a * Math.PI) / 180);
      return <path key={a} d={`M${24 + c * 13.5} ${24 + s * 13.5}L${24 + c * 18.5} ${24 + s * 18.5}`} />;
    })}
  </Svg>
);

export const IconoLuna: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M38 28.5A16 16 0 1 1 19.5 10a12.5 12.5 0 0 0 18.5 18.5Z" />
  </Svg>
);

export const IconoSubir: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M7 38h8V28h9V18h9V8h8" />
  </Svg>
);

// Check que se dibuja en el cue (pathLength normaliza el trazo a 1).
export const Check: React.FC<P & {t: number; en: number}> = ({t, en, ...p}) => (
  <Svg {...p}>
    <path d="M8 25.5l10.5 10.5L41 12" strokeWidth="4.4" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - rampa(t, en, en + 0.42)} />
  </Svg>
);

export const IconoWhatsApp: React.FC<{tam?: number}> = ({tam = 48}) => (
  <svg width={tam} height={tam} viewBox="0 0 48 48" style={{flexShrink: 0}}>
    <path d="M24 3a21 21 0 0 0-18 31.8L3.4 44.6l10-2.6A21 21 0 1 0 24 3Z" fill="#25D366" />
    <path d="M17.6 13.4c-.5-1-.9-1-1.4-1h-1.2c-.4 0-1.1.2-1.7.8-.6.6-2.2 2.2-2.2 5.300s2.300 6.100 2.600 6.500c.3.400 4.400 7 10.900 9.500 5.400 2.100 6.500 1.700 7.700 1.600 1.200-.1 3.800-1.500 4.300-3 .5-1.500.5-2.800.4-3-.2-.300-.600-.400-1.200-.800l-4.400-2.100c-.600-.200-1-.300-1.500.300-.4.600-1.700 2.100-2.100 2.500-.4.400-.8.500-1.400.200-.600-.300-2.700-1-5.100-3.200-1.900-1.700-3.200-3.800-3.500-4.400-.4-.6 0-1 .3-1.300l1-1.100c.3-.4.4-.6.6-1 .2-.5.1-.8 0-1.100l-2-4.700Z" fill="#fff" />
  </svg>
);

export const IconoTikTok: React.FC<{tam?: number; color?: string}> = ({tam = 48, color = '#fff'}) => (
  <svg width={tam} height={tam} viewBox="0 0 48 48" style={{flexShrink: 0}}>
    <path d="M31.2 5h-6.400v25.800a5.400 5.400 0 1 1-5.400-5.400c.5 0 1 .1 1.500.2v-6.500a11.800 11.800 0 1 0 10.300 11.700V17.600a15 15 0 0 0 8.800 2.800V14a8.900 8.900 0 0 1-8.800-9Z" fill={color} />
  </svg>
);

// Íconos de los chips de la imagen fija de EcoCultivo (mismo trazo y caja que los de arriba).
export const IconoArtesanal: React.FC<P> = (p) => (
  <Svg {...p}>
    <rect x="27" y="3" width="6" height="21" rx="3" transform="rotate(35 30 13.5)" />
    <path d="M6 24h36" />
    <path d="M8.5 24c0 8.5 6.8 14 15.5 14s15.5-5.5 15.5-14" />
    <path d="M17 38l-1.5 5h17L31 38" />
  </Svg>
);

export const IconoSinAzucar: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M24 8l14 7v17l-14 7-14-7V15Z" />
    <path d="M10 15l14 7 14-7M24 22v17" />
    <path d="M7 41L41 7" />
  </Svg>
);

export const IconoFresa: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M24 43c-8.5-3.5-15-11.5-15-20 0-5 3.8-8 8.5-8 2.6 0 4.6.8 6.5 2 1.9-1.2 3.9-2 6.5-2 4.7 0 8.5 3 8.5 8 0 8.5-6.5 16.5-15 20Z" />
    <path d="M16.5 12l7.5 4 7.5-4M24 16V6" />
    <path d="M19 24h.01M29 24h.01M24 29h.01M19.5 33.5h.01M28.5 33.5h.01M24 37.5h.01" strokeWidth="2.8" />
  </Svg>
);

export const IconoSinConservantes: React.FC<P> = (p) => (
  <Svg {...p}>
    <rect x="15" y="5" width="18" height="7" rx="1.8" />
    <path d="M13 16a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v22a5 5 0 0 1-5 5H18a5 5 0 0 1-5-5Z" />
    <path d="M18 28.5l4.5 4.5 8-8.5" />
  </Svg>
);

export const IconoVacaCabra: React.FC<P> = (p) => (
  <Svg {...p}>
    {/* vaca: cabeza ancha, cuernos hacia los lados */}
    <path d="M8.5 19c0-2 2-3.5 5-3.5s5 1.5 5 3.5v9.5c0 4-2.2 7-5 7s-5-3-5-7Z" />
    <path d="M8.5 18C5.5 18 3.5 15.5 4 12.5M18.5 18c3 0 5-2.5 4.5-5.5M11 31h5" />
    {/* cabra: cabeza angosta, cuernos hacia atrás y barba */}
    <path d="M31.5 21c0-1.8 1.5-3 3.5-3s3.5 1.2 3.5 3v8.5c0 3-1.6 5-3.5 5s-3.5-2-3.5-5Z" />
    <path d="M32.5 19c-1-4.5 1.5-9 6-10M37.5 19c.5-3.5 3-6 6-6.5M35 34.5l-1.5 5.5 1.5-1.2 1.5 1.2Z" />
  </Svg>
);

// WhatsApp de línea (globo con teléfono), para el pie de la imagen fija de EcoCultivo
export const IconoWhatsAppLinea: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M24 6a18 18 0 0 0-15.4 27.3L6 42l9-2.5A18 18 0 1 0 24 6Z" />
    <path d="M17.6 15.6c-1 .9-1.7 2.4-1.1 4.3 1.1 3.7 4.7 8.1 8.7 10.1 1.9.9 3.6.6 4.7-.4l1.3-1.4-3.7-2.6-2 1.2c-2.1-1-3.9-2.8-4.9-4.9l1.2-2-2.6-3.7Z" />
  </Svg>
);

export const IconoStevia: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M24 44V22" />
    <path d="M24 31c-9 0-14.5-6-14.5-14.5C18 16.5 24 22 24 31Z" />
    <path d="M24 24c0-9.5 5.5-16 15.5-16 0 10-6 16-15.5 16Z" />
    <path d="M24 31l-8.5-9M24 24l9.5-10" />
  </Svg>
);

export const IconoUbicacion: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M24 44S10 29.5 10 19a14 14 0 0 1 28 0c0 10.5-14 25-14 25Z" />
    <circle cx="24" cy="19" r="5" />
  </Svg>
);
