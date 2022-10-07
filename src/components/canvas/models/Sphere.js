/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unused-imports/no-unused-vars */
import { Float, useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Sphere({ index, z }) {
  const meshRef = useRef();
  const { nodes, materials } = useGLTF('/models/LetterB.glb');
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z]);
  const [speed] = useState(() => 0.1 + Math.random() / 10);

  const position = useMemo(() => {
    const z = Math.random() * -10 + 12;
    const bounds = viewport.getCurrentViewport(camera, [0, 0, z]);
    return [
      THREE.MathUtils.randFloatSpread(bounds.width),
      THREE.MathUtils.randFloatSpread(bounds.height * 0.45) + bounds.height / 2,
      z,
    ];
  }, [viewport]);

  return (
    <Float
      position={position}
      speed={speed}
      rotationIntensity={10}
      floatIntensity={40}
      dispose={null}
    >
      <mesh ref={meshRef} material={materials.Material_0}>
        <sphereGeometry />
      </mesh>
    </Float>
  );
}
