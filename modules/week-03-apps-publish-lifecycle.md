# Week 3 — End-User Apps & the Publish Lifecycle

Sources: vibeiq.com/platform; docs.vibeiq.com — Integration Patterns (overview,
Assortment Publish Integration, Change History Polling).

## 1. The three apps

Each app replaces a specific incumbent tool, and each is backed by an Assortment (Week 2).

| App | VibeIQ's own description | Replaces |
|---|---|---|
| **Board** | "The visual workspace for trend research, mood boards, and creative direction" | Miro |
| **Plan** | "The structured workspace for line planning and product definition" | Excel |
| **Showcase** | "The presentation workspace for line reviews and stakeholder alignment" | PowerPoint |

The detail that matters technically:
- **Board** connects unstructured creative work directly to product data, so AI can interpret and
  act on creative intent.
- **Plan** — "each row represents an actual product record." This is the crucial difference from
  a spreadsheet: the grid is a *view onto entities*, not a document. Editing a row edits a
  ProjectItem/AssortmentItem.
- **Showcase** "remains live and current, with feedback flowing back into the product record."
  A deck that is a rendering of live data, not an export of it.

**TAM implication.** When a customer says "we exported to PowerPoint for the review," that is an
adoption failure with a technical smell — usually Showcase not being trusted, or product data too
incomplete to present. Chase the cause, not the behaviour.

## 2. The platform underneath

- **Product Data Platform** — products, assortments, assets.
- **Agent layer** — native agents ("assortment comparison, tech pack generation, trend research,
  carryover analysis"), custom agents, and prompt templates.
- **Integration & App Platform** — App Store of prebuilt connectors to PLM/ERP/DAM/supply chain,
  an **MCP server** exposing product data to external orchestration layers, plus APIs, SDKs, CLI.

## 3. The publish lifecycle, end to end

1. Users modify Items (products, materials) in a Plan.
2. Users adopt images, colours and attributes onto Items.
3. A user triggers **publish**.
4. The system **persists the Plan rows down to the underlying Assortment**.
5. An **`AssortmentPublishChange`** is created — "a snapshot of those changes."
6. External systems retrieve and process it.

Step 4 is the one people miss: publish is not "send to PLM." Publish is first an *internal*
commit from the Plan to the Assortment. The downstream integration is a consumer of the record
that commit produces. A publish can therefore succeed while the downstream sync fails, and those
are two different investigations.

### Anatomy of an AssortmentPublishChange
| Field | Contents |
|---|---|
| `assortmentBaselineDownloadLink` | S3 URL — "the Assortment's complete state at publish time" |
| `deleteDataDownloadLink` | S3 URL — "only Items that were dropped or deleted in this specific publish" |
| `detail` | Arrays: `adds`, `updates`, `deletes`, `familyItemsRemoved` |

Baseline answers "what is true now." Detail answers "what changed this time." Consumers usually
need both: detail for efficiency, baseline for recovery.

### The two rules that cause incidents
- **Deletes do not accumulate.** "Delete data does NOT accumulate across publishes. Each
  AssortmentPublishChange only contains deletes from that individual publish." A consumer that
  misses publish #15 has permanently missed those deletes. The only cure is re-baselining.
- **S3 links expire after 24 hours.** Re-fetching the change object refreshes them. Store the
  change **ID**, never the URL.

## 4. Two ways to consume it (Week 5 in outline)

| Aspect | Change History Polling | Assortment Publish Events |
|---|---|---|
| Trigger | "Time-based (scheduled)" | "Event-based (on publish)" |
| Latency | "Minutes to hours" | "Near real-time" |
| Complexity | "Simple to implement" | "Requires webhook endpoint" |

**Polling** hits `/api/change-history`, filtering by a time range (`createdOn` supports a
`BETWEEN` syntax). The consumer stores a last-sync timestamp and advances it after each
successful poll. Temporal filtering, not cursors — which means clock handling and overlap windows
are the consumer's problem, and a naive implementation drops or duplicates records at the seam.

Best for: batch sync on a schedule, tracking multiple entity types, historical retrieval, and
systems with no webhook support.

**Event-driven** pushes on publish; the consumer calls back for full detail.
Best for: real-time needs, assortment-specific workflows, webhook-capable systems, minimising
API calls.

## 5. TAM framing
The publish seam is where "it works in VibeIQ but not in PLM" lives. Localise before theorising:
1. Did the publish happen? (Is there an AssortmentPublishChange?)
2. Did the Plan rows actually reach the Assortment?
3. Did the consumer receive/poll it?
4. Did the consumer process it correctly — including the deletes?
Four checkpoints, in order. Most escalations die at one of the first two, which are entirely
inside VibeIQ and therefore yours to answer.
