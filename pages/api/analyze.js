export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { niche } = req.body;
  if (!niche) return res.status(400).json({ error: "niche required" });
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2400,
        system: "You are a YouTube niche intelligence engine for outdoor, firearms, and hunting creators. Return ONLY valid compact JSON with no markdown.",
        messages: [{ role: "user", content: `Analyze YouTube niche: "${niche}". Return this exact JSON:
{"niche":"cleaned name","channelsScanned":12,"videosAnalyzed":287,"avgChannelViews":38000,"nicheHealth":{"score":74,"label":"Growing","trend":"rising","insight":"specific one-sentence insight","weeklyGrowth":"+8%"},"outliers":[{"rank":1,"title":"specific title","channel":"channel name","views":298000,"multiplier":"5.2x","daysAgo":7,"length":"16:42","whyItWorked":"specific reason","titleType":"How-to","thumbnailStyle":"describe in 6 words"},{"rank":2,"title":"specific title","channel":"channel name","views":187000,"multiplier":"3.9x","daysAgo":13,"length":"11:28","whyItWorked":"specific reason","titleType":"Story","thumbnailStyle":"6 word description"},{"rank":3,"title":"specific title","channel":"channel name","views":152000,"multiplier":"3.2x","daysAgo":18,"length":"22:05","whyItWorked":"specific reason","titleType":"List","thumbnailStyle":"6 word description"}],"patterns":{"titleFormula":{"formula":"specific formula description","parts":[{"text":"[Number]","type":"number"},{"text":"Action Verb","type":"verb"},{"text":"Specific Topic","type":"topic"},{"text":"+ Result","type":"hook"}]},"bestLength":{"value":"14-18 min","confidence":83},"bestDay":{"value":"Wednesday","confidence":76},"bestTime":{"value":"2-5pm EST","confidence":71},"thumbnailPattern":{"value":"specific thumbnail pattern","confidence":79}},"nextVideo":{"title":"specific video title","viralScore":86,"angle":"one sentence angle","length":"15-17 min","publishDay":"Wednesday","publishTime":"3pm EST","thumbnailConcept":{"leftSide":"what goes left","rightSide":"what goes right","textOverlay":"main text","emoji":"🎯"},"scriptHook":"Write the exact first 30 seconds as ready-to-read camera script. 2-3 compelling sentences.","hooks":["Hook 1","Hook 2","Hook 3"],"reasons":["reason 1","reason 2","reason 3"]},"contentCalendar":[{"week":"Week 1","title":"specific title","angle":"specific one-line angle","day":"Wednesday"},{"week":"Week 2","title":"specific title","angle":"specific angle","day":"Wednesday"},{"week":"Week 3","title":"specific title","angle":"specific angle","day":"Thursday"},{"week":"Week 4","title":"specific title","angle":"specific angle","day":"Wednesday"}],"competitorPulse":[{"channel":"realistic channel name","lastVideo":"realistic video title","views":45000,"note":"one specific observation"},{"channel":"realistic channel name","lastVideo":"realistic video title","views":32000,"note":"one specific observation"},{"channel":"realistic channel name","lastVideo":"realistic video title","views":28000,"note":"one specific observation"}],"shortsIdeas":["Specific 30-60 sec Shorts idea 1","Specific Shorts idea 2","Specific Shorts idea 3"],"trendingQuestions":["Specific question audience is asking in comments 1","Specific trending question 2","Specific trending question 3"],"seasonalAlert":{"active":true,"title":"specific seasonal opportunity title","content":"specific seasonal insight for this niche","urgency":"High"}}
Make everything hyper-specific to "${niche}". Use realistic channel names and titles for this exact niche.` }]
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
