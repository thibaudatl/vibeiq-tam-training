# VibeIQ TAM Training

A self-paced, 10-week technical training program for a VibeIQ Technical Account
Manager. Grounded in official VibeIQ / Contrail documentation (docs.vibeiq.com).

## Contents

| Path | What it is |
|---|---|
| `index.html` | The training hub — open in any browser, no server needed. Sidebar navigation across the dashboard, modules, and reference pages. Every module is browsable; nothing is gated. |
| `dashboard.md` | Progress tracker (status + confidence per topic). Updated at the end of each module. |
| `modules/` | Long-form source notes per week. The hub renders the study version; these are the working notes. |
| `docs/HANDOFF.md` | Project state and build spec, carried over from the design session. |

## Status

- Phase 1 (curriculum design) — complete
- Module 1 (Business domain & where VibeIQ sits) — live
- Module 2 (Core data model) — written and live
- Modules 3–10 — not yet written; each stub lists what it will cover

## Curriculum

| Wk | Module | State |
|---|---|---|
| 1 | Business domain & where VibeIQ sits | live |
| 2 | Core data model (keystone) | live |
| 3 | End-user apps & the publish lifecycle | to write |
| 4 | Data in: the Loader framework | to write |
| 5 | Data out: integration patterns | to write |
| 6 | Automation: Apps, Workflows & Extensions | to write |
| 7 | Configuration & the config/customization boundary | to write |
| 8 | Platform, security & operations | to write |
| 9 | Troubleshooting & escalation | to write |
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
