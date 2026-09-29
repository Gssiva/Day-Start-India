/**
 * DayStart India — Memory-Aware Workforce Coordination Agent
 * 
 * Architecture:
 * USER REQUEST
 *      ↓
 * DAYSTART INDIA AI AGENT
 *      ↓
 * ┌───────────────────────────────────────────┐
 * │ Agent Reasoning & Operational Planning    │
 * │                                           │
 * │ Current Platform Data                     │
 * │              +                            │
 * │ Hindsight Persistent Memory               │
 * │              +                            │
 * │ Booking Context                           │
 * └───────────────────────────────────────────┘
 *      ↓
 * Memory-Aware Operational Plan
 *      ↓
 * Coordinator Review (Accept / Edit / Ignore)
 *      ↓
 * Current Eligibility / Business Rule Engine (Strictly Deterministic)
 *      ↓
 * Worker Assignment
 *      ↓
 * Job Completion
 *      ↓
 * Non-Sensitive Operational Outcome
 *      ↓
 * Hindsight Retain
 *      ↓
 * Future Booking Context
 */

// Safety & Privacy scrubbing
export function sanitizeNote(input) {
  return String(input || '')
    .trim()
    .slice(0, 600)
    // Scrub emails
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[email removed]')
    // Scrub Indian phone numbers (10 digits, +91 prefixes)
    .replace(/\b(?:\+?91[\-\s]?)?[6-9]\d{9}\b/g, '[phone removed]')
    .replace(/\b\d{10,12}\b/g, '[number removed]')
    // Scrub Aadhaar-like 12 digit numbers
    .replace(/\b\d{4}[\s\-]?\d{4}[\s\-]?\d{4}\b/g, '[id removed]')
    // Scrub PAN-like patterns
    .replace(/\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/gi, '[id removed]')
    // Scrub passwords/secrets
    .replace(/\b(?:password|passwd|secret|api[_\-]?key|token)\s*[:=]\s*\S+/gi, '[credential removed]');
}

// Haversine distance calculator
export function haversine(lat1, lng1, lat2, lng2) {
  const rad = (x) => (x * Math.PI) / 180;
  const dLat = rad(lat2 - lat1);
  const dLng = rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// 8 Realistic Synthetic Historical Records across multiple sites for demo
export const SEED_HISTORICAL_MEMORIES = [
  // KOM-17 (Construction - Kompally) - 3 sequential jobs showing access learning & material staging
  {
    bookingId: 'DS-1011',
    documentId: 'daystart-seed-KOM17-1011',
    siteId: 'KOM-17',
    service: 'construction',
    subService: 'Tile work',
    workerCount: 3,
    createdAt: '2026-09-15T16:30:00.000Z',
    source: 'Completed booking · DS-1011 (2026-09-15)',
    content: 'Construction completed at Kompally site (KOM-17). Task: Tile work. Crew: 3 workers. Operational outcome: East entrance was padlocked by building security without notice; crew waited 45 minutes until West gate was opened. West gate confirmed usable. Tile work finished successfully once inside.',
    tags: ['service:construction', 'site:KOM-17', 'access:west_gate', 'delay:east_entrance'],
  },
  {
    bookingId: 'DS-1024',
    documentId: 'daystart-seed-KOM17-1024',
    siteId: 'KOM-17',
    service: 'construction',
    subService: 'Tile work',
    workerCount: 3,
    createdAt: '2026-09-20T17:15:00.000Z',
    source: 'Completed booking · DS-1024 (2026-09-20)',
    content: 'Construction completed at Kompally site (KOM-17). Task: Tile work. Crew: 3 workers. Operational outcome: West gate entry was utilized smoothly with zero delay. Contractor delayed dry mortar mix delivery until 10:15 AM. Pre-arranging mortar bags by 8:30 AM is essential for unhindered morning work.',
    tags: ['service:construction', 'site:KOM-17', 'access:west_gate', 'material:mortar_prep'],
  },
  {
    bookingId: 'DS-1038',
    documentId: 'daystart-seed-KOM17-1038',
    siteId: 'KOM-17',
    service: 'construction',
    subService: 'Masonry / bricklaying',
    workerCount: 4,
    createdAt: '2026-09-25T16:45:00.000Z',
    source: 'Completed booking · DS-1038 (2026-09-25)',
    content: 'Construction completed at Kompally site (KOM-17). Task: Masonry. Crew: 4 workers. Operational outcome: West gate confirmed as standard entrance. Heavy airborne dust noted near Sector B excavation; dust masks provided on site. Water connection at rear boundary is functional for brick soaking.',
    tags: ['service:construction', 'site:KOM-17', 'access:west_gate', 'safety:dust_masks', 'utility:water_rear'],
  },

  // SHM-04 (Agriculture - Shamshabad) - 2 sequential jobs showing arrival timing & canal pumps
  {
    bookingId: 'DS-2005',
    documentId: 'daystart-seed-SHM04-2005',
    siteId: 'SHM-04',
    service: 'agriculture',
    subService: 'Harvesting',
    workerCount: 6,
    createdAt: '2026-09-18T14:20:00.000Z',
    source: 'Completed booking · DS-2005 (2026-09-18)',
    content: 'Agriculture completed at Shamshabad farm (SHM-04). Task: Harvesting. Crew: 6 workers. Operational outcome: 6:00 AM early dispatch is critical; afternoon temperatures exceed 36°C causing worker fatigue. Irrigation canal south valve had low water pressure, farm supervisor assisted manually.',
    tags: ['service:agriculture', 'site:SHM-04', 'timing:early_6am', 'irrigation:south_valve'],
  },
  {
    bookingId: 'DS-2018',
    documentId: 'daystart-seed-SHM04-2018',
    siteId: 'SHM-04',
    service: 'agriculture',
    subService: 'Irrigation work',
    workerCount: 4,
    createdAt: '2026-09-23T15:00:00.000Z',
    source: 'Completed booking · DS-2018 (2026-09-23)',
    content: 'Agriculture completed at Shamshabad farm (SHM-04). Task: Irrigation work. Crew: 4 workers. Operational outcome: South canal valve operational after farm maintenance. Tractor route is waterlogged following sprinkler run; waterproof gumboots recommended for crew dispatch.',
    tags: ['service:agriculture', 'site:SHM-04', 'gear:gumboots', 'irrigation:repaired'],
  },

  // MED-09 (Construction - Medchal) - 2 jobs showing vehicle height limits & staging
  {
    bookingId: 'DS-3002',
    documentId: 'daystart-seed-MED09-3002',
    siteId: 'MED-09',
    service: 'construction',
    subService: 'Plastering',
    workerCount: 3,
    createdAt: '2026-09-19T17:00:00.000Z',
    source: 'Completed booking · DS-3002 (2026-09-19)',
    content: 'Construction completed at Medchal site (MED-09). Task: Plastering. Crew: 3 workers. Operational outcome: Main entrance has a 3.2m height restriction barrier that blocks delivery trucks. Scaffolding and heavy sand unloading must use North Service Gate.',
    tags: ['service:construction', 'site:MED-09', 'access:north_gate', 'delivery:height_restriction'],
  },
  {
    bookingId: 'DS-3015',
    documentId: 'daystart-seed-MED09-3015',
    siteId: 'MED-09',
    service: 'construction',
    subService: 'Painting',
    workerCount: 2,
    createdAt: '2026-09-24T16:30:00.000Z',
    source: 'Completed booking · DS-3015 (2026-09-24)',
    content: 'Construction completed at Medchal site (MED-09). Task: Painting. Crew: 2 workers. Operational outcome: North Service Gate entry coordinated smoothly. Interior basement corridors lack adequate airflow; portable ventilation fans were required during primer application.',
    tags: ['service:construction', 'site:MED-09', 'access:north_gate', 'safety:ventilation'],
  },

  // CHE-12 (Agriculture - Chevella) - 1 job showing equipment hazards
  {
    bookingId: 'DS-4001',
    documentId: 'daystart-seed-CHE12-4001',
    siteId: 'CHE-12',
    service: 'agriculture',
    subService: 'Field plowing',
    workerCount: 4,
    createdAt: '2026-09-22T15:30:00.000Z',
    source: 'Completed booking · DS-4001 (2026-09-22)',
    content: 'Agriculture completed at Chevella farm (CHE-12). Task: Field plowing. Crew: 4 workers. Operational outcome: North perimeter border has low-hanging overhead service cable near post #4. High-clearance machinery must maintain 5-meter safety buffer.',
    tags: ['service:agriculture', 'site:CHE-12', 'safety:overhead_cable', 'hazard:post_4'],
  },
];

/**
 * AI AGENT TOOL: Build Search Query for Hindsight Recall
 */
export function buildMemoryQuery(service, site, subService, workerCount) {
  const serviceName = service === 'agriculture' ? 'Agriculture' : 'Construction';
  return `DayStart India operational planning for ${serviceName} job at site ${site.id} (${site.label}, ${site.area}). Task: ${subService}. Requested crew: ${workerCount} workers. Retrieve past site access issues, gate locations, arrival timing, equipment/material preparation, safety hazards, and completion outcomes.`;
}

/**
 * AI AGENT REASONING ENGINE
 * Analyzes recalled memories and synthesizes structured operational recommendations.
 */
export function generateOperationalPlan({
  bookingContext,
  recalledMemories = [],
  reflection = '',
  hindsightMode = 'Demo memory',
}) {
  const { service, site, subService, workerCount } = bookingContext;
  const serviceTitle = service === 'agriculture' ? 'Agriculture' : 'Construction';

  // Filter memories matching site and service
  const relevant = recalledMemories.filter((m) => {
    const text = (m.text || m.content || '').toLowerCase();
    const metaSite = m.metadata?.site_id || m.siteId;
    const metaService = m.metadata?.service || m.service;
    if (metaSite && metaSite !== site.id) return false;
    if (metaService && metaService !== service) return false;
    return true;
  });

  // CASE 1: BEFORE MEMORY (0 relevant memories)
  // Clean baseline state: Generic standard operational preparation
  if (relevant.length === 0) {
    return {
      status: 'baseline_generic',
      mode: hindsightMode,
      headline: 'Baseline Operational Plan (No Prior Memory)',
      memoryCount: 0,
      confidenceBadge: 'BASELINE · 0 HISTORICAL RECORDS',
      summary: `First recorded booking for ${serviceTitle} at ${site.label} (${site.id}). No prior operational outcomes or site access history are available in Hindsight memory. Operating under standard baseline dispatch protocol.`,
      sources: [],
      recommendations: [
        {
          id: 'rec-1',
          category: 'Task & Scope Verification',
          action: `Verify specific customer requirements for ${subService} upon arrival.`,
          reason: 'Standard baseline protocol when no prior task history exists.',
          status: 'pending',
        },
        {
          id: 'rec-2',
          category: 'Access & Logistics',
          action: 'Contact site coordinator 2 hours prior to dispatch to confirm main entrance and entry permissions.',
          reason: 'Standard access protocol for new or unremembered sites.',
          status: 'pending',
        },
        {
          id: 'rec-3',
          category: 'Crew Sizing & Dispatch',
          action: `Deploy standard requested crew of ${workerCount} worker(s) and confirm on-site supervisor.`,
          reason: 'Standard crew deployment baseline.',
          status: 'pending',
        },
      ],
      coordinatorNote: 'Baseline preparation generated. Coordinator should establish initial site notes upon job completion.',
      reflection: reflection || 'No accumulated historical records found for this site. Completing this booking will retain the first operational memory for future visits.',
      hasMemory: false,
    };
  }

  // CASE 2: AFTER MEMORY (1+ relevant memories accumulated)
  // Memory-aware operational reasoning engine
  const recommendations = [];
  const sources = [];
  const combinedText = relevant.map((m) => m.text || m.content || '').join(' ');
  const lower = combinedText.toLowerCase();

  // Extract sources
  relevant.forEach((m, idx) => {
    const srcId = m.source || m.metadata?.source_booking_id || m.bookingId || `Job #${idx + 1}`;
    const date = m.createdAt ? new Date(m.createdAt).toLocaleDateString('en-IN') : 'Previous job';
    sources.push({
      bookingId: srcId,
      date,
      snippet: (m.text || m.content || '').slice(0, 140) + '...',
    });
  });

  // 1. Site Access Reasoning
  if (lower.includes('west gate') && (lower.includes('east') || lower.includes('lock') || lower.includes('padlock'))) {
    recommendations.push({
      id: 'rec-access-1',
      category: 'Site Access Protocol',
      action: 'Direct crew strictly to West Gate for site entry. Avoid East entrance due to documented security lockouts.',
      reason: 'Recalled from prior completed job outcomes citing East entrance delays and confirmed West gate accessibility.',
      sourceBookingId: sources[0]?.bookingId || 'Historical record',
      status: 'pending',
    });
  } else if (lower.includes('north service gate') || lower.includes('height restriction')) {
    recommendations.push({
      id: 'rec-access-2',
      category: 'Site Access & Delivery',
      action: 'Direct delivery and tool vehicles to North Service Gate. Avoid Main Entrance due to 3.2m vehicle height restriction.',
      reason: 'Recalled from prior delivery delays at main gate height barrier.',
      sourceBookingId: sources[0]?.bookingId || 'Historical record',
      status: 'pending',
    });
  } else if (lower.includes('gate') || lower.includes('entrance')) {
    recommendations.push({
      id: 'rec-access-gen',
      category: 'Site Access',
      action: 'Confirm gate opening schedule with facility manager prior to 8:30 AM.',
      reason: 'Prior job outcomes indicate gate timing dependencies.',
      sourceBookingId: sources[0]?.bookingId || 'Historical record',
      status: 'pending',
    });
  }

  // 2. Arrival & Timing Reasoning
  if (lower.includes('6:00 am') || lower.includes('6 am') || lower.includes('heat') || lower.includes('fatigue')) {
    recommendations.push({
      id: 'rec-timing-1',
      category: 'Arrival & Shift Timing',
      action: 'Schedule worker arrival strictly at 06:00 AM to complete high-exertion tasks before midday heat.',
      reason: 'Recalled from previous harvest operations noting severe afternoon heat exhaustion.',
      sourceBookingId: sources[0]?.bookingId || 'Historical record',
      status: 'pending',
    });
  } else if (lower.includes('8:30 am') || lower.includes('morning') || lower.includes('before 9 am')) {
    recommendations.push({
      id: 'rec-timing-2',
      category: 'Arrival & Shift Timing',
      action: 'Dispatch crew for 08:30 AM arrival to ensure gate access and maximize daylight productivity.',
      reason: 'Prior job records confirm gate opening window and reduced access wait times.',
      sourceBookingId: sources[0]?.bookingId || 'Historical record',
      status: 'pending',
    });
  }

  // 3. Materials, Tools & Equipment Readiness
  if (lower.includes('mortar') || lower.includes('cement') || lower.includes('material')) {
    recommendations.push({
      id: 'rec-material-1',
      category: 'Material Readiness',
      action: 'Request customer pre-stages dry mortar mix and materials by 8:30 AM to prevent idle crew wait time.',
      reason: 'Recalled from booking DS-1024 where crew experienced a 90-minute material delivery delay.',
      sourceBookingId: sources.find((s) => s.snippet.includes('mortar'))?.bookingId || sources[0]?.bookingId,
      status: 'pending',
    });
  } else if (lower.includes('valve') || lower.includes('pump') || lower.includes('irrigation')) {
    recommendations.push({
      id: 'rec-material-2',
      category: 'Utility & Water Staging',
      action: 'Verify south canal valve water pressure with farm supervisor before crew begins irrigation work.',
      reason: 'Prior jobs noted recurring canal valve pressure fluctuations.',
      sourceBookingId: sources[0]?.bookingId,
      status: 'pending',
    });
  }

  // 4. Safety & Hazard Mitigation
  if (lower.includes('dust') || lower.includes('mask') || lower.includes('excavation')) {
    recommendations.push({
      id: 'rec-safety-1',
      category: 'Safety Protocol',
      action: 'Equip workers with safety dust masks for Sector B airborne dust generated by adjacent foundation works.',
      reason: 'Recalled from masonry booking DS-1038 safety observation.',
      sourceBookingId: sources.find((s) => s.snippet.includes('dust'))?.bookingId || sources[0]?.bookingId,
      status: 'pending',
    });
  } else if (lower.includes('gumboots') || lower.includes('waterlogged') || lower.includes('muddy')) {
    recommendations.push({
      id: 'rec-safety-2',
      category: 'Safety & Footwear',
      action: 'Ensure crew has waterproof gumboots for waterlogged tractor pathways.',
      reason: 'Recalled from previous irrigation job outcome at this site.',
      sourceBookingId: sources[0]?.bookingId,
      status: 'pending',
    });
  } else if (lower.includes('overhead') || lower.includes('cable') || lower.includes('post #4')) {
    recommendations.push({
      id: 'rec-safety-3',
      category: 'Hazard Alert',
      action: 'Maintain 5-meter clearance along north perimeter border near post #4 due to low overhead service cables.',
      reason: 'Recalled from prior field plowing safety incident report.',
      sourceBookingId: sources[0]?.bookingId,
      status: 'pending',
    });
  }

  // Ensure at least 2 recommendations even if generic historical matches
  if (recommendations.length < 2) {
    recommendations.push({
      id: 'rec-general-exp',
      category: 'Operational Continuity',
      action: `Review past task pacing: similar ${subService} jobs successfully completed with planned crew.`,
      reason: `Synthesized from ${relevant.length} completed job outcome(s) stored in Hindsight memory.`,
      sourceBookingId: sources[0]?.bookingId,
      status: 'pending',
    });
  }

  // Multi-job reflection summary
  const reflectionText =
    reflection ||
    `Hindsight analyzed ${relevant.length} prior completed job record(s) for site ${site.id}. Persistent operational context reveals clear site patterns: gate routing, staging timelines, and specific site safety requirements. Coordinator review ensures recommendations are applied to the active dispatch instruction.`;

  return {
    status: 'memory_informed',
    mode: hindsightMode,
    headline: `Memory-Informed Operational Plan (${relevant.length} Prior Job${relevant.length > 1 ? 's' : ''})`,
    memoryCount: relevant.length,
    confidenceBadge: `MEMORY-INFORMED · ${relevant.length} HISTORICAL RECORD${relevant.length > 1 ? 'S' : ''}`,
    summary: `The DayStart India AI Agent recalled ${relevant.length} verified past job outcome(s) from Hindsight memory for ${site.label} (${site.id}). Operational experience has been translated into ${recommendations.length} actionable dispatch instructions for coordinator review.`,
    sources,
    recommendations,
    coordinatorNote: 'Review and approve, edit, or ignore the agent recommendations below. Approved items will be attached to the official crew dispatch ticket.',
    reflection: reflectionText,
    hasMemory: true,
  };
}

/**
 * DETERMINISTIC WORKER ELIGIBILITY ENGINE
 * 
 * Rules:
 * 1. Matching service category (Agriculture / Construction)
 * 2. Verified status === true
 * 3. Suspended status === false
 * 4. Online / Available status === true
 * 5. Platform rating >= minRating (3.0)
 * 6. No active booking conflict (activeBookingId === null)
 * 7. Distance <= maxDistanceKm (10 km)
 * 
 * STRICT CONSTRAINT:
 * Hindsight memory NEVER influences, ranks, or modifies worker eligibility.
 */
export function checkWorkforceEligibility(workers, service, site, minRating = 3.0, maxDistanceKm = 10) {
  const eligible = workers
    .filter((w) => w.service === service && w.verified && !w.suspended && w.online && w.rating >= minRating && !w.activeBookingId)
    .map((w) => {
      const distanceKm = Math.round(haversine(site.lat, site.lng, w.lat, w.lng) * 100) / 100;
      return { ...w, distanceKm };
    })
    .filter((w) => w.distanceKm <= maxDistanceKm)
    .sort((a, b) => a.distanceKm - b.distanceKm);

  return eligible;
}
