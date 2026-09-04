# Week 2 — Core Data Model (KEYSTONE)

> This is the keystone module. Almost every escalation you will ever handle resolves to
> something on this page: which entity is the value on, at which property level, and under
> which federatedId.

Sources: docs.vibeiq.com — Data Loading / Getting Started, Property Type Handling,
Loading Projects; Integration Patterns / Assortment Publish Integration.

## 1. The three item layers

VibeIQ does not store "a product" once. The same product exists at up to three levels, each
with a different **scope**. This is the single most important structural idea in the platform.

| Entity | Scope | Answers | Typical data |
|---|---|---|---|
| **Item** | Org-wide, season-independent | "What is this product, ever?" | Style number, name, category, base attributes, colour, size range |
| **ProjectItem** | One Project (≈ one season) | "What is this product *for SS26*?" | Season-specific attributes, target price for that season, lifecycle state |
| **AssortmentItem** | One Assortment | "Is this product in *this* assortment, and on what terms?" | Placement, assortment-specific overrides, ordering, channel/region terms |

The nesting is strict and one-way: an AssortmentItem presupposes a ProjectItem (usually) and
always an Item. That's why the Loader enforces pairing — you cannot load the narrow thing
without the broad thing.

**Loader pairing rules (from the docs, verbatim in substance):**
- `ITEM` alone → loads Items only.
- `PROJECT_ITEM` → "must be paired with `ITEM`", loads Item and ProjectItem in the same load.
- `ASSORTMENT` → "must be paired with both `ITEM`", and "can also be paired with
  `PROJECT_ITEM`". Selecting ASSORTMENT "will load Item, ProjectItem and AssortmentItem
  instances in the same load."

**Why this design.** A style exists across many seasons; its season-specific commercial framing
differs each time; and the same season's product can appear in many assortments on different
terms. Flattening these into one record would either lose history or duplicate the product.

**TAM implication.** "The data is wrong in Plan" is nearly always a *level* question, not a
corruption question. Ask: which entity is the user looking at, and which entity did the
integration write to? A value written to Item will not appear where the user expects if the
app is showing an AssortmentItem override — and vice versa.

## 2. Property levels — Family, Option, All, Override

Property levels apply to entity types with hierarchical structure: **Item** and **ProjectItem**.
They control how a value propagates through the Family → Option relationship.

This maps directly onto Week 1's vocabulary:
**Family ≈ style** (the hoodie) · **Option ≈ colourway** (the hoodie in black).

| Level | Behaviour (docs) | Use it for |
|---|---|---|
| **Family** | Updates the single Family-level entity, and "those values will be copied down and persisted onto each of that Family's Options." | True style-level facts: category, silhouette, description |
| **Option** | "Will update the single Option-level entity and those values will be persisted only onto that Option entity." | Genuinely per-colourway facts: colour code, option-level image |
| **All** | Values are "managed individually for every entity in a Family, regardless if it's a Family or Option level entity." Critically: "No copy down behavior exists for these properties." | Values you want to set explicitly at every node with no inheritance |
| **Override** | Like Family, the value "will copy down to all the Options' properties" — but "you can _override_ the value on the Option level by specifying a different value." | Defaults that usually hold but sometimes don't: price, margin target |

Column suffixes target the level in a CSV: `somePropertyFamily`, `somePropertyOption`.

**The three failure modes to recognise on sight:**
1. **Wrong level chosen at config time.** Price modelled as `Family` instead of `Override`, so a
   single premium colourway cannot carry a different price. Looks like "the system won't let us."
2. **Copy-down clobber.** Someone reloads a Family property and it overwrites option-level edits
   users made by hand. Looks like "our data reverted overnight." This is the classic one.
3. **All vs Override confusion.** Team expects inheritance, gets none, and every option shows
   blank. Looks like "the load didn't work."

**TAM implication.** Property level is a *configuration decision made early* that is expensive to
change later, because changing it rewrites how existing values propagate. When you join an
account, find out which properties are Family, Override and All. That map predicts their future
tickets better than anything else you could ask for.

## 3. federatedId — the upsert key

> "A value you provide which uniquely identifies the entity within an org."

Behaviour is upsert: "If an entity with that `federatedId` does not exist in VibeIQ, it will be
created. If it does exist, it will be updated."

For Custom Entities, "if no property is specified as the `federatedId`, the out of the box `name`
property will be used."

**The trap, stated plainly in the docs:** entities created through the core applications (i.e. by
users clicking in the UI) **do not have a federatedId by default**. If you later want the Loader
to update those records, someone has to assign one first.

**TAM implication.** This is the root cause of the most common integration bug in the platform:
duplicates. A customer pilots by hand-creating products in the UI, then wires up a Loader feed
keyed on style number, and every record loads as *new* because the hand-made ones had no
federatedId to match. Nothing errored. They now have two of everything. Ask about federatedId
strategy before the first production load, not after.

Second-order question worth asking on every account: **what is the federatedId derived from?**
If it is derived from a mutable business value (a style number that merchants renumber), the
upsert key changes and you get orphans. Stable, meaningless keys are safer than meaningful ones.

## 4. Projects, Assortments, and assortment owners

**Project** — the season-scale container. The Project Configurator can create "Projects with
nested folders, plans, assortments, showcases, and boards." A Project holds nested folders,
assortments at project and folder level, and the owner objects below.

**Assortment** — a curated selection of products for a purpose (channel, region, customer, store
cluster). One line → many assortments, exactly as in Week 1.

**Assortment owners.** An assortment "can be created on its own or it can have an associated
plan, board, or showcase." The load types are:

| Type | Creates |
|---|---|
| `ASSORTMENT` | Assortment only |
| `PLAN` | A Plan + its assortment |
| `BOARD` | A Board + its assortment |
| `SHOWCASE` | A Showcase + its assortment |

This is the structural link back to Week 1's three apps: **Board, Plan and Showcase are each
backed by an assortment.** They are three views onto the same kind of underlying object, which is
why a product can move from mood board to line plan to line review without being re-created.

## 5. Where this is heading — the publish lifecycle (Week 3 preview)

When a user publishes a Plan, VibeIQ writes the Plan rows down to the underlying Assortment and
creates an **`AssortmentPublishChange`** — "a snapshot of those changes" for downstream systems.

It carries:
- `assortmentBaselineDownloadLink` — S3 URL for "the Assortment's complete state at publish time"
- `deleteDataDownloadLink` — S3 URL with "only Items that were dropped or deleted in this
  specific publish"
- `detail` — arrays of `adds`, `updates`, `deletes`, `familyItemsRemoved`

Two facts to memorise now, because both cause production incidents:
- **Deletes do not accumulate.** "Delete data does NOT accumulate across publishes. Each
  AssortmentPublishChange only contains deletes from that individual publish." Miss one publish
  and you have permanently missed those deletes — unless you re-baseline.
- **S3 links expire after 24 hours.** Re-fetching the change object refreshes them, so a
  consumer that stores the URL rather than the change ID will break; one that stores the ID can
  always recover.

## 6. TAM framing

Your job after this module: given any symptom, name the layer. A value is wrong — is it wrong on
the Item, the ProjectItem, or the AssortmentItem? Is it wrong because of the property level it
was configured at? Is the record duplicated because of a federatedId gap? Is it missing
downstream because a publish delete was dropped? Four questions, and they cover most of what
lands in your queue.
