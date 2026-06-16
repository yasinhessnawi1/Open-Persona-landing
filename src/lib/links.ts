/*
 * Central link registry. The GitHub repo URL is real; the rest are placeholders
 * the owner must supply before launch (Docs, PyPI, the web app / sign-up).
 *
 * Each placeholder link in the UI also carries a `data-ph="…"` attribute so the
 * remaining work is greppable — search the codebase for `data-ph` to find every
 * link that still needs a real URL (mirrors the prototype's convention).
 */
export const links = {
  github: "https://github.com/yasinhessnawi1/Open-Persona",
  // Verified live on PyPI (package name matches `pip install persona-core`).
  pypi: "https://pypi.org/project/persona-core/",
  // The hosted web app.
  app: "https://app.openperson.online",
  signup: "https://app.openperson.online/signup",
  login: "https://app.openperson.online/login",
  // Docs site is not live yet; the link points at its intended location.
  docs: "https://app.openperson.online/docs",
} as const;

/** Hash targets for in-page nav (real, internal). */
export const anchors = {
  problem: "#problem",
  memory: "#memory",
  voice: "#voice",
  capabilities: "#capabilities",
  architecture: "#architecture",
  getStarted: "#get-started",
  top: "#top",
} as const;
