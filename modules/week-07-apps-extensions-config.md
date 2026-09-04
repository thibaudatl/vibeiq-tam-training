# Week 7 — Apps, Extensions & the Config/Customization Boundary

Sources: docs.vibeiq.com — configuration/ (formulas, ruleSets, configurationCopy),
apps/002_app_lifecycle, extensions/.

## The spectrum (not a binary)
L0 Types & properties (admin) → L1 Formulas, rule sets, validation functions, blueprints,
uniqueness (config, no deploy) → L2 Workflows & actions (code, in an app) → L3 Extensions
(code + hosted UI) → L4 External systems.
Cost, change latency and headcount all rise together.
**Default question: what is the lowest rung that actually solves this?** (Not the lowest rung
full stop — a Level 1 answer to a Level 2 problem is a fragile pile of formulas.)

## Formulas
Inputs: `obj`, `context.previousObj`; Items add `obj.roles` (family/option); plan placeholders
`obj.itemFamily/itemOption/itemType`; project items `obj.item` + `context.project`; assortment
items `obj.item` (option-preferred, falls back to family).
Return type must match property type; dates as ISO via `toISOstring()`.

Timing: create + update for all; ProjectItem formulas re-run on Item updates; plan placeholder
formulas on load, placeholder update, any row cell change; **plan publish triggers all Item,
ProjectItem and AssortmentItem formulas**.

**Three silent failure modes:**
1. Misspelled slug → `undefined`, no error. "Verify every slug against the live Type before
   saving a formula."
2. "Updates to Reference Data does not cause Formulas to re-run" → correct when written, stale
   forever after.
3. "On the Frontend, only Formulas in Plans are run"; one level of object hydration only.

## Rule Sets
Control `editable`, `required`, `optionSetValues`, `minValue`/`maxValue`, `validationFunction`
per property `slug`, based on entity state. `"ALL"` + `excludedSlugs` for blanket rules.
Structure: `name`, `identifier` (immutable per org), `ruleSet[]` of `{criteria, rules}`.
Filters: equals, not_equal_to, starts_with, contains, less_than, greater_than, is_empty,
is_not_empty, is_any_of…

Semantics: **outer array OR**, **inner criteria AND**, **"editability is 'locked wins'"**,
validation constraints accumulate.

**They "evaluate client-side, affecting editor experience for all users."** → Working assumption:
a UX guardrail, not a data-integrity guarantee; Loader/API writes likely bypass. CONFIRM
INTERNALLY before asserting. Changes validation design for every integrated field.

## Option Set Hierarchies
Parent-child cascade between single-selects: "selecting a parent value narrows the values
available in its child dropdown." Chain order "is fixed by the `hierarchy` list." If a parent has
no selection, all branches are flattened.

**Two silent failures:**
1. "If the parent holds a value that isn't in the hierarchy, the child dropdown will appear
   empty." Usually data loaded past a hierarchy that never knew about it (a W4 cause, W7 symptom).
2. Stored as `OptionSetHierarchy` + `TypeOptionSetHierarchyLink`, keyed on **TypePropertyIds, not
   slugs**: "A slug-based config silently fails to load."

CLI: `parseOptionSetsHierarchyValuesToKeysLocalFile` → `parseOptionSetsHierarchyLocalFile`, then
create in Admin Console and assign to Item and Plan Placeholder types.

## Configuration Copy — environment promotion
`contrail types getAll` (export) / `contrail types loadAll` (import into destination org).
Eleven categories: option set hierarchies, option sets, rule sets, type policies, type property
policies, types, rule set links, type OSH links, type policy links, type property policy links,
usage info. YAML folder tree. Types keyed by `typePath` (`item:footwear`); OSHs/policies by
`identifier`. Point config at a different org, then `loadAll`.

Three consequences:
- Config is text → **put it in version control**. Cheapest maturity upgrade available.
- Whole-org export, not cherry-pick → promotion is bulk; environments drift without discipline.
- **Config and apps promote by different mechanisms** (`types loadAll` vs app publish/install).
  A promotion is two things that must stay in step.

## Apps — three permanent facts
1. `contrail app create` "reserves the app's identifier globally… app identifier can not be
   altered after creation." Format `org@domain/app-name`.
2. **"The org that first creates an app is the owner… App ownership can not be modified."** Only
   the owner can modify/publish/delete.
3. Publish creates versions; install puts a version in an org.

→ Commercial landmine: if an SI or PS creates the app in *their* org, the customer can never own
it. Remedy is a rebuild under a new identifier. Ask before anyone runs `app create`.

Visibility in `app.yml`: `private` (default) · `private` + `accessGrants[{orgSlug, permissions:
[install]}]` · `public`. Public marketplace listing requires a request + VibeIQ approval via CSM.

## Extensions
Declared in the manifest: `identifier`, `name`, `userApps: [BOARDS, PLAN]`, `display: {type,
dimensions}`, `iframeUrl`, `extensionType`.
Types: `DOCUMENT_AUTOMATION` (read document context, act on boards/plans/showcases) ·
`CONTEXTUAL_ACTION` (shown dynamically by context) · `ADMIN_UTILITY` (extends Admin Console).
Display: **modal** ("a centered dialog with a backdrop. Best for focused tasks") vs **side-menu**
("a panel docked to the right edge with no backdrop") for inspector-style tools.
API: `AppExtension.registerAppExtension()`, `getAppContext()`, `BoardsApp`/`PlanApp`/`ShowcaseApp`.

**Requires public HTTPS hosting** (self-host on Netlify/Vercel, or VibeIQ managed). So it is a
service the customer runs: uptime, TLS, deploys, on-call. When it breaks, users report a VibeIQ
outage. Settle hosting ownership and monitoring before it ships.

## Routing table
Derived value on same entity → Formula. Locked/required/limited by state → Rule Set. Custom
field validation → Validation Function. "When X, do Y" → Workflow. Send elsewhere → Workflow
action/integration. Users need a screen → Extension + hosting conversation. BOM costing, POs →
wrong system (Week 1).

**The valuable sentence is not yes/no but "that's possible, and here's what it costs to own."**
