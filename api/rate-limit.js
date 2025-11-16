const kv = new Map();
export default function (req) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const window = kv.get(ip) || [];
  const recent = window.filter(t => now - t < 60000);
  if (recent.length > 10) return new Response('Rate limited', { status: 429 });
  kv.set(ip, [...recent, now]);
  return fetch(req);
}
