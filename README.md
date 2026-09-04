# VibeIQ TAM Training

A self-paced, 10-week technical training program for a VibeIQ Technical Account
Manager. Grounded in official VibeIQ / Contrail documentation (docs.vibeiq.com).

## Contents

| Path | What it is |
|---|---|
| `index.html` | The training hub — open in any browser, no server needed. Sidebar navigation across the dashboard, modules, and reference pages. Every module is browsable; nothing is gated. |
| `dashboard.md` | Progress tracker (status + confidence per topic). Updated at the end of each module. |
| Key findings (in the hub) | The non-obvious, high-consequence findings collected from every module: a symptom-to-cause lookup, the failures that produce no error, decisions that can't be undone, claims to verify before asserting, and the numbers worth memorising. |
| `modules/` | Long-form source notes per week. The hub renders the study version; these are the working notes. |
| `docs/HANDOFF.md` | Project state and build spec, carried over from the design session. |

## Status

- Phase 1 (curriculum design) — complete
- Module 1 (Business domain & where VibeIQ sits) — live
- Module 2 (Core data model) — written and live
- Module 3 (End-user apps & the publish lifecycle) — written and live
- Module 6 (Event Workflows) — written and live
- Module 4 (Data in: the Loader framework) — written and live
- Module 5 (Data out: integration patterns) — written and live
- Module 7 (Apps, Extensions & the config boundary) — written and live
- Module 8 (Platform, security & operations) — written and live
- Module 9 (Troubleshooting & escalation) — written and live
- Module 10 (capstone) — not yet written

Workflows were promoted to their own module (Week 6) and Apps/Extensions merged into
Week 7, because the TAM role includes supporting customer workflows. Modules from
Week 4 onward are written at greater technical depth, and each carries an explicit
"workflow angle".

## Curriculum

| Wk | Module | State |
|---|---|---|
| 1 | Business domain & where VibeIQ sits | live |
| 2 | Core data model (keystone) | live |
| 3 | End-user apps & the publish lifecycle | live |
| 4 | Data in: the Loader framework | live |
| 5 | Data out: integration patterns | live |
| 6 | Event Workflows | live |
| 7 | Apps, Extensions & the config/customization boundary | live |
| 8 | Platform, security & operations | live |
| 9 | Troubleshooting & escalation | live |
| 10 | Applied TAM practice (capstone) | to write |

Modules are written one at a time, grounded in the official Contrail documentation. Nothing is gated — every module in the hub is browsable, including the stubs for those not yet written.

## Local use

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server
# then visit http://localhost:8000
```

## Deploy (GitHub Pages)

Settings → Pages → Source: `main` / root. The site serves `index.html`.
