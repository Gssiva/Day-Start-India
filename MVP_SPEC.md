# DayStart India — Agriculture and Construction AI Agent MVP

## Product objective

Empower Agriculture and Construction customers in Hyderabad to schedule 1–20 person crews at least one day ahead, while the **DayStart India AI Agent** uses **Hindsight persistent memory** to recall prior site conditions, access routes, staging timelines, and safety directives, helping operations coordinators prepare intelligent repeat bookings.

## Primary users

- **Customer:** a farmer, farm operator, contractor, or builder scheduling daily workforce crews.
- **DayStart India Coordinator:** reviews agent-generated operational plans, accepts/edits directives, resolves shortages, and records job completion outcomes.
- **Worker:** a directly employed workforce member whose verified status, online availability, platform rating (≥ 3.0), and 10 km proximity deterministically govern eligibility.

## MVP AI Agent Workflow

```
Customer Booking Request
        ↓
DayStart India AI Agent
        ↓
Hindsight Persistent Memory Retrieval (Recall & Reflect)
        ↓
Operational Context Reasoning (Access, Timing, Materials, Safety)
        ↓
Memory-Informed Operational Plan (with Source Citations)
        ↓
Coordinator Approval [✓ Accept Plan] [✎ Edit] [✕ Ignore]
        ↓
Deterministic Worker Eligibility Engine (10 km Proximity Sort)
        ↓
Crew Assignment (Nearest verified workers)
        ↓
Job Completion & Operational Review
        ↓
Automated Privacy Sanitization
        ↓
Hindsight Retain (Stored for future repeat bookings)
```

1. **Category Selection:** Customer chooses strictly **Agriculture** or **Construction**.
2. **Parameters:** Selects task, site/operating area, date (at least 1 day ahead), and crew count (1–20).
3. **Agent Reasoning:** The DayStart India AI Agent queries Hindsight memory using scoped tags (`service`, `site`).
   - **Baseline (Before Memory):** Generates standard generic verification protocol when no historical records exist.
   - **Memory-Informed (After Memory):** Synthesizes specific, actionable directives (gate entry, arrival timing, material readiness, safety) with source citations from prior booking IDs.
4. **Coordinator Review:** The coordinator has operational authority: 1-click **Accept**, **Edit**, or **Ignore**.
5. **Pricing & Advance:** 30% advance and 70% balance calculated transparently at standard per-worker daily rates (simulated prototype payment).
6. **Strictly Deterministic Eligibility:** Verified === true, online === true, rating ≥ 3.0, not suspended, no active booking, distance ≤ 10 km.
7. **Proximity Assignment:** Nearest eligible workers assigned up to requested crew count; shortages trigger immediate coordinator alert.
8. **Completion & Retain:** Coordinator inputs operational outcome; the privacy engine strips PII and retains the record in Hindsight.

## Service Catalogue

| Service | Example tasks | Scheduling | Rate |
|---|---|---|---:|
| Agriculture | Field plowing, seed planting, harvesting, irrigation work, weeding, fertilizer spraying, land leveling, crop cutting | At least 1 day ahead; 1–20 workers | ₹699 / worker / day |
| Construction | Masonry, tile work, plastering, painting, demolition, daily labour, flooring, roofing | At least 1 day ahead; 1–20 workers | ₹849 / worker / day |

## Hindsight Memory Contract

### Store (Retain)
Captures safe operational outcomes post-job review:
- Service category, task, and pseudonymous site ID (`KOM-17`, `SHM-04`, `MED-09`, `CHE-12`).
- Event timestamp and source booking ID (`DS-XXXX`).
- Non-sensitive gate access, staging requirements, crop conditions, or safety observations.
- Automatic scrubbing of emails, phone numbers, Aadhaar, PAN, and credentials.

### Retrieve and Reason (Recall & Reflect)
- Uses official `@vectorize-io/hindsight-client` with strict tag scoping (`service:construction`, `site:KOM-17`).
- Formulates multi-job synthesized reflections when multiple historical records exist.
- Gracefully falls back to local demo memory when the Hindsight server is unreachable.

### Decision Boundary Guardrail
- **Hindsight informs operational preparation only.**
- **Hindsight NEVER determines, modifies, ranks, or overrides worker eligibility, wages, or assignment.**
- Stale or conflicting historical advice is resolved by the human coordinator.

## Acceptance Criteria

- [x] Service picker strictly limited to Agriculture and Construction.
- [x] Dates enforce minimum 1-day advance scheduling; crew sizes 1–20.
- [x] Price, 30% advance, and 70% balance recalculate dynamically.
- [x] AI Agent generates distinct **Baseline (Generic)** vs **Memory-Informed** plans based on Hindsight memory count.
- [x] Recommendations include category, action, reason, and source booking citation.
- [x] Coordinator review toolbar provides 1-click Accept, Edit, and Ignore actions.
- [x] Worker eligibility strictly adheres to platform deterministic rules; memory cannot make an ineligible worker eligible.
- [x] Job completion sanitizes PII and retains outcomes in Hindsight.
- [x] 8 synthetic historical records provided for multi-site demo testing.
- [x] Unit and end-to-end integration test suites pass completely (`npm test`).
