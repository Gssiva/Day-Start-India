# DayStart Agriculture and Construction prototype

This working prototype follows the DayStart PRD’s direct-employment and scheduled booking model, limited to **Agriculture** and **Construction**. It contains a customer/coordinator booking flow, a synthetic worker roster, nearest-eligible assignment, simulated 30%/70% payment amounts, job completion, and a site-history assistant.

The Hindsight connection runs on the Node server. When it is configured, the server uses the official JavaScript client for retain, recall, and reflect. Without a reachable Hindsight server, the UI labels memory as **Demo memory** and uses temporary local sample records. That fallback is for product exploration; connect Hindsight before presenting the memory workflow as a hackathon integration.

## Run the app

Requirements: Node.js 18 or later (Node.js 20 LTS recommended) and npm 8 or later. Python is not required. The project uses its existing Node dependency; the visual redesign adds no packages.

```powershell
npm install
npm start
```

Open [http://localhost:4173](http://localhost:4173). Keep the terminal running while using the prototype.

## Connect Hindsight

Start a local Hindsight API using the official [Hindsight quick start](https://hindsight.vectorize.io/developer/api/quickstart). Configure a supported LLM provider for Hindsight’s memory processing. Then start this app with the Hindsight API URL and a dedicated demo bank ID:

```powershell
$env:HINDSIGHT_BASE_URL = "http://localhost:8888"
$env:HINDSIGHT_BANK_ID = "daystart-hyderabad-demo"
npm start
```

The UI should report **Hindsight connected**. Click **Load sample history**, then **Recall site history**. After a booking is assigned, use **Complete** to record a non-sensitive outcome and retain it. Create a repeat booking at the same site and recall again. The demo seed record is synthetic.

The integration is implemented with the official `@vectorize-io/hindsight-client` package and documented `HindsightClient` operations. See the [Hindsight JavaScript client guide](https://hindsight.vectorize.io/sdks/nodejs).

## Prototype controls

- **Service:** exactly Agriculture or Construction.
- **Scheduled booking:** date at least one day ahead, task, site, crew size from 1 to 20.
- **Assignment:** verified, online, not suspended, not already assigned, rating at least 3.0, within 10 km; nearest eligible workers first.
- **Worker shortage:** flags the booking for coordinator action instead of claiming a full crew is assigned.
- **Payment:** displays the PRD’s 30% advance and 70% balance; no payment is processed.
- **Memory:** site-scoped, dated operational notes. Hindsight never chooses or ranks workers.

This is an in-memory demo application. Bookings and local fallback memory reset when the Node process restarts. Hindsight bank records are separate and are not deleted by the prototype’s reset button.

## Project files

- `index.html` — responsive prototype UI.
- `assets/daystart-logo.png` — supplied DayStart logo.
- `server.mjs` — Node HTTP API, booking rules, assignment, and Hindsight integration.
- `MVP_SPEC.md` — functional scope and acceptance criteria.
- `BUSINESS_PLAN.md` — two-service business plan and financial assumptions.
