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
        max_tokens: 1500,
        system: "You are a YouTube niche intelligence engine. Return ONLY valid compact JSON. No markdown. No explanation. Be specific, realistic, and data-driven for the given niche.",
        messages: [{
          role: "user",
          content: `Analyze YouTube niche: "${niche}". Return this JSON exactly:
{"niche":"cleaned name","channelsScanned":12,"videosAnalyzed":287,"avgChannelViews":42000,"nicheHealth":{"score":72,"label":"Growing","trend":"rising","insight":"one specific insight about this niche"},"topChannels":[{"name":"channel name","subscribers":"234K","avgViews":38000,"dominance":68},{"name":"channel name","subscribers":"89K","avgViews":22000,"dominance":44},{"name":"channel name","subscribers":"41K","avgViews":18000,"dominance":31}],"trendingTopics":["topic1","topic2","topic3","topic4","topic5"],"outliers":[{"rank":1,"title":"specific video title","channel":"channel name","views":310000,"multiplier":"5.1x","daysAgo":8,"length":"16:42","whyItWorked":"specific reason why this video blew up","titleType":"How-to"},{"rank":2,"title":"specific video title","channel":"channel name","views":198000,"multiplier":"3.8x","daysAgo":14,"length":"11:20","whyItWorked":"specific reason","titleType":"Story"},{"rank":3,"title":"specific video title","channel":"channel name","views":156000,"multiplier":"3.2x","daysAgo":19,"length":"22:15","whyItWorked":"specific reason","titleType":"List"},{"rank":4,"title":"specific video title","channel":"channel name","views":134000,"multiplier":"2.9x","daysAgo":23,"length":"14:08","whyItWorked":"specific reason","titleType":"Controversy"},{"rank":5,"title":"specific video title","channel":"channel name","views":112000,"multiplier":"2.6x","daysAgo":27,"length":"9:44","whyItWorked":"specific reason","titleType":"Tutorial"}],"patterns":{"titleFormula":{"formula":"specific formula description for this niche","parts":[{"text":"[Number]","type":"number"},{"text":"Strong Verb","type":"verb"},{"text":"Specific Topic","type":"topic"},{"text":"Timeframe","type":"timeframe"}]},"bestLength":{"value":"14-18 min","confidence":82},"bestDay":{"value":"Wednesday","confidence":74},"bestTime":{"value":"2-5pm EST","confidence":69},"thumbnailPattern":{"value":"specific thumbnail pattern for this niche","confidence":77},"topTitleTypes":[{"type":"How-to","percentage":38},{"type":"Story","percentage":27},{"type":"List","percentage":19},{"type":"Controversy","percentage":16}]},"nextVideo":{"title":"Compelling specific title for this niche","viralScore":84,"angle":"one specific sentence about the angle","length":"15-17 min","publishDay":"Wednesday","publishTime":"3pm EST","hooks":["Hook option 1 opener sentence","Hook option 2 opener sentence","Hook option 3 opener sentence"],"reasons":["specific data-backed reason 1","specific data-backed reason 2","specific data-backed reason 3"]}}
Make ALL data specific and realistic to the niche "${niche}". Use plausible channel names, view counts, and patterns for this specific niche.`
        }]
      })
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || "";
    const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
    res.status(200).json(parsed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Analysis failed" });
  }
}
