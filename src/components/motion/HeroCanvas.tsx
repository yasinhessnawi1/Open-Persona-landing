"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/*
 * The hero "mind": a breathing spherical particle field with a glowing
 * vermilion core + mouse parallax = presence. Ported from landing.js initHero()
 * to declarative R3F. Scroll consolidates the mind (it shrinks, recedes, fades).
 * Colours mirror the design tokens (vermilion --primary, indigo store-world,
 * warm light) as three.Color hex — a canvas can't read OKLCH custom properties.
 */

interface ParticleField {
  geometry: THREE.BufferGeometry;
  material: THREE.PointsMaterial;
  base: Float32Array;
  seed: Float32Array;
  count: number;
}

// Built off the render path (uses Math.random — kept out of render for purity).
function buildParticleField(isNarrow: boolean): ParticleField {
  const count = isNarrow ? 1600 : 3200;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  const cA = new THREE.Color("#e85d3a"); // vermilion (oklch 0.66 0.19 33)
  const cB = new THREE.Color("#6f74d6"); // indigo    (oklch 0.62 0.13 270)
  const cC = new THREE.Color("#e7d6bd"); // warm light (oklch 0.86 0.04 75)
  for (let i = 0; i < count; i++) {
    const shell = Math.random() > 0.32;
    const r = shell ? 2.5 + Math.random() * 0.16 : Math.random() * 2.4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    const m = Math.random();
    const col = m < 0.6 ? cA : m < 0.85 ? cC : cB;
    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
    seed[i] = Math.random() * Math.PI * 2;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({
    size: 0.032,
    vertexColors: true,
    transparent: true,
    opacity: 0.92,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  return { geometry, material, base: positions.slice(), seed, count };
}

function HeroMind({ isNarrow }: { isNarrow: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const pointer = useRef({ tmx: 0, tmy: 0, mx: 0, my: 0 });
  const [field, setField] = useState<ParticleField | null>(null);

  // Build (and dispose) the particle field off-render, rebuilding on density
  // change. This is a one-time bootstrap of an external system (a WebGL scene),
  // not derived state — the case the set-state-in-effect rule's own guidance
  // exempts; building uses Math.random so it must stay off the render path.
  useEffect(() => {
    const built = buildParticleField(isNarrow);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- WebGL scene bootstrap
    setField(built);
    return () => {
      built.geometry.dispose();
      built.material.dispose();
    };
  }, [isNarrow]);

  useEffect(() => {
    heroRef.current = document.querySelector(".hero");
    const onMove = (e: PointerEvent) => {
      pointer.current.tmx = e.clientX / window.innerWidth - 0.5;
      pointer.current.tmy = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points || !field) return;
    const geometry = points.geometry as THREE.BufferGeometry;
    const material = points.material as THREE.PointsMaterial;
    const t = state.clock.getElapsedTime();
    const p = pointer.current;
    p.mx += (p.tmx - p.mx) * 0.04;
    p.my += (p.tmy - p.my) * 0.04;

    // 0 at top of hero → 1 once the hero has scrolled past.
    let scrollP = 0;
    const hero = heroRef.current;
    if (hero) {
      const r = hero.getBoundingClientRect();
      scrollP = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
    }

    points.rotation.y = t * 0.045 + p.mx * 0.5 + scrollP * 0.9;
    points.rotation.x = p.my * 0.4;
    const sc = 1 - scrollP * 0.55;
    points.scale.setScalar(sc);
    points.position.y = scrollP * 1.6;
    material.opacity = 0.92 * (1 - scrollP * 0.6);

    // gentle "breathing" — memory shimmering, not noisy.
    const arr = geometry.attributes.position.array as Float32Array;
    const { base, seed, count } = field;
    for (let i = 0; i < count; i++) {
      const k = 1 + 0.012 * Math.sin(t * 1.3 + seed[i]);
      arr[i * 3] = base[i * 3] * k;
      arr[i * 3 + 1] = base[i * 3 + 1] * k;
      arr[i * 3 + 2] = base[i * 3 + 2] * k;
    }
    geometry.attributes.position.needsUpdate = true;
  });

  if (!field) return null;
  return (
    <points ref={pointsRef} geometry={field.geometry} material={field.material} />
  );
}

/**
 * Canvas wrapper. Pixel-ratio capped at 2 (dpr={[1,2]}); the render loop is
 * paused (frameloop="never") whenever the hero is scrolled out of view, via an
 * IntersectionObserver — the perf guarantee from the quality bar.
 */
export function HeroCanvas({ isNarrow }: { isNarrow: boolean }) {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <Canvas
      style={{ position: "absolute", inset: 0, zIndex: 0, display: "block" }}
      camera={{ fov: 55, position: [0, 0, 6.2], near: 0.1, far: 100 }}
      dpr={[1, 2]}
      frameloop={active ? "always" : "never"}
      gl={{ alpha: true, antialias: true }}
      // Decorative: hide the <canvas> from assistive tech (R3F doesn't forward
      // aria-hidden to the DOM canvas, so set it on the element directly).
      onCreated={({ gl }) => gl.domElement.setAttribute("aria-hidden", "true")}
    >
      <HeroMind isNarrow={isNarrow} />
    </Canvas>
  );
}
