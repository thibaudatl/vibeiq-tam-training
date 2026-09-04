# Project state

Living status doc. Update at the end of each working session so a fresh
conversation can pick up cold. (`HANDOFF.md` is the original design-session
handoff, kept for provenance — this file supersedes it for current status.)

**Last updated:** 2026-09-04

## What this is
A self-paced 10-week technical training program for Leo, starting as a
Technical Account Manager at VibeIQ. Grounded in the official Contrail docs
(docs.vibeiq.com). Delivered as a single-file static site (`index.html`) plus
a markdown tracker (`dashboard.md`) and per-week source notes (`modules/`).

## Repo
- `git@github.com:thibaudatl/vibeiq-tam-training.git`, branch `main`, public.
- Commits use `leo.thibaudat@gmail.com` (repo-local override; global identity
  is an Akeneo address and is deliberately not used here).
- **GitHub Pages: not yet enabled.** Settings → Pages → Deploy from a branch →
  `main` / `(root)`. Target URL: https://thibaudatl.github.io/vibeiq-tam-training/

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
| 7 | Apps, Extensions & the config/customization boundary | to write |
| 8 | Platform, security & operations | to write |
| 9 | Troubleshooting & escalation | to write |
| 10 | Applied TAM practice (capstone) | to write |

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
3. GitHub Pages still needs enabling by Leo (no `gh` CLI on this machine).

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
