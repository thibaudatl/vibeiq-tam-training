# VibeIQ TAM Training

A self-paced, 10-week technical training program for a VibeIQ Technical Account
Manager. Grounded in official VibeIQ / Contrail documentation (docs.vibeiq.com).

## Contents

| Path | What it is |
|---|---|
| `index.html` | The training hub — open in any browser, no server needed. Sidebar navigation across the dashboard, modules, and reference pages. |
| `dashboard.md` | Progress tracker (status + confidence per topic). Updated at the end of each module. |
| `modules/` | Long-form source notes per week. The hub renders the study version; these are the working notes. |
| `docs/HANDOFF.md` | Project state and build spec, carried over from the design session. |

## Status

- Phase 1 (curriculum design) — complete
- Module 1 (Business domain & where VibeIQ sits) — live
- Modules 2–10 — authored iteratively; currently locked in the hub

## Curriculum

| Wk | Module | State |
|---|---|---|
| 1 | Business domain & where VibeIQ sits | live |
| 2 | Core data model (keystone) | locked |
| 3 | End-user apps & the publish lifecycle | locked |
| 4 | Data in: the Loader framework | locked |
| 5 | Data out: integration patterns | locked |
| 6 | Automation: Apps, Workflows & Extensions | locked |
| 7 | Configuration & the config/customization boundary | locked |
| 8 | Platform, security & operations | locked |
| 9 | Troubleshooting & escalation | locked |
| 10 | Applied TAM practice (capstone) | locked |

Modules unlock one at a time, as each preceding module's quiz is completed and reviewed.

## Local use

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server
# then visit http://localhost:8000
```

## Deploy (GitHub Pages)

Settings → Pages → Source: `main` / root. The site serves `index.html`.
