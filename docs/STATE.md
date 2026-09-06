# Project state

Living status doc. Update at the end of each working session so a fresh
conversation can pick up cold. (`HANDOFF.md` is the original design-session
handoff, kept for provenance — this file supersedes it for current status.)

**Last updated:** 2026-09-06 — JD success criteria mapped into the practice page (new section 10); activity solutions complete; sidebar glyphs; dashboard course map

## What this is
A self-paced 10-week technical training program for Leo, starting as a
Technical Account Manager at VibeIQ. Grounded in the official Contrail docs
(docs.vibeiq.com). Delivered as a single-file static site (`index.html`) plus
a markdown tracker (`dashboard.md`) and per-week source notes (`modules/`).

## Repo
- `git@github.com:thibaudatl/vibeiq-tam-training.git`, branch `main`, public.
- Commits use `leo.thibaudat@gmail.com` (repo-local override; global identity
  is an Akeneo address and is deliberately not used here).
- **GitHub Pages: live** at https://thibaudatl.github.io/vibeiq-tam-training/
  (deploy from branch, `main` / root). Pushing to `main` redeploys.

## Design decisions made
- **No gating.** The original design locked modules until each quiz was
  reviewed. Removed at Leo's request — every module is browsable, including
  stubs for unwritten ones. Quizzes are for feedback, not access.
- **One place to study.** Week 1 had diverged into two versions; the markdown
  source notes were merged into the hub. `modules/*.md` are now source notes,
  `index.html` is the study surface.
- Self-contained HTML: no build step, no external requests, no localStorage.
- Modules written one at a time, researched against live docs rather than
  from memory, quoting definitions verbatim where wording carries meaning.

## Module status
| Wk | Module | State |
|---|---|---|
| 1 | Business domain & where VibeIQ sits | written |
| 2 | Core data model (keystone) | written |
| 3 | End-user apps & the publish lifecycle | written |
| 4 | Data in: the Loader framework | written (deep) |
| 5 | Data out: integration patterns | written (deep) |
| 6 | Event Workflows | written (deep) |
| 7 | Apps, Extensions & the config/customization boundary | written (deep) |
| 8 | Platform, security & operations | written (deep) |
| 9 | Troubleshooting & escalation | written (synthesis) |
| 10 | Applied TAM practice (capstone) | written (capstone) |

Weeks 4, 5 and 9 are the technical heart — protect time for them.

**Direction change (2026-09-04, from Leo):** go deeper technically from here on,
and deepen workflow-related topics most, because the TAM role includes supporting
workflows. Consequences already applied: Workflows promoted to its own module
(Week 6, written deep); Apps + Extensions merged into Week 7 with Configuration;
every remaining stub carries an explicit "workflow angle" bullet.

## TAM practice page (added 2026-09-04)
Leo is joining a **post-implementation** account (improvement requests, a live
VibeIQ↔other-system sync + performance escalation, support, growth, relationship,
technical reference) and **the TAM role is not defined at VibeIQ yet** — so the
practice definition is itself a deliverable.

- New view `#practice` in `index.html`: charter · service catalogue · cadence ·
  the inherited escalation worked with the W9 method · improvement pipeline ·
  growth signals · relationship · instrumentation · **KPIs (outcome / practice /
  leading / anti-metrics / health score)** · first 90 days · scaling · asks.
- Written for two audiences in one document: the charter card and section 9 are
  shareable upward; the rest is Leo's operating detail.
- Source note is `modules/practice-tam-operating-model.md` — **deliberately not
  `week-NN-*.md`**, because this is not a week of the curriculum but the practice
  built on top of it.
- **The boundary/routing table is a PROPOSAL**, inferred from the W9 routing
  default. It must be confirmed against VibeIQ's real internal process; the page
  says so and the dashboard tracks it as a question.
- `dashboard.md` gained section **7b** (KPI baseline table, blank baselines) and
  five KPI-blocking colleague questions.
- Constraint that shaped the KPIs: workflow evidence lives **90 days**, so any
  trend metric requires a **monthly snapshot** started in week one.

## JD alignment — practice page section 10 (added 2026-09-06)
Leo supplied the real **VibeIQ TAM job description** (Customer Success dept.,
hiring manager Quach Hai). It names **fourteen success criteria** in three groups:
Customer (7), Operational (4), Leadership (3). The practice page was written before
this was available, so section 9's KPIs were derived from the work; new **section 10
— "Succeeding against the job description"** comes at it from the scorecard end and
reconciles the two. Sections 10/11/12 renumbered to **11/12/13** (ids, sidebar, page
agenda and dashboard course map all updated together).

Structure: 10a Customer · 10b Operational · 10c Leadership (each a four-column table
— criterion, metric, plan, evidence by end of year one) · **10d time to resolve,
made honest** · **10e NPS** · 10f what is not measurable yet, with a proxy each.

Decisions taken, and why — do not silently reverse them:
- **Time to resolve was NOT argued away.** Section 9 deliberately measures
  time-to-localise instead, because resolution runs on Engineering's clock. The JD
  names MTTR anyway and it is right to. 10d accepts it and makes it ungameable:
  mechanism-confirmed not ticket-closed · containment split from permanent fix ·
  a **stop-clock rule agreed in advance** · reported as a triple with
  time-to-localise and update-promises-kept · split by detection source (otherwise
  getting better at proactive detection makes MTTR look worse).
- **Two criteria were deliberately restated** because the literal phrasing rewards
  useless output: "playbooks established" → *coverage* of the service catalogue;
  "reusable assets created" → *reuse count by a non-author*. The page says so out
  loud, because these are what to negotiate when the scorecard is agreed.
- **NPS** reduced to what a TAM can move: a quarterly technical-contact pulse with
  one free-text question, fixed cadence never moved around incidents, score always
  reported beside the mechanism list, every detractor called within 5 days.
- **The three Leadership criteria are scored on artefacts** until a second TAM
  exists (onboarding path, hiring kit, dated model version history). Whether that
  is how the manager will score them is a new colleague question.
- Month-one honest summary, stated on the page: **9 of 14 measurable now · 3 need a
  baseline captured first · 2 need the team to grow.** Recount this if criteria are
  re-mapped.
- The JD says **portfolio**, not one account, and "post go-live hypercare through
  ongoing expansion". The rest of the page still reads single-account by design
  (that is Leo's actual first assignment); the keystone card in 10 names the tension
  and points at section 12 rather than rewriting the page.

Knock-ons applied in the same pass:
- `dashboard.md` §7b gained a second KPI table (15 JD-derived metrics, blank
  baselines) and five new JD-blocking colleague questions.
- The **Colleague questions** view gained its first two `<h3>`s — "Platform and
  process unknowns" and "Blocking a job-description success criterion" — and
  therefore its first sidebar sub-list. Five new cards, one per blocked criterion.
- `.tscroll` was **made generic** (was `.solbody .tscroll` only) so the four-column
  mapping tables scroll in their own box; `.solbody` keeps its narrower `min-width`.
- Source note `modules/practice-tam-operating-model.md` mirrors all of the above.
- The JD PDF itself is not in the repo (it lives in Leo's Downloads). If the
  criteria need re-checking, ask for it again rather than trusting this summary.

## Open with Leo (blocking nothing, but shapes the work)
1. **Module 1 quiz + Summit Athletic scenario** — not yet answered. Module 2's
   scenario (copy-down clobber) is also outstanding.
2. **Calibration, still unanswered:** how close has Leo been to apparel/footwear
   line planning and PLM? He comes from Akeneo (PIM), so product-data modelling,
   attribute ownership across systems and integration seams are likely familiar
   ground. If so, compress Weeks 1–3 and reinvest the time in 4, 5 and 9.
3. No `gh` CLI on this machine; repo actions that need the GitHub API must be
   done by Leo in the browser.

## Navigation
Every `<h3>` in a view carries a generated id (`<viewid>-<slug>`). The sidebar
renders a collapsible sub-list per view (only the active view's list is open), and
each view with 3+ headings opens with an "On this page" agenda. Both use
`class="subitem"` with `data-view` + `data-anchor`, handled by one delegated
handler. Hash routing is `#view` or `#view/anchor`.
**If you add or rename an `<h3>`, regenerate both** — the ids, the sidebar sub-list
and the agenda are generated from the same heading text and will otherwise drift.

## Quiz answers
All 86 quiz questions across Modules 1-9 have model answers, injected as
`<details>` blocks inside each `<li>`, plus a "Reveal all answers" button per quiz
(event-delegated JS, toggles every `<details>` in that `.q` container). Module 10
is the capstone and has no quiz. **When a quiz question is added or reworded, add
or update its answer in the same edit** — the injector matched question text
exactly, so a mismatch is silent.

## Activity solutions (added 2026-09-06)
Every module has four activities: **Practical exercise**, **Realistic customer
scenario**, **Quiz**, **Hands-on challenge**. The quiz has had model answers since
the start; the other three now get one too, as a `<details class="sol">` appended
**inside the activity's existing `.card`** — deliberately not a new `<h3>`, because
heading ids, the sidebar sub-list and the on-page agenda are all generated from
`<h3>` text and would drift (see Navigation above).

Each solution has three fixed sub-headings in this order: **The answer** (worked
and concrete — actual pitches, actual questions, not a sketch), **How to think
about it** (the reasoning frame, and what a weak answer looks like), **Sources**.

- Markup follows the quiz idiom exactly: empty `<summary>`, label supplied by CSS
  `::before` so closed/open read differently ("▸ Show the solution" / "▾ Solution").
- The `.revealall` handler scopes to `.q`, so "Reveal all answers" does **not**
  touch solution blocks. Verified in-browser, not just by reading the code.
- **Sources may cite non-official material** where the docs are genuinely silent —
  Module 1's business-domain content has no `docs.vibeiq.com` page behind it at
  all. Those entries are prefixed `<span class="ext">External — not official
  documentation:</span>` and must stay labelled. All URLs are verified live before
  being cited; see the loader URL trap under "Facts worth not re-deriving".
- **Status: COMPLETE — 31 solutions.** Modules 1–9 have three each (practical
  exercise, realistic customer scenario, hands-on challenge); Module 10 has one
  per capstone phase, inserted into each phase `.card` rather than at the `<h3>`.
- **When an activity prompt is reworded, update its solution in the same edit.**
- `.solbody pre` and `.solbody .tscroll` were added when the deep modules brought
  code blocks and wide tables into solutions. Note the trap: `--code-bg` /
  `--code-ink` are the **inline code** colours (light beige), *not* block colours.
  The modules' `<pre>` blocks hard-code `#1e262d` / `#dfe6df` inline and stay dark
  in both themes deliberately; `.solbody pre` matches those literals. Don't
  "fix" it to use the tokens — it renders beige-on-beige.
- Every table inside a solution is wrapped in `<div class="tscroll">` so wide
  tables scroll in their own box instead of pushing the page sideways.
- All 25 cited external URLs were verified live (HTTP 200) and every internal
  cross-link was checked to resolve to a real view and `<h3>` id. Re-run those
  two checks if sources are added.

## Sidebar section-type glyphs (added 2026-09-06)
Every `a.subitem` in the sidebar carries a leading `<span class="ty">` glyph so the
menu says what kind of section a link leads to. **There is deliberately no legend**
— one was added under the `MODULES` navlabel and removed at Leo's request as
sidebar clutter. The glyphs are meant to be self-evident; the dashboard course map
is where a section's type and content are actually explained. Don't re-add it.

| Glyph | Type | Applied to |
|---|---|---|
| 📚 | Orientation / reference | Recommended reading, dashboard, After Week 10, Key findings, Priority matrix |
| 🤝 | TAM knowledge | Business domain, positioning, customer craft, the role itself |
| ⚙️ | Tech knowledge | Platform mechanics — data model, loader, integrations, workflows, config, security |
| ✅ | Knowledge testing | Practical exercise, Realistic customer scenario, Quiz, Hands-on challenge, the capstone |

Concept sections split by content, not by module: mostly ⚙️ in Weeks 2–8, but
m3.1, m5.7, m7.1, m7.8, m8.8 and m9.2/6/7 are 🤝 because they build customer-facing
judgement rather than platform mechanics. Weeks 1 and 10 and the practice page are
🤝 throughout.

- **Sidebar only.** The on-page "On this page" agenda keeps plain prose.
- Top-level module links are untouched — they already carry `W1…W10` and a status
  emoji, and a third marker crowds them.
- 🧭 was the first choice for orientation and was **rejected after looking at it**:
  at sidebar size it renders as a dark grey disc on the near-black rail, visually
  indistinguishable from ⚙️. 📚 is natively bright. Glyph size is 13px, not the
  11px first tried — emoji need it. Don't "fix" this back.
- **A new sub-item needs a `.ty` span**, or it reads as broken next to the others.

## Dashboard course map (added 2026-09-06)
`#dashboard` opens with a **Course map** — a three-level expandable summary of the
whole program, above Week status.

- **Level 1** (visible by default): one row per module, W1–W10 plus the TAM
  practice page. Week badge, title, and nothing else — the page opens on the
  agenda alone.
- **Level 2** (expand a module): its one-line purpose, an "Open the module" link,
  and the list of its sections with their type glyphs.
- **Level 3** (expand a section): two or three sentences on what that section
  covers, plus "Go to this section" which deep-links to `#view/anchor`.

Nested native `<details>` — no JS. The deep links are plain `a[data-view]` outside
`<nav>`, so the existing in-content delegated handler routes them; verified with a
real click, not just programmatically.

**How it was built, and what that means for maintaining it.** The markup was
emitted once by a throwaway script, not hand-typed: the copy lived in a data
structure keyed on real `h3` ids, and the script asserted every anchor existed as
an `<h3>` *and* had a sidebar entry, then reported any sidebar section the map
failed to cover (none — 128 sections across 11 views). Section titles and type
glyphs were lifted from the sidebar markup rather than retyped, so the map started
out unable to disagree with the nav.

The script is **not kept** — this repo has no build step and the generated HTML in
`index.html` is now the source of truth. The consequence: **adding or renaming an
`<h3>` will silently orphan its map entry**, exactly like the quiz answers. Update
the map entry in the same edit, or re-derive the whole block. A cheap check is to
compare the `data-anchor` values in the sidebar against the `href`s in `.cmap`;
they should be one-to-one.

Only the ten modules and the practice page are mapped. The reference views
(Key findings, Priority matrix, Colleague questions, Doc links) are not "classes"
and are left out.

- CSS gotcha worth keeping: the generic `details[open] summary::before` has
  specificity (0,1,3) and **leaks the parent module's open marker onto every
  nested section summary**. `.cmap .csec > summary::before{content:none}` (0,2,2)
  is what beats it. A plain `.csec > summary::before` does not.
- The dashboard now has three `<h3>`s, which by the Navigation convention would
  warrant an "On this page" agenda. Deliberately not added — the course map *is*
  the agenda for this page, and a second one above it would be noise.

## Key findings page
`index.html` carries a **Key findings** reference view collecting the highest-value
findings across modules: symptom→cause lookup, silent failure modes, irreversible
decisions, claims to verify before asserting, numbers to memorise, and the reframes.
**Keep it current as later modules are written** — new silent failures, new
irreversible decisions and new unverified claims all belong there.

## Facts worth not re-deriving
- Docs are strong on the developer layer, thin on operations (RBAC, SLAs,
  numeric rate limits, tenancy, monitoring, AI GA-vs-roadmap). Those gaps are
  the "questions for colleagues" reference page.
- The "15 requests/hour" rate limit figure online belongs to vibe.co, a
  different company. Do not cite it. Real limits are undisclosed in the docs.
- Outbound webhooks (VibeIQ -> customer) support HMAC; inbound trigger-webhooks
  only document an optional shared-secret header. Keep the directions apart.
- The publish event delivery mechanism IS an Event Workflow, so integration
  debugging and workflow debugging are the same skill.
- Board / Plan / Showcase are each backed by an Assortment.
- `federatedId` drives upsert; UI-created entities have none by default —
  the cause of the classic duplicate-records bug.
- Property levels: Family / Option / All / Override. `All` has no copy-down.
- Publish deletes do NOT accumulate across publishes; S3 links expire in 24h.
- `shouldSkipAssortmentPublish` on a loader config bypasses the publish workflow
  entirely: no change history, no AssortmentPublishChange, no `assortment|publish`
  event. A successful load can be completely invisible downstream.
- `partialAssortmentUpdate` defaults to FALSE, meaning REPLACE. A partial file
  wipes everything not in it.
- Loader validation is fail-fast; there are NO partial loads.
- assortmentSplit rows whose split value matches no entry are SKIPPED silently.
- Workflow tasks are strictly serial; a failed task means later tasks never run.
- Deleting a workflow destroys its process/task/logs immediately. Disable instead.
- Option Set Hierarchy configs are keyed on TypePropertyIds; "a slug-based config
  silently fails to load". An off-hierarchy parent value empties the child dropdown.
- `failureArea` on LoaderProcess localises a failure in one field.
- Docs URL note: the loader config and validation pages are at
  /data_loading/loader_configuration/ and /data_loading/validation_and_errors/
  (not the names implied by their nav titles).
- Configuration promotes via `contrail types getAll`/`loadAll`; apps promote via
  publish/install. A full environment promotion is TWO mechanisms.
- App identifier is global+immutable and app ownership is non-transferable. If an
  SI creates the app in their org, the customer can never own it.
- Rule sets evaluate client-side. Whether the API/Loader enforce them is UNCONFIRMED
  and is now a colleague question; do not assert either way.
- CORRECTION to the original Phase 1 assessment: VibeIQ DOES have an end-user
  permission model. Type Policies (READ/CREATE/UPDATE/DELETE) and Type Property
  Policies are among Configuration Copy's 11 exported categories. What is missing is
  documentation, not capability. How they map to named roles is still unknown.
- CLI auth caches to ~/.vibeiq/configs/ on every laptop that ran it — an offboarding
  and handover risk nobody raises.
- An "environment" is just another org; there is no environment abstraction.
