/**
 * Reservation capture for the membership plan pages.
 *
 * Delivery is configured with one environment variable:
 *
 *   RESERVATION_WEBHOOK_URL=https://hooks.zapier.com/...   (or Make, Formspree,
 *   a Slack incoming webhook, or your own CRM endpoint)
 *
 * The reservation is always written to the server log as a structured line, so
 * nothing is silently lost while that variable is unset — but set it before
 * going live, or the only copy of a booking is in the log.
 */

import { PLANS } from '../../../data/plans';

const VALID_PLANS = new Set(PLANS.map((p) => p.id));
const EMAIL = /^[^@\s]+@[^@\s.]+\.[^@\s]+$/;

/** Crude in-memory throttle: 5 reservations per IP per 10 minutes. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // don't grow without bound
  return recent.length > MAX_PER_WINDOW;
}

const clean = (v, max) => String(v ?? '').trim().slice(0, max);

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: 'Too many requests' }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  const plan = clean(body.plan, 40);
  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const quantity = Math.min(Math.max(parseInt(body.quantity, 10) || 1, 1), 10);

  if (!VALID_PLANS.has(plan)) {
    return Response.json({ ok: false, error: 'Unknown plan' }, { status: 400 });
  }
  if (!name || !EMAIL.test(email)) {
    return Response.json({ ok: false, error: 'Name and a valid email are required' }, { status: 400 });
  }

  const reservation = {
    receivedAt: new Date().toISOString(),
    plan,
    planName: PLANS.find((p) => p.id === plan).name,
    quantity,
    name,
    email,
    phone: phone || null,
  };

  let delivered = false;
  const webhook = process.env.RESERVATION_WEBHOOK_URL;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservation),
        signal: AbortSignal.timeout(8000),
      });
      delivered = res.ok;
      if (!res.ok) console.error('[reserve] webhook rejected the reservation', res.status);
    } catch (err) {
      console.error('[reserve] webhook failed:', err.message);
    }
  } else {
    console.warn('[reserve] RESERVATION_WEBHOOK_URL is not set — this reservation exists only in this log line.');
  }

  console.log('[reserve]', JSON.stringify(reservation));

  // The visitor gets a confirmation either way; delivery status is for the logs.
  return Response.json({ ok: true, delivered });
}
