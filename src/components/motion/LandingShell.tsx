"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMotionGate } from "@/lib/motion/useMotionGate";

/*
 * The motion layer. Wraps the (server-rendered) sections and progressively
 * enhances them: smooth scroll (Lenis), earned reveals, the pinned Problem
 * beat, and the scrubbed voice waveform (GSAP + ScrollTrigger).
 *
 * GATES (built first, per the architecture):
 *   - mounted=false (SSR / no-JS) → render children plain, no Lenis, reveals
 *     visible. The static Phase-1 page IS the baseline.
 *   - reduced-motion → same: no Lenis, no GSAP, everything visible.
 *   - viewport ≤ 860px → skip the pinned Problem beat (handled inside useGSAP).
 * Only when motion is allowed do we add the `js-anim` class (which hides
 * `.reveal` for the entrance) and mount Lenis — so a failure to hydrate can
 * never leave content invisible.
 */
export function LandingShell({ children }: { children: React.ReactNode }) {
  const gate = useMotionGate();
  const motionOn = gate.mounted && !gate.reducedMotion;
  const lenisRef = useRef<LenisRef>(null);

  // ---- Lenis ⇄ GSAP ticker + ScrollTrigger sync (only when motion is on) ----
  useEffect(() => {
    if (!motionOn) return;
    gsap.registerPlugin(ScrollTrigger);

    const raf = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Drive ScrollTrigger off Lenis's scroll once the instance exists.
    let detach: (() => void) | undefined;
    const connect = () => {
      const lenis = lenisRef.current?.lenis;
      if (!lenis) return false;
      lenis.on("scroll", ScrollTrigger.update);
      detach = () => lenis.off("scroll", ScrollTrigger.update);
      return true;
    };
    const poll = connect() ? 0 : window.setInterval(() => connect() && window.clearInterval(poll), 50);

    return () => {
      gsap.ticker.remove(raf);
      if (poll) window.clearInterval(poll);
      detach?.();
    };
  }, [motionOn]);

  // ---- Reveals + scroll sequences (ported from landing.js) ------------------
  useGSAP(
    () => {
      if (!motionOn) return;
      gsap.registerPlugin(ScrollTrigger);
      const root = document.documentElement;
      root.classList.add("js-anim", "is-ready");

      // generic earned reveals (hidden via `.js-anim .reveal`, played once)
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        });
      });

      // hero headline staggered entrance (on load)
      gsap.from(".hero__inner > *", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      });

      // PINNED scroll-jacked PROBLEM beat — the stateless memory fragments away
      // while the persona's stays coherent. Only on roomy (non-narrow) viewports.
      if (!gate.isNarrow) {
        const frag = gsap.utils.toArray<HTMLElement>(
          ".panel--stateless .memrow",
        );
        gsap.set(".panel--persona", { opacity: 0, y: 0 });
        gsap.set(".problem__verdict", { opacity: 0 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".problem__stage",
            start: "top top",
            end: "+=140%",
            pin: true,
            scrub: 0.6,
          },
        });
        tl.to(".panel--persona", { opacity: 1, y: 0, duration: 0.3 }, 0);
        frag.forEach((row, i) => {
          tl.to(
            row,
            {
              opacity: 0.12,
              filter: "blur(6px)",
              x: gsap.utils.random(-40, 40),
              y: gsap.utils.random(-14, 14),
              duration: 0.5,
            },
            0.1 + i * 0.12,
          );
        });
        tl.to(".problem__verdict", { opacity: 1, duration: 0.4 }, 0.7);
      }

      // typed-memory stores assemble (staggered, left rail)
      gsap.from(".store", {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: { trigger: ".stores", start: "top 80%" },
      });
      gsap.from(".constraint-chip", {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: ".constraint-chip", start: "top 92%" },
      });

      // VOICE — scrub the waveform amplitude to scroll position (tied to scroll,
      // never autoplay). Bars "speak" as the section passes through.
      const bars = gsap.utils.toArray<HTMLElement>(".wave .bar");
      if (bars.length) {
        ScrollTrigger.create({
          trigger: ".voice",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.4,
          onUpdate: (self) => {
            const p = self.progress;
            const env = Math.sin(p * Math.PI); // 0 → 1 → 0 across the section
            bars.forEach((b, i) => {
              const wobble = 0.35 + 0.65 * Math.abs(Math.sin(i * 0.55 + p * 9));
              const h = 0.12 + env * wobble;
              b.style.transform = "scaleY(" + h.toFixed(3) + ")";
            });
          },
        });
      }

      // subtle parallax on the final-cta glow
      gsap.to(".finalcta__inner", {
        backgroundPositionY: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: ".finalcta",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Recompute trigger positions once layout settles (fonts, pin-spacing,
      // Lenis content height) so nothing fires while still off-screen.
      ScrollTrigger.refresh();
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      const t = window.setTimeout(() => ScrollTrigger.refresh(), 600);

      return () => {
        window.removeEventListener("load", onLoad);
        window.clearTimeout(t);
        root.classList.remove("js-anim", "is-ready");
      };
    },
    { dependencies: [motionOn, gate.isNarrow] },
  );

  // ---- Nav "scrolled" border (runs regardless of motion) --------------------
  useEffect(() => {
    const nav = document.querySelector(".nav");
    const onScroll = () =>
      nav?.classList.toggle("is-scrolled", window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ---- In-page anchor scrolling (respects Lenis when present) ---------------
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const lenis = lenisRef.current?.lenis;
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -64 });
      else
        el.scrollIntoView({
          behavior: gate.reducedMotion ? "auto" : "smooth",
        });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [gate.reducedMotion]);

  if (motionOn) {
    return (
      <ReactLenis
        root
        ref={lenisRef}
        options={{
          duration: 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          autoRaf: false,
        }}
      >
        {children}
      </ReactLenis>
    );
  }

  return <>{children}</>;
}
