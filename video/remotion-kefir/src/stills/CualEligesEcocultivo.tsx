import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {Fondo, LimpioCtx, SinGranoCtx} from '../componentes/Fondo';
import {Franjas, NATURAL, SABORES} from '../componentes/Franjas';
import {IconoArtesanal, IconoFresa, IconoSinConservantes, IconoStevia, IconoUbicacion, IconoVacaCabra, IconoWhatsAppLinea} from '../componentes/Iconos';
import {Cinta, Dato, Linea} from '../componentes/Texto';
import {FUENTE, PALETAS, PAPEL, SEGURA, TINTA} from '../tema';

/*
  Imagen fija para el estado de WhatsApp de EcoCultivo: la escena "¿Cuál eliges?" del frutado sin chocolate y con el natural
  a la izquierda. Las animaciones de los componentes se ven ya asentadas (`T` mucho después de sus entradas, en 0).
*/
const T = 10;
const COLUMNAS = [NATURAL, ...SABORES.filter((s) => s.tono !== 'cacao')];
// en este orden caben en dos filas
const CINTAS = ['100% artesanal', 'Alto en probióticos', 'Cero conservantes añadidos', 'Con frutas'];
const LOGO = 150;

export const CualEligesEcocultivo: React.FC = () => {
  const p = PALETAS.mora;
  return (
    <LimpioCtx.Provider value>
      <SinGranoCtx.Provider value>
        <AbsoluteFill>
          <Fondo tono='mora' t={0} />
          <Franjas t={T} en={T - 1.5} base={1390} alto={470} desde={890} sabores={COLUMNAS} />
          {/* las bases de las botellas se funden en la placa del pie */}
          <AbsoluteFill style={{background: 'linear-gradient(to bottom, transparent 1320px, rgba(12,8,8,.94) 1405px)'}} />
          <Img src={staticFile('img/ecocultivo/logo.jpg')} style={{position: 'absolute', left: SEGURA.x1 - LOGO, top: 244, width: LOGO, height: LOGO, borderRadius: '50%', boxShadow: '0 12px 30px rgba(0,0,0,.45)'}} />
          <Linea txt='¿Cuál' t={T} en={0} y={240} tam={200} sombra />
          <Linea txt='eliges?' t={T} en={0} y={446} tam={200} sombra color={p.subtitulo} />
          <div style={{position: 'absolute', left: SEGURA.x0, top: 690, width: SEGURA.x1 - SEGURA.x0, display: 'flex', flexWrap: 'wrap', gap: 14}}>
            {CINTAS.map((txt) => (
              <Cinta key={txt} txt={txt} t={T} en={0} y={0} tam={34} fondo={PAPEL} color={TINTA} enFlujo />
            ))}
          </div>
          <Dato t={T} en={0} y={1408} tam={38} peso={700}>Bio Tienda EcoCultivo</Dato>
          <Dato t={T} en={0} y={1456} tam={34}>Mercado San Felipe · Tienda 577</Dato>
        </AbsoluteFill>
      </SinGranoCtx.Provider>
    </LimpioCtx.Provider>
  );
};

/*
  Versión limpia, sin textos: las franjas a todo el alto como en el gancho del frutado (botellas del 51 % al 83 % del alto)
  y el 45 % de arriba libre; las cuatro con el mismo ancho de vidrio. `en` 0.9 s antes: las botellas ya subieron y casi no derivaron, así quedan a la misma altura.
*/

/*
  Ancho del vidrio de cada botella en su foto (px a 1080) y su centro, medidos fila por fila en el cuerpo; el alto es base - tapa.
  Las fotos no tienen la misma proporción, así que no pueden igualar ancho y alto a la vez: cada una se escala para repartir
  la diferencia por igual entre ancho y alto respecto a 228x596 (casi el tamaño de la de arándano en el video).
  Frutos del bosque es la más ancha para su alto: se angosta un 2.5 % para entrar en el ±4 %.
*/
const CUERPO: Record<string, [number, number]> = {leche: [773, 450], fresa: [766, 398], arandanos: [790, 440], frutos: [796, 372]};
const ESTIRA: Record<string, number> = {frutos: 0.975};
const META = {ancho: 228, alto: 596};
// fresa y frutos sin el borde del vaso ni las gotas sueltas que asoman en el borde de su franja (scripts/limpiar-fotos.mjs)
const LIMPIAS: Record<string, string> = {fresa: 'img/fresa-hero-limpia.webp', frutos: 'img/frutos-bosque-hero-limpia.webp'};
const IGUALES = COLUMNAS.map((s) => {
  const [cx, cuerpo] = CUERPO[s.tono], estira = ESTIRA[s.tono] ?? 1, alto = s.base - s.tapa;
  const r = alto / (cuerpo * estira) / (META.alto / META.ancho);
  return {...s, src: LIMPIAS[s.tono] ?? s.src, cx, k: (META.alto * Math.sqrt(r)) / alto, estira};
});

export const CualEligesEcocultivoLimpia: React.FC = () => <Franjas t={T} en={T - 0.9} sabores={IGUALES} />;

/*
  Versión final: la imagen limpia aprobada (copiada tal cual a public/img/ecocultivo/cual-eliges-fondo.png) como capa de fondo
  y encima solo textos, chips e íconos, en los huecos que deja: arriba del título hasta las tapas (~978) y bajo las botellas
  hasta 1780 (WhatsApp tapa los 180 px de arriba y lo que queda por debajo de 1780).
*/
const CHIPS: [string, React.FC<{tam?: number; color?: string}>][] = [
  ['100% artesanal', IconoArtesanal],
  ['Endulzado con Stevia', IconoStevia],
  ['Cero conservantes añadidos', IconoSinConservantes],
  ['Con frutas', IconoFresa],
  ['Leche de vaca y de cabra', IconoVacaCabra],
];
const NOMBRES = ['Natural', 'Fresa', 'Arándano', 'Frutos del bosque'];

// Chip de vidrio ligero: poco blanco y poco desenfoque, con el color de las franjas avivado; borde fino y brillo en el canto superior.
const VIDRIO: React.CSSProperties = {borderRadius: 10, background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(7px) saturate(150%)', WebkitBackdropFilter: 'blur(7px) saturate(150%)',
  border: '1px solid rgba(255,255,255,.28)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.45), 0 8px 24px rgba(0,0,0,.16)', color: PAPEL, fontFamily: FUENTE.txt, textShadow: '0 1px 8px rgba(0,0,0,.35)'};
const Chip: React.FC<{txt: string; Icono: React.FC<{tam?: number; color?: string}>}> = ({txt, Icono}) => (
  <div style={{...VIDRIO, display: 'flex', alignItems: 'center', gap: 13, height: 64, padding: '0 22px 0 16px', fontWeight: 600, fontSize: 34, whiteSpace: 'nowrap'}}>
    <Icono tam={38} color={PAPEL} />
    {txt}
  </div>
);

const LOGO_ECO = 290;
export const CualEligesEcocultivoFinal: React.FC = () => {
  const p = PALETAS.mora;
  return (
    <AbsoluteFill>
      <Img src={staticFile('img/ecocultivo/cual-eliges-fondo.png')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920}} />
      {/* título: mismo tamaño que en el gancho del frutado, 50 px más arriba */}
      <Linea txt='¿Cuál' t={T} en={0} y={190} tam={200} sombra />
      <Linea txt='eliges?' t={T} en={0} y={396} tam={200} sombra color={p.subtitulo} />
      {/* logo de la tienda a la altura del título, con la llamada debajo (a la derecha de "eliges?") */}
      <Img src={staticFile('img/ecocultivo/logo.jpg')} style={{position: 'absolute', left: 1008 - LOGO_ECO, top: 184, width: LOGO_ECO, height: LOGO_ECO, borderRadius: '50%', boxShadow: '0 14px 36px rgba(0,0,0,.45)'}} />
      <div style={{position: 'absolute', left: 1008 - LOGO_ECO - 20, width: LOGO_ECO + 40, top: 494, textAlign: 'center', fontFamily: FUENTE.txt, fontWeight: 700, fontSize: 30, lineHeight: 1.15, color: p.subtitulo, textShadow: '0 2px 12px rgba(0,0,0,.35)'}}>
        Pídelo hoy<br />en tu Bio Tienda
      </div>
      <Cinta txt='Ya volvió el kéfir de verdad' t={T} en={0} y={622} tam={44} />
      <div style={{position: 'absolute', left: SEGURA.x0, top: 728, width: 1080 - 2 * SEGURA.x0, display: 'flex', flexWrap: 'wrap', gap: 10}}>
        {CHIPS.map(([txt, Icono]) => <Chip key={txt} txt={txt} Icono={Icono} />)}
      </div>
      {/* 24 px: "Frutos del bosque" deja ~24 px a cada lado de su franja */}
      {NOMBRES.map((n, i) => (
        <div key={n} style={{position: 'absolute', left: i * 270, width: 270, top: 1624, textAlign: 'center', fontFamily: FUENTE.txt, fontWeight: 600, fontSize: 24, color: PAPEL}}>{n}</div>
      ))}
      {/* pie: panel de vidrio con la dirección de la tienda y el WhatsApp */}
      <div style={{...VIDRIO, position: 'absolute', left: SEGURA.x0, width: 1080 - 2 * SEGURA.x0, top: 1703, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px 0 18px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <IconoUbicacion tam={42} color={PAPEL} />
          <div style={{lineHeight: 1.15}}>
            <div style={{fontWeight: 700, fontSize: 28}}>Ca. El Carmen 1159, Tienda 577</div>
            <div style={{fontWeight: 500, fontSize: 22}}>Mercado San Felipe, Surquillo</div>
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 36}}>
          <IconoWhatsAppLinea tam={44} color='#25D366' />
          950 172 732
        </div>
      </div>
    </AbsoluteFill>
  );
};
