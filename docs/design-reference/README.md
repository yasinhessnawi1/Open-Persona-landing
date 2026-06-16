# Open Persona — landing page

A standalone, award-bar marketing page for Open Persona, built **on the Open Persona design system** (dark "editorial instrument" mode). Separate from the web app — this sells the vision; the app is the product.

Open `index.html`.

## Design direction & system

- **Why this system, not a generic-AI page:** the page reuses the product's own tokens (`styles.css`, bundled into this folder) in dark mode — so it's unmistakably Open Persona, not a purple-gradient template. Warm-*deep* canvas (not cold blue-black), one signature **vermilion** accent, real depth/light in the 3D, and a serif display face. Every colour resolves to a design-system token.
- **Palette:** warm-deep background `--background` (oklch 0.19 0.008 60), ink `--foreground`, ONE vermilion accent `--primary` (oklch 0.66 0.19 33) for live signals + CTAs. The four memory stores are colour-coded with identity-palette hues (teal / forest / indigo / rose, all L0.6 C0.13). The hero's tier rail shows the cool→hot routing scale (slate → amber → vermilion).
- **Type:** **Fraunces** (display — the editorial warmth, headlines + persona names), **Geist** (body/UI), **Geist Mono** (kickers, metadata, code). Sizes follow the system's scale.
- **Motion language — it means memory/presence/continuity, never decoration:**
  - *Hero:* a Three.js particle "mind" — a breathing spherical memory field with a glowing vermilion core and mouse parallax. Presence.
  - *Problem (pinned / scroll-jacked):* the viewport holds while the stateless bot's memory rows **fragment and blur away**, and the typed-memory panel resolves intact. Drift vs. continuity, made physical.
  - *Typed memory:* a second Three.js moment — four store-clusters **assemble** around an identity core as the section enters; the stores stagger in beside it.
  - *Voice:* the waveform amplitude is **scrubbed to scroll position** (motion tied to the user, never autoplay); the turn bubbles show a spoken fact recalled in text days later.
  - *Reveals:* earned, once, on enter (GSAP ScrollTrigger). No infinite decorative loops on content.
- **Smooth scroll:** Lenis is the backbone; GSAP ticker drives it; ScrollTrigger syncs.

## Tech (this delivery vs. the brief)

The brief asks for a Next.js + R3F + GSAP + Lenis repo. This environment delivers **HTML**, so the same technique stack is implemented via CDN: **Lenis**, **GSAP + ScrollTrigger**, **Three.js** (vanilla, r128), **Lucide** icons. To port to the requested Next.js/Vercel project: move `landing.css` into a CSS module / Tailwind layer, re-create the hero + memory scenes as React Three Fiber `<Canvas>` components, and wrap the ScrollTrigger setup in a `useGSAP` effect. The design-system tokens already live in `../styles.css`.

## Quality bar

- **Performance:** particle counts scale down on narrow screens; the hero loop pauses when scrolled out of view (ScrollTrigger); pixel-ratio capped at 2; no per-frame allocations.
- **Reduced motion:** `prefers-reduced-motion: reduce` ships a fully-functional static variant — no Lenis, no 3D (a static glow fallback shows), no pinning/scrub, all reveals visible, the scroll cue hidden.
- **Mobile:** the pinned Problem beat and the 3D memory graph are disabled below ~860px; layouts collapse to single column at every breakpoint.
- **No WebGL?** the hero falls back to a CSS glow automatically.
- **Accessible:** semantic landmarks, keyboard-focusable nav + CTAs with visible focus rings, canvases `aria-hidden`, the faux chat panel has an `aria-label`, sufficient contrast (dark-mode tokens are WCAG-checked in the system).

## What you need to supply to ship

1. **Real logo** — currently the Fraunces wordmark + vermilion dot. Replace the `.brand` mark.
2. **Voice demo video** — there's a clearly-marked placeholder in the Voice section (`data-ph="voice demo video"`). Drop in the real clip (and wire scrubbing to its `currentTime` if you want the scroll-scrubbed-video treatment).
3. **Real URLs** — every placeholder link carries `data-ph="…"`: GitHub repo, Docs, PyPI, the web-app / sign-up URL. Search `data-ph` to find them all.
4. *(Optional)* **Product screenshots** — the page uses faux in-brand panels (chat, memory rows) instead of screenshots by design; swap in real captures if preferred.

## Files

- `index.html` — the page (8 sections: hero · problem · typed memory · voice · capabilities · architecture · final CTA · footer).
- `landing.css` — page chrome; consumes design-system tokens only.
- `landing.js` — Lenis + GSAP ScrollTrigger sequences + the two Three.js scenes, all behind reduced-motion / WebGL / viewport guards.
