import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { TypedMemory } from "@/components/sections/TypedMemory";
import { Voice } from "@/components/sections/Voice";
import { Capabilities } from "@/components/sections/Capabilities";
import { Architecture } from "@/components/sections/Architecture";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { LandingShell } from "@/components/motion/LandingShell";

/*
 * Open Persona landing — the 8 sections of the prototype, composed in order.
 * Sections are server components (static, SEO-friendly); LandingShell is the
 * client motion layer that progressively enhances them (Lenis + GSAP), fully
 * gated. The two R3F scenes (hero "mind", memory graph) self-gate inside Hero
 * and TypedMemory. Copy is rewritten for humans in Phase 3.
 */
export default function Home() {
  return (
    <LandingShell>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <TypedMemory />
        <Voice />
        <Capabilities />
        <Architecture />
        <FinalCta />
      </main>
      <Footer />
    </LandingShell>
  );
}
