# Week 6 — Event Workflows (deep)

Sources: docs.vibeiq.com/workflows — introduction, 002_creating_workflows,
managing_workflows/observing_workflows, running_workflows/002_webhooks.

Event Workflows are "the main engine for reacting to system events and running apps across the
VibeIQ infrastructure." Composed of **triggers, conditionals, actions**. Declared in `app.yml`
under `workflows:`.

## Workflow properties
`identifier` (stable, enables cross-org migration) · `name` (shown in Admin Console) ·
`triggerKey` · `isActive` · `public` · `parallelWorkerCount` (1–30, default 5) ·
`messageGroupId` (static) · `messageGroup` + `dynamicMessageGroupId` (dynamic) · `crons`.

## Six trigger categories
1. **System events** — `{entityType}|{action}`:
   - `item|create|update|delete`, `project-item|…`, `assortment-item|…`,
     `plan-placeholder|…`, `custom-entity|…`, `comment|create|update`, `content|create|update`
   - **`assortment` has only `assortment|publish`** — no `assortment|update`. Requirements that
     assume one need redesigning.
2. **Manual** — `triggerKey: manual`. Batch/archival/on-demand; also the clean way to test.
3. **Custom app events** — `'@{publisherOrgSlug}/{appName}:{EventName}'`, e.g.
   `'@vibeiq/image-loader:ImageAssignmentComplete'`. Name comes from the publisher's
   `eventWorkflowTriggerKeyMapping`.
4. **Declared custom trigger keys** — app declares `triggers:` with a `key`; fired by creating an
   `external-event` entity with `details.eventType` + `actionType`.
5. **Scheduled** — `crons` with standard CRON syntax.
6. **Webhook** — `triggerKey: "webhookId:WEBHOOK_ID"`.

## Paths
`workflowDefinition.paths` is ordered. **"Only the first path whose conditional evaluates to
`true` is executed; the remaining paths are skipped."** Actions within a path run sequentially.
→ Paths are if/else-if, not independent rules. A broad conditional high in the list makes
everything below it dead code, silently.

## Conditionals
JavaScript expressions, interpolations wrapped in `{ }`.
- `{newData.<slug>}` — state after
- `{oldData.<slug>}` — state before; **absent on creates**
- `{propertyDiffs.<slug>.<propertyName|oldValue|newValue>}`
- `{changeObjects}` — `[{id, changes}]` for bulk-change workflows

Trap: `{newData.x} !== {oldData.x}` behaves differently on create vs update, and a bulk load
creates thousands of entities at once.

## Actions
`action` (key into app's `actions`) + `name` + optional `config`. Actions declaring
`actionConfiguration` are reusable across workflows with different values; config is "merged with
runtime context and passed to the action's `execute` function via the `config` argument."
→ Environment promotion risk: a staging endpoint in a production workflow's `config`.

`accessGrants` gate what actions can touch: `read` (get, query) / `write` (get, query, create,
update, delete). A workflow that runs but does nothing is often a missing grant.

## Concurrency and message grouping
- **Static**: `messageGroupId: X` + `parallelWorkerCount: 1` → strict one-at-a-time.
- **Dynamic**: `messageGroup: X` + `dynamicMessageGroupId: 'X-{newData.itemFamilyId}'` → same key
  serializes, different keys parallelize up to `parallelWorkerCount`.
- Defaults: 25 concurrent processes per workflow, **60 per organization** (adjustable via CSM).

Two field lessons: the org ceiling is shared, so one chatty workflow starves others ("unrelated
automation got slow"); and raising `parallelWorkerCount` without grouping converts a performance
complaint into data corruption.

## Webhooks
Create: `contrail webhooks create -j` or POST `https://api.vibeiq.com/prod/api/webhooks`.
Auth headers: `X-Api-Key`, `X-Api-Org`. Trigger:
`POST https://api.vibeiq.com/prod/api/trigger-webhooks/{ID}`, optional `X-Verify-Signature`.
Event shape delivered to the workflow: `{ "body": {...}, "headers": {...} }`.
Returns the array of processes created.

**Security note:** `X-Verify-Signature` is documented as optional and shown as a shared-secret
header, not an HMAC over the body; the webhook ID in the URL is effectively a bearer credential.
Confirm what is actually enforced before a customer security review.

## App → running workflow
`app.yml` → `contrail app publish` → **Workflow Template Definitions** on that app version →
installing org runs `contrail workflow-template-definitions install` → live workflows, `config`
preserved. Therefore: changing a workflow is a **release**, not a setting.

## Task execution
"For each time a workflow is triggered, a process is created. Each process contains one or more
tasks." **"Only one task runs at a time in a process, and tasks always run in order. If one task
fails, none of the subsequent tasks are run."** → later actions are *never run*, not failed.
Order actions so the riskiest is last; never infer a later action ran from the process existing.

## Managing
- Workflows "can be disabled without deleting them… keep them for historical record without
  changing their trigger."
- **"Once deleted, the process list, task list, and logs for a workflow is lost."** Deletion
  destroys the evidence trail immediately, not after 90 days. Disable, don't delete.
- Separate from concurrency: "workflows can be configured to have limits on their run per
  minute" — the right lever when a workflow is correct but too chatty for a downstream system.

## Observability
Admin Console **Process List**, reverse chronological. Process → tasks → each task has an
`Output`. Statuses UI/API: Pending/`PENDING`, Processing/`ACTIVE`, Awaiting/`AWAITING`,
Completed/`COMPLETE`, Failed/`FAILED`. Query bar does "case-insensitive substring match on a
stringified version of the event and output fields". Programmatic: `status`, `taskOutputs`,
`triggerEvent`, `startTime`, `endTime`.

**"After 90 days, workflow logs (including the list of processes and tasks) are permanently
deleted."** Hard evidence horizon for any long-running investigation.

## The "why didn't it fire?" ladder
1. Is there a process at all? (none → trigger never matched; some → jump to 5)
2. `isActive` true, installed in this org, from the expected app version?
3. Right `triggerKey`? (classic: expecting `assortment|update`, which doesn't exist)
4. Did the change emit that event? (bulk load emits `create`, not `update`)
5. Which path ran? Read `triggerEvent`, evaluate conditionals top-down; first-match-wins;
   `oldData` absent on creates.
6. Did actions succeed? Read `taskOutputs`. COMPLETE-but-no-op → access grant or wrong `config`.
7. Intermittent and load-correlated? → concurrency/message grouping, not logic.
