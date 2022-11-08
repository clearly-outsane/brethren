import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import React from 'react';

const LetterB = React.forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('/models/LetterB.glb');

  const groupRef = useRef();

  // Merged creates THREE.InstancedMeshes out of the meshes you feed it
  // All in all we end up with just 5 draw-calls for the entire scene
  return (
    <group ref={groupRef} {...props}>
      <mesh
        castShadow
        ref={ref}
        scale={1.3}
        geometry={nodes.Vector_Smart_Object.geometry}
        material={materials.Material_0}
        rotation={[0, -Math.PI / 2.5, 0]}
        position={[0, 0, 0]}
        material-reflectivity={0.62}
        material-roughness={0.74}
        material-clearcoat={0.24}
        material-clearcoatRoughness={0.2}
        material-metalness={0}
        // material-emissive="#ff9f00"
      />
    </group>
  );
});
LetterB.displayName = 'LetterB';

export default LetterB;
