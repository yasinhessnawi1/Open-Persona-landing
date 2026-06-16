"use client";

import dynamic from "next/dynamic";
import { useMotionGate } from "@/lib/motion/useMotionGate";

const MemoryCanvas = dynamic(
  () => import("./MemoryCanvas").then((m) => m.MemoryCanvas),
  { ssr: false },
);

/*
 * The memory-graph scene only mounts on roomy viewports with motion + WebGL
 * (the prototype gated it behind `!isNarrow` + WebGL + !reduced-motion). When
 * it can't run, the viz slot stays empty — the left-rail store cards ARE the
 * content; the graph is enhancement. (Below 860px the slot is display:none.)
 */
export function MemoryBackdrop() {
  const { mounted, webgl, reducedMotion, isNarrow } = useMotionGate();
  const show = mounted && webgl && !reducedMotion && !isNarrow;
  if (!show) return null;
  return <MemoryCanvas />;
}
