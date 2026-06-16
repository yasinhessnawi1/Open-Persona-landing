import { VOICE_LIVE } from "@/config/launch";

/*
 * Real-time voice. Left: the spoken→typed recall story; right: the waveform
 * whose amplitude Phase 2 scrubs to scroll position. The 36 bars are static
 * here (CSS at-rest scaleY). The voice-demo video placeholder is kept in the
 * source (hidden) and marked with data-ph.
 *
 * The "coming soon" framing is driven by VOICE_LIVE (see src/config/launch.ts):
 * the live in-product voice experience is V6/in-flight, so it's soft by default.
 */
const WAVE_BARS = 36;

export function Voice() {
  return (
    <section className="section voice" id="voice">
      <div className="wrap voice__inner">
        <div className="reveal">
          <p className="kicker">
            Real-time voice{VOICE_LIVE ? "" : " · coming soon"}
          </p>
          <h2 className="section__head" style={{ marginBottom: 0 }}>
            Say it out loud.
            <br />
            It remembers when you type.
          </h2>
          <p
            className="lede"
            style={{ marginTop: "1.2rem", maxWidth: "42ch" }}
          >
            Voice and text aren&apos;t two separate products. They&apos;re one
            persona, with one memory and one identity, never two bots bolted
            together. When you speak to it, it answers in its own voice, drawing
            on the same memory as your typed conversations.
            {VOICE_LIVE ? "" : " Live voice is arriving soon."}
          </p>
          <div className="turns">
            <div className="turn turn--voice">
              <span className="turn__mode">▮ Voice · spoken</span>
              &quot;I keep blanking on ser versus estar. Can we drill it next
              time?&quot;
            </div>
            <div className="turn turn--text">
              <span className="turn__mode">⌨ Text · 5 days later</span>
              what should I practice today?
            </div>
            <div className="turn turn--voice">
              <span className="turn__mode">▮ Same persona · same memory</span>
              &quot;Ser versus estar: you flagged it last week. Here are three
              quick ones.&quot;
            </div>
          </div>
          {/* PLACEHOLDER: drop the real voice-demo video here (replace this
              block). Kept in source but hidden in the frontend. */}
          <p
            className="kicker kicker--muted ph"
            style={{ marginTop: "1.6rem", display: "none" }}
            data-ph="voice demo video"
          >
            ▶ Placeholder: swap in the real voice-demo video
          </p>
        </div>
        <div className="voicecard reveal">
          <div className="voicecard__head">
            <span className="voicecard__av" aria-hidden="true">
              LI
            </span>
            <div>
              <div className="voicecard__nm">Lina</div>
              <div className="voicecard__role">Spanish tutor</div>
            </div>
            <span className="voicecard__state">
              <span className="voicecard__pulse" aria-hidden="true" />
              {VOICE_LIVE ? "Speaking" : "Preview"}
            </span>
          </div>
          <div className="wave" aria-hidden="true">
            {Array.from({ length: WAVE_BARS }, (_, i) => (
              <span className="bar" key={i} />
            ))}
          </div>
          <p className="voicecard__cap">
            <b>Ser versus estar:</b> you flagged it last week.
          </p>
        </div>
      </div>
    </section>
  );
}
