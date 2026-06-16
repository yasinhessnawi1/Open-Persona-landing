import { Shield } from "lucide-react";
import { MemoryBackdrop } from "@/components/motion/MemoryBackdrop";

/*
 * Typed memory. Left rail = the four stores + constraint chip; right =
 * <canvas id="memory-canvas"> where Phase 2 assembles the R3F memory graph
 * (hidden below 860px by CSS). No motion this phase.
 */
export function TypedMemory() {
  return (
    <section className="section memory" id="memory">
      <div className="wrap">
        <div className="memory__layout">
          <div className="memory__sticky">
            <div className="section__head reveal">
              <p className="kicker">Typed memory</p>
              <h2>
                Four stores.
                <br />
                One mind.
              </h2>
              <p className="lede">
                Your persona doesn&apos;t just keep a chat log. It keeps four
                kinds of memory: who it is, what it&apos;s learned about itself,
                what it believes, and what you&apos;ve talked about. Plus a set
                of limits it won&apos;t cross. They stay the same whether you
                speak or type.
              </p>
            </div>
            <div className="stores">
              <div
                className="store"
                style={{ borderLeftColor: "var(--store-identity)" }}
              >
                <span
                  className="store__badge"
                  style={{ background: "var(--store-identity)" }}
                >
                  ID
                </span>
                <div>
                  <h3>identity</h3>
                  <p>
                    Who it is: its name, role, and character. Fixed, so it never
                    drifts mid-conversation.
                  </p>
                  <p className="store__meta">set once · never changes mid-chat</p>
                </div>
              </div>
              <div
                className="store"
                style={{ borderLeftColor: "var(--store-self)" }}
              >
                <span
                  className="store__badge"
                  style={{ background: "var(--store-self)" }}
                >
                  SF
                </span>
                <div>
                  <h3>self_facts</h3>
                  <p>
                    What it&apos;s learned about itself over time: what it can
                    do, what it specialises in, where its limits are.
                  </p>
                  <p className="store__meta">
                    builds up over time, nothing gets lost
                  </p>
                </div>
              </div>
              <div
                className="store"
                style={{ borderLeftColor: "var(--store-world)" }}
              >
                <span
                  className="store__badge"
                  style={{ background: "var(--store-world)" }}
                >
                  WV
                </span>
                <div>
                  <h3>worldview</h3>
                  <p>
                    Its views and stances: the opinions that keep its voice
                    consistent instead of wishy-washy.
                  </p>
                  <p className="store__meta">holds real, consistent opinions</p>
                </div>
              </div>
              <div
                className="store"
                style={{ borderLeftColor: "var(--store-episodic)" }}
              >
                <span
                  className="store__badge"
                  style={{ background: "var(--store-episodic)" }}
                >
                  EP
                </span>
                <div>
                  <h3>episodic</h3>
                  <p>
                    Everything from past conversations: the long memory that
                    lets it pick up right where you left off.
                  </p>
                  <p className="store__meta">
                    remembers long conversations, recalls what matters
                  </p>
                </div>
              </div>
            </div>
            <span className="constraint-chip">
              <Shield aria-hidden="true" />+ limits it won&apos;t cross: the
              things a persona simply will not do
            </span>
          </div>
          <div className="memory__viz" aria-hidden="true">
            <MemoryBackdrop />
          </div>
        </div>
      </div>
    </section>
  );
}
