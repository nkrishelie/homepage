# Комплексные числа: три конструкции одного поля — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `public/Materials/complex_numbers.html` — a single self-contained,
interactive RU-only page building ℂ three ways (R² with arithmetic, 2×2 real
matrices, R[x]/(x²+1)) and showing that multiplication by a fixed complex
number $a$ is exactly the rotational homothety already explained in
`similarities.html`. First material in a new three-part `analysis` series
(ℂ construction → regularity → conformal mappings); this plan builds only
part 1.

**Architecture:** One static HTML file, no build step, no framework. Inline
`<style>` and inline `<script>` blocks per section, exactly the convention
`chasles.html`/`similarities.html` already use. One reusable piece: a
drag-widget factory (`window.ComplexWidget`) that reuses
`similarities.html`'s `rotateScalePoint` geometry with the center hard-locked
at the origin (no draggable center, no tabs, no `k` slider — the single drag
handle *is* the complex number $a$, so its position already encodes both
angle and scale). Everything else is direct markup.

**Tech Stack:** Vanilla JS (`var`, no modules, no arrow functions — matching
`chasles.html`/`similarities.html`'s current code exactly), SVG for graphics,
KaTeX 0.16.9 via CDN, plain CSS custom properties. Node.js is used only as a
throwaway test runner during Task 3 — no test framework, no dependency ever
gets added to the repo.

## Global Constraints

- Single file for the new material: `public/Materials/complex_numbers.html`.
  No `.js`/`.css` files created — everything inline, matching every file in
  `public/Materials/`.
- RU only, this round. No `complex_numbers_en.html`. No language pills in the
  topbar (only `.crumbs`) — matches how `chasles.html`/`similarities.html`
  looked before their own English versions were added later.
- Visual system copied **verbatim** (variables, fonts, KaTeX setup) from
  `public/Materials/similarities.html`; card system copied **verbatim** (CSS
  class names) from `public/Materials/math_analysis_levels.html`'s
  `.lang-card`/`.axioms-btn`/`.axioms-panel` family, simplified from a
  per-level switcher to one shared toggle panel (this material has one
  dictionary to reveal, not three independent axiom sets).
- Drag pattern: `pointerdown`/`pointermove`/`pointerup`, a **fixed SVG
  viewBox** (`FRAME_HALF_W=150, FRAME_HALF_H=110`), 5-unit grid snapping
  (`SNAP=5`), and the same `flipY`-flavored sign convention already used by
  `similarities.html`'s widget: a screen point `(x,y)` in SVG space depicts
  the complex number `x - yi` (`im = -y`); a stored SVG-space angle is
  negated only when it is *displayed* in degrees (`fmtAngleDeg`), never when
  it is fed back into the rotation math. **This plan's Task 3 proves this
  convention algebraically before writing the test** — do not re-derive it
  ad hoc; the derivation is in Task 3's own notes.
- `window.ComplexWidget`'s core transform is always centered at the SVG
  origin `[0,0]` — unlike `similarities.html`'s `SimilarityWidget`, there is
  **no draggable center and no `k` slider**. The single drag handle's
  position *is* $a$; its distance from the origin is $|a|$, its angle is
  $\arg a$.
- Content source of truth: `~/MATH/Savvateev/250/LevelAlpha.tex` — ch. 12
  §"Алгебра комплексных чисел" (6321–6394) and ch. 13 §"Матрицы и комплексные
  числа" (8431–8501, esp. the theorem at 8493–8501: $w=az$ or $w=a\bar z$ is a
  similarity iff $|a|>0$). $\R[x]/(x^2+1)$ is **not** from the book —
  standard algebra, written from scratch. Do not invent facts beyond what the
  design doc lists.
- Design doc: `docs/superpowers/specs/2026-08-01-complex-numbers-design.md`
  — read it before starting if anything below is unclear about *why*. Notably:
  no ledger of the isomorphism proofs between the three constructions (just a
  worked example, $z=2+3i$, in all three languages); no link forward to a
  "material 2" (it doesn't exist yet — an open question in prose is all §4
  gets, matching how `chasles.html` posed its own open question in prose
  before `similarities.html` existed to answer it).
- No npm dependency changes. `package.json` is not touched by this plan.
- Every task that changes `complex_numbers.html` ends with a manual browser
  check — this repo has no visual test framework, and none should be added.
- Node.js `node:assert/strict` is available — used only in Task 3's
  throwaway scratchpad test script, never committed to the repo.
- On-page section numbers (the `<h2>N. …</h2>` numbers a reader sees) run 1–4.

**On-page section ↔ Task mapping:**

| On-page `<h2>` | Title | Built in |
|---|---|---|
| 1 | Зачем ещё одно число | Task 1 |
| 2 | Три конструкции одного поля | Task 2 |
| 3 | Умножение — это подобие | Task 3 |
| 4 | Что дальше | Task 4 |

The forward-link edit to `similarities.html` (Task 5) and site integration
(Task 6) touch no on-page `<h2>` of the new file.

---

## Task 1: Page shell (head, base CSS, topbar, header, TOC, §1 intro)

**Files:**
- Create: `public/Materials/complex_numbers.html`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: the file itself, with `</body></html>` at the end and an
  **insertion point** every later task uses: insert new
  `<section>…</section>` markup and any new `<script>` block **immediately
  before** the line
  `<p class="page-footer">© Nikolai Kazimirov · <a href="https://mathem.at" rel="noopener">mathem.at</a></p>`.
  New `<style>` rules get appended inside the existing `<style>...</style>`
  block, just before `</style>`. New entries in the `<ol>` inside
  `<nav class="toc">` are appended in reading order as each later section is
  built.

- [ ] **Step 1: Write the file**

```html
<!DOCTYPE html>
<html lang="ru" style="scroll-behavior: smooth;">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Комплексные числа: три конструкции одного поля</title>
<meta name="description" content="R² с покоординатной арифметикой, представление 2×2-матрицами и факторкольцо R[x]/(x²+1) — три равносильных способа построить поле комплексных чисел. Умножение на комплексное число как поворотная гомотетия, с перетаскиваемой точкой.">
<link rel="canonical" href="https://mathem.at/Materials/complex_numbers.html">
<meta property="og:type" content="article">
<meta property="og:title" content="Комплексные числа: три конструкции одного поля">
<meta property="og:description" content="Три равносильных способа построить поле комплексных чисел — и интерактивная демонстрация того, что умножение на комплексное число есть поворотная гомотетия.">
<meta property="og:url" content="https://mathem.at/Materials/complex_numbers.html">
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
  <p class="kicker">Математический анализ · Комплексные числа</p>
  <h1>Три конструкции ℂ</h1>
  <p class="desc">Уравнение $x^2+1=0$ не имеет решений в R — но добавить к R решение можно ровно одним способом (с точностью до переименования), и посмотреть на этот способ можно с трёх разных сторон. А заодно увидеть, что умножение на комплексное число — это в точности та поворотная гомотетия, что уже разобрана в «Подобиях плоскости».</p>
</header>

<nav class="toc" style="background: var(--bg2); border: 1px solid var(--border); border-radius: 6px; padding: 1.2rem 1.5rem; margin-bottom: 2.5rem;">
  <h3 style="margin-top: 0; margin-bottom: 0.8rem; font-size: 19px;">Содержание</h3>
  <ol style="margin: 0 0 0 1.5rem; padding: 0; color: var(--ink2); line-height: 1.6;">
    <li><a href="#sec-intro" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">Зачем ещё одно число</a></li>
    <li><a href="#sec-construction" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">Три конструкции одного поля</a></li>
    <li><a href="#sec-multiplication" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">Умножение — это подобие</a></li>
    <li><a href="#sec-next" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">Что дальше</a></li>
  </ol>
</nav>

<section id="sec-intro">
  <h2>1. Зачем ещё одно число</h2>
  <p class="lead">Уравнение $x^2+1=0$ не имеет решений среди действительных чисел: квадрат любого вещественного числа неотрицателен, поэтому $x^2+1\ge1>0$ всегда. При этом R — уже полное упорядоченное поле (см. <a href="/Materials/math_analysis_levels.html">«Уровни формализации математического анализа»</a>, где разобраны сразу три равносильных способа задать эту полноту аксиоматически).</p>
  <p>Полнота не спасает: она гарантирует существование супремумов и пределов, но не корней многочленов. Единственный выход — расширить R до поля, где $x^2+1=0$ уже решается. Оказывается, сделать это можно (с точностью до переименования) ровно одним способом — но взглянуть на этот способ можно с трёх разных сторон.</p>
</section>

<p class="page-footer">© Nikolai Kazimirov · <a href="https://mathem.at" rel="noopener">mathem.at</a></p>

</div><!-- .page -->
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Run: `cd ~/MATH/homepage && npm run dev`, open
`http://localhost:5173/Materials/complex_numbers.html`.

Expected: page loads with no console errors; title bar shows "Комплексные
числа: три конструкции одного поля"; heading/body use EB Garamond,
crumbs/kicker use JetBrains Mono; every inline `$...$` formula in the header
and §1 renders as italic math (not literal dollar signs); the TOC links to
`#sec-intro` work (the other three TOC entries are dead until Tasks 2–4 add
their sections, that's expected for now); the link to
`/Materials/math_analysis_levels.html` works; resizing below 700px shrinks
body font and page padding per the media query.

- [ ] **Step 3: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/complex_numbers.html
git commit -m "$(cat <<'EOF'
Add page shell for the complex-numbers material

Head, base CSS (copied from similarities.html), topbar, header, table
of contents and the §1 intro (why we need another number). No
interactivity yet -- later tasks append sections before the page
footer.
EOF
)"
```

---

## Task 2: §2 "Три конструкции одного поля" (three cards + isomorphism panel)

**Files:**
- Modify: `public/Materials/complex_numbers.html`

**Interfaces:**
- Consumes: nothing (static content + a self-contained toggle).
- Produces: nothing later tasks depend on programmatically (Task 3's widget
  is independent). Adds one entry to the middle of the TOC `<ol>`.

- [ ] **Step 1: Add card + toggle-panel CSS**

Append inside `<style>`, before `</style>`:

```css
.lang-section-label{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink3);margin-bottom:.8rem}
.lang-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:0.5px solid var(--border);margin-bottom:1rem}
.lang-card{background:var(--bg);padding:1.3rem 1.4rem 1.3rem;display:flex;flex-direction:column;gap:.6rem}
.lang-card.blue{background:var(--blue-bg)} .lang-card.rust{background:var(--rust-bg)} .lang-card.sage{background:var(--sage-bg)}
.lang-card-top{display:flex;flex-direction:column;gap:2px;padding-bottom:.6rem;border-bottom:1px solid rgba(0,0,0,.08)}
.lang-card-num{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}
.blue .lang-card-num{color:var(--blue-acc)} .rust .lang-card-num{color:var(--rust-acc)} .sage .lang-card-num{color:var(--sage-acc)}
.lang-card-name{font-size:16px;font-weight:500;color:var(--ink);line-height:1.25}
.lang-card-sub{font-size:13px;color:var(--ink3);font-style:italic}
.lang-card-tag{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.05em;text-transform:uppercase;padding:2px 8px;border-radius:2px;width:fit-content}
.blue .lang-card-tag{background:rgba(58,95,158,.12);color:var(--blue-acc)}
.rust .lang-card-tag{background:rgba(140,74,50,.12);color:var(--rust-acc)}
.sage .lang-card-tag{background:rgba(46,102,69,.12);color:var(--sage-acc)}
.lang-card-body{font-size:14.5px;color:var(--ink2);line-height:1.62}

.axioms-btn{margin-top:4px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink3);border:0.5px solid var(--border);background:rgba(0,0,0,.03);padding:4px 10px;border-radius:3px;transition:color .15s,background .15s}
.axioms-btn:hover{color:var(--ink2);background:rgba(0,0,0,.06)}
.axioms-btn .arr{display:inline-block;transition:transform .2s;font-size:10px}
.axioms-btn.active .arr{transform:rotate(90deg)}
.axioms-panel{display:none;border:0.5px solid var(--border);border-top:none;background:var(--bg);padding:1.2rem 1.5rem 1.4rem;margin-bottom:1rem}
.axioms-panel.open{display:block}
.axioms-panel p{font-size:14px;color:var(--ink2);margin-top:.8rem}
.ax-panel-title{font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink3);margin-bottom:.9rem}
.ax-panel-title span{color:var(--ink2);font-weight:500}
.ax-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:.9rem 2rem}
.ax-item{margin-bottom:.5rem}
.ax-label{font-family:'JetBrains Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink3);display:block;margin-bottom:3px}
.ax-text{font-size:15px;color:var(--ink2)}
```

Then extend the existing `@media(max-width:700px){...}` block (added in
Task 1) so it reads:

```css
@media(max-width:700px){
  body{font-size:19px}
  .page{padding:1.5rem 1rem 3rem}
  .lang-cards{grid-template-columns:1fr}
  .ax-grid{grid-template-columns:1fr}
}
```

- [ ] **Step 2: Add §2 markup + toggle script, and register it in the TOC**

Insert the new `<li>` right after the `#sec-intro` one inside the `<nav
class="toc">` `<ol>` (added in Task 1):

```html
    <li><a href="#sec-construction" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">Три конструкции одного поля</a></li>
```

Insert this `<section>` before `<p class="page-footer">`:

```html
<section id="sec-construction">
  <h2>2. Три конструкции одного поля</h2>
  <p class="lead">Добавить к R решение уравнения $x^2+1=0$ можно ровно одним способом (с точностью до переименования) — но описать этот способ можно тремя равносильными языками.</p>
  <p class="lang-section-label">Конструкции ℂ</p>
  <div class="lang-cards">

    <div class="lang-card blue">
      <div class="lang-card-top">
        <span class="lang-card-num">Конструкция I</span>
        <span class="lang-card-name">R² с арифметикой</span>
        <span class="lang-card-sub">пары действительных чисел</span>
      </div>
      <span class="lang-card-tag">покоординатная арифметика</span>
      <p class="lang-card-body">Число — это пара $z=(x,y)$. Сложение покоординатное: $(x,y)+(x',y')=(x+x',\,y+y')$. Умножение задаётся отдельно: $(x,y)(x',y')=(xx'-yy',\,xy'+x'y)$. Обозначим $i=(0,1)$: тогда $i\cdot i=(0\cdot0-1\cdot1,\ 0\cdot1+1\cdot0)=(-1,0)$, то есть $i^2=-1$. Записываем пару $(x,y)$ как $x+iy$.</p>
    </div>

    <div class="lang-card rust">
      <div class="lang-card-top">
        <span class="lang-card-num">Конструкция II</span>
        <span class="lang-card-name">Матрицы 2×2</span>
        <span class="lang-card-sub">подкольцо $\mathrm{Mat}_2(\R)$</span>
      </div>
      <span class="lang-card-tag">умножение = линейный оператор</span>
      <p class="lang-card-body">Числу $x+iy$ сопоставим матрицу $\begin{pmatrix}x&-y\\y&x\end{pmatrix}$. Сложение и умножение чисел превращаются в сложение и умножение таких матриц; $i$ соответствует матрице поворота на $90^\circ$ — $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$, и её квадрат $\begin{pmatrix}-1&0\\0&-1\end{pmatrix}=-E$ подтверждает $i^2=-1$. Определитель $x^2+y^2\ne0$ при $(x,y)\ne(0,0)$ — у каждого ненулевого числа есть обратное; сопряжение — это транспонирование.</p>
    </div>

    <div class="lang-card sage">
      <div class="lang-card-top">
        <span class="lang-card-num">Конструкция III</span>
        <span class="lang-card-name">$\R[x]/(x^2+1)$</span>
        <span class="lang-card-sub">классы вычетов многочленов</span>
      </div>
      <span class="lang-card-tag">$i^2=-1$ по построению</span>
      <p class="lang-card-body">Многочлен $x^2+1$ не имеет вещественных корней, поэтому неприводим над R, и факторкольцо $\R[x]/(x^2+1)$ — поле. Обозначим класс $[x]$ буквой $i$: по определению фактора $x^2+1\equiv0$, откуда $i^2=-1$ — это не проверяемый факт, а прямое следствие того, по какому многочлену берётся остаток. Каждый класс однозначно представим многочленом степени меньше 2, то есть выражением $x+iy$.</p>
    </div>

  </div>

  <button type="button" class="axioms-btn" id="iso-toggle"><span class="arr">▶</span> Это один и тот же объект</button>
  <div class="axioms-panel" id="iso-panel">
    <div class="ax-panel-title">Три записи одного и того же числа <span>$z=2+3i$</span></div>
    <div class="ax-grid">
      <div class="ax-item">
        <span class="ax-label">R² с арифметикой</span>
        <span class="ax-text">$(2,3)$</span>
      </div>
      <div class="ax-item">
        <span class="ax-label">Матрица</span>
        <span class="ax-text">$\begin{pmatrix}2&-3\\3&2\end{pmatrix}$</span>
      </div>
      <div class="ax-item">
        <span class="ax-label">Класс вычета</span>
        <span class="ax-text">$2+3x \pmod{x^2+1}$</span>
      </div>
    </div>
    <p>Между любыми двумя из этих языков есть перевод, сохраняющий сложение и умножение (изоморфизм полей) — дальше мы свободно переключаемся между ними, не уточняя каждый раз, в какой из трёх моделей идёт вычисление.</p>
  </div>
</section>

<script>
(function () {
  var btn = document.getElementById('iso-toggle');
  var panel = document.getElementById('iso-panel');
  if (!btn || !panel) return;
  btn.addEventListener('click', function () {
    var open = panel.classList.toggle('open');
    btn.classList.toggle('active', open);
  });
})();
</script>
```

- [ ] **Step 3: Verify in browser**

Run: `cd ~/MATH/homepage && npm run dev`, open
`http://localhost:5173/Materials/complex_numbers.html`.

Expected: three cards render side by side on desktop (stacked on mobile
widths below 700px), each with its coloured top band (blue/rust/sage)
matching `math_analysis_levels.html`'s palette; all formulas inside the cards
render via KaTeX (including the matrix $\begin{pmatrix}\end{pmatrix}$ ones);
clicking "Это один и тот же объект" reveals the panel with the three
representations of $z=2+3i$ (including the KaTeX-rendered matrix and the
mod-expression) and rotates the arrow; clicking again collapses it; the new
TOC entry scrolls to §2.

- [ ] **Step 4: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/complex_numbers.html
git commit -m "$(cat <<'EOF'
Add §2: three constructions of the same field

Three cards (R^2 with arithmetic, 2x2 real matrices, R[x]/(x^2+1)) in
math_analysis_levels.html's visual language, plus a single shared
toggle panel showing z=2+3i written all three ways. Card CSS and the
toggle-button/panel classes are copied by pattern from
math_analysis_levels.html, simplified to one shared panel instead of
its per-level switcher (this material has one dictionary to reveal,
not three independent axiom sets).
EOF
)"
```

---

## Task 3: §3 "Умножение — это подобие" (`ComplexWidget` + live KaTeX panel)

The mathematical core of the page: a draggable point $a$ whose position
directly drives a rotate-and-scale transform of a fixed flag, reusing
`similarities.html`'s `rotateScalePoint` geometry with the center hard-locked
at the origin.

**Files:**
- Modify: `public/Materials/complex_numbers.html`
- Test (scratchpad, not committed):
  `/tmp/claude-1000/-home-nkrishelie-MATH-homepage/318b6e91-642c-4433-96fb-9515cf835df6/scratchpad/complex-widget-math.test.mjs`

**Interfaces:**
- Consumes: nothing from Tasks 1–2.
- Produces, on `window.ComplexWidget`:
  - `create(container, opts) -> { getA(): {ax,ay} }` where `container` is a
    DOM element and `opts = { onChange: function({ax,ay}){} }`. `ax,ay` are
    the drag handle's **SVG-space** coordinates (not yet flipped to math
    space — callers apply `im = -ay` themselves, same convention as
    `similarities.html`).
  - `Z0: [number,number]` — the flag's fixed SVG-space anchor. This is the
    single source of truth for that point: both the live KaTeX panel script
    (below) and the test script read it from here rather than hardcoding
    their own copy.
  - `_test: { svgToMath(x,y) -> {re,im}, multiplyPointSvg(ax,ay,px,py) -> [number,number] }`
    — exposed **only** for Task 3's own test script, not used by the page.

### Sign-convention note (read before writing the test)

`complex_numbers.html` depicts the complex number $x-yi$ at SVG point
$(x,y)$ (same as `similarities.html`: `im = -y`). The widget's core geometry
call is `rotateScalePoint(pt, [0,0], angleSvg, k)` where
`angleSvg = atan2(ay,ax)` and `k = hypot(ax,ay)` come straight from the drag
handle's raw SVG coordinates — no sign flip applied before the rotation
math (only the *displayed* degrees get flipped, via the existing
`fmtAngleDeg` pattern). Algebraically, for any SVG points `(ax,ay)` (handle)
and `(px,py)` (flag vertex), writing `a = svgToMath(ax,ay)` and
`z = svgToMath(px,py)`:

$$\text{svgToMath}\big(\text{rotateScalePoint}([p_x,p_y],[0,0],\operatorname{atan2}(a_y,a_x),\sqrt{a_x^2+a_y^2})\big) = a\cdot z$$

This holds because `rotateScalePoint`'s output is
`(k(p_x\cos\theta - p_y\sin\theta),\ k(p_x\sin\theta+p_y\cos\theta))` with
`\cos\theta=a_x/k,\ \sin\theta=a_y/k`, which expands to
`(a_x p_x - a_y p_y,\ a_x p_y + a_y p_x)`; negating the second coordinate
(the `svgToMath` flip) gives `-a_x p_y - a_y p_x`, which is exactly
`\operatorname{Im}\big((a_x - a_y i)(p_x - p_y i)\big)` — i.e. exactly
`a\cdot z` in math space. Task 3's test checks this numerically, not just on
paper.

- [ ] **Step 1: Write the failing test in the scratchpad**

Create
`/tmp/claude-1000/-home-nkrishelie-MATH-homepage/318b6e91-642c-4433-96fb-9515cf835df6/scratchpad/complex-widget-math.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync('public/Materials/complex_numbers.html', 'utf8');
const match = html.match(/<script id="complex-widget">([\s\S]*?)<\/script>/);
if (!match) throw new Error('Could not find <script id="complex-widget"> in complex_numbers.html');

const sandbox = {};
new Function('window', match[1])(sandbox);
const ComplexWidget = sandbox.ComplexWidget;
if (!ComplexWidget) throw new Error('window.ComplexWidget was not defined by the script');
const T = ComplexWidget._test;
if (!T) throw new Error('ComplexWidget._test was not exposed');
const Z0 = ComplexWidget.Z0;
if (!Z0) throw new Error('ComplexWidget.Z0 was not exposed');

function mul(u, v) {
  return { re: u.re * v.re - u.im * v.im, im: u.re * v.im + u.im * v.re };
}
function approxEqual(u, v, eps) {
  eps = eps || 1e-9;
  return Math.abs(u.re - v.re) < eps && Math.abs(u.im - v.im) < eps;
}

let failed = false;
function t(name, fn) {
  try { fn(); console.log('PASS', name); }
  catch (e) { failed = true; console.error('FAIL', name, '-', e.message); }
}

t('dragging handle a to (50,-50) rotates+scales Z0 exactly like true complex multiplication', () => {
  var a = T.svgToMath(50, -50);
  var z0 = T.svgToMath(Z0[0], Z0[1]);
  var expected = mul(a, z0);
  var imageSvg = T.multiplyPointSvg(50, -50, Z0[0], Z0[1]);
  var imageMath = T.svgToMath(imageSvg[0], imageSvg[1]);
  assert.ok(approxEqual(imageMath, expected));
});

t('pure real a=k (handle on the positive Re axis) is a plain homothety: angle 0, scale k', () => {
  var imageSvg = T.multiplyPointSvg(40, 0, Z0[0], Z0[1]);
  assert.ok(approxEqual({ re: imageSvg[0], im: imageSvg[1] }, { re: Z0[0] * 40, im: Z0[1] * 40 }, 1e-6));
});

t('a = 0 collapses the image onto the origin (0*z = 0 for any z)', () => {
  var imageSvg = T.multiplyPointSvg(0, 0, Z0[0], Z0[1]);
  assert.ok(Math.abs(imageSvg[0]) < 1e-9 && Math.abs(imageSvg[1]) < 1e-9);
});

// Book theorem, LevelAlpha.tex lines 8493-8501: w=az is a rotational
// homothety centered at 0, coefficient |a|, angle arg(a). Also matches the
// ch.12 exercise (lines 6877-6878): z -> alpha*z = homothety(|alpha|) then
// rotation(arg alpha). alpha=3+4i has the exercise's own "nice" numbers:
// |alpha|=5, arg(alpha)=atan2(4,3)~=53.13deg.
t('z -> alpha*z matches the book theorem for alpha=3+4i (ch.12 exercise, lines 6877-6878)', () => {
  var a = T.svgToMath(3, -4); // SVG (3,-4) depicts math 3+4i
  assert.ok(Math.abs(Math.hypot(a.re, a.im) - 5) < 1e-9);
  var z = { re: 7, im: -2 };
  var imageSvg = T.multiplyPointSvg(3, -4, 7, 2); // SVG (7,2) depicts math 7-2i
  var imageMath = T.svgToMath(imageSvg[0], imageSvg[1]);
  assert.ok(approxEqual(imageMath, mul(a, z)));
});

if (failed) { console.error('\nSome tests FAILED'); process.exit(1); }
console.log('\nAll tests passed');
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `cd ~/MATH/homepage && node /tmp/claude-1000/-home-nkrishelie-MATH-homepage/318b6e91-642c-4433-96fb-9515cf835df6/scratchpad/complex-widget-math.test.mjs`
Expected: throws `Could not find <script id="complex-widget"> in complex_numbers.html`.

- [ ] **Step 3: Add widget CSS**

Append inside `<style>`, before `</style>`:

```css
.motion-frame{width:100%;max-width:560px;height:auto;aspect-ratio:300/220;display:block;background:var(--bg2);border:1px solid var(--border);border-radius:6px;touch-action:none}
.motion-widget{margin:1rem 0;max-width:560px}
.mw-flag-ghost{fill:rgba(26,25,23,.08);stroke:var(--ink3);stroke-width:1;stroke-dasharray:3 3}
.mw-flag-solid{fill:rgba(58,95,158,.18);stroke:var(--blue-acc);stroke-width:1.6}
.mw-vector{stroke:var(--blue-acc);stroke-width:2}
.mw-handle{fill:var(--ink);stroke:var(--bg);stroke-width:1.5}
.mw-hit{fill:#000;opacity:0;cursor:grab;touch-action:none}
.mw-hit:active{cursor:grabbing}
.mw-coord-axis{stroke:var(--ink3);stroke-width:1;opacity:.55}
.mw-origin{fill:var(--ink3)}
.mw-handle-label{font-family:'JetBrains Mono',monospace;font-size:11px;fill:var(--ink2)}
figure{margin:1.4rem 0}
figcaption{font-size:16.5px;color:var(--ink3);margin-top:.6rem;line-height:1.55;font-style:italic}
.svg-label{font-family:'JetBrains Mono',monospace;font-size:13px;fill:var(--ink2)}
.formula-box{font-family:'JetBrains Mono',monospace;font-size:16px;background:var(--bg2);border:1px solid var(--border);border-radius:6px;padding:.8rem 1.1rem;margin-top:.8rem;color:var(--ink)}
.note{border-left:3px solid var(--rust-acc);background:var(--rust-bg);border-radius:0 6px 6px 0;padding:.8rem 1.1rem;margin:1rem 0;font-size:17.5px;color:var(--ink2)}
.note .note-head{font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--rust-acc);margin-bottom:.35rem}
.note p{margin-bottom:.55rem;color:var(--ink2)}
.note p:last-child{margin-bottom:0}
```

- [ ] **Step 4: Add §3 markup, register it in the TOC, and add the `ComplexWidget` module**

Insert the new `<li>` right after the `#sec-construction` one inside
`<nav class="toc">`'s `<ol>`:

```html
    <li><a href="#sec-multiplication" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">Умножение — это подобие</a></li>
```

Insert before `<p class="page-footer">`:

```html
<section id="sec-multiplication">
  <h2>3. Умножение — это подобие</h2>
  <p class="lead">Возьмём любое $a\ne0$ и посмотрим на преобразование плоскости $w=az$. Это в точности поворотная гомотетия с центром в нуле: коэффициент растяжения $|a|$, угол поворота $\arg a$ (источник: LevelAlpha.tex, §«Матрицы и комплексные числа», строки 8493–8501) — тот же объект, что уже разобран в <a href="/Materials/similarities.html">«Подобиях плоскости»</a>, только теперь центр всегда закреплён в нуле, а сдвиг $b=0$.</p>
  <figure>
    <div class="motion-widget" id="widget-multiply"></div>
    <div class="formula-box" id="mult-a"></div>
    <div class="formula-box" id="mult-w"></div>
    <figcaption>Перетащите точку $a$ — канва покажет, во что превращается закреплённый флажок $z_0$ при умножении на $a$. Бледный контур — исходное положение $z_0$, синий — образ $w=az_0$.</figcaption>
  </figure>
  <div class="note">
    <span class="note-head">a = 0</span>
    <p>Условие $a\ne0$ существенно: при $a=0$ вся плоскость стягивается в одну точку (в ноль) — это уже не подобие, а вырожденное отображение.</p>
  </div>
</section>

<script id="complex-widget">
window.ComplexWidget = (function () {
  var FRAME_HALF_W = 150, FRAME_HALF_H = 110;
  var CAP_X = 140, CAP_Y = 100;
  var FRAME_VB = (-FRAME_HALF_W) + ' ' + (-FRAME_HALF_H) + ' ' + (2 * FRAME_HALF_W) + ' ' + (2 * FRAME_HALF_H);
  // Same anchor point similarities.html uses for its flag (its ORIGIN
  // constant) -- same flag, now seen under complex multiplication instead
  // of a general similarity.
  var Z0 = [-70, 35];
  var LOCAL_FLAG = [[-2, -28], [-2, 28], [2, 28], [2, -12], [20, -20], [2, -28]];

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
  function flagPoints(anchor, angle) {
    var a = angle || 0, cos = Math.cos(a), sin = Math.sin(a);
    return LOCAL_FLAG.map(function (p) {
      return [p[0] * cos - p[1] * sin + anchor[0], p[0] * sin + p[1] * cos + anchor[1]];
    });
  }
  function fmtPts(pts) {
    return pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ');
  }
  function axesMarkup() {
    return '<line x1="' + (-FRAME_HALF_W) + '" y1="0" x2="' + FRAME_HALF_W + '" y2="0" class="mw-coord-axis"/>' +
      '<line x1="0" y1="' + (-FRAME_HALF_H) + '" x2="0" y2="' + FRAME_HALF_H + '" class="mw-coord-axis"/>' +
      '<circle cx="0" cy="0" r="3" class="mw-origin"/>' +
      '<text x="6" y="16" class="svg-label">0</text>' +
      '<text x="' + (FRAME_HALF_W - 20) + '" y="-8" class="svg-label">Re</text>' +
      '<text x="8" y="' + (-FRAME_HALF_H + 14) + '" class="svg-label">Im</text>';
  }
  // Identical to similarities.html's rotateScalePoint (SimilarityWidget) --
  // here the center c is always [0,0], never dragged.
  function rotateScalePoint(pt, c, ang, k) {
    var dx = (pt[0] - c[0]) * k, dy = (pt[1] - c[1]) * k;
    var cos = Math.cos(ang), sin = Math.sin(ang);
    return [c[0] + dx * cos - dy * sin, c[1] + dx * sin + dy * cos];
  }
  function multiplyPointSvg(ax, ay, px, py) {
    return rotateScalePoint([px, py], [0, 0], Math.atan2(ay, ax), Math.hypot(ax, ay));
  }
  function imageOfZ0(ax, ay) {
    return flagPoints(Z0, 0).map(function (pt) { return multiplyPointSvg(ax, ay, pt[0], pt[1]); });
  }

  function createComplexWidget(container, opts) {
    var onChange = (opts && opts.onChange) || function () {};
    var state = { ax: 50, ay: -50 };

    container.innerHTML = '<svg class="mw-svg motion-frame" viewBox="' + FRAME_VB + '"></svg>';
    var svg = container.querySelector('.mw-svg');

    function localPointFromClient(clientX, clientY) {
      var rect = svg.getBoundingClientRect();
      var vb = svg.viewBox.baseVal;
      var s = rect.width / vb.width;
      return [(clientX - rect.left) / s + vb.x, (clientY - rect.top) / s + vb.y];
    }

    function render() {
      var parts = [];
      parts.push(axesMarkup());
      parts.push('<line x1="0" y1="0" x2="' + state.ax.toFixed(1) + '" y2="' + state.ay.toFixed(1) + '" class="mw-vector"/>');
      parts.push('<polygon points="' + fmtPts(flagPoints(Z0, 0)) + '" class="mw-flag-ghost"/>');
      parts.push('<polygon points="' + fmtPts(imageOfZ0(state.ax, state.ay)) + '" class="mw-flag-solid"/>');
      parts.push('<circle class="mw-handle" cx="' + state.ax.toFixed(1) + '" cy="' + state.ay.toFixed(1) + '" r="8"/>');
      parts.push('<circle class="mw-hit" cx="' + state.ax.toFixed(1) + '" cy="' + state.ay.toFixed(1) + '" r="20"/>');
      parts.push('<text x="' + (state.ax + 10).toFixed(1) + '" y="' + (state.ay - 10).toFixed(1) + '" class="mw-handle-label">a = ' + fmtCoord(state.ax, state.ay) + '</text>');
      svg.innerHTML = parts.join('');
      wireDrag();
      onChange({ ax: state.ax, ay: state.ay });
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
      state.ax = p[0]; state.ay = p[1];
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
    return { getA: function () { return { ax: state.ax, ay: state.ay }; } };
  }

  return {
    create: createComplexWidget,
    // Z0 is the single source of truth for the flag's fixed anchor -- the
    // live KaTeX panel script below reads it from here instead of hardcoding
    // its own copy, so the two can never drift apart.
    Z0: Z0,
    // Exposed for the test suite only -- not used by the page itself.
    _test: {
      svgToMath: function (x, y) { return { re: x, im: -y }; },
      multiplyPointSvg: multiplyPointSvg
    }
  };
})();
</script>

<script>
(function () {
  var el = document.getElementById('widget-multiply');
  var aEl = document.getElementById('mult-a');
  var wEl = document.getElementById('mult-w');

  // katex.min.js is <script defer>, so it only runs after this (non-deferred,
  // inline) script has already executed during parsing -- window.katex is
  // not defined yet at this point. Wait for window 'load' (same reason as
  // similarities.html's §4 constructor script).
  function init() {
    if (!el || !aEl || !wEl || !window.ComplexWidget || !window.katex) return;

    function update(state) {
      var a = { re: state.ax, im: -state.ay };
      var z0 = { re: ComplexWidget.Z0[0], im: -ComplexWidget.Z0[1] };
      var w = { re: a.re * z0.re - a.im * z0.im, im: a.re * z0.im + a.im * z0.re };
      var modulus = Math.hypot(a.re, a.im);
      var argDeg = Math.atan2(-state.ay, state.ax) * 180 / Math.PI;
      var fmt = function (u) {
        var sign = u.im < 0 ? '-' : '+';
        return u.re.toFixed(2) + ' ' + sign + ' ' + Math.abs(u.im).toFixed(2) + 'i';
      };
      katex.render('a \\approx ' + fmt(a) + ',\\quad |a|\\approx ' + modulus.toFixed(2) + ',\\quad \\arg a \\approx ' + argDeg.toFixed(1) + '^\\circ', aEl, { throwOnError: false });
      katex.render('w = az_0 \\approx ' + fmt(w), wEl, { throwOnError: false });
    }

    var widget = ComplexWidget.create(el, { onChange: update });
    update(widget.getA());
  }
  window.addEventListener('load', init);
})();
</script>
```

- [ ] **Step 5: Run the test again to confirm it passes**

Run: `cd ~/MATH/homepage && node /tmp/claude-1000/-home-nkrishelie-MATH-homepage/318b6e91-642c-4433-96fb-9515cf835df6/scratchpad/complex-widget-math.test.mjs`
Expected: `PASS` for all 4 cases, ending `All tests passed`, exit code 0.

- [ ] **Step 6: Verify in browser**

Run: `cd ~/MATH/homepage && npm run dev`, open
`http://localhost:5173/Materials/complex_numbers.html`.

Expected: the widget shows axes, a ghost flag at its fixed anchor, a solid
(blue) image flag, a vector line from the origin to the drag handle, and a
handle label showing `a = …`. On load (handle at SVG `(50,-50)`), the two
formula boxes show `a ≈ 50.00 + 50.00i, |a| ≈ 70.71, arg a ≈ 45.0°` and
`w = az_0 ≈ -1750.00 - 5250.00i`. Dragging the handle live-updates the flag's
rotation/scale and both formula boxes; the flag is never draggable itself,
only the handle is. Dragging the handle onto the origin collapses the solid
flag to a point at the origin. The new TOC entry scrolls to §3.

- [ ] **Step 7: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/complex_numbers.html
git commit -m "$(cat <<'EOF'
Add ComplexWidget and §3: multiplication is a similarity

Single drag-handle widget (no tabs, no k slider, center hard-locked at
the origin) reusing similarities.html's rotateScalePoint geometry: the
handle's own position already encodes both |a| and arg(a). Verified
test-first against the book theorem (LevelAlpha.tex lines 8493-8501,
w=az is a rotational homothety) and the ch.12 exercise (lines
6877-6878, z->alpha*z for alpha=3+4i) -- plus the a=0 degenerate case
and the pure-real-a homothety case.
EOF
)"
```

---

## Task 4: §4 "Что дальше" (closing section)

**Files:**
- Modify: `public/Materials/complex_numbers.html`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Add §4 markup and register it in the TOC**

Insert the new `<li>` right after the `#sec-multiplication` one inside
`<nav class="toc">`'s `<ol>` (this is the last TOC entry):

```html
    <li><a href="#sec-next" style="color: var(--ink2); text-decoration: none; border-bottom: 0.5px solid rgba(138,134,128,.35);">Что дальше</a></li>
```

Insert before `<p class="page-footer">`:

```html
<section id="sec-next">
  <h2>4. Что дальше</h2>
  <p class="lead">Мы построили поле ℂ тремя способами и увидели, что умножение на фиксированное число $a$ — это ровно та же поворотная гомотетия, что разобрана в «Подобиях плоскости». Но $f(z)=az$ — линейная, самая простая из функций комплексного переменного.</p>
  <p>Следующий естественный вопрос: что происходит с более сложными функциями — многочленами, дробями, рядами? У части из них в каждой точке области определения есть производная $f'(z)=\lim\limits_{\Delta z\to0}\dfrac{f(z+\Delta z)-f(z)}{\Delta z}$ — вычисленная точно так же, как для функций одной вещественной переменной, только приращение $\Delta z$ теперь комплексное. Такие функции ведут себя на удивление хорошо — но это уже разговор для отдельного материала.</p>
</section>
```

- [ ] **Step 2: Verify in browser**

Run: `cd ~/MATH/homepage && npm run dev`, open
`http://localhost:5173/Materials/complex_numbers.html`.

Expected: §4 renders below §3 with both paragraphs, the derivative formula
renders correctly via KaTeX (including the `\lim\limits` and `\dfrac`); all
four TOC links now work end-to-end; no dangling forward link (§4 does not
link anywhere — confirmed by reading the rendered HTML, not just the
source).

- [ ] **Step 3: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/complex_numbers.html
git commit -m "$(cat <<'EOF'
Add §4: closing section (what comes next)

Open question in prose only, no link -- the follow-up material on
regularity/differentiability in C doesn't exist yet. Matches how
chasles.html posed its own open question before similarities.html
existed to answer it.
EOF
)"
```

---

## Task 5: Link forward to `complex_numbers.html` from `similarities.html`

**Files:**
- Modify: `public/Materials/similarities.html`

**Interfaces:**
- Consumes: `public/Materials/complex_numbers.html` must already exist
  (Tasks 1–4 done).
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Insert the forward-link paragraph**

In `public/Materials/similarities.html`, find this paragraph (currently in
§6 "Подобия как функции $f(z)$"):

```html
  <p>$f(z)=az+b$, $a\ne0$ — <strong>собственные подобия</strong> (сохраняют ориентацию): при $a=1$ это перенос на вектор $b$; при $a\ne1$ — поворотная гомотетия с коэффициентом $|a|$, углом поворота $\arg a$ и центром $z_0=b/(1-a)$ (см. §4).</p>
```

Insert this new paragraph immediately after it (before the
"$f(z)=a\bar z+b$…" paragraph):

```html
  <p>А что если $b=0$, то есть подобие — это чистое умножение на число, $w=az$? Тогда сама операция умножения комплексных чисел устроена как поворотная гомотетия — подробный разбор (включая то, откуда вообще берётся такая арифметика) в материале «<a href="/Materials/complex_numbers.html">Комплексные числа: три конструкции одного поля</a>».</p>
```

- [ ] **Step 2: Verify in browser**

Run: `cd ~/MATH/homepage && npm run dev`, open
`http://localhost:5173/Materials/similarities.html#sec-fz`.

Expected: the new paragraph appears in §6, between the two existing
`$f(z)=az+b$`/`$f(z)=a\bar z+b$` paragraphs; the link navigates to
`/Materials/complex_numbers.html`.

- [ ] **Step 3: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/similarities.html
git commit -m "$(cat <<'EOF'
Link forward to complex_numbers.html from the b=0 case

similarities.html's §6 covers f(z)=az+b in general -- the b=0 special
case (pure multiplication) is exactly what complex_numbers.html now
explains in full, including where the arithmetic itself comes from.
Same reciprocal-link pattern as chasles.html -> similarities.html.
EOF
)"
```

---

## Task 6: Site integration (taxonomy, manifest, news, sitemap)

**Files:**
- Modify: `public/Materials/_taxonomy.json`
- Modify: `data/materials.generated.ts` (via script, not by hand)
- Modify: `public/news.html`
- Modify: `public/news_en.html`
- Modify: `public/sitemap.xml`

**Interfaces:**
- Consumes: `public/Materials/complex_numbers.html` must already exist
  (Tasks 1–4 done).
- Produces: nothing later tasks depend on (final task).

- [ ] **Step 1: Register the file in `_taxonomy.json`**

In `public/Materials/_taxonomy.json`, inside `"fileCategory"`, add this line
right after `"similarities_en.html": "geometry",`:

```json
    "complex_numbers.html": "analysis",
```

Inside `"fileLanguage"`, add this line right after
`"similarities.html": "ru",`:

```json
    "complex_numbers.html": "ru",
```

- [ ] **Step 2: Regenerate the manifest**

Run: `cd ~/MATH/homepage && node scripts/generate-materials-manifest.mjs`

Then run: `grep -A5 '"complex_numbers.html"' data/materials.generated.ts`
Expected output includes:

```
    "filename": "complex_numbers.html",
    "href": "/Materials/complex_numbers.html",
    "title": "Комплексные числа: три конструкции одного поля",
    "category": "analysis",
    "lang": "ru"
```

- [ ] **Step 3: Add the news.html entry**

In `public/news.html`, insert this `<li>` as the **first** item inside
`<ul class="feed">` (right after `<div class="year">2026</div>` /
`<ul class="feed">`, before the existing `similarities.html` entry):

```html
  <li>
    <span class="date">01.08</span>
    <div class="entry"><p>Добавлен материал «<a href="/Materials/complex_numbers.html">Комплексные числа: три конструкции одного поля</a>» — R² с арифметикой, представление 2×2-матрицами и факторкольцо R[x]/(x²+1); умножение на комплексное число как поворотная гомотетия. Первый материал новой серии — от построения ℂ к конформным отображениям.</p></div>
  </li>
```

- [ ] **Step 4: Add the news_en.html entry**

In `public/news_en.html`, insert this `<li>` as the **first** item inside
`<ul class="feed">`, matching the RU-only-material pattern already used for
`diophant_28_37.html` (title translated, link points at the RU file since no
English page exists yet, `<span class="lang">RU</span>` marks the language):

```html
  <li>
    <span class="date">01.08</span>
    <div class="entry"><p>Added "<a href="/Materials/complex_numbers.html">Complex Numbers: Three Constructions of One Field<span class="lang">RU</span></a>" — R² with coordinatewise arithmetic, the 2×2 real-matrix representation, and R[x]/(x²+1); multiplication by a complex number as rotational homothety. First material in a new series, from constructing ℂ to conformal mappings.</p></div>
  </li>
```

- [ ] **Step 5: Add the sitemap.xml entry**

In `public/sitemap.xml`, find this block:

```xml
   <url>
      <loc>https://mathem.at/Materials/similarities_en.html</loc>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
   </url>
```

Insert this new block immediately after it:

```xml
   <url>
      <loc>https://mathem.at/Materials/complex_numbers.html</loc>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
   </url>
```

- [ ] **Step 6: Final full-page verification**

Run: `cd ~/MATH/homepage && npm run dev`, open
`http://localhost:5173/Materials/complex_numbers.html` and
`http://localhost:5173/#materials`.

Expected: on the materials listing page, "Комплексные числа: три конструкции
одного поля" now appears under the "Математический анализ" category
alongside "Уровни формализации математического анализа"; opening it shows
all four sections working (TOC, cards + toggle, widget + live formulas,
closing section); resizing to mobile width (<700px) keeps everything usable
(cards stack, widget stays draggable via touch); `similarities.html#sec-fz`
shows the new forward-link paragraph; `news.html` and `news_en.html` both
show the new entry at the top of the 2026 list with today's date (01.08).

- [ ] **Step 7: Commit**

```bash
cd ~/MATH/homepage
git add public/Materials/_taxonomy.json data/materials.generated.ts public/news.html public/news_en.html public/sitemap.xml
git commit -m "$(cat <<'EOF'
Register complex_numbers.html in the site: taxonomy, manifest, news, sitemap

Category "analysis" (first real-content entry alongside
math_analysis_levels.html), RU-only. News entries in both feeds --
news_en.html tags it RU-only, matching the diophant_28_37.html
precedent (translated title, link to the RU file, lang=RU badge).
EOF
)"
```
