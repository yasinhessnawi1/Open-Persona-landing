import { ArrowRight, BookOpen } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { CopyInstall } from "@/components/CopyInstall";
import { links } from "@/lib/links";

/** Final CTA — install / app / docs. */
export function FinalCta() {
  return (
    <section className="section finalcta" id="get-started">
      <div className="wrap">
        <div className="finalcta__inner reveal">
          <p className="kicker">Get started</p>
          <h2>
            Build a persona
            <br />
            that remembers.
          </h2>
          <p className="lede">
            Install the source-available core, build on the hosted API, or just
            open the app. Star the repo and read the docs to go deeper.
          </p>
          <CopyInstall />
          <div className="finalcta__cta">
            <a className="btn btn--primary" href={links.app}>
              Open the app <ArrowRight aria-hidden="true" />
            </a>
            <a
              className="btn btn--ghost"
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon aria-hidden="true" />
              Star on GitHub
            </a>
            <a
              className="btn btn--ghost"
              href={links.docs}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookOpen aria-hidden="true" />
              Read the docs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
