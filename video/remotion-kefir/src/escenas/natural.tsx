import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {cl, muelle, rampa, useT} from '../anim';
import {Fondo, Gotas, Grano} from '../componentes/Fondo';
import {Check, IconoEquilibrio, IconoLactosa, IconoLuna, IconoMicrobiota, IconoProbioticos, IconoSol, IconoSubir} from '../componentes/Iconos';
import {Parallax3D} from '../componentes/Parallax3D';
import {Producto} from '../componentes/Producto';
import {marcaVaso, Servido} from '../componentes/Servido';
import {Cinta, Dato, Linea} from '../componentes/Texto';
import type {Escena} from '../datos/tipos';
import {PALETAS, PAPEL, SEGURA, TINTA} from '../tema';
import {FotoHeroe, Halo, Heroe} from './comunes';

type FC = React.FC<{e: Escena}>;
const LECHE = '#F3EEE2';

// 1 · Gancho: la botella revienta desde el splash de leche con zoom. El titular entra completo de inmediato.
export const GanchoNatural: FC = ({e}) => {
  const t = useT();
  const s = muelle(t, e.inicio, true);
  const W = 1150, H = (W * 1537) / 1023;
  return (
    <AbsoluteFill>
      <Fondo tono={e.tono} t={t} luz={[56, 60]} />
      <Halo x={600} y={1250} d={1500} fuerza={0.38} />
      <Heroe e={e}>
        <Img src={staticFile(e.imagenes!.heroe)} style={{position: 'absolute', left: 600 - W / 2, top: 392, width: W, height: H, transformOrigin: '50% 45%',
          scale: `${1.3 - s * 0.3 + rampa(t, 0.3, 3, 0, 0.05, (k) => k)}`, rotate: `${(1 - s) * -9}deg`, filter: 'drop-shadow(0 46px 60px rgba(8,22,36,.5))'}} />
      </Heroe>
      <Gotas t={t} color={LECHE} semilla="n1" n={7} zona={[0, 700, 1080, 1900]} />
      <Linea txt={e.textos.l1} t={t} en={e.cues.l1} y={240} tam={122} sombra />
      <Linea txt={e.textos.l2} t={t} en={e.cues.l2} y={356} tam={198} fuente="slab" sombra />
      <Linea txt={e.textos.l3} t={t} en={e.cues.l3} y={566} x={SEGURA.x0 + 20} tam={112} marca={TINTA} />
    </AbsoluteFill>
  );
};

// 2 · Qué es: botella de vaca en 3D (giro leve + cámara que deriva) y la frase de la etiqueta.
export const QueEs: FC = ({e}) => {
  const t = useT();
  const entra = rampa(t, e.inicio - 0.3, e.inicio + 1.3); // arranca con el barrido: al abrirse, la botella ya está llegando
  const deriva = rampa(t, e.inicio, e.inicio + 5, 0, 1, (k) => k);
  return (
    <AbsoluteFill>
      <Fondo tono={e.tono} t={t} luz={[72, 48]} />
      <Halo x={842} y={980} d={1300} fuerza={0.42} />
      <Linea txt={e.textos.cien} t={t} en={e.cues.cien} y={236} tam={216} sombra />
      <Heroe e={e}>
        <Parallax3D t={t} motas="#E4F1FB" camara={{x: 30 - deriva * 60, y: 20 - deriva * 40, acercar: deriva * 90}}
          planos={[{src: e.imagenes!.heroe, reflejo: 0.26, ancho: 398, alto: 1280, x: 842, base: 1556 + (1 - entra) * 120, giro: -0.62 + entra * 0.76 - deriva * 0.16}]} />
      </Heroe>
      <Linea txt={e.textos.kefir} t={t} en={e.cues.kefir} y={470} tam={126} fuente="slab" />
      <Linea txt={e.textos.natural} t={t} en={e.cues.natural} y={608} tam={126} />
      <Cinta txt={e.textos.noEs} t={t} en={e.cues.noEs} y={790} tam={34} />
    </AbsoluteFill>
  );
};

// 3 · Beneficios: las cuatro frases de la etiqueta, cada una en su cinta, apuntando a la botella.
const ICONOS = [IconoProbioticos, IconoLactosa, IconoMicrobiota, IconoEquilibrio];
export const Beneficios: FC = ({e}) => {
  const t = useT(), p = PALETAS[e.tono];
  const s = muelle(t, e.inicio - 0.25, true);
  return (
    <AbsoluteFill>
      <Fondo tono={e.tono} t={t} luz={[80, 54]} />
      <Halo x={896} y={980} d={1400} color="#9CCBF0" fuerza={0.44} />
      <Heroe e={e}>
        <Producto src={e.imagenes!.heroe} ancho={358} alto={1150} x={896} base={1552 + (1 - s) * 90} reflejo={0.24} t={t} rot={(1 - s) * 5} opacidad={cl(s * 3)} sombra="rgba(2,10,18,.6)" brillo={e.inicio + 0.7} />
      </Heroe>
      <Gotas t={t} color={LECHE} semilla="n3" n={5} zona={[0, 1300, 1080, 1900]} />
      <Linea txt={e.textos.l1} t={t} en={e.cues.titulo} y={240} tam={128} />
      <Linea txt={e.textos.l2} t={t} en={e.cues.titulo + 0.12} y={372} tam={128} />
      {e.lista!.map((b, i) => {
        const Icono = ICONOS[i];
        return <Cinta key={b.txt} txt={b.txt} t={t} en={b.en} y={600 + i * 166} x={SEGURA.x0 + (i % 2) * 30} tam={40} fondo={p.cinta} color={p.cintaTexto} icono={<Icono tam={54} color={p.cintaTexto} />} />;
      })}
    </AbsoluteFill>
  );
};

/*
  4 · Lo que nos diferencia: checklist que avanza con la voz sobre la foto héroe de vaca + cabra.
  La foto trae su fondo azul oscuro (el mismo del tono "noche") y cubre el cuadro desde arriba de las tapas hasta abajo:
  las dos botellas ocupan el 75 % del ancho y se apoyan en la zona inferior; la cinta "Alto en probióticos" queda sobre los subtítulos.
*/
export const Diferencia: FC = ({e}) => {
  const t = useT();
  const s = rampa(t, e.inicio - 0.25, e.inicio + 0.9);
  return (
    <AbsoluteFill>
      <Fondo tono={e.tono} t={t} plano />
      <Heroe e={e}>
        <FotoHeroe src={e.imagenes!.heroe} k={0.951} left={-292} top={319} arriba={10} origen="58% 55%" escala={1.06 - s * 0.06 + rampa(t, e.inicio, e.inicio + 9, 0, 0.015, (k) => k)} opacidad={cl(s * 2.2)} />
      </Heroe>
      <Grano fuerza={0.22} />
      <Gotas t={t} color={LECHE} semilla="n4" n={4} zona={[0, 1500, 1080, 1900]} />
      {e.lista!.map((it, i) => {
        const y = 240 + i * 66;
        const sig = e.lista![i + 1]?.en ?? 1e6;
        const atenua = 1 - rampa(t, sig, sig + 0.3) * 0.24; // la línea que ya pasó cede el foco
        return (
          <div key={it.txt} style={{opacity: atenua}}>
            <div style={{position: 'absolute', left: SEGURA.x0, top: y + 6}}>
              <Check t={t} en={it.en + 0.1} tam={50} color={PAPEL} />
            </div>
            <Linea txt={it.txt} t={t} en={it.en} x={SEGURA.x0 + 66} y={y} tam={58} escalon={0.05} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// Los tres pasos de "¿Primera vez?": misma posición en el servido y en la foto, para que sigan en pantalla al cambiar de escena.
const ICONOS_PASOS = [IconoSol, IconoLuna, IconoSubir];
const Pasos: FC = ({e}) => {
  const t = useT();
  return (
    <>
      <Linea txt={e.textos.titulo} t={t} en={e.cues.titulo ?? -9} y={240} tam={136} />
      {e.lista!.map((paso, i) => {
        const Icono = ICONOS_PASOS[i];
        const y = 432 + i * 150;
        const p = rampa(t, paso.en, paso.en + 0.4);
        return (
          <React.Fragment key={paso.txt}>
            <div style={{position: 'absolute', left: SEGURA.x0, top: y + 12, opacity: p, scale: `${0.9 + p * 0.1}`}}>
              <Icono tam={62} color={PALETAS[e.tono].acento} />
            </div>
            <Linea txt={paso.txt} t={t} en={paso.en} x={SEGURA.x0 + 88} y={y} tam={58} escalon={0.05} />
            {paso.nota && <Dato t={t} en={paso.en + 0.1} x={SEGURA.x0 + 90} y={y + 64} tam={34} color={PAPEL}>{paso.nota}</Dato>}
          </React.Fragment>
        );
      })}
    </>
  );
};

// 5a · Servido: la botella se destapa, se inclina despacio y llena el shot hasta la línea de 30 ml (unos 4 s en total).
export const EscenaServido: FC = ({e}) => {
  const t = useT();
  const vaso: [number, number] = [300, 1374];
  const m = marcaVaso(vaso);
  return (
    <AbsoluteFill>
      <Fondo tono={e.tono} t={t} luz={[30, 62]} piso={false} />
      <Halo x={330} y={1200} d={900} color="#9CCBF0" fuerza={0.34} />
      {/* mesa: una línea de horizonte detrás del vaso y un plano que se apaga hacia abajo */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 1296, height: 624, background: 'linear-gradient(to bottom, rgba(140,185,225,.2) 0%, rgba(140,185,225,.07) 22%, rgba(8,16,24,.35) 100%)'}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 1295, height: 3, background: 'linear-gradient(to right, transparent, rgba(190,220,245,.5) 30%, rgba(190,220,245,.5) 70%, transparent)'}} />
      <Heroe e={e}>
        <Servido t={t} vaso={vaso} boca={[462, 850]} cues={{inclina: e.cues.inclina, sirve: e.cues.sirve, lleno: e.cues.lleno, fin: e.cues.fin}} />
      </Heroe>
      <Pasos e={e} />
      <Dato t={t} en={e.cues.marca} x={m.x} y={m.y - 122} tam={34} peso={600}>
        <span style={{letterSpacing: '0.14em', textTransform: 'uppercase'}}>{e.textos.shot}</span>
      </Dato>
      <Linea txt={e.textos.ml} t={t} en={e.cues.marca + 0.08} x={m.x} y={m.y - 72} tam={150} />
    </AbsoluteFill>
  );
};

// 5b · Primera vez: la foto del vaso servido y los pasos de la voz.
export const PrimeraVez: FC = ({e}) => {
  const t = useT();
  const W = 1200, H = (W * 1402) / 1122;
  const z = rampa(t, e.inicio, e.inicio + 3, 0, 1, (k) => k);
  return (
    <AbsoluteFill>
      <Fondo tono={e.tono} t={t} luz={[66, 50]} piso={false} />
      <Halo x={760} y={1150} d={1200} color="#9CCBF0" fuerza={0.32} />
      <Heroe e={e}>
        <Img src={staticFile(e.imagenes!.heroe)} style={{position: 'absolute', left: -90, top: 1920 - H, width: W, height: H, transformOrigin: '70% 100%', scale: `${1 + z * 0.03}`}} />
      </Heroe>
      <Pasos e={e} />
    </AbsoluteFill>
  );
};
