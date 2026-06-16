"use client";

import { useState } from "react";

const INSTALL_CMD = "pip install persona-core";

/** The install command with a copy-to-clipboard button (ported from the
 *  prototype's #copy-install handler). Client component — the only interactive
 *  bit in the Final CTA. */
export function CopyInstall() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="install">
      <span className="dollar">$</span>
      <span>{INSTALL_CMD}</span>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard?.writeText(INSTALL_CMD);
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        }}
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}
