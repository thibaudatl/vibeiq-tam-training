# Week 4 — Data In: the Loader Framework (deep)

Sources: docs.vibeiq.com/data_loading — Getting Started, Preprocessing Pipeline,
Property Type Handling, Transform Data (Morph et al.).

## LoaderProcess
Async entity holding: status (pending/running/completed/failed), the configuration used,
downloadable logs, operational metadata. Created via API/SDK/CLI, which enqueues it.
→ Always ask for the process ID. Configs are recorded, so runs are comparable.

## Five phases
1. **CSV parsing** — "Column headers from the first row are used as property keys."
2. **Validation** — against entity-type rules, *before* transformations.
3. **Preprocessing** — six steps (below).
4. **Entity construction** — rows → typed entity objects.
5. **API upsert** — create or update, matched on `federatedId`.

## Six preprocessing steps
1. **Boolean conversion** — `"true"`/`"false"` → booleans (CSV yields only strings).
2. **Federated mappings** — `{ targetProperty: sourceColumn }`; copies value if the column
   exists, otherwise assigns a static value.
3. **Remove unwanted properties** — deletes `propertiesToRemove` columns from every row.
4. **Type transformations (no warnings)** — label→slug for headers; display→value for
   Single/Multi Select backed by option sets.
5. **Conditional columns** — `conditionalColumns` creates/overwrites values;
   `{columnName}` interpolation + JS evaluation. Fields: `fromProperty`, `conditions`
   (`conditional` + `value`), `default`.
6. **Type transformations (with warnings)** — repeats step 4, recording warnings for unmatched
   columns, disabled properties, invalid option values.

**Why twice:** step 4 normalises silently so step 5 can operate on clean values; step 6 reports.
→ A value can be silently altered in step 4 and never warned about if step 5 overwrites it.

**Artefacts:** each step emits `{ rows, errors, warnings }`, saved as
`loader-process-step-<Step Name>.json` on the LoaderProcess. Diff consecutive files to find the
exact step that broke a value.

## Configuration fields
`loadType` (ITEM, PROJECT_ITEM, ASSORTMENT, COLOR, CUSTOM_ENTITY, SIZE_RANGE_TEMPLATE,
PLAN/BOARD/SHOWCASE) · `federatedMappings` · `conditionalColumns` · `propertiesToRemove` ·
`fileLocation` (File entity id) · `loaderConfigurationId` (stored config).

## federatedId mechanics
- **"There is no configuration to say 'this column is my Federated ID'."** Only Custom Entity
  supports designating one; absent that, its `name` property is used.
- **"It is critical to ensure that `federatedId` values in your load files do not change between
  loads. Doing so will risk the Loader creating duplicate data."**
- Core-app-created entities have no federatedId; assign manually via API to make them loadable.
  The platform "doesn't synchronize property values with `federatedId` internally."
- Unmatched CSV columns are **ignored**, silently.

Prevention question: *"What generates this value, and what could ever cause it to change?"*

## Transformers
Type Mapping · Mapping Section · Map File Utility Class · Rekeying · Remove · Value ·
Conditional · **Morph** (`processor: 'MORPH'`, `functionTransformersKey`) — "can make any number
of changes to the object that is passed in"; for multiple simultaneous changes or variable keys.
→ Morph can express anything, so it can hide everything. Growing Morph = support debt.

## Upload, CLI vs API
Upload = create File entity (returns `uploadPost` with S3 URL + form params), then POST binary to
S3. SDK: `createAndUploadFileFromBuffer()`.
CLI: `contrail load upload-and-load <File> <Config>` — **cannot use `loaderConfigurationId`**, so
configs are passed each time and drift from the stored one.
→ "The same file loads differently depending on who runs it" = compare configs on each
LoaderProcess first.

## Workflow interaction (the Week 4 ↔ Week 6 seam)
Phase 5 upserts, so a load **emits system events**: `item|create` for new rows, `item|update` for
existing, same for project-item/assortment-item. Every bound workflow fires once per row.
1. `{oldData}` absent on creates → conditionals behave differently for new vs existing rows in
   the *same* load. Partial notification storms look like bugs but aren't.
2. Org concurrency ceiling (60) is shared → a bulk load starves unrelated automation.
3. Races surface under load → high `parallelWorkerCount` with no message grouping is fine daily,
   corrupting during bulk.

Pre-load question: *which workflows are bound to these entity types, what do they do on create,
and is anything grouped?*
