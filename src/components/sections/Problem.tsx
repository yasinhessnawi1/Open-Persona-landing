/*
 * The Problem (pinned in Phase 2). Two panels: a stateless bot whose memory
 * fragments, and the persona whose typed memory holds. Phase 2 pins the stage
 * and scrubs the fragmentation; here both panels render fully (no inline
 * opacity:0 — the GSAP timeline will set initial states in Phase 2).
 */
export function Problem() {
  return (
    <section className="problem" id="problem">
      <div className="problem__stage">
        <div className="wrap">
          <div
            className="section__head reveal"
            style={{ marginBottom: "clamp(28px,5vh,56px)" }}
          >
            <p className="kicker">The problem</p>
            <h2>
              AI forgets.
              <br />
              Personas drift.
            </h2>
            <p className="lede">
              An ordinary chatbot rebuilds who it is from scratch every message.
              Keep talking and the character erodes: facts contradict, the voice
              wanders, the rules slip. Open Persona holds the line.
            </p>
          </div>
          <div className="problem__grid">
            <div className="panel panel--stateless reveal">
              <p className="panel__tag">Stateless chatbot · turn 14</p>
              <h3 style={{ margin: "0.5rem 0 1rem" }}>
                Memory rebuilt every turn
              </h3>
              <div className="frag">
                <div className="memrow">
                  <span className="key">name</span>
                  <span className="val">
                    &quot;Lina&quot; · then &quot;Lena&quot; · then ?
                  </span>
                </div>
                <div className="memrow">
                  <span className="key">stance</span>
                  <span className="val">immersion → drills → contradicts</span>
                </div>
                <div className="memrow">
                  <span className="key">recall</span>
                  <span className="val">&quot;we never did ser vs estar&quot;</span>
                </div>
                <div className="memrow">
                  <span className="key">voice</span>
                  <span className="val">warm → clipped → generic</span>
                </div>
                <div className="memrow">
                  <span className="key">limits</span>
                  <span className="val">hands you the answer</span>
                </div>
              </div>
            </div>
            <div className="panel panel--persona reveal">
              <p className="panel__tag">Open Persona · turn 14</p>
              <h3 style={{ margin: "0.5rem 0 1rem" }}>Typed memory, intact</h3>
              <div>
                <div className="memrow">
                  <span
                    className="memdot"
                    style={{ background: "var(--store-identity)" }}
                  />
                  <span className="key">identity</span>
                  <span className="val">Lina, fixed at runtime</span>
                </div>
                <div className="memrow">
                  <span
                    className="memdot"
                    style={{ background: "var(--store-self)" }}
                  />
                  <span className="key">self_facts</span>
                  <span className="val">teaches conversational Spanish</span>
                </div>
                <div className="memrow">
                  <span
                    className="memdot"
                    style={{ background: "var(--store-world)" }}
                  />
                  <span className="key">worldview</span>
                  <span className="val">immersion over grammar drills</span>
                </div>
                <div className="memrow">
                  <span
                    className="memdot"
                    style={{ background: "var(--store-episodic)" }}
                  />
                  <span className="key">episodic</span>
                  <span className="val">knows you mix up ser/estar</span>
                </div>
                <div className="memrow">
                  <span
                    className="memdot"
                    style={{ background: "var(--primary)" }}
                  />
                  <span className="key">constraint</span>
                  <span className="val">never just gives the answer</span>
                </div>
              </div>
            </div>
          </div>
          {/* No `reveal` class on purpose: the verdict is the payoff, so the
              pinned timeline alone reveals it — after the stateless memory has
              visibly fragmented — rather than the generic on-enter reveal. With
              motion off / on mobile (no timeline) it renders visible by default. */}
          <p
            className="lede problem__verdict"
            style={{
              textAlign: "center",
              marginTop: "clamp(28px,5vh,52px)",
            }}
          >
            The persona you talk to is the same one you type to, at
            message&nbsp;2 and at message&nbsp;200.
          </p>
        </div>
      </div>
    </section>
  );
}
