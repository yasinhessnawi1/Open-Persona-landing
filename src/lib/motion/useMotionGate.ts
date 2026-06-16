"use client";

import { useEffect, useState } from "react";
import {
  detectWebGL,
  NARROW_QUERY,
  REDUCED_MOTION_QUERY,
} from "./capabilities";

export interface MotionGate {
  /** False during SSR + the first client render. Until true, assume the most
   *  conservative state (no motion, no 3D) so the static Phase-1 baseline is
   *  what ships if JS never hydrates. */
  mounted: boolean;
  /** prefers-reduced-motion: reduce — kills Lenis, GSAP, and 3D. */
  reducedMotion: boolean;
  /** WebGL available — required for the hero R3F scene. */
  webgl: boolean;
  /** Viewport ≤ 860px — disables the pinned Problem beat + the memory graph. */
  isNarrow: boolean;
}

const CONSERVATIVE: MotionGate = {
  mounted: false,
  reducedMotion: true,
  webgl: false,
  isNarrow: true,
};

/*
 * Single source of truth for whether motion/3D may run. Reactive: re-evaluates
 * when the user toggles reduced-motion or crosses the 860px breakpoint, so the
 * gates respond live (a resize past 860px tears down the pinned beat / memory
 * graph; switching on reduce-motion stops everything). SSR-safe — starts
 * conservative and upgrades only after mount.
 */
export function useMotionGate(): MotionGate {
  const [gate, setGate] = useState<MotionGate>(CONSERVATIVE);

  useEffect(() => {
    const reduced = window.matchMedia(REDUCED_MOTION_QUERY);
    const narrow = window.matchMedia(NARROW_QUERY);

    const update = () =>
      setGate({
        mounted: true,
        reducedMotion: reduced.matches,
        webgl: detectWebGL(),
        isNarrow: narrow.matches,
      });

    update();
    reduced.addEventListener("change", update);
    narrow.addEventListener("change", update);
    return () => {
      reduced.removeEventListener("change", update);
      narrow.removeEventListener("change", update);
    };
  }, []);

  return gate;
}
