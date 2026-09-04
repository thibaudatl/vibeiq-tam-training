# Week 5 — Data Out: Integration Patterns (deep)

Sources: docs.vibeiq.com/integration_patterns — overview, authentication,
assortment_publish_integration, change_history_polling.

## Choosing
| Aspect | Polling | Publish events |
|---|---|---|
| Trigger | time-based (scheduled) | event-based (on publish) |
| Latency | minutes to hours | near real-time |
| Complexity | simple | requires webhook endpoint |
| State | in the consumer (timestamp) | in the delivery (event) |
| Scope | any entity type | assortment publishes only |

**The scope row decides most architectures.** Events cover publishes; item changes that never
publish aren't carried. Many customers run both: events for latency, polling as safety net.

## Auth
Base URL `https://api.vibeiq.com/prod/api`. Headers `X-Api-Key`, `X-Api-Org`.
Keys via `contrail app getApiKey`, format `app:uEL7GCBZ7Xhd4w2z` (`app:` = application-scoped).
VibeIQ can supply a token directly if CLI isn't preferred.

Errors: `401` (key/expiry/org slug mismatch) · `404` (absent OR access denied OR wrong entity
type — not proof of absence) · `429` (backoff, reduce, batch).

Rate limits: "rate-limited to ensure system stability", numbers undisclosed; contact support for
higher limits. → Never promise a throughput figure. (And the "15 req/hour" figure online is
vibe.co, a different company.)

Hygiene: never commit keys; env vars/secrets manager; **separate keys per environment**; prefer
app keys; rotate and revoke.
→ Composes with the Week 6 hazard: shared key + promoted workflow `config` = staging writing to
production.

## Event-driven path
Event payload is thin:
```
{ "assortmentId": "25uDvGNpYhZHw2nt", "assortmentPublishChangeId": "lTuARQLrhgWHNr3k" }
```
**The delivery mechanism is an Event Workflow** — "Configure an Event Workflow in VibeIQ to
forward events to your endpoint." So "the event never arrived" is a Week 6 workflow
investigation: Process List, paths, access grants, taskOutputs.

Fetch the change: `GET /assortments/{assortmentId}/history/{changeId}` with the auth headers,
or SDK `Entities().get({entityName:'assortment', id, suffix:'history/…'})`.

Baseline download uses the same auth headers. Structure:
`baselineData.assortmentItems[]` → `.item`, `.item.itemFamily`, `.projectItem`.
→ **Week 2's layers are literally in the payload.** Mapping is a data-model decision, not
plumbing. Highest-leverage moment to be in the room.

Documented consumer sequence: receive webhook → fetch change object → download+parse baseline →
extract `assortmentItems` → transform → persist → **store `createdOn` for change tracking**.

## Polling path and the seam
`/api/change-history`, `createdOn BETWEEN <a> AND <b>`. Consumer stores last-sync timestamp.

**Temporal filtering is not a cursor.** Three failure causes:
1. Boundary exclusivity — inclusive double-processes, exclusive loses same-instant records.
2. In-flight writes — committed after the query ran but timestamped before the cutoff: lost.
3. Clock skew — locally computed `now` skips windows.

Four guards: overlap the window (`lastSync − margin`) · idempotent processing · advance the
timestamp from **max `createdOn` returned**, not the local clock · never advance on partial
failure.

Symptom: occasional missing records, no errors, not reproducible. Go read the window
computation, not the data.

## Resilient consumer — six hazards
| Hazard | Answer |
|---|---|
| S3 links expire 24h | persist the change **ID**, re-fetch for fresh links |
| Deletes don't accumulate | track processed change IDs; on a gap, re-baseline |
| Downtime | reconcile against baseline on restart |
| 429 | exponential backoff with jitter, batch, cache |
| Duplicate delivery | idempotent writes keyed on entity + change |
| Partial failure | transactional apply or resumable ledger |

**Periodic baseline reconciliation** is the habit to recommend: compare downstream against a
fresh baseline on a schedule, report differences rather than silently correcting.

## Webhook security — two directions
| | Inbound (external → VibeIQ) | Outbound (VibeIQ → external) |
|---|---|---|
| Endpoint | `POST /api/trigger-webhooks/{ID}` | customer's URL |
| Verification | `X-Verify-Signature`, **optional**, shared secret in a header | API key headers, **HMAC signatures**, or IP allowlisting |
| Setup | CLI/API; webhook ID in URL = bearer credential | "Configuration requires contacting VibeIQ support" |

Recommend HMAC outbound. Don't assert inbound strength. Outbound setup goes through support →
lead-time item in implementation plans.

## Attribute ownership map
Per attribute: authoritative system · direction · VibeIQ entity layer · property level · conflict
rule. "PLM overwrote our margin target" is the absence of this artefact, not a bug.
