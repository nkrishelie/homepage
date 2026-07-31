# Подобия плоскости: гомотетия и поворотная гомотетия — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `public/Materials/similarities.html` — a single self-contained,
interactive RU-only page explaining homothety, rotational homothety, the
general fixed-point formula for $f(z)=az+b$, and the classification of plane
similarities (ch. 13 of the Savvateev source, plus the ch. 12 exercise on
$z\mapsto\alpha z$), in the exact visual/interaction language already
established by `chasles.html`/`duality.html`. This is a direct continuation of
`chasles.html`, which explicitly left the $|a|\ne1$ case open.

**Architecture:** One static HTML file, no build step, no framework. Inline
`<style>`, inline `<script>` blocks per widget/section (same convention
`chasles.html` already uses). Two reusable pieces get built once and reused by
later sections: a pure-math module (`window.SimilarityMath`, complex-number
algebra generalizing `chasles.html`'s `MotionMath` with a scale parameter) and
a visual widget factory (`window.SimilarityWidget`, generalizing `MotionWidget`
with a `k` slider). Everything else is direct markup.

**Tech Stack:** Vanilla JS (`var`, no modules, no arrow functions — matching
`chasles.html`'s current code exactly), SVG for graphics, KaTeX 0.16.9 via CDN,
plain CSS custom properties, one native `<input type="range">` per
scale-capable widget tab. Node.js is used only as a throwaway test runner
during Task 2 — no test framework, no dependency ever gets added to the repo.

## Global Constraints

- Single file: `public/Materials/similarities.html`. No `.js`/`.css` files
  created — everything inline, matching every file in `public/Materials/`.
- RU only, this round. No `similarities_en.html`. No language pills in the
  topbar (only `.crumbs`) — matches how `chasles.html` looked before its own
  English version was added later.
- Visual system copied **verbatim** from the current `public/Materials/chasles.html`:
  CSS custom properties, EB Garamond + JetBrains Mono fonts, KaTeX 0.16.9 CDN +
  auto-render, the `pointerdown`/`pointermove`/`pointerup` drag pattern with a
  **fixed SVG viewBox**, 5-unit grid snapping on every dragged point
  (`SNAP = 5`), and the `flipY` sign-flip convention that converts between SVG
  space (y grows downward, angle measured screen-style) and complex-number
  space (Im grows upward, positive angle = counter-clockwise). **`k` (the
  scale factor) is a plain multiplier and is unaffected by `flipY`** — do not
  negate it.
  - `public/Materials/chasles.html:20-126` — CSS variables, base typography,
    and every widget/table/note/formula CSS class already in production; copy
    source for Task 1 (base only) and Tasks 3/5/6/7 (widget/note/formula
    classes, extended with two new ones for the `k` slider).
  - `public/Materials/chasles.html:174-452` — `MotionWidget` factory (current,
    evolved version — grid snap, `axes` option, coordinate labels on handles).
    This is the copy source for Task 3; `SimilarityWidget` generalizes it with
    a `k` field on `rotate`/`reflect` and a new `homothety` tab.
  - `public/Materials/chasles.html:748-927` — `MotionMath` (current version,
    with `flipY`, `formatRecipe`, "proper/improper" terminology). Copy source
    for Task 2; `SimilarityMath` generalizes it.
  - `public/Materials/chasles.html:628-746` — the §7 constructor/calculator
    pattern (`window.addEventListener('load', init)` guard, because
    `katex.min.js` is `<script defer>` and inline scripts run before it during
    parsing). Copy source for Tasks 5 and 7 — any script that calls
    `katex.render(...)` directly needs this guard; scripts that only drive a
    widget (no direct `katex.render` calls) do not.
- Content source of truth: `~/MATH/Savvateev/250/LevelAlpha.tex`, chapter 13
  §"Преобразования" (7153–7244) and §"Подобия прямой и плоскости", plane part
  only (7283–7398), plus ch. 12 line 6445 and the exercise at 6877–6878. Do not
  invent facts not in the design doc.
- Design doc: `docs/superpowers/specs/2026-07-31-plane-similarities-design.md`
  — read it before starting if anything below is unclear about *why*. No
  static composition table (dropped by design decision — see the doc's
  "Важный нюанс" section); the composition calculator (Task 7) is the only
  way to explore composition.
- `SimilarityMath`'s `classify()` **never returns `type: 'homothety'`** —
  `'homothety'` is an input-only convenience shape (a `rotate` with `angle`
  fixed at 0); any kind-1 result with `angle \approx 0` already reads back as
  `type: 'rotate'`, exactly matching the book's own framing (homothety is a
  boundary case of rotational homothety, not a separate output class).
- The `k` slider range is **`-2` to `4`, step `0.1`** on every scale-capable
  tab (`homothety`, `rotate`, `reflect`) — chosen so `1` sits exactly in the
  middle (as asked) while `k=-1` (central symmetry / the perpendicular-axis
  reflected-homothety case) stays comfortably reachable, not glued to an edge.
- No npm dependency changes. `package.json` is not touched by this plan.
- Every task that changes `similarities.html` ends with a manual browser
  check — this repo has no visual test framework, and none should be added.
- Node.js `node:assert/strict` is available — used only in Task 2's throwaway
  scratchpad test script, never committed to the repo.
- On-page section numbers (the `<h2>N. …</h2>` numbers a reader sees) run 1–6.

**On-page section ↔ Task mapping:**

| On-page `<h2>` | Title | Built in |
|---|---|---|
| 1 | От движений к подобиям | Task 1 |
| 2 | Гомотетия | Task 3 |
| 3 | Поворотная гомотетия | Task 4 |
| 4 | Неподвижная точка подобия | Task 5 |
| 5 | Классификация подобий | Task 6 |
| 6 | Калькулятор композиции подобий | Task 7 |

Table of contents (Task 8), the forward-link edit to `chasles.html` (Task 9),
and site integration (Task 10) touch no on-page `<h2>`.

---

## Task 1: Page shell (head, base CSS, topbar, header, §1 intro text)

**Files:**
- Create: `public/Materials/similarities.html`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: the file itself, with `</body></html>` at the end and an
  **insertion point** every later task uses: insert new
  `<section>…</section>` markup and any new `<script>` block **immediately
  before** the line
  `<p class="page-footer">© Nikolai Kazimirov · <a href="https://mathem.at" rel="noopener">mathem.at</a></p>`.
  New `<style>` rules get appended inside the existing `<style>...</style>`
  block, just before `</style>`.

- [ ] **Step 1: Write the file**

```html
<!DOCTYPE html>
<html lang="ru" style="scroll-behavior: smooth;">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Подобия плоскости: гомотетия и поворотная гомотетия</title>
<meta name="description" content="Гомотетия, поворотная гомотетия и общая формула неподвижной точки z0=b/(1-a) — классификация подобий плоскости, продолжение материала о движениях плоскости, с перетаскиваемыми фигурами и ползунками коэффициента.">
<link rel="canonical" href="https://mathem.at/Materials/similarities.html">
<meta property="og:type" content="article">
<meta property="og:title" content="Подобия плоскости: гомотетия и поворотная гомотетия">
<meta property="og:description" content="Гомотетия, поворотная гомотетия, неподвижная точка подобия и классификация подобий плоскости — интерактивный разбор с перетаскиваемыми фигурами и калькулятором композиции.">
<meta property="og:url" content="https://mathem.at/Materials/similarities.html">
<meta property="og:locale" content="ru_RU">
<link rel="icon" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMxYTE5MTciLz48dGV4dCB4PSIxNiIgeT0iMTciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJjZW50cmFsIiBmaWxsPSIjZmZmIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iNzAwIiBmb250LWZhbWlseT0iR2VvcmdpYSxUaW1lcyBOZXcgUm9tYW4sc2VyaWYiPsKxw5fDtzwvdGV4dD48L3N2Zz4=" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js" onload="renderMathInElement(document.body, {delimiters: [{left: '$$', right: '$$', display: true}, {left: '\\[', right: '\\]', display: true}, {left: '$', right: '$', display: false}, {left: '\\(', right: '\\)', display: false}], throwOnError: false})"></script>
<style>
:root {
  --bg:#faf9f6; --bg2:#f2f0eb; --ink:#1a1917; --ink2:#5a5750; --ink3:#8a8680; --border:#dcd9d2;
  --blue-bg:#e8eef7;  --blue-acc:#3a5f9e;
  --rust-bg:#f0ebe8;  --rust-acc:#8c4a32;
  --sage-bg:#e8f0eb;  --sage-acc:#2e6645;
  --teal-bg:#e6f5ef;  --teal-acc:#0f6e56;
  --amber-bg:#fdf3e0; --amber-acc:#7a4f0d;
  --coral-bg:#faeae6; --coral-acc:#9b2f1a;
  --purple-bg:#eeedfb; --purple-acc:#4a3a9a;
}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--ink);font-family:'EB Garamond',Georgia,serif;font-size:22px;line-height:1.65;min-height:100vh}
.page{max-width:1320px;margin:0 auto;padding:3rem 2.5rem 5rem}

.topbar{display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;margin-bottom:1.8rem}
.crumbs{font-family:'JetBrains Mono',monospace;font-size:12.5px;color:var(--ink3)}
.crumbs a{color:var(--ink3);text-decoration:none}
.crumbs a:hover{color:var(--ink)}

header{margin-bottom:2.5rem;border-bottom:1.5px solid var(--ink);padding-bottom:1.5rem}
.kicker{font-family:'JetBrains Mono',monospace;font-size:14px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink3);margin-bottom:.6rem}
h1{font-size:clamp(28px,3.2vw,44px);font-weight:500;line-height:1.15;color:var(--ink);margin-bottom:.5rem}
.desc{font-size:19px;color:var(--ink2);font-style:italic;max-width:900px}

section{margin-bottom:3.5rem}
h2{font-size:28px;font-weight:500;margin-bottom:1.2rem;padding-bottom:.5rem;border-bottom:1px solid var(--border)}
h3{font-size:22px;font-weight:500;margin:1.8rem 0 .8rem;color:var(--ink)}
h4{font-size:19px;font-weight:500;margin:1.2rem 0 .5rem;color:var(--ink)}
p{margin-bottom:.9rem;color:var(--ink2)}
p.lead{color:var(--ink)}
strong{color:var(--ink);font-weight:500}
em{color:var(--ink)}
.katex{font-size:1.05em}
.katex-display{margin:.6em 0!important;overflow-x:auto;overflow-y:hidden}

.page-footer{margin-top:2.75rem;padding-top:1.1rem;border-top:0.5px solid var(--border);font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:.04em;color:var(--ink3);text-align:center;line-height:1.5}
.page-footer a{color:var(--ink3);text-decoration:none;border-bottom:1px solid rgba(138,134,128,.35)}
.page-footer a:hover{color:var(--ink2);border-bottom-color:var(--ink2)}

@media(max-width:700px){
  body{font-size:19px}
  .page{padding:1.5rem 1rem 3rem}
}
</style>
</head>
<body>
<div class="page">

<div class="topbar">
  <div class="crumbs"><a href="https://mathem.at">← mathem.at</a> / <a href="/#materials">Материалы</a></div>
</div>

<header>
  <p class="kicker">Геометрия · Группы</p>
  <h1>Подобия плоскости</h1>
  <p class="desc">Гомотетия и поворотная гомотетия расширяют движения плоскости до полного семейства подобий. Формула $f(z)=az+b$ теперь допускает любой коэффициент $a\ne1$, а не только $|a|=1$, как для движений — и всё ещё имеет ровно одну неподвижную точку. Ниже — интерактивные модели вместо длинных доказательств.</p>
</header>

<section id="sec-intro">
  <h2>1. От движений к подобиям</h2>
  <p class="lead"><strong>Подобие</strong> плоскости — это преобразование $P$, при котором расстояния между образами точек меняются в одно и то же число раз: $\rho(P(x),P(y)) = k\,\rho(x,y)$ для некоторого числа $k>0$, одного и того же для любых $x,y$. Число $k$ называется коэффициентом подобия.</p>
  <p>При $k=1$ расстояния сохраняются в точности — это в точности <a href="/Materials/chasles.html">движения плоскости</a>: перенос, поворот, отражение, скользящая симметрия. Всё дальше касается случая $k\ne1$ — когда фигуры не просто перемещаются, а ещё и меняют размер.</p>
  <p>Композиция подобий с коэффициентами $k$ и $s$ — снова подобие, с коэффициентом $ks$: это следует прямо из определения ($\rho$ умножается сначала на $k$, потом на $s$).</p>
</section>

<p class="page-footer">© Nikolai Kazimirov · <a href="https://mathem.at" rel="noopener">mathem.at</a></p>

</div><!-- .page -->
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Run: `cd ~/MATH/homepage && npm run dev`, open
`http://localhost:5173/Materials/similarities.html`.

Expected: page loads with no console errors; title bar shows "Подобия
плоскости: гомотетия и поворотная гомотетия"; heading/body use EB Garamond,
crumbs/kicker use JetBrains Mono; every inline `$...$` formula in the header
and §1 renders as italic math (not literal dollar signs); the link to
`/Materials/chasles.html` in §1 works; resizing below 700px shrinks body font
and page padding per the media query.

- [ ] **Step 3: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/similarities.html
git commit -m "$(cat <<'EOF'
Add page shell for the plane-similarities material

Head, base CSS (copied from chasles.html), topbar, header and the §1
intro section (from movements to similarities). No interactivity yet
— later tasks append sections before the page footer.
EOF
)"
```

---

## Task 2: Complex-arithmetic & similarity-algebra module (`SimilarityMath`)

Generalizes `chasles.html`'s `MotionMath` with a scale factor `k`. Built
test-first in the scratchpad (never committed), then embedded directly in
`similarities.html`.

**Files:**
- Modify: `public/Materials/similarities.html` (append a
  `<script id="similarity-math">` block before `page-footer`).
- Test (scratchpad, not committed):
  `/tmp/claude-1000/-home-nkrishelie-MATH-homepage/b4344be2-3a54-49ee-ab91-04cfc9f96d2f/scratchpad/similarity-math.test.mjs`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `window.SimilarityMath` with this exact surface, consumed by
  Tasks 3, 5, and 7:
  - `add(u,v)`, `sub(u,v)`, `mul(u,v)`, `scale(u,k)`, `conj(u)`, `abs(u)`,
    `arg(u)`, `fromPolar(r,theta)`, `div(u,v)` — all take/return `{re,im}`.
  - `paramsToMotion(params) -> {kind, a:{re,im}, b:{re,im}}` where `params` is
    one of `{type:'translate',vx,vy}`, `{type:'homothety',ox,oy,k}`,
    `{type:'rotate',ox,oy,angle,k}`, `{type:'reflect',px,py,theta,k}`,
    `{type:'glide',px,py,theta,t}` — **this exact shape is also what
    `SimilarityWidget` (Task 3) produces from `getParams()`/`onChange`**, so
    the two modules plug together without adapters. Params are in SVG space
    (y down); `paramsToMotion` applies the `flipY` conversion internally.
  - `apply(motion, z) -> {re,im}` — computes `f(z)` (true complex-math space).
  - `compose(f, g) -> motion` — the algebra for `f∘g` (`g` applied first).
  - `classify(motion, eps) -> params` — inverse of `paramsToMotion`, **always
    one of `translate`/`rotate`/`reflect`/`glide`, never `homothety`** (see
    Global Constraints).
  - `formatComplex(u) -> string`, e.g. `"1.20 - 3.46i"`.
  - `formatExpr(motion) -> string` — LaTeX RHS, e.g.
    `"(0.87 + 0.50i)z + (1.30 - 0.70i)"`, trimmed the way a human would write
    it (`1` disappears, `-1` becomes a bare minus, pure-imaginary units become
    `i`/`-i`).
  - `formatRecipe(params) -> {template, params}` — two LaTeX strings: a fixed
    template per type (e.g. `"f(z) = ke^{i\\alpha}(z-z_0)+z_0"` for `rotate`)
    and the live numeric substitution for the current params.

- [ ] **Step 1: Write the failing test in the scratchpad**

Create `/tmp/claude-1000/-home-nkrishelie-MATH-homepage/b4344be2-3a54-49ee-ab91-04cfc9f96d2f/scratchpad/similarity-math.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync('public/Materials/similarities.html', 'utf8');
const match = html.match(/<script id="similarity-math">([\s\S]*?)<\/script>/);
if (!match) throw new Error('Could not find <script id="similarity-math"> in similarities.html');

const sandbox = {};
new Function('window', match[1])(sandbox);
const SimilarityMath = sandbox.SimilarityMath;
if (!SimilarityMath) throw new Error('window.SimilarityMath was not defined by the script');

function approxEqual(u, v, eps = 1e-6) {
  return Math.abs(u.re - v.re) < eps && Math.abs(u.im - v.im) < eps;
}

let failed = false;
function t(name, fn) {
  try { fn(); console.log('PASS', name); }
  catch (e) { failed = true; console.error('FAIL', name, '-', e.message); }
}

t('homothety scales from the center (origin, no flip ambiguity)', () => {
  var m = SimilarityMath.paramsToMotion({ type: 'homothety', ox: 0, oy: 0, k: 2 });
  assert.ok(approxEqual(SimilarityMath.apply(m, { re: 3, im: 4 }), { re: 6, im: 8 }));
});

t('homothety with an off-origin center and k=-1 is central symmetry (exercises flipY on oy)', () => {
  // SVG-space center (10,-20) -> true math-space center (10, 20) after flipY.
  var m = SimilarityMath.paramsToMotion({ type: 'homothety', ox: 10, oy: -20, k: -1 });
  assert.ok(approxEqual(SimilarityMath.apply(m, { re: 10, im: 20 }), { re: 10, im: 20 })); // center is fixed
  assert.ok(approxEqual(SimilarityMath.apply(m, { re: 0, im: 0 }), { re: 20, im: 40 })); // 2*z0 - z
});

// NOTE on the angle sign: paramsToMotion applies flipY, which negates
// 'angle' (SVG space is y-down, complex space is y-up). Passing -PI/2 here
// is what actually produces a true-math-space rotation of +PI/2 -- verified
// numerically, not just derived on paper, before writing this assertion.
t('rotational homothety with k=1 matches a plain rotation (backward-compat with chasles.html)', () => {
  var m = SimilarityMath.paramsToMotion({ type: 'rotate', ox: 0, oy: 0, angle: -Math.PI / 2, k: 1 });
  assert.ok(approxEqual(SimilarityMath.apply(m, { re: 1, im: 0 }), { re: 0, im: 1 }));
});

t('rotational homothety with k=2 rotates and doubles distance from the center', () => {
  var m = SimilarityMath.paramsToMotion({ type: 'rotate', ox: 0, oy: 0, angle: -Math.PI / 2, k: 2 });
  assert.ok(approxEqual(SimilarityMath.apply(m, { re: 1, im: 0 }), { re: 0, im: 2 }));
});

t('reflected homothety (|a|!=1) has the predicted unique fixed point z0=(b+a*conj(b))/(1-|a|^2)', () => {
  var m = SimilarityMath.paramsToMotion({ type: 'reflect', px: 5, py: -3, theta: 0.4, k: 2 });
  var denom = 1 - SimilarityMath.abs(m.a) * SimilarityMath.abs(m.a);
  var z0 = SimilarityMath.div(
    SimilarityMath.add(m.b, SimilarityMath.mul(m.a, SimilarityMath.conj(m.b))),
    { re: denom, im: 0 }
  );
  assert.ok(approxEqual(SimilarityMath.apply(m, z0), z0));
});

t('round-trip: classify(paramsToMotion(p)) recovers p for a kind-1 rotational homothety', () => {
  var p = { type: 'rotate', ox: 12, oy: -7, angle: 0.9, k: 1.7 };
  var c = SimilarityMath.classify(SimilarityMath.paramsToMotion(p));
  assert.equal(c.type, 'rotate');
  assert.ok(Math.abs(c.ox - 12) < 1e-6 && Math.abs(c.oy + 7) < 1e-6);
  assert.ok(Math.abs(c.angle - 0.9) < 1e-6);
  assert.ok(Math.abs(c.k - 1.7) < 1e-6);
});

t('round-trip: classify(paramsToMotion(p)) recovers p for a reflected homothety', () => {
  var p = { type: 'reflect', px: 5, py: -3, theta: 0.4, k: 2 };
  var c = SimilarityMath.classify(SimilarityMath.paramsToMotion(p));
  assert.equal(c.type, 'reflect');
  assert.ok(Math.abs(c.px - 5) < 1e-6 && Math.abs(c.py + 3) < 1e-6);
  assert.ok(Math.abs(c.theta - 0.4) < 1e-6);
  assert.ok(Math.abs(c.k - 2) < 1e-6);
});

// Book claim, LevelAlpha.tex lines 7217-7221: H_O^k . H_O^s = H_O^{ks}.
// classify() never returns 'homothety' (see Global Constraints) -- the
// expected readback is 'rotate' with angle ~= 0.
t('concentric homotheties compose multiplicatively (book, lines 7217-7221)', () => {
  var g = SimilarityMath.paramsToMotion({ type: 'homothety', ox: 4, oy: 9, k: 2 });
  var f = SimilarityMath.paramsToMotion({ type: 'homothety', ox: 4, oy: 9, k: 3 });
  var c = SimilarityMath.classify(SimilarityMath.compose(f, g));
  assert.equal(c.type, 'rotate');
  assert.ok(Math.abs(c.angle) < 1e-6);
  assert.ok(Math.abs(c.k - 6) < 1e-6);
  assert.ok(Math.abs(c.ox - 4) < 1e-6 && Math.abs(c.oy - 9) < 1e-6);
});

// Generalizes the book's perpendicular-axes exercise (LevelAlpha.tex line
// 2686, already verified for the k=1 case in chasles.html's test suite):
// composing two reflected homotheties on perpendicular axes through the same
// center gives a half-turn scaled by the product of their k's.
t('perpendicular reflected homotheties compose to a half-turn scaled by k1*k2', () => {
  var g = SimilarityMath.paramsToMotion({ type: 'reflect', px: 0, py: 0, theta: 0, k: 1.4 });
  var f = SimilarityMath.paramsToMotion({ type: 'reflect', px: 0, py: 0, theta: Math.PI / 2, k: 1 });
  var c = SimilarityMath.classify(SimilarityMath.compose(f, g));
  assert.equal(c.type, 'rotate');
  assert.ok(Math.abs(Math.abs(c.angle) - Math.PI) < 1e-6);
  assert.ok(Math.abs(c.k - 1.4) < 1e-6);
});

// Book exercise, ch. 12, LevelAlpha.tex lines 6877-6878: z -> alpha*z is the
// composition of a homothety |alpha| and a rotation arg(alpha).
t('z -> alpha*z decomposes into homothety(|alpha|) then rotation(arg alpha) (ch.12 exercise)', () => {
  var alpha = { re: 3, im: 4 }; // |alpha|=5, arg(alpha)=atan2(4,3)
  var z = { re: 2, im: -1 };
  var direct = SimilarityMath.mul(alpha, z);
  var hom = SimilarityMath.paramsToMotion({ type: 'homothety', ox: 0, oy: 0, k: SimilarityMath.abs(alpha) });
  // angle is negated for the same flipY reason as the rotation tests above.
  var rot = SimilarityMath.paramsToMotion({ type: 'rotate', ox: 0, oy: 0, angle: -SimilarityMath.arg(alpha), k: 1 });
  var composed = SimilarityMath.compose(rot, hom); // homothety first, then rotation
  assert.ok(approxEqual(SimilarityMath.apply(composed, z), direct));
});

t('formatComplex renders the sign correctly', () => {
  assert.equal(SimilarityMath.formatComplex({ re: 1.2, im: -3.456 }), '1.20 - 3.46i');
});

if (failed) { console.error('\nSome tests FAILED'); process.exit(1); }
console.log('\nAll tests passed');
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `cd ~/MATH/homepage && node /tmp/claude-1000/-home-nkrishelie-MATH-homepage/b4344be2-3a54-49ee-ab91-04cfc9f96d2f/scratchpad/similarity-math.test.mjs`
Expected: throws `Could not find <script id="similarity-math"> in similarities.html`.

- [ ] **Step 3: Add the `SimilarityMath` module to `similarities.html`**

Insert this `<script>` block immediately before the `<p class="page-footer">`
line:

```html
<script id="similarity-math">
window.SimilarityMath = (function () {
  function add(u, v) { return { re: u.re + v.re, im: u.im + v.im }; }
  function sub(u, v) { return { re: u.re - v.re, im: u.im - v.im }; }
  function mul(u, v) { return { re: u.re * v.re - u.im * v.im, im: u.re * v.im + u.im * v.re }; }
  function scale(u, k) { return { re: u.re * k, im: u.im * k }; }
  function conj(u) { return { re: u.re, im: -u.im }; }
  function abs(u) { return Math.hypot(u.re, u.im); }
  function arg(u) { return Math.atan2(u.im, u.re); }
  function fromPolar(r, theta) { return { re: r * Math.cos(theta), im: r * Math.sin(theta) }; }
  function div(u, v) {
    var d = v.re * v.re + v.im * v.im;
    return { re: (u.re * v.re + u.im * v.im) / d, im: (u.im * v.re - u.re * v.im) / d };
  }

  function translationToMotion(vx, vy) {
    return { kind: 1, a: { re: 1, im: 0 }, b: { re: vx, im: vy } };
  }
  // k=1 reproduces a plain rotation (chasles.html's rotationToMotion);
  // angle=0 reproduces a plain homothety. Both are just special values of
  // this one two-parameter family, which is why classify() only ever
  // reports 'rotate', never a separate 'homothety' kind.
  function rotationToMotion(ox, oy, angle, k) {
    var a = fromPolar(k, angle);
    var o = { re: ox, im: oy };
    return { kind: 1, a: a, b: mul(o, sub({ re: 1, im: 0 }, a)) };
  }
  // k=1 reproduces a plain reflection (chasles.html's reflectionToMotion).
  // b = p - a*conj(p) guarantees f(p)=p for ANY k, so p is always the
  // homothety center -- not just an arbitrary point on the axis, the way it
  // is for a plain reflection where every point on the axis is fixed.
  function reflectionToMotion(px, py, theta, k) {
    var a = fromPolar(k, 2 * theta);
    var p = { re: px, im: py };
    return { kind: 2, a: a, b: sub(p, mul(a, conj(p))) };
  }
  function glideToMotion(px, py, theta, t) {
    var refl = reflectionToMotion(px, py, theta, 1);
    return { kind: 2, a: refl.a, b: add(refl.b, fromPolar(t, theta)) };
  }

  // Same widget/complex-space sign-flip convention as chasles.html's
  // MotionMath.flipY. k is a plain scale factor and is unaffected by the flip.
  function flipY(p) {
    if (p.type === 'translate') return { type: 'translate', vx: p.vx, vy: -p.vy };
    if (p.type === 'homothety') return { type: 'homothety', ox: p.ox, oy: -p.oy, k: p.k };
    if (p.type === 'rotate') return { type: 'rotate', ox: p.ox, oy: -p.oy, angle: -p.angle, k: p.k };
    if (p.type === 'reflect') return { type: 'reflect', px: p.px, py: -p.py, theta: -p.theta, k: p.k };
    return { type: 'glide', px: p.px, py: -p.py, theta: -p.theta, t: p.t };
  }

  // 'homothety' is an input-only convenience shape; classify() never returns
  // it -- a rotate-family result with angle ~= 0 IS the homothety case.
  function paramsToMotion(p) {
    var fp = flipY(p);
    if (fp.type === 'translate') return translationToMotion(fp.vx, fp.vy);
    if (fp.type === 'homothety') return rotationToMotion(fp.ox, fp.oy, 0, fp.k);
    if (fp.type === 'rotate') return rotationToMotion(fp.ox, fp.oy, fp.angle, fp.k);
    if (fp.type === 'reflect') return reflectionToMotion(fp.px, fp.py, fp.theta, fp.k);
    return glideToMotion(fp.px, fp.py, fp.theta, fp.t);
  }

  function apply(m, z) {
    var zz = m.kind === 2 ? conj(z) : z;
    return add(mul(m.a, zz), m.b);
  }

  // Identical to chasles.html's MotionMath.compose -- already fully general,
  // never assumed |a|=1.
  function compose(f, g) {
    var gA = f.kind === 2 ? conj(g.a) : g.a;
    var gB = f.kind === 2 ? conj(g.b) : g.b;
    return {
      kind: f.kind === g.kind ? 1 : 2,
      a: mul(f.a, gA),
      b: add(mul(f.a, gB), f.b)
    };
  }

  function classify(m, eps) {
    eps = eps || 1e-6;
    var raw;
    if (m.kind === 1) {
      if (abs(sub(m.a, { re: 1, im: 0 })) < eps) {
        raw = { type: 'translate', vx: m.b.re, vy: m.b.im };
      } else {
        var center = div(m.b, sub({ re: 1, im: 0 }, m.a));
        raw = { type: 'rotate', ox: center.re, oy: center.im, angle: arg(m.a), k: abs(m.a) };
      }
    } else {
      var ka = abs(m.a);
      if (Math.abs(ka - 1) < eps) {
        // Isometry case: identical derivation to chasles.html's classify.
        var psi = arg(m.a);
        var r = fromPolar(1, psi / 2);
        var beta = mul(m.b, conj(r));
        var axisPoint = mul(r, { re: 0, im: beta.im / 2 });
        if (Math.abs(beta.re) < eps) {
          raw = { type: 'reflect', px: axisPoint.re, py: axisPoint.im, theta: psi / 2, k: 1 };
        } else {
          raw = { type: 'glide', px: axisPoint.re, py: axisPoint.im, theta: psi / 2, t: beta.re };
        }
      } else {
        // Reflected homothety: f(z)=a*conj(z)+b, |a|!=1. Solving f(z)=z
        // together with its conjugate as a 2x2 real-linear system gives the
        // unique fixed point z0=(b+a*conj(b))/(1-|a|^2); the axis runs
        // through z0 at angle arg(a)/2 (since a=k*e^(2i*theta)).
        var denom = 1 - ka * ka;
        var z0 = div(add(m.b, mul(m.a, conj(m.b))), { re: denom, im: 0 });
        raw = { type: 'reflect', px: z0.re, py: z0.im, theta: arg(m.a) / 2, k: ka };
      }
    }
    return flipY(raw);
  }

  function formatComplex(u) {
    var re = u.re.toFixed(2);
    var imAbs = Math.abs(u.im).toFixed(2);
    var sign = u.im < 0 ? '-' : '+';
    return re + ' ' + sign + ' ' + imAbs + 'i';
  }

  function formatCoefficient(u, eps) {
    eps = eps || 1e-2;
    var reZero = Math.abs(u.re) < eps, imZero = Math.abs(u.im) < eps;
    if (reZero && imZero) return '0';
    if (imZero) {
      if (Math.abs(u.re - 1) < eps) return '';
      if (Math.abs(u.re + 1) < eps) return '-';
      return '(' + u.re.toFixed(2) + ')';
    }
    if (reZero) {
      if (Math.abs(u.im - 1) < eps) return 'i';
      if (Math.abs(u.im + 1) < eps) return '-i';
      return '(' + u.im.toFixed(2) + 'i)';
    }
    return '(' + formatComplex(u) + ')';
  }

  function formatConstantTerm(u, eps) {
    eps = eps || 1e-2;
    var reZero = Math.abs(u.re) < eps, imZero = Math.abs(u.im) < eps;
    if (reZero && imZero) return '';
    if (imZero) return (u.re < 0 ? ' - ' : ' + ') + Math.abs(u.re).toFixed(2);
    if (reZero) return (u.im < 0 ? ' - ' : ' + ') + Math.abs(u.im).toFixed(2) + 'i';
    return ' + (' + formatComplex(u) + ')';
  }

  function formatExpr(m) {
    var zPart = m.kind === 2 ? '\\bar z' : 'z';
    return formatCoefficient(m.a) + zPart + formatConstantTerm(m.b);
  }

  function formatDeg(rad) {
    return (rad * 180 / Math.PI).toFixed(1) + '^\\circ';
  }

  function formatRecipe(p) {
    var fp = flipY(p);
    if (fp.type === 'translate') {
      return { template: 'f(z) = z + v', params: 'v \\approx ' + formatComplex({ re: fp.vx, im: fp.vy }) };
    }
    if (fp.type === 'homothety') {
      var z0h = { re: fp.ox, im: fp.oy };
      return {
        template: 'f(z) = k(z-z_0)+z_0',
        params: 'k \\approx ' + fp.k.toFixed(2) + ',\\ z_0 \\approx ' + formatComplex(z0h)
      };
    }
    if (fp.type === 'rotate') {
      var z0 = { re: fp.ox, im: fp.oy };
      return {
        template: 'f(z) = ke^{i\\alpha}(z-z_0)+z_0',
        params: 'k \\approx ' + fp.k.toFixed(2) + ',\\ \\alpha \\approx ' + formatDeg(fp.angle) + ',\\ z_0 \\approx ' + formatComplex(z0)
      };
    }
    if (fp.type === 'reflect') {
      var pt = { re: fp.px, im: fp.py };
      return {
        template: 'f(z) = ke^{2i\\theta}\\overline{(z-p)}+p',
        params: 'k \\approx ' + fp.k.toFixed(2) + ',\\ \\theta \\approx ' + formatDeg(fp.theta) + ',\\ p \\approx ' + formatComplex(pt)
      };
    }
    var pt2 = { re: fp.px, im: fp.py };
    return {
      template: 'f(z) = e^{2i\\theta}\\overline{(z-p)}+p+te^{i\\theta}',
      params: '\\theta \\approx ' + formatDeg(fp.theta) + ',\\ p \\approx ' + formatComplex(pt2) + ',\\ t \\approx ' + fp.t.toFixed(2)
    };
  }

  return {
    add: add, sub: sub, mul: mul, scale: scale, conj: conj, abs: abs, arg: arg,
    fromPolar: fromPolar, div: div,
    paramsToMotion: paramsToMotion, apply: apply, compose: compose, classify: classify,
    formatComplex: formatComplex, formatExpr: formatExpr, formatRecipe: formatRecipe
  };
})();
</script>
```

- [ ] **Step 4: Run the test again to confirm it passes**

Run: `cd ~/MATH/homepage && node /tmp/claude-1000/-home-nkrishelie-MATH-homepage/b4344be2-3a54-49ee-ab91-04cfc9f96d2f/scratchpad/similarity-math.test.mjs`
Expected: `PASS` for all 11 cases, ending `All tests passed`, exit code 0.

- [ ] **Step 5: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/similarities.html
git commit -m "$(cat <<'EOF'
Add SimilarityMath: complex-number algebra for plane similarities

Generalizes chasles.html's MotionMath with a scale factor k on the
rotate/reflect families (rotational homothety / reflected homothety),
plus a homothety-only input convenience shape. classify() covers the
new |a|!=1 fixed-point formula for kind-2 motions. Verified against
the book's own claims: concentric homotheties compose multiplicatively,
the perpendicular-axes exercise generalizes with a k1*k2 scale factor,
and the ch.12 z->alpha*z decomposition exercise.
EOF
)"
```

---

## Task 3: Similarity widget factory (`SimilarityWidget`) + §2 "Гомотетия"

The biggest single piece of new code: a reusable draggable SVG widget
generalizing `chasles.html`'s `MotionWidget` with a `k` slider and a new
`homothety` tab.

**Files:**
- Modify: `public/Materials/similarities.html`

**Interfaces:**
- Consumes: nothing (geometry-only; does not know about `SimilarityMath` at
  all — clean separation, same as `MotionWidget`/`MotionMath`).
- Produces, on `window.SimilarityWidget`:
  - `create(container, opts) -> { getParams(), setParams(params), el }` where
    `container` is a DOM element and
    `opts = { tabs: [...subset of 'translate'|'homothety'|'rotate'|'reflect'|'glide'], initial: params, axes: bool, onChange: function(params){} }`.
    `getParams()`/`setParams()`/`onChange` use the **same 5 params shapes** as
    `SimilarityMath.paramsToMotion`/`classify` (Task 2).
  - `renderStatic(svgEl, params, opts) -> void` — draws the ghost+solid flag
    (and axes, if `opts.axes`) for given params into an existing `<svg>` with
    no drag handles (used by Task 7's read-only result panel).
  - Tabs `homothety`/`rotate`/`reflect` each render a `k` slider
    (`-2` to `4`, step `0.1`, `1` in the middle) below the SVG; `translate`/
    `glide` do not (their `k` is fixed at `1` and not exposed).

- [ ] **Step 1: Add widget + slider CSS**

Append inside `<style>`, before `</style>`:

```css
.motion-frame{width:100%;max-width:560px;height:auto;aspect-ratio:300/220;display:block;background:var(--bg2);border:1px solid var(--border);border-radius:6px;touch-action:none}
.motion-widget{margin:1rem 0;max-width:560px}
.motion-widget.small{max-width:340px}
.mw-tabs{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:.6rem}
.mw-tab{font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:.03em;padding:6px 12px;border-radius:999px;border:1px solid var(--border);background:var(--bg);color:var(--ink2);cursor:pointer}
.mw-tab.active{background:var(--ink);color:#fff;border-color:var(--ink)}
.mw-tab:not(.active):hover{border-color:var(--ink2)}
.mw-flag-ghost{fill:rgba(26,25,23,.08);stroke:var(--ink3);stroke-width:1;stroke-dasharray:3 3}
.mw-flag-solid{fill:rgba(58,95,158,.18);stroke:var(--blue-acc);stroke-width:1.6}
.mw-axis{stroke:var(--rust-acc);stroke-width:1.4;stroke-dasharray:6 4}
.mw-orbit{fill:none;stroke:var(--ink3);stroke-width:1;stroke-dasharray:3 3}
.mw-vector{stroke:var(--blue-acc);stroke-width:2}
.mw-handle{fill:var(--ink);stroke:var(--bg);stroke-width:1.5}
.mw-hit{fill:#000;opacity:0;cursor:grab;touch-action:none}
.mw-hit:active{cursor:grabbing}
.mw-coord-axis{stroke:var(--ink3);stroke-width:1;opacity:.55}
.mw-origin{fill:var(--ink3)}
.mw-handle-label{font-family:'JetBrains Mono',monospace;font-size:7px;fill:var(--ink2)}
.mw-slider-row{display:flex;align-items:center;gap:10px;margin-top:.7rem;font-family:'JetBrains Mono',monospace;font-size:14px;color:var(--ink2)}
.mw-slider-row input[type=range]{flex:1;accent-color:var(--blue-acc)}
.mw-slider-val{min-width:3.6em;text-align:right;color:var(--ink);font-weight:500}
figure{margin:1.4rem 0}
figcaption{font-size:16.5px;color:var(--ink3);margin-top:.6rem;line-height:1.55;font-style:italic}
.svg-label{font-family:'JetBrains Mono',monospace;font-size:13px;fill:var(--ink2)}
.note{border-left:3px solid var(--rust-acc);background:var(--rust-bg);border-radius:0 6px 6px 0;padding:.8rem 1.1rem;margin:1rem 0;font-size:17.5px;color:var(--ink2)}
.note .note-head{font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--rust-acc);margin-bottom:.35rem}
.note p{margin-bottom:.55rem;color:var(--ink2)}
.note p:last-child{margin-bottom:0}
```

- [ ] **Step 2: Add §2 markup and the `<script id="similarity-widget">` module**

Insert before `<p class="page-footer">`:

```html
<section id="sec-homothety">
  <h2>2. Гомотетия</h2>
  <p class="lead">Зафиксируем точку $O$ — центр гомотетии. Гомотетия с коэффициентом $k$ переводит точку $A$ в точку $H_O^k(A) = O + k\vec{OA}$ — на луче $OA$ (или его продолжении), на расстоянии в $|k|$ раз больше, чем $|OA|$. Перетащите центр $O$ и подвигайте ползунок $k$.</p>
  <figure>
    <div class="motion-widget" id="widget-homothety"></div>
    <div class="note" id="badge-homothety-id" style="display:none">
      <span class="note-head">k = 1</span>
      <span>Тождественное преобразование — гомотетия ничего не меняет.</span>
    </div>
    <div class="note" id="badge-homothety-central" style="display:none">
      <span class="note-head">k = −1</span>
      <span>Центральная симметрия: поворот на $180^\circ$ вокруг центра $O$.</span>
    </div>
    <figcaption>Бледный контур — исходный флажок, синий — его образ при гомотетии $H_O^k$.</figcaption>
  </figure>
  <div class="note">
    <span class="note-head">Композиция концентрических гомотетий</span>
    <p>$H_O^k\circ H_O^s = H_O^{ks}$ — коэффициенты просто перемножаются. Гомотетии с общим центром и операцией композиции устроены как ненулевые числа с умножением — совсем как переносы устроены как числа со сложением ($T_a\circ T_b=T_{a+b}$).</p>
  </div>
</section>

<script id="similarity-widget">
window.SimilarityWidget = (function () {
  var FRAME_HALF_W = 150, FRAME_HALF_H = 110;
  var CAP_X = 140, CAP_Y = 100;
  var FRAME_VB = (-FRAME_HALF_W) + ' ' + (-FRAME_HALF_H) + ' ' + (2 * FRAME_HALF_W) + ' ' + (2 * FRAME_HALF_H);
  var ORIGIN = [-70, 35];
  var LOCAL_FLAG = [[-2, -28], [-2, 28], [2, 28], [2, -12], [20, -20], [2, -28]];
  var TAB_LABELS = {
    translate: 'Перенос', homothety: 'Гомотетия', rotate: 'Поворотная гомотетия',
    reflect: 'Отражённая гомотетия', glide: 'Скользящая симметрия'
  };

  var SNAP = 5;
  function snap(v) { return Math.round(v / SNAP) * SNAP; }
  function clamp(p) {
    var x = Math.max(-CAP_X, Math.min(CAP_X, p[0]));
    var y = Math.max(-CAP_Y, Math.min(CAP_Y, p[1]));
    return [snap(x), snap(y)];
  }
  function fmtCoord(x, y) {
    var im = -y;
    var sign = im < 0 ? '-' : '+';
    return x.toFixed(2) + ' ' + sign + ' ' + Math.abs(im).toFixed(2) + 'i';
  }
  function fmtAngleDeg(rad) {
    return (-rad * 180 / Math.PI).toFixed(1) + '°';
  }
  function flagPoints(anchor, angle) {
    var a = angle || 0, cos = Math.cos(a), sin = Math.sin(a);
    return LOCAL_FLAG.map(function (p) {
      return [p[0] * cos - p[1] * sin + anchor[0], p[0] * sin + p[1] * cos + anchor[1]];
    });
  }
  function fmtPts(pts) {
    return pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ');
  }
  function axisFromPointTheta(px, py, theta, half) {
    var dx = Math.cos(theta) * half, dy = Math.sin(theta) * half;
    return [[px - dx, py - dy], [px + dx, py + dy]];
  }
  function axesMarkup() {
    return '<line x1="' + (-FRAME_HALF_W) + '" y1="0" x2="' + FRAME_HALF_W + '" y2="0" class="mw-coord-axis"/>' +
      '<line x1="0" y1="' + (-FRAME_HALF_H) + '" x2="0" y2="' + FRAME_HALF_H + '" class="mw-coord-axis"/>' +
      '<circle cx="0" cy="0" r="3" class="mw-origin"/>' +
      '<text x="6" y="16" class="svg-label">0</text>' +
      '<text x="' + (FRAME_HALF_W - 20) + '" y="-8" class="svg-label">Re</text>' +
      '<text x="8" y="' + (-FRAME_HALF_H + 14) + '" class="svg-label">Im</text>';
  }

  function scalePoint(pt, c, k) {
    return [c[0] + (pt[0] - c[0]) * k, c[1] + (pt[1] - c[1]) * k];
  }
  function rotateScalePoint(pt, c, ang, k) {
    var dx = (pt[0] - c[0]) * k, dy = (pt[1] - c[1]) * k;
    var cos = Math.cos(ang), sin = Math.sin(ang);
    return [c[0] + dx * cos - dy * sin, c[1] + dx * sin + dy * cos];
  }
  // Reflect across the line through c at angle theta, scaled by k from c.
  // (Rotate into the axis-local frame, negate the perpendicular component,
  // scale, rotate back -- reduces to rx=k(dx*cos2t+dy*sin2t), ry=k(dx*sin2t-dy*cos2t).)
  function reflectScalePoint(pt, c, theta, k) {
    var dx = pt[0] - c[0], dy = pt[1] - c[1];
    var c2 = Math.cos(2 * theta), s2 = Math.sin(2 * theta);
    var rx = k * (dx * c2 + dy * s2), ry = k * (dx * s2 - dy * c2);
    return [c[0] + rx, c[1] + ry];
  }

  function imagePointsForParams(p) {
    var base = flagPoints(ORIGIN, 0);
    if (p.type === 'translate') {
      return base.map(function (pt) { return [pt[0] + p.vx, pt[1] + p.vy]; });
    }
    if (p.type === 'homothety') {
      return base.map(function (pt) { return scalePoint(pt, [p.ox, p.oy], p.k); });
    }
    if (p.type === 'rotate') {
      return base.map(function (pt) { return rotateScalePoint(pt, [p.ox, p.oy], p.angle, p.k === undefined ? 1 : p.k); });
    }
    if (p.type === 'reflect') {
      return base.map(function (pt) { return reflectScalePoint(pt, [p.px, p.py], p.theta, p.k === undefined ? 1 : p.k); });
    }
    var ux = Math.cos(p.theta), uy = Math.sin(p.theta);
    return base.map(function (pt) {
      var r = reflectScalePoint(pt, [p.px, p.py], p.theta, 1);
      return [r[0] + ux * p.t, r[1] + uy * p.t];
    });
  }

  function renderStatic(svgEl, params, opts) {
    svgEl.setAttribute('viewBox', FRAME_VB);
    svgEl.innerHTML =
      (opts && opts.axes ? axesMarkup() : '') +
      '<polygon points="' + fmtPts(flagPoints(ORIGIN, 0)) + '" class="mw-flag-ghost"/>' +
      '<polygon points="' + fmtPts(imagePointsForParams(params)) + '" class="mw-flag-solid"/>';
  }

  function kSupported(tabKey) {
    return tabKey === 'homothety' || tabKey === 'rotate' || tabKey === 'reflect';
  }

  function createSimilarityWidget(container, opts) {
    var tabs = opts.tabs.slice();
    var onChange = opts.onChange || function () {};
    var showAxes = !!opts.axes;
    var state = {
      translate: { vx: 70, vy: -40 },
      homothety: { ox: 20, oy: 30, k: 1 },
      rotate: { ox: 20, oy: 30, angle: Math.PI / 3, k: 1 },
      reflect: { ax: -30, ay: 70, bx: 60, by: -60, k: 1 },
      glide: { ax: -30, ay: 70, bx: -2, by: 29 }
    };
    var current = tabs[0];

    container.innerHTML =
      (tabs.length > 1 ? '<div class="mw-tabs">' + tabs.map(function (tkey) {
        return '<button type="button" class="mw-tab" data-tab="' + tkey + '">' + TAB_LABELS[tkey] + '</button>';
      }).join('') + '</div>' : '') +
      '<svg class="mw-svg motion-frame" viewBox="' + FRAME_VB + '"></svg>' +
      '<div class="mw-slider-row"><label>k = <span class="mw-slider-val">1.00</span></label><input type="range" class="mw-slider" min="-2" max="4" step="0.1" value="1"></div>';

    var svg = container.querySelector('.mw-svg');
    var tabButtons = container.querySelectorAll('.mw-tab');
    var sliderRow = container.querySelector('.mw-slider-row');
    var sliderInput = container.querySelector('.mw-slider');
    var sliderVal = container.querySelector('.mw-slider-val');

    function localPointFromClient(clientX, clientY) {
      var rect = svg.getBoundingClientRect();
      var vb = svg.viewBox.baseVal;
      var s = rect.width / vb.width;
      return [(clientX - rect.left) / s + vb.x, (clientY - rect.top) / s + vb.y];
    }

    function currentParams() {
      if (current === 'translate') return { type: 'translate', vx: state.translate.vx, vy: state.translate.vy };
      if (current === 'homothety') return { type: 'homothety', ox: state.homothety.ox, oy: state.homothety.oy, k: state.homothety.k };
      if (current === 'rotate') return { type: 'rotate', ox: state.rotate.ox, oy: state.rotate.oy, angle: state.rotate.angle, k: state.rotate.k };
      if (current === 'reflect') {
        var s = state.reflect;
        return { type: 'reflect', px: s.ax, py: s.ay, theta: Math.atan2(s.by - s.ay, s.bx - s.ax), k: s.k };
      }
      var g = state.glide;
      var gdx = g.bx - g.ax, gdy = g.by - g.ay;
      return { type: 'glide', px: g.ax, py: g.ay, theta: Math.atan2(gdy, gdx), t: Math.hypot(gdx, gdy) };
    }

    function handleMarkup(x, y, key, label) {
      var labelSvg = (showAxes && label)
        ? '<text x="' + (x + 10).toFixed(1) + '" y="' + (y - 10).toFixed(1) + '" class="mw-handle-label">' + label + '</text>'
        : '';
      return '<circle class="mw-handle" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="8"/>' +
             '<circle class="mw-hit" data-key="' + key + '" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="20"/>' +
             labelSvg;
    }

    function render() {
      var parts = [];
      if (showAxes) parts.push(axesMarkup());
      parts.push('<polygon points="' + fmtPts(flagPoints(ORIGIN, 0)) + '" class="mw-flag-ghost"/>');

      if (current === 'reflect' || current === 'glide') {
        var s = state[current];
        var dx = s.bx - s.ax, dy = s.by - s.ay, len = Math.hypot(dx, dy) || 1;
        var ux = dx / len, uy = dy / len, ext = 500;
        parts.push('<line x1="' + (s.ax - ux * ext).toFixed(1) + '" y1="' + (s.ay - uy * ext).toFixed(1) +
          '" x2="' + (s.bx + ux * ext).toFixed(1) + '" y2="' + (s.by + uy * ext).toFixed(1) + '" class="mw-axis"/>');
      }
      if (current === 'glide') {
        var gs = state.glide;
        parts.push('<line x1="' + gs.ax.toFixed(1) + '" y1="' + gs.ay.toFixed(1) +
          '" x2="' + gs.bx.toFixed(1) + '" y2="' + gs.by.toFixed(1) + '" class="mw-vector"/>');
      }
      if (current === 'rotate') {
        var r = state.rotate;
        parts.push('<circle cx="' + r.ox.toFixed(1) + '" cy="' + r.oy.toFixed(1) + '" r="45" class="mw-orbit"/>');
      }
      if (current === 'translate') {
        var v = state.translate;
        parts.push('<line x1="' + ORIGIN[0] + '" y1="' + ORIGIN[1] + '" x2="' + (ORIGIN[0] + v.vx).toFixed(1) +
          '" y2="' + (ORIGIN[1] + v.vy).toFixed(1) + '" class="mw-vector"/>');
      }

      parts.push('<polygon points="' + fmtPts(imagePointsForParams(currentParams())) + '" class="mw-flag-solid"/>');

      if (current === 'translate') {
        var v2 = state.translate;
        parts.push(handleMarkup(ORIGIN[0] + v2.vx, ORIGIN[1] + v2.vy, 'v', fmtCoord(v2.vx, v2.vy)));
      } else if (current === 'homothety') {
        var h = state.homothety;
        parts.push(handleMarkup(h.ox, h.oy, 'o', fmtCoord(h.ox, h.oy)));
      } else if (current === 'rotate') {
        var r2 = state.rotate;
        parts.push(handleMarkup(r2.ox, r2.oy, 'o', fmtCoord(r2.ox, r2.oy)));
        parts.push(handleMarkup(r2.ox + 45 * Math.cos(r2.angle), r2.oy + 45 * Math.sin(r2.angle), 'ang', fmtAngleDeg(r2.angle)));
      } else if (current === 'reflect' || current === 'glide') {
        var s2 = state[current];
        parts.push(handleMarkup(s2.ax, s2.ay, 'a', fmtCoord(s2.ax, s2.ay)));
        parts.push(handleMarkup(s2.bx, s2.by, 'b', fmtCoord(s2.bx, s2.by)));
      }

      svg.innerHTML = parts.join('');
      wireHandleDrag();

      if (kSupported(current)) {
        sliderRow.style.display = 'flex';
        sliderInput.value = state[current].k;
        sliderVal.textContent = state[current].k.toFixed(2);
      } else {
        sliderRow.style.display = 'none';
      }

      onChange(currentParams());
    }

    var dragKey = null, activePointerId = null;

    function onPointerDown(e) {
      var t = e.target;
      if (!t.classList || !t.classList.contains('mw-hit')) return;
      dragKey = t.getAttribute('data-key');
      activePointerId = e.pointerId;
      e.preventDefault();
    }
    function onPointerMove(e) {
      if (dragKey === null || e.pointerId !== activePointerId) return;
      if (current === 'rotate' && dragKey === 'ang') {
        var raw = localPointFromClient(e.clientX, e.clientY);
        var rawAngle = Math.atan2(raw[1] - state.rotate.oy, raw[0] - state.rotate.ox);
        var deg = Math.round((rawAngle * 180 / Math.PI) / SNAP) * SNAP;
        state.rotate.angle = deg * Math.PI / 180;
        render();
        e.preventDefault();
        return;
      }
      var p = clamp(localPointFromClient(e.clientX, e.clientY));
      if (current === 'translate' && dragKey === 'v') {
        state.translate.vx = p[0] - ORIGIN[0];
        state.translate.vy = p[1] - ORIGIN[1];
      } else if (current === 'homothety' && dragKey === 'o') {
        state.homothety.ox = p[0]; state.homothety.oy = p[1];
      } else if (current === 'rotate' && dragKey === 'o') {
        state.rotate.ox = p[0]; state.rotate.oy = p[1];
      } else if ((current === 'reflect' || current === 'glide') && dragKey === 'a') {
        state[current].ax = p[0]; state[current].ay = p[1];
      } else if ((current === 'reflect' || current === 'glide') && dragKey === 'b') {
        state[current].bx = p[0]; state[current].by = p[1];
      }
      render();
      e.preventDefault();
    }
    function onPointerUp(e) {
      if (e.pointerId !== activePointerId) return;
      dragKey = null; activePointerId = null;
    }
    function wireHandleDrag() {
      var hits = svg.querySelectorAll('.mw-hit');
      for (var i = 0; i < hits.length; i++) {
        hits[i].removeEventListener('pointerdown', onPointerDown);
        hits[i].addEventListener('pointerdown', onPointerDown);
      }
    }
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    sliderInput.addEventListener('input', function () {
      state[current].k = parseFloat(sliderInput.value);
      render();
    });

    for (var bi = 0; bi < tabButtons.length; bi++) {
      tabButtons[bi].addEventListener('click', function (e) {
        current = e.currentTarget.getAttribute('data-tab');
        updateTabButtons();
        render();
      });
    }
    function updateTabButtons() {
      for (var j = 0; j < tabButtons.length; j++) {
        tabButtons[j].classList.toggle('active', tabButtons[j].getAttribute('data-tab') === current);
      }
    }

    function applyParams(p) {
      current = p.type;
      if (p.type === 'translate') state.translate = { vx: p.vx, vy: p.vy };
      else if (p.type === 'homothety') state.homothety = { ox: p.ox, oy: p.oy, k: p.k === undefined ? 1 : p.k };
      else if (p.type === 'rotate') state.rotate = { ox: p.ox, oy: p.oy, angle: p.angle, k: p.k === undefined ? 1 : p.k };
      else if (p.type === 'reflect') {
        var axis = axisFromPointTheta(p.px, p.py, p.theta, 40);
        state.reflect = { ax: axis[0][0], ay: axis[0][1], bx: axis[1][0], by: axis[1][1], k: p.k === undefined ? 1 : p.k };
      } else {
        state.glide = { ax: p.px, ay: p.py, bx: p.px + Math.cos(p.theta) * p.t, by: p.py + Math.sin(p.theta) * p.t };
      }
    }

    if (opts.initial) applyParams(opts.initial);
    updateTabButtons();
    render();

    return {
      getParams: currentParams,
      setParams: function (p) { applyParams(p); updateTabButtons(); render(); },
      el: container
    };
  }

  return { create: createSimilarityWidget, renderStatic: renderStatic };
})();

(function () {
  var el = document.getElementById('widget-homothety');
  var badgeId = document.getElementById('badge-homothety-id');
  var badgeCentral = document.getElementById('badge-homothety-central');
  if (!el || !badgeId || !badgeCentral) return;

  function update(params) {
    badgeId.style.display = Math.abs(params.k - 1) < 0.03 ? 'block' : 'none';
    badgeCentral.style.display = Math.abs(params.k + 1) < 0.03 ? 'block' : 'none';
  }

  var widget = SimilarityWidget.create(el, {
    tabs: ['homothety'],
    initial: { type: 'homothety', ox: 20, oy: 30, k: 1.6 },
    onChange: update
  });
  update(widget.getParams());
})();
</script>
```

- [ ] **Step 3: Verify in browser**

Reload `/Materials/similarities.html`. Expected: §2 shows a widget with **no
tab bar** (single tab, hidden per the `tabs.length > 1` check), just the SVG
and, below it, a `k =` slider reading `1.60` initially, centered visually so
that dragging to the middle of the track reads `k = 1.00`. Dragging the center
handle moves the whole setup; moving the slider scales the solid flag live
around the (fixed) center — larger past `1`, smaller (and eventually
flipped/mirrored through the center) below `0`. Setting the slider to exactly
`1.00` reveals the "k = 1" note; setting it to `-1.00` reveals the "k = −1"
note; both hide again once the value moves away. No console errors, no
handle draggable outside the frame.

- [ ] **Step 4: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/similarities.html
git commit -m "$(cat <<'EOF'
Add SimilarityWidget factory and §2 (homothety)

Generalizes chasles.html's MotionWidget with a k slider (-2..4, 1
centered) on homothety/rotate/reflect tabs and a new homothety-only
tab. Wired up for §2 with a single-tab (no tab bar) widget plus
k=1/k=-1 explanatory notes that toggle visibility without touching
KaTeX-rendered innerHTML (avoids re-render issues, same pattern as
chasles.html's nails-note).
EOF
)"
```

---

## Task 4: §3 "Поворотная гомотетия"

**Files:**
- Modify: `public/Materials/similarities.html`

**Interfaces:**
- Consumes: `SimilarityWidget.create` (Task 3), tab `rotate`.
- Produces: nothing consumed later.

- [ ] **Step 1: Add §3 markup and script**

Insert before `<p class="page-footer">`:

```html
<section id="sec-rothomothety">
  <h2>3. Поворотная гомотетия</h2>
  <p class="lead">Скомбинируем гомотетию с поворотом вокруг того же центра $O$: сначала растянуть в $k$ раз, потом повернуть на угол $\alpha$ — или наоборот, результат один и тот же, поворот и гомотетия с общим центром коммутируют: $R_O^\alpha\circ H_O^k = H_O^k\circ R_O^\alpha$. Если поместить $O$ в комплексный ноль, всё действие — это просто умножение на число $ke^{i\alpha}$.</p>
  <figure>
    <div class="motion-widget" id="widget-rothomothety"></div>
    <figcaption>Тащите центр $O$ и ручку угла, двигайте ползунок $k$.</figcaption>
  </figure>
</section>

<script>
(function () {
  var el = document.getElementById('widget-rothomothety');
  if (!el || !window.SimilarityWidget) return;
  SimilarityWidget.create(el, {
    tabs: ['rotate'],
    initial: { type: 'rotate', ox: 20, oy: 30, angle: Math.PI / 3, k: 1.5 }
  });
})();
</script>
```

- [ ] **Step 2: Verify in browser**

Reload. Expected: §3 shows a widget (no tab bar, single tab) with a center
handle `o`, an angle handle `ang` on a dashed orbit circle, and a `k` slider
below (starting at `1.50`). Dragging the center moves the whole rotational
homothety; dragging the angle handle spins the solid flag around the center;
moving the slider additionally grows/shrinks it. No console errors.

- [ ] **Step 3: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/similarities.html
git commit -m "Add §3: rotational homothety (rotate tab with k slider)"
```

---

## Task 5: §4 "Неподвижная точка подобия"

Mirrors `chasles.html`'s §7 constructor (recipe/params/formula boxes), reused
here for the general $a\ne1$ case.

**Files:**
- Modify: `public/Materials/similarities.html`

**Interfaces:**
- Consumes: `SimilarityWidget.create` (Task 3, tab `rotate`),
  `SimilarityMath.paramsToMotion`/`formatRecipe`/`formatExpr` (Task 2).
- Produces: nothing consumed later.

- [ ] **Step 1: Add formula-box CSS**

Append inside `<style>`:

```css
.formula-box{font-family:'JetBrains Mono',monospace;font-size:16px;background:var(--bg2);border:1px solid var(--border);border-radius:6px;padding:.8rem 1.1rem;margin-top:.8rem;color:var(--ink)}
```

- [ ] **Step 2: Add §4 markup and script**

Insert before `<p class="page-footer">`:

```html
<section id="sec-fixedpoint">
  <h2>4. Неподвижная точка подобия</h2>
  <p class="lead">Если поместить центр поворотной гомотетии в комплексный ноль, её формула — умножение на $a=ke^{i\alpha}$. Со сдвигом центра формула становится $f(z)=az+b$. Пока $a\ne1$ (то есть пока преобразование не сводится к чистому переносу), у него есть ровно одна неподвижная точка: из $f(z_0)=z_0$ следует $z_0=b/(1-a)$. Формулу можно переписать компактнее: $f(z)-z_0 = a(z-z_0)$ — преобразование буквально «растягивает-поворачивает» всё вокруг $z_0$ на коэффициент $a$.</p>
  <figure>
    <div class="motion-widget" id="widget-fixedpoint"></div>
    <div class="formula-box" id="fixedpoint-recipe"></div>
    <div class="formula-box" id="fixedpoint-params"></div>
    <div class="formula-box" id="fixedpoint-formula"></div>
    <figcaption>Числа округлены до сотых — подстановка текущих параметров, без упрощения. При $|a|=1$ это в точности формула поворота из <a href="/Materials/chasles.html">«Движений плоскости»</a> — здесь коэффициент $a$ уже не заперт на единичной окружности.</figcaption>
  </figure>
</section>

<script>
(function () {
  var el = document.getElementById('widget-fixedpoint');
  var recipeEl = document.getElementById('fixedpoint-recipe');
  var paramsEl = document.getElementById('fixedpoint-params');
  var formulaEl = document.getElementById('fixedpoint-formula');

  // katex.min.js is <script defer>, so it only runs after this (non-deferred,
  // inline) script has already executed during parsing -- window.katex is
  // not defined yet at this point. Wait for window 'load' (same reason as
  // chasles.html's constructor script).
  function init() {
    if (!el || !recipeEl || !paramsEl || !formulaEl || !window.SimilarityWidget || !window.SimilarityMath || !window.katex) return;

    function update(params) {
      var motion = SimilarityMath.paramsToMotion(params);
      var recipe = SimilarityMath.formatRecipe(params);
      katex.render(recipe.template, recipeEl, { throwOnError: false });
      katex.render(recipe.params, paramsEl, { throwOnError: false });
      katex.render('f(z) = ' + SimilarityMath.formatExpr(motion), formulaEl, { throwOnError: false });
    }

    var widget = SimilarityWidget.create(el, {
      tabs: ['rotate'],
      initial: { type: 'rotate', ox: 20, oy: 30, angle: Math.PI / 4, k: 1.6 },
      axes: true,
      onChange: update
    });
    update(widget.getParams());
  }
  window.addEventListener('load', init);
})();
</script>
```

- [ ] **Step 3: Verify in browser**

Reload. Expected: §4's widget shows the Re/Im axes overlay (via `axes: true`)
with coordinate labels near each handle; below it, three formula boxes:
recipe (`f(z) = ke^{i\alpha}(z-z_0)+z_0`), the live numeric substitution
(`k \approx …, \alpha \approx …°, z_0 \approx …`), and the expanded
`f(z) = (…)z + (…)`. Dragging the center/angle handles or the slider updates
all three boxes immediately, all rendered by KaTeX (no raw LaTeX source
visible).

- [ ] **Step 4: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/similarities.html
git commit -m "Add §4: fixed point of a similarity (z0=b/(1-a) constructor)"
```

---

## Task 6: §5 "Классификация подобий"

Static theorem callout — no interactivity, no new script.

**Files:**
- Modify: `public/Materials/similarities.html`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing consumed later.

- [ ] **Step 1: Add theorem-box CSS**

Append inside `<style>`:

```css
.note.theorem{border-left-color:var(--blue-acc);background:var(--blue-bg);font-size:22px}
.note.theorem .note-head{color:var(--blue-acc)}
```

- [ ] **Step 2: Add §5 markup**

Insert before `<p class="page-footer">`:

```html
<section id="sec-classification">
  <h2>5. Классификация подобий</h2>
  <div class="note theorem">
    <span class="note-head">Теорема (классификация подобий плоскости)</span>
    <p>Любое подобие плоскости — один из четырёх видов:</p>
    <p><strong>перенос</strong> (в частности, тождественное преобразование);</p>
    <p><strong>поворотная гомотетия</strong> (в частности, тождественное преобразование, поворот или гомотетия);</p>
    <p><strong>скользящая симметрия</strong> (в частности, отражение);</p>
    <p><strong>отражённая гомотетия</strong> (в частности, отражение).</p>
  </div>
  <p>Границы между классами пересекаются — и это не случайность, а часть той же картины, что уже встречалась у движений: тождественное преобразование одновременно и «нулевой» перенос, и «нулевая» поворотная гомотетия ($k=1$, $\alpha=0$); обычное отражение одновременно и скользящая симметрия с нулевым сдвигом, и отражённая гомотетия с $k=1$. Других подобий плоскости не бывает.</p>
</section>
```

- [ ] **Step 3: Verify in browser**

Reload. Expected: theorem callout renders in a blue-tinted box (same
`.note.theorem` treatment as `chasles.html`'s Chasles-theorem box) with 4
bold class names and correctly rendered KaTeX inline math in the paragraph
below.

- [ ] **Step 4: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/similarities.html
git commit -m "Add §5: classification-of-similarities theorem statement"
```

---

## Task 7: §6 "Калькулятор композиции подобий"

Generalizes `chasles.html`'s §7 composition calculator to all 4 similarity
classes. No static composition table (dropped by design decision).

**Files:**
- Modify: `public/Materials/similarities.html`

**Interfaces:**
- Consumes: `SimilarityWidget.create`/`renderStatic` (Task 3),
  `SimilarityMath.paramsToMotion`/`compose`/`classify`/`formatExpr` (Task 2).
- Produces: nothing consumed later (final content task).

- [ ] **Step 1: Add calculator layout CSS**

Append inside `<style>`:

```css
.calc-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;align-items:start;margin-top:1rem}
.calc-col h4{margin-top:0}
.calc-result{margin-top:1.5rem;padding-top:1.2rem;border-top:1px solid var(--border)}
.calc-result-class{font-family:'JetBrains Mono',monospace;font-size:14px;letter-spacing:.06em;text-transform:uppercase;color:var(--blue-acc);margin-bottom:.5rem}
@media(max-width:700px){
  .calc-grid{grid-template-columns:1fr}
}
```

- [ ] **Step 2: Add §6 markup and script**

Insert before `<p class="page-footer">`:

```html
<section id="sec-calc">
  <h2>6. Калькулятор композиции подобий</h2>
  <p class="lead">Соберите $g$ (применяется первым) и $f$ (применяется вторым) — ниже сразу появится $f\circ g$: класс результата и его формула, посчитанные из алгебры, а не подобранные на глаз. Таблицы классов здесь сознательно нет — вместо неё исследуйте сами: например, композицию двух отражённых гомотетий с перпендикулярными осями и разными $k$, или поворотную гомотетию с $k$ и с $1/k$ вокруг одного центра.</p>
  <div class="calc-grid">
    <div class="calc-col">
      <h4>$g$ — первым</h4>
      <div class="motion-widget small" id="widget-calc-g"></div>
    </div>
    <div class="calc-col">
      <h4>$f$ — вторым</h4>
      <div class="motion-widget small" id="widget-calc-f"></div>
    </div>
  </div>
  <div class="calc-result">
    <div class="calc-result-class" id="calc-result-class"></div>
    <div class="formula-box" id="calc-result-formula"></div>
    <figure>
      <svg id="calc-result-svg" class="motion-frame" role="img" aria-label="Флажок, преобразованный композицией f после g" style="max-width:340px"></svg>
      <figcaption>Тот же флажок, преобразованный сразу композицией — не в два шага.</figcaption>
    </figure>
  </div>
</section>

<script>
(function () {
  var gEl = document.getElementById('widget-calc-g');
  var fEl = document.getElementById('widget-calc-f');
  var resultSvg = document.getElementById('calc-result-svg');
  var resultFormula = document.getElementById('calc-result-formula');
  var resultClass = document.getElementById('calc-result-class');

  // Same defer/load-order reason as Task 5's constructor.
  function init() {
    if (!gEl || !fEl || !window.SimilarityWidget || !window.SimilarityMath || !window.katex) return;

    var CLASS_LABELS = {
      translate: 'Перенос', rotate: 'Поворотная гомотетия',
      reflect: 'Отражённая гомотетия', glide: 'Скользящая симметрия'
    };

    function update() {
      if (!gWidget || !fWidget) return; // both widgets fire onChange once during their own construction
      var gMotion = SimilarityMath.paramsToMotion(gWidget.getParams());
      var fMotion = SimilarityMath.paramsToMotion(fWidget.getParams());
      var composed = SimilarityMath.compose(fMotion, gMotion);
      var classified = SimilarityMath.classify(composed);

      resultClass.textContent = CLASS_LABELS[classified.type];
      katex.render('(f\\circ g)(z) = ' + SimilarityMath.formatExpr(composed), resultFormula, { throwOnError: false });
      SimilarityWidget.renderStatic(resultSvg, classified, { axes: true });
    }

    var gWidget = SimilarityWidget.create(gEl, {
      tabs: ['translate', 'rotate', 'reflect', 'glide'],
      initial: { type: 'reflect', px: 0, py: 0, theta: 0, k: 1.4 },
      axes: true,
      onChange: update
    });
    var fWidget = SimilarityWidget.create(fEl, {
      tabs: ['translate', 'rotate', 'reflect', 'glide'],
      initial: { type: 'reflect', px: 0, py: 0, theta: Math.PI / 2, k: 1 },
      axes: true,
      onChange: update
    });

    update();
  }
  window.addEventListener('load', init);
})();
</script>
```

- [ ] **Step 3: Verify in browser, including the hand-computed sanity check**

Reload. Expected on load: $g$ = reflected homothety across the horizontal axis
through the origin with $k=1.4$; $f$ = reflected homothety across the
vertical axis through the origin with $k=1$ (a plain reflection) — the result
panel should show class **Поворотная гомотетия**, matching Task 2's
"perpendicular reflected homotheties" test: a half-turn ($180°$) scaled by
$1.4\times1=1.4$ (visually: the result flag is the ghost flag rotated $180°$
around the origin and enlarged).

Also confirm: dragging any handle or slider in either $g$ or $f$ updates the
result panel live (formula, class label, transformed flag), and switching
either widget's tab to **Перенос** or **Скользящая симметрия** still updates
correctly (these tabs have no `k` slider — confirm it stays hidden for them).
No console errors.

- [ ] **Step 4: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/similarities.html
git commit -m "$(cat <<'EOF'
Add §6: composition calculator for plane similarities

Two draggable similarity pickers (g applied first, f second) feed
SimilarityMath.compose, with the classified result (class, formula,
transformed figure) recomputed live. No static composition table by
design (see the spec's "Важный нюанс" section) -- spot-checked against
the perpendicular-reflected-homotheties case already covered by
Task 2's automated test.
EOF
)"
```

---

## Task 8: Table of contents

Added now that all six on-page sections exist (matches `chasles.html`'s own
history — its TOC was added once the page was otherwise complete, not from
the start).

**Files:**
- Modify: `public/Materials/similarities.html`

**Interfaces:**
- Consumes: the six section `id`s from Tasks 1, 3, 4, 5, 6, 7.
- Produces: nothing consumed later.

- [ ] **Step 1: Insert the TOC**

Insert immediately after `</header>` and before `<section id="sec-intro">`:

```html
<nav class="toc" style="background: var(--bg2); border: 1px solid var(--border); border-radius: 6px; padding: 1.2rem 1.5rem; margin-bottom: 2.5rem;">
  <h3 style="margin-top: 0; margin-bottom: 0.8rem; font-size: 19px;">Содержание</h3>
  <ol style="margin: 0 0 0 1.5rem; padding: 0; color: var(--ink2); line-height: 1.6;">
    <li><a href="#sec-intro" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">От движений к подобиям</a></li>
    <li><a href="#sec-homothety" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">Гомотетия</a></li>
    <li><a href="#sec-rothomothety" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">Поворотная гомотетия</a></li>
    <li><a href="#sec-fixedpoint" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">Неподвижная точка подобия</a></li>
    <li><a href="#sec-classification" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">Классификация подобий</a></li>
    <li><a href="#sec-calc" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">Калькулятор композиции подобий</a></li>
  </ol>
</nav>
```

- [ ] **Step 2: Verify in browser**

Reload. Expected: TOC box appears between the header and §1, listing all 6
sections; clicking each link smooth-scrolls to the matching `<h2>` (the
`scroll-behavior: smooth` on `<html>` is already set from Task 1).

- [ ] **Step 3: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/similarities.html
git commit -m "Add table of contents to similarities.html for navigation"
```

---

## Task 9: Forward-link from `chasles.html`

Closes the loop `chasles.html`'s own §7 explicitly left open
(`|a|=1` restriction).

**Files:**
- Modify: `public/Materials/chasles.html`

**Interfaces:**
- Consumes: `public/Materials/similarities.html` existing (Tasks 1–8).
- Produces: nothing (site-content edit only).

- [ ] **Step 1: Add the forward-link paragraph**

In `public/Materials/chasles.html`, find this existing line (currently line
632):

```html
  <p>$f(z) = a\bar z + b$, $|a|=1$ — <strong>несобственные движения</strong> (отражение, скользящая симметрия).</p>
```

Insert immediately after it:

```html
  <p>Что если снять ограничение $|a|=1$? Тогда коэффициент $a$ перестаёт быть чистым поворотом/сопряжением — появляется растяжение, и мы попадаем в мир <strong>подобий</strong>. Разбор — в отдельном материале «<a href="/Materials/similarities.html">Подобия плоскости: гомотетия и поворотная гомотетия</a>».</p>
```

- [ ] **Step 2: Verify in browser**

Run `npm run dev`, open `/Materials/chasles.html`, scroll to §7 ("Движения как
функции $f(z)$"). Expected: the new paragraph renders right after the
"несобственные движения" line, with a working link to
`/Materials/similarities.html`; KaTeX renders `$|a|=1$` correctly.

- [ ] **Step 3: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/chasles.html
git commit -m "$(cat <<'EOF'
Link forward to similarities.html from the |a|=1 restriction note

chasles.html's §7 explicitly left "what does multiplying by |a|!=1
do?" as an open question -- similarities.html now answers it.
EOF
)"
```

---

## Task 10: Site integration (taxonomy, manifest, news, sitemap) + final verification

**Files:**
- Modify: `public/Materials/_taxonomy.json`
- Modify: `data/materials.generated.ts` (regenerated by script, not hand-edited)
- Modify: `public/news.html`
- Modify: `public/news_en.html`
- Modify: `public/sitemap.xml`

**Interfaces:**
- Consumes: `public/Materials/similarities.html`'s `<title>` (Task 1), read by
  `scripts/generate-materials-manifest.mjs`.
- Produces: nothing (final task).

- [ ] **Step 1: Register the file in the taxonomy**

In `public/Materials/_taxonomy.json`, add to `fileCategory` (next to the
existing `"chasles.html": "geometry",` entry — **not** `"algebra"`:
`chasles.html` was moved to the `geometry` category in commit `6671f9a`
because its kicker is "Геометрия · Группы" and it's fundamentally about
classification, not algebra that happens to use group language;
`similarities.html` carries the identical kicker and the identical
reasoning):

```json
    "similarities.html": "geometry",
```

and to `fileLanguage` (next to `"chasles.html": "ru",`):

```json
    "similarities.html": "ru",
```

- [ ] **Step 2: Regenerate the manifest**

Run: `cd ~/MATH/homepage && node scripts/generate-materials-manifest.mjs`
Expected output: `[materials] Wrote N item(s) → data/materials.generated.ts`
where N includes the new file.

Verify: `grep -A4 '"similarities.html"' data/materials.generated.ts` shows
`"filename": "similarities.html"`, `"href": "/Materials/similarities.html"`,
`"title": "Подобия плоскости: гомотетия и поворотная гомотетия"`,
`"category": "geometry"`, `"lang": "ru"`.

- [ ] **Step 3: Add the news.html entry**

In `public/news.html`, insert as the **first** `<li>` right after
`<ul class="feed">` (before the existing `31.07` `chasles.html` entry):

```html
  <li>
    <span class="date">31.07</span>
    <div class="entry"><p>Добавлен материал «<a href="/Materials/similarities.html">Подобия плоскости: гомотетия и поворотная гомотетия</a>» — продолжение «Движений плоскости»: гомотетия, поворотная гомотетия, общая формула неподвижной точки и классификация подобий.</p></div>
  </li>
```

- [ ] **Step 4: Add the news_en.html entry**

In `public/news_en.html`, insert as the first `<li>` right after
`<ul class="feed">` (matching the `diophant_28_37.html` RU-only precedent —
`<span class="lang">RU</span>` sits inside the `<a>`, right after the title):

```html
  <li>
    <span class="date">Jul 31</span>
    <div class="entry"><p>Added "<a href="/Materials/similarities.html">Подобия плоскости: гомотетия и поворотная гомотетия<span class="lang">RU</span></a>" — a continuation of "Motions of the Plane": homothety, rotational homothety, the general fixed-point formula, and the classification of plane similarities.</p></div>
  </li>
```

- [ ] **Step 5: Add the sitemap.xml entry**

In `public/sitemap.xml`, insert a new `<url>` block next to the existing
`chasles.html` entry:

```xml
   <url>
      <loc>https://mathem.at/Materials/similarities.html</loc>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
   </url>
```

- [ ] **Step 6: Full-page final verification**

Run: `cd ~/MATH/homepage && npm run dev`, open `/Materials/similarities.html`
fresh (hard refresh), and re-check the whole page top to bottom in one pass:
- TOC + all 6 sections present and numbered 1–6, KaTeX renders everywhere (no
  visible `$...$` or raw LaTeX).
- Every drag interaction and every `k` slider from Tasks 3–7 still works
  after all the later insertions (nothing broke the shared
  `pointermove`/`pointerup` listeners or the per-widget slider wiring).
- No JS console errors on load or during interaction.
- At `/#materials` on the homepage, confirm the new card for «Подобия
  плоскости: гомотетия и поворотная гомотетия» appears under the Геометрия и
  топология category, linking to `/Materials/similarities.html`, next to the
  «Движения плоскости» card.
- Open `/Materials/chasles.html`, confirm the Task 9 forward-link paragraph
  and link both render correctly.
- Open `/news.html` and `/news_en.html`, confirm the new entries render above
  the existing `chasles.html` entries and the links work.

- [ ] **Step 7: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/_taxonomy.json data/materials.generated.ts \
        public/news.html public/news_en.html public/sitemap.xml
git commit -m "$(cat <<'EOF'
Register similarities.html in the site: taxonomy, manifest, news, sitemap

Category "geometry" (matches chasles.html post-6671f9a), RU-only.
News entries in both feeds (news_en.html tags it RU-only, matching
the diophant_28_37.html precedent).
EOF
)"
```

---

## Self-Review Notes

- **Spec coverage:** all 6 design-doc sections map to tasks (see the section↔
  task table above); the design doc's exclusions (1D similarities, the
  `ShiftHomcomp` table, the full exercise list, the static composition table,
  the EN version) are simply never built — nothing in this plan references
  them.
- **Placeholder scan:** no TBD/TODO; every code step contains complete,
  cross-checked source, including the corrected slider range (`-2..4`, fixed
  in the design doc after the arithmetic error was caught: `-2..2` has
  midpoint `0`, not `1`).
- **Type/shape consistency:** the 5 params shapes (`translate`/`homothety`/
  `rotate`/`reflect`/`glide`) are used identically by `SimilarityMath` (Task 2),
  `SimilarityWidget` (Task 3), and all consumers (Tasks 4, 5, 7) — re-checked
  by re-reading each task's Interfaces block against the others while writing
  this plan. `classify()`'s never-returns-`'homothety'` contract is stated
  once in Global Constraints and holds consistently everywhere it's consumed
  (Task 2's own test for the concentric-homothety exercise checks for
  `type: 'rotate'`, not `'homothety'`).
- **Math independently verified before being written into the plan:** the
  reflected-homothety fixed-point formula
  $z_0=(b+a\bar b)/(1-|a|^2)$, the `reflectScalePoint` double-angle form, and
  the perpendicular-reflected-homotheties composition result were each
  hand-derived and checked against worked numeric examples (not just copied
  from the source book, which does not give the plane's composition table at
  all) before being encoded in Task 2's tests and Task 3's widget code.
