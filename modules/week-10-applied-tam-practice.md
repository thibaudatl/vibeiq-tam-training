# Week 10 — Applied TAM Practice (Capstone)

Synthesis of Weeks 1–9. No new platform facts by design.

## The four situations
| Situation | Really doing | Fails when |
|---|---|---|
| Discovery | Predicting what will break | You catalogue systems instead of finding constraints |
| Architecture review | Finding the flaw before production does | You're right but the engineer stops listening |
| Incident | Localising, then communicating | You theorise early or over-promise timing |
| QBR | Telling a health story with evidence | You report activity instead of risk |

## Discovery that predicts
A good question's answer **changes what you expect to go wrong**. Ten sharpened questions, each
mapped to what it predicts — federatedId generation (duplicates), which attributes vary by
colourway (property levels/copy-down), hand-created records before integration (federatedId gap),
what happens when a style is cut (missed deletes), changes that never publish (events vs
polling), who owns cost vs price (ownership map), seasonal peak (concurrency), custom UI hosting
and on-call (extensions), whose org apps are created in (permanent ownership), residency and
compliance (procurement blockers).

**Several have value that expires.** That is the argument for TAM involvement in implementation:
"there are six questions that cost nothing now and can't be fixed later."

## Review method
1. Establish the requirement first — half of bad designs correctly solve a misunderstood need.
2. Trace one record end to end, out loud.
3. Test unhappy paths — down a day, duplicate delivery, partial failure, bulk load, new season.
4. Check the irreversible decisions.
5. Name the operational cost — who runs it, who's alerted, what if the builder leaves.
6. **Rank.** Twelve flat findings get ignored; three blockers get fixed.

### Workflow review checklist
Unreachable paths · create-vs-update behaviour · trigger fitness (does the event exist?) ·
access grants · config environment values · message grouping vs what collides · org concurrency
budget · who sees FAILED · does the customer know a change is a release?

**Disagreeing well:** lead with what's right; be specific about *consequence*, not correctness;
give the symptom, not the principle. You're not winning — you're getting the change made by
someone who still calls you next time.

## QBR — risk, not activity
Signals: workflow failure trend (90d dashboard) · load success/volume (LoaderProcess) · publish
cadence · adoption by team (which is the weak link) · export behaviour (conversation) · open
unknowns you owe them.

**Health = "are decisions being made here, and is context surviving downstream?"** — the Week 1
value statement, measured. Not usage minutes.
**Bring one risk you found before they did, every time.**

## Inheriting an account — first 30 days
1. `contrail types getAll` — ground truth, not memory
2. Data-model health check (W2)
3. Workflow inventory + 90-day failure chart (W6)
4. Integration review (W3/W5)
5. Platform & ops: org topology, credentials, custom apps + runtimes, concurrency (W8)
6. The people map — who lags, who's sceptical, who's been burned
7. **Write it up, ranked, and share it.** That document is your credibility.

## Capstone: Meridian Outdoor
Mid-size outdoor apparel/footwear, ~1,200 styles/season, FlexPLM + SAP + Bynder + Anaplan,
Excel/PowerPoint today, SI doing the build.
- **Phase 1 Discovery** — 12 ordered questions, the 3 whose value expires, the 60-second "what
  does it replace", and handling "we'll just point our nightly export at it."
- **Phase 2 Architecture review** — a design with planted flaws: FlexPLM internal ID as
  federatedId, all pricing at Family level, `item|update` workflow at parallelWorkerCount 20 with
  no grouping, extension on the integrator's Vercel, app in the integrator's org, hourly polling
  from last successful run time, one API key for dev and prod. Find all; name the two that become
  unfixable; rank; identify the one requiring "I'll find out".
- **Phase 3 Incident** — wrong (style-level) prices, 900 spurious FlexPLM updates, three dropped
  styles still present. Map to checkpoints, separate root causes, trace back to Phase 2 decisions.
- **Phase 4 QBR** — merch adopted, design lagging, publish healthy, failure chart rising, two
  unknowns still open after a quarter.

## After Week 10
- **Close the standing unknowns** — the colleague-questions page is a work item with owners and
  dates, not a reading list.
- **Keep the kit alive** — the eight artefacts are worth more than the modules; update them, and
  add new silent failures and irreversible decisions to Key findings.
