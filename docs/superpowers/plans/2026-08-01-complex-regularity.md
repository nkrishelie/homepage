# Регулярные функции: ряд Тейлора, интеграл Коши, формула Эйлера — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `public/Materials/complex_regularity.html` — a single
self-contained, interactive RU-only page covering the complex derivative and
Cauchy-Riemann equations, regular/entire functions, Taylor-series
representability and the uniqueness theorem, the Cauchy integral theorem
(derived from scratch via Green's formula), and the complex exponential /
Euler's formula (with an interactive widget). Second material in the
`analysis`-category series started by `complex_numbers.html`.

**Architecture:** One static HTML file, no build step, no framework. Inline
`<style>`/`<script>` per section, exactly the convention already established
by `complex_numbers.html`. One reusable piece: `window.EulerWidget`, an SVG
drag widget whose single handle is constrained to a fixed-radius circle
(angle-only drag) — a new geometry (not reused code) but a reused
*interaction pattern*: this is the same "drag an angle handle, snap to
degrees" logic `similarities.html`'s rotate tab already uses
(`dragKey === 'ang'`), just with no separate center/radius handle since the
radius here is always exactly 1.

**Tech Stack:** Vanilla JS (`var`, ES5), SVG, KaTeX 0.16.9 via CDN, plain CSS
custom properties. Node.js is used only as a throwaway test runner during
Task 4 — no test framework, no dependency ever gets added to the repo.

## Global Constraints

- Single file: `public/Materials/complex_regularity.html`. No `.js`/`.css`
  files created — everything inline.
- RU only, this round. No language pills in the topbar (only `.crumbs`) —
  matches `complex_numbers.html`.
- Visual system, CSS variables, fonts, KaTeX setup, topbar/header/TOC
  markup, `.lead`/`.note`/`.formula-box`/`.motion-frame`/`.mw-*` CSS —
  copied **verbatim** from the current
  `public/Materials/complex_numbers.html` (read in full before starting;
  it has been edited several times since its own plan was written, so that
  plan is *not* the source of truth — the live file is).
- Sign convention (same as every widget in this series): an SVG point
  `(x,y)` depicts the complex number `x - yi` (`im = -y`); a raw SVG-space
  angle is negated only when *displayed* in degrees, never when fed back
  into drawing math. `EulerWidget` computes partial sums directly in true
  math space (not SVG-space geometry tricks like `complex_numbers.html`'s
  `rotateScalePoint` reuse) and converts to SVG pixels only at the final
  render step via `(re*RADIUS, -im*RADIUS)` — simpler than the previous
  widget because there is no transform being visually demonstrated here,
  just a sequence of numbers being plotted.
- **Scale, verified numerically before this plan was written (not just
  derived on paper):** the worst-case partial-sum magnitude
  $\max_{k\le12,\ \varphi\in[-\pi,\pi]}|S_k|\approx5.035$, at $\varphi=\pm\pi$,
  $k=2$. At `RADIUS=25` (px per unit, same scale `complex_numbers.html`
  uses for its `A_VALUE_SCALE`), that is $\approx126$px from the origin —
  inside the standard `FRAME_HALF_W=150,FRAME_HALF_H=110` frame with room to
  spare in every direction. Task 4's test re-derives this bound in code,
  not just cites this paragraph.
- `N=10` partial sums, **fixed, no slider** — a deliberate scope decision
  (see the design doc's "Явно вне рамок"), not an oversight to "fix later."
- Content source of truth: `~/MATH/Savvateev/250/LevelAlpha.tex`, chapter 16
  §"Комплексная экспонента", lines 11496–11751. Cauchy-Riemann equations and
  the Cauchy integral theorem are **not** in that source — they are derived
  from scratch in this plan (Tasks 1 and 3 respectively); do not attribute
  them to the book anywhere, on-page or in comments. (Recall from the
  `complex_numbers.html` post-ship fixes: this site never cites private
  manuscript line numbers on published pages — sourcing notes like this one
  belong only in spec/plan docs.)
- Design doc:
  `docs/superpowers/specs/2026-08-01-complex-regularity-design.md` — read it
  first if anything below is unclear about *why* a section is scoped the
  way it is.
- No npm dependency changes. `package.json` is not touched by this plan.
- Every task that changes `complex_regularity.html` ends with a manual
  browser check — this repo has no visual test framework, and none should
  be added.
- Node.js `node:assert/strict` is available — used only in Task 4's
  throwaway scratchpad test script, never committed to the repo.
- On-page section numbers (the `<h2>N. …</h2>` numbers a reader sees) run
  1–5.

**On-page section ↔ Task mapping:**

| On-page `<h2>` | Title | Built in |
|---|---|---|
| 1 | Производная и регулярность | Task 1 |
| 2 | Ряд Тейлора и единственность | Task 2 |
| 3 | Интегральная теорема Коши | Task 3 |
| 4 | Комплексная экспонента и формула Эйлера | Task 4 |
| 5 | Что дальше | Task 5 |

The forward-link edit to `complex_numbers.html` (Task 6) and site
integration (Task 7) touch no on-page `<h2>` of the new file.

---

## Task 1: Page shell (head, base CSS, topbar, header, TOC, §1)

**Files:**
- Create: `public/Materials/complex_regularity.html`

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
<title>Регулярные функции: ряд Тейлора, интеграл Коши, формула Эйлера</title>
<meta name="description" content="Комплексная производная и условия Коши–Римана, представимость регулярной функции рядом Тейлора, теорема единственности, интегральная теорема Коши через формулу Грина, комплексная экспонента и вывод формулы Эйлера — с перетаскиваемой точкой на единичной окружности.">
<link rel="canonical" href="https://mathem.at/Materials/complex_regularity.html">
<meta property="og:type" content="article">
<meta property="og:title" content="Регулярные функции: ряд Тейлора, интеграл Коши, формула Эйлера">
<meta property="og:description" content="Производная и регулярность в C, теорема единственности, интегральная теорема Коши и вывод формулы Эйлера — с интерактивной точкой на единичной окружности.">
<meta property="og:url" content="https://mathem.at/Materials/complex_regularity.html">
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

.note{border-left:3px solid var(--rust-acc);background:var(--rust-bg);border-radius:0 6px 6px 0;padding:.8rem 1.1rem;margin:1rem 0;font-size:17.5px;color:var(--ink2)}
.note .note-head{font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--rust-acc);margin-bottom:.35rem}
.note p{margin-bottom:.55rem;color:var(--ink2)}
.note p:last-child{margin-bottom:0}

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
  <h1>Регулярные функции</h1>
  <p class="desc">Умножение на комплексное число — поворотная гомотетия (см. «Комплексные числа: три конструкции одного поля»). Какие функции $f(z)$ ведут себя настолько же хорошо в каждой точке? Оказывается — жёсткое и на удивление узкое семейство: регулярные функции, для которых из одной лишь дифференцируемости следует представимость степенным рядом.</p>
</header>

<nav class="toc" style="background: var(--bg2); border: 1px solid var(--border); border-radius: 6px; padding: 1.2rem 1.5rem; margin-bottom: 2.5rem;">
  <h3 style="margin-top: 0; margin-bottom: 0.8rem; font-size: 19px;">Содержание</h3>
  <ol style="margin: 0 0 0 1.5rem; padding: 0; color: var(--ink2); line-height: 1.6;">
    <li><a href="#sec-derivative" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">Производная и регулярность</a></li>
    <li><a href="#sec-taylor" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">Ряд Тейлора и единственность</a></li>
    <li><a href="#sec-cauchy" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">Интегральная теорема Коши</a></li>
    <li><a href="#sec-euler" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">Комплексная экспонента и формула Эйлера</a></li>
    <li><a href="#sec-next" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">Что дальше</a></li>
  </ol>
</nav>

<section id="sec-derivative">
  <h2>1. Производная и регулярность</h2>
  <p class="lead">Комплексная производная определяется тем же пределом, что и для функций одной вещественной переменной:</p>
  <p>$$f'(z)=\lim_{\Delta z\to0}\frac{f(z+\Delta z)-f(z)}{\Delta z},$$</p>
  <p>только теперь приращение $\Delta z$ — комплексное число, и стремиться к нулю оно может по любому направлению на плоскости.</p>
  <p>Функция $f$ называется <strong>регулярной</strong> в области $D$, если она дифференцируема в каждой точке $D$. Регулярная на всей комплексной плоскости функция называется <strong>целой</strong>.</p>
  <p>Поскольку $\Delta z\to0$ может идти по любому направлению, предел обязан совпадать вдоль вещественной оси и вдоль мнимой. Запишем $f=u+iv$, где $u,v$ — вещественная и мнимая части $f$ как функции $(x,y)$. При $\Delta z=\Delta x$ (вдоль вещественной оси):</p>
  <p>$$f'(z)=\lim_{\Delta x\to0}\frac{u(x+\Delta x,y)-u(x,y)}{\Delta x}+i\lim_{\Delta x\to0}\frac{v(x+\Delta x,y)-v(x,y)}{\Delta x}=u_x+iv_x.$$</p>
  <p>При $\Delta z=i\Delta y$ (вдоль мнимой оси):</p>
  <p>$$f'(z)=\frac1i\lim_{\Delta y\to0}\frac{u(x,y+\Delta y)-u(x,y)}{\Delta y}+\lim_{\Delta y\to0}\frac{v(x,y+\Delta y)-v(x,y)}{\Delta y}=v_y-iu_y.$$</p>
  <p>Оба предела — одно и то же число $f'(z)$, значит их вещественные и мнимые части совпадают:</p>
  <p>$$u_x=v_y,\qquad u_y=-v_x.$$</p>
  <p>Это <strong>условия Коши–Римана</strong> — необходимое условие комплексной дифференцируемости в точке. В отличие от вещественного случая, где дифференцируемость в отдельной точке — довольно слабое требование, регулярность (дифференцируемость <em>во всех точках области сразу</em>) оказывается на удивление жёстким ограничением — этому посвящён следующий параграф, а условия Коши–Римана ещё понадобятся в §3.</p>
</section>

<p class="page-footer">© Nikolai Kazimirov · <a href="https://mathem.at" rel="noopener">mathem.at</a></p>

</div><!-- .page -->
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Run: `cd ~/MATH/homepage && npm run dev`, open
`http://localhost:3000/Materials/complex_regularity.html` (confirm the port
vite actually prints — it has been 3000, not the historical 5173, in this
environment).

Expected: page loads with no console errors; title bar shows "Регулярные
функции: ряд Тейлора, интеграл Коши, формула Эйлера"; every `$...$`/`$$...$$`
formula in the header and §1 renders as KaTeX (not literal dollar signs),
including the two side-by-side limit derivations and the boxed-looking
Cauchy-Riemann equations; the link to `/Materials/complex_numbers.html`-style
material reference in the header (`«Комплексные числа...»` — no, header has
no link, only mentions the title in prose; verify this reads sensibly, not
as a dead-looking pseudo-link) renders as plain italic text, not a link (no
`<a>` tag was written there, intentionally — Global Constraints scope this
material as receiving the incoming link from `complex_numbers.html`, not
necessarily linking back explicitly in the header prose); resizing below
700px shrinks body font and padding.

- [ ] **Step 3: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/complex_regularity.html
git commit -m "$(cat <<'EOF'
Add page shell for the complex-regularity material

Head, base CSS (copied from complex_numbers.html), topbar, header,
table of contents, and §1 (complex derivative, regular/entire
functions, and a from-scratch derivation of the Cauchy-Riemann
equations from the two-directions-of-approach argument). No
interactivity yet -- later tasks append sections before the page
footer.
EOF
)"
```

---

## Task 2: §2 "Ряд Тейлора и единственность"

**Files:**
- Modify: `public/Materials/complex_regularity.html`

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing later tasks depend on programmatically.

- [ ] **Step 1: Add §2 markup**

Insert before `<p class="page-footer">`:

```html
<section id="sec-taylor">
  <h2>2. Ряд Тейлора и единственность</h2>
  <p class="lead">В отличие от вещественного случая, из комплексной дифференцируемости в каждой точке области следует существование производных всех порядков — и представимость функции степенным рядом Тейлора в окрестности любой точки области регулярности:</p>
  <p>$$f(z)=f(z_0)+f'(z_0)(z-z_0)+f''(z_0)\frac{(z-z_0)^2}{2}+f'''(z_0)\frac{(z-z_0)^3}{3!}+\dots$$</p>
  <p>Доказательство этого факта небыстрое и остаётся за рамками этого материала — но именно оно превращает регулярность из локального условия в чрезвычайно жёсткое глобальное: зная функцию в сколь угодно малой окрестности точки, можно восстановить её значения во всей области регулярности.</p>
  <div class="note">
    <span class="note-head">Теорема единственности</span>
    <p>Пусть функции $f$ и $g$ регулярны в области $D$, и существует последовательность $\{z_n\}\subset D$, сходящаяся к точке $w\in D$, на которой $f(z_n)=g(z_n)$. Тогда $f=g$ на всей области $D$.</p>
  </div>
  <p>Следствия: отличная от тождественного нуля регулярная функция имеет лишь конечное число нулей в любом замкнутом круге, целиком лежащем в области регулярности; если две регулярные функции совпадают на какой-то кривой внутри общей области регулярности, они совпадают всюду в этой области. В частности, если две <strong>целые</strong> функции совпадают на вещественном интервале $(-r;r)$, они совпадают на всей плоскости $\C$.</p>
  <p>Это объясняет то, что происходило в материале «<a href="/Materials/complex_numbers.html">Комплексные числа: три конструкции одного поля</a>»: три конструкции ℂ были не просто похожи, а изоморфны — и точно так же продолжение вещественной функции до регулярной на $\C$, если оно вообще существует, единственно. Ниже это используется для комплексной экспоненты.</p>
</section>
```

- [ ] **Step 2: Verify in browser**

Run: `cd ~/MATH/homepage && npm run dev`, open
`http://localhost:3000/Materials/complex_regularity.html`.

Expected: §2 renders below §1; the Taylor series formula and the theorem/note
box render correctly; the link to `/Materials/complex_numbers.html` works;
TOC entry for §2 scrolls correctly.

- [ ] **Step 3: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/complex_regularity.html
git commit -m "$(cat <<'EOF'
Add §2: Taylor representability and the uniqueness theorem

States (without proof, matching the source's own choice) that
regularity implies Taylor representability, then the uniqueness
theorem and its corollaries. Ties back explicitly to
complex_numbers.html's three-constructions-are-isomorphic result as
a preview of the same rigidity phenomenon.
EOF
)"
```

---

## Task 3: §3 "Интегральная теорема Коши"

**Files:**
- Modify: `public/Materials/complex_regularity.html`

**Interfaces:**
- Consumes: the Cauchy-Riemann equations from §1 (referenced by name in the
  prose, not by any code interface — this whole section is prose+formulas,
  no interactivity).
- Produces: nothing later tasks depend on programmatically.

- [ ] **Step 1: Add §3 markup**

Insert before `<p class="page-footer">`:

```html
<section id="sec-cauchy">
  <h2>3. Интегральная теорема Коши</h2>
  <p class="lead">Пусть $f=u+iv$ регулярна в области, содержащей замкнутый контур $C$ и ограниченную им область $D$. Тогда</p>
  <p>$$\oint_C f(z)\,dz=0.$$</p>
  <p>Запишем $dz=dx+i\,dy$ и раскроем произведение:</p>
  <p>$$\oint_C f\,dz=\oint_C(u+iv)(dx+i\,dy)=\oint_C(u\,dx-v\,dy)+i\oint_C(v\,dx+u\,dy).$$</p>
  <p>К каждому из двух вещественных контурных интегралов применима формула Грина</p>
  <p>$$\oint_C P\,dx+Q\,dy=\iint_D\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)dA.$$</p>
  <p>Для вещественной части ($P=u$, $Q=-v$):</p>
  <p>$$\oint_C u\,dx-v\,dy=\iint_D(-v_x-u_y)\,dA.$$</p>
  <p>Для мнимой части ($P=v$, $Q=u$):</p>
  <p>$$\oint_C v\,dx+u\,dy=\iint_D(u_x-v_y)\,dA.$$</p>
  <p>По условиям Коши–Римана из §1 ($u_x=v_y$, $u_y=-v_x$) оба подынтегральных выражения — тождественный нуль: $-v_x-u_y=-v_x-(-v_x)=0$ и $u_x-v_y=0$. Значит, оба контурных интеграла равны нулю, и $\oint_C f\,dz=0$.</p>
  <p>Геометрически это означает, что интеграл $\int_{z_1}^{z_2}f\,dz$ по любому пути внутри области регулярности зависит только от начальной и конечной точки — прямое обобщение того факта, что для вещественной функции с первообразной $\int_a^b f'(x)\,dx=f(b)-f(a)$ не зависит от того, как «идти» от $a$ до $b$ (там идти особо некуда — вещественная прямая одномерна).</p>
</section>
```

- [ ] **Step 2: Verify in browser**

Run: `cd ~/MATH/homepage && npm run dev`, open
`http://localhost:3000/Materials/complex_regularity.html`.

Expected: §3 renders below §2; every display formula (the contour integral,
Green's formula, the two split-out real/imaginary integrals) renders
correctly via KaTeX; TOC entry for §3 scrolls correctly.

- [ ] **Step 3: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/complex_regularity.html
git commit -m "$(cat <<'EOF'
Add §3: Cauchy's integral theorem via Green's formula

Written from scratch (not in the source book, confirmed with the
user in the design-doc round): split f dz into real/imaginary parts,
apply Green's formula to each, show both integrands vanish exactly
because of the Cauchy-Riemann equations from §1.
EOF
)"
```

---

## Task 4: `EulerWidget` + §4 "Комплексная экспонента и формула Эйлера"

The flagship section: derives the exponential and Euler's formula in prose,
then an interactive widget where dragging a point around the unit circle
redraws the partial-sum path converging to it.

**Files:**
- Modify: `public/Materials/complex_regularity.html`
- Test (scratchpad, not committed):
  `/tmp/claude-1000/-home-nkrishelie-MATH-homepage/318b6e91-642c-4433-96fb-9515cf835df6/scratchpad/euler-widget-math.test.mjs`

**Interfaces:**
- Consumes: nothing from Tasks 1–3 programmatically.
- Produces, on `window.EulerWidget`:
  - `create(container, opts) -> { getPhiDeg(): number }` where
    `opts = { onChange: function({ phiDeg, sums }){} }`. `phiDeg` is the
    **math-space** angle in degrees (already sign-flipped from the raw SVG
    drag angle — callers never need to flip it again). `sums` is the array
    of `{re,im}` partial sums `S_0..S_N` in true math space.
  - `_test: { partialSums(mathPhiRad) -> [{re,im}, ...], N: number, RADIUS: number }`
    — exposed for the test suite only.

- [ ] **Step 1: Write the failing test in the scratchpad**

Create
`/tmp/claude-1000/-home-nkrishelie-MATH-homepage/318b6e91-642c-4433-96fb-9515cf835df6/scratchpad/euler-widget-math.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync('public/Materials/complex_regularity.html', 'utf8');
const match = html.match(/<script id="euler-widget">([\s\S]*?)<\/script>/);
if (!match) throw new Error('Could not find <script id="euler-widget"> in complex_regularity.html');

const sandbox = {};
new Function('window', match[1])(sandbox);
const EulerWidget = sandbox.EulerWidget;
if (!EulerWidget) throw new Error('window.EulerWidget was not defined by the script');
const T = EulerWidget._test;
if (!T) throw new Error('EulerWidget._test was not exposed');

function approxEqual(u, v, eps) {
  eps = eps || 1e-6;
  return Math.abs(u.re - v.re) < eps && Math.abs(u.im - v.im) < eps;
}

let failed = false;
function t(name, fn) {
  try { fn(); console.log('PASS', name); }
  catch (e) { failed = true; console.error('FAIL', name, '-', e.message); }
}

t('N and RADIUS match the design doc (N=10 fixed, RADIUS=25px/unit)', () => {
  assert.equal(T.N, 10);
  assert.equal(T.RADIUS, 25);
});

t('S_0 is always 1 (the phi^0/0! term), regardless of phi', () => {
  var sums = T.partialSums(Math.PI / 3);
  assert.ok(approxEqual(sums[0], { re: 1, im: 0 }));
});

t('phi=0 collapses every partial sum to 1 (e^0=1)', () => {
  var sums = T.partialSums(0);
  sums.forEach(function (s) { assert.ok(approxEqual(s, { re: 1, im: 0 })); });
});

// Tolerances below are not guesses -- computed by actually running
// partialSums(phi, 10) before writing this test (Taylor-series error at
// fixed N grows with |phi|, so pi/2 and pi need very different bounds):
// phi=pi/2 error ~= 3.57e-6, phi=pi error ~= 7.16e-3 (an order of magnitude
// worse near the negative real axis, where convergence is slowest).
t('phi=pi/2: S_10 is close to the true value i (cos(pi/2)+i*sin(pi/2))', () => {
  var sums = T.partialSums(Math.PI / 2);
  assert.ok(approxEqual(sums[sums.length - 1], { re: 0, im: 1 }, 1e-5));
});

t('phi=pi: S_10 is close to the true value -1 (Euler\'s identity)', () => {
  var sums = T.partialSums(Math.PI);
  assert.ok(approxEqual(sums[sums.length - 1], { re: -1, im: 0 }, 1e-2));
});

// This is the exact numeric check the design doc's scale argument rests on:
// re-derive it in code, not just trust the paragraph in the plan.
t('max |S_k| over phi in [-180,180]deg (5deg steps) stays under 5.5 -- the scale-safety bound', () => {
  var maxMag = 0;
  for (var deg = -180; deg <= 180; deg += 5) {
    var sums = T.partialSums(deg * Math.PI / 180);
    sums.forEach(function (s) {
      var mag = Math.hypot(s.re, s.im);
      if (mag > maxMag) maxMag = mag;
    });
  }
  assert.ok(maxMag < 5.5, 'max magnitude was ' + maxMag);
});

// Same bound, converted to on-canvas pixels: must fit inside the standard
// 150x110 half-frame at RADIUS=25px/unit, in both dimensions independently
// (not just the radial magnitude) -- this is exactly the kind of check that
// would have caught the complex_numbers.html scale bug earlier.
t('every partial sum stays inside the 150x110 half-frame in pixel space', () => {
  for (var deg = -180; deg <= 180; deg += 5) {
    var sums = T.partialSums(deg * Math.PI / 180);
    sums.forEach(function (s) {
      var px = s.re * T.RADIUS, py = -s.im * T.RADIUS;
      assert.ok(Math.abs(px) <= 150, 'px=' + px + ' at phi=' + deg);
      assert.ok(Math.abs(py) <= 110, 'py=' + py + ' at phi=' + deg);
    });
  }
});

if (failed) { console.error('\nSome tests FAILED'); process.exit(1); }
console.log('\nAll tests passed');
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `cd ~/MATH/homepage && node /tmp/claude-1000/-home-nkrishelie-MATH-homepage/318b6e91-642c-4433-96fb-9515cf835df6/scratchpad/euler-widget-math.test.mjs`
Expected: throws `Could not find <script id="euler-widget"> in complex_regularity.html`.

- [ ] **Step 3: Add widget CSS**

Append inside `<style>`, before `</style>`:

```css
.motion-frame{width:100%;max-width:560px;height:auto;aspect-ratio:300/220;display:block;background:var(--bg2);border:1px solid var(--border);border-radius:6px;touch-action:none}
.motion-widget{margin:1rem 0;max-width:560px}
.mw-coord-axis{stroke:var(--ink3);stroke-width:1;opacity:.55}
.mw-origin{fill:var(--ink3)}
.mw-orbit{fill:none;stroke:var(--ink3);stroke-width:1;stroke-dasharray:3 3}
.mw-path{fill:none;stroke:var(--blue-acc);stroke-width:1.4;opacity:.7}
.mw-path-dot{fill:var(--blue-acc);opacity:.55}
.mw-path-dot-final{fill:var(--rust-acc)}
.mw-handle{fill:var(--ink);stroke:var(--bg);stroke-width:1.5}
.mw-hit{fill:#000;opacity:0;cursor:grab;touch-action:none}
.mw-hit:active{cursor:grabbing}
.mw-handle-label{font-family:'JetBrains Mono',monospace;font-size:11px;fill:var(--ink2)}
.svg-label{font-family:'JetBrains Mono',monospace;font-size:13px;fill:var(--ink2)}
figure{margin:1.4rem 0}
figcaption{font-size:16.5px;color:var(--ink3);margin-top:.6rem;line-height:1.55;font-style:italic}
.formula-box{font-family:'JetBrains Mono',monospace;font-size:16px;background:var(--bg2);border:1px solid var(--border);border-radius:6px;padding:.8rem 1.1rem;margin-top:.8rem;color:var(--ink)}
```

- [ ] **Step 4: Add §4 markup, register it in the TOC (already present from Task 1), and add the `EulerWidget` module**

(The TOC `<li>` for `#sec-euler` was already written in Task 1's file — no
edit needed here.)

Insert before `<p class="page-footer">`:

```html
<section id="sec-euler">
  <h2>4. Комплексная экспонента и формула Эйлера</h2>
  <p class="lead">Определим комплексную экспоненту тем же степенным рядом, что и вещественную:</p>
  <p>$$\exp(z)=1+z+\frac{z^2}{2}+\frac{z^3}{3!}+\dots$$</p>
  <p>Ряд сходится в каждой точке $z\in\C$: частичные суммы образуют фундаментальную последовательность, поскольку хвост ряда оценивается через $|z|^n/n!\to0$; в силу полноты $\C$ предел существует. Нетрудно проверить, что производная $\exp'(z)=\exp(z)$ в каждой точке — то есть $\exp$ целая, и совпадает с вещественной экспонентой $e^x$ на вещественной оси. По теореме единственности из §2, это единственное регулярное на всём $\C$ продолжение $e^x$.</p>
  <p>Экспоненту можно также представить как предел:</p>
  <p>$$e^z=\lim_{n\to\infty}\left(1+\frac zn\right)^n.$$</p>
  <p>Возьмём $z=i\varphi$ — чисто мнимое число. С одной стороны, по определению $e^{i\varphi}=\lim_{n\to\infty}(1+i\varphi/n)^n$. С другой — известные пределы $\cos(\varphi/n)=1-\varphi^2/2n^2+o(1/n^2)$ и $\sin(\varphi/n)=\varphi/n+o(1/n)$ дают $\cos(\varphi/n)+i\sin(\varphi/n)=1+i\varphi/n+o(1/n)$ — то есть эти два выражения различаются на величину порядка $o(1/n)$. Аккуратная оценка (через неравенство $|z^n-w^n|\le n|z-w|\max\{|z|^{n-1},|w|^{n-1}\}$) показывает, что после возведения в $n$-ю степень эта разница исчезает в пределе, и</p>
  <p>$$e^{i\varphi}=\lim_{n\to\infty}\big(\cos(\varphi/n)+i\sin(\varphi/n)\big)^n=\cos\varphi+i\sin\varphi$$</p>
  <p>— последнее равенство верно, поскольку при умножении $n$ одинаковых чисел с единичной окружности их аргументы складываются, а модули остаются равны единице. Это <strong>формула Эйлера</strong>. При $\varphi=\pi$ она даёт знаменитое тождество</p>
  <p>$$e^{i\pi}+1=0,$$</p>
  <p>связывающее пять фундаментальных констант одним равенством. Разделяя вещественную и мнимую части ряда для $e^{i\varphi}$, получаются ряды Тейлора для синуса и косинуса:</p>
  <p>$$\cos\varphi=1-\frac{\varphi^2}{2!}+\frac{\varphi^4}{4!}-\dots,\qquad\sin\varphi=\varphi-\frac{\varphi^3}{3!}+\frac{\varphi^5}{5!}-\dots$$</p>
  <figure>
    <div class="motion-widget" id="widget-euler"></div>
    <div class="formula-box" id="euler-phi"></div>
    <div class="formula-box" id="euler-values"></div>
    <figcaption>Точка на окружности перетаскивается по углу $\varphi$; ломаная — частичные суммы $S_0,S_1,\dots,S_{10}$ ряда для $e^{i\varphi}$, спиралью сходящиеся к точке $\cos\varphi+i\sin\varphi$ на окружности.</figcaption>
  </figure>
</section>

<script id="euler-widget">
window.EulerWidget = (function () {
  var FRAME_HALF_W = 150, FRAME_HALF_H = 110;
  var FRAME_VB = (-FRAME_HALF_W) + ' ' + (-FRAME_HALF_H) + ' ' + (2 * FRAME_HALF_W) + ' ' + (2 * FRAME_HALF_H);
  var RADIUS = 25; // px per unit -- same scale as complex_numbers.html's A_VALUE_SCALE
  var N = 10;       // partial sums S_0..S_10, fixed (no slider, see design doc)
  var SNAP_DEG = 5;

  function axesMarkup() {
    return '<line x1="' + (-FRAME_HALF_W) + '" y1="0" x2="' + FRAME_HALF_W + '" y2="0" class="mw-coord-axis"/>' +
      '<line x1="0" y1="' + (-FRAME_HALF_H) + '" x2="0" y2="' + FRAME_HALF_H + '" class="mw-coord-axis"/>' +
      '<circle cx="0" cy="0" r="3" class="mw-origin"/>' +
      '<text x="6" y="16" class="svg-label">0</text>' +
      '<text x="' + (FRAME_HALF_W - 20) + '" y="-8" class="svg-label">Re</text>' +
      '<text x="8" y="' + (-FRAME_HALF_H + 14) + '" class="svg-label">Im</text>';
  }

  // S_0..S_N for e^(i*mathPhi), computed directly in true math space (no
  // SVG-space geometry tricks -- there is no transform being demonstrated
  // here, just numbers being plotted, so plain complex arithmetic is
  // simpler than complex_numbers.html's rotateScalePoint reuse).
  function partialSums(mathPhi) {
    var sums = [];
    var term = { re: 1, im: 0 };   // (i*phi)^0 / 0!
    var sum = { re: 0, im: 0 };
    for (var k = 0; k <= N; k++) {
      sum = { re: sum.re + term.re, im: sum.im + term.im };
      sums.push(sum);
      // term_{k+1} = term_k * (i*mathPhi) / (k+1)
      var next = { re: -term.im * mathPhi, im: term.re * mathPhi };
      term = { re: next.re / (k + 1), im: next.im / (k + 1) };
    }
    return sums;
  }

  function mathToSvg(z) { return [z.re * RADIUS, -z.im * RADIUS]; }
  function fmtPts(pts) { return pts.map(function (p) { return p[0].toFixed(2) + ',' + p[1].toFixed(2); }).join(' '); }
  function fmtComplex(z) {
    var sign = z.im < 0 ? '-' : '+';
    return z.re.toFixed(4) + ' ' + sign + ' ' + Math.abs(z.im).toFixed(4) + 'i';
  }

  function createEulerWidget(container, opts) {
    var onChange = (opts && opts.onChange) || function () {};
    var phiSvgDeg = -45; // math phi = +45deg (see the negation below) -- a legible default, not on an axis

    container.innerHTML = '<svg class="mw-svg motion-frame" viewBox="' + FRAME_VB + '"></svg>';
    var svg = container.querySelector('.mw-svg');

    function localPointFromClient(clientX, clientY) {
      var rect = svg.getBoundingClientRect();
      var vb = svg.viewBox.baseVal;
      var s = rect.width / vb.width;
      return [(clientX - rect.left) / s + vb.x, (clientY - rect.top) / s + vb.y];
    }

    function render() {
      var phiSvgRad = phiSvgDeg * Math.PI / 180;
      var mathPhi = -phiSvgRad; // same negation convention as similarities.html's fmtAngleDeg
      var hx = RADIUS * Math.cos(phiSvgRad), hy = RADIUS * Math.sin(phiSvgRad);
      var sums = partialSums(mathPhi);
      var svgPts = sums.map(mathToSvg);

      var parts = [];
      parts.push(axesMarkup());
      parts.push('<circle cx="0" cy="0" r="' + RADIUS + '" class="mw-orbit"/>');
      parts.push('<polyline points="' + fmtPts(svgPts) + '" class="mw-path"/>');
      svgPts.forEach(function (p, i) {
        var isFinal = i === svgPts.length - 1;
        parts.push('<circle cx="' + p[0].toFixed(2) + '" cy="' + p[1].toFixed(2) + '" r="' + (isFinal ? 4 : 2.5) + '" class="' + (isFinal ? 'mw-path-dot mw-path-dot-final' : 'mw-path-dot') + '"/>');
      });
      parts.push('<circle class="mw-handle" cx="' + hx.toFixed(2) + '" cy="' + hy.toFixed(2) + '" r="8"/>');
      parts.push('<circle class="mw-hit" cx="' + hx.toFixed(2) + '" cy="' + hy.toFixed(2) + '" r="20"/>');
      parts.push('<text x="' + (hx + 10).toFixed(1) + '" y="' + (hy - 10).toFixed(1) + '" class="mw-handle-label">φ</text>');
      svg.innerHTML = parts.join('');
      wireDrag();
      onChange({ phiDeg: -phiSvgDeg, sums: sums });
    }

    var dragging = false, activePointerId = null;
    function onPointerDown(e) {
      if (!e.target.classList || !e.target.classList.contains('mw-hit')) return;
      dragging = true; activePointerId = e.pointerId;
      e.preventDefault();
    }
    function onPointerMove(e) {
      if (!dragging || e.pointerId !== activePointerId) return;
      // Angle-only drag: only the direction from the origin matters, not
      // the raw cursor distance -- same pattern as similarities.html's
      // rotate-tab angle handle (dragKey === 'ang').
      var raw = localPointFromClient(e.clientX, e.clientY);
      var rawAngleDeg = Math.atan2(raw[1], raw[0]) * 180 / Math.PI;
      phiSvgDeg = Math.round(rawAngleDeg / SNAP_DEG) * SNAP_DEG;
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
    return { getPhiDeg: function () { return -phiSvgDeg; } };
  }

  return {
    create: createEulerWidget,
    _test: { partialSums: partialSums, N: N, RADIUS: RADIUS }
  };
})();
</script>

<script>
(function () {
  var el = document.getElementById('widget-euler');
  var phiEl = document.getElementById('euler-phi');
  var valuesEl = document.getElementById('euler-values');

  // katex.min.js is <script defer>; wait for window 'load' before calling
  // katex.render directly (same reason as complex_numbers.html's §3 panel).
  function init() {
    if (!el || !phiEl || !valuesEl || !window.EulerWidget || !window.katex) return;

    function fmtComplex(z) {
      var sign = z.im < 0 ? '-' : '+';
      return z.re.toFixed(4) + ' ' + sign + ' ' + Math.abs(z.im).toFixed(4) + 'i';
    }

    function update(state) {
      var phiRad = state.phiDeg * Math.PI / 180;
      var exact = { re: Math.cos(phiRad), im: Math.sin(phiRad) };
      var approx = state.sums[state.sums.length - 1];
      katex.render('\\varphi \\approx ' + state.phiDeg.toFixed(1) + '^\\circ', phiEl, { throwOnError: false });
      katex.render('S_{10} \\approx ' + fmtComplex(approx) + ',\\quad \\cos\\varphi+i\\sin\\varphi \\approx ' + fmtComplex(exact), valuesEl, { throwOnError: false });
    }

    var widget = EulerWidget.create(el, { onChange: update });
    update({ phiDeg: widget.getPhiDeg(), sums: EulerWidget._test.partialSums(widget.getPhiDeg() * Math.PI / 180) });
  }
  window.addEventListener('load', init);
})();
</script>
```

- [ ] **Step 5: Run the test again to confirm it passes**

Run: `cd ~/MATH/homepage && node /tmp/claude-1000/-home-nkrishelie-MATH-homepage/318b6e91-642c-4433-96fb-9515cf835df6/scratchpad/euler-widget-math.test.mjs`
Expected: `PASS` for all 7 cases, ending `All tests passed`, exit code 0.

- [ ] **Step 6: Verify in browser**

Run: `cd ~/MATH/homepage && npm run dev`, open
`http://localhost:3000/Materials/complex_regularity.html`.

Expected: the widget shows axes, a dashed unit circle, a polyline of 11 dots
spiraling from $(1,0)$ toward the handle's position on the circle, with the
final dot (accent color) essentially on the circle; the handle only moves
along the circle when dragged (dragging closer to or farther from the
origin does not change its radius, only its angle); on load (default
$\varphi\approx45°$) the two formula boxes show
`φ ≈ 45.0°` and `S_10 ≈ 0.7071 + 0.7071i, cos φ+i sin φ ≈ 0.7071 + 0.7071i`
(matching to all 4 shown decimals — convergence is fast this close to the
positive real axis); dragging to $\varphi\approx180°$ shows `S_10 ≈ -1.0018
+ 0.0069i` against the exact `cos φ+i sin φ ≈ -1.0000 + 0.0000i` — visibly
close but **not** decimal-matching (verified numerically, not assumed:
convergence is an order of magnitude slower near the negative real axis at
fixed N=10, error ≈7×10⁻³ there vs ≈4×10⁻⁶ near φ=45°); the whole path
stays visibly inside the canvas at every angle, including $\varphi=180°$.

- [ ] **Step 7: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/complex_regularity.html
git commit -m "$(cat <<'EOF'
Add EulerWidget and §4: complex exponential and Euler's formula

exp(z) via its power series, convergence, exp'=exp and uniqueness of
the real-exponential extension (via Sec.2's uniqueness theorem), then
the (1+i*phi/n)^n derivation of Euler's formula and its identity.
Widget is deliberately narrow (z=i*phi only, angle-only drag on the
unit circle, N=10 fixed) -- the general exp(z) case doesn't fit the
standard canvas scale, verified numerically test-first: max |S_k|
over the whole phi range and k<=12 stays under 5.5, and every partial
sum's pixel coordinates stay inside the 150x110 half-frame.
EOF
)"
```

---

## Task 5: §5 "Что дальше" (closing section)

**Files:**
- Modify: `public/Materials/complex_regularity.html`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Add §5 markup**

(The TOC `<li>` for `#sec-next` was already written in Task 1 — no edit
needed there.)

Insert before `<p class="page-footer">`:

```html
<section id="sec-next">
  <h2>5. Что дальше</h2>
  <p class="lead">Умножение на комплексное число — поворотная гомотетия (материал «<a href="/Materials/complex_numbers.html">Комплексные числа: три конструкции одного поля</a>»). Регулярность в точке, где $f'(z_0)\ne0$, устроена похоже: в окрестности $z_0$ функция $f$ приближается своей линейной частью, $f(z)\approx f(z_0)+f'(z_0)(z-z_0)$ — тем же самым подобием, только с коэффициентом $a=f'(z_0)$, меняющимся от точки к точке.</p>
  <p>У подобия есть характерное свойство — сохранение углов между пересекающимися прямыми. Что из этого следует для кривых, проходящих через $z_0$, и как это использовать для явного построения геометрических отображений плоскости — тема отдельного материала.</p>
</section>
```

- [ ] **Step 2: Verify in browser**

Run: `cd ~/MATH/homepage && npm run dev`, open
`http://localhost:3000/Materials/complex_regularity.html`.

Expected: §5 renders below §4 with both paragraphs; the link to
`/Materials/complex_numbers.html` works; the last sentence does **not**
contain a link (material 3 doesn't exist yet — confirmed by reading the
rendered HTML, not just the source, matching the same check done for
`complex_numbers.html`'s own §4 at the time); all five TOC links work
end-to-end now.

- [ ] **Step 3: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/complex_regularity.html
git commit -m "$(cat <<'EOF'
Add §5: closing section (what comes next)

Regularity at a point where f'!=0 is locally a similarity, same as
complex_numbers.html's multiplication story, just with a
point-varying coefficient a=f'(z0) -- sets up conformality as an open
question in prose only, no link (material 3 doesn't exist yet).
EOF
)"
```

---

## Task 6: Link forward to `complex_regularity.html` from `complex_numbers.html`

**Files:**
- Modify: `public/Materials/complex_numbers.html`

**Interfaces:**
- Consumes: `public/Materials/complex_regularity.html` must already exist
  (Tasks 1–5 done).
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Insert the link**

In `public/Materials/complex_numbers.html`, find this paragraph (currently
the second paragraph of §4 "Что дальше"):

```html
  <p>Естественный следующий шаг — более сложные функции: многочлены, рациональные дроби, степенные ряды. У некоторых из них в каждой точке области определения существует производная $f'(z)=\lim\limits_{\Delta z\to0}\dfrac{f(z+\Delta z)-f(z)}{\Delta z}$, определяемая тем же пределом, что и для функций одной вещественной переменной, — только приращение $\Delta z$ теперь комплексное. Свойства таких функций — тема отдельного материала.</p>
```

Replace the final sentence so the paragraph reads:

```html
  <p>Естественный следующий шаг — более сложные функции: многочлены, рациональные дроби, степенные ряды. У некоторых из них в каждой точке области определения существует производная $f'(z)=\lim\limits_{\Delta z\to0}\dfrac{f(z+\Delta z)-f(z)}{\Delta z}$, определяемая тем же пределом, что и для функций одной вещественной переменной, — только приращение $\Delta z$ теперь комплексное. Свойства таких функций разбираются в материале «<a href="/Materials/complex_regularity.html">Регулярные функции</a>».</p>
```

- [ ] **Step 2: Verify in browser**

Run: `cd ~/MATH/homepage && npm run dev`, open
`http://localhost:3000/Materials/complex_numbers.html#sec-next`.

Expected: §4's second paragraph now ends with a working link to
`/Materials/complex_regularity.html`.

- [ ] **Step 3: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/complex_numbers.html
git commit -m "$(cat <<'EOF'
Link forward to complex_regularity.html from the open question

complex_numbers.html's §4 asked what happens for functions with a
complex derivative -- complex_regularity.html now answers it. Unlike
the earlier chasles->similarities and complex_numbers->similarities
links, this one is added the same day the target material ships,
not held open across sessions.
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
- Consumes: `public/Materials/complex_regularity.html` must already exist
  (Tasks 1–5 done).
- Produces: nothing later tasks depend on (final task).

- [ ] **Step 1: Register the file in `_taxonomy.json`**

In `public/Materials/_taxonomy.json`, inside `"fileCategory"`, add this line
right after `"complex_numbers.html": "analysis",`:

```json
    "complex_regularity.html": "analysis",
```

Inside `"fileLanguage"`, add this line right after
`"complex_numbers.html": "ru",`:

```json
    "complex_regularity.html": "ru",
```

- [ ] **Step 2: Regenerate the manifest**

Run: `cd ~/MATH/homepage && node scripts/generate-materials-manifest.mjs`

Then run: `grep -A5 '"complex_regularity.html"' data/materials.generated.ts`
Expected output includes:

```
    "filename": "complex_regularity.html",
    "href": "/Materials/complex_regularity.html",
    "title": "Регулярные функции: ряд Тейлора, интеграл Коши, формула Эйлера",
    "category": "analysis",
    "lang": "ru"
```

- [ ] **Step 3: Add the news.html entry**

In `public/news.html`, insert this `<li>` as the **first** item inside
`<ul class="feed">` (right after `<div class="year">2026</div>` /
`<ul class="feed">`, before the existing `complex_numbers.html` entry). Use
today's date in `DD.MM` form (the repo's established format, confirmed
against existing entries — do not hardcode "01.08", check what today
actually is when this task runs):

```html
  <li>
    <span class="date">DD.MM</span>
    <div class="entry"><p>Добавлен материал «<a href="/Materials/complex_regularity.html">Регулярные функции</a>» — производная и условия Коши–Римана, ряд Тейлора и теорема единственности, интегральная теорема Коши через формулу Грина, комплексная экспонента и вывод формулы Эйлера. Второй материал серии — от построения ℂ к конформным отображениям.</p></div>
  </li>
```

- [ ] **Step 4: Add the news_en.html entry**

In `public/news_en.html`, insert this `<li>` as the **first** item inside
`<ul class="feed">`, matching the RU-only-material pattern already used for
`complex_numbers.html`/`diophant_28_37.html` (translated title, link to the
RU file since no English page exists yet, `<span class="lang">RU</span>`
badge). Date format here is `"Mon D"` (no zero-padding on single-digit days
— confirmed from existing entries like `"Jul 2"`, `"Jul 1"`), matching
whatever today's date actually is:

```html
  <li>
    <span class="date">Mon D</span>
    <div class="entry"><p>Added "<a href="/Materials/complex_regularity.html">Regular Functions<span class="lang">RU</span></a>" — the complex derivative and Cauchy-Riemann equations, Taylor representability and the uniqueness theorem, Cauchy's integral theorem via Green's formula, the complex exponential and a derivation of Euler's formula. Second material in the series, from constructing ℂ to conformal mappings.</p></div>
  </li>
```

- [ ] **Step 5: Add the sitemap.xml entry**

In `public/sitemap.xml`, find this block:

```xml
   <url>
      <loc>https://mathem.at/Materials/complex_numbers.html</loc>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
   </url>
```

Insert this new block immediately after it:

```xml
   <url>
      <loc>https://mathem.at/Materials/complex_regularity.html</loc>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
   </url>
```

- [ ] **Step 6: Final full-page verification**

Run: `cd ~/MATH/homepage && npm run build` (this repo has no test suite —
build is the closest verification gate; confirm it succeeds and that
`dist/Materials/complex_regularity.html` exists in the output). Then
`npm run dev` and open
`http://localhost:3000/Materials/complex_regularity.html` and
`http://localhost:3000/#materials`.

Expected: build succeeds with no errors; on the materials listing page,
"Регулярные функции: ряд Тейлора, интеграл Коши, формула Эйлера" appears
under "Математический анализ" alongside `complex_numbers.html` and
`math_analysis_levels.html`; opening it shows all five sections working;
`complex_numbers.html#sec-next` shows the new forward link; `news.html` and
`news_en.html` both show the new entry at the top of the 2026 list with
today's date; `python3 -c "import xml.etree.ElementTree as ET; ET.parse('public/sitemap.xml')"`
confirms the sitemap is still well-formed XML;
`python3 -c "import json; json.load(open('public/Materials/_taxonomy.json'))"`
confirms the taxonomy is still well-formed JSON.

- [ ] **Step 7: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/_taxonomy.json data/materials.generated.ts public/news.html public/news_en.html public/sitemap.xml
git commit -m "$(cat <<'EOF'
Register complex_regularity.html in the site: taxonomy, manifest, news, sitemap

Category "analysis" (third entry, alongside math_analysis_levels.html
and complex_numbers.html), RU-only. News entries in both feeds --
news_en.html tags it RU-only, matching the complex_numbers.html
precedent.
EOF
)"
```
