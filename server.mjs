import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const PORT = Number(process.env.PORT || 4173);
const HINDSIGHT_URL = process.env.HINDSIGHT_BASE_URL || 'http://localhost:8888';
const BANK_ID = process.env.HINDSIGHT_BANK_ID || 'daystart-hyderabad-demo';
const MIN_RATING = 3.0;
const MAX_DISTANCE_KM = 10;
const ADVANCE_RATE = 0.30;

const services = {
  agriculture: { id: 'agriculture', name: 'Agriculture', rate: 699, subservices: ['Field plowing', 'Seed planting', 'Harvesting', 'Irrigation work', 'Weeding', 'Fertilizer spraying', 'Land leveling', 'Crop cutting'] },
  construction: { id: 'construction', name: 'Construction', rate: 849, subservices: ['Masonry / bricklaying', 'Tile work', 'Plastering', 'Painting', 'Demolition', 'Daily labour', 'Flooring', 'Roofing'] },
};

const sites = [
  { id: 'KOM-17', label: 'Kompally site', service: 'construction', area: 'Kompally', lat: 17.538, lng: 78.486 },
  { id: 'SHM-04', label: 'Shamshabad farm', service: 'agriculture', area: 'Shamshabad', lat: 17.257, lng: 78.396 },
  { id: 'MED-09', label: 'Medchal site', service: 'construction', area: 'Medchal', lat: 17.629, lng: 78.481 },
  { id: 'CHE-12', label: 'Chevella farm', service: 'agriculture', area: 'Chevella', lat: 17.311, lng: 78.139 },
];

const workers = [
  { id: 'C-101', name: 'Anil K.', service: 'construction', skill: 'Tile work', tier: 'Senior', rating: 4.8, verified: true, suspended: false, online: true, lat: 17.550, lng: 78.472 },
  { id: 'C-102', name: 'Basha M.', service: 'construction', skill: 'Masonry', tier: 'Mid', rating: 4.6, verified: true, suspended: false, online: true, lat: 17.558, lng: 78.499 },
  { id: 'C-103', name: 'Ravi P.', service: 'construction', skill: 'Tile work', tier: 'Senior', rating: 4.9, verified: true, suspended: false, online: true, lat: 17.520, lng: 78.510 },
  { id: 'C-104', name: 'Suresh R.', service: 'construction', skill: 'Daily labour', tier: 'Mid', rating: 4.2, verified: true, suspended: false, online: true, lat: 17.583, lng: 78.450 },
  { id: 'C-105', name: 'Naveen T.', service: 'construction', skill: 'Plastering', tier: 'Junior', rating: 4.4, verified: true, suspended: false, online: false, lat: 17.535, lng: 78.470 },
  { id: 'C-106', name: 'Mohan V.', service: 'construction', skill: 'Masonry', tier: 'Mid', rating: 2.8, verified: true, suspended: false, online: true, lat: 17.540, lng: 78.480 },
  { id: 'A-201', name: 'Raju N.', service: 'agriculture', skill: 'Harvesting', tier: 'Senior', rating: 4.8, verified: true, suspended: false, online: true, lat: 17.270, lng: 78.390 },
  { id: 'A-202', name: 'Laxmi P.', service: 'agriculture', skill: 'Harvesting', tier: 'Mid', rating: 4.6, verified: true, suspended: false, online: true, lat: 17.245, lng: 78.410 },
  { id: 'A-203', name: 'Kiran S.', service: 'agriculture', skill: 'Irrigation work', tier: 'Mid', rating: 4.4, verified: true, suspended: false, online: true, lat: 17.259, lng: 78.430 },
  { id: 'A-204', name: 'Meena R.', service: 'agriculture', skill: 'Field plowing', tier: 'Senior', rating: 4.9, verified: true, suspended: false, online: true, lat: 17.235, lng: 78.378 },
  { id: 'A-205', name: 'Prasad G.', service: 'agriculture', skill: 'Harvesting', tier: 'Mid', rating: 4.1, verified: true, suspended: false, online: false, lat: 17.280, lng: 78.399 },
  { id: 'A-206', name: 'Venu B.', service: 'agriculture', skill: 'Weeding', tier: 'Junior', rating: 2.9, verified: true, suspended: false, online: true, lat: 17.260, lng: 78.385 },
];

let bookings = [];
let memories = [];
let hindsight = null;
let hindsightStatus = { connected: false, mode: 'Demo memory', message: 'Local demo memory is active. Configure Hindsight to use persistent agent memory.' };

function dateInDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function nextId(prefix) { return `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`; }
function roundMoney(n) { return Math.round(n * 100) / 100; }
function haversine(lat1, lng1, lat2, lng2) {
  const rad = (x) => x * Math.PI / 180;
  const dLat = rad(lat2 - lat1), dLng = rad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function eligibleWorkers(service, site) {
  return workers.filter(w => w.service === service && w.verified && !w.suspended && w.online && w.rating >= MIN_RATING && !w.activeBookingId)
    .map(w => ({ ...w, distanceKm: roundMoney(haversine(site.lat, site.lng, w.lat, w.lng)) }))
    .filter(w => w.distanceKm <= MAX_DISTANCE_KM)
    .sort((a, b) => a.distanceKm - b.distanceKm);
}
function publicWorker(w) {
  return { id: w.id, name: w.name, service: w.service, skill: w.skill, tier: w.tier, rating: w.rating, distanceKm: w.distanceKm, verified: w.verified, online: w.online };
}
function cleanNote(input) {
  return String(input || '').trim().slice(0, 500)
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[email removed]')
    .replace(/\b\d{10,12}\b/g, '[number removed]');
}
function memoryText(m) { return [m.content, m.context, m.siteId, m.service].filter(Boolean).join(' ').toLowerCase(); }
function localRecall(service, siteId, query) {
  const terms = String(query || '').toLowerCase().split(/[^a-z0-9]+/).filter(x => x.length > 2);
  return memories.filter(m => m.service === service && (!siteId || m.siteId === siteId))
    .map(m => ({ item: m, score: terms.reduce((n, t) => n + (memoryText(m).includes(t) ? 1 : 0), 0) }))
    .sort((a, b) => b.score - a.score || new Date(b.item.createdAt) - new Date(a.item.createdAt))
    .filter(x => x.score > 0 || !terms.length)
    .slice(0, 5)
    .map(({ item }) => ({ text: item.content, type: 'experience', metadata: { source_booking_id: item.bookingId || 'demo-history', site_id: item.siteId, service: item.service }, source: item.source || 'Local demo history', createdAt: item.createdAt }));
}
async function retainMemory(item) {
  const record = { ...item, content: cleanNote(item.content), createdAt: item.createdAt || new Date().toISOString() };
  if (!record.content) return { retained: false, mode: hindsightStatus.mode };
  if (hindsight) {
    await hindsight.retain(BANK_ID, record.content, {
      context: `DayStart ${services[record.service]?.name || record.service} completed job outcome at site ${record.siteId}`,
      timestamp: new Date(record.createdAt),
      documentId: record.documentId || `daystart-${record.bookingId || record.siteId}-${Date.now()}`,
      metadata: { source_booking_id: record.bookingId || 'demo-history', site_id: record.siteId, service: record.service, record_type: 'site_outcome' },
      tags: [`service:${record.service}`, `site:${record.siteId}`],
      async: false,
    });
    return { retained: true, mode: 'Hindsight', record };
  }
  memories.unshift(record);
  return { retained: true, mode: 'Demo memory', record };
}
async function recallMemory(service, site, query, includeMemory = true) {
  if (!includeMemory) return { mode: hindsightStatus.mode, results: [], reflection: '', usedMemory: false };
  if (hindsight) {
    const bankQuery = `${services[service].name} planning at site ${site.id} (${site.label}), ${site.area}. ${query}. Recall only prior site conditions, task requirements, crew-size outcomes, and operational notes useful to planning this job. Do not recommend workers from memory.`;
    const options = { budget: 'low', maxTokens: 1200, tags: [`service:${service}`, `site:${site.id}`], tagsMatch: 'all_strict' };
    const [recallResult, reflectResult] = await Promise.all([
      hindsight.recall(BANK_ID, bankQuery, options),
      hindsight.reflect(BANK_ID, bankQuery, { budget: 'low', context: 'Preparing a scheduled DayStart booking. Use only relevant operational history; distinguish remembered facts from suggestions.', includeFacts: true, tags: [`service:${service}`, `site:${site.id}`], tagsMatch: 'all_strict' }),
    ]);
    return { mode: 'Hindsight', results: (recallResult.results || []).map(r => ({ text: r.text, type: r.type, source: r.metadata?.source_booking_id || 'Hindsight memory', metadata: r.metadata || {} })), reflection: reflectResult.text || '', basedOn: reflectResult.basedOn?.memories || [], usedMemory: true };
  }
  const results = localRecall(service, site.id, query);
  const reflection = results.length
    ? `Past ${services[service].name.toLowerCase()} job history at ${site.label} suggests reviewing these site notes before confirming the crew. Memory can inform the coordinator, but assignment still follows current worker eligibility and distance.`
    : `No matching ${services[service].name.toLowerCase()} history for ${site.label} yet. Continue with the current booking details and record a useful outcome after completion.`;
  return { mode: 'Demo memory', results, reflection, usedMemory: results.length > 0 };
}
async function initializeHindsight() {
  try {
    const mod = await import('@vectorize-io/hindsight-client');
    const Client = mod.HindsightClient || mod.default?.HindsightClient;
    if (!Client) throw new Error('HindsightClient export not found');
    const client = new Client({ baseUrl: HINDSIGHT_URL });
    await client.getVersion();
    try {
      await client.createBank(BANK_ID, {
        name: 'DayStart Hyderabad Demo',
        mission: 'Help DayStart coordinators remember service-specific site conditions and completed job outcomes for Agriculture and Construction bookings. Cite relevant source history. Memory may inform job preparation, but worker eligibility, safety rules, distance, and assignment decisions must come from current platform data and human review. Never retain identity documents, phone numbers, or exact home addresses.',
        disposition: { skepticism: 4, literalism: 4, empathy: 3 },
      });
    } catch (err) {
      if (!String(err?.message || err).match(/already exists|409|conflict/i)) throw err;
    }
    hindsight = client;
    hindsightStatus = { connected: true, mode: 'Hindsight', message: `Connected to ${HINDSIGHT_URL}; memory bank ${BANK_ID} is ready.` };
    console.log(`[DayStart] Hindsight connected: ${HINDSIGHT_URL} · bank ${BANK_ID}`);
  } catch (err) {
    hindsight = null;
    hindsightStatus = { connected: false, mode: 'Demo memory', message: `Hindsight is not connected (${String(err?.message || err).slice(0, 160)}). Local demo memory is available.` };
    console.log(`[DayStart] ${hindsightStatus.message}`);
  }
}
function seedState() {
  bookings = [];
  memories = [];
  workers.forEach(w => { delete w.activeBookingId; });
}
function json(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(body), 'Cache-Control': 'no-store' });
  res.end(body);
}
async function readBody(req) {
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 100_000) throw new Error('Request body too large');
  }
  return raw ? JSON.parse(raw) : {};
}
function notFound(res) { json(res, 404, { error: 'Not found' }); }

async function handleApi(req, res, url) {
  if (req.method === 'GET' && url.pathname === '/api/state') {
    return json(res, 200, { services, sites, bookings, workers: workers.map(w => ({ id: w.id, name: w.name, service: w.service, skill: w.skill, tier: w.tier, rating: w.rating, verified: w.verified, suspended: w.suspended, online: w.online, hasActiveBooking: Boolean(w.activeBookingId) })), memories: memories.map(m => ({ content: m.content, service: m.service, siteId: m.siteId, source: m.source, createdAt: m.createdAt })), memoryStatus: hindsightStatus, settings: { minRating: MIN_RATING, maxDistanceKm: MAX_DISTANCE_KM, advancePercent: ADVANCE_RATE * 100 }, demoDate: dateInDays(0) });
  }
  if (req.method === 'POST' && url.pathname === '/api/demo/reset') {
    seedState();
    return json(res, 200, { ok: true, state: { bookings, memories, memoryStatus: hindsightStatus } });
  }
  if (req.method === 'POST' && url.pathname === '/api/demo/seed-memory') {
    const siteId = String((await readBody(req)).siteId || 'KOM-17');
    const site = sites.find(x => x.id === siteId);
    if (!site) return json(res, 400, { error: 'Choose an Agriculture or Construction site.' });
    const sample = site.service === 'construction'
      ? `At construction site ${site.id} in ${site.area}, the west gate was open before 9 AM; the east entrance was locked during the previous completed tile-work booking. A three-worker tile team completed the job after using the west gate. Ask the coordinator to confirm the current site access plan.`
      : `At agriculture site ${site.id} in ${site.area}, the farm requested harvest workers to arrive by 6 AM. The previous scheduled harvest was completed with a six-worker crew. Confirm crop and field conditions with the customer before reusing the old plan.`;
    try {
      const result = await retainMemory({ content: sample, siteId: site.id, service: site.service, source: 'Prior completed booking · synthetic demo record', bookingId: `seed-${site.id}`, documentId: `daystart-demo-${site.id}-completed-job` });
      if (result.record && !memories.some(m => m.documentId === result.record.documentId)) memories.unshift(result.record);
      return json(res, 200, { ok: true, mode: result.mode, message: result.mode === 'Hindsight' ? 'Synthetic prior-job record retained in Hindsight.' : 'Synthetic prior-job record loaded into local demo memory.', status: hindsightStatus });
    } catch (err) { return json(res, 502, { error: `Could not retain memory: ${String(err?.message || err).slice(0, 200)}`, mode: hindsightStatus.mode }); }
  }
  if (req.method === 'POST' && url.pathname === '/api/memory/recall') {
    const body = await readBody(req);
    const service = String(body.service || '');
    const site = sites.find(x => x.id === body.siteId && x.service === service);
    if (!services[service] || !site) return json(res, 400, { error: 'Select an available Agriculture or Construction site.' });
    try {
      const result = await recallMemory(service, site, String(body.query || ''), body.includeMemory !== false);
      return json(res, 200, { ...result, status: hindsightStatus });
    } catch (err) {
      return json(res, 502, { error: `Hindsight memory request failed: ${String(err?.message || err).slice(0, 200)}`, status: hindsightStatus });
    }
  }
  if (req.method === 'GET' && url.pathname === '/api/workers') {
    const service = String(url.searchParams.get('service') || '');
    const site = sites.find(x => x.id === url.searchParams.get('siteId') && x.service === service);
    if (!services[service] || !site) return json(res, 400, { error: 'Select a valid service and site.' });
    const eligible = eligibleWorkers(service, site);
    return json(res, 200, { workers: eligible.map(publicWorker), eligibleCount: eligible.length, requiredRules: { verified: true, online: true, activeBooking: false, minimumRating: MIN_RATING, radiusKm: MAX_DISTANCE_KM } });
  }
  if (req.method === 'POST' && url.pathname === '/api/bookings') {
    const body = await readBody(req);
    const service = String(body.service || '');
    const site = sites.find(x => x.id === body.siteId && x.service === service);
    const workerCount = Number(body.workerCount);
    const customerName = String(body.customerName || '').trim().slice(0, 80);
    const subService = String(body.subService || '');
    const scheduledDate = String(body.scheduledDate || '');
    if (!services[service] || !site) return json(res, 400, { error: 'Choose Agriculture or Construction and its matching service area.' });
    if (!Number.isInteger(workerCount) || workerCount < 1 || workerCount > 20) return json(res, 400, { error: 'Worker count must be between 1 and 20.' });
    if (!customerName || !services[service].subservices.includes(subService)) return json(res, 400, { error: 'Add a booking name and choose a listed service task.' });
    if (!/^\d{4}-\d{2}-\d{2}$/.test(scheduledDate) || scheduledDate < dateInDays(1)) return json(res, 400, { error: 'Agriculture and Construction bookings must be scheduled at least one day ahead.' });
    const price = services[service].rate * workerCount;
    const eligible = eligibleWorkers(service, site);
    const canAssign = eligible.length >= workerCount;
    const assigned = canAssign ? eligible.slice(0, workerCount) : [];
    const id = nextId('DS');
    const booking = {
      id, customerName, service, serviceName: services[service].name, siteId: site.id, siteName: site.label, area: site.area,
      subService, workerCount, scheduledDate, totalPrice: price, advanceAmount: roundMoney(price * ADVANCE_RATE), balanceAmount: roundMoney(price * (1 - ADVANCE_RATE)),
      advancePaid: true, balancePaid: false, assignedWorkers: assigned.map(w => ({ id: w.id, name: w.name, rating: w.rating, distanceKm: w.distanceKm, skill: w.skill })),
      status: canAssign ? 'assigned' : 'needs_coordinator', createdAt: new Date().toISOString(), completedAt: null, outcomeNote: '',
      siteInstruction: cleanNote(body.siteNote), rememberedContext: String(body.memorySummary || '').slice(0, 1000), assignmentRule: 'Nearest eligible workers within 10 km',
    };
    for (const w of assigned) w.activeBookingId = id;
    bookings.unshift(booking);
    return json(res, 201, { booking, eligibleCount: eligible.length, shortage: Math.max(0, workerCount - eligible.length), workerPool: eligible.map(publicWorker), paymentMode: 'Simulated payment' });
  }
  const completeMatch = url.pathname.match(/^\/api\/bookings\/([^/]+)\/complete$/);
  if (req.method === 'POST' && completeMatch) {
    const body = await readBody(req);
    const booking = bookings.find(b => b.id === completeMatch[1]);
    if (!booking) return json(res, 404, { error: 'Booking not found.' });
    if (booking.status !== 'assigned') return json(res, 409, { error: 'Only fully assigned bookings can be marked completed in this prototype.' });
    const note = cleanNote(body.outcomeNote);
    if (!note) return json(res, 400, { error: 'Add one useful, non-sensitive job outcome before completing.' });
    booking.status = 'completed'; booking.completedAt = new Date().toISOString(); booking.outcomeNote = note; booking.balancePaid = true;
    for (const assigned of booking.assignedWorkers) {
      const worker = workers.find(w => w.id === assigned.id);
      if (worker?.activeBookingId === booking.id) delete worker.activeBookingId;
    }
    const content = `${booking.serviceName} completed at DayStart site ${booking.siteId} (${booking.siteName}). Task: ${booking.subService}. Crew size: ${booking.workerCount}. ${booking.siteInstruction ? `Coordinator site instruction: ${booking.siteInstruction}.` : ''} Coordinator-recorded outcome: ${note}. Treat this as one past job record; check that the site and task still match before reusing this information.`;
    try {
      const result = await retainMemory({ content, siteId: booking.siteId, service: booking.service, source: `Completed booking · ${booking.id}`, bookingId: booking.id, documentId: `daystart-booking-${booking.id}` });
      if (result.record) memories.unshift(result.record);
      return json(res, 200, { booking, retained: true, mode: result.mode, message: result.mode === 'Hindsight' ? 'Completion outcome retained in Hindsight.' : 'Completion outcome added to local demo memory.' });
    } catch (err) {
      return json(res, 200, { booking, retained: false, mode: hindsightStatus.mode, message: `Booking completed, but memory retain failed: ${String(err?.message || err).slice(0, 160)}` });
    }
  }
  notFound(res);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  try {
    if (url.pathname.startsWith('/api/')) return await handleApi(req, res, url);
    if (req.method !== 'GET' && req.method !== 'HEAD') return json(res, 405, { error: 'Method not allowed' });
    const requested = decodeURIComponent(url.pathname);
    const logoRequest = requested === '/assets/daystart-logo.png';
    if (!logoRequest && requested !== '/' && requested !== '/index.html') return json(res, 404, { error: 'File not found' });
    const path = logoRequest ? join(ROOT, 'assets', 'daystart-logo.png') : join(ROOT, 'index.html');
    const bytes = await readFile(path);
    const type = logoRequest ? 'image/png' : 'text/html; charset=utf-8';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    if (req.method === 'HEAD') return res.end();
    res.end(bytes);
  } catch (err) {
    if (err?.code === 'ENOENT') return json(res, 404, { error: 'File not found' });
    console.error('[DayStart] Request failed', err);
    if (!res.headersSent) json(res, 500, { error: 'Internal server error' });
  }
});

await initializeHindsight();
server.listen(PORT, '127.0.0.1', () => console.log(`[DayStart] Prototype ready at http://localhost:${PORT}`));

process.on('SIGINT', () => server.close(() => process.exit(0)));
process.on('SIGTERM', () => server.close(() => process.exit(0)));
