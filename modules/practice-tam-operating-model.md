# Practice — Building the TAM function at VibeIQ

Not a week of the curriculum. Weeks 1–10 build the knowledge; this is how the job
is *run*. Written because the role is not defined at VibeIQ yet — so the first
deliverable is the definition.

Two layers in one document: the **charter + KPIs** are shareable upward; the rest
is the operating detail. Designed for one post-implementation account with a live
sync/performance escalation, with an explicit path to a repeatable practice.

---

## 1 · Charter

**Definition.** The TAM is accountable for whether the customer's VibeIQ
implementation keeps producing the outcome it was bought for: *decisions are made
in VibeIQ, and the context behind them survives downstream.* (Week 1's value
statement, made measurable.)

**Four accountabilities**
1. **Technical health** — the state of the implementation, known and reported
   before the customer reports it.
2. **Escalation ownership** — localise, communicate, close with a mechanism.
3. **The improvement pipeline** — intake → classify → route → land, with the
   customer seeing the queue.
4. **Technical reference** — the person both sides call first; internally, the
   voice of this account's reality.

**Boundary (proposal — confirm against VibeIQ's real process; the docs do not
define it and the W9 routing table is an inference)**

| Function | Owns | Handoff trigger |
|---|---|---|
| **TAM** | Config, data model, integration design, adoption, technical relationship | — |
| **Support** | Reproducible defects, break/fix with a ticket | Reproduced on demand, no design question left |
| **Engineering** | Confirmed defects, data corruption, platform behaviour | Support confirms, or corruption suspected |
| **Product** | Capability gaps ("no trigger exists for that") | Requirement is real and no configuration reaches it |
| **Professional Services** | Build work — loaders, workflows, extensions | Scope exceeds advisory; someone must write it |
| **CSM / AE** | Commercial, renewal, ceilings, marketplace approval | Money, contract, or a limit that needs raising |

**Not in scope** — say this out loud early, because an undefined role gets eaten:
building and owning the customer's integrations; being their L1 helpdesk; owning
the commercial relationship; approving their internal releases; being on call.

---

## 2 · Service catalogue

Named, repeatable deliverables. Each already has an artefact from Weeks 1–10 —
reuse those, do not invent new ones.

| Service | Trigger | Output | Cadence / turnaround |
|---|---|---|---|
| Account technical health check | Quarterly, or on inheriting | Ranked written report | 5 working days |
| Architecture & design review | Any new integration/workflow/extension | Ranked findings, blockers separated | 3 working days |
| Escalation management | P1/P2 raised | Localisation + updates + post-incident note | First update ≤ 4h |
| Improvement-request triage | Continuous | Classified, ranked backlog | Weekly grooming |
| Integration performance review | Monthly while the escalation is open | Lag/volume/failure trend | Monthly |
| Enablement session | Monthly | One topic, their data | Monthly |
| QBR technical section | Quarterly | Risk story + one risk they didn't know | Quarterly |
| Release-readiness note | Each VibeIQ release | What changes for *this* customer | Per release |

## 3 · Cadence

- **Daily (20 min)** — workflow failure dashboard, load statuses, open escalations.
- **Weekly** — customer technical sync (30 min, agenda: escalations, backlog,
  one risk); internal routing review; backlog grooming.
- **Monthly** — health metrics pack; improvement review with the customer;
  product advocacy packet for anything blocked on a capability gap.
- **Quarterly** — health check refresh; QBR; **charter review** (the role is new;
  revise it against what the quarter actually demanded).

---

## 4 · The inherited escalation — sync + performance

Method, not guesswork. Week 9 applies directly.

**Localise first.** Six checkpoints; bisect at CP3 (entities). One look halves the
search space. Never open with a theory.

**Separate three words the customer uses interchangeably:**
- **Slow** — the operation takes long. Shared capacity, concurrency, batch size.
- **Late** — it arrives eventually. Polling window, queue depth, serialization.
- **Lossy** — it never arrives. Seam, deletes, filters, silent skips.

Different causes, different owners, different fixes. Ask which one they mean
before anything else.

**Sync-specific checks** (all from Key findings — these are the silent ones):
- Event-driven or polled? Polling has a seam; overlap + idempotency + data-derived
  timestamps, not "last successful run time".
- Did a publish actually happen? `AssortmentPublishChange` present?
- `shouldSkipAssortmentPublish` on the loader config — a successful load that is
  completely invisible downstream.
- `partialAssortmentUpdate` defaults to **false = replace**. A partial file wipes
  what is not in it.
- Are **deletes** processed by the consumer? They do not accumulate across publishes.
- Gaps in change IDs → missed publishes → re-baseline.
- Baseline links expire in **24h** (refetch refreshes).
- Intermittent, load-correlated, different records each time → concurrency;
  `messageGroupId` / `dynamicMessageGroupId` is the fix.
- Duplicates → `federatedId` generation, and UI-created records that never had one.
- Highest-yield question: **"If you retry, does the same record fail?"**
  Same → logic/config. Different → timing/concurrency.

**Evidence has a lifetime.** Process List, Workflows Dashboard and Workflow
Artifacts: 90 days. Baseline links: 24h. Establish what still exists before
promising root cause on an old problem.

**Communication protocol**
- State **known / suspected / unknown** separately, every time.
- Commit to the next **update** time, not a resolution time.
- Always give them something to do.
- Say the impact back in their terms.
- **Never answer "who's wrong?"** — answer "here's what happened and what we change."
- Close with the *mechanism*, not "fixed", then a written post-incident note that
  names the decision that made it possible. Recurrence is a KPI.

---

## 5 · Improvement-request pipeline

**Intake** (fixed fields): what outcome · who is blocked · frequency · current
workaround and its cost · what breaks if we do nothing.

**Classify on the Week 7 spectrum** — which is also the cost-of-ownership ranking:

| Class | Owner | Cost of ownership |
|---|---|---|
| Types / configuration | TAM (advise) or customer admin | Lowest |
| Formulas / rule sets | TAM advises, customer configures | Low |
| Event workflows | PS or customer dev | Medium — it is a release, not a setting |
| Extensions | Customer/SI dev | High — hosting, on-call, an owner who may leave |
| External system | Customer | Highest |
| Product gap | Product, via advocacy packet | Not solvable here |

Rule: **push work down the ladder wherever the requirement allows.** Half of
"we need a workflow" is a property level or a rule set.

**Advocacy packet** (what makes Product act): the requirement, frequency, number
of affected users/accounts, revenue exposure, the workaround and its annual cost,
and what the customer does if the answer is no.

---

## 6 · Growth, technically led

Signals a TAM sees first — hand them to CSM as qualified signal, do not sell:
adoption spreading to a team that was not in scope · new integration seams asked
for · a second brand, region or season · marketplace/app interest · the
export-to-Excel habit disappearing (the real adoption tell) · the customer asking
about limits and ceilings (they are scaling).

Counter-signal, worth just as much: usage flat while headcount grew; one power
user carrying the account; exports rising again.

## 7 · Relationship & being the technical reference

- **People map**: who lags, who is sceptical, who has been burned before. Update it.
- **Bring one risk you found before they did, every time.** This is the entire
  basis of the relationship.
- **Disagree well**: lead with what is right; argue *consequence*, not correctness;
  give the symptom, not the principle. You are not winning — you are getting the
  change made by someone who still calls you next time.
- **"I'll find out" is a commitment.** Track open unknowns with owners and dates;
  age them. The colleague-questions page is a work item, not a reading list.

---

## 8 · Instrumentation — where numbers come from

| Signal | Source | Caveat |
|---|---|---|
| Load success / volume | `LoaderProcess` (status, `failureArea`) | Retention not documented |
| Workflow failure trend | Process List / Workflows Dashboard | **90 days only** |
| Workflow detail | `taskOutputs`, Workflow Artifacts | 90 days |
| Publish cadence | `AssortmentPublishChange` | Baseline links 24h |
| Integration lag | Consumer-side ack — customer must instrument | Not visible in VibeIQ |
| Adoption breadth | Change history by user/team | Manual |
| Escalations, updates, recurrence | Own log + ticketing | Own discipline |
| Expansion signal | CRM | Shared with CSM |

**Not observable today — each blocks a metric, each is a colleague question:**
customer-facing alerting on load/publish/workflow failure · numeric rate limits
and SLAs · workflow concurrency utilisation against the 25/60 ceilings · whether
rule sets are enforced on API/Loader writes.

The 90-day evidence lifetime is itself a constraint: no trend metric can look
back further, so **snapshot monthly** or the history is gone.

---

## 9 · KPIs and indicators

Four tiers. Outcome = what the business buys. Practice = whether the job is run
well. Leading = early warning. Anti-metrics = what not to be measured on.

### 9a · Outcome KPIs (quarterly, shareable)

| KPI | Definition | Source | Starting target | How it lies |
|---|---|---|---|---|
| **Account technical health score** | Composite 0–5, see 9e | Health check | ≥ 3.5, +0.5/quarter | Self-scored — publish the criteria |
| **Escalation rate** | P1+P2 raised per quarter | Ticketing | Down quarter on quarter | Falls when they stop reporting |
| **P1 recurrence rate** | % of P1s with the same root cause as a previous one | Escalation log | 0% | Requires honest root-cause naming |
| **Renewal technical risk** | R/A/G with named reasons | TAM judgement + score | Green, no unnamed ambers | Optimism; force written reasons |
| **Expansion sourced** | Qualified technical signals passed to CSM that became pipeline | CRM | ≥ 2 / quarter | Rewards volume — quality-gate it |
| **Reference-ability** | Will they take a prospect call? | Ask them | Yes by quarter 3 | A single relationship, not the account |

### 9b · Practice KPIs (monthly)

| KPI | Definition | Target |
|---|---|---|
| **Time-to-localise** | Escalation open → checkpoint (CP1–6) named in writing | < 1 business day |
| **Time-to-first-meaningful-update** | Not an ack — known/suspected/unknown stated | ≤ 4 hours |
| **Update-promise kept** | % of committed update times met | 100% — the one that must not slip |
| **Post-incident coverage** | % of P1/P2 closed with a written mechanism note | 100% |
| **Improvement cycle time** | Intake → classified & routed, by class | ≤ 5 working days to routed |
| **Health-check currency** | % of accounts with a check < 90 days old | 100% |
| **Unknowns closed** | Colleague questions answered and documented | ≥ 3 / month, first quarter |
| **Self-sufficiency** | % of customer technical questions answered without internal escalation | ≥ 70% by month 3 |

### 9c · Leading indicators (weekly, 10 minutes)

Trend, not value — the direction is the signal.

| Indicator | Watch for | Means |
|---|---|---|
| Workflow failure count, 90d | Any upward slope | Degradation before a ticket |
| Load success rate / volume | Drop, or a volume step change | Broken feed, or a new season |
| Publish cadence | A gap vs. their calendar | Team disengaged, or blocked |
| Integration lag | Widening | Approaching a capacity ceiling |
| Adoption breadth by team | One team flat | The weak link that kills renewal |
| Export-to-Excel behaviour | Rising | They stopped trusting the system |
| Open-unknown age | Anything > 30 days | Your own follow-through failing |
| Sponsor engagement | Declining meeting attendance | Political risk, earliest of all |

### 9d · Anti-metrics — do not be measured on these

| Metric | Behaviour it produces |
|---|---|
| Tickets closed | Volume over prevention — the good quarter looks idle |
| Response time alone | Fast acks with no content |
| Usage minutes / logins | Confuses presence with decisions being made |
| Hours logged per account | Optimises for busyness, not risk |
| CSAT on individual tickets | Measures politeness during an outage |

### 9e · The health score (0–5 each, publish the criteria)

| Dimension | Weight | 5 | 1 |
|---|---|---|---|
| Integration reliability | 30% | No missed publishes, deletes handled, consumer instrumented | Silent losses, no reconciliation |
| Workflow health | 25% | Flat/zero failures, grouping correct, owner named | Rising failures, nobody sees FAILED |
| Data-model hygiene | 20% | federatedId stable, property levels right, no duplicates | Duplicates, copy-down clobber |
| Adoption breadth | 15% | All intended teams deciding in-app | One team, exports everywhere |
| Open risk | 10% | No unaddressed blockers | Known irreversible risks unowned |

Weighted mean, one decimal. **Version 1 — recalibrate after one quarter** and say
so when presenting it; a score nobody can reproduce is worse than no score.

---

## 10 · First 90 days

**Days 1–30 — inherit and stabilise**
1. `contrail types getAll` — ground truth, not memory.
2. Data-model health check (W2).
3. Workflow inventory + 90-day failure chart (W6).
4. Integration review (W3/W5) — and take control of the live escalation:
   localise it, then set the update rhythm.
5. Platform/ops: org topology, credentials, custom apps and runtimes, concurrency.
6. People map.
7. **Write it up, ranked, share it.** That document is the credibility.

**Days 31–60 — define and baseline**
Publish the charter (this document's sections 1–3) internally, and ask for the
boundary to be confirmed. Deliver the first ranked health report. Baseline every
KPI in section 9 — an unbaselined KPI is a slogan. Start the weekly indicator review.

**Days 61–90 — prove and adjust**
Full cadence running. First QBR delivered, with one risk they did not know.
Escalation closed with a mechanism and a post-incident note. Charter revised
against what the quarter actually demanded, and the revision presented — a role
defined once and never revisited was defined wrong.

## 11 · From one account to a practice

**What becomes a template** — health check, review checklists, escalation
comms template, intake form, advocacy packet, the KPI pack. Everything done twice
becomes a template the second time.

**Tiering** (proposal): Tier 1 — strategic, custom integrations, named TAM,
full cadence. Tier 2 — standard integrations, pooled TAM, quarterly health check
and reactive escalation. Tier 3 — self-serve, no named TAM, playbooks only.
Entry/exit criteria written and reviewed quarterly, so tiering is a decision, not
a habit.

**When a second TAM is justified** — argue from the KPIs, not from feeling busy:
health-check currency below 100%, time-to-first-update slipping, unknowns aging
past 30 days, or Tier-1 count above the point where the weekly cadence stops
fitting. Set that threshold *before* it is crossed.

## 12 · What the practice needs — the asks

Ranked; three blockers, not twelve findings.

1. **Confirmation of the boundary** in section 1 — without it, every escalation
   is renegotiated from scratch.
2. **Visibility**: customer-facing failure alerting, and concurrency utilisation
   against the ceilings. Two KPIs above are unmeasurable until these exist.
3. **Decision rights**: what config changes a TAM may make directly in a customer
   org, and what requires PS or customer change control.

Then: documented rate limits and SLAs; the real internal routing and tooling;
GA-vs-roadmap clarity on the AI layer; whether rule sets are enforced server-side.
