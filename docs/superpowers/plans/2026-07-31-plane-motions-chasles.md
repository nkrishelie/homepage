# Движения плоскости: теорема Шаля — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `public/Materials/chasles.html` — a single self-contained, interactive
RU-only page explaining the classification of plane motions and Chasles' theorem
(ch. 11 of the Savvateev source, plus the complex-number treatment from ch. 12),
in the exact visual/interaction language already established by `duality.html`.

**Architecture:** One static HTML file, no build step, no framework. Inline
`<style>` (copied/extended from `duality.html`), inline `<script>` blocks per
widget (same convention `duality.html` already uses — each interactive piece is
its own self-contained IIFE). Two small reusable pieces get built once and reused
by later sections: a pure-math module (`window.MotionMath`, complex-number
algebra) and a visual widget factory (`window.MotionWidget`, the draggable
"motion sandbox"). Everything else is direct markup.

**Tech Stack:** Vanilla JS (ES5-style, matching `duality.html`'s existing code —
`var`, no modules, no arrow functions in shipped code), SVG for graphics, KaTeX
0.16.9 via CDN for math typesetting, plain CSS custom properties. Node.js (v18,
already installed) is used only as a throwaway test runner during Task 2 — no
test framework, no dependency ever gets added to the repo.

## Global Constraints

- Single file: `public/Materials/chasles.html`. No `.js`/`.css` files created —
  everything inline, matching every other file in `public/Materials/`.
- RU only. No `chasles_en.html` in this plan. No language pills in the topbar
  (only `.crumbs`).
- Visual system copied verbatim from `public/Materials/duality.html`: CSS custom
  properties, EB Garamond + JetBrains Mono fonts, KaTeX 0.16.9 CDN + auto-render,
  the `pointerdown`/`pointermove`/`pointerup` drag pattern with a **fixed SVG
  viewBox** (never recompute the viewBox in response to a drag — clamp dragged
  points into the frame instead).
  - `duality.html:20-76` — CSS variables and base typography (copy source for Task 1).
  - `duality.html:702-709` — `localPointFromClient` pattern (copy source for Tasks 3/4).
  - `duality.html:224-236` — topbar/header markup pattern (adapt for Task 1).
- Content source of truth: `~/MATH/Savvateev/250/LevelAlpha.tex`, chapter 11
  (lines 2205–2701) and chapter 12 (lines 6397–6444). Do not invent facts not in
  the design doc.
- Design doc: `docs/superpowers/specs/2026-07-31-plane-motions-chasles-design.md`
  — read it before starting if anything below is unclear about *why*.
- No npm dependency changes. `package.json` is not touched by this plan.
- Every task that changes `chasles.html` ends with a manual browser check — this
  repo has no visual test framework, and none should be added (YAGNI — matches
  existing `Materials/*.html` convention of zero automated tests).
- Node.js `node:assert/strict` is available (v18.19.1 confirmed) — used only in
  Task 2's throwaway scratchpad test script, never committed to the repo.
- On-page section numbers (the `<h2>N. …</h2>` numbers a reader sees) run 1–7 and
  are **independent of this plan's Task numbers** — see the mapping table below.

**On-page section ↔ Task mapping:**

| On-page `<h2>` | Title | Built in |
|---|---|---|
| 1 | Что сохраняет движение | Task 1 |
| 2 | Три вида движений | Task 3 |
| 3 | Теорема о трёх гвоздях | Task 4 |
| 4 | Скользящая симметрия | Task 5 |
| 5 | Теорема Шаля | Task 6 |
| 6 | Таблица композиций | Task 7 |
| 7 | Движения как функции f(z) | Tasks 8, 9 |

---

## Task 1: Page shell (head, base CSS, topbar, header, §1 intro text)

**Files:**
- Create: `public/Materials/chasles.html`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: the file itself, with `</body></html>` at the end and an **insertion
  point** every later task uses: insert new `<section>…</section>` markup and any
  new `<script>` block **immediately before** the line
  `<p class="page-footer">© Nikolai Kazimirov · <a href="https://mathem.at" rel="noopener">mathem.at</a></p>`.
  New `<style>` rules get appended inside the existing `<style>...</style>` block,
  just before `</style>`.

- [ ] **Step 1: Write the file**

```html
<!DOCTYPE html>
<html lang="ru" style="scroll-behavior: smooth;">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Движения плоскости: теорема Шаля</title>
<meta name="description" content="Перенос, поворот, отражение и скользящая симметрия — три вида движений плоскости. Теорема о трёх гвоздях, теорема Шаля и калькулятор композиции на комплексных числах, с перетаскиваемыми фигурами.">
<link rel="canonical" href="https://mathem.at/Materials/chasles.html">
<meta property="og:type" content="article">
<meta property="og:title" content="Движения плоскости: теорема Шаля">
<meta property="og:description" content="Три вида движений плоскости, теорема о трёх гвоздях и теорема Шаля — интерактивный разбор с перетаскиваемыми фигурами и калькулятором композиции на комплексных числах.">
<meta property="og:url" content="https://mathem.at/Materials/chasles.html">
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
  <h1>Движения плоскости</h1>
  <p class="desc">Перенос, поворот, отражение и скользящая симметрия — все движения плоскости укладываются в три класса. Теорема о трёх гвоздях объясняет, почему это так, а теорема Шаля даёт полную классификацию. Ниже — интерактивные модели вместо длинных доказательств.</p>
</header>

<section id="sec-what">
  <h2>1. Что сохраняет движение</h2>
  <p class="lead"><strong>Движение</strong> плоскости — это преобразование, которое сохраняет расстояния: если между точками $A$ и $B$ было расстояние $x$, то после движения расстояние между их образами $A'$ и $B'$ снова равно $x$ — и так для любой пары точек.</p>
  <p>Простейший пример — параллельный перенос: все точки сдвигаются на один и тот же вектор, поэтому расстояния между ними не меняются. Дальше выяснится, что «простейших» видов движения плоскости на самом деле немного — и они полностью исчерпывают список.</p>
</section>

<p class="page-footer">© Nikolai Kazimirov · <a href="https://mathem.at" rel="noopener">mathem.at</a></p>

</div><!-- .page -->
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Run: `cd ~/MATH/homepage && npm run dev` (Vite serves `public/` as-is), then open
`http://localhost:5173/Materials/chasles.html`.

Expected: page loads with no console errors; title bar shows "Движения
плоскости: теорема Шаля"; heading/body use EB Garamond, crumbs/kicker use
JetBrains Mono; the two `$A$`/`$B$` inline formulas in §1 render as italic math
(not literal dollar signs) — confirms the KaTeX CDN + auto-render wiring works;
resizing below 700px shrinks body font and page padding per the media query.

- [ ] **Step 3: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/chasles.html
git commit -m "$(cat <<'EOF'
Add page shell for the plane-motions Chasles material

Head, base CSS (copied from duality.html), topbar, header and the §1
intro section. No interactivity yet — later tasks append sections
before the page footer.
EOF
)"
```

---

## Task 2: Complex-arithmetic & motion-algebra module (`MotionMath`)

This is the riskiest part of the page mathematically — it is the engine behind
§7's constructor and composition calculator. Build it test-first in the
scratchpad (never committed), then embed the verified code directly in
`chasles.html`.

**Files:**
- Modify: `public/Materials/chasles.html` (append a `<script id="motion-math">`
  block, and a small paragraph note is **not** needed — this task has no visible
  section, it only adds a script tag before `page-footer`).
- Test (scratchpad, not committed): `motion-math.test.mjs` in the scratchpad
  directory.

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `window.MotionMath` with this exact surface, consumed by Tasks 8 and 9:
  - `add(u,v)`, `sub(u,v)`, `mul(u,v)`, `scale(u,k)`, `conj(u)`, `abs(u)`, `arg(u)`,
    `fromPolar(r,theta)`, `div(u,v)` — all take/return `{re,im}`.
  - `paramsToMotion(params) -> {kind, a:{re,im}, b:{re,im}}` where `params` is one
    of `{type:'translate',vx,vy}`, `{type:'rotate',ox,oy,angle}`,
    `{type:'reflect',px,py,theta}`, `{type:'glide',px,py,theta,t}` — **this exact
    shape is also what `MotionWidget` (Task 3) produces from `getParams()`/
    `onChange`**, so the two modules plug together without adapters.
  - `apply(motion, z) -> {re,im}` — computes `f(z)`.
  - `compose(f, g) -> motion` — the algebra for `f∘g` (`g` applied first).
  - `classify(motion, eps) -> params` — inverse of `paramsToMotion` (same 4 shapes).
  - `formatComplex(u) -> string` — e.g. `"1.20 - 3.46i"`.
  - `formatExpr(motion) -> string` — LaTeX RHS, e.g.
    `"(0.87 + 0.50i)z + (1.30 - 0.70i)"` or with `\bar z` for `kind:2`.

- [ ] **Step 1: Write the failing test in the scratchpad**

Create `/tmp/claude-1000/-home-nkrishelie-MATH-homepage/f3a08126-cdb7-4edd-ae7f-2607bae39f75/scratchpad/motion-math.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync('public/Materials/chasles.html', 'utf8');
const match = html.match(/<script id="motion-math">([\s\S]*?)<\/script>/);
if (!match) throw new Error('Could not find <script id="motion-math"> in chasles.html');

const sandbox = {};
new Function('window', match[1])(sandbox);
const MotionMath = sandbox.MotionMath;
if (!MotionMath) throw new Error('window.MotionMath was not defined by the script');

function approxEqual(u, v, eps = 1e-6) {
  return Math.abs(u.re - v.re) < eps && Math.abs(u.im - v.im) < eps;
}

let failed = false;
function t(name, fn) {
  try { fn(); console.log('PASS', name); }
  catch (e) { failed = true; console.error('FAIL', name, '-', e.message); }
}

t('add', () => assert.ok(approxEqual(MotionMath.add({re:1,im:2},{re:3,im:-1}), {re:4,im:1})));
t('mul: i*i = -1', () => assert.ok(approxEqual(MotionMath.mul({re:0,im:1},{re:0,im:1}), {re:-1,im:0})));
t('conj', () => assert.ok(approxEqual(MotionMath.conj({re:2,im:-5}), {re:2,im:5})));
t('abs/arg/fromPolar round-trip', () => {
  const u = {re:3,im:4};
  assert.ok(Math.abs(MotionMath.abs(u) - 5) < 1e-9);
  assert.ok(approxEqual(MotionMath.fromPolar(MotionMath.abs(u), MotionMath.arg(u)), u));
});

t('translate: paramsToMotion + apply', () => {
  const m = MotionMath.paramsToMotion({type:'translate', vx:3, vy:-2});
  assert.ok(approxEqual(m.a, {re:1,im:0}));
  assert.ok(approxEqual(m.b, {re:3,im:-2}));
  assert.ok(approxEqual(MotionMath.apply(m, {re:1,im:1}), {re:4,im:-1}));
});

t('rotate 90deg around origin sends (1,0) to (0,1)', () => {
  const m = MotionMath.paramsToMotion({type:'rotate', ox:0, oy:0, angle: Math.PI/2});
  assert.ok(approxEqual(MotionMath.apply(m, {re:1,im:0}), {re:0,im:1}));
});

t('reflect across the real axis sends (3,4) to (3,-4)', () => {
  const m = MotionMath.paramsToMotion({type:'reflect', px:0, py:0, theta:0});
  assert.ok(approxEqual(MotionMath.apply(m, {re:3,im:4}), {re:3,im:-4}));
});

t('reflect across horizontal line y=3 sends (2,10) to (2,-4)', () => {
  const m = MotionMath.paramsToMotion({type:'reflect', px:0, py:3, theta:0});
  assert.ok(approxEqual(MotionMath.apply(m, {re:2,im:10}), {re:2,im:-4}));
});

// Book exercise (LevelAlpha.tex line 2686): composition of two axis reflections.
t('perpendicular axes compose to a half-turn (exercise)', () => {
  const g = MotionMath.paramsToMotion({type:'reflect', px:0, py:0, theta:0});
  const f = MotionMath.paramsToMotion({type:'reflect', px:0, py:0, theta:Math.PI/2});
  const c = MotionMath.classify(MotionMath.compose(f, g));
  assert.equal(c.type, 'rotate');
  assert.ok(Math.abs(c.ox) < 1e-6 && Math.abs(c.oy) < 1e-6);
  assert.ok(Math.abs(Math.abs(c.angle) - Math.PI) < 1e-6);
});

t('parallel axes 5 apart compose to a translation of length 10 (exercise)', () => {
  const g = MotionMath.paramsToMotion({type:'reflect', px:0, py:0, theta:0});
  const f = MotionMath.paramsToMotion({type:'reflect', px:0, py:5, theta:0});
  const c = MotionMath.classify(MotionMath.compose(f, g));
  assert.equal(c.type, 'translate');
  assert.ok(Math.abs(c.vx) < 1e-6);
  assert.ok(Math.abs(c.vy - 10) < 1e-6);
});

t('axes at pi/3 compose to a rotation by 2*pi/3 (exercise)', () => {
  const g = MotionMath.paramsToMotion({type:'reflect', px:0, py:0, theta:0});
  const f = MotionMath.paramsToMotion({type:'reflect', px:0, py:0, theta:Math.PI/3});
  const c = MotionMath.classify(MotionMath.compose(f, g));
  assert.equal(c.type, 'rotate');
  assert.ok(Math.abs(c.angle - 2*Math.PI/3) < 1e-6);
});

t('rotation composed with rotation can yield a translation (diagonal table cell)', () => {
  const g = MotionMath.paramsToMotion({type:'rotate', ox:0, oy:0, angle: Math.PI/2});
  const f = MotionMath.paramsToMotion({type:'rotate', ox:10, oy:0, angle: -Math.PI/2});
  const c = MotionMath.classify(MotionMath.compose(f, g));
  assert.equal(c.type, 'translate');
  assert.ok(Math.abs(c.vx - 10) < 1e-6 && Math.abs(c.vy - 10) < 1e-6);
});

t('rotation composed with rotation around the same center adds the angles', () => {
  const g = MotionMath.paramsToMotion({type:'rotate', ox:0, oy:0, angle: Math.PI/3});
  const f = MotionMath.paramsToMotion({type:'rotate', ox:0, oy:0, angle: Math.PI/3});
  const c = MotionMath.classify(MotionMath.compose(f, g));
  assert.equal(c.type, 'rotate');
  assert.ok(Math.abs(c.angle - 2*Math.PI/3) < 1e-6);
});

t('formatComplex renders the sign correctly', () => {
  assert.equal(MotionMath.formatComplex({re:1.2, im:-3.456}), '1.20 - 3.46i');
  assert.equal(MotionMath.formatComplex({re:-0.5, im:2}), '-0.50 + 2.00i');
});

if (failed) { console.error('\nSome tests FAILED'); process.exit(1); }
console.log('\nAll tests passed');
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `cd ~/MATH/homepage && node /tmp/claude-1000/-home-nkrishelie-MATH-homepage/f3a08126-cdb7-4edd-ae7f-2607bae39f75/scratchpad/motion-math.test.mjs`
Expected: throws `Could not find <script id="motion-math"> in chasles.html` (the
block doesn't exist yet).

- [ ] **Step 3: Add the `MotionMath` module to `chasles.html`**

Insert this `<script>` block immediately before the `<p class="page-footer">`
line:

```html
<script id="motion-math">
window.MotionMath = (function () {
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
  function rotationToMotion(ox, oy, angle) {
    var a = fromPolar(1, angle);
    var o = { re: ox, im: oy };
    return { kind: 1, a: a, b: mul(o, sub({ re: 1, im: 0 }, a)) };
  }
  function reflectionToMotion(px, py, theta) {
    var a = fromPolar(1, 2 * theta);
    var p = { re: px, im: py };
    return { kind: 2, a: a, b: sub(p, mul(a, conj(p))) };
  }
  function glideToMotion(px, py, theta, t) {
    var refl = reflectionToMotion(px, py, theta);
    return { kind: 2, a: refl.a, b: add(refl.b, fromPolar(t, theta)) };
  }

  function paramsToMotion(p) {
    if (p.type === 'translate') return translationToMotion(p.vx, p.vy);
    if (p.type === 'rotate') return rotationToMotion(p.ox, p.oy, p.angle);
    if (p.type === 'reflect') return reflectionToMotion(p.px, p.py, p.theta);
    return glideToMotion(p.px, p.py, p.theta, p.t);
  }

  function apply(m, z) {
    var zz = m.kind === 2 ? conj(z) : z;
    return add(mul(m.a, zz), m.b);
  }

  // f∘g — g is applied first. Composing two isometries f(z)=a_f z+b_f or
  // a_f zbar+b_f with g likewise: conjugate g's coefficients iff f is kind 2.
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
    if (m.kind === 1) {
      if (abs(sub(m.a, { re: 1, im: 0 })) < eps) {
        return { type: 'translate', vx: m.b.re, vy: m.b.im };
      }
      var center = div(m.b, sub({ re: 1, im: 0 }, m.a));
      return { type: 'rotate', ox: center.re, oy: center.im, angle: arg(m.a) };
    }
    var psi = arg(m.a);
    var r = fromPolar(1, psi / 2);
    var beta = mul(m.b, conj(r));
    var axisPoint = mul(r, { re: 0, im: beta.im / 2 });
    if (Math.abs(beta.re) < eps) {
      return { type: 'reflect', px: axisPoint.re, py: axisPoint.im, theta: psi / 2 };
    }
    return { type: 'glide', px: axisPoint.re, py: axisPoint.im, theta: psi / 2, t: beta.re };
  }

  function formatComplex(u) {
    var re = u.re.toFixed(2);
    var imAbs = Math.abs(u.im).toFixed(2);
    var sign = u.im < 0 ? '-' : '+';
    return re + ' ' + sign + ' ' + imAbs + 'i';
  }

  function formatExpr(m) {
    var zPart = m.kind === 2 ? '\\bar z' : 'z';
    return '(' + formatComplex(m.a) + ')' + zPart + ' + (' + formatComplex(m.b) + ')';
  }

  return {
    add: add, sub: sub, mul: mul, scale: scale, conj: conj, abs: abs, arg: arg,
    fromPolar: fromPolar, div: div,
    paramsToMotion: paramsToMotion, apply: apply, compose: compose, classify: classify,
    formatComplex: formatComplex, formatExpr: formatExpr
  };
})();
</script>
```

- [ ] **Step 4: Run the test again to confirm it passes**

Run: `cd ~/MATH/homepage && node /tmp/claude-1000/-home-nkrishelie-MATH-homepage/f3a08126-cdb7-4edd-ae7f-2607bae39f75/scratchpad/motion-math.test.mjs`
Expected: `PASS` for all 13 cases, ending `All tests passed`, exit code 0.

- [ ] **Step 5: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/chasles.html
git commit -m "$(cat <<'EOF'
Add MotionMath: complex-number algebra for plane motions

f(z)=az+b (orientation-preserving) / a*conj(z)+b (reversing), with
conversion to/from geometric params, composition, and classification.
Verified against the book's own exercises (perpendicular/parallel/
pi-3 reflection compositions) via a scratchpad test harness.
EOF
)"
```

---

## Task 3: Motion widget factory (`MotionWidget`) + §2 "Три вида движений"

The biggest single piece of new code: a reusable draggable SVG widget for
translate/rotate/reflect/glide, used here with 3 tabs, and reused (all 4 tabs)
by Tasks 5, 8 and 9. Glide support is implemented now for code cohesion even
though the glide tab isn't exposed in the UI until Task 5 — that's intentional,
not scope creep to review away.

**Files:**
- Modify: `public/Materials/chasles.html`

**Interfaces:**
- Consumes: nothing (geometry-only; does not know about `MotionMath` or complex
  numbers at all — clean separation).
- Produces, on `window.MotionWidget`:
  - `create(container, opts) -> { getParams(), setParams(params), el }` where
    `container` is a DOM element and `opts = { tabs: [...subset of 'translate'|
    'rotate'|'reflect'|'glide'], initial: params, onChange: function(params){} }`.
    `getParams()`/`setParams()`/`onChange` all use the **same 4 params shapes**
    as `MotionMath.paramsToMotion`/`classify` (Task 2): `{type:'translate',vx,vy}`,
    `{type:'rotate',ox,oy,angle}`, `{type:'reflect',px,py,theta}`,
    `{type:'glide',px,py,theta,t}`.
  - `renderStatic(svgEl, params) -> void` — draws the ghost+solid flag for given
    params into an existing `<svg>` with no drag handles (used by Task 9's
    read-only result panel).

- [ ] **Step 1: Add widget CSS**

Append inside `<style>`, before `</style>`:

```css
.motion-frame{width:100%;height:auto;aspect-ratio:300/220;display:block;background:var(--bg2);border:1px solid var(--border);border-radius:6px;touch-action:none}
.motion-widget{margin:1rem 0}
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
figure{margin:1.4rem 0}
figcaption{font-size:16.5px;color:var(--ink3);margin-top:.6rem;line-height:1.55;font-style:italic}
.svg-label{font-family:'JetBrains Mono',monospace;font-size:13px;fill:var(--ink2)}
```

- [ ] **Step 2: Add §2 markup and the `<script id="motion-widget">` module**

Insert before `<p class="page-footer">`:

```html
<section id="sec-three-kinds">
  <h2>2. Три вида движений</h2>
  <p class="lead">Переключайте вкладки и тащите ручки — флажок сразу показывает, что делает каждое движение. Бледный контур — исходное положение, синий флажок — образ.</p>
  <figure>
    <div class="motion-widget" id="widget-three-kinds"></div>
    <figcaption>Перенос задаётся вектором, поворот — центром и углом, отражение — осью (тащите за любой из двух её концов).</figcaption>
  </figure>
</section>

<script id="motion-widget">
window.MotionWidget = (function () {
  var FRAME_HALF_W = 150, FRAME_HALF_H = 110;
  var CAP_X = 140, CAP_Y = 100;
  var FRAME_VB = (-FRAME_HALF_W) + ' ' + (-FRAME_HALF_H) + ' ' + (2 * FRAME_HALF_W) + ' ' + (2 * FRAME_HALF_H);
  var ORIGIN = [-70, 35];
  var LOCAL_FLAG = [[-2, -28], [-2, 28], [2, 28], [2, -12], [20, -20], [2, -28]];
  var TAB_LABELS = { translate: 'Перенос', rotate: 'Поворот', reflect: 'Отражение', glide: 'Скользящая симметрия' };

  function clamp(p) {
    return [Math.max(-CAP_X, Math.min(CAP_X, p[0])), Math.max(-CAP_Y, Math.min(CAP_Y, p[1]))];
  }
  function rotatePoint(p, c, ang) {
    var dx = p[0] - c[0], dy = p[1] - c[1];
    var cos = Math.cos(ang), sin = Math.sin(ang);
    return [c[0] + dx * cos - dy * sin, c[1] + dx * sin + dy * cos];
  }
  function reflectPoint(p, A, B) {
    var dx = B[0] - A[0], dy = B[1] - A[1];
    var len2 = dx * dx + dy * dy || 1;
    var tt = ((p[0] - A[0]) * dx + (p[1] - A[1]) * dy) / len2;
    var projX = A[0] + tt * dx, projY = A[1] + tt * dy;
    return [2 * projX - p[0], 2 * projY - p[1]];
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

  function imagePointsForParams(p) {
    var base = flagPoints(ORIGIN, 0);
    if (p.type === 'translate') {
      return base.map(function (pt) { return [pt[0] + p.vx, pt[1] + p.vy]; });
    }
    if (p.type === 'rotate') {
      return base.map(function (pt) { return rotatePoint(pt, [p.ox, p.oy], p.angle); });
    }
    var axis = axisFromPointTheta(p.px, p.py, p.theta, 200);
    if (p.type === 'reflect') {
      return base.map(function (pt) { return reflectPoint(pt, axis[0], axis[1]); });
    }
    var ux = Math.cos(p.theta), uy = Math.sin(p.theta);
    return base.map(function (pt) {
      var r = reflectPoint(pt, axis[0], axis[1]);
      return [r[0] + ux * p.t, r[1] + uy * p.t];
    });
  }

  // Callers are expected to put class="motion-frame" on svgEl themselves
  // (both call sites in this plan do); this only sets the coordinate frame and content.
  function renderStatic(svgEl, params) {
    svgEl.setAttribute('viewBox', FRAME_VB);
    svgEl.innerHTML =
      '<polygon points="' + fmtPts(flagPoints(ORIGIN, 0)) + '" class="mw-flag-ghost"/>' +
      '<polygon points="' + fmtPts(imagePointsForParams(params)) + '" class="mw-flag-solid"/>';
  }

  function createMotionWidget(container, opts) {
    var tabs = opts.tabs.slice();
    var onChange = opts.onChange || function () {};
    var state = {
      translate: { vx: 70, vy: -40 },
      rotate: { ox: 20, oy: 30, angle: Math.PI / 3 },
      reflect: { ax: -30, ay: 70, bx: 60, by: -60 },
      glide: { ax: -30, ay: 70, bx: 60, by: -60, t: 50 }
    };
    var current = tabs[0];

    container.innerHTML =
      '<div class="mw-tabs">' + tabs.map(function (tkey) {
        return '<button type="button" class="mw-tab" data-tab="' + tkey + '">' + TAB_LABELS[tkey] + '</button>';
      }).join('') + '</div>' +
      '<svg class="mw-svg motion-frame" viewBox="' + FRAME_VB + '"></svg>';

    var svg = container.querySelector('.mw-svg');
    var tabButtons = container.querySelectorAll('.mw-tab');

    function localPointFromClient(clientX, clientY) {
      var rect = svg.getBoundingClientRect();
      var vb = svg.viewBox.baseVal;
      var scale = rect.width / vb.width;
      return [(clientX - rect.left) / scale + vb.x, (clientY - rect.top) / scale + vb.y];
    }

    function currentParams() {
      if (current === 'translate') return { type: 'translate', vx: state.translate.vx, vy: state.translate.vy };
      if (current === 'rotate') return { type: 'rotate', ox: state.rotate.ox, oy: state.rotate.oy, angle: state.rotate.angle };
      if (current === 'reflect') {
        var s = state.reflect;
        return { type: 'reflect', px: s.ax, py: s.ay, theta: Math.atan2(s.by - s.ay, s.bx - s.ax) };
      }
      var g = state.glide;
      return { type: 'glide', px: g.ax, py: g.ay, theta: Math.atan2(g.by - g.ay, g.bx - g.ax), t: g.t };
    }

    function handleMarkup(x, y, key) {
      return '<circle class="mw-handle" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="6"/>' +
             '<circle class="mw-hit" data-key="' + key + '" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="16"/>';
    }

    function render() {
      var parts = [];
      parts.push('<polygon points="' + fmtPts(flagPoints(ORIGIN, 0)) + '" class="mw-flag-ghost"/>');

      if (current === 'reflect' || current === 'glide') {
        var s = state[current];
        var dx = s.bx - s.ax, dy = s.by - s.ay, len = Math.hypot(dx, dy) || 1;
        var ux = dx / len, uy = dy / len, ext = 500;
        parts.push('<line x1="' + (s.ax - ux * ext).toFixed(1) + '" y1="' + (s.ay - uy * ext).toFixed(1) +
          '" x2="' + (s.bx + ux * ext).toFixed(1) + '" y2="' + (s.by + uy * ext).toFixed(1) + '" class="mw-axis"/>');
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
        parts.push(handleMarkup(ORIGIN[0] + v2.vx, ORIGIN[1] + v2.vy, 'v'));
      } else if (current === 'rotate') {
        var r2 = state.rotate;
        parts.push(handleMarkup(r2.ox, r2.oy, 'o'));
        parts.push(handleMarkup(r2.ox + 45 * Math.cos(r2.angle), r2.oy + 45 * Math.sin(r2.angle), 'ang'));
      } else if (current === 'reflect') {
        var s2 = state.reflect;
        parts.push(handleMarkup(s2.ax, s2.ay, 'a'));
        parts.push(handleMarkup(s2.bx, s2.by, 'b'));
      } else {
        var g2 = state.glide;
        var dx2 = g2.bx - g2.ax, dy2 = g2.by - g2.ay, len2 = Math.hypot(dx2, dy2) || 1;
        var ux2 = dx2 / len2, uy2 = dy2 / len2, mx = (g2.ax + g2.bx) / 2, my = (g2.ay + g2.by) / 2;
        parts.push(handleMarkup(g2.ax, g2.ay, 'a'));
        parts.push(handleMarkup(g2.bx, g2.by, 'b'));
        parts.push(handleMarkup(mx + ux2 * g2.t, my + uy2 * g2.t, 't'));
      }

      svg.innerHTML = parts.join('');
      wireHandleDrag();
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
      var p = clamp(localPointFromClient(e.clientX, e.clientY));
      if (current === 'translate' && dragKey === 'v') {
        state.translate.vx = p[0] - ORIGIN[0];
        state.translate.vy = p[1] - ORIGIN[1];
      } else if (current === 'rotate' && dragKey === 'o') {
        state.rotate.ox = p[0]; state.rotate.oy = p[1];
      } else if (current === 'rotate' && dragKey === 'ang') {
        state.rotate.angle = Math.atan2(p[1] - state.rotate.oy, p[0] - state.rotate.ox);
      } else if ((current === 'reflect' || current === 'glide') && dragKey === 'a') {
        state[current].ax = p[0]; state[current].ay = p[1];
      } else if ((current === 'reflect' || current === 'glide') && dragKey === 'b') {
        state[current].bx = p[0]; state[current].by = p[1];
      } else if (current === 'glide' && dragKey === 't') {
        var g = state.glide;
        var dx = g.bx - g.ax, dy = g.by - g.ay, len = Math.hypot(dx, dy) || 1;
        var ux = dx / len, uy = dy / len, mx = (g.ax + g.bx) / 2, my = (g.ay + g.by) / 2;
        g.t = (p[0] - mx) * ux + (p[1] - my) * uy;
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
      else if (p.type === 'rotate') state.rotate = { ox: p.ox, oy: p.oy, angle: p.angle };
      else {
        var axis = axisFromPointTheta(p.px, p.py, p.theta, 40);
        if (p.type === 'reflect') state.reflect = { ax: axis[0][0], ay: axis[0][1], bx: axis[1][0], by: axis[1][1] };
        else state.glide = { ax: axis[0][0], ay: axis[0][1], bx: axis[1][0], by: axis[1][1], t: p.t };
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

  return { create: createMotionWidget, renderStatic: renderStatic };
})();

(function () {
  var el = document.getElementById('widget-three-kinds');
  if (!el) return;
  MotionWidget.create(el, { tabs: ['translate', 'rotate', 'reflect'] });
})();
</script>
```

- [ ] **Step 3: Verify in browser**

Run: `cd ~/MATH/homepage && npm run dev`, open `/Materials/chasles.html`.

Expected: §2 shows a widget with 3 pill buttons. On **Перенос**, dragging the
single handle moves the vector tip and the solid flag translates with it, while
the faint ghost flag stays put. Switching to **Поворот** shows a center handle
and an angle handle on a dashed orbit circle; dragging the center moves the
whole rotation setup, dragging the angle handle spins the solid flag around the
center. Switching to **Отражение** shows a dashed line extended to the frame
edges with two draggable endpoint handles; dragging either endpoint tilts/moves
the axis and the solid flag mirrors accordingly, clearly changing handedness
versus the ghost. No handle can be dragged outside the frame. No console errors.

- [ ] **Step 4: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/chasles.html
git commit -m "$(cat <<'EOF'
Add MotionWidget factory and §2 (three kinds of plane motions)

Reusable draggable SVG widget (translate/rotate/reflect, plus glide
implemented for reuse in a later task) with a fixed viewBox and
clamped drag handles, matching duality.html's established drag
pattern. Wired up for §2 with 3 tabs.
EOF
)"
```

---

## Task 4: §3 "Теорема о трёх гвоздях"

**Files:**
- Modify: `public/Materials/chasles.html`

**Interfaces:**
- Consumes: nothing (self-contained IIFE, same `localPointFromClient`/drag
  pattern as Task 3 but not sharing code with it — matches `duality.html`'s own
  convention of one independent script block per widget).
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Add `.note` CSS**

Append inside `<style>`:

```css
.note{border-left:3px solid var(--rust-acc);background:var(--rust-bg);border-radius:0 6px 6px 0;padding:.8rem 1.1rem;margin:1rem 0;font-size:17.5px;color:var(--ink2)}
.note .note-head{font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--rust-acc);margin-bottom:.35rem}
.note p{margin-bottom:.55rem;color:var(--ink2)}
.note p:last-child{margin-bottom:0}
.nails-tri{fill:rgba(26,25,23,.05);stroke:#1a1917;stroke-width:1.2}
.nails-hit{fill:#000;opacity:0;cursor:grab;touch-action:none}
.nails-hit:active{cursor:grabbing}
```

- [ ] **Step 2: Add §3 markup and script**

Insert before `<p class="page-footer">`:

```html
<section id="sec-nails">
  <h2>3. Теорема о трёх гвоздях</h2>
  <p class="lead">Если движение оставляет на месте три точки $A$, $B$, $C$, не лежащие на одной прямой, оно оставляет на месте вообще всё — то есть является тождественным. Перетащите $A$, $B$, $C$ и пробную точку $P$: три окружности радиусов $|AP|$, $|BP|$, $|CP|$ вокруг гвоздей пересекаются ровно в одной точке — самой $P$. Значит, никакая другая точка не может быть образом $P$ при движении, сохраняющем $A,B,C$.</p>
  <figure>
    <svg id="nails-svg" class="motion-frame" role="img" aria-label="Три гвоздя A, B, C и пробная точка P с окружностями расстояний"></svg>
    <figcaption>Перетащите любую из четырёх точек.</figcaption>
  </figure>
  <p class="note" id="nails-note" style="display:none">
    <span class="note-head">Вырожденный случай</span>
    <span>$C$ легла на прямую $AB$ — теперь работает только лемма о двух точках: окружностей $A$ и $B$ уже недостаточно, остаётся одна степень свободы (отражение относительно прямой $AB$).</span>
  </p>
</section>

<script id="nails-theorem">
(function () {
  var svg = document.getElementById('nails-svg');
  var note = document.getElementById('nails-note');
  if (!svg) return;

  var FRAME_HALF_W = 150, FRAME_HALF_H = 110, CAP_X = 140, CAP_Y = 100;
  svg.setAttribute('viewBox', (-FRAME_HALF_W) + ' ' + (-FRAME_HALF_H) + ' ' + (2 * FRAME_HALF_W) + ' ' + (2 * FRAME_HALF_H));

  var pts = { A: [-90, -60], B: [80, -70], C: [-20, 75], P: [20, 10] };
  var COLORS = { A: '#3a5f9e', B: '#8c4a32', C: '#2e6645' };

  function clamp(p) { return [Math.max(-CAP_X, Math.min(CAP_X, p[0])), Math.max(-CAP_Y, Math.min(CAP_Y, p[1]))]; }
  function dist(u, v) { return Math.hypot(u[0] - v[0], u[1] - v[1]); }
  function f1(v) { return v.toFixed(1); }
  function isDegenerate() {
    var A = pts.A, B = pts.B, C = pts.C;
    var cross = (B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0]);
    return Math.abs(cross) < 600;
  }

  function render() {
    var A = pts.A, B = pts.B, C = pts.C, P = pts.P, parts = [];
    parts.push('<polygon points="' + [A, B, C].map(function (p) { return f1(p[0]) + ',' + f1(p[1]); }).join(' ') + '" class="nails-tri"/>');
    ['A', 'B', 'C'].forEach(function (key) {
      var c = pts[key], r = dist(c, P);
      parts.push('<circle cx="' + f1(c[0]) + '" cy="' + f1(c[1]) + '" r="' + f1(r) + '" fill="none" stroke="' + COLORS[key] + '" stroke-width="1.4" stroke-dasharray="5 4" opacity="0.75"/>');
    });
    ['A', 'B', 'C'].forEach(function (key) {
      var p = pts[key];
      parts.push('<circle cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" r="5" fill="' + COLORS[key] + '"/>');
      parts.push('<text x="' + f1(p[0] + 10) + '" y="' + f1(p[1] - 10) + '" class="svg-label">' + key + '</text>');
      parts.push('<circle class="nails-hit" data-key="' + key + '" cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" r="16"/>');
    });
    parts.push('<circle cx="' + f1(P[0]) + '" cy="' + f1(P[1]) + '" r="5.5" fill="#1a1917"/>');
    parts.push('<text x="' + f1(P[0] + 10) + '" y="' + f1(P[1] - 10) + '" class="svg-label">P</text>');
    parts.push('<circle class="nails-hit" data-key="P" cx="' + f1(P[0]) + '" cy="' + f1(P[1]) + '" r="16"/>');

    svg.innerHTML = parts.join('');
    wireDrag();
    if (note) note.style.display = isDegenerate() ? 'block' : 'none';
  }

  var dragKey = null, activePointerId = null;
  function localPointFromClient(clientX, clientY) {
    var rect = svg.getBoundingClientRect();
    var vb = svg.viewBox.baseVal;
    var scale = rect.width / vb.width;
    return [(clientX - rect.left) / scale + vb.x, (clientY - rect.top) / scale + vb.y];
  }
  function onPointerDown(e) {
    var t = e.target;
    if (!t.classList || !t.classList.contains('nails-hit')) return;
    dragKey = t.getAttribute('data-key');
    activePointerId = e.pointerId;
    e.preventDefault();
  }
  function onPointerMove(e) {
    if (dragKey === null || e.pointerId !== activePointerId) return;
    pts[dragKey] = clamp(localPointFromClient(e.clientX, e.clientY));
    render();
    e.preventDefault();
  }
  function onPointerUp(e) {
    if (e.pointerId !== activePointerId) return;
    dragKey = null; activePointerId = null;
  }
  function wireDrag() {
    var hits = svg.querySelectorAll('.nails-hit');
    for (var i = 0; i < hits.length; i++) {
      hits[i].removeEventListener('pointerdown', onPointerDown);
      hits[i].addEventListener('pointerdown', onPointerDown);
    }
  }
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);

  render();
})();
</script>
```

- [ ] **Step 3: Verify in browser**

Reload `/Materials/chasles.html`. Expected: §3 shows a triangle with 3 colored
dashed circles all passing through $P$; dragging $A$, $B$, $C$, or $P$ updates
live and the circles always meet exactly at $P$. Dragging $C$ onto line $AB$
reveals the "Вырожденный случай" note; moving it back off the line hides it
again. The two `$A$,$B$,$C$` etc. inline formulas in the lead paragraph render
via KaTeX.

- [ ] **Step 4: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/chasles.html
git commit -m "$(cat <<'EOF'
Add §3: interactive three-nails theorem

Draggable A, B, C and a probe point P with live distance circles;
flags the degenerate (C on line AB) case with a note tying back to
the two-point lemma.
EOF
)"
```

---

## Task 5: §4 "Скользящая симметрия" (enable the glide tab)

**Files:**
- Modify: `public/Materials/chasles.html`

**Interfaces:**
- Consumes: `MotionWidget.create` (Task 3) — glide support already exists inside
  the factory; this task only exposes it in a new instance.
- Produces: nothing new consumed later.

- [ ] **Step 1: Add §4 markup + script**

Insert before `<p class="page-footer">`:

```html
<section id="sec-glide">
  <h2>4. Скользящая симметрия</h2>
  <p class="lead">А что если у движения вообще нет неподвижных точек? Переноса и поворота для этого мало: композиция отражения и сдвига вдоль его же оси — тоже движение без единой неподвижной точки, но её нельзя свести ни к переносу, ни к повороту, ни к простому отражению. Это четвёртый, самостоятельный вид — <strong>скользящая симметрия</strong>.</p>
  <figure>
    <div class="motion-widget" id="widget-glide"></div>
    <figcaption>Вкладка «Скользящая симметрия»: тащите концы оси — так же, как в отражении — и третью ручку вдоль самой оси, чтобы задать сдвиг.</figcaption>
  </figure>
</section>

<script>
(function () {
  var el = document.getElementById('widget-glide');
  if (!el) return;
  MotionWidget.create(el, {
    tabs: ['reflect', 'glide'],
    initial: { type: 'glide', px: -30, py: 70, theta: Math.atan2(-130, 90), t: 50 }
  });
})();
</script>
```

- [ ] **Step 2: Verify in browser**

Reload. Expected: §4 shows a widget defaulting to **Скользящая симметрия**
already active, with the axis (2 endpoint handles) plus a third handle sitting
on the axis for the glide amount; dragging the third handle stays constrained
to the line and changes how far along it the solid flag's mirror image slides.
Switching to **Отражение** collapses the glide to a plain mirror (drag the
third-handle-equivalent isn't shown, since that tab only has 2 handles).

- [ ] **Step 3: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/chasles.html
git commit -m "Add §4: glide reflection as the fourth kind of plane motion"
```

---

## Task 6: §5 "Теорема Шаля"

**Files:**
- Modify: `public/Materials/chasles.html`

**Interfaces:**
- Consumes: the flag-drawing primitives from `MotionWidget`'s internal module
  scope are **not** exposed for this task's static quiz image — this task draws
  its own tiny standalone static illustration (2 fixed flags) directly, to keep
  the "guess the class" example fully self-contained and independent of widget
  internals.
- Produces: nothing consumed later.

- [ ] **Step 1: Add `details`/theorem-box CSS**

Append inside `<style>`:

```css
details{background:var(--bg2);border:1px solid var(--border);border-radius:6px;margin:1.2rem 0;padding:0}
details summary{cursor:pointer;padding:.85rem 1.1rem;font-family:'JetBrains Mono',monospace;font-size:14.5px;letter-spacing:.03em;text-transform:uppercase;color:var(--ink2);list-style:none;display:flex;align-items:center;gap:8px}
details summary::-webkit-details-marker{display:none}
details summary::before{content:'▶';font-size:11px;color:var(--ink3);transition:transform .15s}
details[open] summary::before{transform:rotate(90deg)}
details .details-body{padding:0 1.2rem 1.1rem;font-size:17.5px;color:var(--ink2);line-height:1.65}
.note.theorem{border-left-color:var(--blue-acc);background:var(--blue-bg)}
.note.theorem .note-head{color:var(--blue-acc)}
```

- [ ] **Step 2: Add §5 markup**

Insert before `<p class="page-footer">`:

```html
<section id="sec-chasles">
  <h2>5. Теорема Шаля</h2>
  <div class="note theorem">
    <span class="note-head">Теорема (Шаля)</span>
    <p>Всякое движение плоскости относится ровно к одному из трёх классов:</p>
    <p>$\rightrightarrows$ <strong>перенос</strong> (в том числе нулевой — тождественное движение);</p>
    <p>$\circlearrowleft$ <strong>поворот</strong> вокруг произвольного центра;</p>
    <p>$\leftharpoonup\leftharpoondown$ <strong>скользящая симметрия</strong> — в том числе обычное отражение как случай нулевого сдвига.</p>
  </div>
  <p>Тождественное движение — это перенос на нулевой вектор; обычное отражение — это скользящая симметрия с нулевым сдвигом вдоль оси. Других движений плоскости не существует.</p>

  <details>
    <summary>Проверьте себя: какой класс?</summary>
    <div class="details-body">
      <p>На картинке — исходный флажок (бледный контур) и его образ (синий) под действием одного конкретного движения. Прежде чем открыть ответ — какой это класс: перенос, поворот или скользящая симметрия?</p>
      <svg id="chasles-quiz-svg" class="motion-frame" role="img" aria-label="Исходный и преобразованный флажок для угадывания класса движения" style="max-width:420px"></svg>
      <p><strong>Ответ:</strong> это скользящая симметрия — флажок одновременно отразился (поменял «сторону») и сдвинулся вдоль оси отражения. Ни перенос, ни поворот в одиночку так не смогли бы: перенос не меняет ориентацию флажка, а поворот оставляет на месте свой центр.</p>
    </div>
  </details>
</section>

<script>
(function () {
  var svg = document.getElementById('chasles-quiz-svg');
  if (!svg || !window.MotionWidget) return;
  MotionWidget.renderStatic(svg, { type: 'glide', px: -20, py: 0, theta: 0.3, t: 65 });
})();
</script>
```

- [ ] **Step 3: Verify in browser**

Reload. Expected: theorem callout renders in a blue-tinted box with 3 rendered
KaTeX lines (arrow symbols + bold class names). Clicking the `<details>` summary
expands to show a small static (non-draggable) flag illustration and, below it,
the answer text — confirm the arrow/summary rotates on open per the existing
`details[open] summary::before` rule.

- [ ] **Step 4: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/chasles.html
git commit -m "Add §5: Chasles' theorem statement + guess-the-class mini quiz"
```

---

## Task 7: §6 "Таблица композиций"

**Files:**
- Modify: `public/Materials/chasles.html`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing consumed later.

- [ ] **Step 1: Add table CSS (including `:has()` column-hover)**

Append inside `<style>`:

```css
.tbl-wrap{overflow-x:auto;margin-bottom:.6rem}
table.basic{width:100%;border-collapse:collapse;min-width:520px;border:0.5px solid var(--border);border-top:2px solid var(--ink)}
table.basic thead th{padding:12px 16px;vertical-align:bottom;border-bottom:1.5px solid var(--ink);border-right:0.5px solid var(--border);font-size:19px;font-weight:500;text-align:center}
table.basic thead th:last-child{border-right:none}
table.basic tbody tr{border-bottom:0.5px solid var(--border)}
table.basic tbody tr:last-child{border-bottom:none}
table.basic tbody th{padding:12px 16px;border-right:0.5px solid var(--border);font-size:19px;font-weight:500;text-align:center;background:var(--bg2)}
table.basic tbody td{padding:12px 16px;vertical-align:middle;border-right:0.5px solid var(--border);font-size:18px;color:var(--ink2);text-align:center}
table.basic tbody td:last-child{border-right:none}
table.basic tbody tr:hover td, table.basic tbody tr:hover th{background:rgba(58,95,158,.06)}
table.basic:has(td.col-1:hover) td.col-1, table.basic:has(td.col-1:hover) thead th.col-1{background:rgba(58,95,158,.1)}
table.basic:has(td.col-2:hover) td.col-2, table.basic:has(td.col-2:hover) thead th.col-2{background:rgba(58,95,158,.1)}
table.basic:has(td.col-3:hover) td.col-3, table.basic:has(td.col-3:hover) thead th.col-3{background:rgba(58,95,158,.1)}
```

- [ ] **Step 2: Add §6 markup**

Insert before `<p class="page-footer">`:

```html
<section id="sec-table">
  <h2>6. Таблица композиций</h2>
  <p class="lead">Что получится, если сначала выполнить движение из строки, а затем — из столбца (порядок «строка∘столбец», как и в таблице композиций для прямой). Две ячейки на диагонали неоднозначны: их конкретный исход зависит от параметров, а не только от класса.</p>
  <div class="tbl-wrap">
    <table class="basic">
      <thead>
        <tr><th></th><th class="col-1">$\rightrightarrows$ перенос</th><th class="col-2">$\circlearrowleft$ поворот</th><th class="col-3">$\leftharpoonup\leftharpoondown$ скользящая симметрия</th></tr>
      </thead>
      <tbody>
        <tr><th>$\rightrightarrows$ перенос</th><td class="col-1">$\rightrightarrows$ перенос</td><td class="col-2">$\circlearrowleft$ поворот</td><td class="col-3">$\leftharpoonup\leftharpoondown$ скользящая симметрия</td></tr>
        <tr><th>$\circlearrowleft$ поворот</th><td class="col-1">$\circlearrowleft$ поворот</td><td class="col-2">$\rightrightarrows$ перенос <em>или</em> $\circlearrowleft$ поворот</td><td class="col-3">$\leftharpoonup\leftharpoondown$ скользящая симметрия</td></tr>
        <tr><th>$\leftharpoonup\leftharpoondown$ скользящая симметрия</th><td class="col-1">$\leftharpoonup\leftharpoondown$ скользящая симметрия</td><td class="col-2">$\leftharpoonup\leftharpoondown$ скользящая симметрия</td><td class="col-3">$\rightrightarrows$ перенос <em>или</em> $\circlearrowleft$ поворот</td></tr>
      </tbody>
    </table>
  </div>

  <details>
    <summary>Предскажите: скользящая ∘ скользящая</summary>
    <div class="details-body">
      <p>Композиция двух скользящих симметрий — это перенос, если их оси параллельны, и поворот (на удвоенный угол между осями), если оси пересекаются — совершенно как для двух обычных отражений: скользящая составляющая обеих симметрий в промежуточных выкладках сокращается. Тот же эффект даёт композицию поворот∘поворот: перенос, если сумма углов кратна $2\pi$, иначе поворот на эту сумму.</p>
    </div>
  </details>
</section>
```

- [ ] **Step 3: Verify in browser**

Reload. Expected: 3×3 table with symbol+word cells; hovering any body row
highlights that row; hovering any cell in a given column additionally
highlights the whole column (via the `:has()` rules) — confirm in a
`:has()`-supporting browser (current Chrome/Safari/Firefox all qualify).
Clicking the `<details>` summary reveals the explanation text.

- [ ] **Step 4: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/chasles.html
git commit -m "Add §6: qualitative 3x3 composition table with row/column hover"
```

---

## Task 8: §7 part A — "Движения как функции f(z)" constructor

**Files:**
- Modify: `public/Materials/chasles.html`

**Interfaces:**
- Consumes: `MotionWidget.create` (Task 3, all 4 tabs now reachable since Task 5
  enabled glide), `MotionMath.paramsToMotion`/`formatExpr` (Task 2).
- Produces: nothing new consumed later (Task 9 builds its own instances, it does
  not reuse this task's specific widget instance).

- [ ] **Step 1: Add formula-box CSS**

Append inside `<style>`:

```css
.formula-box{font-family:'JetBrains Mono',monospace;font-size:16px;background:var(--bg2);border:1px solid var(--border);border-radius:6px;padding:.8rem 1.1rem;margin-top:.8rem;color:var(--ink)}
```

- [ ] **Step 2: Add §7 intro + part A markup/script**

Insert before `<p class="page-footer">`:

```html
<section id="sec-fz">
  <h2>7. Движения как функции $f(z)$</h2>
  <p class="lead">Если считать плоскость полем комплексных чисел, каждое движение записывается одной формулой. Сложение с числом — это перенос; умножение на число с $|a|=1$ — поворот вокруг нуля; сопряжение $\bar z$ — отражение от вещественной оси. Собирая эти операции вместе, получаем всё семейство:</p>
  <p>$f(z) = az + b$, $|a|=1$ — движения первого рода (перенос, поворот): $a=1$ — перенос на вектор $b$; $a\ne1$ — поворот на угол $\arg a$ вокруг точки $z_0=b/(1-a)$.</p>
  <p>$f(z) = a\bar z + b$, $|a|=1$ — движения второго рода (отражение, скользящая симметрия).</p>

  <h3>Конструктор</h3>
  <p>Настройте движение и посмотрите на его формулу.</p>
  <figure>
    <div class="motion-widget" id="widget-constructor"></div>
    <div class="formula-box" id="constructor-formula"></div>
    <figcaption>Числа округлены до сотых — это подстановка текущих параметров, без упрощения.</figcaption>
  </figure>
</section>

<script>
(function () {
  var el = document.getElementById('widget-constructor');
  var formulaEl = document.getElementById('constructor-formula');
  if (!el || !formulaEl || !window.MotionWidget || !window.MotionMath || !window.katex) return;

  function update(params) {
    var motion = MotionMath.paramsToMotion(params);
    katex.render('f(z) = ' + MotionMath.formatExpr(motion), formulaEl, { throwOnError: false });
  }

  var widget = MotionWidget.create(el, {
    tabs: ['translate', 'rotate', 'reflect', 'glide'],
    initial: { type: 'rotate', ox: 20, oy: 30, angle: Math.PI / 3 },
    onChange: update
  });
  update(widget.getParams());
})();
</script>
```

- [ ] **Step 3: Verify in browser**

Reload. Expected: the constructor widget starts on **Поворот**; the formula box
below shows something like `f(z) = (0.50 + 0.87i)z + (…)` rendered by KaTeX
(not raw text with backslashes). Dragging any handle, or switching tabs,
updates the formula immediately. Switching to **Перенос** shows `f(z) = (1.00 +
0.00i)z + (…)`; switching to **Отражение**/**Скользящая симметрия** shows
`\bar z` in the formula (rendered as z with a bar over it).

- [ ] **Step 4: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/chasles.html
git commit -m "Add §7 intro + f(z) constructor with a live KaTeX formula"
```

---

## Task 9: §7 part B — composition calculator

**Files:**
- Modify: `public/Materials/chasles.html`

**Interfaces:**
- Consumes: `MotionWidget.create`/`renderStatic` (Task 3), `MotionMath.paramsToMotion`/
  `compose`/`classify`/`formatExpr` (Task 2). Independent of Task 8's specific
  DOM elements (separate widget instances).
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

- [ ] **Step 2: Add part B markup/script**

Task 8 left `<section id="sec-fz">` closed with a `</section>` line right after
the constructor's `<figure>` block. This step extends that same section, so
first **delete that one `</section>` line**, then insert the markup below in its
place (it ends with its own `</section>`, closing the section again — the net
effect is the constructor `<figure>` and this block now share one section):

```html
  <h3>Калькулятор композиции</h3>
  <p>Соберите $g$ (применяется первым) и $f$ (применяется вторым) — ниже сразу появится $f\circ g$: класс результата, его формула и параметры, посчитанные из алгебры, а не подобранные на глаз.</p>
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
      <figcaption>Тот же флажок, что и в конструкторе выше, преобразованный сразу композицией — не в два шага.</figcaption>
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
  if (!gEl || !fEl || !window.MotionWidget || !window.MotionMath || !window.katex) return;

  var CLASS_LABELS = {
    translate: 'Перенос', rotate: 'Поворот', reflect: 'Отражение', glide: 'Скользящая симметрия'
  };

  function update() {
    var gMotion = MotionMath.paramsToMotion(gWidget.getParams());
    var fMotion = MotionMath.paramsToMotion(fWidget.getParams());
    var composed = MotionMath.compose(fMotion, gMotion);
    var classified = MotionMath.classify(composed);

    resultClass.textContent = CLASS_LABELS[classified.type];
    katex.render('(f\\circ g)(z) = ' + MotionMath.formatExpr(composed), resultFormula, { throwOnError: false });
    MotionWidget.renderStatic(resultSvg, classified);
  }

  var gWidget = MotionWidget.create(gEl, {
    tabs: ['translate', 'rotate', 'reflect', 'glide'],
    initial: { type: 'reflect', px: 0, py: 0, theta: 0 },
    onChange: update
  });
  var fWidget = MotionWidget.create(fEl, {
    tabs: ['translate', 'rotate', 'reflect', 'glide'],
    initial: { type: 'reflect', px: 0, py: 40, theta: 0 },
    onChange: update
  });

  update();
})();
</script>
```

- [ ] **Step 3: Verify in browser, including the exercise-derived sanity checks**

Reload. Expected on load: $g$ = reflect across a horizontal axis through the
origin, $f$ = reflect across a parallel horizontal axis 40 units above — the
result panel should show class **Перенос**, matching the "parallel axes"
exercise fact from Task 2's tests (translation perpendicular to both axes,
magnitude = 2×distance = 80).

Manually reproduce the other two exercise cases from the plan's Global
Constraints / Task 2 tests by dragging:
- Rotate $g$'s axis to vertical (drag its endpoints so the line is vertical,
  perpendicular to $f$'s horizontal axis) → result class should flip to
  **Поворот**.
- Drag one widget's tab to **Поворот**, set matching centers, and confirm
  composing two rotations whose angles sum to a multiple of 2π produces
  **Перенос**, not "Поворот on angle 0" — spot-check this by rotating $g$ by some
  angle and $f$ by the negated angle around the *same* center: result should be
  **Перенос** with $vx=vy=0$ (i.e. visually the ghost and solid flags in the
  result panel coincide).

Also confirm: dragging any handle in either $g$ or $f$ updates the result panel
live (formula, class label, and the transformed flag) with no console errors.

- [ ] **Step 4: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/chasles.html
git commit -m "$(cat <<'EOF'
Add §7 part B: composition calculator

Two draggable motion pickers (g applied first, f second) feed
MotionMath.compose, with the classified result (class, formula,
transformed figure) recomputed live. Manually spot-checked against
the parallel/perpendicular/angle-sum exercise facts already covered
by Task 2's automated tests.
EOF
)"
```

---

## Task 10: Site integration (taxonomy, manifest, news, sitemap)

**Files:**
- Modify: `public/Materials/_taxonomy.json`
- Modify: `data/materials.generated.ts` (regenerated by script, not hand-edited)
- Modify: `public/news.html`
- Modify: `public/news_en.html`
- Modify: `public/sitemap.xml`

**Interfaces:**
- Consumes: `public/Materials/chasles.html`'s `<title>` (Task 1), read by
  `scripts/generate-materials-manifest.mjs`.
- Produces: nothing (final task).

- [ ] **Step 1: Register the file in the taxonomy**

In `public/Materials/_taxonomy.json`, add to `fileCategory` (next to the
existing `"duality.html": "algebra",` entry):

```json
    "chasles.html": "algebra",
```

and to `fileLanguage` (next to `"duality.html": "ru",`):

```json
    "chasles.html": "ru",
```

- [ ] **Step 2: Regenerate the manifest**

Run: `cd ~/MATH/homepage && node scripts/generate-materials-manifest.mjs`
Expected output: `[materials] Wrote N item(s) → data/materials.generated.ts`
where N includes the new file.

Verify: `grep -A4 '"chasles.html"' data/materials.generated.ts` shows
`"filename": "chasles.html"`, `"href": "/Materials/chasles.html"`,
`"title": "Движения плоскости: теорема Шаля"`, `"category": "algebra"`,
`"lang": "ru"`.

- [ ] **Step 3: Add the news.html entry**

In `public/news.html`, insert as the **first** `<li>` right after
`<ul class="feed">` (before the existing `29.07` entries):

```html
  <li>
    <span class="date">31.07</span>
    <div class="entry"><p>Добавлен материал «<a href="/Materials/chasles.html">Движения плоскости: теорема Шаля</a>» — три вида движений, теорема о трёх гвоздях и калькулятор композиции на комплексных числах.</p></div>
  </li>
```

- [ ] **Step 4: Add the news_en.html entry**

In `public/news_en.html`, insert as the first `<li>` right after
`<ul class="feed">`:

```html
  <li>
    <span class="date">Jul 31</span>
    <div class="entry"><p>Added "<a href="/Materials/chasles.html">Движения плоскости: теорема Шаля</a>" — three kinds of plane motion, the three-nails theorem, and a complex-number composition calculator<span class="lang">RU</span>.</p></div>
  </li>
```

- [ ] **Step 5: Add the sitemap.xml entry**

In `public/sitemap.xml`, insert a new `<url>` block next to the existing
`duality.html` entry:

```xml
   <url>
      <loc>https://mathem.at/Materials/chasles.html</loc>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
   </url>
```

- [ ] **Step 6: Full-page final verification**

Run: `cd ~/MATH/homepage && npm run dev`, open `/Materials/chasles.html` fresh
(hard refresh), and re-check the whole page top to bottom in one pass:
- All 7 sections present and numbered 1–7, KaTeX renders everywhere (no visible
  `$...$` or raw LaTeX).
- Every drag interaction from Tasks 3–5, 9 still works after all the later
  insertions (nothing broke the shared `pointermove`/`pointerup` listeners).
- No JS console errors on load or during interaction.
- At `/#materials` on the homepage (`npm run dev` root), confirm the new card
  for «Движения плоскости: теорема Шаля» appears under the Алгебра и структуры
  category, linking to `/Materials/chasles.html`.
- Open `/news.html` and `/news_en.html`, confirm the new entries render and the
  link works.

- [ ] **Step 7: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/_taxonomy.json data/materials.generated.ts \
        public/news.html public/news_en.html public/sitemap.xml
git commit -m "$(cat <<'EOF'
Register chasles.html in the site: taxonomy, manifest, news, sitemap

Category "algebra" (matches duality.html), RU-only. News entries in
both feeds (news_en.html tags it RU-only, matching the
diophant_28_37.html precedent).
EOF
)"
```

---

## Self-Review Notes

- **Spec coverage:** all 8 design-doc sections map to tasks (see the section↔task
  table above); the "не входит" exclusions (line motions, sphere/space,
  Napoleon, 5×5 table, EN version, `|a|≠1`) are simply never built — nothing in
  this plan references them.
- **Placeholder scan:** no TBD/TODO; every code step contains complete,
  cross-checked source. The one place that could look like a stub — Task 1
  ending right after §1 — is intentional (documented as the insertion-point
  convention every later task follows), not an unfinished placeholder.
- **Type/shape consistency:** the 4 params shapes (`translate`/`rotate`/
  `reflect`/`glide`) are used identically by `MotionMath` (Task 2),
  `MotionWidget` (Task 3), and both consumers (Tasks 8, 9) — verified by
  re-reading each task's Interfaces block against the others while writing this
  plan. `MotionMath.compose`'s mixed-parity case and `classify`'s glide-vector
  sign were each independently hand-verified against 5 worked examples (see
  Task 2's test list) before being written into the code, after an initial
  draft of both had sign errors caught during that verification.
