# Open Persona — landing page

The marketing landing page for **Open Persona**: AI personas with real, typed
memory and one consistent identity across voice and text. A standalone,
Vercel-deployable **Next.js (App Router) + TypeScript + Tailwind v4** project.
It sells the vision; the product app is separate.

Built from the design prototype now archived in
[`docs/design-reference/`](docs/design-reference/) (Claude Design's static
HTML/CSS/JS), realised faithfully in React and elevated where the real stack
(React Three Fiber, GSAP, Lenis) allows.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

Node 20+. No environment variables are required to run or build.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** · **Tailwind v4**
- **Motion:** `lenis` (smooth scroll) + `gsap` / ScrollTrigger via `@gsap/react`'s `useGSAP`
- **3D:** `three` + `@react-three/fiber` + `@react-three/drei` (two scenes, lazy, no-SSR)
- **Icons:** `lucide-react` (GitHub mark reproduced locally — lucide v1 dropped brand icons)
- **Fonts:** `next/font` self-hosting **Fraunces** (display) / **Geist** (UI) / **Geist Mono** (code)

## Project structure

```
src/
  app/            layout.tsx (fonts, metadata, dark theme) · page.tsx (composes sections) · globals.css
  components/
    sections/     Nav · Hero · Problem · TypedMemory · Voice · Capabilities · Architecture · FinalCta · Footer
    motion/       LandingShell (Lenis + GSAP) · HeroBackdrop/HeroCanvas · MemoryBackdrop/MemoryCanvas
    icons/        GithubIcon
    CopyInstall.tsx
  config/         launch.ts  ← the VOICE_LIVE toggle (see below)
  lib/            links.ts   ← central URL registry (placeholders + real)
  styles/
    tokens/       colors · typography · spacing · glass · base · fonts  (the Open Persona design system)
    landing.css · components.css
docs/
  design-reference/   the original static prototype (design source of truth)
  copy-grounding.md   what's shipped vs in-flight (the copy was written against this)
```

### Design system

The design tokens in [`src/styles/tokens/`](src/styles/tokens/) are the Open
Persona design system, reused verbatim from the product app so the landing stays
visually identical to it. **Do not rename `--primary` / `--accent`** — the
product's shadcn/Clerk primitives depend on those names. Every colour resolves to
a token; a few reused page-chrome surfaces are named `--surface-panel/base/sunken`
in `landing.css`, with decorative one-off washes documented inline.

Adding a section later is one component file + one line in
[`src/app/page.tsx`](src/app/page.tsx).

## Accessibility & quality

- **axe: 0 violations** (WCAG 2.0/2.1 A & AA + best-practice). Semantic landmarks,
  single `h1`, named navs, `aria-hidden` 3D canvases, labelled chat panel, visible
  keyboard focus rings, AA contrast.
- **Progressive enhancement:** the static page is the complete baseline; motion +
  3D layer on top, fully gated. A reduced-motion user, a no-WebGL browser, and a
  mobile (≤860px) viewport each get the full, faithful page — no Lenis, no 3D
  (CSS-glow hero fallback), all content visible, no pinned/scrubbed motion.
- **Performance:** 3D is code-split and lazy (no SSR), pixel-ratio capped at 2, the
  hero loop pauses when scrolled out of view, hero copy is server-rendered for LCP.

---

## The one launch decision: the voice claim

The in-product, real-time voice **experience** (the browser voice client) is still
in flight, so by default the page frames live voice as **"coming soon."** The
V5-shipped voice→text memory story (the Astrid recall example) is shown either way
— that part is accurate today.

Flip a single value in [`src/config/launch.ts`](src/config/launch.ts) at deploy:

```ts
export const VOICE_LIVE = false; // true ONLY if launching alongside live voice
```

`true` makes the Voice section, the `persona-api` layer line, and the `<meta>`
description state voice in the present tense. **Set this deliberately when you
deploy** — leave it `false` if voice isn't live for visitors yet.

## What you must supply before launch

| Item | Where | Status |
|---|---|---|
| **Voice-demo video** | the hidden placeholder in `Voice.tsx` (`data-ph="voice demo video"`) | placeholder |
| **Voice claim** | `VOICE_LIVE` in `src/config/launch.ts` | decide at deploy |
| Brand (logo, favicons, OG) | `public/brand/*`, wired in `Nav.tsx` / `Footer.tsx` / `layout.tsx` | wired |
| App / sign-up / log-in | `links.app` / `links.signup` / `links.login` → `app.openpersona.online` | wired |
| Docs | `links.docs` → `app.openpersona.online/docs` | wired (site not live yet) |
| GitHub repo | `links.github` | wired |
| PyPI (`persona-core`) | `links.pypi` | wired (verified on PyPI) |

All URLs live in one place — [`src/lib/links.ts`](src/lib/links.ts). The only
in-page placeholder left is the voice-demo video (`data-ph="voice demo video"`).
The social/OG `metadataBase` in `layout.tsx` is set to `https://openpersona.online`
— update it if the landing deploys to a different domain.
*(Optional: the page uses faux in-brand panels instead of product screenshots by
design — swap in real captures if you prefer.)*

## Deploy (Vercel)

Vercel auto-detects Next.js — no `vercel.json` needed. Import the repo (or run
`vercel` from the CLI); the build command and output are detected automatically.
Security headers are set in [`next.config.ts`](next.config.ts).

> Deploying publishes the page publicly. Supply the assets above and set
> `VOICE_LIVE` first, then deploy when you're ready.

## License

The Open Persona product's source-available core is **PolyForm Noncommercial
1.0.0**. This landing page is part of the Open Persona project; apply the
project's licensing.
