# VibeIQ TAM Training

A self-paced, 10-week technical training program for a VibeIQ Technical Account
Manager. Grounded in official VibeIQ / Contrail documentation (docs.vibeiq.com).

**Live site → https://thibaudatl.github.io/vibeiq-tam-training/**

## Status

**All ten modules are written and live.** Nothing is gated — read in any order.

Quizzes carry model answers throughout, and **every exercise, customer scenario
and hands-on challenge now carries a full worked solution** — the answer, the
reasoning behind it, and cited sources — behind a **Show the solution** button.
That includes each of the capstone's four phases: 31 solutions in all. They are
written to be read *after* attempting, not instead of.

| Phase | State |
|---|---|
| Curriculum design | Complete |
| Module authoring | Complete — all 10 written |
| Working through them | In progress (Module 1) |
| Activity solutions | Complete — 31 across all 10 modules |
| TAM practice (`practice/`) | Complete — three documents, written against the job description |
| JD success criteria mapped | Complete — all 14, with a metric, a source, a cadence and an evidence line |
| Boundary model | Drafted and unsigned — pending decision zero and internal confirmation |

## Contents

| Path | What it is |
|---|---|
| `index.html` | The training hub — a single self-contained page, no build step and no external requests. Sidebar navigation across the dashboard, all ten modules, the three TAM practice documents in `practice/`, and four reference pages. Every module expands in the sidebar to its own sections, and opens with an **On this page** agenda. Every quiz question carries a model answer behind a **Show answer** toggle, with a **Reveal all answers** button per quiz. The practical exercise, customer scenario and hands-on challenge each carry a worked solution behind a **Show the solution** toggle — the answer, how to think about the problem, and cited sources. Sidebar sub-items and the **On this page** agenda rows are prefixed with a section-type glyph (📚 orientation · 🤝 TAM knowledge · ⚙️ tech knowledge · ✅ knowledge testing). The dashboard carries three maps built the same way — a **Course map** over the ten curriculum weeks, a **Practice map** over the three practice documents and their parts, and a **Reference map** over Key findings, Priority matrix, Colleague questions, Doc links and the Exam Kit. Each entry expands to its sections, and every section expands to a short note on what it covers plus a link straight to it. |
| `practice/` | **The TAM practice** — three documents, one audience each, in their own folder. `charter.html` (Document A, for leadership), `operating-model.html` (Document B, the blueprint), `first-90-days.html` (Document C, the ramp plan and worked examples), plus `index.html` as the overview and `practice.css` / `practice.js`. Static pages, no router; they reuse `theme.css` and `theme.js` for the day/night palette. See **The TAM practice** below. |
| `modules/practice-tam-operating-model.md` | **Archive.** The working note behind the single-page practice view that `practice/` replaced. Kept for provenance only — nothing links to it and it is not maintained. `practice/` is the live version. |
| `dashboard.md` | Progress tracker: week status, confidence by topic, running glossary, and the open questions for VibeIQ colleagues. Carry this between tutoring sessions. |
| `modules/` | Long-form source notes, one per week. The hub is the study surface; these are the working notes behind it. |
| `docs/STATE.md` | Living project state — decisions made, what's open, and facts not worth re-deriving. Read this first if picking the project up cold. |
| `docs/HANDOFF.md` | The original design-session handoff, kept for provenance. Superseded by `STATE.md` for current status. |

### Reference pages inside the hub

- **Key findings** — the non-obvious, high-consequence material pulled from every
  module: a symptom→cause lookup, symptom *shape*→cause, the failures that produce
  no error, decisions that can't be undone, claims to verify before asserting, the
  numbers worth memorising, and nine reframes.
- **Priority matrix** — what's critical, important, useful and nice to know.
- **Colleague questions** — the standing unknowns to close in the first weeks on
  the job. A work item with owners and dates, not a reading list.
- **Doc links** — official sources, grouped by domain.

### Beyond the curriculum

- **The TAM practice** (`practice/`) — how the job is *run*, written because the
  role isn't defined at VibeIQ yet, which makes the definition itself the first
  deliverable. Three documents, one audience each. See the next section.

## The TAM practice (`practice/`)

How the job is *run*, written as three documents with one audience each, live at
[`practice/`](https://thibaudatl.github.io/vibeiq-tam-training/practice/). They
have three different completion bars, and writing them together makes all three
worse — the part that needs a signature ends up buried in the middle, addressed
to nobody.

| Doc | Audience | What it is |
|---|---|---|
| **A · [Practice Charter](practice/charter.html)** | The hiring manager, the Delivery & Support lead, the CS lead | The decisions that need sign-off, stated as decisions: mission and value, the boundary model (one row per contested activity), what the TAM does not do, cross-functional ownership, portfolio and capacity, the KPI charter, and a **24-row open decisions log** with a proposed answer, an owner, a forum and a date each. Short enough to approve in one sitting. |
| **B · [Operating Model](practice/operating-model.html)** | Whoever runs or joins the practice | The blueprint, in five numbered parts — **I Mandate · II Customer operating model · III Technical ownership · IV Cross-functional operating model · V Running and scaling**. The engagement lifecycle including hypercare, the service catalogue with triggers and required inputs, the technical health index, the Support boundary, problem records, the scorecard, and the hiring and career model. |
| **C · [First 90 Days](practice/first-90-days.html)** | The person doing the job | The three ramp phases as exit criteria and stakeholder checkpoints, the day 10–20 baseline capture, the inherited sync-and-performance escalation worked end to end, the module-to-artefact map, and the open technical questions for colleagues. |

### The rules these documents follow

- **One verb model everywhere**: *owns · contributes · advises · escalates · not
  TAM*, with a named accountable party for everything that is not "owns". A
  responsibility that cannot be written that way is not yet defined, and goes in
  the decisions log instead.
- **Two provenance markers.** `[ER]` marks an expert recommendation rather than a
  VibeIQ decision. `[NEEDS INPUT]` marks a fact the documents refuse to invent —
  a Support SLA, a tool name, an ACV band, an approver. There are 45 of the
  latter, every one carried into Document A's decisions log with an owner and a
  date. A blueprint with honest gaps is usable; one with invented facts is not.
- **Four positions stated explicitly**, because each is commonly read the other
  way: the TAM *owns* escalated issues through to resolution rather than routing
  them · training splits by audience, TAM for customer IT and platform admins,
  CS for end users · the TAM owns the expansion *signal* and Sales owns the deal,
  with attribution recorded at signal creation · and the reporting line, which
  the job description gives as both Customer Success and Delivery & Support, is
  **decision zero** and is not answerable internally.
- **The delivery boundary is held.** TAM owns discovery, architecture and
  integration *design*, the mapping *specification*, the security questionnaire
  response and technical enablement; advises on build, load execution and
  production config; escalates custom development and performance tuning; and
  **does not do pre-sales architecture**. Anything done outside that line is
  logged as an exception, because an exception nobody counts becomes the pattern.
- **Every section answers five questions**: who owns this, what triggers it, what
  it produces, how often, and how you know it worked. A section that cannot
  answer all five is not finished.


## Curriculum

| Wk | Module | Notes |
|---|---|---|
| 1 | Business domain & where VibeIQ sits | Where VibeIQ sits; the GTM calendar and merchant vocabulary |
| 2 | Core data model | **Keystone.** Item / ProjectItem / AssortmentItem, property levels, `federatedId` |
| 3 | End-user apps & the publish lifecycle | Board / Plan / Showcase; `AssortmentPublishChange` |
| 4 | Data in: the Loader framework | The five phases, six preprocessing steps, per-step artefacts |
| 5 | Data out: integration patterns | Push vs. poll, auth, resilient consumers, the polling seam |
| 6 | Event Workflows | **Deepest module.** Triggers, paths, conditionals, concurrency, observability |
| 7 | Apps, Extensions & the config/customization boundary | The five-rung spectrum and cost of ownership |
| 8 | Platform, security & operations | Tenancy, permissions, credentials, monitoring, the honest gaps |
| 9 | Troubleshooting & escalation | Six checkpoints, three ladders, symptom shape, escalating well |
| 10 | Applied TAM practice | Capstone: discovery, architecture review, incident, QBR |

Weeks 4, 5 and 6 are the technical heart. Workflows were given their own module
because the TAM role includes supporting customer workflows; every module from
Week 4 onward also carries an explicit "workflow angle".

## The account-inheritance kit

Eight artefacts are built across the program, and they matter more than the modules
that produced them — they're what actually gets used on the job:

data-model health check (W2) · publish integration review (W3) · pre-load checklist
(W4) · integration design review (W5) · workflow review (W6) · "can it do X?"
routing guide (W7) · security questionnaire response kit (W8) · triage card (W9).

## Exam Kit (cheat sheet)

`cheatsheet.html` is a standalone one-page revision sheet condensing all ten
modules — entity layers, property levels, the Loader pipeline and its four
dangerous flags, publish, workflows, the config spectrum, the six diagnostic
checkpoints, the numbers worth memorising, twelve silent-failure patterns and a
twelve-question self-test. It prints with the drill answers expanded.

It exists in two languages, as twin files: `cheatsheet.html` (French, with the
technical terms and doc quotes kept in English) and `cheatsheet.en.html`
(English throughout). The **Français / English** button in the masthead is a
plain link to the twin, so right-click and open-in-new-tab behave normally.
`locale.js` remembers the choice per browser and re-points the hub's REVISION
link at the matching file — it never redirects a page you are already reading.

**English is the default**: with nothing remembered, the hub's REVISION link
goes to `cheatsheet.en.html`, because this is the page most likely to be shown
to an English-speaking colleague. One click on the toggle switches to French
and that choice then wins everywhere. Opening `cheatsheet.html` directly still
gives the French page — no redirect, ever.

Reachable from the hub sidebar under REVISION, or directly at
`cheatsheet.en.html` / `cheatsheet.html`.

## Day / night theme

Both pages switch palette on **New York time** (`America/New_York`), because
that is the clock the platform's own release notes and support hours run on:
night from 19:00 to 06:59 ET, day otherwise. `theme.js` resolves the hour with
`Intl` — so US daylight saving is handled for us — stamps `data-theme` on
`<html>` before first paint, and re-checks every minute, meaning an open tab
flips by itself at 07:00 and 19:00 ET.

The control (sidebar, under AFFICHAGE) cycles **Auto → Jour → Nuit** and shows
the current NYC hour; an explicit choice is remembered per browser in
`localStorage`. Its labels follow the page's `<html lang>`, so the English cheat
sheet reads **Auto → Day → Night**. With JavaScript off, the light theme stands.

`theme.css` holds the night palette, lifted from the Exam Kit's dark mode and
re-expressed with the hub's token names. Adding a colour there means adding a
token in `index.html`'s `:root` first — nothing in the night sheet should be a
one-off hex.

## Local use

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server
# then visit http://localhost:8000
```

## Deploy

GitHub Pages is enabled on `main` / root, serving `index.html` at the live URL
above. Pushing to `main` redeploys automatically.
