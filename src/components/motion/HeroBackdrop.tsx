"use client";

import dynamic from "next/dynamic";
import { useMotionGate } from "@/lib/motion/useMotionGate";

// Lazy, no-SSR: the 3D bundle only loads in the browser, when it will be used.
const HeroCanvas = dynamic(
  () => import("./HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false },
);

/*
 * Hero background: the R3F particle "mind" when motion + WebGL are available,
 * otherwise the CSS-glow fallback. The fallback is the BASELINE (rendered on
 * SSR / no-JS / reduced-motion / no-WebGL) and is only hidden once the 3D scene
 * is allowed to mount — progressive enhancement, not a degraded path. The veil
 * is always present (it darkens the canvas edges for text contrast).
 */
export function HeroBackdrop() {
  const { mounted, webgl, reducedMotion, isNarrow } = useMotionGate();
  const show3D = mounted && webgl && !reducedMotion;

  return (
    <>
      {show3D && <HeroCanvas isNarrow={isNarrow} />}
      <div
        className="hero__fallback"
        aria-hidden="true"
        style={{ display: show3D ? "none" : "block" }}
      />
      <div className="hero__veil" aria-hidden="true" />
    </>
  );
}
