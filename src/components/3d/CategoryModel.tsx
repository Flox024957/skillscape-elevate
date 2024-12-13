import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Mesh } from 'three';
import * as THREE from 'three';

interface CategoryModelProps {
  onClick: () => void;
  modelType: 'collaboration' | 'infrastructure' | 'workspace' | 'data';
}

export const CategoryModel = ({ onClick, modelType }: CategoryModelProps) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Animation on hover
  const { scale } = useSpring({
    scale: hovered ? 1.2 : 1,
    config: { mass: 1, tension: 170, friction: 26 }
  });

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.01;
  });

  // Different geometries based on category type
  const getGeometry = () => {
    switch (modelType) {
      case 'collaboration':
        return <torusKnotGeometry args={[1, 0.3, 128, 16]} />;
      case 'infrastructure':
        return <octahedronGeometry args={[1.2]} />;
      case 'workspace':
        return <dodecahedronGeometry args={[1.2]} />;
      case 'data':
        return <icosahedronGeometry args={[1.2]} />;
      default:
        return <sphereGeometry args={[1, 32, 32]} />;
    }
  };

  return (
    <animated.mesh
      ref={meshRef}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      {getGeometry()}
      <meshStandardMaterial
        color={hovered ? new THREE.Color("#8B5CF6") : new THREE.Color("#171AED")}
        metalness={0.8}
        roughness={0.2}
      />
    </animated.mesh>
  );
};