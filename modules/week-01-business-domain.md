# Week 1 — Business Domain & Where VibeIQ Sits

## 1. The domain: seasonal product creation

VibeIQ's customers are **brands and retailers that create seasonal, visual, assortment-driven
product** — apparel, footwear, accessories, home, hardlines, toys, beauty. The defining trait is
not "manufacturing" but **seasonality plus visual merchandising**: a new line, several times a
year, decided largely by looking at pictures of products next to each other.

### The seasonal calendar (the spine of everything)
A brand runs a **GTM (go-to-market) calendar** per season. Roughly:

| Stage | What happens | Who leads |
|---|---|---|
| Trend / concept | Research, inspiration, mood boards, colour direction | Design, trend |
| Line planning | How many styles, in which categories, at what price points, hitting what margin | Merchandising / planning |
| Design | Sketches, colourways, materials | Design |
| Line review / milestone meetings | Assortment is presented, edited live, cut or kept | Merch + leadership |
| Development & sourcing | Tech packs, BOMs, costing, vendors, samples | Product dev, sourcing |
| Sell-in / market | Assortment shown to wholesale buyers or internal channels | Sales |
| Production & launch | POs, inventory, ecommerce/retail launch | Supply chain, ecom |

VibeIQ lives in the **top half** — concept through line review and sell-in. The bottom half
(tech packs, BOM, costing, POs) belongs to PLM and ERP.

### Key vocabulary (learn these cold — customers use them constantly)
- **Line** — the full set of products a brand offers for a season.
- **Assortment** — a curated selection of products for a purpose: a channel, a region, a
  customer, a store cluster, a catalogue. One line → many assortments.
- **Season** — SS26, FW26, Holiday 26. The planning container.
- **Style / colourway / SKU** — style = the design (a hoodie); colourway = style in a colour;
  SKU = colourway in a size. Volume explodes at each level. This maps directly onto VibeIQ's
  property-level model (Week 2).
- **Carryover vs. new** — a style repeated from last season vs. newly created.
- **Line review** — the recurring meeting where the assortment is reviewed and cut. The single
  most important moment VibeIQ has to make good.
- **OTB / open-to-buy** — the budget available to buy inventory; constrains the assortment.
- **Margin / IMU (initial mark-up)** — target profitability; drives keep/cut decisions.
- **Sell-in vs. sell-through** — selling to the buyer vs. the consumer buying it.
- **Drop / delivery** — a phased release within a season.

## 2. The system landscape (what else is in the room)

| System | Owns | Example vendors |
|---|---|---|
| **PLM** | Product development record: tech packs, BOM, materials, costing, samples, compliance | Centric, PTC FlexPLM, Bamboo Rose, Backbone |
| **ERP** | Transactional truth: POs, inventory, finance, orders | SAP, NetSuite, Oracle, Dynamics |
| **PIM** | Commerce-ready published product attributes and copy | Akeneo, Salsify, inRiver |
| **DAM** | Master digital assets: images, video, 3D | Bynder, Aprimo, Adobe AEM Assets |
| **Merch/assortment planning** | Financial plans, OTB, store clustering | o9, Blue Yonder, RELEX, Anaplan |
| **Creative tools** | Design source files | Adobe CC, CLO/Browzwear (3D) |

**The tools VibeIQ actually displaces are not any of the above** — they are **Miro, Excel and
PowerPoint**. That is VibeIQ's own framing: Board replaces Miro, Plan replaces Excel, Showcase
replaces PowerPoint. The real incumbent in line planning is a spreadsheet with images pasted in,
emailed around.

## 3. Where VibeIQ sits

Two sentences worth memorising:

> VibeIQ sits **upstream of PLM**, in the creative-to-commercial gap where products are still
> being decided rather than developed. It sits **alongside** PLM/ERP/PIM/DAM rather than
> replacing them, and integrates bi-directionally with all of them.

Why this matters in the TAM role:
- **"Upstream"** sets the data direction. VibeIQ is often where a product record is *born*
  (concept, placeholder, "we need 4 more knits at $79"), before it is real enough for PLM.
  Later, PLM/ERP become authoritative for costs, materials and inventory, which flow *back* into
  VibeIQ to inform decisions. So most customers have **two-way** integration, with a clear
  attribute-level ownership map. Getting that map right is core TAM work.
- **"Alongside"** defuses the most common objection: *"we already have PLM, why do we need
  this?"* Answer: PLM is a system of record for how a product is made; it was never designed for
  a merchant and a designer to sit in a room and cut 400 styles down to 250 while looking at
  images. That decision-making layer is what VibeIQ owns.
- It also constrains scope. If a customer asks VibeIQ to do BOM costing rollups or PO
  management, that's a "wrong system" conversation, not a feature request.

### The three end-user apps (system of engagement)
- **Board** — visual workspace: trend research, mood boards, creative direction.
- **Plan** — structured workspace: line planning and product definition (the grid/spreadsheet
  replacement, but image-first and live).
- **Showcase** — presentation workspace: line reviews and stakeholder alignment.

### The platform underneath (system of record + automation)
- **Product Data Platform** — products, assortments, assets. (Week 2: the core data model.)
- **Agent layer** — native agents, custom agent authoring, prompt templates.
- **Event & workflow engine** — triggers and automation. (Week 6.)
- **Integration & app platform** — connectors, APIs, MCP server, App Marketplace. (Weeks 4–6.)

**Contrail** is the engineering/technical sub-brand for this platform — it's the name on the
developer docs (docs.vibeiq.com), while VibeIQ is the commercial brand.

## 4. Why customers buy it (the value story a TAM must be able to tell)
1. **Cycle time** — collapse the mood-board → spreadsheet → deck relay into one live workspace;
   line reviews stop needing a week of deck-building.
2. **One version of the truth in the decision phase** — no more "which spreadsheet is current?"
3. **Better decisions** — margin, cost and sell-through data sitting next to the image at the
   moment of the cut.
4. **Less manual work** — no re-keying between Excel, PowerPoint and PLM.
5. **AI leverage** — the platform is built so agents can act on the product data, not bolted on.

## 5. TAM framing
Your job in Module 1 terms: be the person who can draw the customer's system landscape on a
whiteboard, say which system owns which attribute, and defend the boundary. Nearly every
escalation you'll see later ("the data is wrong in Plan", "publish didn't reach PLM") is really
a question about that map.
