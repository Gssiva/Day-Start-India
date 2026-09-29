# DayStart India — Memory-Aware Workforce Coordination Agent

> **Backbone Of India** · Track: *AI Agents That Learn Using Hindsight*  
> Persistent Operational Memory for Agriculture & Construction Workforce Coordination

---

## 1. Problem

In daily workforce coordination across **Agriculture** and **Construction**, operations teams face a costly recurring problem: **operational amnesia**. Every repeated job at the same site forces coordinators and dispatchers to rediscover the same field conditions:
- Which entrance is open or padlocked by building security
- What shift timing prevents midday heat exhaustion or traffic gate congestion
- When materials (e.g. dry mortar mix) or utilities (e.g. irrigation canal valves) need to be pre-staged
- What specific safety hazards or equipment clearance requirements exist on site

Without persistent memory, repeat bookings start from zero context. Crews arrive at locked gates, sit idle waiting for materials, or face preventable safety hazards, while coordinators waste hours re-confirming baseline details.

---

## 2. Solution: DayStart India

**DayStart India** is a directly employed daily-workforce coordination platform equipped with an autonomous **AI Agent Layer** powered by **Hindsight persistent memory**.

Rather than acting as a passive side-panel or chatbot, the DayStart India AI Agent is embedded directly in the operational booking and dispatch pipeline:
1. **Remembers** safe, non-sensitive operational outcomes from completed jobs.
2. **Recalls** relevant prior experience when a repeat booking is scheduled at the same site.
3. **Reasons** over historical outcomes and synthesizes a **Memory-Informed Operational Plan** with actionable dispatch directives (access routing, arrival timing, material staging, safety gear).
4. **Cites Sources** with exact booking IDs and dates so the human coordinator can verify the history.
5. **Preserves Human Oversight**: The coordinator reviews the agent plan with 1-click **Accept**, **Edit**, or **Ignore** controls.
6. **Enforces Strict Determinism**: Live worker eligibility and proximity assignment remain 100% governed by platform rules. Hindsight never chooses, ranks, or overrides worker eligibility.

---

## 3. Why Persistent Memory Matters

A conventional booking system or LLM chatbot is stateless: each booking request is treated in total isolation. By contrast, **Hindsight persistent memory** gives the DayStart India AI Agent experiential learning:

| Dimension | Without Memory (Baseline) | With Hindsight Persistent Memory |
|---|---|---|
| **Site Entry** | "Verify entrance with customer 2 hours prior." | "Direct crew strictly to West Gate. East entrance has documented security lockouts (DS-1011)." |
| **Shift Timing** | "Deploy crew at standard scheduled time." | "Schedule worker arrival strictly at 06:00 AM to complete harvest before 36°C heat (DS-2005)." |
| **Staging** | "Verify tools upon arrival." | "Request customer pre-stages dry mortar mix by 8:30 AM to prevent idle crew delays (DS-1024)." |
| **Safety** | "Standard site safety check." | "Equip workers with dust masks for Sector B excavation dust (DS-1038)." |
| **Source Citation** | None | Verified source booking ID & historical timestamp |

---

## 4. Architectural Separation: Memory vs Eligibility

A central design principle of DayStart India is the strict boundary between **operational context** and **workforce eligibility**:

> **"Hindsight provides persistent operational context. Current platform data controls worker eligibility and assignment."**

```
CUSTOMER BOOKING REQUEST
           ↓
DAYSTART INDIA AI AGENT
┌────────────────────────────────────────────────────────┐
│ Agent Reasoning & Operational Planning                 │
│                                                        │
│ Current Booking Context                                │
│           +                                            │
│ Hindsight Persistent Memory Bank (Recall & Reflect)    │
└────────────────────────────────────────────────────────┘
           ↓
Memory-Informed Operational Plan (with Source Citations)
           ↓
Coordinator Approval [✓ Accept] [✎ Edit] [✕ Ignore]
           ↓
Deterministic Worker Eligibility Engine
• Category Match (Agriculture / Construction)
• Verified Status === true
• Online / Available Status === true
• Platform Rating >= 3.0
• No Active Booking Conflict
• Distance <= 10 km (Haversine proximity sorting)
           ↓
Crew Assignment (Nearest eligible workers)
           ↓
Job Completion & Coordinator Operational Review
           ↓
Privacy & PII Sanitization
           ↓
Hindsight Retain (Future Repeat Booking Experience)
```

**Critical Guardrail**: If an unverified, offline, or low-rated worker is praised in a past memory note, the platform eligibility engine **strictly excludes them**. Memory cannot override safety, verification, or availability rules.

---

## 5. Hindsight Integration

DayStart India connects to Hindsight using the official `@vectorize-io/hindsight-client` npm package:

### 1. Dedicated Memory Bank
- **Bank ID**: `daystart-hyderabad-demo`
- **Mission**: Configured with explicit domain instructions and safety guardrails:
  > *"Help DayStart India operations coordinators remember service-specific site conditions, access gates, arrival timing, equipment readiness, and completed job outcomes for Agriculture and Construction bookings around Hyderabad. Distinguish remembered facts from suggestions. Worker eligibility, safety rules, distance, and assignment decisions must come strictly from current platform data and deterministic rules. Never retain identity documents, phone numbers, passwords, or exact home addresses."*

### 2. Retain (`hindsight.retain`)
Retains structured operational notes upon job completion with:
- `documentId`: Scoped booking document identifier (`daystart-booking-DS-XXXX`)
- `tags`: Scoped strict tags (`service:construction`, `site:KOM-17`, `task:tile work`)
- `metadata`: `source_booking_id`, `site_id`, `service`, `record_type: 'site_outcome'`

### 3. Recall (`hindsight.recall`)
Queries the memory bank using scoped tags and semantic task queries with `tagsMatch: 'all_strict'`. Retrieves dated operational facts with source document metadata.

### 4. Reflect (`hindsight.reflect`)
When multiple historical records accumulate across jobs, the agent triggers `reflect` to synthesize recurring multi-job patterns (e.g. repeated gate lockouts, recurring seasonal heat constraints).

### 5. Local Fallback
When a local Hindsight server is not running, the application gracefully activates **Demo Memory** fallback mode. The UI clearly labels this state as Demo Memory, preserving full product explorability without fabricating connection status.

---

## 6. Privacy & PII Scrubbing

All notes passed to Hindsight retain calls are automatically sanitized by the server-side privacy engine:
- **Emails**: Replaced with `[email removed]`
- **Phone Numbers**: Indian 10-digit and +91 numbers replaced with `[phone removed]`
- **Aadhaar Numbers**: 12-digit national IDs replaced with `[id removed]`
- **PAN Cards**: Tax identifiers replaced with `[id removed]`
- **Credentials**: Passwords, API tokens, and secret patterns scrubbed
- **Exact Home Addresses**: Scoped to pseudonymous site IDs (`KOM-17`, `SHM-04`)

---

## 7. Setup & Running

### Requirements
- Node.js 18 or later (Node.js 20+ LTS recommended)
- npm 8+ or pnpm

### Quick Start (Standalone / Demo Memory Mode)
```powershell
npm install
npm start
```
Open **[http://localhost:4173](http://localhost:4173)** in your browser.

### Run with Live Hindsight Server
To connect the application to an official local Hindsight instance:
```powershell
# 1. Start Hindsight API (e.g. via Docker / Quickstart)
# 2. Configure environment and launch DayStart India
$env:HINDSIGHT_BASE_URL = "http://localhost:8888"
$env:HINDSIGHT_BANK_ID = "daystart-hyderabad-demo"
npm start
```

### Running Automated Test Suite
The repository includes a comprehensive unit and end-to-end verification test suite:
```powershell
npm test
```
The test suite verifies:
1. PII and credential sanitization
2. Haversine distance accuracy
3. Deterministic worker eligibility rules
4. Critical guardrail: memory never overrides worker eligibility
5. Before-memory (baseline generic) vs After-memory (memory-informed) behavioral contrast
6. End-to-end booking dispatch, completion, retention, and repeat-job recall

---

## 8. Environment Variables

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `4173` | Local HTTP server port |
| `HINDSIGHT_BASE_URL` | `http://localhost:8888` | Base URL of the Hindsight memory API |
| `HINDSIGHT_BANK_ID` | `daystart-hyderabad-demo` | Dedicated memory bank ID for DayStart India |

---

## 9. Limitations & Honest Scope

- **Prototype Payment**: Payment calculations (30% advance, 70% balance) are simulated for demonstration; no real financial transactions are executed.
- **Hyderabad Pilot Scope**: The prototype models verified worker rosters across 4 Hyderabad operating clusters (Kompally, Shamshabad, Medchal, Chevella) for Agriculture and Construction.
- **Worker Employment Model**: Follows DayStart's direct-employment model rather than an open gig marketplace.

---

## License

Built for **India** by the DayStart India team.
