import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {Environment, Lightformer} from '@react-three/drei';

// Prueba del entorno 3D: botella simple de vidrio (cuerpo + hombro + cuello + tapa) con kéfir adentro, girando.
export const PRUEBA_3D_DURATION = 3;

const Botella: React.FC<{rot: number}> = ({rot}) => {
  const vidrio = (
    // vidrio transparente con reflejos del entorno (la transmisión física se veía lechosa en el render headless)
    <meshPhysicalMaterial color="#e8f4ee" transparent opacity={0.28} roughness={0.04} metalness={0} clearcoat={1} clearcoatRoughness={0.03} envMapIntensity={1.6} depthWrite={false} />
  );
  return (
    <group rotation={[0.12, rot, 0]} position={[0, -0.15, 0]}>
      {/* vidrio */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 2.2, 64]} />
        {vidrio}
      </mesh>
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.26, 0.62, 0.4, 64]} />
        {vidrio}
      </mesh>
      <mesh position={[0, 1.72, 0]}>
        <cylinderGeometry args={[0.24, 0.26, 0.44, 64]} />
        {vidrio}
      </mesh>
      {/* tapa */}
      <mesh position={[0, 2.02, 0]}>
        <cylinderGeometry args={[0.27, 0.27, 0.2, 64]} />
        <meshStandardMaterial color="#16201a" roughness={0.35} metalness={0.2} />
      </mesh>
      {/* kéfir hasta 3/4 de la botella: arriba se ve el vidrio vacío */}
      <mesh position={[0, -0.32, 0]}>
        <cylinderGeometry args={[0.56, 0.56, 1.5, 64]} />
        <meshStandardMaterial color="#f6f1e6" roughness={0.55} />
      </mesh>
      {/* etiqueta */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.625, 0.625, 0.9, 64, 1, true]} />
        <meshStandardMaterial color="#1d6fd1" roughness={0.6} side={2} />
      </mesh>
      {/* sello blanco en la etiqueta: hace visible el giro */}
      <mesh position={[0, -0.05, 0.635]}>
        <circleGeometry args={[0.24, 48]} />
        <meshStandardMaterial color="#fbf4ec" roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.05, 0.64]}>
        <ringGeometry args={[0.17, 0.2, 48]} />
        <meshStandardMaterial color="#16201a" roughness={0.5} />
      </mesh>
    </group>
  );
};

export const Prueba3D: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height, durationInFrames} = useVideoConfig();
  // una vuelta completa en los 3 s, con entrada y salida suaves
  const rot = interpolate(frame, [0, durationInFrames], [0, Math.PI * 2], {easing: Easing.inOut(Easing.sin)});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #2f5a47 0%, #14231b 70%)'}}>
      <ThreeCanvas width={width} height={height} camera={{position: [0, 0.4, 9], fov: 34}}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#9fd8b4" />
        {/* entorno sin archivos HDR: luces de estudio suaves para los reflejos del vidrio */}
        <Environment resolution={256}>
          <Lightformer intensity={2} position={[0, 3, 4]} scale={[6, 2, 1]} />
          <Lightformer intensity={1.2} position={[-4, 0, 2]} rotation-y={Math.PI / 2} scale={[4, 4, 1]} color="#ffe7a0" />
          <Lightformer intensity={1} position={[4, 0, 2]} rotation-y={-Math.PI / 2} scale={[4, 4, 1]} color="#9fd8b4" />
        </Environment>
        {/* luces de fondo: se ven a través del vidrio */}
        {[[-1.4, 1.6, '#f2b705'], [1.3, 0.6, '#9fd8b4'], [-0.9, -0.8, '#fbf4ec'], [1.1, 2.3, '#fbf4ec']].map(([x, y, c], i) => (
          <mesh key={i} position={[x as number, y as number, -2.5]}>
            <sphereGeometry args={[0.45, 32, 32]} />
            <meshBasicMaterial color={c as string} />
          </mesh>
        ))}
        <Botella rot={rot} />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
