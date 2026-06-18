import Head from 'next/head'
import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#09090B", surface: "#0F0F11", surface2: "#141416",
  border: "#1C1C20", borderHover: "#2C2C34",
  gold: "#E8A020", goldDim: "#E8A02022", goldBorder: "#E8A02035",
  text: "#F0EDE8", muted: "#606068", mutedMid: "#909098",
  green: "#34D399", greenDim: "#34D39918",
  blue: "#60A5FA", blueDim: "#60A5FA18",
  red: "#F87171",
};

const QUICK = [
  "hunting & firearms", "home woodworking", "personal finance",
  "van life", "guitar lessons", "survival prepping",
];

function useCountUp(target, active, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active || !target) return;
    let cur = 0; const step = target / (duration / 16);
    const t = setInterval(() => {
      cur = Math.min(cur + step, target);
      setVal(Math.floor(cur));
      if (cur >= target) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [target, active]);
  return val;
}

function useGauge(target, active) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    setTimeout(() => setV(target), 80);
  }, [target, active]);
  return v;
}

function fmt(n) {
  if (!n) return "0";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return Math.round(n / 1e3) + "K";
  return n;
}

function healthColor(score) {
  if (score >= 75) return C.green;
  if (score >= 50) return C.gold;
  return C.red;
}

function trendIcon(trend) {
  if (trend === "rising") return "↑";
  if (trend === "declining") return "↓";
  return "→";
}

function Gauge({ score, label, active }) {
  const v = useGauge(score, active);
  const r = 72, cx = 100, cy = 92;
  const circ = Math.PI * r;
  const prog = (v / 100) * circ;
  const col = healthColor(score);
  return (
    <svg viewBox="0 0 200 104" width="190" height="100" style={{ display: "block", margin: "0 auto" }}>
      <defs>
        <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={col} stopOpacity="0.6" />
          <stop offset="100%" stopColor={col} />
        </linearGradient>
      </defs>
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none" stroke={C.border} strokeWidth="10" strokeLinecap="round" />
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none" stroke="url(#gaugeGrad)" strokeWidth="10" strokeLinecap="round"
        strokeDasharray={`${prog} ${circ}`}
        style={{ transition: "stroke-dasharray 1.3s cubic-bezier(0.34,1.56,0.64,1)" }} />
      <text x={cx} y={cy - 10} textAnchor="middle" fill={col}
        style={{ fontSize: "30px", fontWeight: "800", fontFamily: "inherit", letterSpacing: "-1px" }}>
        {v}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill={C.mutedMid}
        style={{ fontSize: "11px", fontWeight: "600", fontFamily: "inherit", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        {label}
      </text>
    </svg>
  );
}

function ConfidenceBar({ value, color = C.gold, active }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!active) return;
    setTimeout(() => setW(value), 200);
  }, [value, active]);
  return (
    <div style={{ height: "4px", backgroundColor: C.border, borderRadius: "2px", overflow: "hidden", marginTop: "6px" }}>
      <div style={{ height: "100%", borderRadius: "2px", backgroundColor: color, width: `${w}%`, transition: "width 1s cubic-bezier(0.34,1.2,0.64,1)" }} />
    </div>
  );
}

function Tab({ label, active, onClick, count }) {
  return (
    <button onClick={onClick} style={{
      padding: "8px 16px", fontSize: "13px", fontWeight: active ? "700" : "500",
      color: active ? C.text : C.muted, backgroundColor: "transparent", border: "none",
      borderBottom: active ? `2px solid ${C.gold}` : "2px solid transparent",
      cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "6px",
      transition: "color 0.15s", whiteSpace: "nowrap",
    }}>
      {label}
      {count != null && (
        <span style={{ fontSize: "10px", fontWeight: "700", backgroundColor: active ? C.goldDim : C.border, color: active ? C.gold : C.muted, padding: "1px 6px", borderRadius: "10px" }}>{count}</span>
      )}
    </button>
  );
}

function OutlierCard({ v, i, active }) {
  const views = useCountUp(v.views, active, 1200 + i * 100);
  const mult = parseFloat(v.multiplier);
  const multColor = mult >= 5 ? C.green : mult >= 3 ? C.gold : C.blue;
  return (
    <div style={{
      backgroundColor: C.surface, border: `1px solid ${C.border}`, borderRadius: "10px",
      padding: "16px 20px", marginBottom: "8px",
      display: "grid", gridTemplateColumns: "28px 1fr auto", gap: "14px", alignItems: "center",
    }}>
      <div style={{ fontSize: "13px", fontWeight: "800", color: C.muted, fontFeatureSettings: "'tnum'", textAlign: "center" }}>0{i + 1}</div>
      <div>
        <div style={{ fontSize: "14px", fontWeight: "600", color: C.text, lineHeight: "1.4", marginBottom: "6px" }}>{v.title}</div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: "12px", color: C.mutedMid }}>{v.channel}</span>
          <span style={{ fontSize: "11px", color: C.muted }}>·</span>
          <span style={{ fontSize: "11px", color: C.muted }}>{v.length}</span>
          <span style={{ fontSize: "11px", color: C.muted }}>·</span>
          <span style={{ fontSize: "11px", color: C.muted }}>{v.daysAgo}d ago</span>
          {v.titleType && (
            <span style={{ fontSize: "10px", fontWeight: "600", color: C.blue, backgroundColor: C.blueDim, padding: "2px 7px", borderRadius: "4px" }}>{v.titleType}</span>
          )}
        </div>
        {v.whyItWorked && (
          <div style={{ fontSize: "12px", color: C.mutedMid, marginTop: "6px", fontStyle: "italic" }}>"{v.whyItWorked}"</div>
        )}
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: "12px", fontWeight: "800", color: multColor, backgroundColor: `${multColor}18`, border: `1px solid ${multColor}30`, padding: "3px 9px", borderRadius: "6px", marginBottom: "4px" }}>{v.multiplier}</div>
        <div style={{ fontSize: "15px", fontWeight: "800", color: C.text, fontFeatureSettings: "'tnum'" }}>{fmt(views)}</div>
        <div style={{ fontSize: "10px", color: C.muted }}>views</div>
      </div>
    </div>
  );
}

function TitleFormulaCard({ formula, parts }) {
  const typeColors = { number: "#F59E0B", verb: C.green, topic: C.blue, hook: "#A78BFA", timeframe: C.gold, modifier: C.mutedMid };
  return (
    <div style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "20px 22px" }}>
      <div style={{ fontSize: "11px", fontWeight: "600", color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px" }}>Winning Title Formula</div>
      <div style={{ fontSize: "13px", color: C.mutedMid, marginBottom: "12px", lineHeight: "1.5" }}>{formula}</div>
      {parts && parts.length > 0 && (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {parts.map((p, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "12px", fontWeight: "700", color: typeColors[p.type] || C.mutedMid, backgroundColor: `${typeColors[p.type] || C.mutedMid}18`, padding: "6px 12px", borderRadius: "6px", marginBottom: "4px" }}>{p.text}</div>
              <div style={{ fontSize: "10px", color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>{p.type}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ViralScoreRing({ score, active }) {
  const v = useGauge(score, active);
  const r = 52, circ = 2 * Math.PI * r;
  const offset = circ - (v / 100) * circ;
  const col = score >= 75 ? C.green : score >= 55 ? C.gold : C.blue;
  return (
    <div style={{ position: "relative", width: "130px", height: "130px", flexShrink: 0 }}>
      <svg viewBox="0 0 120 120" width="130" height="130">
        <circle cx="60" cy="60" r={r} fill="none" stroke={C.border} strokeWidth="8" />
        <circle cx="60" cy="60" r={r} fill="none" stroke={col} strokeWidth="8"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.34,1.2,0.64,1)" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "28px", fontWeight: "800", color: col, lineHeight: 1 }}>{v}</div>
        <div style={{ fontSize: "10px", color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "3px" }}>Viral Score</div>
      </div>
    </div>
  );
}

function Loader({ step }) {
  const steps = ["Scanning niche channels...", "Pulling last 90 days of data...", "Calculating channel averages...", "Detecting outlier videos...", "Analyzing title & thumbnail patterns...", "Generating your next video brief..."];
  return (
    <div style={{ textAlign: "center", padding: "70px 24px" }}>
      <div style={{ width: "44px", height: "44px", borderRadius: "50%", margin: "0 auto 24px", border: `3px solid ${C.border}`, borderTop: `3px solid ${C.gold}`, animation: "spin 0.75s linear infinite" }} />
      <div style={{ fontSize: "15px", fontWeight: "600", color: C.text, marginBottom: "20px" }}>Analyzing niche...</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "280px", margin: "0 auto" }}>
        {steps.map((s, i) => (
          <div key={i} style={{ fontSize: "12px", color: i < step ? C.mutedMid : i === step ? C.gold : C.border, display: "flex", alignItems: "center", gap: "8px", animation: i === step ? "pulse 1s ease infinite" : "none" }}>
            <span style={{ fontSize: "10px" }}>{i < step ? "✓" : i === step ? "→" : "○"}</span>{s}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadStep, setLoadStep] = useState(0);
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("overview");
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState(null);
  const [animActive, setAnimActive] = useState(false);

  async function analyze(nicheVal) {
    const q = (nicheVal || niche).trim();
    if (!q) return;
    setNiche(q); setLoading(true); setData(null); setError(null);
    setLoadStep(0); setAnimActive(false); setTab("overview");

    const iv = setInterval(() => setLoadStep(s => s < 5 ? s + 1 : 5), 850);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: q }),
      });
      clearInterval(iv); setLoadStep(5);
      if (!res.ok) throw new Error("API error");
      const parsed = await res.json();
      setTimeout(() => { setData(parsed); setLoading(false); setTimeout(() => setAnimActive(true), 100); }, 500);
    } catch {
      clearInterval(iv);
      setError("Analysis failed — try a different niche.");
      setLoading(false);
    }
  }

  const S = {
    app: { minHeight: "100vh", backgroundColor: C.bg, color: C.text, fontFamily: "'Inter','SF Pro Display',system-ui,sans-serif" },
    nav: { borderBottom: `1px solid ${C.border}`, padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, backgroundColor: C.bg, zIndex: 20 },
    logo: { fontSize: "16px", fontWeight: "800", letterSpacing: "-0.3px", display: "flex", alignItems: "center", gap: "7px" },
    dot: { width: "7px", height: "7px", borderRadius: "50%", backgroundColor: C.gold },
    badge: { fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: C.gold, border: `1px solid ${C.goldBorder}`, padding: "4px 10px", borderRadius: "4px", backgroundColor: C.goldDim },
    hero: { maxWidth: "700px", margin: "0 auto", padding: "72px 24px 40px", textAlign: "center" },
    h1: { fontSize: "clamp(32px,5.5vw,52px)", fontWeight: "900", letterSpacing: "-1.5px", lineHeight: 1.05, marginBottom: "18px" },
    sub: { fontSize: "16px", color: C.muted, lineHeight: 1.65, maxWidth: "480px", margin: "0 auto 32px" },
    inputRow: { display: "flex", gap: "8px", maxWidth: "560px", margin: "0 auto 16px", flexWrap: "wrap", justifyContent: "center" },
    input: { flex: 1, minWidth: "210px", padding: "13px 16px", fontSize: "14px", backgroundColor: C.surface, border: `1px solid ${C.border}`, borderRadius: "8px", color: C.text, outline: "none", fontFamily: "inherit" },
    btn: { padding: "13px 22px", fontSize: "13px", fontWeight: "700", backgroundColor: C.gold, color: "#000", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.02em", whiteSpace: "nowrap" },
    quickRow: { display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", maxWidth: "560px", margin: "0 auto" },
    results: { maxWidth: "880px", margin: "0 auto", padding: "0 20px 80px" },
    topBar: { backgroundColor: C.surface2, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "20px 24px", marginBottom: "2px", display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center" },
    tabBar: { display: "flex", gap: "0", borderBottom: `1px solid ${C.border}`, marginBottom: "24px", marginTop: "28px", overflowX: "auto" },
    grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "12px" },
    card: { backgroundColor: C.surface, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "20px" },
    sectionLabel: { fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, marginBottom: "14px", marginTop: "28px" },
    patternRow: { backgroundColor: C.surface, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "16px 20px", marginBottom: "8px" },
    nextCard: { backgroundColor: C.surface2, border: `1px solid ${C.goldBorder}`, borderRadius: "12px", padding: "28px 28px", marginBottom: "12px" },
    hookCard: { backgroundColor: C.surface, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "13px 16px", marginBottom: "8px", fontSize: "13px", color: C.mutedMid, fontStyle: "italic" },
    cta: { borderTop: `1px solid ${C.border}`, padding: "56px 24px 40px", textAlign: "center", maxWidth: "520px", margin: "20px auto 0" },
  };

  return (
    <>
      <Head>
        <title>NicheRadar — YouTube Outlier Intelligence</title>
        <meta name="description" content="See which videos are outperforming their channel average in your niche right now. Get your next video brief backed by real data." />
        <meta property="og:title" content="NicheRadar — YouTube Outlier Intelligence" />
        <meta property="og:description" content="Stop guessing what to make next. See what's actually winning in your niche." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23E8A020'/></svg>" />
      </Head>

      <div style={S.app}>
        <nav style={S.nav}>
          <div style={S.logo}><div style={S.dot} /> NicheRadar</div>
          <span style={S.badge}>Early Access</span>
        </nav>

        <div style={S.hero}>
          <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: C.gold, marginBottom: "18px" }}>YouTube Outlier Intelligence</div>
          <h1 style={S.h1}>Stop guessing.<br /><span style={{ color: C.gold }}>See what&apos;s winning</span> right now.</h1>
          <p style={S.sub}>NicheRadar scans 10+ channels in your niche, finds videos outperforming their average by 2–8×, and generates your next video brief — backed by real data.</p>

          <div style={S.inputRow}>
            <input style={S.input} value={niche} onChange={e => setNiche(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !loading && analyze()}
              placeholder="Enter a niche (e.g. 'survival prepping')" />
            <button style={{ ...S.btn, opacity: loading || !niche.trim() ? 0.5 : 1 }}
              onClick={() => analyze()} disabled={loading || !niche.trim()}>
              {loading ? "Analyzing…" : "Analyze →"}
            </button>
          </div>

          <div style={S.quickRow}>
            {QUICK.map(q => (
              <button key={q} style={{ fontSize: "12px", color: C.muted, backgroundColor: C.surface, border: `1px solid ${C.border}`, padding: "6px 12px", borderRadius: "20px", cursor: "pointer", fontFamily: "inherit" }}
                onMouseEnter={e => { e.target.style.borderColor = C.gold; e.target.style.color = C.gold; }}
                onMouseLeave={e => { e.target.style.borderColor = C.border; e.target.style.color = C.muted; }}
                onClick={() => analyze(q)}>{q}</button>
            ))}
          </div>
        </div>

        {loading && <Loader step={loadStep} />}
        {error && <div style={{ textAlign: "center", color: C.red, padding: "20px", fontSize: "14px" }}>{error}</div>}

        {data && (
          <div style={S.results} className="fu">
            <div style={S.topBar}>
              <div>
                <div style={{ fontSize: "18px", fontWeight: "800", letterSpacing: "-0.5px" }}>{data.niche}</div>
                <div style={{ fontSize: "12px", color: C.muted, marginTop: "2px" }}>{data.channelsScanned} channels · {data.videosAnalyzed} videos · last 90 days</div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: "24px", flexWrap: "wrap" }}>
                {[[fmt(data.avgChannelViews), "Avg video views"], [data.outliers?.length, "Outliers found"], [`${data.nicheHealth?.score}/100`, "Niche health"]].map(([v, l]) => (
                  <div key={l} style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "18px", fontWeight: "800", color: C.gold }}>{v}</div>
                    <div style={{ fontSize: "11px", color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={S.tabBar}>
              {[["overview", "Overview"], ["outliers", "Outliers", data.outliers?.length], ["patterns", "Patterns"], ["brief", "Your Brief"]].map(([id, label, count]) => (
                <Tab key={id} label={label} count={count} active={tab === id} onClick={() => setTab(id)} />
              ))}
            </div>

            {tab === "overview" && (
              <div className="fu">
                <div style={S.grid2}>
                  <div style={S.card}>
                    <div style={{ fontSize: "11px", fontWeight: "700", color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Niche Health</div>
                    <Gauge score={data.nicheHealth?.score} label={data.nicheHealth?.label} active={animActive} />
                    <div style={{ display: "flex", justifyContent: "center", gap: "6px", alignItems: "center", marginTop: "8px" }}>
                      <span style={{ fontSize: "13px", color: healthColor(data.nicheHealth?.score), fontWeight: "700" }}>{trendIcon(data.nicheHealth?.trend)} {data.nicheHealth?.trend}</span>
                    </div>
                    <div style={{ fontSize: "12px", color: C.muted, textAlign: "center", marginTop: "8px", lineHeight: 1.5 }}>{data.nicheHealth?.insight}</div>
                  </div>
                  <div style={S.card}>
                    <div style={{ fontSize: "11px", fontWeight: "700", color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px" }}>Top Channels</div>
                    {data.topChannels?.map((ch, i) => (
                      <div key={i} style={{ marginBottom: "14px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                          <span style={{ fontSize: "13px", fontWeight: "600", color: C.text }}>{ch.name}</span>
                          <span style={{ fontSize: "11px", color: C.muted }}>{ch.subscribers}</span>
                        </div>
                        <ConfidenceBar value={ch.dominance} color={i === 0 ? C.gold : C.blue} active={animActive} />
                        <div style={{ fontSize: "11px", color: C.muted, marginTop: "3px" }}>{fmt(ch.avgViews)} avg views · {ch.dominance}% dominance</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={S.sectionLabel}>Trending Topics in This Niche</div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {data.trendingTopics?.map((t, i) => (
                    <div key={i} style={{ fontSize: "13px", fontWeight: "600", color: i === 0 ? C.gold : C.mutedMid, backgroundColor: i === 0 ? C.goldDim : C.surface, border: `1px solid ${i === 0 ? C.goldBorder : C.border}`, padding: "8px 14px", borderRadius: "20px" }}>
                      {i === 0 && "🔥 "}{t}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "outliers" && (
              <div className="fu">
                <div style={{ fontSize: "13px", color: C.muted, marginBottom: "16px" }}>Videos outperforming their channel&apos;s 90-day average by 2× or more. These are what the algorithm is actively pushing right now.</div>
                {data.outliers?.map((v, i) => <OutlierCard key={i} v={v} i={i} active={animActive} />)}
              </div>
            )}

            {tab === "patterns" && (
              <div className="fu">
                {data.patterns?.titleFormula && (
                  <>
                    <div style={S.sectionLabel}>Title Formula</div>
                    <TitleFormulaCard formula={data.patterns.titleFormula.formula} parts={data.patterns.titleFormula.parts} />
                  </>
                )}
                <div style={S.sectionLabel}>Optimization Signals</div>
                {[["⏱ Ideal Length", data.patterns?.bestLength?.value, data.patterns?.bestLength?.confidence], ["📅 Best Day", data.patterns?.bestDay?.value, data.patterns?.bestDay?.confidence], ["🕑 Best Time", data.patterns?.bestTime?.value, data.patterns?.bestTime?.confidence], ["🖼 Thumbnail Pattern", data.patterns?.thumbnailPattern?.value, data.patterns?.thumbnailPattern?.confidence]].map(([label, value, conf]) => (
                  <div key={label} style={S.patternRow}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "13px", fontWeight: "600", color: C.text }}>{label}</span>
                      <span style={{ fontSize: "11px", color: C.muted }}>Confidence: {conf}%</span>
                    </div>
                    <div style={{ fontSize: "13px", color: C.mutedMid, marginBottom: "8px" }}>{value}</div>
                    <ConfidenceBar value={conf} active={animActive} />
                  </div>
                ))}
                {data.patterns?.topTitleTypes && (
                  <>
                    <div style={S.sectionLabel}>Title Type Breakdown</div>
                    <div style={S.grid2}>
                      {data.patterns.topTitleTypes.map((t, i) => (
                        <div key={i} style={S.patternRow}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                            <span style={{ fontSize: "13px", fontWeight: "600", color: C.text }}>{t.type}</span>
                            <span style={{ fontSize: "13px", fontWeight: "800", color: C.gold }}>{t.percentage}%</span>
                          </div>
                          <ConfidenceBar value={t.percentage} color={i === 0 ? C.gold : C.blue} active={animActive} />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {tab === "brief" && data.nextVideo && (
              <div className="fu">
                <div style={S.nextCard}>
                  <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", flexWrap: "wrap" }}>
                    <ViralScoreRing score={data.nextVideo.viralScore} active={animActive} />
                    <div style={{ flex: 1, minWidth: "200px" }}>
                      <div style={{ fontSize: "11px", fontWeight: "700", color: C.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>AI Recommendation</div>
                      <div style={{ fontSize: "clamp(16px,2.5vw,22px)", fontWeight: "800", color: C.text, letterSpacing: "-0.5px", lineHeight: 1.3, marginBottom: "12px" }}>"{data.nextVideo.title}"</div>
                      <div style={{ fontSize: "13px", color: C.mutedMid, lineHeight: 1.6, marginBottom: "16px" }}>{data.nextVideo.angle}</div>
                      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                        {[["Length", data.nextVideo.length], ["Publish", data.nextVideo.publishDay], ["Time", data.nextVideo.publishTime]].map(([l, v]) => (
                          <div key={l}>
                            <div style={{ fontSize: "10px", color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>{l}</div>
                            <div style={{ fontSize: "13px", fontWeight: "700", color: C.text }}>{v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    {data.nextVideo.reasons?.map((r, i) => (
                      <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "8px", alignItems: "flex-start" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: C.gold, flexShrink: 0, marginTop: "7px" }} />
                        <span style={{ fontSize: "13px", color: C.mutedMid, lineHeight: 1.5 }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {data.nextVideo.hooks && (
                  <>
                    <div style={S.sectionLabel}>3 Opening Hook Options</div>
                    {data.nextVideo.hooks.map((h, i) => (
                      <div key={i} style={S.hookCard}>
                        <span style={{ fontSize: "11px", fontWeight: "700", color: C.gold, marginRight: "8px" }}>HOOK {i + 1}</span>
                        &ldquo;{h}&rdquo;
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}

            <div style={S.cta}>
              <div style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-0.8px", marginBottom: "10px" }}>Get weekly reports for your niche</div>
              <div style={{ fontSize: "14px", color: C.muted, marginBottom: "24px", lineHeight: 1.65 }}>Every Monday, NicheRadar sends you a fresh outlier scan + your next video brief. Free during early access.</div>
              {!joined ? (
                <>
                  <div style={{ display: "flex", gap: "8px", maxWidth: "380px", margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
                    <input style={{ ...S.input, flex: 1, minWidth: "180px" }} type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                    <button style={S.btn} onClick={() => email.includes("@") && setJoined(true)}>Get Early Access</button>
                  </div>
                  <div style={{ fontSize: "11px", color: C.muted, marginTop: "12px" }}>No spam. No credit card. Cancel anytime.</div>
                </>
              ) : (
                <div style={{ fontSize: "15px", fontWeight: "700", color: C.green }}>✓ You&apos;re on the list — we&apos;ll reach out within 48 hours.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
