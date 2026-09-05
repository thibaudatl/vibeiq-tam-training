# VibeIQ TAM Training — Progress Dashboard

**Owner:** Leo
**Program:** 10-week VibeIQ Technical Account Manager readiness
**Started:** _[fill in]_
**Last updated:** 2026-09-04 (TAM practice charter + KPIs added)

**How to use this file:** Bring it into each new training conversation. At the end of every module, ask Claude to update it, then save the new version. Status key below.

**Status key:** 🟢 Confident · 🟡 Familiar but needs practice · 🔴 Need to learn · ⬜ Not started

---

## 1. Overall progress

`[▓░░░░░░░░░]` **All 10 modules written · your progress: Module 1 of 10 in progress**

| Phase | Status |
|---|---|
| Phase 1 — Curriculum design | ✅ Complete & approved |
| Phase 2 — Module build | ✅ All 10 modules written |
| Phase 3 — Working through them | 🔄 Week 1 in progress |

---

## 2. Week / module status

| Wk | Module | Status | Quiz | Exercise | Challenge |
|----|--------|--------|------|----------|-----------|
| 1 | Business domain & where VibeIQ sits | 🟡 Quiz passed | ✅ 8/8 (open book) | ⬜ | ⬜ |
| 2 | Core data model (keystone) | 📖 Ready to read | — | — | — |
| 3 | End-user apps & the publish lifecycle | 📖 Ready to read | — | — | — |
| 4 | Data in: the Loader framework | 📖 Ready to read | — | — | — |
| 5 | Data out: integration patterns | 📖 Ready to read | — | — | — |
| 6 | Event Workflows | 📖 Ready to read | — | — | — |
| 7 | Apps, Extensions & the config/customization boundary | 📖 Ready to read | — | — | — |
| 8 | Platform, security & operations | 📖 Ready to read | — | — | — |
| 9 | Troubleshooting & escalation methodology | 📖 Ready to read | — | — | — |
| 10 | Applied TAM practice (capstone) | 📖 Ready to read | — | — | — |

---

## 3. Confidence by major topic

| Topic | Priority | Confidence |
|---|---|---|
| VibeIQ positioning (upstream of PLM, "sits alongside") | 🔴 | 🟡 |
| Core data model: Item / ProjectItem / AssortmentItem | 🔴 | 🔴 |
| Property levels (Family / Option / Override) | 🔴 | 🔴 |
| Project (season) / Assortment structure | 🔴 | 🔴 |
| Plan → publish → AssortmentPublishChange lifecycle | 🔴 | 🔴 |
| Integration patterns: event-driven vs polling | 🔴 | 🔴 |
| Config vs customization boundary | 🔴 | 🔴 |
| Escalation routing (TAM/Support/Eng/Product/PS) | 🔴 | 🔴 |
| Technical discovery methodology | 🔴 | 🔴 |
| Loader pipeline & failure modes | 🔴 | 🔴 |
| AssortmentPublishChange internals (baseline/deletes/24h expiry) | 🟠 | 🔴 |
| Event Workflows (triggers/conditionals/actions) | 🔴 | 🔴 |
| Auth, rate limits, error codes, webhook security | 🟠 | 🔴 |
| Formulas / validation / rule sets / blueprints | 🟠 | 🔴 |
| End-user apps (Boards/Plan/Showcase/Admin) | 🟠 | 🔴 |
| Troubleshooting methodology | 🔴 | 🔴 |
| AI capabilities (GA vs roadmap) | 🟠 | 🔴 |
| SDK / CLI mechanics | 🟡 | 🔴 |
| App manifest / marketplace / lifecycle | 🟡 | 🔴 |
| Extensions (Doc Automation / Contextual / Admin) | 🟡 | 🔴 |

---

## 4. Key concepts learned
_(populated as we go)_
- **Module 1 (2026-09-04).** Quiz answered correctly, but immediately after reviewing the
  module — this measures recognition, not recall. Self-assessed cold recall: "most, but not
  100%, and incomplete." Domain knowledge is strong (PIM background); the gap is VibeIQ-specific
  precision — exact framing, vocabulary, specific numbers.
- Positioning marked 🟡 rather than 🟢 deliberately. It goes to 🟢 when the two elevator pitches
  can be delivered cold, to a person, without notes.

## 5. Important terminology
_(populated as we go — running glossary)_
- **Contrail** — the engineering sub-brand / technical name for the VibeIQ platform.
- **Line** — the full set of products a brand offers for a season.
- **Assortment** — a curated selection of products for a channel, region, customer or cluster. One line → many assortments.
- **Style / colourway / SKU** — the design / the design in a colour / that colour in a size. Maps onto Family → Option in the data model.
- **OTB (open-to-buy)** — budget available to buy inventory; constrains the assortment.
- **IMU** — initial mark-up; the margin target that drives keep/cut decisions.
- **Sell-in vs. sell-through** — selling to the buyer vs. the consumer buying it.
- **federatedId** — a value you provide that uniquely identifies an entity within an org; drives upsert on load.
- **Property levels** — Family, Option, All, Override: how a value propagates from style to colourway.
- **AssortmentPublishChange** — the snapshot created on publish: baseline link, delete link, and detail arrays.
- **Baseline vs. detail** — "what is true now" vs. "what changed this time". Consumers usually need both.
- **Re-baselining** — recovering downstream state from a full baseline after missed publishes.
- **triggerKey** — the event that activates a workflow, e.g. `item|update`. Note `assortment` has only `assortment|publish`.
- **First-match-wins** — only the first workflow path whose conditional is true executes; the rest are skipped.
- **messageGroupId / dynamicMessageGroupId** — static vs. dynamic serialization of workflow events; the fix for concurrency races.
- **Workflow Template Definition** — what a workflow becomes when an app is published; installed per org.
- **LoaderProcess** — the async entity recording a load's status, config and logs. Ask for its ID.
- **Preprocessing artefacts** — `loader-process-step-<Step Name>.json`, the rows/errors/warnings after each step.
- **Morph transformer** — the general-purpose reshaper; powerful, and a maintainability risk when overused.
- **failureArea** — LoaderProcess field: NONE / PARSING_CSV / VALIDATING_DATA / TRANSFORMING_DATA. Read it first.
- **shouldSkipAssortmentPublish** — loader flag that bypasses publish entirely; the load succeeds and downstream never hears.
- **partialAssortmentUpdate** — defaults to false, which means *replace* the assortment, not merge into it.
- **Attribute ownership map** — per attribute: authoritative system, direction, entity layer, property level, conflict rule.
- **Baseline reconciliation** — scheduled comparison of downstream state against a fresh baseline; reports drift.
- **Polling seam** — records lost or doubled at the window boundary; fixed by overlap + idempotency + data-derived timestamps.
- **Configuration Copy** — `contrail types getAll`/`loadAll`; whole-org config export/import between environments.
- **"Locked wins"** — if any matching rule set rule says `editable: false`, the property is locked.
- **Type Policies / Type Property Policies** — the entity- and property-level permission model; thinly documented but real.
- **Workflow Artifacts** — files attached to a workflow process; deleted with the process at 90 days.
- **The spectrum** — types → formulas/rule sets → workflows → extensions → external systems; cost of ownership rises at each rung.

## 6. Topics to revisit
- **Module 1 exercise + scenario still outstanding** — the two 60-second pitches (VP of
  Merchandising / integration engineer) and the Summit Athletic response. These are *performance*
  tasks, not knowledge tasks: knowing the positioning and being able to deliver it under
  question are different skills, and only the second one matters in front of a customer.
- Re-test Module 1 cold in ~1 week (no review beforehand). That number is the real one.

## 7. Knowledge gaps
-

---

## 7b. TAM practice — KPI baseline

The practice charter, service catalogue and full KPI definitions live in the hub:
**Building the TAM practice** (`#practice`). Source note: `modules/practice-tam-operating-model.md`.

Baseline every one of these in the first 60 days — an unbaselined KPI is a slogan,
and the platform only retains 90 days of workflow evidence, so **snapshot monthly**
or the history is gone.

| KPI | Tier | Source | Target | Baseline | Measured |
|---|---|---|---|---|---|
| Account technical health score (0–5) | Outcome | Health check | ≥ 3.5, +0.5/qtr | _[ ]_ | _[ ]_ |
| Escalation rate (P1+P2 / quarter) | Outcome | Ticketing | Down QoQ | _[ ]_ | _[ ]_ |
| P1 recurrence rate | Outcome | Escalation log | 0% | _[ ]_ | _[ ]_ |
| Renewal technical risk (R/A/G) | Outcome | Judgement + score | Green, reasons named | _[ ]_ | _[ ]_ |
| Expansion signals sourced | Outcome | CRM | ≥ 2 / quarter | _[ ]_ | _[ ]_ |
| Reference-ability | Outcome | Ask them | Yes by Q3 | _[ ]_ | _[ ]_ |
| Time to localise | Practice | Escalation log | < 1 business day | _[ ]_ | _[ ]_ |
| Time to first meaningful update | Practice | Escalation log | ≤ 4 hours | _[ ]_ | _[ ]_ |
| Update promises kept | Practice | Escalation log | 100% | _[ ]_ | _[ ]_ |
| Post-incident coverage | Practice | Escalation log | 100% | _[ ]_ | _[ ]_ |
| Improvement cycle time to routed | Practice | Backlog | ≤ 5 working days | _[ ]_ | _[ ]_ |
| Health-check currency | Practice | Own records | 100% < 90 days | _[ ]_ | _[ ]_ |
| Unknowns closed / month | Practice | Section 8 below | ≥ 3 in Q1 | _[ ]_ | _[ ]_ |
| Self-sufficiency | Practice | Own log | ≥ 70% by month 3 | _[ ]_ | _[ ]_ |

**Leading indicators — reviewed weekly, direction not value:** workflow failure trend
(90d) · load success rate & volume · publish cadence gaps · integration lag · adoption
breadth by team · export-to-Excel behaviour · open-unknown age · sponsor engagement.

**Anti-metrics — argue against being measured on these:** tickets closed · response
time alone · usage minutes · hours logged · per-ticket CSAT.

---

## 8. Questions to ask VibeIQ colleagues
_(from Phase 1 Open Questions — confirm answers as you learn them)_
- [ ] Do customers get separate dev/staging/prod orgs? How is config promoted between them?
- [ ] End-user RBAC: Type Policies & Type Property Policies exist (per Configuration Copy) — how do they map to named roles/groups in Boards/Plan/Showcase?
- [ ] What are the actual numeric API rate limits and documented SLAs?
- [ ] What monitoring/alerting do *customers* get for load/publish/workflow failures?
- [ ] AI layer: what's GA vs beta vs roadmap? How are agents configured/governed/monitored?
- [ ] Real internal escalation path & tooling? Who owns integration builds — PS or customer?
- [ ] Data residency options & compliance certs (SOC 2, etc.)?
- [ ] Webhooks: what signature verification is actually enforced? Is HMAC request signing available?
- [ ] Workflow concurrency: real process for raising the 25/workflow and 60/org ceilings; can customers see utilisation?
- [ ] Are rule sets enforced on API/Loader writes, or client-side only? (Changes validation design for integrated fields.)

_Blocking a KPI in section 7b — chase these first:_
- [ ] Is there customer-facing alerting on load / publish / workflow failure? (Blocks the leading-indicator review; without it the customer is the alert.)
- [ ] Can concurrency utilisation be seen against the 25/workflow and 60/org ceilings? (Blocks "integration lag" as a diagnosable number.)
- [ ] What is the real internal routing — TAM / Support / Engineering / Product / PS / CSM? (The charter's boundary table is a *proposal* until this is confirmed.)
- [ ] Which config changes may a TAM make directly in a customer org, and which need PS or customer change control?
- [ ] What retention applies to `LoaderProcess`? (Workflow evidence is 90 days; load history is undocumented.)

## 9. Questions I still don't understand
_(your own running list — add anything unclear)_
-

---

## 10. Useful documentation links
- Docs home (Contrail): https://docs.vibeiq.com/
- Data Loading — Getting Started: https://docs.vibeiq.com/data_loading/getting_started/
- Integration Patterns: https://docs.vibeiq.com/integration_patterns/
- Authentication & API Access: https://docs.vibeiq.com/integration_patterns/authentication/
- Assortment Publish Integrations: https://docs.vibeiq.com/integration_patterns/assortment_publish_integration/
- Change History Polling: https://docs.vibeiq.com/integration_patterns/change_history_polling/
- Workflows: https://docs.vibeiq.com/workflows/
- Apps — Getting Started: https://docs.vibeiq.com/apps/getting_started/
- Extensions: https://docs.vibeiq.com/extensions/
- Configuration: https://docs.vibeiq.com/configuration/
- SDK reference: https://sdk.docs.vibeiq.com/
- Company / platform: https://vibeiq.com/platform/
