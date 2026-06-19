const BASE = 212;
export default async function handler(req, res) {
  const { UPSTASH_REDIS_REST_URL: url, UPSTASH_REDIS_REST_TOKEN: token } = process.env;
  if (!url || !token) return res.json({ count: BASE });
  try {
    const r = await fetch(`${url}/get/intel:signup_count`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await r.json();
    const stored = data.result ? parseInt(data.result) : 0;
    res.json({ count: Math.max(BASE, BASE + stored) });
  } catch {
    res.json({ count: BASE });
  }
}
