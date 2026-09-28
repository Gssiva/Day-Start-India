# DayStart Agriculture and Construction MVP

## Product objective

Let an Agriculture or Construction customer schedule a 1–20 person crew for a job at least one day ahead, while helping DayStart coordinators use verified workforce capacity and relevant prior site history to prepare repeat bookings.

## Primary users

- **Customer:** a farmer, farm operator, contractor, or site coordinator booking scheduled labour.
- **DayStart coordinator:** confirms booking details, reviews available workers, resolves shortages, and records job outcomes.
- **Worker:** a directly employed worker whose service, skill, verification, availability, rating, and active assignment affect eligibility.

## MVP workflow

1. Choose Agriculture or Construction.
2. Select a supported task, operating area/site, date, and crew size from 1–20.
3. Enter a business/customer label and optional operational site instruction.
4. Ask Hindsight for relevant history scoped to the selected service and site. Display any retrieved fact with its source booking and date. The coordinator can use or ignore it.
5. Calculate the quoted total at the configured per-worker daily rate. Show the 30% advance and 70% balance. The prototype labels the payment as simulated.
6. Find workers using current platform data: matching category, verified, online, not suspended, not already on an active job, rating at least 3.0, and within 10 km. Sort nearest first.
7. Assign the full requested crew when enough eligible workers exist. Otherwise flag the booking for coordinator action and show the shortage.
8. Let the coordinator complete the demo job and record a non-sensitive outcome. Retain the dated outcome in Hindsight with a source booking ID and site/service tags.
9. Create a repeat booking at that site and show how the recalled context changes the booking preparation.

## Service catalogue

The MVP exposes only these two services. No other category should appear in navigation, selection, demo data, pricing, or sample copy.

| Service | Example tasks | Scheduling | Rate in the PRD |
|---|---|---|---:|
| Agriculture | Plowing, planting, harvesting, irrigation, weeding, spraying, land leveling, crop cutting | At least one day ahead; 1–20 workers | ₹699 per worker per day |
| Construction | Masonry, tile work, plastering, painting, demolition, flooring, roofing, daily labour | At least one day ahead; 1–20 workers | ₹849 per worker per day |

These rates are prototype defaults from the PRD and should be treated as configurable assumptions until confirmed.

## Hindsight memory contract

### Store

Store a short operational event after a coordinator reviews a completed booking. Include:

- Service category and task.
- Pseudonymous site ID, not a full home address.
- Event timestamp and source booking ID.
- Non-sensitive site access, crop/field condition, or job outcome note.
- Crew size only when it provides useful task context.

Exclude Aadhaar and other identity documents, phone numbers, payment details, exact home addresses, and sensitive worker-performance judgements. Scrub personal contact data from free-text notes before retention.

### Retrieve and reason

Use Hindsight’s official JavaScript client from the server, never directly from the browser. Recall with the service and site tags so one service or site does not influence another. Use `reflect` to summarize relevant history when available, and return the source facts alongside the summary. Handle empty results and Hindsight failures without inventing remembered facts.

### Decision boundary

Hindsight can suggest what a coordinator should verify, such as a previously locked gate or an arrival-time request. It must not determine worker eligibility, ranking, assignment, wage, or suspension. Current booking and workforce records drive those decisions. A coordinator resolves stale, contradictory, or safety-sensitive context.

## Prototype acceptance criteria

- The service picker contains exactly Agriculture and Construction.
- Both booking forms support scheduled dates at least one day in the future and crew counts from 1 to 20.
- Price, 30% advance, and 70% balance recalculate when the service or crew count changes.
- Worker selection is limited to the PRD eligibility rules and 10 km radius; matches are distance ordered.
- The booking is fully assigned only when enough eligible workers are available; otherwise it is visibly escalated to the coordinator.
- The coordinator can complete a synthetic booking with an operational note.
- Hindsight retain, recall, and reflect calls are made by the server when a Hindsight endpoint is configured.
- The UI clearly distinguishes Hindsight results from local demo fallback memory.
- Every recalled item displays source information when provided; an empty result says that no matching history was found.
- Payment is labelled simulated. The prototype does not claim to perform real OTP, payment, SMS, live GPS, payroll, or production authentication.

## Out of scope for this hackathon MVP

- Beauty, driver, or any service beyond Agriculture and Construction.
- Native Android/iOS applications.
- Real payment gateway, OTP/SMS gateway, identity document upload, or payroll transfer.
- Continuous worker GPS tracking and production WebSockets.
- Production database, multi-city scale, insurance, and B2B self-serve portal.
- Automated AI worker selection, worker rating, disciplinary decisions, or automatic suspension.

## Demo plan

Use a synthetic Construction site `KOM-17` and a repeat tile-work job. First load a prior-job event into the configured Hindsight bank and recall it for the site. Show the dated site-access note and source. Then create a three-worker booking, show the ₹2,547 quote, ₹764.10 simulated advance, and the nearest eligible workers. Complete the booking with a new site outcome and retain it. Recall again to show both the old and new evidence, then explain that the coordinator confirms current conditions and the normal assignment algorithm remains in control.

For the recorded video, keep the sequence short: problem, first booking with no memory, retained event, repeat booking with actual Hindsight recall/reflect, and one clear lesson. The local fallback mode is suitable for UI development only; the final judged demo should show the connected Hindsight status and actual Hindsight operations.

## Hackathon submission checklist

- Clean, documented GitHub repository with setup instructions and the Hindsight integration.
- Live demo for judges, including a real Hindsight-connected memory trace.
- Public 2–5 minute team demo video showing retain and recall; do not imply the local fallback is Hindsight.
- Explain how memory changes a repeat booking, with sources and an honest limitation.
- Follow the content guide separately: each team member publishes an English article and social post; the team publishes one public demo video. The guide gives inconsistent article lengths, so target its stated submission range of 800–1,500 words.
- Clearly label synthetic data and simulated payment; do not make unverified market, revenue, or performance claims.
