import React from 'react';
import {FUENTE, PAPEL} from '../tema';

// Chip de vidrio ligero de las imágenes fijas: poco blanco y poco desenfoque, borde fino y brillo en el canto superior.
export const VIDRIO: React.CSSProperties = {borderRadius: 10, background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(7px) saturate(150%)', WebkitBackdropFilter: 'blur(7px) saturate(150%)',
  border: '1px solid rgba(255,255,255,.28)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.45), 0 8px 24px rgba(0,0,0,.16)', color: PAPEL, fontFamily: FUENTE.txt, textShadow: '0 1px 8px rgba(0,0,0,.35)'};

export type Icono = React.FC<{tam?: number; color?: string}>;

export const Chip: React.FC<{txt: string; Icono?: Icono; tamIcono?: number; estilo?: React.CSSProperties}> = ({txt, Icono, tamIcono = 38, estilo}) => (
  <div style={{...VIDRIO, display: 'flex', alignItems: 'center', gap: 13, height: 64, padding: Icono ? '0 22px 0 16px' : '0 22px', fontWeight: 600, fontSize: 34, whiteSpace: 'nowrap', ...estilo}}>
    {Icono && <Icono tam={tamIcono} color={PAPEL} />}
    {txt}
  </div>
);
