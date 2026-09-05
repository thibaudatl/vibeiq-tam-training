# VibeIQ TAM Training

A self-paced, 10-week technical training program for a VibeIQ Technical Account
Manager. Grounded in official VibeIQ / Contrail documentation (docs.vibeiq.com).

**Live site → https://thibaudatl.github.io/vibeiq-tam-training/**

## Status

**All ten modules are written and live.** Nothing is gated — read in any order.

Quizzes, exercises, scenarios and the four-phase capstone are worked through in
conversation with a tutor; the site holds the material and the progress tracker.

| Phase | State |
|---|---|
| Curriculum design | Complete |
| Module authoring | Complete — all 10 written |
| Working through them | In progress (Module 1) |

## Contents

| Path | What it is |
|---|---|
| `index.html` | The training hub — a single self-contained page, no build step and no external requests. Sidebar navigation across the dashboard, all ten modules, and four reference pages. Every module expands in the sidebar to its own sections, and opens with an **On this page** agenda. Every quiz question carries a model answer behind a **Show answer** toggle, with a **Reveal all answers** button per quiz. |
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
twelve-question self-test. Written in French with the technical terms and doc
quotes kept in English. It prints with the drill answers expanded.

Reachable from the hub sidebar under REVISION, or directly at `cheatsheet.html`.

## Day / night theme

Both pages switch palette on **New York time** (`America/New_York`), because
that is the clock the platform's own release notes and support hours run on:
night from 19:00 to 06:59 ET, day otherwise. `theme.js` resolves the hour with
`Intl` — so US daylight saving is handled for us — stamps `data-theme` on
`<html>` before first paint, and re-checks every minute, meaning an open tab
flips by itself at 07:00 and 19:00 ET.

The control (sidebar, under AFFICHAGE) cycles **Auto → Jour → Nuit** and shows
the current NYC hour; an explicit choice is remembered per browser in
`localStorage`. With JavaScript off, the light theme stands.

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
