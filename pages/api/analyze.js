export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { niche } = req.body;
  if (!niche) return res.status(400).json({ error: "niche required" });
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1600,
        system: "You are a YouTube niche intelligence engine for outdoor, firearms, and hunting creators. Return ONLY valid compact JSON. No markdown. No explanation. Be hyper-specific and realistic.",
        messages: [{
          role: "user",
          content: `Analyze YouTube niche: "${niche}". Return EXACTLY this JSON:
{"niche":"cleaned niche name","channelsScanned":12,"videosAnalyzed":287,"avgChannelViews":38000,"nicheHealth":{"score":74,"label":"Growing","trend":"rising","insight":"one very specific insight about this niche right now"},"topChannels":[{"name":"realistic channel name","subscribers":"187K","avgViews":34000,"dominance":71},{"name":"realistic channel name","subscribers":"62K","avgViews":18000,"dominance":48},{"name":"realistic channel name","subscribers":"29K","avgViews":11000,"dominance":33}],"trendingTopics":["specific topic 1","specific topic 2","specific topic 3","specific topic 4","specific topic 5"],"outliers":[{"rank":1,"title":"specific compelling video title","channel":"channel name","views":298000,"multiplier":"5.2x","daysAgo":7,"length":"16:42","whyItWorked":"specific one-sentence reason this blew up","titleType":"How-to"},{"rank":2,"title":"specific compelling video title","channel":"channel name","views":187000,"multiplier":"3.9x","daysAgo":13,"length":"11:28","whyItWorked":"specific reason","titleType":"Story"},{"rank":3,"title":"specific compelling video title","channel":"channel name","views":152000,"multiplier":"3.2x","daysAgo":18,"length":"22:05","whyItWorked":"specific reason","titleType":"List"},{"rank":4,"title":"specific compelling video title","channel":"channel name","views":128000,"multiplier":"2.8x","daysAgo":24,"length":"14:11","whyItWorked":"specific reason","titleType":"Controversy"},{"rank":5,"title":"specific compelling video title","channel":"channel name","views":108000,"multiplier":"2.5x","daysAgo":28,"length":"9:52","whyItWorked":"specific reason","titleType":"Tutorial"}],"patterns":{"titleFormula":{"formula":"specific winning formula description","parts":[{"text":"[Number]","type":"number"},{"text":"Action Verb","type":"verb"},{"text":"Specific Topic","type":"topic"},{"text":"+ Result/Twist","type":"hook"}]},"bestLength":{"value":"14-18 min","confidence":83},"bestDay":{"value":"Wednesday","confidence":76},"bestTime":{"value":"2–5pm EST","confidence":71},"thumbnailPattern":{"value":"specific thumbnail description for this niche","confidence":79}},"nextVideo":{"title":"specific compelling video title for this exact niche","viralScore":86,"angle":"one specific sentence about the angle","length":"15-17 min","publishDay":"Wednesday","publishTime":"3pm EST","hooks":["Opening hook sentence option 1 that grabs attention immediately","Opening hook sentence option 2 with different angle","Opening hook sentence option 3 with curiosity gap"],"reasons":["specific data reason 1 tied to outlier patterns","specific data reason 2 about audience behavior","specific data reason 3 about timing or format"]}}
Make everything hyper-specific to "${niche}". Real-sounding channel names, titles, and patterns for this exact niche.`
        }]
      })
    });
    const data = await response.json();
    const raw = data.content?.[0]?.text || "";
    const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
    res.status(200).json(parsed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Analysis failed" });
  }
}
