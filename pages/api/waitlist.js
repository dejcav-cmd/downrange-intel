export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, niche } = req.body;
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Invalid email' });

  const entry = { email, niche: niche || 'not specified', at: new Date().toISOString() };
  console.log('[WAITLIST] New signup:', entry);

  // 1. Increment Redis counter
  const { UPSTASH_REDIS_REST_URL: redisUrl, UPSTASH_REDIS_REST_TOKEN: redisToken } = process.env;
  if (redisUrl && redisToken) {
    try {
      const r = await fetch(`${redisUrl}/incr/intel:signup_count`, {
        headers: { Authorization: `Bearer ${redisToken}` }
      });
      const d = await r.json();
      console.log('[WAITLIST] Counter incremented to:', d.result);
    } catch (err) {
      console.error('[WAITLIST] Redis error:', err.message);
    }
  } else {
    console.warn('[WAITLIST] No Redis env vars — counter not persisted');
  }

  // 2. Send Resend notification
  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) {
    console.warn('[WAITLIST] RESEND_API_KEY not set — email not sent. Add it to Vercel env vars for downrange-intel project.');
  } else {
    try {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_KEY}` },
        body: JSON.stringify({
          from: 'DownRange Intel <noreply@downrangeco.com>',
          to: ['dj@downrangeco.com'],
          reply_to: email,
          subject: `🎯 New Early Access Signup — ${email}`,
          html: `
            <div style="font-family:monospace;background:#07090B;color:#EDE8DF;padding:32px;border-radius:10px;max-width:520px">
              <div style="color:#C8922A;font-weight:900;font-size:18px;margin-bottom:20px">📬 DownRange Intel — New Signup</div>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="color:#52555C;padding:8px 0;font-size:13px;width:80px">Email</td><td style="color:#EDE8DF;font-size:13px;font-weight:700">${email}</td></tr>
                <tr><td style="color:#52555C;padding:8px 0;font-size:13px">Niche</td><td style="color:#C8922A;font-size:13px">${niche || 'Not specified'}</td></tr>
                <tr><td style="color:#52555C;padding:8px 0;font-size:13px">Time</td><td style="color:#EDE8DF;font-size:13px">${new Date().toLocaleString('en-US',{timeZone:'America/Los_Angeles',dateStyle:'full',timeStyle:'short'})}</td></tr>
              </table>
              <div style="margin-top:24px;padding:16px;background:#0C0E11;border-radius:8px;border:1px solid #1C1F24">
                <div style="font-size:11px;color:#52555C;margin-bottom:8px">Reply to this email to respond directly to ${email}</div>
              </div>
              <div style="margin-top:20px;font-size:11px;color:#52555C">intel.downrangeco.com · DownRange Co.</div>
            </div>`,
        }),
      });
      const emailData = await emailRes.json();
      if (emailData.error) {
        console.error('[WAITLIST] Resend error:', JSON.stringify(emailData.error));
      } else {
        console.log('[WAITLIST] Email sent, id:', emailData.id);
      }
    } catch (err) {
      console.error('[WAITLIST] Resend exception:', err.message);
    }
  }

  res.status(200).json({ ok: true });
}
