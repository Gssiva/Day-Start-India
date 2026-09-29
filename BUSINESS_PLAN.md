# DayStart India — Business Plan

## Executive summary

DayStart is a directly employed daily-workforce service for farms and construction customers. In the Hyderabad pilot, customers schedule verified workers for Agriculture or Construction jobs, choose a crew size, pay a 30% advance, and receive workers assigned from DayStart’s available workforce. DayStart manages verification, dispatch, job completion, worker pay, and service quality.

The hackathon product should be a focused **repeat-job booking assistant** inside that business. When a customer or coordinator creates a repeat job, the assistant recalls relevant, dated site and job outcomes from earlier work. It explains what it found and points to the source booking. The coordinator confirms that the information still applies. Hindsight makes DayStart more useful over repeat jobs; it does not replace the deterministic worker eligibility and assignment rules.

The pilot and prototype are limited to two services: **Agriculture** and **Construction**. Beauty, driver, and every other category mentioned in the broader PRD are outside this launch scope.

## Business and customer problem

DayStart addresses two sides of the same local labour problem. Farmers and construction customers can struggle to find enough reliable workers for scheduled jobs, compare prices, and coordinate a crew. Workers can face uncertain daily demand, informal intermediaries, delayed pay, and little record of their work history. The PRD’s intended model is employment with DayStart rather than an open freelancer marketplace.

The initial buyers are:

- **Agriculture:** farmers and farm operators who need a planned crew for plowing, planting, irrigation, weeding, or harvest work.
- **Construction:** independent contractors, site managers, and small building firms that need workers for masonry, tile work, plastering, painting, demolition, flooring, roofing, or general daily labour.

The initial worker supply consists of verified agricultural and construction workers in the operating areas around Hyderabad. The pilot should start in a small number of serviceable areas and expand only when worker supply, dispatch reliability, and customer support can keep pace.

## Service and value proposition

DayStart sells a managed, scheduled labour service with transparent per-worker pricing. A customer chooses one of the two categories, selects a task and work date, sets the crew size from 1 to 20, and confirms the work site. DayStart checks its employee roster, assigns eligible workers, and coordinates the job through completion.

The customer value is a predictable booking and a coordinated crew without repeated informal search and bargaining. The worker value is a direct relationship with DayStart, recorded work history, clearer job details, and a stated compensation arrangement. The DayStart value is a repeatable service operation with revenue from the price charged for completed work less the cost of employing and supporting the workforce.

The product should be described as a **managed daily-workforce service**, not merely a software marketplace. Software supports booking and dispatch; DayStart remains responsible for worker supply, service delivery, payment handling, and customer support.

## Launch scope and service rules

| Service | Planned booking | PRD starting price | Crew size |
|---|---|---:|---:|
| Agriculture | Scheduled at least one day ahead | ₹699 per worker per day | 1–20 |
| Construction | Scheduled at least one day ahead | ₹849 per worker per day | 1–20 |

The listed prices and service rules are copied from the PRD and need confirmation before being treated as live commercial terms. The customer pays a 30% advance at booking and the remaining 70% after completion. For this prototype, payment is simulated; it does not collect or transfer money.

For dispatch, the PRD specifies a 10 km search radius and eligibility rules: the worker is in the requested service category, verified, online, not suspended, not already assigned to an active job, and rated at least 3.0. Eligible workers are sorted by distance and the nearest required number are assigned. If the roster cannot fill the full crew, the prototype flags the booking for coordinator action instead of silently assigning a partial crew.

## How Hindsight strengthens the business

The product’s memory feature is **site and job continuity for repeat work**. It can retain coordinator-approved operational outcomes such as a gate that is usable before a certain time, a crop or field condition to reconfirm, or a work sequence that helped a prior crew complete a similar job. When a repeat booking is drafted, the agent recalls matching history and displays the source and date.

The workflow is:

1. **Retain:** after a job, save a short, non-sensitive outcome with the service, pseudonymous site ID, timestamp, and source booking ID.
2. **Recall:** when drafting another job at the same site, search memory using both the service category and site ID.
3. **Reflect:** summarize the relevant facts as planning context, cite the retrieved source, and tell the coordinator to confirm whether the note still applies.
4. **Act through the platform:** only current booking data and the established eligibility rules determine available workers. The coordinator reviews any memory-based suggestion.

This makes memory visible in a real workflow: the same booking is generic before relevant history is available and more context-aware after a completed job has been retained. Memory can reduce missed site instructions and repeated coordination, while the booking and dispatch engine remains predictable.

The demo must use the real Hindsight client and show actual retain, recall, and reflect calls. The local memory fallback in the prototype is clearly labelled as demo memory; it is useful for development but is not evidence of Hindsight integration. Do not put Aadhaar numbers, phone numbers, payment information, exact home addresses, or sensitive worker evaluations into Hindsight. Keep operational notes tied to a source record and confirm them before reuse.

## Revenue model and unit economics

The PRD proposes a service margin as the primary revenue source, with the worker paid through either a monthly salary slab or a per-job wage selected at onboarding. It also proposes future bulk supply agreements with farms and construction companies. The current two-service pilot should measure the primary service economics before adding new revenue streams.

The PRD lists an average booking value of ₹599, worker cost per job of ₹400, gross margin per booking of ₹199 (about 33%), platform operating cost of ₹60, and net contribution of ₹139. It then projects 200 bookings a day by month six and ₹35.9 lakh in monthly revenue.

These are **planning assumptions from the PRD, not independently validated results**. The average booking value of ₹599 conflicts with the stated minimum price of ₹699 for even a one-worker Agriculture day and ₹849 for Construction. At 200 bookings a day for 30 days, ₹599 produces approximately ₹35.94 lakh of monthly booking value. That arithmetic matches the PRD’s ₹35.9 lakh figure, but the PRD should distinguish booking value (GMV) from recognized revenue, gross margin, and contribution. The 30% advance is a payment schedule and a cash-timing benefit; it is not profit.

Before using financial claims with customers, investors, or judges, validate service-specific customer prices, worker wages, average crew size, paid completion rates, refunds, travel/support cost, payment fees, and the accounting treatment of revenue. Track economics separately for Agriculture and Construction; their prices, seasonality, crew size, and utilization may differ materially.

## Hyderabad go-to-market plan

The PRD places the first pilot in Hyderabad. Begin with a few repeatable service areas rather than claiming citywide supply from day one.

1. **Recruit anchor demand:** interview farm operators and construction contractors who schedule recurring work. Prioritize customers with a known site and repeat task.
2. **Build local worker capacity:** onboard and verify workers by service, trade or task, availability, and service area. Confirm training, safety expectations, job information, and pay terms before dispatch.
3. **Run assisted bookings:** have an operations coordinator confirm date, location, crew size, task, access conditions, and worker availability. The software should surface shortages early.
4. **Measure completed work:** record whether the crew arrived, whether the job was completed, whether pay was timely, and whether the customer would book again.
5. **Expand service areas selectively:** add a locality only when worker availability and support coverage can meet the promised service window.

The PRD’s later city expansion, insurance, worker apps, and self-serve corporate portal are roadmap ideas. They are not part of this hackathon MVP.

## Operating measures

For the pilot, prioritize service reliability and worker outcomes over headline booking volume:

- Bookings accepted by operations and fully staffed before the work date.
- Percentage of bookings with the full requested crew assigned.
- Worker arrival and completed-job rate.
- Median time from booking confirmation to complete crew assignment.
- Cancellations, refunds, and reasons for unfilled jobs.
- Customer repeat-booking rate by service and area.
- Worker online availability, utilization, and on-time payment.
- Customer rating and follow-up resolution time.
- For Hindsight: recall relevance, source visibility, coordinator confirmation or correction, and cases where a stale note was rejected.

The PRD sets a target of under 60 seconds for assignment. Treat that as a service target to measure in the pilot, not as an already proven outcome. The hackathon prototype should show the deterministic assignment result immediately on synthetic data and report honest measurements if benchmarks are collected.

The PRD also lists pilot targets of 100 verified workers and 10 daily bookings by month one, then 500 workers and 200 daily bookings by month six. It sets a month-one online-rate target of 60%, month-six target of 75%, assignment-time targets below 90 seconds and 60 seconds respectively, average ratings of 4.0+ and 4.5+, and auto-suspension rates below 5% and 3%. Treat these as planning targets, then set baselines and report actual results separately.

## Risks and response

- **Insufficient local supply:** restrict service areas, show shortages before confirming a crew, and allow a coordinator to resolve the booking.
- **Stale or incorrect site memory:** display the source and date, ask the coordinator to confirm, and retain corrections as new dated evidence.
- **Unfair or unsafe assignment:** keep memory out of worker ranking; use explicit availability and eligibility rules; let coordinators review exceptions. Before production, revisit the PRD’s no-rejection policy with workers and qualified employment advisers so availability, safety, and reassignment processes are clear.
- **Worker trust and retention:** make pay terms, job details, deductions, complaint resolution, and work availability understandable; track worker outcomes as closely as customer outcomes.
- **Privacy and data exposure:** minimize data sent to memory, scope retrieval to the service and site, and keep personal identity and payment data in the appropriate protected system.
- **Unproven unit economics:** label projections as assumptions and replace them with service-level pilot data.
- **Payment and identity integrations:** the PRD marks several third-party integrations as pending or simulated. Do not imply live payment, OTP, SMS, or continuous GPS functions in this prototype.

## Recommended decision

Build DayStart as a narrow Hyderabad pilot for scheduled Agriculture and Construction work. Make the core customer promise a reliably coordinated crew. Use Hindsight as the differentiator for repeat bookings: it remembers useful site and job context, shows its sources, and helps the coordinator prepare a better booking without taking over assignment decisions. Prove worker availability, service reliability, repeat demand, and contribution margin before expanding the service catalogue or geography.
