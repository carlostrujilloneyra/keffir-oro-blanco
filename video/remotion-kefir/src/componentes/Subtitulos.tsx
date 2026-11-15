import React from 'react';
import type {Caption} from '@remotion/captions';
import {useCurrentFrame} from 'remotion';
import {rampa} from '../anim';
import {FPS, FUENTE, SUBTITULOS} from '../tema';

type Pagina = {palabras: {txt: string; a: number; b: number}[]; a: number; b: number};

/*
  Agrupa la voz en frases cortas de una línea: corta en puntuación, en pausas y al pasar de MAX caracteres.
  Así el subtítulo nunca salta de renglón ni tapa más producto del necesario.
*/
const MAX = 26;
export const paginar = (captions: Caption[]): Pagina[] => {
  type W = Pagina['palabras'][number];
  const largo = (ws: W[]) => ws.reduce((n, w) => n + w.txt.length + 1, -1);
  // 1) frases: hasta un signo de cierre, una pausa o una coma con suficiente texto delante
  const frases: W[][] = [[]];
  for (const c of captions) {
    const w = {txt: c.text.trim(), a: c.startMs / 1000, b: c.endMs / 1000};
    const frase = frases[frases.length - 1], prev = frase[frase.length - 1];
    if (prev && (/[.?!]$/.test(prev.txt) || (/,$/.test(prev.txt) && largo(frase) >= 14) || w.a - prev.b > 0.45)) frases.push([w]);
    else frase.push(w);
  }
  // 2) las frases largas se parten en trozos parejos, para no dejar una palabra suelta en pantalla
  const paginas: Pagina[] = [];
  for (const frase of frases) {
    const n = Math.ceil(largo(frase) / MAX), meta = largo(frase) / n;
    let actual: W[] = [];
    for (const w of frase) {
      if (actual.length && largo(actual) + w.txt.length / 2 > meta && largo(actual) >= 6) {
        paginas.push({palabras: actual, a: actual[0].a, b: actual[actual.length - 1].b});
        actual = [];
      }
      actual.push(w);
    }
    if (actual.length) paginas.push({palabras: actual, a: actual[0].a, b: actual[actual.length - 1].b});
  }
  // cada página se queda hasta que empieza la siguiente (máx. 0.6 s de cola)
  paginas.forEach((p, i) => (p.b = Math.min(paginas[i + 1]?.a ?? p.b + 0.6, p.b + 0.6)));
  return paginas;
};

/*
  Subtítulos palabra por palabra: texto blanco sobre placa oscura semitransparente, con el borde inferior
  en SUBTITULOS.abajo. La palabra que se está diciendo toma el color del sabor en pantalla (`colorEn`).
*/
export const Subtitulos: React.FC<{captions: Caption[]; colorEn: (t: number) => string}> = ({captions, colorEn}) => {
  const t = useCurrentFrame() / FPS;
  const paginas = React.useMemo(() => paginar(captions), [captions]);
  const pag = paginas.find((p) => t >= p.a - 0.06 && t < p.b);
  if (!pag) return null;
  const activo = colorEn(t);
  const e = rampa(t, pag.a - 0.06, pag.a + 0.14);
  return (
    <div style={{position: 'absolute', left: SUBTITULOS.x0, width: SUBTITULOS.x1 - SUBTITULOS.x0, bottom: 1920 - SUBTITULOS.abajo, display: 'flex', justifyContent: 'center'}}>
      <div style={{display: 'flex', gap: 13, padding: '10px 26px 13px', borderRadius: 16, background: SUBTITULOS.placa, opacity: e, translate: `0 ${(1 - e) * 10}px`,
        fontFamily: FUENTE.txt, fontWeight: 600, fontSize: SUBTITULOS.tam, lineHeight: 1.2, whiteSpace: 'nowrap'}}>
        {pag.palabras.map((w, i) => {
          const sig = pag.palabras[i + 1]?.a ?? pag.b;
          const dicha = t >= w.a;
          const pop = rampa(t, w.a, w.a + 0.16);
          return (
            <span key={i} style={{color: t >= w.a && t < sig ? activo : '#FFFFFF', opacity: dicha ? 1 : 0.55, translate: `0 ${dicha ? (1 - pop) * 5 : 0}px`}}>{w.txt}</span>
          );
        })}
      </div>
    </div>
  );
};
