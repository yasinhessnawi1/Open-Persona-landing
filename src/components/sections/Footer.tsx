import Image from "next/image";
import { links, anchors } from "@/lib/links";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__row">
        <a className="brand" href={anchors.top}>
          <Image
            src="/brand/logo-lockup-horizontal-dark.svg"
            alt="Open Persona"
            width={132}
            height={37}
            unoptimized
            className="brand__logo"
          />
        </a>
        <nav className="footer__links" aria-label="Footer">
          <a href={anchors.problem}>Why</a>
          <a href={anchors.memory}>Typed memory</a>
          <a href={anchors.voice}>Voice</a>
          <a href={anchors.capabilities}>Capabilities</a>
          <a href={anchors.architecture}>Architecture</a>
          <a href={links.docs} target="_blank" rel="noopener noreferrer">
            Docs
          </a>
          <a href={links.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={links.pypi} target="_blank" rel="noopener noreferrer">
            PyPI
          </a>
        </nav>
        <span className="footer__note">
          Real memory · smart routing · source-available core
        </span>
      </div>
    </footer>
  );
}
