# Portfolio Revamp Roadmap v2: Active Theory-Inspired Direction

Phases 0–3 are done. This picks up from Phase 4 with a new aesthetic direction inspired by
[activetheory.net](https://activetheory.net/) — scaled down for a solo portfolio rather than
an agency site. You won't be building a custom WebGL engine like their Hydra; React Three
Fiber + GSAP gets you the same *feeling* (immersive, cinematic, one bold accent color, big
type) without the six-person studio behind it.

**What we're borrowing from Active Theory, translated to your scale:**
- Near-black canvas, one accent color used sparingly (not a palette — a single highlight)
- Oversized, confident grotesk display type as a design element, not just headings
- Full-bleed 3D/WebGL moments instead of boxed illustrations
- Project cards that "bloom" on hover — dim/scale neighbors, spotlight the one you're on
- Minimal, unobtrusive nav that reacts to scroll instead of sitting static
- Scroll as a narrative device — sections transition into each other, not just fade up
- Heavy discipline on performance so the motion never feels janky

**What we're deliberately not copying:** their literal content (colored tubes tracking
other users' cursors, AI chat nav, real-time multiplayer presence) — that's agency-scale
infrastructure that would be a distraction on a personal site, not a portfolio asset for you.

---

## Updated Design Direction

- **Palette:** `#0b0b0b` background, `#f5f5f3` text, one accent — suggest a violet
  (`#8b5cf6`) or a hot signal color if you want more energy (`#ff3b30`). Pick one and use
  it *only* for CTAs, hover states, and small progress/status indicators — never as a fill.
- **Typography:** swap Space Grotesk for something with more presence at huge sizes —
  **Cabinet Grotesk** or **General Sans** (both free via Fontshare) work well as an XXL
  display face. Keep Inter for body copy, but consider a mono font (JetBrains Mono, or
  Fontshare's "Switzer" in mono config) for labels/eyebrows/tags — gives that
  console-output texture Active Theory uses for secondary text.
- **Grid:** commit to a strict 12-column grid site-wide. Headlines can break out of it;
  everything else snaps to it. This is what makes huge type feel intentional instead of just big.
- **Motion:** fewer sections, more depth per section. Prefer one well-crafted scroll-driven
  moment over five small fade-ins.

---

## Phase 4 (revised) — Full-Bleed Hero + Nav Rework

**Goal:** Replace the boxed hero + side 3D object with a full-bleed WebGL hero. Revisit the
Phase 3 header to make it reactive rather than static.

**Cursor prompt:**
```
Install @react-three/fiber, @react-three/drei, and @react-three/postprocessing.

Rebuild Hero.jsx as a full-bleed section: the R3F <Canvas> should fill the entire
viewport as the background layer (position: absolute, inset: 0, z-index behind
text), not a boxed side element. Render an abstract 3D scene — a distorted
metaball/blob with <MeshTransmissionMaterial> or a particle field that reacts to
mouse position — in near-monochrome with the accent color appearing only as a
fresnel rim-light or a small percentage of particles. Add a subtle
postprocessing bloom pass on the accent-colored elements only, kept restrained
(don't blow out the whole scene).

Overlay the headline copy on top of the canvas: massive Cabinet Grotesk type
(clamp so it can hit 8-10rem on large screens), positioned per the 12-column
grid, left-aligned rather than centered. Keep the copy content as-is
(Crafting Digital / Innovation / subtitle / role line) but let the headline
breathe — more negative space than before, not a symmetric hero-card layout.

Rework Header.jsx into a "pillbox" nav: a small pill-shaped container, fixed
position, that shrinks and adds backdrop-blur once scrollY exceeds ~50px
(reuse existing isScrolled state), and subtly changes size/opacity based on
scroll velocity, not just a scrolled/not-scrolled boolean — i.e. it should feel
alive as you scroll, easing back to rest state ~300ms after scrolling stops.
Keep it minimal: wordmark + nav links, no changes to the underlying nav
structure from Phase 3.
```

**Note:** if the postprocessing bloom pass hurts performance/mobile, gate it
behind a `prefers-reduced-motion` and viewport-width check, same pattern as the
old Scroll3DObject's 768px cutoff.

---

## Phase 5 (revised) — Cinematic Scroll System

**Goal:** Move from simple fade-up reveals to scroll-driven "scenes" — sections that
transform into each other rather than just appearing.

**Cursor prompt:**
```
Install gsap and gsap/ScrollTrigger. Build src/hooks/useScrollScene.js with two
patterns:

1. `pinAndTransform(sectionRef, options)` — pins a section in the viewport for a
   scroll distance (default 100vh worth) while animating its children (scale,
   opacity, translate) based on scroll progress within that pin — this is what
   creates the "world" transition feeling instead of a static section.

2. `fadeUpOnScroll(ref, options)` — kept from the original plan for simpler
   elements that don't need pinning (small text blocks, individual cards).

Apply pinAndTransform to exactly ONE transition in the site as a proof of
concept: the handoff from Hero into About. As the user scrolls past the hero,
pin it briefly and have the 3D scene scale/fade while the About section's
content scales up from behind it, so it reads as one continuous camera move
rather than two stacked sections. Keep every other section on the simpler
fadeUpOnScroll pattern for now — we'll decide after seeing this one in action
whether more sections deserve the pinned treatment or whether it's better used
sparingly as a single "wow" moment.
```

**Why only one pinned transition:** Active Theory can afford five cinematic
world-transitions because it's their product demo. On a personal portfolio, one
well-executed pinned moment reads as intentional; four or five reads as
try-hard and will hurt your Lighthouse score. You can always add more later
once you see how the first one performs.

---

## Phase 6 (revised) — About Section

**Cursor prompt:**
```
Redesign About.jsx/.css around the 12-column grid:
- Eyebrow label in mono font, small, uppercase, accent-colored: "01 / ABOUT"
- Large pull-quote-style opening line pulled from your bio (e.g. "Started with
  graphic design before I ever wrote a line of code") set in huge Cabinet
  Grotesk, breaking out of the grid to the left edge
- Remaining bio paragraphs in a narrower column (6-7 of the 12 columns),
  smaller body type, generous line-height
- Photo collage: fewer, larger images rather than six small tiles — pick your
  3-4 strongest photos, let them run larger with more breathing room, subtle
  scroll-driven parallax (kept from original plan) but no rounded-card
  treatment — flush rectangular images with thin accent-colored corner
  brackets on hover (small nod to a "viewfinder" feel, common in this genre)
- StatsCounter: mono font for numbers, laid out as a horizontal strip with
  thin vertical dividers between stats rather than boxed cards
```

---

## Phase 7 (revised) — Projects Section (the centerpiece)

**Goal:** This is where the Active Theory "hover to bloom" interaction pays off most —
your projects are the actual portfolio content.

**Cursor prompt:**
```
Redesign Projects.jsx/.css as a full-width stacked list instead of a card grid:
- Each project is a full-width row (title + tags + one-line description),
  separated by thin --border hairlines, mono-font tags
- On hover: the hovered row's title scales up slightly and shifts to the
  accent color; if the project has a representative image/screenshot, it
  fades in as a fixed-position preview that follows the cursor (classic
  "hover to reveal thumbnail" pattern) — implement with a small preview panel
  that translates toward mouse Y position, fixed on the right third of the
  viewport
- Simultaneously, dim all other rows' opacity to ~40% while one is hovered,
  restoring on mouseleave — this is the "rack focus" effect: it makes the grid
  feel alive without any row needing its own heavy animation
- If you don't have screenshots for all 14 projects yet, flag which ones are
  missing images so this can be finished before launch — the hover-preview
  only works well if every row has something to show
- Keep the See More / See Less behavior, but restyle the toggle to match the
  new minimal aesthetic (small mono-font text link with an accent underline,
  not a boxed button)
```

**You'll need project screenshots for this to land.** If you don't have clean
screenshots/GIFs for each of the 14 projects, that's worth doing before this
phase — it's the single highest-leverage content gap for this design direction.

---

## Phase 8 (revised) — Resume & Contact

**Cursor prompt:**
```
Redesign Resume.jsx/.css and Contact.jsx/.css:
- Resume: drop the card-with-icon pattern entirely. Make it a single large
  line of type — "View my resume →" — huge, left-aligned, accent color on
  hover, matching the confidence of the hero headline. This is a link, not a
  feature card; treat it like one.
- Contact: same treatment — large stacked links (LinkedIn / GitHub / Email),
  each on its own line, huge type, mono-font label above each ("CONNECT",
  "CODE", "EMAIL"), accent-color underline animates in on hover from left to
  right
- Footer: minimal, mono font, small — copyright + a new tagline (drop
  "Exploring the Frontiers of Technology"; suggest something like "Built by
  hand, shipped with care" or similar — your call)
```

---

## Phase 9 (revised) — Performance & Polish Pass

**Goal:** Active Theory's whole reputation rests on immersive motion that never feels
janky. This phase is non-negotiable before launch.

**Cursor prompt:**
```
Run a full performance audit:
1. Confirm the R3F canvas and any postprocessing passes respect
   prefers-reduced-motion and degrade gracefully below 768px (reduce particle
   count / disable bloom / fall back to a static gradient if needed)
2. Confirm GSAP ScrollTrigger instances are properly killed/refreshed on
   route or resize events to avoid memory leaks (there's no router here, but
   confirm cleanup on unmount for each section using useScrollScene)
3. Audit for layout shift: anything animating should use transform/opacity
   only, not width/height/top/left
4. Run Lighthouse; report LCP, CLS, and INP. If LCP is hurt by the hero
   canvas, consider deferring 3D scene mount until after first paint (show
   the headline immediately, mount the canvas ~100-200ms later)
5. Confirm the rack-focus hover effect in Projects doesn't cause jank on
   rapid mouse movement across rows — debounce/throttle if needed
6. Sweep all component CSS for leftover --space-* references or hardcoded
   colors that don't match the new token set
```

---

## Phase 10 — Image & Asset Optimization (unchanged from v1)

**Cursor prompt:**
```
Convert the images in src/images/ to WebP, resize to reasonable display
dimensions (no dimension exceeding ~1600px on the long edge). Update imports
in About.jsx accordingly, confirm lazy loading. Also optimize any new project
screenshots added in Phase 7 the same way. Report before/after total asset size.
```

---

## Suggested Order

Phase 4 → 5 → 6 → 7 → 8 → 9 → 10, same discipline as before: run `npm run dev`
after each phase, fix what Cursor gets wrong, commit before moving on.

**Highest-risk phases:** 4 (full-bleed 3D hero) and 5 (pinned scroll transition) —
these are genuinely harder than anything in the original plan. Give yourself room
to iterate; a scroll-jacked hero that feels smooth is much harder to get right
than one that feels janky, and janky is worse than not having the effect at all.

**Highest-payoff-but-content-gated phase:** 7 (Projects hover-bloom) — the
interaction only works if you have real screenshots for your projects. Worth
prioritizing gathering those before you get to this phase.

## New Dependencies
- `@react-three/postprocessing` — bloom/effects on top of the existing R3F setup
- `gsap` (ScrollTrigger) — same as v1, now doing more work (pinning, not just reveals)