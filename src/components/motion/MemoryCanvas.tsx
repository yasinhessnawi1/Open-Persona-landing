"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/*
 * The typed-memory graph: four store-clusters + their links assemble around a
 * central identity core as the section enters = the four stores becoming one
 * mind. Ported from landing.js initMemoryGraph(). Cluster colours mirror the
 * four --store-* tokens (teal / forest / indigo / rose) as three.Color hex; the
 * core is vermilion (--primary).
 */

interface GraphScene {
  group: THREE.Group;
  dispose: () => void;
}

// Built off the render path (uses Math.random — kept out of render for purity).
function buildGraph(): GraphScene {
  const group = new THREE.Group();
  const disposers: Array<() => void> = [];
  const storeHues = [
    new THREE.Color("#1ba89a"), // teal   180  (--store-identity)
    new THREE.Color("#56a14e"), // forest 135  (--store-self)
    new THREE.Color("#7a7bd6"), // indigo 270  (--store-world)
    new THREE.Color("#d25e93"), // rose   340  (--store-episodic)
  ];
  const R = 2.7;
  for (let i = 0; i < 4; i++) {
    const ang = (i / 4) * Math.PI * 2;
    const v = new THREE.Vector3(Math.cos(ang) * R, Math.sin(ang) * R, 0);
    // each store = a little cluster of points
    const N = 90;
    const p = new Float32Array(N * 3);
    for (let j = 0; j < N; j++) {
      p[j * 3] = v.x + (Math.random() - 0.5) * 1.0;
      p[j * 3 + 1] = v.y + (Math.random() - 0.5) * 1.0;
      p[j * 3 + 2] = v.z + (Math.random() - 0.5) * 1.0;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(p, 3));
    const m = new THREE.PointsMaterial({
      size: 0.07,
      color: storeHues[i],
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    group.add(new THREE.Points(g, m));
    disposers.push(() => {
      g.dispose();
      m.dispose();
    });
    // link to centre
    const lg = new THREE.BufferGeometry();
    lg.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array([0, 0, 0, v.x, v.y, v.z]), 3),
    );
    const lm = new THREE.LineBasicMaterial({
      color: storeHues[i],
      transparent: true,
      opacity: 0.32,
    });
    group.add(new THREE.Line(lg, lm));
    disposers.push(() => {
      lg.dispose();
      lm.dispose();
    });
  }
  // central identity core
  const coreGeo = new THREE.SphereGeometry(0.4, 24, 24);
  const coreMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#e85d3a"),
    transparent: true,
    opacity: 0.9,
  });
  group.add(new THREE.Mesh(coreGeo, coreMat));
  disposers.push(() => {
    coreGeo.dispose();
    coreMat.dispose();
  });

  return { group, dispose: () => disposers.forEach((d) => d()) };
}

function MemoryGraph() {
  const groupRef = useRef<THREE.Group>(null);
  const memRef = useRef<HTMLElement | null>(null);
  const prog = useRef(0);
  const [scene, setScene] = useState<GraphScene | null>(null);

  // One-time bootstrap of an external system (a WebGL scene), not derived state
  // — building uses Math.random so it must stay off the render path.
  useEffect(() => {
    const built = buildGraph();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- WebGL scene bootstrap
    setScene(built);
    return () => built.dispose();
  }, []);

  useEffect(() => {
    memRef.current = document.querySelector(".memory");
  }, []);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const t = state.clock.getElapsedTime();
    const mem = memRef.current;
    if (mem) {
      const r = mem.getBoundingClientRect();
      const vh = window.innerHeight;
      // mirrors ScrollTrigger(start:"top bottom", end:"bottom top").progress
      prog.current = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
    }
    // assemble: clusters pull toward their orbit as the section enters.
    const assemble = Math.min(1, Math.max(0, (prog.current - 0.1) * 2.2));
    group.scale.setScalar(0.6 + assemble * 0.4);
    group.rotation.z = t * 0.06;
    group.rotation.y = Math.sin(t * 0.3) * 0.25;
  });

  if (!scene) return null;
  return <primitive object={scene.group} ref={groupRef} />;
}

/** Canvas wrapper sized to the viz slot (square, capped at 60vh). dpr ≤ 2. */
export function MemoryCanvas() {
  return (
    <Canvas
      style={{
        width: "100%",
        aspectRatio: "1 / 1",
        maxHeight: "60vh",
        display: "block",
      }}
      camera={{ fov: 50, position: [0, 0, 7], near: 0.1, far: 100 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      // Decorative: hide the <canvas> from assistive tech directly (R3F doesn't
      // forward aria-hidden). The .memory__viz wrapper is already aria-hidden too.
      onCreated={({ gl }) => gl.domElement.setAttribute("aria-hidden", "true")}
    >
      <MemoryGraph />
    </Canvas>
  );
}
