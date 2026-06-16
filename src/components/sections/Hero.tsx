import { ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { HeroBackdrop } from "@/components/motion/HeroBackdrop";
import { links } from "@/lib/links";

/*
 * Hero. The <canvas id="hero-canvas"> and .hero__fallback are kept in the DOM
 * for Phase 2 to attach the R3F particle "mind" / CSS-glow fallback. With no
 * motion (this phase) the section renders text over the veil + body glow.
 */
export function Hero() {
  return (
    <section className="hero" id="top">
      <HeroBackdrop />
      <div className="wrap hero__inner">
        <p className="kicker">AI personas with real memory</p>
        <h1>
          They remember you.
          <br />
          And they stay <span className="accent">themselves.</span>
        </h1>
        <p className="lede hero__lede">
          Most chatbots forget. Keep talking and they drift. The name stays,
          but the character doesn&apos;t. Open Persona personas have real memory
          and one consistent identity, whether you type to them or talk out
          loud.
        </p>
        <div className="hero__cta">
          <a className="btn btn--primary" href={links.signup}>
            Start building <ArrowRight aria-hidden="true" />
          </a>
          <a
            className="btn btn--ghost"
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon aria-hidden="true" />
            Source-available
          </a>
        </div>
        <div className="hero__meta">
          <div
            className="tier-rail"
            title="Each turn automatically picks the right model: fast and cheap when it can, powerful when it counts"
          >
            <span className="lbl">Routing</span>
            <span className="dot" style={{ background: "var(--tier-small)" }} />
            <span className="line" />
            <span className="dot" style={{ background: "var(--tier-mid)" }} />
            <span className="line" />
            <span
              className="dot"
              style={{ background: "var(--tier-frontier)" }}
            />
            <span className="lbl">fast · balanced · powerful</span>
          </div>
        </div>
      </div>
    </section>
  );
}
