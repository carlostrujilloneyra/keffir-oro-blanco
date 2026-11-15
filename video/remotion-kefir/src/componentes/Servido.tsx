import React from 'react';
import {Img, random, staticFile} from 'remotion';
import {cl, EIO, rampa} from '../anim';
import {PAPEL} from '../tema';

/*
  Servido del shot de 30 ml: la botella natural se destapa, se inclina sobre el vaso y el chorro lo llena
  hasta la marca. No existe foto de la natural sirviendo, así que el chorro, el llenado y el vaso son SVG;
  la tapa se recorta de la foto (la botella real viene tapada) y se dibuja la boca de vidrio.
  Tiempos: `inclina` empieza a girar, `sirve` sale el chorro, `lleno` llega a la marca.
*/
const KEFIR = '#FBF6EA';
const KEFIR_SOMBRA = '#D9CFBB';

// Botella (vaca-1l recortada: 451x1449). La tapa ocupa el 6.6 % superior.
const BW = 340, BH = (BW * 1449) / 451, TAPA = BH * 0.066, BOCA_RX = BW * 0.255;
// Vaso de shot (fondo grueso): boca, base, alto, grosor del fondo y altura de la línea de 30 ml (fracción del interior).
const VW = 200, VB = 158, VH = 266, FONDO = 58, MARCA = 0.8, PARED = 8;
const elipse = (w: number) => w * 0.075;

// Marca de 30 ml: de aquí sale la posición del rótulo en la escena.
export const marcaVaso = (vaso: [number, number]) => ({x: vaso[0] + VW / 2 + 92, y: vaso[1] - FONDO - MARCA * (VH - FONDO)});

type Pt = [number, number];
const bezier = (p: Pt[], u: number): {p: Pt; n: Pt} => {
  const v = 1 - u;
  const x = v ** 3 * p[0][0] + 3 * v * v * u * p[1][0] + 3 * v * u * u * p[2][0] + u ** 3 * p[3][0];
  const y = v ** 3 * p[0][1] + 3 * v * v * u * p[1][1] + 3 * v * u * u * p[2][1] + u ** 3 * p[3][1];
  const dx = 3 * v * v * (p[1][0] - p[0][0]) + 6 * v * u * (p[2][0] - p[1][0]) + 3 * u * u * (p[3][0] - p[2][0]);
  const dy = 3 * v * v * (p[1][1] - p[0][1]) + 6 * v * u * (p[2][1] - p[1][1]) + 3 * u * u * (p[3][1] - p[2][1]);
  const l = Math.hypot(dx, dy) || 1;
  return {p: [x, y], n: [-dy / l, dx / l]};
};

export const Servido: React.FC<{t: number; vaso: [number, number]; boca: [number, number]; cues: {inclina: number; sirve: number; lleno: number; fin: number}}> = ({t, vaso, boca, cues}) => {
  const [vx, vy] = vaso; // centro de la base del vaso
  const tope = vy - VH, piso = vy - FONDO;
  const anchoEn = (y: number) => VB + ((VW - VB) * (vy - y)) / VH;

  const giro = rampa(t, cues.inclina, cues.sirve + 0.1, 0, 1, EIO);
  const vuelve = rampa(t, cues.lleno + 0.15, cues.fin, 0, 1, EIO);
  const ang = -104 * giro * (1 - vuelve * 0.5);
  // arranca de pie junto al vaso (misma línea de piso) y sube a la posición de servido mientras se inclina
  const bx = boca[0] + (1 - giro) * (vx + 520 - boca[0]), by = boca[1] + (1 - giro) * (vy - (BH - TAPA) - boca[1]);
  const rad = (ang * Math.PI) / 180;
  // labio inferior de la boca, de donde sale el chorro
  const lx = bx - Math.cos(rad) * BOCA_RX, ly = by - Math.sin(rad) * BOCA_RX;

  const nivel = rampa(t, cues.sirve + 0.3, cues.lleno, 0, MARCA, (k) => 1 - (1 - k) ** 1.2); // llenado casi parejo: el vaso tarda en llegar a la línea
  const sale = rampa(t, cues.sirve, cues.sirve + 0.3, 0, 1, (k) => k * k); // el chorro cae hasta el vaso
  const corta = rampa(t, cues.lleno - 0.05, cues.lleno + 0.28, 0, 1, (k) => k * k); // y se corta desde la boca
  const sup = piso - nivel * (VH - FONDO); // superficie del kéfir
  const rxSup = anchoEn(sup) / 2 - PARED;
  const sirviendo = sale > 0.98 && corta < 0.5;
  const onda = sirviendo ? Math.sin(t * 22) * 3.5 : Math.sin(t * 9) * 4 * Math.max(0, 1 - (t - cues.lleno) * 1.5);

  // chorro como cinta de ancho variable: grueso al salir, se afina al caer y tiembla un poco
  const curva: Pt[] = [[lx, ly], [lx - 56, ly + 6], [vx + 12, ly + (sup - ly) * 0.42], [vx + 2, sup + 8]];
  const N = 26, izq: string[] = [], der: string[] = [], filo: string[] = [];
  for (let i = 0; i <= N; i++) {
    const u = corta + ((sale - corta) * i) / N;
    const {p, n} = bezier(curva, u);
    const w = (23 - 12 * u + Math.sin(u * 10 - t * 16) * 1.1) / 2;
    izq.push(`${(p[0] + n[0] * w).toFixed(1)} ${(p[1] + n[1] * w).toFixed(1)}`);
    der.unshift(`${(p[0] - n[0] * w).toFixed(1)} ${(p[1] - n[1] * w).toFixed(1)}`);
    filo.push(`${(p[0] - n[0] * w * 0.45).toFixed(1)} ${(p[1] - n[1] * w * 0.45).toFixed(1)}`);
  }
  const tapa = rampa(t, cues.inclina - 0.15, cues.inclina + 0.5);
  const ym = marcaVaso(vaso).y;
  const pm = rampa(t, cues.sirve + 0.3, cues.sirve + 0.85);

  return (
    <>
      {/* botella sin tapa, girando sobre su boca */}
      <div style={{position: 'absolute', left: bx - BW / 2, top: by - TAPA, width: BW, height: BH, transformOrigin: `50% ${TAPA}px`, rotate: `${ang}deg`, filter: 'drop-shadow(0 30px 40px rgba(4,12,20,.45))'}}>
        <Img src={staticFile('img/vaca-1l.png')} style={{width: BW, height: BH, clipPath: tapa > 0 ? `inset(${TAPA - 2}px 0 0 0)` : undefined}} />
        {tapa > 0 && (
          <svg width={BW} height={60} viewBox={`${-BW / 2} -30 ${BW} 60`} style={{position: 'absolute', left: 0, top: TAPA - 30, overflow: 'visible'}}>
            <ellipse rx={BOCA_RX} ry={BOCA_RX * 0.17} fill={KEFIR} stroke="rgba(255,255,255,.92)" strokeWidth="6" />
            <ellipse rx={BOCA_RX + 3} ry={BOCA_RX * 0.17 + 3} fill="none" stroke="rgba(110,140,165,.5)" strokeWidth="1.5" />
          </svg>
        )}
      </div>
      {/* la tapa salta al destapar */}
      {tapa > 0 && tapa < 1 && (
        <Img src={staticFile('img/vaca-1l.png')} style={{position: 'absolute', left: bx - BW / 2 + tapa * 150, top: by - TAPA - tapa * 260 + tapa * tapa * 120, width: BW, height: BH, clipPath: `inset(0 0 ${BH - TAPA}px 0)`, rotate: `${tapa * 70}deg`, transformOrigin: `50% ${TAPA / 2}px`, opacity: 1 - tapa * tapa}} />
      )}

      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
        <defs>
          <linearGradient id="sv-liquido" x1="0" x2="1">
            <stop offset="0" stopColor={KEFIR_SOMBRA} />
            <stop offset=".2" stopColor={KEFIR} />
            <stop offset=".72" stopColor="#FFFEF9" />
            <stop offset="1" stopColor={KEFIR_SOMBRA} />
          </linearGradient>
          <linearGradient id="sv-superficie" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#E9E0CE" />
            <stop offset=".55" stopColor="#FFFEF8" />
          </linearGradient>
          <linearGradient id="sv-reflejo" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,.2)" />
            <stop offset=".7" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient id="sv-reflejo-kefir" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="rgba(251,246,234,.32)" />
            <stop offset="1" stopColor="rgba(251,246,234,0)" />
          </linearGradient>
          <linearGradient id="sv-vidrio" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(255,255,255,.42)" />
            <stop offset=".1" stopColor="rgba(255,255,255,.1)" />
            <stop offset=".86" stopColor="rgba(255,255,255,.06)" />
            <stop offset="1" stopColor="rgba(255,255,255,.34)" />
          </linearGradient>
        </defs>

        {/* reflejo del vaso en el piso */}
        <path d={`M${vx - VB / 2} ${vy + 3}L${vx - VW / 2} ${vy + VH}L${vx + VW / 2} ${vy + VH}L${vx + VB / 2} ${vy + 3}Z`} fill="url(#sv-reflejo)" />
        {nivel > 0.004 && <path d={`M${vx - VB / 2 + PARED} ${vy + FONDO}L${vx - rxSup} ${vy + (vy - sup)}L${vx + rxSup} ${vy + (vy - sup)}L${vx + VB / 2 - PARED} ${vy + FONDO}Z`} fill="url(#sv-reflejo-kefir)" />}

        {/* sombra de contacto y cuerpo del vaso */}
        <ellipse cx={vx + 5} cy={vy + 7} rx={VB * 0.72} ry={13} fill="rgba(0,0,0,.46)" style={{filter: 'blur(8px)'}} />
        <path d={`M${vx - VW / 2} ${tope}L${vx - VB / 2} ${vy}A${VB / 2} ${elipse(VB)} 0 0 0 ${vx + VB / 2} ${vy}L${vx + VW / 2} ${tope}Z`} fill="url(#sv-vidrio)" />
        <ellipse cx={vx} cy={tope} rx={VW / 2} ry={elipse(VW)} fill="rgba(255,255,255,.07)" />

        {/* kéfir: cuerpo con fondo curvo + superficie elíptica que ondea mientras cae el chorro */}
        {nivel > 0.004 && (
          <>
            <path d={`M${vx - rxSup} ${sup}L${vx - VB / 2 + PARED} ${piso}A${VB / 2 - PARED} ${elipse(VB)} 0 0 0 ${vx + VB / 2 - PARED} ${piso}L${vx + rxSup} ${sup}Z`} fill="url(#sv-liquido)" />
            <ellipse cx={vx} cy={sup} rx={rxSup} ry={elipse(rxSup * 2) + Math.abs(onda)} fill="url(#sv-superficie)" transform={`rotate(${onda * 0.35} ${vx} ${sup})`} />
            {sirviendo && [0, 1].map((i) => {
              const c = (t * 2.2 + i * 0.5) % 1;
              return <ellipse key={i} cx={vx + 2} cy={sup + 2} rx={10 + c * (rxSup - 16)} ry={3 + c * 5} fill="none" stroke={KEFIR_SOMBRA} strokeWidth="2.5" opacity={1 - c} />;
            })}
          </>
        )}

        {/* chorro */}
        {sale > corta && (
          <>
            <path d={`M${izq.join('L')}L${der.join('L')}Z`} fill={KEFIR} stroke={KEFIR_SOMBRA} strokeWidth="2" strokeLinejoin="round" />
            <path d={`M${filo.join('L')}`} fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".85" />
          </>
        )}

        {/* salpicaduras en la entrada del chorro */}
        {sirviendo &&
          Array.from({length: 8}, (_, i) => {
            const ciclo = (t * 2.3 + random(`gota-${i}`)) % 1;
            const dir = (random(`dir-${i}`) - 0.5) * 2;
            return <ellipse key={i} cx={vx + dir * 46 * ciclo} cy={sup - Math.sin(ciclo * Math.PI) * (30 + random(`h-${i}`) * 34)} rx={4.6 - ciclo * 1.8} ry={6 - ciclo * 2.2} fill={KEFIR} opacity={cl(1.25 - ciclo)} />;
          })}

        {/* vidrio delante: fondo grueso, reflejos y borde */}
        <path d={`M${vx - VB / 2 + 3} ${piso}A${VB / 2 - 3} ${elipse(VB)} 0 0 0 ${vx + VB / 2 - 3} ${piso}L${vx + VB / 2} ${vy}A${VB / 2} ${elipse(VB)} 0 0 1 ${vx - VB / 2} ${vy}Z`} fill="rgba(255,255,255,.26)" />
        <path d={`M${vx - VB / 2} ${vy}A${VB / 2} ${elipse(VB)} 0 0 0 ${vx + VB / 2} ${vy}`} fill="none" stroke="rgba(255,255,255,.75)" strokeWidth="3" />
        <path d={`M${vx - VW / 2} ${tope}L${vx - VB / 2} ${vy}`} stroke="rgba(255,255,255,.8)" strokeWidth="3.5" />
        <path d={`M${vx + VW / 2} ${tope}L${vx + VB / 2} ${vy}`} stroke="rgba(255,255,255,.62)" strokeWidth="3" />
        <path d={`M${vx - VW / 2 + 19} ${tope + 26}L${vx - VB / 2 + 16} ${piso - 10}`} stroke="rgba(255,255,255,.5)" strokeWidth="8" strokeLinecap="round" />
        <path d={`M${vx - VB / 2 + 20} ${piso + 18}L${vx - VB / 2 + 46} ${vy + 2}`} stroke="rgba(255,255,255,.55)" strokeWidth="6" strokeLinecap="round" />
        <path d={`M${vx + VW / 2 - 16} ${tope + 34}L${vx + VB / 2 - 12} ${vy - 120}`} stroke="rgba(255,255,255,.26)" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx={vx} cy={tope} rx={VW / 2} ry={elipse(VW)} fill="none" stroke="rgba(255,255,255,.86)" strokeWidth="3.5" />

        {/* línea de 30 ml grabada en el vaso, con su guía hacia el rótulo */}
        <g opacity={pm}>
          <path d={`M${vx - anchoEn(ym) / 2 + 3} ${ym}A${anchoEn(ym) / 2 - 3} ${elipse(anchoEn(ym))} 0 0 0 ${vx + anchoEn(ym) / 2 - 3} ${ym}`} fill="none" stroke={PAPEL} strokeWidth="3.5" />
          <path d={`M${vx + anchoEn(ym) / 2 + 12} ${ym}L${vx + anchoEn(ym) / 2 + 12 + 58 * pm} ${ym}`} stroke={PAPEL} strokeWidth="3" strokeLinecap="round" />
          <circle cx={vx + anchoEn(ym) / 2 + 12 + 58 * pm} cy={ym} r="6.5" fill={PAPEL} />
        </g>
      </svg>
    </>
  );
};
