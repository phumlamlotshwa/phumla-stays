"use client";

import { useMemo } from "react";
import { Shape } from "three";

const colors = {
  walls: "#EDE8DC",
  roof: "#4F6B54",
  trim: "#2B2F2C",
  window: "#C9A227",
  ground: "#7A9A7E",
};

// house size
const width = 2.4;
const depth = 1.8;
const wallHeight = 1.4;
const roofRise = 0.9;

// roof slope worked out from the size above
const halfWidth = width / 2;
const slopeLength = Math.hypot(halfWidth, roofRise);
const slopeAngle = Math.atan2(roofRise, halfWidth);
const overhang = 0.25;
const roofThickness = 0.08;

function Gables() {
  const triangle = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(-halfWidth, 0);
    shape.lineTo(halfWidth, 0);
    shape.lineTo(0, roofRise);
    shape.closePath();
    return shape;
  }, []);

  return (
    <mesh position={[0, wallHeight, -depth / 2]}>
      <extrudeGeometry args={[triangle, { depth, bevelEnabled: false }]} />
      <meshStandardMaterial color={colors.walls} />
    </mesh>
  );
}

function RoofPanel({ side }: { side: 1 | -1 }) {
  const length = slopeLength + overhang;
  const dirX = Math.cos(slopeAngle);
  const dirY = Math.sin(slopeAngle);

  // centre of the slope, nudged down for the overhang and out for thickness
  const x = side * (halfWidth / 2 + (overhang / 2) * dirX + (roofThickness / 2) * dirY);
  const y = wallHeight + roofRise / 2 - (overhang / 2) * dirY + (roofThickness / 2) * dirX;

  return (
    <mesh position={[x, y, 0]} rotation={[0, 0, -side * slopeAngle]}>
      <boxGeometry args={[length, roofThickness, depth + overhang]} />
      <meshStandardMaterial color={colors.roof} />
    </mesh>
  );
}

export default function House() {
  const front = depth / 2 + 0.01;

  return (
    <group position={[0, -1, 0]}>
      {/* ground */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[2.3, 2.3, 0.1, 64]} />
        <meshStandardMaterial color={colors.ground} />
      </mesh>

      {/* walls */}
      <mesh position={[0, wallHeight / 2, 0]}>
        <boxGeometry args={[width, wallHeight, depth]} />
        <meshStandardMaterial color={colors.walls} />
      </mesh>

      <Gables />
      <RoofPanel side={-1} />
      <RoofPanel side={1} />

      {/* chimney */}
      <mesh position={[0.65, wallHeight + roofRise * 0.75, -0.35]}>
        <boxGeometry args={[0.28, 0.7, 0.28]} />
        <meshStandardMaterial color={colors.trim} />
      </mesh>

      {/* gold window under the peak, same as the logo */}
      <mesh position={[0, wallHeight + 0.3, front]}>
        <boxGeometry args={[0.38, 0.38, 0.04]} />
        <meshStandardMaterial color={colors.window} />
      </mesh>

      {/* door */}
      <mesh position={[0, 0.45, front]}>
        <boxGeometry args={[0.5, 0.9, 0.04]} />
        <meshStandardMaterial color={colors.trim} />
      </mesh>

      {/* side windows */}
      {[-0.8, 0.8].map((x) => (
        <mesh key={x} position={[x, 0.75, front]}>
          <boxGeometry args={[0.4, 0.4, 0.04]} />
          <meshStandardMaterial color={colors.window} />
        </mesh>
      ))}
    </group>
  );
}