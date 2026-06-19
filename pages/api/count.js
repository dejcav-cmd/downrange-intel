const BASE = 212;
const COUNTER_KEY = 'intel-signup-count';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store'); // never cache this
  const { UPSTASH_REDIS_REST_URL: url, UPSTASH_REDIS_REST_TOKEN: token } = process.env;
  if (!url || !token) return res.json({ count: BASE });
  try {
    const r = await fetch(`${url}/get/${COUNTER_KEY}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await r.json();
    const stored = data.result ? parseInt(data.result) : 0;
    res.json({ count: BASE + stored });
  } catch (err) {
    console.error('[COUNT] Redis error:', err.message);
    res.json({ count: BASE });
  }
}
