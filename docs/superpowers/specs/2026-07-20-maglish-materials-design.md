# Maglish ("Математика как иностранный") — promotional chapter digests in Materials

## Goal

Publish SEO/AI-crawler-friendly, bilingual (RU/EN) "sales digest" pages for the book
*Mathematics as a Foreign Language* / *Математика как иностранный* (Springer, 2026) in
`public/Materials/`, so search engines and AI training crawlers index real content from
the book via the public GitHub repo. One hub/root page plus one page per chapter.

Source of truth for content: the Springer manuscript at
`~/MATH/Maglish/English/Springer/book v1/` (`maglish_snmono.tex` and its `\include`d
chapter files). English is authoritative — write EN first, then translate to RU, reusing
terminology pairs already collected in `~/MATH/Maglish/GLOSSARY.md` for consistency.

Book facts to use for stats/claims (verified against the manuscript):
- ~457 pages (current `maglish_snmono.pdf` build)
- ~190 exercises, full worked solutions in an appendix
- Part I: 5 CEFR-styled levels — A1 "Survival", A2 "At the Threshold of Logic",
  B1 "Formal Logic", B2 "The Foundations of Mathematics", C1 "A Mathematician's Paradise"
- Part II: 4 reference chapters (Language, Logic, Arithmetic, Set Theory) + solutions
- 103 registered notation entries (`\nomenclature`)
- Springer product page (live): https://link.springer.com/book/9783032307200
- RU purchase channel (ЛитРес) not live yet — point RU CTAs at `https://mathem.at/#books`
  instead of a dead link; that section already renders whatever preorder links are live.

## Scope of this pass

Build first, as a style/depth sample:
1. Hub page, RU + EN
2. Chapter A1 "Survival" digest, RU + EN

Remaining four chapters (A2, B1, B2, C1) follow as a second pass, once the sample is
approved, using the same template and content pipeline.

## File placement

Flat files directly in `public/Materials/` (matches how
`scripts/generate-materials-manifest.mjs` scans — top-level `.html` only, no
subfolders), prefixed `maglish_`:

- `maglish_index.html` / `maglish_index_en.html` — hub page
- `maglish_a1_survival.html` / `maglish_a1_survival_en.html` — Level A1
- (later) `maglish_a2_logic.html` / `_en`, `maglish_b1_formal_logic.html` / `_en`,
  `maglish_b2_foundations.html` / `_en`, `maglish_c1_paradise.html` / `_en`

`public/Materials/_taxonomy.json` gets a new category `"maglish"` (RU «Математика как
иностранный», EN «Mathematics as a Foreign Language»), inserted first in
`categoryOrder`, plus `fileCategory`/`fileLanguage` entries for every new file. No
changes needed to the generator script itself.

## Visual system

Reuse the existing static-Materials design language from `induction.html` /
`second_order_arithmetic.html`: EB Garamond (serif body) + JetBrains Mono (labels/mono),
muted paper palette (`--bg`, `--ink`, pastel accent cards blue/rust/sage/teal/amber),
KaTeX via CDN with auto-render, `<details class="proof">` collapsibles for optional
depth, Yandex.Metrika snippet, `hreflang` alternate links.

Hub page additionally gets a dark hero band (`academic-900`-style), echoing
`components/BookDetails.tsx`'s Archetypes page: cover image, title, tagline, stats
strip, CTA buttons — built as plain static HTML/CSS, not React (these pages have no
build step).

Language switcher: two RU/EN pill buttons (flag + code, filled when active, outlined
otherwise — visually matching the main site header's toggle), top-right of the hero.
Each pill is a plain `<a>` to the sibling file. This replaces/extends the existing
minimal "English version" footer-link convention seen in `second_order_arithmetic.html`
with something closer to the main site's affordance, while staying a static link (no
JS state).

## Hub page content (full-depth version, both languages)

1. Hero: cover (`/litres_cover.png` RU / `/Springer_cover.webp` EN), title, tagline,
   short pitch, RU/EN switcher, CTA buttons (preorder/Springer + `#books` for RU).
2. Stats strip: pages, exercises, levels (5), appendix chapters (4).
3. Author block: reuse existing bio/photo/socials pattern from `BookDetails.tsx`
   (Telegram/YouTube/Email/LinkedIn), static HTML equivalent.
4. "About the book": synthesized from the preface — math as a language you can learn
   with a CEFR-like progression, why it matters now (AI/ML), the two-part structure
   (Part I narrative, Part II reference), the *MathLogic Nexus* digital companion
   (cross-link to `nexus.mathem.at` project already on the main site).
5. Table of contents: full Part I (5 levels + their sections) and Part II (4 reference
   chapters + solutions), styled as a clean structured list. A1–C1 entries link to their
   digest pages (or show "coming soon" for chapters not yet built in this pass).
6. Chapter cards: one per level (A1–C1), level badge + title + 2–3 sentence teaser +
   link to the digest page.
7. Key theorems showcase: ~5 flagship results spanning the book (e.g. Peano induction,
   hereditarily finite sets, the Axiom of Choice, von Neumann universe, ordinal
   exponentiation), each a short precise KaTeX statement in a card, styled like
   `induction.html`'s principle/card components.
8. Notation list: curated selection from the manuscript's `\nomenclature` entries,
   grouped (logic, quantifiers, arithmetic, sets), rendered as a glossary grid.
9. Terms glossary: curated RU/EN term pairs pulled from `GLOSSARY.md`, organized by
   level, not the full 400+ entries — a representative, useful subset.
10. Infographic: an "A1 → C1 ladder" diagram (reusing the `.diagram-wrap`/`.dbox`
    pattern from `induction.html`) showing the level progression and what each stage
    unlocks.
11. Footer: credit line + language switch, matching existing Materials convention.

## Chapter digest page content (template, applied to A1 first)

"Продающий конспект" = teaser/summary, not a reproduction of copyrighted book text:
original condensed prose plus a few short illustrative quotes/definitions, structured
like `induction.html` (real content + KaTeX, then a CTA banner pointing at the full
book rather than a free PDF).

1. Breadcrumb: `← mathem.at / Математика как иностранный / Уровень A1`.
2. Header: level badge, chapter title, epigraph (the chapter's own epigraph quote),
   short abstract.
3. "What you'll learn" bullets (3–5), summarizing the chapter's actual sections.
4. Narrative hook: condensed retelling of the chapter's opening illustrative story
   (original synthesis, not verbatim reproduction).
5. One worked concept with real KaTeX content (e.g. the Matryoshka principle + a small
   lexeme-building example) — demonstrates the book's rigor/style honestly.
6. A sample self-check question or two, adapted from the chapter's own self-check
   section.
7. CTA banner: "full chapter in the book" with Springer / `#books` links.
8. Footer nav: back to hub, forward to next chapter (grayed/"coming soon" until built),
   language switch.

## Verification

- Run `node scripts/generate-materials-manifest.mjs` after adding files and confirm
  `data/materials.generated.ts` picks up the 4 new entries with correct
  title/category/lang.
- Open each new HTML file directly (file:// or local static server) and visually
  confirm KaTeX renders, layout doesn't break on mobile widths, and hreflang/lang-pill
  links resolve to the correct sibling file.
- Spot-check that RU translation preserves the terminology from `GLOSSARY.md` rather
  than inventing new translations for terms that already have an established pair.
