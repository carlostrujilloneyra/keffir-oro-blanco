import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, staticFile, random} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {useThree} from '@react-three/fiber';
import {useTexture} from '@react-three/drei';
import * as THREE from 'three';

// Prueba de parallax 3D: cada botella es un plano en la escena; la cámara viaja lento de una a otra.
export const PRUEBA_PARALLAX_DURATION = 6;

// [imagen, ancho, alto, x, z]: alternan profundidad para que el parallax se note
const BOTELLAS: [string, number, number, number, number][] = [
  ['parallax/natural.webp', 1024, 1536, -3.6, 0],
  ['parallax/fresa.webp', 941, 1672, -1.2, -0.9],
  ['parallax/arandanos.webp', 1024, 1536, 1.2, 0],
  ['parallax/frutos.webp', 1049, 1499, 3.6, -0.9],
];
const ALTO = 3.4;

// useTexture suspende hasta que la imagen carga; ThreeCanvas no captura el frame mientras haya un Suspense pendiente.
const useTextura = (src: string) => {
  const tex = useTexture(staticFile(src));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
};

const Botella: React.FC<{src: string; w: number; h: number; x: number; z: number; t: number}> = ({src, w, h, x, z, t}) => {
  const tex = useTextura(src);
  const ancho = (ALTO * w) / h;
  // flota apenas y gira un poco hacia la cámara cuando ésta pasa
  const y = Math.sin(t * 1.4 + x) * 0.04;
  return (
    <group position={[x, y, z]}>
      <mesh position={[0, -ALTO / 2 - 0.02, 0.02]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[ancho * 0.32, 48]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.28} />
      </mesh>
      <mesh>
        <planeGeometry args={[ancho, ALTO]} />
        <meshStandardMaterial map={tex} transparent alphaTest={0.05} roughness={0.7} toneMapped={false} />
      </mesh>
    </group>
  );
};

// Motas de luz a distintas profundidades: refuerzan la sensación de capas al mover la cámara.
const Motas: React.FC<{t: number}> = ({t}) => (
  <>
    {Array.from({length: 40}, (_, i) => {
      const x = (random(`x${i}`) - 0.5) * 14;
      const y = (random(`y${i}`) - 0.5) * 7;
      const z = -1.5 - random(`z${i}`) * 5;
      const s = 0.03 + random(`s${i}`) * 0.05;
      return (
        <mesh key={i} position={[x, y + Math.sin(t * 0.6 + i) * 0.08, z]}>
          <sphereGeometry args={[s, 12, 12]} />
          <meshBasicMaterial color="#fff1c9" transparent opacity={0.35 + random(`o${i}`) * 0.4} />
        </mesh>
      );
    })}
  </>
);

// Cámara: recorre las botellas de izquierda a derecha; el objetivo va un poco adelantado (paneo suave).
const Camara: React.FC<{p: number}> = ({p}) => {
  const camera = useThree((s) => s.camera);
  const x = interpolate(p, [0, 1], [-3.6, 3.6]);
  camera.position.set(x - 0.35, 0.15 + Math.sin(p * Math.PI) * 0.15, 5.4 - Math.sin(p * Math.PI) * 0.4);
  camera.lookAt(x + 0.25, -0.05, -0.4);
  return null;
};

export const PruebaParallax: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height, fps, durationInFrames} = useVideoConfig();
  const t = frame / fps;
  const p = interpolate(frame, [0, durationInFrames - 1], [0, 1], {easing: Easing.inOut(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #2f5a47 0%, #18301f 45%, #0f1a14 100%)'}}>
      <ThreeCanvas width={width} height={height} camera={{position: [-3.95, 0.15, 5.4], fov: 42}}>
        <ambientLight intensity={0.85} />
        <directionalLight position={[2, 3, 5]} intensity={0.7} color="#fff6e8" />
        <directionalLight position={[-3, 1, 2]} intensity={0.25} color="#9fd8b4" />
        <Camara p={p} />
        <Motas t={t} />
        {BOTELLAS.map(([src, w, h, x, z]) => (
          <Botella key={src} src={src} w={w} h={h} x={x} z={z} t={t} />
        ))}
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
