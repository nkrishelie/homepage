# Конформность и дробно-линейные преобразования — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `public/Materials/conformal_maps.html` — a single self-contained,
interactive RU-only page proving that regularity is local similarity,
deriving conformality from it, proving that inversion sends circles to
circles (with an interactive widget), and getting the same fact for general
Möbius transformations for free via a translation+similarity+inversion
decomposition. Third and final material in the `analysis`-category series
started by `complex_numbers.html` and continued by `complex_regularity.html`.

**Architecture:** One static HTML file, no build step, no framework. Inline
`<style>`/`<script>` per section, exactly the convention already established
by the first two materials in this series. One reusable piece:
`window.InversionWidget`, an SVG drag widget with a single handle (the
circle's center) clamped to a **ring** (`MIN_C <= |c| <= MAX_C`, in units)
— a new clamp shape, distinct from `complex_numbers.html`'s max-only
rectangular clamp and `complex_regularity.html`'s fixed-radius/angle-only
clamp.

**Tech Stack:** Vanilla JS (`var`, ES5), SVG, KaTeX 0.16.9 via CDN
(**with the `\R`/`\C`/`\N`/`\Z`/`\Q` macros config already fixed post-ship
in the first two materials — copy it in from the start this time, do not
reintroduce the bug**), plain CSS custom properties. Node.js is used only as
a throwaway test/verification runner during Tasks 3–4 — no test framework,
no dependency ever gets added to the repo.

## Global Constraints

- Single file: `public/Materials/conformal_maps.html`. No `.js`/`.css`
  files created — everything inline.
- RU only, this round. No language pills in the topbar (only `.crumbs`).
- Visual system, CSS variables, fonts, KaTeX setup (**including the macros
  config**), topbar/header/TOC markup, `.note`/`.formula-box`/
  `.motion-frame`/`.mw-*` CSS — copied **verbatim** from the current
  `public/Materials/complex_regularity.html` (read in full before starting;
  it has been edited several times since its own plan was written, so that
  plan is *not* the source of truth — the live file is, and it now includes
  a post-ship KaTeX `macros` fix that must be carried forward from the
  start here, not bolted on after a user finds the same red-text bug again).
- Sign convention (same as every widget in this series): an SVG point
  `(x,y)` depicts the complex number `x - yi` (`im = -y`); a raw SVG-space
  angle is negated only when *displayed*, never when fed back into drawing
  math.
- **Scale, verified numerically before this plan was written (not just
  derived on paper):** with a fixed shape radius `SHAPE_R=1` (unit) and the
  center `c` clamped to `1.3 <= |c| <= 4`, the worst-case image magnitude is
  `1/(1.3-1) = 3.333` units, at `SCALE=25px/unit` that is `83.3px` from the
  origin — inside the standard `FRAME_HALF_W=150,FRAME_HALF_H=110` frame
  with room to spare, **in every direction** (checked by symmetry: only
  `|c|` affects the magnitude bound, not its direction). Task 3's test
  re-derives this bound in code across a full angular sweep, not just cites
  this paragraph.
- The circle-inversion image-circle formula
  ($c'=\bar c/(|c|^2-r^2)$, $r'=r/||c|^2-r^2|$) and the Möbius
  translation+inversion+similarity decomposition identity were **both
  derived algebraically and verified numerically against direct
  computation** while writing this plan (see Tasks 3 and 4's own
  verification steps, which reproduce those checks as committed/logged
  work, not just assertions).
- Content source: **original authorship**, not extracted from
  `LevelAlpha.tex` or `mathan.tex` — both sources were confirmed empty for
  this topic beyond a one-line teaser about fractional-linear maps (see the
  design doc and the series memory). Every mathematical claim on this page
  must be one this plan (or its design doc) actually derives — no citing a
  source that doesn't have the content.
- Design doc:
  `docs/superpowers/specs/2026-08-01-conformal-mappings-design.md` — read it
  first if anything below is unclear about *why* a section is scoped the
  way it is.
- No npm dependency changes. `package.json` is not touched by this plan.
- Every task that changes `conformal_maps.html` ends with a manual browser
  check — this repo has no visual test framework, and none should be added.
- Node.js `node:assert/strict` is available — used only in throwaway
  scratchpad scripts, never committed to the repo. **Write verification
  scripts to a file first, then run them** — inline `node -e "..."` with
  nested template literals/complex quoting has already caused a shell-escaping
  failure earlier in this series; a `.mjs` file avoids that class of bug
  entirely.
- On-page section numbers (the `<h2>N. …</h2>` numbers a reader sees) run
  1–5. **This is the last material in the series — §5 does not tease a
  "material 4"; it's a genuine closing reflection.**

**On-page section ↔ Task mapping:**

| On-page `<h2>` | Title | Built in |
|---|---|---|
| 1 | Регулярность как локальное подобие | Task 1 |
| 2 | Конформность | Task 2 |
| 3 | Инверсия: окружности переходят в окружности | Task 3 |
| 4 | Дробно-линейные преобразования | Task 4 |
| 5 | Заключение | Task 5 |

The forward-link edit to `complex_regularity.html` (Task 6) and site
integration (Task 7) touch no on-page `<h2>` of the new file.

---

## Task 1: Page shell (head, base CSS, topbar, header, TOC, §1)

**Files:**
- Create: `public/Materials/conformal_maps.html`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: the file itself, with `</body></html>` at the end and an
  insertion point every later task uses: insert new `<section>…</section>`
  markup and any new `<script>` block **immediately before** the line
  `<p class="page-footer">© Nikolai Kazimirov · <a href="https://mathem.at" rel="noopener">mathem.at</a></p>`.
  New `<style>` rules get appended inside the existing `<style>...</style>`
  block, just before `</style>`. New `<li>` entries go inside
  `<nav class="toc">`'s `<ol>`, in reading order.

- [ ] **Step 1: Write the file**

```html
<!DOCTYPE html>
<html lang="ru" style="scroll-behavior: smooth;">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Конформность и дробно-линейные преобразования</title>
<meta name="description" content="Регулярность как подобие в бесконечно малом, конформность как следствие комплексной дифференцируемости, доказательство того, что инверсия переводит окружности в окружности, дробно-линейные преобразования как их композиция — с перетаскиваемым центром окружности.">
<link rel="canonical" href="https://mathem.at/Materials/conformal_maps.html">
<meta property="og:type" content="article">
<meta property="og:title" content="Конформность и дробно-линейные преобразования">
<meta property="og:description" content="Почему регулярность — это подобие в бесконечно малом, вывод конформности и доказательство того, что инверсия и дробно-линейные преобразования переводят окружности и прямые в окружности и прямые.">
<meta property="og:url" content="https://mathem.at/Materials/conformal_maps.html">
<meta property="og:locale" content="ru_RU">
<link rel="icon" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMxYTE5MTciLz48dGV4dCB4PSIxNiIgeT0iMTciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJjZW50cmFsIiBmaWxsPSIjZmZmIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iNzAwIiBmb250LWZhbWlseT0iR2VvcmdpYSxUaW1lcyBOZXcgUm9tYW4sc2VyaWYiPsKxw5fDtzwvdGV4dD48L3N2Zz4=" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js" onload="renderMathInElement(document.body, {delimiters: [{left: '$$', right: '$$', display: true}, {left: '\\[', right: '\\]', display: true}, {left: '$', right: '$', display: false}, {left: '\\(', right: '\\)', display: false}], macros: {'\\R': '\\mathbb{R}', '\\C': '\\mathbb{C}', '\\N': '\\mathbb{N}', '\\Z': '\\mathbb{Z}', '\\Q': '\\mathbb{Q}'}, throwOnError: false})"></script>
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
  <p class="kicker">Математический анализ · Комплексный анализ</p>
  <h1>Конформные отображения</h1>
  <p class="desc">Умножение на комплексное число — поворотная гомотетия (материал «Комплексные числа: три конструкции одного поля»); производная — тот же предел, что и для вещественных функций (материал «Регулярные функции»). Здесь — что из этого следует геометрически: регулярность оказывается подобием «в бесконечно малом», а значит сохраняет углы между кривыми, и на примере инверсии $w=1/z$ это можно увидеть и доказать в чистом виде.</p>
</header>

<nav class="toc" style="background: var(--bg2); border: 1px solid var(--border); border-radius: 6px; padding: 1.2rem 1.5rem; margin-bottom: 2.5rem;">
  <h3 style="margin-top: 0; margin-bottom: 0.8rem; font-size: 19px;">Содержание</h3>
  <ol style="margin: 0 0 0 1.5rem; padding: 0; color: var(--ink2); line-height: 1.6;">
    <li><a href="#sec-similarity" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">Регулярность как локальное подобие</a></li>
    <li><a href="#sec-conformal" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">Конформность</a></li>
    <li><a href="#sec-inversion" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">Инверсия: окружности переходят в окружности</a></li>
    <li><a href="#sec-mobius" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">Дробно-линейные преобразования</a></li>
    <li><a href="#sec-conclusion" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">Заключение</a></li>
  </ol>
</nav>

<section id="sec-similarity">
  <h2>1. Регулярность как локальное подобие</h2>
  <p class="lead">Пусть $f$ дифференцируема в точке $z_0$, и $a=f'(z_0)$. По определению производной,</p>
  <p>$$f(z)=f(z_0)+f'(z_0)(z-z_0)+o(z-z_0)\quad\text{при }z\to z_0,$$</p>
  <p>то есть вблизи $z_0$ функция $f$ приближается своей линейной частью</p>
  <p>$$f(z)\approx f(z_0)+a(z-z_0)=az+\big(f(z_0)-az_0\big).$$</p>
  <p>Это в точности подобие $w=az+b$ из материала «<a href="/Materials/complex_numbers.html">Комплексные числа: три конструкции одного поля</a>» с $b=f(z_0)-az_0$ — поворотная гомотетия с коэффициентом $|a|$ и углом поворота $\arg a$. Разница с тем материалом только в одном: там $a$ было фиксированным числом для всего преобразования плоскости, здесь $a=f'(z_0)$ меняется от точки к точке — это подобие «в бесконечно малом», своё в каждой точке области регулярности.</p>
</section>

<p class="page-footer">© Nikolai Kazimirov · <a href="https://mathem.at" rel="noopener">mathem.at</a></p>

</div><!-- .page -->
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Run: `cd ~/MATH/homepage && npm run dev`, open
`http://localhost:3000/Materials/conformal_maps.html` (confirm the port
vite actually prints).

Expected: page loads with no console errors; title bar shows "Конформность и
дробно-линейные преобразования"; every `$...$`/`$$...$$` formula in the
header and §1 renders as KaTeX, **including `$b=f(z_0)-az_0$` and any other
formula with no `\R`/`\C` in it (those come later, but confirm none of §1's
formulas show red error text)**; the links to `/Materials/complex_numbers.html`
work; resizing below 700px shrinks body font and padding.

- [ ] **Step 3: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/conformal_maps.html
git commit -m "$(cat <<'EOF'
Add page shell for the conformal-mappings material

Head, base CSS (copied from complex_regularity.html, including its
post-ship KaTeX macros fix for \R/\C/\N/\Z/\Q -- carried forward from
the start this time), topbar, header, table of contents, and §1
(regularity's linear approximation is exactly complex_numbers.html's
similarity, with a = f'(z0) varying point to point). No interactivity
yet -- later tasks append sections before the page footer.
EOF
)"
```

---

## Task 2: §2 "Конформность"

**Files:**
- Modify: `public/Materials/conformal_maps.html`

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing later tasks depend on programmatically.

- [ ] **Step 1: Add `.note` CSS**

Append inside `<style>`, before `</style>`:

```css
.note{border-left:3px solid var(--rust-acc);background:var(--rust-bg);border-radius:0 6px 6px 0;padding:.8rem 1.1rem;margin:1rem 0;font-size:17.5px;color:var(--ink2)}
.note .note-head{font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--rust-acc);margin-bottom:.35rem}
.note p{margin-bottom:.55rem;color:var(--ink2)}
.note p:last-child{margin-bottom:0}
```

- [ ] **Step 2: Add §2 markup**

Insert before `<p class="page-footer">`:

```html
<section id="sec-conformal">
  <h2>2. Конформность</h2>
  <p class="lead">Пусть через точку $z_0$ проходит гладкая кривая $\gamma(t)$, $\gamma(0)=z_0$, с касательным вектором $\gamma'(0)=\tau\ne0$. Направление кривой в $z_0$ — это $\arg\tau$; угол между двумя кривыми, пересекающимися в $z_0$ с касательными $\tau_1,\tau_2$, — это разность $\arg\tau_2-\arg\tau_1$.</p>
  <p>Посмотрим, что происходит с этим углом под действием регулярной функции $f$ с $f'(z_0)=a\ne0$. Образ кривой — это $f(\gamma(t))$, и её касательная в $t=0$:</p>
  <p>$$(f\circ\gamma)'(0)=\lim_{t\to0}\frac{f(\gamma(t))-f(\gamma(0))}{t}=\lim_{t\to0}\frac{f(\gamma(t))-f(z_0)}{\gamma(t)-z_0}\cdot\frac{\gamma(t)-z_0}{t}=a\tau.$$</p>
  <p>Первый множитель стремится к $f'(z_0)=a$, потому что $\gamma(t)\to z_0$ при $t\to0$, а комплексная производная — это предел по <em>любому</em> направлению приближения (материал «<a href="/Materials/complex_regularity.html">Регулярные функции</a>», §1), не только вдоль прямой; второй множитель стремится к $\gamma'(0)=\tau$ по определению.</p>
  <p>Значит, касательная к образу кривой — это $a\tau$: исходная касательная $\tau$, умноженная на одно и то же число $a$, для <em>любой</em> кривой через $z_0$. Для двух кривых с касательными $\tau_1,\tau_2$ угол между образами</p>
  <p>$$\arg(a\tau_2)-\arg(a\tau_1)=\big(\arg a+\arg\tau_2\big)-\big(\arg a+\arg\tau_1\big)=\arg\tau_2-\arg\tau_1$$</p>
  <p>— тот же угол, что и между исходными кривыми, с тем же знаком (ориентация тоже сохраняется). Это и есть <strong>конформность</strong>.</p>
  <div class="note">
    <span class="note-head">Теорема</span>
    <p>Если $f$ регулярна в точке $z_0$ и $f'(z_0)\ne0$, то $f$ конформна в $z_0$: сохраняет углы между кривыми, включая знак угла.</p>
  </div>
  <p>Условие $f'(z_0)\ne0$ существенно: там, где производная обращается в нуль, линейная часть приближения из §1 исчезает, и углы, вообще говоря, не сохраняются. Простой пример: $f(z)=z^2$ в точке $z_0=0$. Записав $z=re^{i\theta}$, получаем $f(z)=r^2e^{2i\theta}$ — угол между любыми двумя лучами из нуля под действием $f$ удваивается, а не сохраняется.</p>
</section>
```

- [ ] **Step 3: Verify in browser**

Run: `cd ~/MATH/homepage && npm run dev`, open
`http://localhost:3000/Materials/conformal_maps.html`.

Expected: §2 renders below §1; the limit computation, the theorem note box,
and the $z^2$ counterexample all render correctly via KaTeX; the link to
`/Materials/complex_regularity.html` works; TOC entry for §2 scrolls
correctly.

- [ ] **Step 4: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/conformal_maps.html
git commit -m "$(cat <<'EOF'
Add §2: conformality via the tangent-angle argument

Full derivation (not just a stated theorem): the image curve's
tangent is a*tau for any curve through z0, because the complex
derivative is direction-independent (explicit callback to
complex_regularity.html §1). Includes the f'(z0)=0 counterexample
(z^2 doubles angles at the origin) so the hypothesis isn't left
unmotivated.
EOF
)"
```

---

## Task 3: `InversionWidget` + §3 "Инверсия: окружности переходят в окружности"

The heart of the material: a full derivation of the circle-inversion
formula, verified against direct sampling, plus the interactive widget.

**Files:**
- Modify: `public/Materials/conformal_maps.html`
- Test (scratchpad, not committed):
  `/tmp/claude-1000/-home-nkrishelie-MATH-homepage/318b6e91-642c-4433-96fb-9515cf835df6/scratchpad/inversion-widget-math.test.mjs`

**Interfaces:**
- Consumes: nothing from Tasks 1–2.
- Produces, on `window.InversionWidget`:
  - `create(container, opts) -> { getC(): {cx,cy} }` where `opts = { onChange: function({cx,cy}){} }`.
    `cx,cy` are the handle's **SVG-space** pixel coordinates.
  - `_test: { invert(z)->{re,im}, imageCircle(c,r)->{c:{re,im}, r}, svgToMath(x,y)->{re,im}, SCALE, SHAPE_R, MIN_C, MAX_C }`
    — exposed for the test suite only.

- [ ] **Step 1: Write the failing test in the scratchpad**

Create
`/tmp/claude-1000/-home-nkrishelie-MATH-homepage/318b6e91-642c-4433-96fb-9515cf835df6/scratchpad/inversion-widget-math.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync('public/Materials/conformal_maps.html', 'utf8');
const match = html.match(/<script id="inversion-widget">([\s\S]*?)<\/script>/);
if (!match) throw new Error('Could not find <script id="inversion-widget"> in conformal_maps.html');

const sandbox = {};
new Function('window', match[1])(sandbox);
const InversionWidget = sandbox.InversionWidget;
if (!InversionWidget) throw new Error('window.InversionWidget was not defined by the script');
const T = InversionWidget._test;
if (!T) throw new Error('InversionWidget._test was not exposed');

function approxEqual(u, v, eps) {
  eps = eps || 1e-9;
  return Math.abs(u.re - v.re) < eps && Math.abs(u.im - v.im) < eps;
}

let failed = false;
function t(name, fn) {
  try { fn(); console.log('PASS', name); }
  catch (e) { failed = true; console.error('FAIL', name, '-', e.message); }
}

t('invert is an involution: invert(invert(z)) = z', () => {
  var z = { re: 1.7, im: -2.3 };
  assert.ok(approxEqual(T.invert(T.invert(z)), z));
});

t('MIN_C/MAX_C/SHAPE_R/SCALE match the design doc', () => {
  assert.equal(T.SHAPE_R, 1);
  assert.equal(T.SCALE, 25);
  assert.equal(T.MIN_C, 1.3);
  assert.equal(T.MAX_C, 4);
});

// imageCircle is a closed-form claim (derived algebraically in the design
// doc and §3's own prose) -- verified here against direct sampling for
// several off-axis centers, not just a real-axis special case.
[
  { re: 1.3, im: 0 },
  { re: 0.9, im: 0.9 },
  { re: -2, im: 1.5 },
  { re: 0.2, im: 1.28 },
  { re: -1.4, im: -1.4 }
].forEach(function (c) {
  t('imageCircle formula matches sampled points for c=(' + c.re + ',' + c.im + ')', () => {
    var r = T.SHAPE_R;
    var img = T.imageCircle(c, r);
    for (var deg = 0; deg < 360; deg += 3) {
      var th = deg * Math.PI / 180;
      var z = { re: c.re + r * Math.cos(th), im: c.im + r * Math.sin(th) };
      var w = T.invert(z);
      var dist = Math.hypot(w.re - img.c.re, w.im - img.c.im);
      assert.ok(Math.abs(dist - img.r) < 1e-9, 'deviation ' + Math.abs(dist - img.r) + ' at deg=' + deg);
    }
  });
});

// Scale-safety sweep: every sampled image point, for the whole reachable
// |c| in [MIN_C,MAX_C] ring and every direction of c, must stay inside the
// 150x110 half-frame in pixel space -- not just the analytically-argued
// worst-case magnitude.
t('every image point stays inside the 150x110 half-frame across the whole ring', () => {
  var r = T.SHAPE_R;
  for (var cDeg = 0; cDeg < 360; cDeg += 15) {
    [T.MIN_C, (T.MIN_C + T.MAX_C) / 2, T.MAX_C].forEach(function (cMag) {
      var c = { re: cMag * Math.cos(cDeg * Math.PI / 180), im: cMag * Math.sin(cDeg * Math.PI / 180) };
      for (var deg = 0; deg < 360; deg += 5) {
        var th = deg * Math.PI / 180;
        var z = { re: c.re + r * Math.cos(th), im: c.im + r * Math.sin(th) };
        var w = T.invert(z);
        var px = w.re * T.SCALE, py = -w.im * T.SCALE;
        assert.ok(Math.abs(px) <= 150, 'px=' + px + ' at |c|=' + cMag + ' cDeg=' + cDeg);
        assert.ok(Math.abs(py) <= 110, 'py=' + py + ' at |c|=' + cMag + ' cDeg=' + cDeg);
      }
    });
  }
});

if (failed) { console.error('\nSome tests FAILED'); process.exit(1); }
console.log('\nAll tests passed');
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `cd ~/MATH/homepage && node /tmp/claude-1000/-home-nkrishelie-MATH-homepage/318b6e91-642c-4433-96fb-9515cf835df6/scratchpad/inversion-widget-math.test.mjs`
Expected: throws `Could not find <script id="inversion-widget"> in conformal_maps.html`.

- [ ] **Step 3: Add widget CSS**

Append inside `<style>`, before `</style>`:

```css
.motion-frame{width:100%;max-width:560px;height:auto;aspect-ratio:300/220;display:block;background:var(--bg2);border:1px solid var(--border);border-radius:6px;touch-action:none}
.motion-widget{margin:1rem 0;max-width:560px}
.mw-coord-axis{stroke:var(--ink3);stroke-width:1;opacity:.55}
.mw-origin{fill:var(--ink3)}
.mw-preimage{fill:rgba(26,25,23,.08);stroke:var(--ink3);stroke-width:1;stroke-dasharray:3 3}
.mw-image{fill:rgba(58,95,158,.18);stroke:var(--blue-acc);stroke-width:1.6}
.mw-handle{fill:var(--ink);stroke:var(--bg);stroke-width:1.5}
.mw-hit{fill:#000;opacity:0;cursor:grab;touch-action:none}
.mw-hit:active{cursor:grabbing}
.mw-handle-label{font-family:'JetBrains Mono',monospace;font-size:11px;fill:var(--ink2)}
.svg-label{font-family:'JetBrains Mono',monospace;font-size:13px;fill:var(--ink2)}
figure{margin:1.4rem 0}
figcaption{font-size:16.5px;color:var(--ink3);margin-top:.6rem;line-height:1.55;font-style:italic}
.formula-box{font-family:'JetBrains Mono',monospace;font-size:16px;background:var(--bg2);border:1px solid var(--border);border-radius:6px;padding:.8rem 1.1rem;margin-top:.8rem;color:var(--ink)}
```

- [ ] **Step 4: Add §3 markup and the `InversionWidget` module**

Insert before `<p class="page-footer">`:

```html
<section id="sec-inversion">
  <h2>3. Инверсия: окружности переходят в окружности</h2>
  <p class="lead">Простейший пример регулярной функции, не сводящейся к подобию, — <strong>инверсия</strong> $w=1/z$. Она регулярна и конформна всюду, кроме $z=0$: $w'(z)=-1/z^2\ne0$ при $z\ne0$. У неё есть знаменитое свойство — она переводит окружности и прямые снова в окружности и прямые.</p>
  <div class="note">
    <span class="note-head">Теорема</span>
    <p>Пусть окружность $|z-c|=r$ не проходит через ноль ($|c|\ne r$). Тогда её образ под действием $w=1/z$ — окружность с центром $c'=\bar c/(|c|^2-r^2)$ и радиусом $r'=r/\big||c|^2-r^2\big|$.</p>
  </div>
  <p>Уравнение окружности $|z-c|=r$ запишется как $(z-c)(\bar z-\bar c)=r^2$, то есть $z\bar z-c\bar z-\bar cz+|c|^2-r^2=0$. Подставим $z=1/w$, $\bar z=1/\bar w$ (это и есть преобразование, обратное к $w=1/z$) и умножим на $w\bar w\ne0$:</p>
  <p>$$1-cw-\bar c\bar w+(|c|^2-r^2)\,w\bar w=0.$$</p>
  <p>Поделим на $|c|^2-r^2\ne0$:</p>
  <p>$$w\bar w-\frac c{|c|^2-r^2}w-\frac{\bar c}{|c|^2-r^2}\bar w+\frac1{|c|^2-r^2}=0.$$</p>
  <p>Уравнение окружности $|w-c'|=r'$ в тех же обозначениях — это $w\bar w-\bar{c'}w-c'\bar w+|c'|^2-r'^2=0$. Сравнивая коэффициенты при $w$ и при $\bar w$, получаем $\bar{c'}=c/(|c|^2-r^2)$, откуда и берётся формула для $c'$; из свободного члена $|c'|^2-r'^2=1/(|c|^2-r^2)$, что после подстановки $|c'|^2$ даёт формулу для $r'$.</p>
  <p>(Если окружность всё же проходит через ноль, $|c|=r$, знаменатель обращается в ноль, и образ — уже не окружность, а прямая; этот предельный случай ниже в интерактиве не показан — центр окружности намеренно не подпускается к нулю ближе фиксированной границы, чтобы $1/z$ не приходилось вычислять сколь угодно близко к особой точке.)</p>
  <figure>
    <div class="motion-widget" id="widget-inversion"></div>
    <div class="formula-box" id="inv-c"></div>
    <div class="formula-box" id="inv-image"></div>
    <figcaption>Центр $c$ перетаскивается; радиус окружности зафиксирован. Бледный контур — окружность-прообраз, синяя фигура — её образ, построенный по 120 точкам (численная проверка того, что формула выше действительно даёт окружность, а не что-то похожее на неё).</figcaption>
  </figure>
</section>

<script id="inversion-widget">
window.InversionWidget = (function () {
  var FRAME_HALF_W = 150, FRAME_HALF_H = 110;
  var FRAME_VB = (-FRAME_HALF_W) + ' ' + (-FRAME_HALF_H) + ' ' + (2 * FRAME_HALF_W) + ' ' + (2 * FRAME_HALF_H);
  var SCALE = 25;         // px per unit -- same scale as the rest of the series
  var SHAPE_R = 1;        // fixed circle radius, in units
  var MIN_C = 1.3, MAX_C = 4; // |c| clamp, in units -- keeps the circle off
                               // the origin and the image inside the frame
                               // at every angle (verified test-first)
  var SNAP = 5;           // px
  var SAMPLES = 120;

  function axesMarkup() {
    return '<line x1="' + (-FRAME_HALF_W) + '" y1="0" x2="' + FRAME_HALF_W + '" y2="0" class="mw-coord-axis"/>' +
      '<line x1="0" y1="' + (-FRAME_HALF_H) + '" x2="0" y2="' + FRAME_HALF_H + '" class="mw-coord-axis"/>' +
      '<circle cx="0" cy="0" r="3" class="mw-origin"/>' +
      '<text x="6" y="16" class="svg-label">0</text>' +
      '<text x="' + (FRAME_HALF_W - 20) + '" y="-8" class="svg-label">Re</text>' +
      '<text x="8" y="' + (-FRAME_HALF_H + 14) + '" class="svg-label">Im</text>';
  }

  function invert(z) {
    var d = z.re * z.re + z.im * z.im;
    return { re: z.re / d, im: -z.im / d };
  }

  // Derived and verified against direct sampling (see the test) -- see
  // also §3's own prose derivation on the page itself.
  function imageCircle(c, r) {
    var mag2 = c.re * c.re + c.im * c.im;
    var denom = mag2 - r * r;
    return { c: { re: c.re / denom, im: -c.im / denom }, r: r / Math.abs(denom) };
  }

  function sampleImage(c, r) {
    var pts = [];
    for (var i = 0; i < SAMPLES; i++) {
      var th = i / SAMPLES * 2 * Math.PI;
      pts.push(invert({ re: c.re + r * Math.cos(th), im: c.im + r * Math.sin(th) }));
    }
    return pts;
  }

  function mathToSvg(z) { return [z.re * SCALE, -z.im * SCALE]; }
  function svgToMath(x, y) { return { re: x / SCALE, im: -y / SCALE }; }
  function fmtPts(pts) { return pts.map(function (p) { return p[0].toFixed(2) + ',' + p[1].toFixed(2); }).join(' '); }
  function fmtComplex(z) {
    var sign = z.im < 0 ? '-' : '+';
    return z.re.toFixed(2) + ' ' + sign + ' ' + Math.abs(z.im).toFixed(2) + 'i';
  }
  function snap(v) { return Math.round(v / SNAP) * SNAP; }
  function clamp(p) {
    var d = Math.hypot(p[0], p[1]);
    var minPx = MIN_C * SCALE, maxPx = MAX_C * SCALE;
    if (d < 1e-9) return [minPx, 0];
    var clampedD = Math.max(minPx, Math.min(maxPx, d));
    var s = clampedD / d;
    return [snap(p[0] * s), snap(p[1] * s)];
  }

  function createInversionWidget(container, opts) {
    var onChange = (opts && opts.onChange) || function () {};
    // |c| ~= 1.72 units: close enough to MIN_C for a visibly large,
    // legible image circle at rest, without sitting at the boundary.
    var state = { cx: -35, cy: 25 };

    container.innerHTML = '<svg class="mw-svg motion-frame" viewBox="' + FRAME_VB + '"></svg>';
    var svg = container.querySelector('.mw-svg');

    function localPointFromClient(clientX, clientY) {
      var rect = svg.getBoundingClientRect();
      var vb = svg.viewBox.baseVal;
      var s = rect.width / vb.width;
      return [(clientX - rect.left) / s + vb.x, (clientY - rect.top) / s + vb.y];
    }

    function render() {
      var cMath = svgToMath(state.cx, state.cy);
      var imgSvgPts = sampleImage(cMath, SHAPE_R).map(mathToSvg);

      var parts = [];
      parts.push(axesMarkup());
      parts.push('<circle cx="' + state.cx.toFixed(1) + '" cy="' + state.cy.toFixed(1) + '" r="' + (SHAPE_R * SCALE) + '" class="mw-preimage"/>');
      parts.push('<polygon points="' + fmtPts(imgSvgPts) + '" class="mw-image"/>');
      parts.push('<circle class="mw-handle" cx="' + state.cx.toFixed(1) + '" cy="' + state.cy.toFixed(1) + '" r="8"/>');
      parts.push('<circle class="mw-hit" cx="' + state.cx.toFixed(1) + '" cy="' + state.cy.toFixed(1) + '" r="20"/>');
      // Bare symbol only -- see complex_numbers.html's post-ship fix: an
      // on-canvas live number here would risk drifting from the formula
      // box below if the two are ever computed slightly differently.
      parts.push('<text x="' + (state.cx + 10).toFixed(1) + '" y="' + (state.cy - 10).toFixed(1) + '" class="mw-handle-label">c</text>');
      svg.innerHTML = parts.join('');
      wireDrag();
      onChange({ cx: state.cx, cy: state.cy });
    }

    var dragging = false, activePointerId = null;
    function onPointerDown(e) {
      if (!e.target.classList || !e.target.classList.contains('mw-hit')) return;
      dragging = true; activePointerId = e.pointerId;
      e.preventDefault();
    }
    function onPointerMove(e) {
      if (!dragging || e.pointerId !== activePointerId) return;
      var p = clamp(localPointFromClient(e.clientX, e.clientY));
      state.cx = p[0]; state.cy = p[1];
      render();
      e.preventDefault();
    }
    function onPointerUp(e) {
      if (e.pointerId !== activePointerId) return;
      dragging = false; activePointerId = null;
    }
    function wireDrag() {
      var hit = svg.querySelector('.mw-hit');
      hit.removeEventListener('pointerdown', onPointerDown);
      hit.addEventListener('pointerdown', onPointerDown);
    }
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    render();
    return { getC: function () { return { cx: state.cx, cy: state.cy }; } };
  }

  return {
    create: createInversionWidget,
    _test: {
      invert: invert,
      imageCircle: imageCircle,
      svgToMath: svgToMath,
      SCALE: SCALE, SHAPE_R: SHAPE_R, MIN_C: MIN_C, MAX_C: MAX_C
    }
  };
})();
</script>

<script>
(function () {
  var el = document.getElementById('widget-inversion');
  var cEl = document.getElementById('inv-c');
  var imgEl = document.getElementById('inv-image');

  // katex.min.js is <script defer>; wait for window 'load' before calling
  // katex.render directly (same reason as the earlier two materials).
  function init() {
    if (!el || !cEl || !imgEl || !window.InversionWidget || !window.katex) return;

    function fmtComplex(z) {
      var sign = z.im < 0 ? '-' : '+';
      return z.re.toFixed(2) + ' ' + sign + ' ' + Math.abs(z.im).toFixed(2) + 'i';
    }

    function update(state) {
      var c = InversionWidget._test.svgToMath(state.cx, state.cy);
      var img = InversionWidget._test.imageCircle(c, InversionWidget._test.SHAPE_R);
      var mag = Math.hypot(c.re, c.im);
      katex.render('c \\approx ' + fmtComplex(c) + ',\\quad |c| \\approx ' + mag.toFixed(2), cEl, { throwOnError: false });
      katex.render('c\' \\approx ' + fmtComplex(img.c) + ',\\quad r\' \\approx ' + img.r.toFixed(2), imgEl, { throwOnError: false });
    }

    var widget = InversionWidget.create(el, { onChange: update });
    update(widget.getC());
  }
  window.addEventListener('load', init);
})();
</script>
```

- [ ] **Step 5: Run the test again to confirm it passes**

Run: `cd ~/MATH/homepage && node /tmp/claude-1000/-home-nkrishelie-MATH-homepage/318b6e91-642c-4433-96fb-9515cf835df6/scratchpad/inversion-widget-math.test.mjs`
Expected: `PASS` for all cases (2 + 5 + 1 = 8 assertions), ending
`All tests passed`, exit code 0.

- [ ] **Step 6: Verify in browser**

Run: `cd ~/MATH/homepage && npm run dev`, open
`http://localhost:3000/Materials/conformal_maps.html`.

Expected: the widget shows axes, a dashed pale circle (radius 25px) at the
handle, and a solid blue 120-point polygon (the image) that visibly looks
like a perfect circle; on load (default handle at SVG `(-35,25)`) the two
formula boxes show `c ≈ -1.40 - 1.00i, |c| ≈ 1.72` and
`c' ≈ -0.71 + 0.51i, r' ≈ 0.51`; dragging the handle toward the ring's inner
edge visibly grows the image circle, dragging toward the outer edge shrinks
it; the image never leaves the visible canvas at any reachable handle
position; the handle cannot be dragged closer than the ring's inner radius
or farther than its outer radius (only its angle changes past those
points).

- [ ] **Step 7: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/conformal_maps.html
git commit -m "$(cat <<'EOF'
Add InversionWidget and §3: inversion sends circles to circles

Full algebraic derivation on the page (circle equation z*conj(z) - ...
= 0, substitute z=1/w, compare coefficients) of the closed-form image
circle, cross-verified test-first against 120-point direct sampling
for five off-axis centers (not just the real-axis special case) to
1e-9. Widget clamps the draggable center to a ring (1.3 <= |c| <= 4)
-- a new clamp shape for this series -- chosen and verified so the
image never leaves the 150x110 frame at any reachable angle, checked
by a full angular sweep in the test, not just the analytically-argued
worst case.
EOF
)"
```

---

## Task 4: §4 "Дробно-линейные преобразования"

**Files:**
- Modify: `public/Materials/conformal_maps.html`
- Verification (scratchpad, not committed):
  `/tmp/claude-1000/-home-nkrishelie-MATH-homepage/318b6e91-642c-4433-96fb-9515cf835df6/scratchpad/mobius-decomposition.mjs`

**Interfaces:**
- Consumes: the similarity result from §1 and the inversion theorem from
  §3 (referenced by name in the prose, no code interface — this section is
  prose+formulas, no interactivity).
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Verify the decomposition identity numerically before writing the prose**

Create
`/tmp/claude-1000/-home-nkrishelie-MATH-homepage/318b6e91-642c-4433-96fb-9515cf835df6/scratchpad/mobius-decomposition.mjs`:

```js
function mul(a, b) { return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re }; }
function add(a, b) { return { re: a.re + b.re, im: a.im + b.im }; }
function sub(a, b) { return { re: a.re - b.re, im: a.im - b.im }; }
function div(a, b) { var d = b.re * b.re + b.im * b.im; return { re: (a.re * b.re + a.im * b.im) / d, im: (a.im * b.re - a.re * b.im) / d }; }

function mobiusDirect(a, b, c, d, z) {
  return div(add(mul(a, z), b), add(mul(c, z), d));
}
// w = a/c + [(bc-ad)/c^2] * 1/(z + d/c)  -- translate by d/c, invert,
// scale-rotate by (bc-ad)/c^2, translate by a/c.
function mobiusDecomposed(a, b, c, d, z) {
  var shifted = add(z, div(d, c));
  var inverted = div({ re: 1, im: 0 }, shifted);
  var coeff = div(sub(mul(b, c), mul(a, d)), mul(c, c));
  var scaled = mul(coeff, inverted);
  return add(div(a, c), scaled);
}

var cases = [
  { a: { re: 2, im: 1 }, b: { re: 0, im: 1 }, c: { re: 1, im: 0 }, d: { re: 1, im: 1 } },
  { a: { re: 1, im: 0 }, b: { re: 2, im: -1 }, c: { re: 1, im: 1 }, d: { re: 0, im: 2 } },
  { a: { re: -1, im: 3 }, b: { re: 1, im: 0 }, c: { re: 2, im: -1 }, d: { re: 1, im: 1 } }
];
var points = [{ re: 3, im: 1 }, { re: -1, im: 2 }, { re: 0.5, im: -0.3 }];

var maxErr = 0;
cases.forEach(function (p, i) {
  points.forEach(function (z) {
    var direct = mobiusDirect(p.a, p.b, p.c, p.d, z);
    var decomp = mobiusDecomposed(p.a, p.b, p.c, p.d, z);
    var err = Math.hypot(direct.re - decomp.re, direct.im - decomp.im);
    maxErr = Math.max(maxErr, err);
    console.log(
      'case ' + i + ', z=(' + z.re + ',' + z.im + '): direct=(' + direct.re.toFixed(6) + ',' + direct.im.toFixed(6) + ')' +
      ' decomposed=(' + decomp.re.toFixed(6) + ',' + decomp.im.toFixed(6) + ') error=' + err.toExponential(2)
    );
  });
});
console.log('\nmax error across all cases:', maxErr.toExponential(2));
if (maxErr > 1e-9) { console.error('DECOMPOSITION IDENTITY DOES NOT HOLD'); process.exit(1); }
console.log('Decomposition identity confirmed.');
```

Run: `node /tmp/claude-1000/-home-nkrishelie-MATH-homepage/318b6e91-642c-4433-96fb-9515cf835df6/scratchpad/mobius-decomposition.mjs`
Expected: `max error across all cases:` on the order of `1e-15` or smaller
(floating-point noise only), ending `Decomposition identity confirmed.`,
exit code 0. **Do not proceed to Step 2 if this fails or errors are larger
than floating-point noise** — that would mean the algebra written into the
page in Step 2 is wrong.

- [ ] **Step 2: Add §4 markup**

Insert before `<p class="page-footer">`:

```html
<section id="sec-mobius">
  <h2>4. Дробно-линейные преобразования</h2>
  <p class="lead">Функция $\displaystyle w=\frac{az+b}{cz+d}$, $a,b,c,d\in\C$, $ad-bc\ne0$, называется <strong>дробно-линейным</strong> (или <strong>Мёбиусовым</strong>) преобразованием. Условие $ad-bc\ne0$ — это в точности условие того, что $w$ не вырождается в постоянную функцию.</p>
  <p>При $c=0$ преобразование — это просто $w=(a/d)z+(b/d)$, подобие; окружности и прямые переходят в окружности и прямые тривиально (материал «<a href="/Materials/complex_numbers.html">Комплексные числа: три конструкции одного поля</a>»).</p>
  <p>При $c\ne0$ поделим числитель на знаменатель:</p>
  <p>$$\frac{az+b}{cz+d}=\frac ac+\frac{bc-ad}{c^2}\cdot\frac1{z+d/c}$$</p>
  <p>(проверяется раскрытием скобок: $\frac ac(cz+d)+\frac{bc-ad}c=az+\frac{ad}c+\frac{bc-ad}c=az+b$). Правая часть — это перенос на $d/c$, затем инверсия, затем поворотная гомотетия с коэффициентом $(bc-ad)/c^2$ (ненулевым ровно при $ad-bc\ne0$), затем перенос на $a/c$.</p>
  <p>Перенос и подобие переводят окружности и прямые в окружности и прямые тривиально (материал 1); инверсия — по теореме из §3. Композиция преобразований с этим свойством снова обладает этим свойством, поэтому и любое дробно-линейное преобразование переводит окружности и прямые в окружности и прямые — без отдельного доказательства для общего случая.</p>
  <p>Как композиция регулярных функций (перенос, инверсия и подобие регулярны и конформны везде, где определены), дробно-линейное преобразование регулярно и конформно на всей области определения — то есть всюду, кроме точки $z=-d/c$ (при $c\ne0$), где знаменатель обращается в ноль.</p>
</section>
```

- [ ] **Step 3: Verify in browser**

Run: `cd ~/MATH/homepage && npm run dev`, open
`http://localhost:3000/Materials/conformal_maps.html`.

Expected: §4 renders below §3; the decomposition formula and the polynomial-
division check render correctly via KaTeX; the link to
`/Materials/complex_numbers.html` works; TOC entry for §4 scrolls correctly.

- [ ] **Step 4: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/conformal_maps.html
git commit -m "$(cat <<'EOF'
Add §4: Mobius transformations as translate+invert+similarity

The circle/line-preservation theorem for general Mobius maps falls
out for free from Sec.1's similarity result and Sec.3's inversion
theorem via the decomposition (az+b)/(cz+d) = a/c + [(bc-ad)/c^2] *
1/(z+d/c) -- verified numerically for three (a,b,c,d) tuples and
three points each before writing the prose (max error ~1e-15,
floating-point noise only), not derived on paper and trusted.
EOF
)"
```

---

## Task 5: §5 "Заключение" (closing section)

**Files:**
- Modify: `public/Materials/conformal_maps.html`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Add §5 markup**

Insert before `<p class="page-footer">`:

```html
<section id="sec-conclusion">
  <h2>5. Заключение</h2>
  <p class="lead">Три материала этой серии прошли путь от алгебры к геометрии через анализ. Сначала — три равносильные конструкции поля ℂ и открытие, что умножение на число — это поворотная гомотетия (материал «<a href="/Materials/complex_numbers.html">Комплексные числа: три конструкции одного поля</a>»). Затем — что значит быть дифференцируемой функцией комплексного переменного и почему это условие оказалось на удивление жёстким: регулярность влечёт представимость рядом Тейлора, единственность продолжения, интегральную теорему и формулу Коши (материал «<a href="/Materials/complex_regularity.html">Регулярные функции</a>»).</p>
  <p>И, наконец, здесь — что регулярность означает геометрически: в каждой точке, где производная не равна нулю, функция ведёт себя как подобие «в бесконечно малом», а значит сохраняет углы между кривыми. Инверсия и её потомки, дробно-линейные преобразования, показывают это свойство в чистом виде — на примере, который можно провести явно от определения до готовой формулы.</p>
</section>
```

- [ ] **Step 2: Verify in browser**

Run: `cd ~/MATH/homepage && npm run dev`, open
`http://localhost:3000/Materials/conformal_maps.html`.

Expected: §5 renders below §4 with both paragraphs; both links work; all
five TOC links work end-to-end now; the page ends with §5 and the footer —
**confirm there is no dangling "продолжение следует" style teaser anywhere
on the page** (this is the last material in the series, unlike the first
two, which each ended with an open question).

- [ ] **Step 3: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/conformal_maps.html
git commit -m "$(cat <<'EOF'
Add §5: closing reflection (series conclusion)

Unlike the first two materials' §4/§5, this does not tease a
"material 4" -- there isn't one planned. A genuine look back across
the arc: field construction and similarities, then regularity and its
analytic consequences, then what regularity means geometrically.
EOF
)"
```

---

## Task 6: Link forward to `conformal_maps.html` from `complex_regularity.html`

**Files:**
- Modify: `public/Materials/complex_regularity.html`

**Interfaces:**
- Consumes: `public/Materials/conformal_maps.html` must already exist
  (Tasks 1–5 done).
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Insert the link**

In `public/Materials/complex_regularity.html`, find this paragraph (§5
"Что дальше"):

```html
  <p>У подобия есть характерное свойство — сохранение углов между пересекающимися прямыми. Что из этого следует для кривых, проходящих через $z_0$, и как это использовать для явного построения геометрических отображений плоскости — тема отдельного материала.</p>
```

Replace it so the paragraph reads:

```html
  <p>У подобия есть характерное свойство — сохранение углов между пересекающимися прямыми. Что из этого следует для кривых, проходящих через $z_0$, и как это использовать для явного построения геометрических отображений плоскости — разбирается в материале «<a href="/Materials/conformal_maps.html">Конформность и дробно-линейные преобразования</a>».</p>
```

- [ ] **Step 2: Verify in browser**

Run: `cd ~/MATH/homepage && npm run dev`, open
`http://localhost:3000/Materials/complex_regularity.html#sec-next`.

Expected: §5's closing paragraph now ends with a working link to
`/Materials/conformal_maps.html`.

- [ ] **Step 3: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/complex_regularity.html
git commit -m "$(cat <<'EOF'
Link forward to conformal_maps.html from the open question

complex_regularity.html's §5 asked what angle-preservation implies
for curves through z0 -- conformal_maps.html now answers it,
completing the series. Same reciprocal-link pattern as the earlier
material-1 -> material-2 link, added the same day the target ships.
EOF
)"
```

---

## Task 7: Site integration (taxonomy, manifest, news, sitemap)

**Files:**
- Modify: `public/Materials/_taxonomy.json`
- Modify: `data/materials.generated.ts` (via script, not by hand)
- Modify: `public/news.html`
- Modify: `public/news_en.html`
- Modify: `public/sitemap.xml`

**Interfaces:**
- Consumes: `public/Materials/conformal_maps.html` must already exist
  (Tasks 1–5 done).
- Produces: nothing later tasks depend on (final task).

- [ ] **Step 1: Register the file in `_taxonomy.json`**

In `public/Materials/_taxonomy.json`, inside `"fileCategory"`, add this line
right after `"complex_regularity.html": "analysis",`:

```json
    "conformal_maps.html": "analysis",
```

Inside `"fileLanguage"`, add this line right after
`"complex_regularity.html": "ru",`:

```json
    "conformal_maps.html": "ru",
```

- [ ] **Step 2: Regenerate the manifest**

Run: `cd ~/MATH/homepage && node scripts/generate-materials-manifest.mjs`

Then run: `grep -A5 '"conformal_maps.html"' data/materials.generated.ts`
Expected output includes:

```
    "filename": "conformal_maps.html",
    "href": "/Materials/conformal_maps.html",
    "title": "Конформность и дробно-линейные преобразования",
    "category": "analysis",
    "lang": "ru"
```

- [ ] **Step 3: Add the news.html entry**

In `public/news.html`, insert this `<li>` as the **first** item inside
`<ul class="feed">`. Use today's actual date in `DD.MM` form (check it, do
not assume it's still the date from earlier in this series):

```html
  <li>
    <span class="date">DD.MM</span>
    <div class="entry"><p>Добавлен материал «<a href="/Materials/conformal_maps.html">Конформность и дробно-линейные преобразования</a>» — регулярность как подобие в бесконечно малом, вывод конформности, доказательство того, что инверсия переводит окружности в окружности, дробно-линейные преобразования как её композиция с подобиями. Третий, заключительный материал серии — от построения ℂ до конформных отображений.</p></div>
  </li>
```

- [ ] **Step 4: Add the news_en.html entry**

In `public/news_en.html`, insert this `<li>` as the **first** item inside
`<ul class="feed">`, matching the RU-only-material pattern already used
twice in this series (translated title, link to the RU file,
`<span class="lang">RU</span>` badge). Date format is `"Mon D"`
(no zero-padding), matching today's actual date:

```html
  <li>
    <span class="date">Mon D</span>
    <div class="entry"><p>Added "<a href="/Materials/conformal_maps.html">Conformality and Fractional-Linear Transformations<span class="lang">RU</span></a>" — regularity as local similarity, a derivation of conformality, a proof that inversion sends circles to circles, and Mobius transformations as its composition with similarities. Third and final material in the series, from constructing ℂ to conformal mappings.</p></div>
  </li>
```

- [ ] **Step 5: Add the sitemap.xml entry**

In `public/sitemap.xml`, find this block:

```xml
   <url>
      <loc>https://mathem.at/Materials/complex_regularity.html</loc>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
   </url>
```

Insert this new block immediately after it:

```xml
   <url>
      <loc>https://mathem.at/Materials/conformal_maps.html</loc>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
   </url>
```

- [ ] **Step 6: Final full-page verification**

Run: `cd ~/MATH/homepage && npm run build` (this repo has no test suite —
build is the closest verification gate). Then `npm run dev` and open
`http://localhost:3000/Materials/conformal_maps.html` and
`http://localhost:3000/#materials`.

Expected: build succeeds with no errors, `dist/Materials/conformal_maps.html`
exists; on the materials listing page, "Конформность и дробно-линейные
преобразования" appears under "Математический анализ" alongside the other
two `complex_*.html` materials and `math_analysis_levels.html`; opening it
shows all five sections working end-to-end, including the widget;
`complex_regularity.html#sec-next` shows the new forward link; `news.html`
and `news_en.html` both show the new entry at the top of the 2026 list;
`python3 -c "import xml.etree.ElementTree as ET; ET.parse('public/sitemap.xml')"`
confirms the sitemap is still well-formed XML;
`python3 -c "import json; json.load(open('public/Materials/_taxonomy.json'))"`
confirms the taxonomy is still well-formed JSON. **Also run the full-page
KaTeX validation sweep** (see [[homepage-workflow-and-verification]] for
the throwaway-katex-install pattern) across `conformal_maps.html` — every
formula, not just the ones with `\R`/`\C` in them, should parse without
error.

- [ ] **Step 7: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/_taxonomy.json data/materials.generated.ts public/news.html public/news_en.html public/sitemap.xml
git commit -m "$(cat <<'EOF'
Register conformal_maps.html in the site: taxonomy, manifest, news, sitemap

Category "analysis" (fourth entry, alongside math_analysis_levels.html,
complex_numbers.html, complex_regularity.html), RU-only. News entries
in both feeds -- news_en.html tags it RU-only, matching the precedent
from the first two materials in the series. This completes the
three-part analysis series.
EOF
)"
```
