# weareactiveai.com

Marketing site for Active AI. It sells one thing: a white-label athlete app or API that keeps athletes engaged, scores their momentum and fires a Momentum Unlock when they are ready to buy, offered to a small cohort of beta partners.

This is a marketing site, not a platform component. It does not live in the monorepo and imports nothing from it.

## Stack

- Astro (static output), plain CSS with custom properties, scoped component styles. No UI framework; the only client JS is the nav disclosure, the engage tabs, the score-ring animation and the old-anchor remap.
- Fonts self-hosted via `@fontsource`: Bebas Neue (display), Poppins (body), DM Mono (eyebrows, labels, data).
- Images through `astro:assets` (`Photo.astro`, `Phone.astro`). Both render labelled placeholders until real, licensed files are passed in.
- Copy that repeats or will grow lives in content collections (`src/content/*.json`, schemas in `src/content.config.ts`): `unlocks`, `team`, `engage`, `science`, `faq`.
- Names, email, company details and nav live in `src/config/site.ts`. Never hard-code the score name or the email address anywhere else. In content files, write `{score}` and render it with `withScore()`.
- Deploy: Netlify builds from GitHub (`netlify.toml`). Deploy previews on every PR.

## Commands

- `npm run dev` — local dev server on :4321
- `npm run build` — `astro check`, build, then the content-rules check. Must pass before any push.
- `npm run check:content` — re-run the content-rules check against `dist/`
- `npm run preview` — serve the built site

## Brand rules (hard)

- Palette: Navy `#000036`, Electric Blue `#00C2FF`, Gold `#C8B273`, Chalk `#F4F1EC`.
- Electric Blue is a fill only, never body text. It is allowed for big stat numerals on Navy (9.6:1).
- Blue text: `#0A76A8` on white; `--accent-text` (`#0A6F9E`) on Chalk. Gold text on light: `#8A7440` on white; `--gold-text` (`#7A6636`) on Chalk. The brand values fail AA on Chalk, hence the deeper variants. Gold `#C8B273` as text on Navy only.
- Bebas Neue uppercase for headlines, Poppins for body, DM Mono letter-spaced for eyebrows, labels and data.
- Alternating Navy and Chalk bands, gold eyebrow labels, thin rules above column headings.
- Wordmark **Active.AI** in the logo; **Active AI** in running copy.

## Content rules (hard)

- British English. Plain, confident, short sentences. Deck wording wins over old site wording.
- The score is the **Brand Momentum Score (BMS)**. The old name and abbreviation must never appear.
- Public unlocks: **Epic Route Completed, New Personal Best, Gear Replacement** only. Only Epic Route Completed shows a rate (74%, modelled). Never state or imply how many unlocks exist in total.
- No prices. Show beta benefits and "preferred commercial terms, locked permanently".
- Every performance figure is labelled "modelled"; the dashboard carries "illustrative" and a fictional brand.
- **No methodology anywhere in the repo or on the page**: no layer weights or point values, no formula, no thresholds, no band score ranges, no citations that would let someone rebuild the model. Signal layer and band *names* are fine. This applies to commit messages and PR descriptions too: describe withheld material by category, never by content.
- Science section: theory names and at most researchers' surnames. No formulas, dates, journals, "Nobel"/"MIT", neurochemistry, and no link between a theory and how the score is built. Loss aversion is left out.
- Athlete-care language stays in: plateau is a care signal, quiet weeks never count as zero, one location read per tap. No "exploit", "hook", "dopamine", "neurochemical window" or manufactured urgency.
- No prospects or partners named anywhere. No invented testimonials, logos or sources.
- Enquiries are `mailto:` only (prefilled subject and body from `site.ts`). No forms, no trackers, no cookie-setting scripts.

`scripts/check-content.mjs` enforces the checkable parts of these rules on every build. Add to it when a new rule appears; never loosen it to get a build through.

## Workflow and gates

- Work on branches; every change arrives as a PR with a Netlify deploy preview.
- **Stop at the push**: nothing reaches GitHub until Holly has seen the diff.
- **Deploy is a human gate**: do not link this repo to the live Netlify site (`weareactiveai.com`) or touch DNS/domain settings without Holly's explicit go-ahead.
- `/privacy` and `/cookies` are placeholders (noindex, out of the sitemap) until the live text is ported **word for word**. Do not rewrite them.
- Report back in Holly's plain-English, outcome-first voice (`cindy-voice` skill).
