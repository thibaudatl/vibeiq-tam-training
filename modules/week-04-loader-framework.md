# Week 4 — Data In: the Loader Framework (deep)

Sources: docs.vibeiq.com/data_loading — Getting Started, **Loader Configuration Reference**,
**Validation Rules & Error Handling**, Preprocessing Pipeline, Load Items, Property Type
Handling, Transform Data.

## LoaderProcess
Async entity: status, config used, logs, metadata. Created via API/SDK/CLI → enqueued.
Two diagnostic fields:
- `failureArea` — `NONE` / `PARSING_CSV` / `VALIDATING_DATA` / `TRANSFORMING_DATA`. **Read first.**
- `preprocessingStepResults` — array of file IDs, one per step.

## Five phases
1. CSV parse (`PARSING_CSV`) 2. Validation (`VALIDATING_DATA`) 3. Preprocessing
4. Entity construction 5. API upsert by federatedId (3–5 → `TRANSFORMING_DATA`)

## Validation — fail-fast, NO partial loads
"If validation produces any errors, the load stops immediately with a `VALIDATING_DATA` failure
area." Errors halt; warnings continue. **"No partial loads occur."**
Universal requirements: non-empty config; `loadType` with ≥1 value; `federatedId` and `name`
reachable "from csv headers, federatedMappings, or conditionalColumns."

`issueType`: `CONFIG` · `HEADER_MISMATCH` · `INVALID_DATA` · `VALIDATION_ERROR` ·
`DUPLICATE_FEDERATED_ID` · `SYSTEM_ERROR`

Row-level: `{rowNumber, columnIssues:[{columnName, message, issueType, data}]}`
File/config-level: `{message, issueType}`
Known strings: `"itemFamilyFederatedId cannot be empty"` (row);
`"The following families have conflicting federated IDs: …"` (job).
Non-blocking warnings: label/slug (steps 4 & 6), option set, size range, object reference.

## Six preprocessing steps
1 boolean conversion · 2 federatedMappings · 3 propertiesToRemove ·
4 type transforms **(no warnings)** · 5 conditionalColumns · 6 type transforms **(with warnings)**
→ A value altered in step 4 and overwritten in step 5 never warns.
Artefacts: `loader-process-step-<Step Name>.json`, listed in `preprocessingStepResults`.

## Configuration reference
`loadType` (ITEM · PROJECT_ITEM · ASSORTMENT · COLOR · CUSTOM_ENTITY · SIZE_RANGE_TEMPLATE;
**only ITEM combines with others**) · `fileLocation` · `federatedMappings` ·
`conditionalColumns` · `propertiesToRemove` · `workspaceIdentifier` · `assortmentSplit` ·
`partialAssortmentUpdate` · `assortmentItemDropField` · `shouldSkipAssortmentPublish` ·
`loaderConfigurationId`

`conditionalColumns` shape:
`{toProperty, fromProperty?, conditions?:[{conditional, value}], default?}` — first match wins;
`{columnName}` interpolation; strings containing `{` are evaluated as JS template expressions
(e.g. `"{familyNumber}.split('-')[0]"`).

## THE FOUR FLAGS
1. **`shouldSkipAssortmentPublish`** — writes straight to DB, "bypassing the publish workflow…
   skips change history, summary recalculation, composite assortment updates, and the
   `assortment|publish` event." → load succeeds, downstream never hears. Set for backfills and
   left in reusable configs forever. **Check it before blaming a consumer.**
2. **`partialAssortmentUpdate`** — default `false` = **replace**. A partial file leaves the
   assortment containing only those rows. Companions: `addField`, `dropField`.
3. **`assortmentSplit`** — `{fieldToSplitOn, values:[{value, assortmentId|assortmentIdentifier}]}`.
   One load can affect several assortments → several publishes.
4. **`workspaceIdentifier`** — required with PROJECT_ITEM. A "project" in the UI is a `workspace`
   with `workspaceType:'PROJECT'`. Identifier "is not editable in the Hub UI; it must be set via
   direct PUT request."

## Family/Option in a CSV
**Each row is typically one option.** Rows sharing `itemFamilyFederatedId` → options of one
family; **the loader creates the family automatically**. Row with `itemOptionFederatedId` = an
option; without = family only. `name` = family name, `optionName` = option's own name.
`typePath` required on every row (usually via conditionalColumn). `optionGroup` = the axis.
→ Read a customer's property-level model off their CSV: columns that repeat within a family are
Family; columns that vary are Option.

## federatedId mechanics
- **"There is no configuration to say 'this column is my Federated ID'."** Custom Entity excepted
  (defaults to `name`).
- **"It is critical to ensure that federatedId values… do not change between loads."**
- Core-app entities have none; assign via API. Platform "doesn't synchronize property values with
  federatedId internally."
- Unmatched CSV columns are ignored silently.
- Validation catches duplicates *within a file*; nothing catches drift *between* files.
- A computed ID inherits the source field's formatting as a hidden dependency.

## Transformers & images
Type Mapping · Mapping Section · Map File Utility · Rekeying · Remove · Value · Conditional ·
**Morph** (`processor:'MORPH'`, `functionTransformersKey`). Morph hides everything → support debt.
Images: programmatic · federated load from file · zip extractor.

## Upload / CLI vs API
File entity → `uploadPost` (S3 URL + form params) → POST binary. SDK
`createAndUploadFileFromBuffer()`. CLI `contrail load upload-and-load <File> <Config>` sets
`fileLocation` automatically but **cannot use `loaderConfigurationId`** → local config drift.

## Workflow interaction
Phase 5 upserts → emits `item|create`/`update`, `project-item|…`, `assortment-item|…`. Every
bound workflow fires once per row. **Except**: `shouldSkipAssortmentPublish` suppresses
`assortment|publish`, so entity workflows fire while the outbound integration stays silent.
Plus: `oldData` absent on creates → partial notification storms; shared 60-process org ceiling;
races surface under bulk load.

Pre-load question: *which workflows are bound, what do they do on create, is anything grouped,
and is publish being skipped?*
