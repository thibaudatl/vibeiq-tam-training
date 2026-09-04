# HANDOFF — VibeIQ TAM Training Site → create repo & push to Git

**For:** Claude Code (or any coding agent)
**From:** Chat session with Leo, 2026-09-04
**Goal:** Create a Git repository containing the training deliverables below and push it to a remote. Optionally deploy as a static website (GitHub Pages).

---

## 0. TL;DR — what to do

1. Create a new folder / repo `vibeiq-tam-training`.
2. Create the files listed in **Section 4** with the exact content already produced in this project. Two files (`index.html`, `dashboard.md`) are large and were generated in the chat session — see **Section 4** for how to obtain their content (they are attached/available as build artifacts; if not present, regenerate per the spec in Section 5).
3. Add `README.md` and `.gitignore` (content in Section 4).
4. `git init`, commit, create the remote, push to `main`.
5. (Optional) Enable GitHub Pages on `main` / root so `index.html` serves as the live site.
6. Report back the repo URL and the Pages URL if enabled.

**Ask Leo for:** the Git host + remote URL (or permission to create the repo via `gh`), and confirmation of repo visibility (public/private). Do NOT hardcode credentials; use the user's existing `gh` auth, SSH key, or credential helper.

---

## 1. Project context (so you understand what you're shipping)

Leo is starting as a **Technical Account Manager (TAM) at VibeIQ** and asked for a self-paced, 10-week technical training program. In the chat session we completed **Phase 1 (curriculum design)** and **Module 1 (Week 1)**, and packaged everything into a single navigable HTML "training hub" plus a Markdown progress dashboard.

**VibeIQ in one paragraph (for your own grounding — do not need to reproduce):** VibeIQ is an AI-native *product decision platform* for apparel/footwear/consumer-goods brands. It sits *upstream of, and alongside*, existing PLM/ERP systems (it does not replace them) and manages the product-line *decision* phase (line/assortment planning), then publishes approved decisions downstream. Its technical/engineering brand is **Contrail** (docs at docs.vibeiq.com; SDK packages are `@contrail/*`). All training content is grounded in official VibeIQ/Contrail documentation.

**Interaction model of the training:** iterative. Modules 2–10 are intentionally *locked* in the site and get filled in one at a time as Leo completes each module's quiz. This handoff ships the site as-is (Module 1 live, 2–10 locked). Future modules will be added in later commits.

---

## 2. What was already delivered in the chat (the artifacts)

Two files were built and shared with Leo in the session:

1. **`vibeiq_tam_training_hub.html`** (~41 KB) — a self-contained, single-file HTML "training site" with:
   - Left sidebar navigation (dark theme, teal-green accent `#1d6e56`, warm paper background `#f6f4ef`).
   - Sections: **Dashboard**, **Module 1** (fully written), **Modules 2–10** (locked placeholders), and three **Reference** pages (**Priority matrix**, **Colleague questions**, **Doc links**).
   - Client-side JS tab switching (no framework, no external requests), mobile-responsive with a ☰ menu, inline SVG diagram in Module 1.
   - → This becomes **`index.html`** in the repo.

2. **`VibeIQ_TAM_Training_Dashboard.md`** (~5 KB) — a Markdown progress tracker (overall progress, week status table, confidence-by-topic table with 🔴🟡🟢, terminology glossary, colleague questions, doc links).
   - → This becomes **`dashboard.md`** in the repo.

Both are attached to this handoff as build artifacts in the same output location as this file. If you have them, use them verbatim. If they are missing, regenerate them from **Section 5**.

---

## 3. Full agenda / project state (where we are, what's next)

**Completed**
- ✅ Phase 1: Executive overview, knowledge map, product/platform map, TAM competency map, 10-week curriculum, priority matrix, open questions — all reviewed and approved by Leo.
- ✅ Persistent dashboard created.
- ✅ Training hub (HTML) created with Module 1 fully populated.
- ✅ Module 1 (Week 1): "Business domain & where VibeIQ sits" — 4 concepts, exercise, scenario, quiz, hands-on challenge, outcomes.

**Pending (NOT part of this push unless Leo says so)**
- ⏳ Leo to answer the Module 1 quiz (5 questions) + Summit Athletic scenario in a chat session; the tutor reviews before unlocking Module 2.
- ⏳ Modules 2–10 to be authored one at a time and added as future commits.
- ⏳ Calibration question outstanding: how familiar Leo already is with retail/apparel line planning & PLM/ERP (affects pacing).

**The 10-week curriculum (module list, for README + future work)**
1. Business domain & where VibeIQ sits ✅ (live)
2. Core data model — Item / ProjectItem / AssortmentItem, property levels, Project/Assortment, federatedId (KEYSTONE) 🔒
3. End-user apps & the publish lifecycle 🔒
4. Data in: the Loader framework 🔒
5. Data out: integration patterns (event-driven vs polling) 🔒
6. Automation: Apps, Workflows & Extensions 🔒
7. Configuration & the config/customization boundary 🔒
8. Platform, security & operations 🔒
9. Troubleshooting & escalation methodology 🔒
10. Applied TAM practice: discovery, architecture reviews & QBRs (capstone) 🔒

---

## 4. Files to create in the repo

```
vibeiq-tam-training/
├── index.html          # = vibeiq_tam_training_hub.html (verbatim build artifact)
├── dashboard.md        # = VibeIQ_TAM_Training_Dashboard.md (verbatim build artifact)
├── README.md           # content below
└── .gitignore          # content below
```

### README.md (create with this content)

```markdown
# VibeIQ TAM Training

A self-paced, 10-week technical training program for a VibeIQ Technical Account
Manager. Grounded in official VibeIQ / Contrail documentation (docs.vibeiq.com).

## Contents
- **index.html** — the training hub. Open in any browser (no server needed).
  Sidebar navigation across the Dashboard, modules, and reference pages.
- **dashboard.md** — progress tracker (status + confidence per topic). Update at
  the end of each module.

## Status
- Phase 1 (curriculum design): complete
- Module 1 (Business domain & where VibeIQ sits): live
- Modules 2–10: authored iteratively; currently locked in the hub

## Curriculum
1. Business domain & where VibeIQ sits ✅
2. Core data model (keystone) 🔒
3. End-user apps & the publish lifecycle 🔒
4. Data in: the Loader framework 🔒
5. Data out: integration patterns 🔒
6. Automation: Apps, Workflows & Extensions 🔒
7. Configuration & the config/customization boundary 🔒
8. Platform, security & operations 🔒
9. Troubleshooting & escalation 🔒
10. Applied TAM practice (capstone) 🔒

## Local use
Open `index.html` directly, or serve the folder:
`python3 -m http.server` then visit http://localhost:8000

## Deploy (GitHub Pages)
Settings → Pages → Source: `main` / root. The site serves `index.html`.
```

### .gitignore (create with this content)

```
.DS_Store
Thumbs.db
node_modules/
*.log
.vscode/
.idea/
```

---

## 5. Regeneration spec (ONLY if the two artifacts are missing)

If `index.html` / `dashboard.md` are not available as artifacts, rebuild them to this spec. The authoritative *content* (all text, tables, the diagram) is what matters; match it faithfully.

### 5a. dashboard.md — sections, in order
- Title + meta (owner: Leo; program: 10-week VibeIQ TAM readiness; status key: 🟢 Confident / 🟡 Familiar, needs practice / 🔴 Need to learn / ⬜ Not started).
- Overall progress (Phase 1 complete & approved; Module 1 in progress).
- Week/module status table (10 rows; Week 1 = in progress, rest not started; columns: Wk, Module, Status, Quiz, Exercise, Challenge).
- Confidence-by-topic table (all topics from the priority matrix in 5c, each with priority + a 🔴 starting confidence).
- Key concepts learned / terminology glossary (seed: **Contrail** = engineering brand / technical name for the platform).
- Topics to revisit / knowledge gaps (empty to start).
- **Questions to ask VibeIQ colleagues** (the 7 open questions in 5d).
- Useful documentation links (the list in 5e).

### 5b. index.html — build notes
- Single self-contained file. No external network calls, no localStorage/sessionStorage (won't run in some sandboxes and unnecessary here). Plain vanilla JS for tab switching via `data-view` attributes and `#hash` routing.
- Design tokens: `--ink:#141a1f`, `--paper:#f6f4ef`, `--panel:#fff`, `--accent:#1d6e56`, `--accent-ink:#0f4536`; amber `#9a6410`, coral `#b0442a`, blue `#1a5a94`, crit `#a32d2d`; sidebar width 288px, content max-width 820px, radius 10px.
- Sidebar groups: TRACKER (Dashboard) · MODULES (W1 active with 🔄; W2–W10 `locked` with 🔒) · REFERENCE (Priority matrix, Colleague questions, Doc links).
- Callout styles: `.keystone` (teal, left border), `.warn` (amber), `.tam` (coral; its `h4::before` prints "TAM implication").
- Mobile ≤860px: sidebar slides in behind a ☰ button + scrim.
- Views to include (each a `<section class="view" id="view-XX">`): `dashboard`, `m1`, `m2`…`m10` (m2–m10 are one-line "unlocks after Module N" placeholders), `priority`, `questions`, `links`.

### 5c. Module 1 content (reproduce inside `#view-m1`)
**Title:** "Business domain & where VibeIQ sits" · eyebrow "Module 1 · Week 1".
**Lede:** foundation week; light on mechanics by design.
**Learning objectives (keystone callout):** by end of week can (1) explain in a minute what VibeIQ does & why it's NOT a PLM; (2) describe apparel/footwear/CPG go-to-market at a merchandiser's level; (3) place VibeIQ in a customer's system landscape; (4) navigate the Contrail-vs-marketing-brand distinction.

**Concept 1 — The problem VibeIQ solves.** Brands decide months ahead what to make for a season = *line/assortment planning*, before expensive development & sourcing. Problem: separate systems for design, planning, dev, selling; decisions happen across disconnected docs; context behind decisions is lost once products enter development; mistakes surface late & expensive. VibeIQ = one live view of the product line connecting creative intent with commercial context; decide what moves forward before cost/complexity/margin risk build downstream. Claimed payoff: fewer planned SKUs, decisions visible months earlier, thousands of manual hours saved. *TAM implication:* value protected = earlier, better-informed decisions with reasoning preserved; when usage slips, ask "are they deciding in VibeIQ or back in spreadsheets?" and "is context surviving the downstream handoff?"

**Concept 2 — The one sentence to remember (keystone).** VibeIQ sits **upstream of, and alongside**, existing systems — it does **not** replace them; it carries approved decisions downstream while preserving the reasoning. PLM (Centric, PTC FlexPLM, Bamboo Rose) = development/production system of record (tech packs, BOMs, sourcing, costing). VibeIQ = the decision phase before that. Flow: decisions in VibeIQ → publish to PLM → PLM drives dev/sourcing → ERP handles finance/production. Include the inline SVG diagram: three boxes VibeIQ → PLM → ERP with "publish" arrows, under phase labels "Decide what to sell / Develop & source it / Produce & sell it", plus a blue banner restating the one sentence. *TAM implication:* hardest conversations are about the *seam* between VibeIQ and PLM/ERP — what data flows, which direction, when, what breaks (why Weeks 4 & 5 are the technical heart).

**Concept 3 — Who the users are (table).** Merchandisers/line planners (own the assortment — mix, price points, margin; primary daily users). Designers (creative intent; care context isn't lost). Planners (numbers — volumes, margins, budgets). Product development (bridge to PLM; accurate handoff). Regional teams (regional adoption). *TAM implication:* adoption isn't monolithic; one team (e.g. design) lagging means creative context enters late — a diagnosable health problem.

**Concept 4 — Contrail vs. the marketing brand.** Marketing voice (vibeiq.com): "AI-native product decision platform," role-based AI agents, concept generation, line-plan automation; real 2026 repositioning; raised $22.5M (Volition Capital, Aug 2026). Technical voice (docs.vibeiq.com): platform documented as **Contrail**, a configurable/extensible product workspace; SDK/CLI/npm = `@contrail/*`. You code-switch by audience. *Warn callout:* AI capabilities are heavily marketed but thinly documented publicly — don't promise AI functionality you can't substantiate until you confirm GA vs beta vs roadmap internally.

**Recommended reading:** Primary — vibeiq.com/platform, docs.vibeiq.com (orient only). Context — Aug 2026 funding announcements (named customers: New Balance, L.L. Bean, Vera Bradley, Converse, Kizik, Malbon). Background — a general "merchandise assortment planning" primer.

**Practical exercise:** two ~60-second (~130-word) elevator pitches — one for a VP of Merchandising, one for an integration engineer; constraint: neither may use "PLM" as a synonym for VibeIQ, both must convey "upstream, sits alongside."

**Realistic scenario ("Summit Athletic"):** mid-size footwear brand; VP of Product says "we already have Centric PLM… isn't this overlap?" Sketch the core distinction + one discovery question to test fit.

**Quiz (5):**
1. In one sentence, what business problem does VibeIQ primarily solve, and *when* in the product timeline does it operate?
2. A customer says "VibeIQ is basically our PLM, right?" — what's wrong, and what's the correct relationship?
3. Name three user teams VibeIQ is built for, and one thing each cares about.
4. What does "Contrail" refer to, and why might you hear it internally instead of "VibeIQ"?
5. Why be cautious when a customer asks about VibeIQ's AI agent capabilities?

**Hands-on challenge:** one-page "customer landscape" discovery template — 8–12 questions grouped into existing systems, data ownership, seasonal cadence, downstream handoff (reused in Week 10).

**Outcome ("I know this when I can…"):** give the pitch in both registers without conflating with PLM; explain upstream/alongside to a skeptical VP; name the user teams & values; decode "Contrail" and hold a grounded AI conversation.

### 5c-ii. Dashboard view (inside `#view-dashboard`)
Overall progress bar (~8%, "Phase 1 complete & approved · Module 1 of 10 in progress"); week-status table (10 rows, Week 1 in progress); confidence-by-topic table (topics from 5c-iii, all 🔴 to start); "Next action" dark callout: work through Module 1, submit quiz + scenario; won't advance until concepts land.

### 5c-iii. Priority matrix (inside `#view-priority`)
- **Critical (must know):** core data model (Item/ProjectItem/AssortmentItem + property levels); Project(season)/Assortment structure; Plan→publish→AssortmentPublishChange→downstream lifecycle; "sits alongside, doesn't replace PLM/ERP" positioning; integration patterns (event-driven vs polling) & when to use each; config-vs-customization boundary; escalation routing (TAM/Support/Eng/Product/PS); technical discovery methodology.
- **Important:** Loader pipeline & failure modes; AssortmentPublishChange internals (baseline, deletes, detail, 24h S3 expiry); Event Workflows (triggers/conditionals/actions), internal vs external events; auth, rate limits, error codes, webhook security; formulas/validation/rule sets/blueprints; end-user apps (Boards/Plan/Showcase/Admin); troubleshooting methodology; AI capabilities shipped vs roadmap.
- **Useful:** SDK/CLI mechanics; app manifest/marketplace/lifecycle; Extensions (Doc Automation/Contextual Action/Admin Utility); custom entities, option set hierarchy, size range templates; configuration copy, uniqueness; transformers in depth.
- **Nice to know:** deep SDK internals & app-framework decorators; messageGroupId/parallelWorkerCount concurrency tuning; Node runtime mgmt; Java SDK specifics; CLI CI/CD automation.

### 5d. Colleague questions (inside `#view-questions`)
1. Environments & tenancy — separate dev/staging/prod orgs? how is config promoted between them?
2. Permissions & RBAC — end-user role/permission model in Boards/Plan/Showcase? (docs cover only app-level access grants + API-key auth)
3. SLAs, rate limits & scale — actual numeric API rate limits & documented SLAs? *(Note: the "15 requests/hour" figure online belongs to vibe.co — a DIFFERENT company — not VibeIQ; don't cite it.)*
4. Monitoring (customer-facing) — what alerting do customers get for load/publish/workflow failures? TAM visibility into operational health?
5. **The AI layer (biggest gap)** — what's GA vs beta vs roadmap? how are agents configured/governed/monitored?
6. Support model & escalation — real internal escalation path & tooling? TAM/Support/PS/Eng/Product boundary in practice? who owns integration builds — PS or customer?
7. Data residency & compliance — uploads route through AWS S3 (us-east-1 in examples); residency options? compliance certs (SOC 2, etc.)?

### 5e. Documentation links (inside `#view-links`)
- Docs home (Contrail): https://docs.vibeiq.com/
- Data Loading — Getting Started: https://docs.vibeiq.com/data_loading/getting_started/
- Integration Patterns: https://docs.vibeiq.com/integration_patterns/
- Authentication & API Access: https://docs.vibeiq.com/integration_patterns/authentication/
- Assortment Publish Integrations: https://docs.vibeiq.com/integration_patterns/assortment_publish_integration/
- Change History Polling: https://docs.vibeiq.com/integration_patterns/change_history_polling/
- Workflows: https://docs.vibeiq.com/workflows/
- Apps — Getting Started: https://docs.vibeiq.com/apps/getting_started/
- Extensions: https://docs.vibeiq.com/extensions/
- Configuration: https://docs.vibeiq.com/configuration/
- SDK reference: https://sdk.docs.vibeiq.com/
- Platform / company: https://vibeiq.com/platform/

---

## 6. Git steps (run these)

```bash
# from the parent directory containing the files
cd vibeiq-tam-training

git init
git add index.html dashboard.md README.md .gitignore
git commit -m "Add VibeIQ TAM training site: Phase 1 + Module 1 (hub + dashboard)"
git branch -M main

# Option A — repo already exists on the remote:
git remote add origin <REMOTE_URL>        # ask Leo for this
git push -u origin main

# Option B — create the repo with GitHub CLI (uses Leo's existing gh auth):
gh repo create vibeiq-tam-training --private --source=. --remote=origin --push
# (use --public instead of --private if Leo prefers)
```

**Optional — deploy as a website (GitHub Pages):**
```bash
gh api -X POST repos/{owner}/vibeiq-tam-training/pages -f source.branch=main -f source.path=/
# or via UI: Settings → Pages → Source: main / root
# Live URL will be https://{owner}.github.io/vibeiq-tam-training/
```

**Credentials:** do NOT paste or hardcode tokens. Use Leo's existing `gh` auth, SSH key, or Git credential helper. If auth fails, stop and report the exact error to Leo.

---

## 7. Definition of done
- [ ] Repo contains `index.html`, `dashboard.md`, `README.md`, `.gitignore`.
- [ ] `index.html` opens locally and all sidebar links switch views; Module 1 renders fully incl. the SVG diagram; Modules 2–10 show as locked.
- [ ] Committed to `main` and pushed to the remote.
- [ ] (If requested) GitHub Pages enabled; live URL verified to load.
- [ ] Report back: repo URL, commit hash, and Pages URL (if enabled).
