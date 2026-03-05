"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, useTexture } from "@react-three/drei";
import * as THREE from "three";

/* =========================================
   Atmosphere (Directional Based Glow)
========================================= */
function Atmosphere({ sunDirection }: { sunDirection: THREE.Vector3 }) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 128, 128]} />
      <shaderMaterial
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent
        uniforms={{
          sunDir: { value: sunDirection },
        }}
        vertexShader={`
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec3 vNormal;
          uniform vec3 sunDir;
          void main() {
            float intensity = pow(max(dot(vNormal, sunDir), 0.0), 3.0);
            vec3 glow = vec3(0.25, 0.55, 1.0) * intensity;
            gl_FragColor = vec4(glow, intensity);
          }
        `}
      />
    </mesh>
  );
}

/* =========================================
   Earth
========================================= */
function Earth({ sunDirection }: { sunDirection: THREE.Vector3 }) {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  const [dayMap, nightMap, normalMap, cloudsMap] = useTexture([
    "/textures/8k_earth_daymap.jpg",
    "/textures/8k_earth_nightmap.jpg",
    "/textures/8k_earth_normal.jpg",
    "/textures/8k_earth_clouds.jpg",
  ]);

  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.0007;
    if (cloudsRef.current) cloudsRef.current.rotation.y += 0.0009;
  });

  return (
    <group>
      <mesh ref={earthRef} castShadow receiveShadow>
        <sphereGeometry args={[1.35, 256, 256]} />
        <meshStandardMaterial
          map={dayMap}
          normalMap={normalMap}
          roughness={0.7}
          metalness={0}
          emissiveMap={nightMap}
          emissive={"#ffffff"}
          emissiveIntensity={0.8}
        />
      </mesh>

      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.37, 256, 256]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>

      <Atmosphere sunDirection={sunDirection} />
    </group>
  );
}

/* =========================================
   Hero Scene
========================================= */
export default function HeroScene() {
  const sunPosition = new THREE.Vector3(-15, 12, 10).normalize();

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 36 }}
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          physicallyCorrectLights: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        {/* Minimal ambient */}
        <ambientLight intensity={0.02} />

        {/* ☀️ Real Sun Light */}
        <directionalLight
          position={[-15, 12, 10]}
          intensity={6}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Subtle cinematic rim */}
        <pointLight
          position={[6, -3, -6]}
          intensity={0.3}
          color="#1d4ed8"
        />

        {/* Stars */}
        <Stars
          radius={120}
          depth={80}
          count={7000}
          factor={4}
          fade
          speed={0.15}
        />

        {/* Earth */}
        <group position={[3.2, 0, 0]}>
          <Earth sunDirection={sunPosition} />
        </group>
      </Canvas>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B0F19]/70" />
    </div>
  );
}