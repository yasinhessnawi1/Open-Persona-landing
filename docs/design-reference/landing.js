/* ============================================================================
   Open Persona — landing motion. Lenis smooth scroll + GSAP ScrollTrigger
   (earned reveals, one pinned scroll-jacked beat, scrubbed sequences) + two
   Three.js moments (hero "mind", memory-graph). Every heavy effect is gated
   behind reduced-motion / WebGL / viewport checks and degrades gracefully.
   ============================================================================ */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isNarrow = window.matchMedia("(max-width: 860px)").matches;

  function webglOK() {
    try {
      const c = document.createElement("canvas");
      return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
    } catch (e) { return false; }
  }
  const heavy3D = !reduceMotion && webglOK();

  const hasGSAP = typeof window.gsap !== "undefined";
  const hasST = hasGSAP && typeof window.ScrollTrigger !== "undefined";
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  document.documentElement.classList.add("is-ready");

  /* ---------------------------------------------------- smooth scroll (Lenis) */
  let lenis = null;
  if (!reduceMotion && typeof window.Lenis !== "undefined") {
    lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    if (hasST) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    window.__lenis = lenis;
  }

  /* in-page anchor scrolling that respects Lenis */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el, { offset: -64 });
      else el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
  });

  /* ----------------------------------------------------------- nav scrolled */
  const nav = document.querySelector(".nav");
  const onScroll = () => { if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 24); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ----------------------------------------------------- reveals + sequences */
  if (hasST && !reduceMotion) {
    // generic earned reveals
    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%" },
      });
    });

    // hero headline staggered entrance (on load)
    gsap.from(".hero__inner > *", { opacity: 0, y: 30, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.15 });

    // PINNED scroll-jacked PROBLEM beat — stateless memory fragments away while
    // the persona's stays coherent. Only pin on roomy viewports.
    if (!isNarrow) {
      const frag = gsap.utils.toArray(".panel--stateless .memrow");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".problem__stage",
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 0.6,
        },
      });
      tl.to(".panel--persona", { opacity: 1, y: 0, duration: 0.3 }, 0);
      frag.forEach((row, i) => {
        tl.to(row, { opacity: 0.12, filter: "blur(6px)", x: gsap.utils.random(-40, 40), y: gsap.utils.random(-14, 14), duration: 0.5 }, 0.1 + i * 0.12);
      });
      tl.to(".problem__verdict", { opacity: 1, duration: 0.4 }, 0.7);
    }

    // typed-memory stores assemble (staggered, left rail)
    gsap.from(".store", {
      opacity: 0, y: 28, duration: 0.7, ease: "power3.out", stagger: 0.14,
      scrollTrigger: { trigger: ".stores", start: "top 80%" },
    });
    gsap.from(".constraint-chip", { opacity: 0, scale: 0.9, duration: 0.5, ease: "back.out(1.6)", scrollTrigger: { trigger: ".constraint-chip", start: "top 92%" } });

    // VOICE — scrub the waveform amplitude to scroll position (motion tied to
    // scroll, never autoplay). Bars "speak" as the section passes through.
    const bars = gsap.utils.toArray(".wave .bar");
    if (bars.length) {
      ScrollTrigger.create({
        trigger: ".voice",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.4,
        onUpdate: (self) => {
          const p = self.progress;
          const env = Math.sin(p * Math.PI); // 0 → 1 → 0 across the section
          bars.forEach((b, i) => {
            const wobble = 0.35 + 0.65 * Math.abs(Math.sin(i * 0.55 + p * 9));
            const h = 0.12 + env * wobble;
            b.style.transform = "scaleY(" + h.toFixed(3) + ")";
          });
        },
      });
    }

    // architecture layers reveal via the generic .reveal mechanism (each
    // .layer carries `reveal`, so it plays once on enter and STAYS — no
    // second tween fighting it, nothing for refresh() to reset). Connectors
    // are static 1px lines.

    // subtle parallax on the final-cta glow
    gsap.to(".finalcta__inner", { backgroundPositionY: "30%", ease: "none", scrollTrigger: { trigger: ".finalcta", start: "top bottom", end: "bottom top", scrub: true } });

    // Recompute all trigger positions once layout settles (fonts, the pinned
    // Problem section's pin-spacing, and Lenis content height) so nothing
    // fires while still off-screen.
    ScrollTrigger.refresh();
    window.addEventListener("load", () => ScrollTrigger.refresh());
    setTimeout(() => ScrollTrigger.refresh(), 600);
  } else {
    // reduced motion / no ScrollTrigger: everything visible, persona panel shown
    document.querySelectorAll(".reveal").forEach((el) => { el.style.opacity = 1; el.style.transform = "none"; });
    const pp = document.querySelector(".panel--persona"); if (pp) pp.style.opacity = 1;
    const verdict = document.querySelector(".problem__verdict"); if (verdict) verdict.style.opacity = 1;
  }

  /* ------------------------------------------------- copy install command */
  const copyBtn = document.getElementById("copy-install");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const txt = "pip install persona-core";
      if (navigator.clipboard) navigator.clipboard.writeText(txt);
      const prev = copyBtn.textContent;
      copyBtn.textContent = "copied";
      setTimeout(() => { copyBtn.textContent = prev; }, 1400);
    });
  }

  /* ============================ Three.js: hero "mind" ===================== */
  if (heavy3D && typeof window.THREE !== "undefined") {
    initHero();
    if (!isNarrow) initMemoryGraph();
  } else {
    const fb = document.querySelector(".hero__fallback");
    if (fb) fb.style.display = "block";
  }

  function initHero() {
    const canvas = document.getElementById("hero-canvas");
    if (!canvas) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 6.2;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // particle "mind": a spherical shell of points + a sparse inner cloud.
    const COUNT = isNarrow ? 1600 : 3200;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const seed = new Float32Array(COUNT);
    const cA = new THREE.Color("#e85d3a"); // vermilion (oklch 0.66 0.19 33)
    const cB = new THREE.Color("#6f74d6"); // indigo   (oklch 0.62 0.13 270)
    const cC = new THREE.Color("#e7d6bd"); // warm light (oklch 0.86 0.04 75)
    for (let i = 0; i < COUNT; i++) {
      const shell = Math.random() > 0.32;
      const r = shell ? 2.5 + Math.random() * 0.16 : Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const m = Math.random();
      const col = m < 0.6 ? cA : m < 0.85 ? cC : cB;
      colors[i * 3] = col.r; colors[i * 3 + 1] = col.g; colors[i * 3 + 2] = col.b;
      seed[i] = Math.random() * Math.PI * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.addAttribute ? geo.addAttribute("position", new THREE.BufferAttribute(positions, 3)) : geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({ size: 0.032, vertexColors: true, transparent: true, opacity: 0.92, blending: THREE.AdditiveBlending, depthWrite: false });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const base = positions.slice();
    let mx = 0, my = 0, tmx = 0, tmy = 0;
    window.addEventListener("pointermove", (e) => {
      tmx = (e.clientX / window.innerWidth - 0.5);
      tmy = (e.clientY / window.innerHeight - 0.5);
    }, { passive: true });

    function resize() {
      const r = canvas.getBoundingClientRect();
      renderer.setSize(r.width, r.height, false);
      camera.aspect = r.width / r.height;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener("resize", resize);

    let paused = false;
    let scrollP = 0; // 0 at top of hero → 1 when hero has scrolled past
    if (hasST) {
      ScrollTrigger.create({
        trigger: ".hero", start: "top top", end: "bottom top", scrub: true,
        onUpdate: (s) => (scrollP = s.progress),
        onLeave: () => (paused = true), onEnterBack: () => (paused = false),
      });
    }

    const pos = geo.attributes.position.array;
    const clock = new THREE.Clock();
    function tick() {
      requestAnimationFrame(tick);
      if (paused) return;
      const t = clock.getElapsedTime();
      mx += (tmx - mx) * 0.04; my += (tmy - my) * 0.04;
      points.rotation.y = t * 0.045 + mx * 0.5 + scrollP * 0.9;
      points.rotation.x = my * 0.4;
      // scroll consolidates the mind: it shrinks, recedes, and fades as you go.
      const sc = 1 - scrollP * 0.55;
      points.scale.setScalar(sc);
      points.position.y = scrollP * 1.6;
      mat.opacity = 0.92 * (1 - scrollP * 0.6);
      // gentle "breathing" — memory shimmering, not noisy
      for (let i = 0; i < COUNT; i++) {
        const k = 1 + 0.012 * Math.sin(t * 1.3 + seed[i]);
        pos[i * 3] = base[i * 3] * k;
        pos[i * 3 + 1] = base[i * 3 + 1] * k;
        pos[i * 3 + 2] = base[i * 3 + 2] * k;
      }
      geo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    }
    tick();
  }

  /* ===================== Three.js: typed-memory graph ===================== */
  function initMemoryGraph() {
    const canvas = document.getElementById("memory-canvas");
    if (!canvas || typeof window.THREE === "undefined") return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 7;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const group = new THREE.Group();
    scene.add(group);

    const storeHues = [
      new THREE.Color("#1ba89a"), // teal   180
      new THREE.Color("#56a14e"), // forest 135
      new THREE.Color("#7a7bd6"), // indigo 270
      new THREE.Color("#d25e93"), // rose   340
    ];
    const nodes = [];
    const R = 2.7;
    for (let i = 0; i < 4; i++) {
      const ang = (i / 4) * Math.PI * 2;
      const v = new THREE.Vector3(Math.cos(ang) * R, Math.sin(ang) * R, 0);
      // each store = a little cluster of points
      const N = 90;
      const p = new Float32Array(N * 3);
      for (let j = 0; j < N; j++) {
        p[j * 3] = v.x + (Math.random() - 0.5) * 1.0;
        p[j * 3 + 1] = v.y + (Math.random() - 0.5) * 1.0;
        p[j * 3 + 2] = v.z + (Math.random() - 0.5) * 1.0;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(p, 3));
      const m = new THREE.PointsMaterial({ size: 0.07, color: storeHues[i], transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false });
      const pts = new THREE.Points(g, m);
      group.add(pts);
      // link to center
      const lg = new THREE.BufferGeometry();
      lg.setAttribute("position", new THREE.BufferAttribute(new Float32Array([0, 0, 0, v.x, v.y, v.z]), 3));
      const lm = new THREE.LineBasicMaterial({ color: storeHues[i], transparent: true, opacity: 0.32 });
      group.add(new THREE.Line(lg, lm));
      nodes.push(v);
    }
    // central identity core
    const coreGeo = new THREE.SphereGeometry(0.4, 24, 24);
    const coreMat = new THREE.MeshBasicMaterial({ color: new THREE.Color("#e85d3a"), transparent: true, opacity: 0.9 });
    group.add(new THREE.Mesh(coreGeo, coreMat));

    function resize() {
      const r = canvas.getBoundingClientRect();
      renderer.setSize(r.width, r.height, false);
      camera.aspect = r.width / Math.max(r.height, 1);
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener("resize", resize);

    let prog = 0, vis = true;
    if (hasST) {
      ScrollTrigger.create({
        trigger: ".memory",
        start: "top bottom", end: "bottom top",
        onUpdate: (s) => (prog = s.progress),
        onToggle: (s) => (vis = s.isActive),
      });
    }
    const clock = new THREE.Clock();
    function tick() {
      requestAnimationFrame(tick);
      const t = clock.getElapsedTime();
      // assemble: nodes pull toward their orbit as the section enters
      const assemble = Math.min(1, Math.max(0, (prog - 0.1) * 2.2));
      group.scale.setScalar(0.6 + assemble * 0.4);
      group.rotation.z = t * 0.06;
      group.rotation.y = Math.sin(t * 0.3) * 0.25;
      renderer.render(scene, camera);
    }
    tick();
  }
})();
