/**
 * DayStart India — End-to-End API Integration & Hackathon Workflow Test
 */

import assert from 'node:assert/strict';

const BASE_URL = process.env.TEST_URL || 'http://127.0.0.1:4173';

async function req(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${data.error || JSON.stringify(data)}`);
  }
  return data;
}

console.log('====================================================');
console.log(' DAYSTART INDIA — END-TO-END WORKFLOW TEST');
console.log(` Target: ${BASE_URL}`);
console.log('====================================================\n');

async function run() {
  // Step 1: Health & State check
  console.log('Step 1: Check platform state...');
  const state = await req('/api/state');
  assert(state.services.construction && state.services.agriculture, 'Missing launch services');
  assert(state.sites.length >= 4, 'Missing launch sites');
  assert(state.workers.length >= 10, 'Missing worker pool');
  console.log(`  ✓ Platform online: ${state.workers.length} workers, ${state.sites.length} sites. Memory Mode: ${state.memoryStatus.mode}`);

  // Step 2: Reset to Clean Baseline (Before Memory)
  console.log('\nStep 2: Reset demo session to Clean Baseline...');
  const resetRes = await req('/api/demo/reset', { method: 'POST', body: '{}' });
  assert(resetRes.ok, 'Reset failed');
  console.log('  ✓ Demo reset: 0 active bookings, 0 local session memories');

  // Step 3: Test FIRST BOOKING (Before Memory)
  console.log('\nStep 3: AI Agent Planning for First Booking (Before Memory)...');
  const planBefore = await req('/api/agent/plan', {
    method: 'POST',
    body: JSON.stringify({
      service: 'construction',
      siteId: 'KOM-17',
      subService: 'Tile work',
      workerCount: 3,
      customerName: 'Kompally Buildworks',
    }),
  });
  assert.equal(planBefore.plan.status, 'baseline_generic', 'Expected baseline generic status');
  assert.equal(planBefore.plan.memoryCount, 0, 'Expected 0 memories');
  console.log(`  ✓ Agent generated: "${planBefore.plan.headline}"`);
  console.log(`  ✓ Recommendations count: ${planBefore.plan.recommendations.length} (Standard Generic Protocol)`);

  // Step 4: Dispatch First Booking & Assign Workers
  console.log('\nStep 4: Create and Dispatch First Booking...');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  const scheduledDate = tomorrow.toISOString().slice(0, 10);

  const bookingRes1 = await req('/api/bookings', {
    method: 'POST',
    body: JSON.stringify({
      service: 'construction',
      siteId: 'KOM-17',
      customerName: 'Kompally Buildworks',
      subService: 'Tile work',
      workerCount: 3,
      scheduledDate,
      agentPlan: planBefore.plan,
      coordinatorApproval: { action: 'accepted' },
      siteNote: 'First booking at Kompally',
    }),
  });
  assert.equal(bookingRes1.booking.status, 'assigned');
  assert.equal(bookingRes1.booking.assignedWorkers.length, 3);
  console.log(`  ✓ Booking created (${bookingRes1.booking.id}) with 3 verified workers assigned deterministically`);

  // Step 5: Complete First Booking & Retain Operational Outcome
  console.log('\nStep 5: Complete Booking & Retain Outcome in Hindsight...');
  const completeRes1 = await req(`/api/bookings/${bookingRes1.booking.id}/complete`, {
    method: 'POST',
    body: JSON.stringify({
      outcomeNote: 'East entrance was locked by building security. Crew waited 40 mins until West gate opened. West gate confirmed accessible. Pre-staging mortar by 8:30 AM recommended.',
    }),
  });
  assert(completeRes1.retained, 'Memory was not retained');
  console.log(`  ✓ Completed & Retained in ${completeRes1.mode}: "${completeRes1.message}"`);

  // Step 6: Test REPEAT BOOKING (After Memory Accumulated)
  console.log('\nStep 6: AI Agent Planning for Repeat Booking (After Memory)...');
  const planAfter = await req('/api/agent/plan', {
    method: 'POST',
    body: JSON.stringify({
      service: 'construction',
      siteId: 'KOM-17',
      subService: 'Tile work',
      workerCount: 3,
      customerName: 'Kompally Buildworks',
    }),
  });

  assert.equal(planAfter.plan.status, 'memory_informed', 'Expected memory_informed status');
  assert(planAfter.plan.memoryCount >= 1, 'Expected at least 1 memory recalled');
  assert(planAfter.plan.sources.length >= 1, 'Expected source citations');
  const hasWestGate = planAfter.plan.recommendations.some(r => r.action.includes('West Gate') || r.action.includes('West gate'));
  assert(hasWestGate, 'Expected West Gate directive derived from prior job');
  console.log(`  ✓ Agent generated: "${planAfter.plan.headline}"`);
  console.log(`  ✓ Source citation: ${planAfter.plan.sources[0]?.bookingId}`);
  console.log(`  ✓ Memory directive: ${planAfter.plan.recommendations[0]?.action}`);
  console.log('  ✓ BEHAVIORAL DIFFERENCE CONFIRMED: Agent adapted operational directives using retained Hindsight memory!');

  // Step 7: Load 8 Synthetic Prior-Job Records
  console.log('\nStep 7: Seed 8 Synthetic Multi-Site Historical Records...');
  const seedRes = await req('/api/demo/seed-memory', { method: 'POST', body: '{}' });
  assert(seedRes.ok);
  assert(seedRes.count >= 8, `Expected at least 8 records, got ${seedRes.count}`);
  console.log(`  ✓ Loaded ${seedRes.count} synthetic records across Kompally, Shamshabad, Medchal, and Chevella`);

  // Step 8: Test Multi-Job Synthesis & Coordinator Override
  console.log('\nStep 8: Multi-Job Synthesis & Coordinator Review Override...');
  const planMulti = await req('/api/agent/plan', {
    method: 'POST',
    body: JSON.stringify({
      service: 'construction',
      siteId: 'KOM-17',
      subService: 'Tile work',
      workerCount: 3,
      customerName: 'Kompally Buildworks',
    }),
  });
  assert(planMulti.plan.memoryCount >= 3, `Expected 3+ memories at Kompally, got ${planMulti.plan.memoryCount}`);
  console.log(`  ✓ Recalled ${planMulti.plan.memoryCount} historical records. Multi-job reflection available.`);

  // Create booking with custom coordinator override
  const bookingRes2 = await req('/api/bookings', {
    method: 'POST',
    body: JSON.stringify({
      service: 'construction',
      siteId: 'KOM-17',
      customerName: 'Kompally Buildworks',
      subService: 'Tile work',
      workerCount: 3,
      scheduledDate,
      agentPlan: planMulti.plan,
      coordinatorApproval: {
        action: 'edited',
        note: 'Coordinator Override: Confirm West gate supervisor is on-duty at 8:00 AM.',
      },
      siteNote: 'Urgent tiling project',
    }),
  });
  assert.equal(bookingRes2.booking.coordinatorApproval.action, 'edited');
  assert(bookingRes2.booking.dispatchInstruction.includes('Coordinator Override'), 'Expected coordinator override in dispatch instruction');
  console.log('  ✓ Coordinator approval recorded: "edited" with custom operational override attached');

  console.log('\n====================================================');
  console.log(' ALL END-TO-END INTEGRATION TESTS PASSED!');
  console.log('====================================================\n');
}

run().catch((err) => {
  console.error('\n❌ E2E TEST FAILED:', err);
  process.exit(1);
});
