import React from 'react';
import {interpolateColors} from 'remotion';
import {cl, EO, rampa} from '../anim';
import {FUENTE, PAPEL, SEGURA, TINTA} from '../tema';

type Fam = keyof typeof FUENTE;

/*
  Titular cinético: cada palabra sube desde detrás de su propia máscara, con un escalón corto.
  `marca` pinta una cinta detrás de la línea (el "marcador" de la etiqueta).
*/
export const Linea: React.FC<{
  txt: string; t: number; en: number; y: number; tam: number; x?: number; fuente?: Fam; color?: string; peso?: number;
  escalon?: number; mayus?: boolean; marca?: string; sombra?: boolean; tracking?: number;
}> = ({txt, t, en, y, tam, x = SEGURA.x0, fuente = 'anton', color = PAPEL, peso = 400, escalon = 0.07, mayus = true, marca, sombra, tracking = 0}) => {
  const palabras = txt.split(' ');
  const pm = marca ? rampa(t, en - 0.05, en + 0.4) : 0;
  return (
    <div style={{position: 'absolute', left: x, top: y, whiteSpace: 'nowrap', fontFamily: FUENTE[fuente], fontWeight: peso, fontSize: tam, lineHeight: 1, color, textTransform: mayus ? 'uppercase' : 'none', letterSpacing: tracking,
      textShadow: sombra ? '0 6px 30px rgba(0,0,0,.28)' : undefined}}>
      {marca && <div style={{position: 'absolute', left: -tam * 0.16, right: -tam * 0.2, top: tam * 0.02, bottom: -tam * 0.06, background: marca, transformOrigin: '0 50%', scale: `${pm} 1`,
        clipPath: `polygon(0 0, calc(100% - ${tam * 0.3}px) 0, 100% 50%, calc(100% - ${tam * 0.3}px) 100%, 0 100%)`}} />}
      {palabras.map((w, i) => {
        const p = rampa(t, en + i * escalon, en + i * escalon + 0.45);
        return (
          // el padding/margen compensado deja sitio a tildes y descendentes dentro de la máscara; baja 150 % para que la tilde también quede fuera
          <span key={i} style={{display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', padding: '0.16em 0.04em 0.1em', margin: '-0.16em -0.04em -0.1em', marginRight: i < palabras.length - 1 ? '0.2em' : '-0.04em'}}>
            <span style={{display: 'inline-block', position: 'relative', translate: `0 ${(1 - p) * 150}%`}}>{w}</span>
          </span>
        );
      })}
    </div>
  );
};

// Cinta con punta de flecha, como "Alto en probióticos" en la etiqueta. Se descubre de izquierda a derecha.
export const Cinta: React.FC<{
  txt: string; t: number; en: number; x?: number; y: number; tam?: number; fondo?: string; color?: string; icono?: React.ReactNode; atenuar?: number; enFlujo?: boolean; pulso?: number; colorPulso?: string;
}> = ({txt, t, en, x = SEGURA.x0, y, tam = 38, fondo = TINTA, color = PAPEL, icono, atenuar = 1, enFlujo, pulso, colorPulso = fondo}) => {
  const p = rampa(t, en, en + 0.42);
  // resalte breve (sube en 0.12 s, baja en 0.6 s) cuando la voz nombra la cinta
  const r = pulso === undefined ? 0 : t < pulso + 0.12 ? rampa(t, pulso, pulso + 0.12) : 1 - rampa(t, pulso + 0.3, pulso + 0.9, 0, 1, (k) => k);
  const alto = Math.round(tam * 1.95);
  return (
    <div style={{position: enFlujo ? 'relative' : 'absolute', left: enFlujo ? 0 : x, top: enFlujo ? 0 : y, height: alto, display: 'flex', alignItems: 'center', gap: tam * 0.42, paddingLeft: tam * 0.62, paddingRight: tam * 1.25,
      background: interpolateColors(r, [0, 1], [fondo, colorPulso]), color, fontFamily: FUENTE.txt, fontWeight: 600, fontSize: tam, letterSpacing: '-0.005em', whiteSpace: 'nowrap', opacity: cl(p * 3) * atenuar,
      translate: `${(1 - p) * -36}px 0`, scale: `${1 + r * 0.07}`, transformOrigin: '0 50%',
      clipPath: `polygon(0 0, calc(${p * 100}% - ${alto / 2}px) 0, ${p * 100}% 50%, calc(${p * 100}% - ${alto / 2}px) 100%, 0 100%)`}}>
      {icono}
      <span style={{translate: `${(1 - rampa(t, en + 0.06, en + 0.48)) * -18}px 0`}}>{txt}</span>
    </div>
  );
};

// Texto de datos en Poppins: entra con un deslizamiento corto y desenfoque que se resuelve.
export const Dato: React.FC<{
  t: number; en: number; x?: number; y: number; tam?: number; color?: string; peso?: number; ancho?: number; children: React.ReactNode; interlinea?: number;
}> = ({t, en, x = SEGURA.x0, y, tam = 40, color = PAPEL, peso = 500, ancho, children, interlinea = 1.22}) => {
  const p = rampa(t, en, en + 0.45, 0, 1, EO);
  return (
    <div style={{position: 'absolute', left: x, top: y, width: ancho, fontFamily: FUENTE.txt, fontWeight: peso, fontSize: tam, lineHeight: interlinea, color, opacity: p, translate: `0 ${(1 - p) * 22}px`, filter: `blur(${(1 - p) * 6}px)`}}>
      {children}
    </div>
  );
};
