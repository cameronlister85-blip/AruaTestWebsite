/**
 * Arua — form submission Worker
 * Proxies form data to Airtable, keeping the API token server-side.
 *
 * Required secrets (set via: wrangler secret put <NAME>):
 *   AIRTABLE_TOKEN      — personal access token from airtable.com/create/tokens
 *   AIRTABLE_BASE_ID    — e.g. appXXXXXXXXXXXXXX (from the Airtable URL)
 *
 * Table name is hardcoded below — change if you rename it in Airtable.
 */

const TABLE_NAME = 'Lead Submissions';

// Origins allowed to submit. Requests from anywhere else are rejected,
// which stops third-party sites spamming the Airtable base through this worker.
const ALLOWED_ORIGINS = new Set([
  'https://www.arua.co.nz',
  'https://arua.co.nz',
  'http://localhost:3000',
]);

const MAX_FIELD = 200;   // per-field length cap
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;

function corsFor(origin) {
  return {
    'Access-Control-Allow-Origin':  origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

const clip = (v) => (typeof v === 'string' ? v.trim().slice(0, MAX_FIELD) : '');

export default {
  async fetch(request, env) {

    const origin = request.headers.get('Origin') || '';
    if (!ALLOWED_ORIGINS.has(origin)) {
      return new Response('Forbidden', { status: 403 });
    }
    const CORS = corsFor(origin);

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: CORS });
    }

    // Parse body
    let data;
    try {
      data = await request.json();
    } catch {
      return new Response('Invalid JSON', { status: 400, headers: CORS });
    }

    const first  = clip(data.first);
    const last   = clip(data.last);
    const dob    = clip(data.dob);
    const email  = clip(data.email);
    const mobile = clip(data.mobile);
    const flags  = typeof data.flags === 'string' ? data.flags.trim().slice(0, 2000) : '';

    // Basic server-side guard
    if (!first || !last || !email || !mobile) {
      return new Response('Missing required fields', { status: 422, headers: CORS });
    }
    if (!EMAIL_RE.test(email)) {
      return new Response('Invalid email', { status: 422, headers: CORS });
    }

    // POST to Airtable
    const url = `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(TABLE_NAME)}`;

    const airtableRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.AIRTABLE_TOKEN}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        fields: {
          'First name':    first,
          'Last name':     last,
          'Date of birth': dob   || null,
          'Email':         email,
          'Mobile':        mobile,
          'Outcome':        data.outcome === 'S2' ? 'Needs review' : 'Clear',
          'Flags':          flags,
          'Submitted from': 'ED screening',
        }
      }),
    });

    if (!airtableRes.ok) {
      const err = await airtableRes.text();
      console.error('Airtable error:', err);
      return new Response('Submission failed', { status: 502, headers: CORS });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }
};
