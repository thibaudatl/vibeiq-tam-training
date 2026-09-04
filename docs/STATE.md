# Project state

Living status doc. Update at the end of each working session so a fresh
conversation can pick up cold. (`HANDOFF.md` is the original design-session
handoff, kept for provenance — this file supersedes it for current status.)

**Last updated:** 2026-09-04 — all 10 modules written

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
