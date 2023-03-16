import React, { Suspense } from "react";
import { Canvas, useLoader } from "react-three-fiber";
import * as THREE from "three";

import { Plane, OrbitControls, Sky } from "drei";
import "./styles.css";

const Terrain = () => {
  const height = useLoader(THREE.TextureLoader, "elevation.png");
  const normals = useLoader(THREE.TextureLoader, "normals.png");
  const colors = useLoader(THREE.TextureLoader, "colors.png");

  return (
    <group>
      <Plane
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3, 0]}
        args={[64, 64, 1024, 1024]}
      >
        <meshStandardMaterial
          attach="material"
          color="white"
          map={colors}
          metalness={0.2}
          normalMap={normals}
          displacementMap={height}
        />
      </Plane>
    </group>
  );
};

export default function App() {
  return (
    <>
      <Canvas>
        <fog attach="fog" args={["white", 0, 26]} />
        <OrbitControls autoRotate />
        <pointLight intensity={2} position={[7, 5, 1]} />
        <Sky sunPosition={[7, 5, 1]} />
        <Suspense fallback={null}>
          <Terrain />
        </Suspense>
      </Canvas>
      <a
        href="https://codeworkshop.dev/blog/2020-11-05-displacement-maps-normal-maps-and-textures-in-react-three-fiber/"
        className="blog-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Tutorial
      </a>
    </>
  );
}
