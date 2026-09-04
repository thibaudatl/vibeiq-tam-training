# VibeIQ TAM Training — Progress Dashboard

**Owner:** Leo
**Program:** 10-week VibeIQ Technical Account Manager readiness
**Started:** _[fill in]_
**Last updated:** 2026-09-04

**How to use this file:** Bring it into each new training conversation. At the end of every module, ask Claude to update it, then save the new version. Status key below.

**Status key:** 🟢 Confident · 🟡 Familiar but needs practice · 🔴 Need to learn · ⬜ Not started

---

## 1. Overall progress

`[▓░░░░░░░░░]` **Module 1 of 10 in progress**

| Phase | Status |
|---|---|
| Phase 1 — Curriculum design | ✅ Complete & approved |
| Phase 2 — Module build | 🔄 Week 1 in progress |

---

## 2. Week / module status

| Wk | Module | Status | Quiz | Exercise | Challenge |
|----|--------|--------|------|----------|-----------|
| 1 | Business domain & where VibeIQ sits | 🔄 In progress | — | — | — |
| 2 | Core data model (keystone) | 📖 Ready to read | — | — | — |
| 3 | End-user apps & the publish lifecycle | 📖 Ready to read | — | — | — |
| 4 | Data in: the Loader framework | ⬜ | — | — | — |
| 5 | Data out: integration patterns | ⬜ | — | — | — |
| 6 | Event Workflows | 📖 Ready to read | — | — | — |
| 7 | Apps, Extensions & the config/customization boundary | ⬜ | — | — | — |
| 8 | Platform, security & operations | ⬜ | — | — | — |
| 9 | Troubleshooting & escalation methodology | ⬜ | — | — | — |
| 10 | Applied TAM practice: discovery, reviews, QBRs | ⬜ | — | — | — |

---

## 3. Confidence by major topic

| Topic | Priority | Confidence |
|---|---|---|
| VibeIQ positioning (upstream of PLM, "sits alongside") | 🔴 | 🔴 |
| Core data model: Item / ProjectItem / AssortmentItem | 🔴 | 🔴 |
| Property levels (Family / Option / Override) | 🔴 | 🔴 |
| Project (season) / Assortment structure | 🔴 | 🔴 |
| Plan → publish → AssortmentPublishChange lifecycle | 🔴 | 🔴 |
| Integration patterns: event-driven vs polling | 🔴 | 🔴 |
| Config vs customization boundary | 🔴 | 🔴 |
| Escalation routing (TAM/Support/Eng/Product/PS) | 🔴 | 🔴 |
| Technical discovery methodology | 🔴 | 🔴 |
| Loader pipeline & failure modes | 🟠 | 🔴 |
| AssortmentPublishChange internals (baseline/deletes/24h expiry) | 🟠 | 🔴 |
| Event Workflows (triggers/conditionals/actions) | 🔴 | 🔴 |
| Auth, rate limits, error codes, webhook security | 🟠 | 🔴 |
| Formulas / validation / rule sets / blueprints | 🟠 | 🔴 |
| End-user apps (Boards/Plan/Showcase/Admin) | 🟠 | 🔴 |
| Troubleshooting methodology | 🟠 | 🔴 |
| AI capabilities (GA vs roadmap) | 🟠 | 🔴 |
| SDK / CLI mechanics | 🟡 | 🔴 |
| App manifest / marketplace / lifecycle | 🟡 | 🔴 |
| Extensions (Doc Automation / Contextual / Admin) | 🟡 | 🔴 |

---

## 4. Key concepts learned
_(populated as we go)_
-

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

## 6. Topics to revisit
-

## 7. Knowledge gaps
-

---

## 8. Questions to ask VibeIQ colleagues
_(from Phase 1 Open Questions — confirm answers as you learn them)_
- [ ] Do customers get separate dev/staging/prod orgs? How is config promoted between them?
- [ ] What is the end-user RBAC model (roles/permissions in Boards/Plan/Showcase)?
- [ ] What are the actual numeric API rate limits and documented SLAs?
- [ ] What monitoring/alerting do *customers* get for load/publish/workflow failures?
- [ ] AI layer: what's GA vs beta vs roadmap? How are agents configured/governed/monitored?
- [ ] Real internal escalation path & tooling? Who owns integration builds — PS or customer?
- [ ] Data residency options & compliance certs (SOC 2, etc.)?
- [ ] Webhooks: what signature verification is actually enforced? Is HMAC request signing available?
- [ ] Workflow concurrency: real process for raising the 25/workflow and 60/org ceilings; can customers see utilisation?

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
