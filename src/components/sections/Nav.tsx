import Image from "next/image";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { links, anchors } from "@/lib/links";

/** Fixed top nav. `is-scrolled` border is toggled by JS in Phase 2. */
export function Nav() {
  return (
    <header className="nav">
      <a className="brand" href={anchors.top}>
        <Image
          src="/brand/logo-lockup-horizontal-dark.svg"
          alt="Open Persona"
          width={132}
          height={37}
          priority
          unoptimized
          className="brand__logo"
        />
      </a>
      <div className="nav__spacer" />
      <nav className="nav__links" aria-label="Primary">
        <a className="nav__link" href={anchors.problem}>
          Why
        </a>
        <a className="nav__link" href={anchors.memory}>
          Memory
        </a>
        <a className="nav__link" href={anchors.capabilities}>
          Capabilities
        </a>
        <a className="nav__link" href={anchors.architecture}>
          Architecture
        </a>
        <a
          className="nav__link"
          href={links.docs}
          target="_blank"
          rel="noopener noreferrer"
        >
          Docs
        </a>
        <a className="nav__link" href={links.login}>
          Log in
        </a>
      </nav>
      <a
        className="btn btn--ghost"
        href={links.github}
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubIcon aria-hidden="true" />
        Star
      </a>
      <a className="btn btn--primary" href={links.signup}>
        Get started
      </a>
    </header>
  );
}
