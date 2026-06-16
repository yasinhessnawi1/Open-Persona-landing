import { VOICE_LIVE } from "@/config/launch";

/*
 * Architecture — four layers, source-available core. Each .layer carries
 * `reveal` (plays once on enter in Phase 2); connectors are static 1px lines.
 */
export function Architecture() {
  return (
    <section className="section" id="architecture">
      <div className="wrap">
        <div
          className="section__head reveal"
          style={{ marginInline: "auto", textAlign: "center" }}
        >
          <p className="kicker">How it works</p>
          <h2>
            Four layers.
            <br />
            Source-available core.
          </h2>
          <p className="lede" style={{ marginInline: "auto" }}>
            Four layers, each building on the one beneath it. Voice isn&apos;t a
            separate product bolted on. It&apos;s the same engine with audio
            wrapped around it. Real architecture, not a thin wrapper.
          </p>
        </div>
        <div className="arch__layers">
          <div className="layer reveal">
            <span className="layer__idx">01</span>
            <div>
              <h3>persona-web</h3>
              <p>
                The app you use: create personas, chat, and manage your account.
              </p>
            </div>
            <span className="layer__pill layer__pill--hosted">hosted</span>
          </div>
          <div className="layer__conn" aria-hidden="true" />
          <div className="layer reveal">
            <span className="layer__idx">02</span>
            <div>
              <h3>persona-api</h3>
              <p>
                The service that runs your personas:{" "}
                {VOICE_LIVE
                  ? "chat, voice, and real actions"
                  : "chat and real actions"}
                , streamed in real time.
              </p>
            </div>
            <span className="layer__pill layer__pill--hosted">hosted</span>
          </div>
          <div className="layer__conn" aria-hidden="true" />
          <div className="layer reveal">
            <span className="layer__idx">03</span>
            <div>
              <h3>persona-runtime</h3>
              <p>
                The brain of each turn: it picks the model, builds the context,
                keeps the thread, and can plan, act, and check its own work.
              </p>
            </div>
            <span className="layer__pill layer__pill--open">source-available</span>
          </div>
          <div className="layer__conn" aria-hidden="true" />
          <div className="layer reveal">
            <span className="layer__idx">04</span>
            <div>
              <h3>persona-core</h3>
              <p>
                The foundation: the four kinds of memory, the persona format,
                model connections, image generation, a safe code sandbox, and a
                command-line tool.{" "}
                <code
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8em",
                    color: "var(--foreground)",
                  }}
                >
                  pip install persona-core
                </code>
              </p>
            </div>
            <span className="layer__pill layer__pill--open">source-available</span>
          </div>
        </div>
      </div>
    </section>
  );
}
