# Week 9 — Troubleshooting & Escalation Methodology

Synthesis of Weeks 2–8. Almost no new facts; the value is sequence and discipline.

## The rule
First question is **not** "why is this happening?" but **"which segment of the pipeline is this
in?"** Localisation is cheap (the platform records nearly everything) and eliminates whole
categories in one check.

## Six checkpoints
| CP | Segment | Check |
|---|---|---|
| 1 | Source | Is the value correct in the source file at all? |
| 2 | Loader | LoaderProcess: status, config used, per-step artefacts. Diff consecutive steps. |
| 3 | Entities | Which layer holds it, at which property level? Is the federatedId as expected? |
| 4 | Workflows/formulas | Process List: fired? which path? taskOutputs? Did a formula overwrite it? |
| 5 | Publish | Is there an AssortmentPublishChange? Did Plan rows reach the Assortment? |
| 6 | Consumer | Received it? Processed it — including deletes? |

**Bisect: start at CP3.** Correct there → problem is downstream. Wrong there → upstream. One look
halves the search space.

## Universal question set
Which entity layer? · Which property level? · Which federatedId, and what generates it? ·
Create or update? · Which process ID? · When did it last work?
→ Ask in the customer's language ("style-level or colour-level field?").

## Three ladders
**A — load** (CP2): process ID → compare config vs last good run → per-step artefacts (diff) →
column matching → option-set alignment → federatedId → if artefacts are right, exonerate the load.

**B — automation** (CP4): process exists? → isActive/installed/version → triggerKey → did the
change emit that event? → which path ran (first-match-wins; oldData absent on creates) →
taskOutputs (COMPLETE-but-no-op = access grant or config) → intermittent+load-correlated =
concurrency.

**C — downstream** (CP5/6): publish happened? → rows reached Assortment? → delivery workflow
fired (= Ladder B) → consumer received/polled? → processed deletes? → gap in change IDs →
re-baseline.

## Symptom shape → class of cause
Intermittent/load-correlated/different records → concurrency race.
Consistent/silent/every record → configuration.
Part of a batch → create-vs-update divergence.
Started on a date, "nothing changed" → deploy, config promotion, or expiry.
Sporadic missing, unreproducible → integration seam.
Correct at write, wrong later → recalculation or copy-down.
Only some users → permissions or client-side rules.
Everything slow → shared capacity.

**Highest-yield question: "If you retry, does the same record fail?"** Same → logic/config.
Different → timing/concurrency.

## Evidence and its lifetime
LoaderProcess + per-step artefacts (—) · Process List status/triggerEvent/taskOutputs (90d) ·
Workflows Dashboard (90d) · Workflow Artifacts (90d) · AssortmentPublishChange + baseline (links
24h, refetch refreshes) · config export (—).
Establish what still exists before promising root cause on an old problem.

## Escalation contents
1. The segment (localised, not "X is broken") 2. Identifiers 3. **What you ruled out and how**
(most often omitted, saves the most time) 4. The shape 5. Business impact + clock
6. Hypothesis, marked as a hypothesis.

Routing default (CONFIRM VibeIQ's real process internally — it is not public):
TAM = config/data model/integration design/adoption · Support = reproducible defects ·
Engineering = confirmed defects, corruption · Product = capability gaps ("no trigger exists") ·
PS = build work · CSM = concurrency ceilings, marketplace approval, commercial.

## Holding the customer
Separate known / suspected / unknown, explicitly. Commit to a next *update* time, not a
resolution time. Give them something to do. Say the impact back in their terms. Close the loop
with the mechanism, not just "fixed."
**Never answer "who's wrong?"** — answer "here's what happened and what we change."
