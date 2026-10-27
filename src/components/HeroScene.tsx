"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import House from "@/components/House";

export default function HeroScene() {
  return (
    <div className="h-80 w-full md:h-[28rem]">
      <Canvas camera={{ position: [4, 2.5, 6], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 4]} intensity={1.4} />
        <House />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}