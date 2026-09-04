# Week 8 — Platform, Security & Operations

Sources: docs.vibeiq.com — integration_patterns/authentication, configuration/configurationCopy,
apps/getting_started, apps/002_app_lifecycle, apps/migrate_from_node18_to_node22,
release_notes/004_admin_console_2024_12_12.

## Org = the boundary
Scopes isolation, ownership, configuration and capacity. `X-Api-Org` on every request; apps owned
by an org; config exported per org; concurrency ceilings per org.
**An environment is just another org** — no environment abstraction above orgs. Confirmed by the
Node guide: "thoroughly test your app in a development org before installing it on production
orgs." → dev/staging/prod is a convention maintained by discipline.
Promotion is two mechanisms (W7) + no reconciliation = silent drift.

## Permission layers
| Layer | Controls |
|---|---|
| Org membership | existence in the tenant |
| App `accessGrants` | which orgs may install; "the only available permission is `install`" |
| Workflow `accessGrants` | which entity types actions may `read`/`write` |
| **Type Policies** | "access control statements defining READ, CREATE, UPDATE, DELETE permissions" |
| **Type Property Policies** | "property-level access restrictions" |
| API keys | machine access, app-scoped |

**Correction:** "VibeIQ has no real end-user permission model" is wrong. Type Policies and Type
Property Policies exist and are among the 11 Configuration Copy categories. Missing =
documentation, not capability.
**Still unknown:** how policies map to named roles/groups/principals in Boards/Plan/Showcase.

## Credentials
- API keys `app:…`, long-lived. Never commit; env vars/secrets manager; separate per environment;
  prefer app keys; rotate and revoke.
- **CLI caches auth to `~/.vibeiq/configs/`** — a credential store on every laptop that ran it.
  Offboarding must include revocation. Composes with W7 app-ownership problem.
- Webhook trigger URLs contain the webhook ID = bearer credential.

## Data path
Uploads → File entity returns `uploadPost` (S3 URL + form params) → binary direct to S3
(`us-east-1` in examples). Publish baseline/delete JSON on S3, links expire 24h. Extensions run
from the customer's own public HTTPS host. Workflow actions POST wherever `config` points.

Unanswered by docs: **data residency** beyond us-east-1, and **compliance certs** (SOC 2 etc.).
Reframe for security: 24h expiry is a *control* (short-lived payload links), not just a
constraint.

## Runtime
`nodeRuntime: "nodejs22.x"` in `app.yml`. Migration = update field, audit deprecated APIs, test
on Node 22 locally, `npm install` + `npm rebuild`. "Thoroughly test in a development org before
installing on production orgs."
→ Every customer with a custom app carries a maintenance obligation nobody budgeted. Track which
accounts have custom apps and their runtime.

## Observability
| Surface | Shows | Horizon |
|---|---|---|
| Event Workflows Dashboard | "two charts… workflows triggered and workflows that have failed" | "up to 90 days" |
| Process List | processes, tasks, statuses, `triggerEvent`, `taskOutputs`; substring search | 90 days |
| Workflow Artifacts | files attached to a process (`ownedByReference` / `createAndUploadFileFromBuffer`) | deleted with process at 90 days |
| LoaderProcess | status, config used, per-step artefacts | — |

Shared artifact links still require login + org permissions.
**None of this is alerting.** Everything must be looked at. Customer-facing proactive alerting is
undocumented → confirm; if absent, recommend customers build monitoring on the process APIs.
→ Institutionalise the failure-trend chart: glance before check-ins, screenshot in QBRs.

## Capacity
1–30 workers (default 5) · 25 per workflow · **60 per org, shared**, adjustable via CSM. No
documented utilisation view → contention is invisible until unrelated things slow down.
Do capacity planning: know what runs when; don't stack bulk loads on the nightly integration.

## The standing unknowns list
1. End-user roles/permissions and how Type Policies map to them
2. Numeric rate limits and SLAs
3. Data residency beyond us-east-1
4. Compliance certifications
5. Customer-facing proactive alerting
6. Rule set enforcement on API/Loader writes (W7); inbound webhook verification (W5/6)

"I don't know, I'll find out by Thursday" — specific and kept — beats a bluff. Bluffing a
compliance answer is unrecoverable.
