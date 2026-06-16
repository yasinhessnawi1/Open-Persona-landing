import {
  Wrench,
  FileText,
  Image as ImageIcon,
  GitBranch,
  Search,
  Check,
} from "lucide-react";

/*
 * Capabilities. Left: a 2×2 grid of tools/skills/output/routing; right: a
 * faux-live chat panel showing rich inline output (a tool pill, a diagram, a
 * generated file). The panel is role="img" with an aria-label describing it.
 */
export function Capabilities() {
  return (
    <section className="section" id="capabilities">
      <div className="wrap">
        <div className="section__head reveal">
          <p className="kicker">Capabilities</p>
          <h2>
            A persona that can
            <br />
            actually do things.
          </h2>
          <p className="lede">
            Memory makes it consistent. Tools, skills, and rich output make it
            useful. All right there in the conversation, all in character.
          </p>
        </div>
        <div className="caps__grid">
          <div className="cap-list reveal">
            <div className="cap__grid2" style={{ display: "contents" }}>
              <div className="cap">
                <span className="cap__icon">
                  <Wrench aria-hidden="true" />
                </span>
                <h3>Tools</h3>
                <p>
                  It can search the web, do the math, convert currencies,
                  generate images, and run code, plus connect to outside tools
                  through MCP.
                </p>
              </div>
              <div className="cap">
                <span className="cap__icon">
                  <FileText aria-hidden="true" />
                </span>
                <h3>Skills</h3>
                <p>
                  Ask for a document and it makes one, straight from the
                  conversation: Word, PDF, PowerPoint, Excel, or Markdown.
                </p>
              </div>
              <div className="cap">
                <span className="cap__icon">
                  <ImageIcon aria-hidden="true" />
                </span>
                <h3>Rich output</h3>
                <p>
                  Images, diagrams, and files appear right in the chat, ready to
                  read, not links to download later.
                </p>
              </div>
              <div className="cap">
                <span className="cap__icon">
                  <GitBranch aria-hidden="true" />
                </span>
                <h3>Smart routing</h3>
                <p>
                  Every turn picks the right model on its own: a powerful one
                  when the answer matters, a fast, low-cost one when it
                  doesn&apos;t.
                </p>
              </div>
            </div>
          </div>

          {/* Right column: two faux-live demos showing rich output. */}
          <div className="caps__demos reveal">
            {/* chat panel — live tools + a data-analysis chart + a generated file */}
            <div
              className="chatpanel"
              role="img"
              aria-label="Example: a travel persona searches live prices, charts a budget, and generates a PDF guide inline"
            >
              <div className="chatpanel__bar">
                <span className="av">JU</span>
                <span className="nm">Juno</span>
                <span className="tier">frontier</span>
              </div>
              <div className="chatpanel__body">
                <div className="cmsg cmsg--user">
                  Plan 3 days in Lisbon under €400 and make me a guide.
                </div>
                <span className="tool-pill">
                  <Search aria-hidden="true" /> web_search · live flights + stays
                  · 1.4s
                </span>
                <div className="cmsg cmsg--bot">
                  Here&apos;s a plan that lands at €384. Where it goes:
                  <div className="chart" aria-hidden="true">
                    <div className="chart__head">
                      <span>3-day budget</span>
                      <span className="chart__total">€384</span>
                    </div>
                    <div className="chart__bars">
                      <span className="chart__bar" style={{ height: "100%" }} />
                      <span className="chart__bar" style={{ height: "64%" }} />
                      <span className="chart__bar" style={{ height: "52%" }} />
                      <span className="chart__bar" style={{ height: "40%" }} />
                    </div>
                    <div className="chart__labels">
                      <span>stay</span>
                      <span>food</span>
                      <span>sights</span>
                      <span>transit</span>
                    </div>
                  </div>
                </div>
                <div className="cmsg cmsg--bot">
                  <div className="filerow">
                    <span className="ext">PDF</span> lisbon-3day.pdf · 6 pages ·
                    generated{" "}
                    <Check
                      aria-hidden="true"
                      style={{
                        width: 14,
                        height: 14,
                        color: "var(--store-self)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* image-generation output card */}
            <div
              className="outcard"
              role="img"
              aria-label="Example: the same persona generates a cover image inline"
            >
              <div className="outcard__bar">
                <span className="tool-pill">
                  <ImageIcon aria-hidden="true" /> generate_image · &quot;sunset
                  tram, Lisbon&quot; · 3.2s
                </span>
              </div>
              <div className="genimg" aria-hidden="true">
                <span className="genimg__cap">
                  lisbon-cover.png · generated{" "}
                  <Check
                    aria-hidden="true"
                    style={{
                      width: 13,
                      height: 13,
                      color: "var(--store-self)",
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
