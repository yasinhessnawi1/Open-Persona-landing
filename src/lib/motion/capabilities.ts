/*
 * Capability detection used to GATE motion + 3D. These are the same checks the
 * prototype made in landing.js, lifted into one place so every motion component
 * gates identically. All are client-only (touch window/document) — call them
 * after mount.
 */

/** True if the browser can create a WebGL context (the hero R3F scene needs it;
 *  without it the hero falls back to the CSS glow). Mirrors landing.js webglOK(). */
export function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/** Breakpoint below which the pinned Problem beat and the 3D memory graph are
 *  disabled (the prototype's `max-width: 860px` gate). */
export const NARROW_QUERY = "(max-width: 860px)";

/** prefers-reduced-motion: reduce. */
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
