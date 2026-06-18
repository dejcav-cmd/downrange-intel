import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

const C = {
  bg:'#07090B', s1:'#0C0E11', s2:'#111316', s3:'#161A1E', s4:'#1C2026',
  border:'#1C1F24', hi:'#2A2E35',
  gold:'#C8922A', goldDim:'#C8922A1A', goldBorder:'#C8922A38', goldLight:'#E4A83C',
  green:'#22C55E', greenDim:'#22C55E15', greenBorder:'#22C55E30',
  blue:'#60A5FA', blueDim:'#60A5FA15',
  text:'#EDE8DF', mid:'#8C8F96', muted:'#52555C', red:'#EF4444',
};

const TICKER = [
  '🎯 "308 deer rifle review" outperforming 5.1× · 8 min ago',
  '📈 Montana hunting channel +3.8× avg views this week',
  '🔥 "Best turkey calls 2026" trending — zero dominant video under 100K subs',
  '⚡ Outdoor gear review format: 4 outliers in 72 hrs',
  '🎯 "CCW tips for beginners" — 6.2× outlier · title formula confirmed',
  '📊 Waterfowl channels posting Wed afternoon seeing 2× algorithm boost',
  '🔥 "Best budget night vision" — zero dominant video under 500K subs · gap confirmed',
  '⚡ Suppressor review niche: 2.9× avg outlier this month · low competition',
];

const NICHES = ['deer hunting', 'CCW & concealed carry', 'waterfowl hunting', 'long-range shooting', 'archery & bowhunting'];

function useLiveCount(base = 412) {
  const [n, setN] = useState(base);
  useEffect(() => {
    const t = setInterval(() => { if (Math.random() > 0.65) setN(v => v + 1); }, 9000);
    return () => clearInterval(t);
  }, []);
  return n;
}

function useCountUp(target, active, ms = 1200) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active || !target) return;
    let cur = 0; const step = target / (ms / 16);
    const t = setInterval(() => { cur = Math.min(cur + step, target); setV(Math.floor(cur)); if (cur >= target) clearInterval(t); }, 16);
    return () => clearInterval(t);
  }, [target, active]);
  return v;
}

function useBar(target, active, delay = 300) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setW(target), delay);
    return () => clearTimeout(t);
  }, [target, active, delay]);
  return w;
}

function Reticle() {
  return (
    <svg width={520} height={520} viewBox="0 0 200 200" style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', opacity:0.045, pointerEvents:'none', animation:'reticle 80s linear infinite' }}>
      {[90,62,34].map(r => <circle key={r} cx="100" cy="100" r={r} fill="none" stroke={C.gold} strokeWidth={r===90?'0.5':'0.3'} />)}
      <circle cx="100" cy="100" r="4" fill="none" stroke={C.gold} strokeWidth="0.8" />
      {[['100','10','100','66'],['100','134','100','190'],['10','100','66','100'],['134','100','190','100']].map(([x1,y1,x2,y2],i) => <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.gold} strokeWidth="0.5" />)}
      {[35,80,125,170,215,260,305,350].map(a => { const r2=a*Math.PI/180; return <circle key={a} cx={100+90*Math.sin(r2)} cy={100-90*Math.cos(r2)} r="1.5" fill={C.gold} opacity="0.5" />; })}
    </svg>
  );
}

function MultiBadge({ val }) {
  const n = parseFloat(val);
  const col = n >= 5 ? C.green : n >= 3.5 ? C.gold : C.blue;
  return <span style={{ fontSize:11, fontWeight:800, color:col, backgroundColor:`${col}18`, border:`1px solid ${col}30`, padding:'2px 8px', borderRadius:4, whiteSpace:'nowrap' }}>{val}</span>;
}

function ConfBar({ value, color=C.gold, active, delay=200 }) {
  const w = useBar(value, active, delay);
  return <div style={{ height:3, backgroundColor:C.border, borderRadius:2, overflow:'hidden', marginTop:6 }}><div style={{ height:'100%', backgroundColor:color, width:`${w}%`, borderRadius:2, transition:'width 1s cubic-bezier(.34,1.2,.64,1)' }} /></div>;
}

function ViralRing({ score, active }) {
  const [v, setV] = useState(0);
  useEffect(() => { if (active) { setTimeout(() => setV(score), 100); } }, [score, active]);
  const r=26, circ=2*Math.PI*r, off=circ-(v/100)*circ;
  const col = score>=80 ? C.green : score>=65 ? C.gold : C.blue;
  return (
    <div style={{ position:'relative', width:64, height:64, flexShrink:0 }}>
      <svg viewBox="0 0 60 60" width="64" height="64">
        <circle cx="30" cy="30" r={r} fill="none" stroke={C.border} strokeWidth="4"/>
        <circle cx="30" cy="30" r={r} fill="none" stroke={col} strokeWidth="4" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={off} transform="rotate(-90 30 30)"
          style={{ transition:'stroke-dashoffset 1.4s cubic-bezier(.34,1.2,.64,1)' }}/>
      </svg>
      <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
        <span style={{ fontSize:15, fontWeight:900, color:col, lineHeight:1 }}>{v}</span>
        <span style={{ fontSize:7, color:C.muted, textTransform:'uppercase', letterSpacing:'0.06em' }}>viral</span>
      </div>
    </div>
  );
}

// ── THE BIG IMPROVEMENT: Full Email Mockup ────────────────────────
function BriefEmail({ data, niche, active }) {
  const typeColors = { number:'#F59E0B', verb:C.green, topic:C.blue, hook:'#A78BFA', timeframe:C.gold };
  if (!data) return null;
  return (
    <div style={{ backgroundColor:C.s1, border:`1px solid ${C.border}`, borderRadius:14, overflow:'hidden', marginTop:28, maxWidth:680, margin:'28px auto 0' }}>
      {/* Email client chrome */}
      <div style={{ backgroundColor:'#0A0D10', borderBottom:`1px solid ${C.border}`, padding:'10px 18px', display:'flex', alignItems:'center', gap:12 }}>
        <div style={{ display:'flex', gap:5 }}>
          {['#EF4444','#F59E0B','#22C55E'].map(c => <div key={c} style={{ width:10, height:10, borderRadius:'50%', backgroundColor:c, opacity:.7 }} />)}
        </div>
        <div style={{ flex:1, backgroundColor:C.s2, borderRadius:6, padding:'4px 12px', fontSize:11, color:C.muted, textAlign:'center', border:`1px solid ${C.border}` }}>
          intel@downrangecreator.com
        </div>
      </div>
      {/* Email header */}
      <div style={{ backgroundColor:C.s2, borderBottom:`1px solid ${C.border}`, padding:'14px 22px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:8 }}>
          <div>
            <div style={{ fontSize:12, color:C.mid, marginBottom:4 }}>
              <span style={{ color:C.muted }}>From: </span>DownRange Creator Intel &lt;intel@downrangecreator.com&gt;
            </div>
            <div style={{ fontSize:12, color:C.mid, marginBottom:6 }}>
              <span style={{ color:C.muted }}>Subject: </span>
              <span style={{ color:C.text, fontWeight:600 }}>🎯 Your Monday Brief — {data.niche}</span>
            </div>
          </div>
          <div style={{ fontSize:10, color:C.muted, fontFamily:'monospace', textAlign:'right' }}>
            {new Date().toLocaleDateString('en-US',{weekday:'short', month:'short', day:'numeric', year:'numeric'})} · 7:00 AM
          </div>
        </div>
      </div>
      {/* Email body */}
      <div style={{ padding:'24px 22px' }}>
        {/* Brand header */}
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:20 }}>
          <div style={{ width:7, height:7, borderRadius:'50%', backgroundColor:C.gold, boxShadow:`0 0 8px ${C.gold}` }} />
          <span style={{ fontSize:11, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:C.gold }}>DownRange Creator</span>
          <span style={{ fontSize:11, color:C.muted, letterSpacing:'0.06em' }}>· MONDAY INTELLIGENCE BRIEF</span>
        </div>

        {/* Niche health banner */}
        <div style={{ backgroundColor:C.s3, border:`1px solid ${C.border}`, borderRadius:8, padding:'14px 18px', marginBottom:22, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:10, fontWeight:700, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>Niche Health — {data.niche}</div>
            <ConfBar value={data.nicheHealth?.score} color={data.nicheHealth?.score>=70?C.green:C.gold} active={active} delay={100} />
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:22, fontWeight:900, color:data.nicheHealth?.score>=70?C.green:C.gold }}>{data.nicheHealth?.score}</div>
            <div style={{ fontSize:10, color:C.muted, textTransform:'uppercase' }}>{data.nicheHealth?.label} {data.nicheHealth?.trend==='rising'?'↑':data.nicheHealth?.trend==='declining'?'↓':'→'}</div>
          </div>
          <div style={{ width:'100%' }}>
            <span style={{ fontSize:11, color:C.muted }}>{data.channelsScanned} channels · {data.videosAnalyzed} videos · last 90 days</span>
            <span style={{ fontSize:11, color:C.mid, marginLeft:12, fontStyle:'italic' }}>"{data.nicheHealth?.insight}"</span>
          </div>
        </div>

        {/* Outliers */}
        <div style={{ marginBottom:22 }}>
          <div style={{ fontSize:10, fontWeight:700, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:12, display:'flex', alignItems:'center', gap:8 }}>
            <span>This Week's Outliers</span>
            <div style={{ flex:1, height:1, backgroundColor:C.border }} />
            <span style={{ color:C.mid }}>Avg channel baseline: {Math.round((data.avgChannelViews||38000)/1000)}K views</span>
          </div>
          {data.outliers?.map((v,i) => {
            
            return (
              <div key={i} style={{ display:'grid', gridTemplateColumns:'auto 1fr auto', gap:12, alignItems:'flex-start', padding:'10px 0', borderBottom:i<data.outliers.length-1?`1px solid ${C.border}`:'none' }}>
                <MultiBadge val={v.multiplier} />
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:C.text, lineHeight:1.35, marginBottom:4 }}>{v.title}</div>
                  <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
                    <span style={{ fontSize:11, color:C.mid }}>{v.channel}</span>
                    <span style={{ fontSize:10, color:C.muted }}>·</span>
                    <span style={{ fontSize:10, color:C.muted }}>{v.length}</span>
                    <span style={{ fontSize:10, color:C.muted }}>·</span>
                    <span style={{ fontSize:10, color:C.muted }}>{v.daysAgo}d ago</span>
                    <span style={{ fontSize:10, fontWeight:600, color:C.blue, backgroundColor:C.blueDim, padding:'1px 6px', borderRadius:3 }}>{v.titleType}</span>
                  </div>
                  {v.whyItWorked && <div style={{ fontSize:11, color:C.muted, marginTop:4, fontStyle:'italic' }}>↳ {v.whyItWorked}</div>}
                </div>
                <div style={{ textAlign:'right', minWidth:52 }}>
                  <div style={{ fontSize:14, fontWeight:800, color:C.text }}>{Math.round((v.views||0)/1000)}K</div>
                  <div style={{ fontSize:9, color:C.muted }}>views</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* What's working */}
        <div style={{ backgroundColor:C.s2, border:`1px solid ${C.border}`, borderRadius:8, padding:'16px 18px', marginBottom:22 }}>
          <div style={{ fontSize:10, fontWeight:700, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:14 }}>What's Working This Week</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:14 }}>
            {[
              ['📝', 'Title Formula', data.patterns?.titleFormula?.formula],
              ['⏱', 'Sweet Spot Length', data.patterns?.bestLength?.value, data.patterns?.bestLength?.confidence],
              ['📅', 'Best Day to Post', data.patterns?.bestDay?.value, data.patterns?.bestDay?.confidence],
              ['🕑', 'Best Time', data.patterns?.bestTime?.value, data.patterns?.bestTime?.confidence],
            ].map(([icon,label,val,conf]) => (
              <div key={label}>
                <div style={{ fontSize:10, color:C.muted, marginBottom:4 }}>{icon} {label}</div>
                <div style={{ fontSize:12, fontWeight:700, color:C.text, lineHeight:1.4 }}>{val}</div>
                {conf && <ConfBar value={conf} color={C.gold} active={active} delay={400} />}
                {conf && <div style={{ fontSize:10, color:C.muted, marginTop:3 }}>Confidence: {conf}%</div>}
              </div>
            ))}
          </div>
          {data.patterns?.titleFormula?.parts && (
            <div style={{ borderTop:`1px solid ${C.border}`, marginTop:14, paddingTop:14 }}>
              <div style={{ fontSize:10, color:C.muted, marginBottom:8 }}>Formula breakdown</div>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {data.patterns.titleFormula.parts.map((p,i) => (
                  <div key={i} style={{ fontSize:11, fontWeight:700, color:typeColors[p.type]||C.mid, backgroundColor:`${typeColors[p.type]||C.mid}15`, padding:'4px 10px', borderRadius:4 }}>
                    {p.text}
                    <div style={{ fontSize:9, color:C.muted, textTransform:'uppercase', letterSpacing:'0.06em', textAlign:'center', marginTop:1 }}>{p.type}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Next video */}
        <div style={{ backgroundColor:`${C.gold}08`, border:`1px solid ${C.goldBorder}`, borderRadius:10, padding:'20px 20px' }}>
          <div style={{ display:'flex', gap:16, alignItems:'flex-start', marginBottom:16 }}>
            <ViralRing score={data.nextVideo?.viralScore||84} active={active} />
            <div style={{ flex:1 }}>
              <div style={{ fontSize:10, fontWeight:700, color:C.gold, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:8 }}>🎯 Your Next Video</div>
              <div style={{ fontSize:'clamp(14px,2vw,17px)', fontWeight:800, color:C.text, lineHeight:1.3, marginBottom:10 }}>
                "{data.nextVideo?.title}"
              </div>
              <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
                {[['Publish',data.nextVideo?.publishDay],['Length',data.nextVideo?.length],['Time',data.nextVideo?.publishTime]].map(([l,v]) => (
                  <div key={l}><span style={{ fontSize:10, color:C.muted, textTransform:'uppercase', letterSpacing:'0.06em' }}>{l} </span><span style={{ fontSize:12, fontWeight:700, color:C.text }}>{v}</span></div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ fontSize:13, color:C.mid, lineHeight:1.6, marginBottom:16 }}>{data.nextVideo?.angle}</div>
          {data.nextVideo?.reasons && (
            <div style={{ marginBottom:16 }}>
              {data.nextVideo.reasons.map((r,i) => (
                <div key={i} style={{ display:'flex', gap:8, marginBottom:6 }}>
                  <span style={{ color:C.gold, fontSize:10, marginTop:3, flexShrink:0 }}>◆</span>
                  <span style={{ fontSize:12, color:C.mid, lineHeight:1.5 }}>{r}</span>
                </div>
              ))}
            </div>
          )}
          {data.nextVideo?.hooks && (
            <div style={{ borderTop:`1px solid ${C.goldBorder}`, paddingTop:14 }}>
              <div style={{ fontSize:10, fontWeight:700, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:10 }}>3 Opening Hook Options</div>
              {data.nextVideo.hooks.map((h,i) => (
                <div key={i} style={{ backgroundColor:C.s2, border:`1px solid ${C.border}`, borderRadius:6, padding:'10px 14px', marginBottom:8, fontSize:12, color:C.mid, fontStyle:'italic', lineHeight:1.5 }}>
                  <span style={{ fontSize:10, fontWeight:700, color:C.gold, marginRight:8, fontStyle:'normal' }}>HOOK {i+1}</span>
                  "{h}"
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Email footer */}
        <div style={{ marginTop:20, paddingTop:16, borderTop:`1px solid ${C.border}`, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8 }}>
          <span style={{ fontSize:11, color:C.muted }}>DownRange Creator · intel@downrangecreator.com</span>
          <span style={{ fontSize:11, color:C.muted }}>Unsubscribe · Manage preferences</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [demoNiche, setDemoNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [briefData, setBriefData] = useState(null);
  const [animActive, setAnimActive] = useState(false);
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState('');
  const count = useLiveCount(412);
  const demoRef = useRef(null);

  async function runDemo(n) {
    const q = (n||demoNiche).trim();
    if (!q) return;
    setDemoNiche(q); setLoading(true); setBriefData(null); setAnimActive(false); setError('');
    try {
      const res = await fetch('/api/analyze', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({niche:q}) });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setBriefData(data);
      setTimeout(() => setAnimActive(true), 120);
    } catch { setError('Could not generate brief. Try again.'); }
    finally { setLoading(false); }
  }

  async function joinWaitlist() {
    if (!email.includes('@')) return;
    try { await fetch('/api/waitlist',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,niche:demoNiche||'general'})}); } catch {}
    setJoined(true);
  }

  const btn = { fontSize:13, fontWeight:700, color:'#000', backgroundColor:C.gold, padding:'13px 24px', borderRadius:8, border:'none', cursor:'pointer', fontFamily:'inherit', letterSpacing:'0.02em' };
  const ghost = { fontSize:13, fontWeight:600, color:C.mid, backgroundColor:'transparent', padding:'13px 24px', borderRadius:8, border:`1px solid ${C.border}`, cursor:'pointer', fontFamily:'inherit' };
  const inp = { flex:1, minWidth:200, padding:'13px 16px', fontSize:14, backgroundColor:C.s2, border:`1px solid ${C.border}`, borderRadius:8, color:C.text, fontFamily:'inherit', outline:'none' };

  return (
    <>
      <Head>
        <title>DownRange Creator — YouTube Intelligence for Outdoor & Firearms Creators</title>
        <meta name="description" content="Weekly channel briefs, outlier detection, and sponsor deal tools built for firearms, hunting, and outdoor YouTube creators." />
        <meta property="og:title" content="DownRange Creator — YouTube Intel for Outdoor Creators" />
        <meta property="og:description" content="Stop using generic tools. Get YouTube intelligence built for your niche." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' fill='none' stroke='%23C8922A' stroke-width='8'/><line x1='50' y1='10' x2='50' y2='40' stroke='%23C8922A' stroke-width='4'/><line x1='50' y1='60' x2='50' y2='90' stroke='%23C8922A' stroke-width='4'/><line x1='10' y1='50' x2='40' y2='50' stroke='%23C8922A' stroke-width='4'/><line x1='60' y1='50' x2='90' y2='50' stroke='%23C8922A' stroke-width='4'/></svg>" />
        <style>{`
          *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
          html{-webkit-font-smoothing:antialiased;scroll-behavior:smooth;}
          body{background:#07090B;color:#EDE8DF;font-family:'Inter','SF Pro Display',system-ui,sans-serif;}
          @keyframes reticle{to{transform:translate(-50%,-50%) rotate(360deg);}}
          @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
          @keyframes spin{to{transform:rotate(360deg)}}
          @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
          .fu{animation:fadeUp .45s ease forwards}
          input:focus{outline:none;border-color:#C8922A80!important;box-shadow:0 0 0 3px #C8922A12;}
          button:hover:not(:disabled){opacity:.87;transition:opacity .15s;}
          ::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#1C1F24;border-radius:2px}
        `}</style>
      </Head>
      <div style={{ minHeight:'100vh', backgroundColor:C.bg, color:C.text }}>

        {/* Ticker */}
        <div style={{ backgroundColor:'#09090D', borderBottom:`1px solid ${C.border}`, padding:'8px 0', overflow:'hidden' }}>
          <div style={{ display:'flex', gap:48, whiteSpace:'nowrap', animation:'ticker 38s linear infinite', fontSize:11, color:C.mid }}>
            {[...TICKER,...TICKER].map((t,i) => <span key={i} style={{ flexShrink:0 }}>{t}</span>)}
          </div>
        </div>

        {/* Nav */}
        <nav style={{ borderBottom:`1px solid ${C.border}`, padding:'15px 36px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, backgroundColor:`${C.bg}F2`, backdropFilter:'blur(14px)', zIndex:30 }}>
          <div style={{ display:'flex', alignItems:'center', gap:9, fontSize:15, fontWeight:800, letterSpacing:'-0.3px' }}>
            <div style={{ width:8, height:8, borderRadius:'50%', backgroundColor:C.gold, boxShadow:`0 0 8px ${C.gold}` }} />
            DownRange<span style={{ color:C.gold }}>Creator</span>
          </div>
          <div style={{ display:'flex', gap:24, fontSize:13 }}>
            {[['How It Works','#how'],['The Suite','#suite'],['Compare','#compare']].map(([l,h]) => (
              <a key={l} href={h} style={{ color:C.muted, textDecoration:'none' }}>{l}</a>
            ))}
          </div>
          <button style={btn} onClick={() => document.getElementById('waitlist')?.scrollIntoView({behavior:'smooth'})}>
            Join Waitlist →
          </button>
        </nav>

        {/* Hero */}
        <div style={{ position:'relative', maxWidth:900, margin:'0 auto', padding:'96px 24px 80px', textAlign:'center', overflow:'hidden' }}>
          <Reticle />
          <div className="fu" style={{ position:'relative', zIndex:1 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:10, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:C.gold, backgroundColor:C.goldDim, border:`1px solid ${C.goldBorder}`, padding:'5px 13px', borderRadius:4, marginBottom:28 }}>
              <div style={{ width:5, height:5, borderRadius:'50%', backgroundColor:C.green, animation:'pulse 2s ease infinite' }} />
              Early Access · {count} outdoor creators on the waitlist
            </div>
            <h1 style={{ fontSize:'clamp(40px,6.5vw,68px)', fontWeight:900, letterSpacing:'-2.5px', lineHeight:1.0, marginBottom:24, color:C.text }}>
              The YouTube intel suite<br /><span style={{ color:C.gold }}>built for your niche.</span>
            </h1>
            <p style={{ fontSize:18, color:C.muted, lineHeight:1.7, maxWidth:580, margin:'0 auto 42px' }}>
              TubeLab and VidIQ are built for gaming channels and faceless automation. <strong style={{ color:C.text, fontWeight:700 }}>DownRange Creator</strong> is built for hunters, shooters, outdoor guides, and 2A creators — the niche every other tool ignores.
            </p>
            <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginBottom:56 }}>
              <button style={btn} onClick={() => demoRef.current?.scrollIntoView({behavior:'smooth'})}>
                See My Monday Brief →
              </button>
              <button style={ghost} onClick={() => document.getElementById('suite')?.scrollIntoView({behavior:'smooth'})}>
                View the Suite
              </button>
            </div>
            <div style={{ display:'flex', justifyContent:'center', borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, padding:'22px 0', gap:0 }}>
              {[['Weekly','in your inbox, not buried in a dashboard'],['Niche-specific','firearms, hunting & outdoor only'],['Real data','outlier detection, not generic AI'],['4 tools','one suite, one subscription']].map(([n,l],i,a) => (
                <div key={n} style={{ textAlign:'center', padding:'0 32px', borderRight:i<a.length-1?`1px solid ${C.border}`:'none' }}>
                  <div style={{ fontSize:16, fontWeight:800, color:C.gold, marginBottom:3 }}>{n}</div>
                  <div style={{ fontSize:11, color:C.muted, lineHeight:1.4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Problem */}
        <div style={{ borderTop:`1px solid ${C.border}`, backgroundColor:C.s1, padding:'72px 24px' }}>
          <div style={{ maxWidth:920, margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:44 }}>
              <div style={{ fontSize:10, fontWeight:700, color:C.gold, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:14 }}>The Problem</div>
              <h2 style={{ fontSize:'clamp(26px,3.8vw,40px)', fontWeight:900, letterSpacing:'-1px', marginBottom:14 }}>Generic tools built for generic creators.</h2>
              <p style={{ fontSize:15, color:C.muted, maxWidth:540, margin:'0 auto', lineHeight:1.7 }}>Every tool in this space is built for the faceless YouTube automation crowd. When your content involves NFA items, hunting seasons, and CCW laws — that's a problem.</p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:14 }}>
              {[
                ['🎯','No niche knowledge',"They think 'suppressors' and 'silencers' are different niches. They don't know deer season drives your content calendar. You lose real opportunities."],
                ['🤖','Built for automation',"Every testimonial is '$500/day faceless channel.' You're not automating. You're living this content. Different tool needed."],
                ['🔐','Platform risk blind spots',"Firearms content gets demonetized differently. Shadow restrictions exist. Age gates trigger randomly. Generic tools have no idea."],
                ['📬','You have to go find it',"Every tool requires you to log in, filter, browse, figure it out. We send your intel every Monday. No login needed."],
              ].map(([i,t,d]) => (
                <div key={t} style={{ backgroundColor:C.s2, border:`1px solid ${C.border}`, borderRadius:10, padding:'22px 20px' }}>
                  <div style={{ fontSize:24, marginBottom:12 }}>{i}</div>
                  <div style={{ fontSize:14, fontWeight:700, color:C.text, marginBottom:8 }}>{t}</div>
                  <div style={{ fontSize:13, color:C.muted, lineHeight:1.65 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How it works */}
        <div style={{ padding:'72px 24px', borderTop:`1px solid ${C.border}` }} id="how">
          <div style={{ maxWidth:800, margin:'0 auto', textAlign:'center' }}>
            <div style={{ fontSize:10, fontWeight:700, color:C.gold, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:14 }}>How Monday Brief Works</div>
            <h2 style={{ fontSize:'clamp(26px,3.8vw,40px)', fontWeight:900, letterSpacing:'-1px', marginBottom:44 }}>Three steps. Zero effort. Every Monday.</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:0, position:'relative' }}>
              {[
                ['01','Connect your niche','Tell us your content focus — deer hunting, CCW, waterfowl, long-range. Takes 30 seconds.'],
                ['02','We scan every week','DownRange Creator scans 10+ channels in your niche every week, identifies outliers, and extracts patterns.'],
                ['03','Monday lands in your inbox','7am every Monday: your niche health score, top outliers, what\'s working, and your next video brief. Done.'],
              ].map(([n,t,d],i,a) => (
                <div key={n} style={{ padding:'28px 28px', borderRight:i<a.length-1?`1px solid ${C.border}`:'none', position:'relative' }}>
                  <div style={{ fontSize:36, fontWeight:900, color:C.goldDim, letterSpacing:'-2px', marginBottom:14, fontVariantNumeric:'tabular-nums' }}>{n}</div>
                  <div style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:10 }}>{t}</div>
                  <div style={{ fontSize:13, color:C.muted, lineHeight:1.65 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monday Brief Demo — THE BIG SECTION */}
        <div ref={demoRef} style={{ backgroundColor:C.s1, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, padding:'72px 24px' }}>
          <div style={{ maxWidth:720, margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:36 }}>
              <div style={{ fontSize:10, fontWeight:700, color:C.gold, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:14 }}>Live Preview</div>
              <h2 style={{ fontSize:'clamp(24px,3.5vw,38px)', fontWeight:900, letterSpacing:'-1px', marginBottom:14 }}>This is what lands in your inbox<br />every Monday at 7am.</h2>
              <p style={{ fontSize:15, color:C.muted, lineHeight:1.65, maxWidth:500, margin:'0 auto' }}>Enter your niche below and see a real Monday Brief generated live — exactly what you'd receive every week as a subscriber.</p>
            </div>

            {/* Input row */}
            <div style={{ backgroundColor:C.s2, border:`1px solid ${C.border}`, borderRadius:12, padding:'24px', marginBottom:0 }}>
              <div style={{ display:'flex', gap:10, marginBottom:14, flexWrap:'wrap' }}>
                <input style={inp} placeholder="Enter your niche — e.g. 'deer hunting' or 'CCW training'" value={demoNiche}
                  onChange={e => setDemoNiche(e.target.value)}
                  onKeyDown={e => e.key==='Enter' && !loading && runDemo()} />
                <button style={{ ...btn, opacity: loading || !demoNiche.trim() ? 0.5 : 1, padding:'13px 20px', whiteSpace:'nowrap' }}
                  onClick={() => runDemo()} disabled={loading||!demoNiche.trim()}>
                  {loading ? 'Generating...' : 'Generate Brief →'}
                </button>
              </div>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                <span style={{ fontSize:11, color:C.muted }}>Try:</span>
                {NICHES.map(n => (
                  <button key={n} style={{ fontSize:11, fontWeight:600, color:C.muted, backgroundColor:C.s3, border:`1px solid ${C.border}`, padding:'5px 12px', borderRadius:20, cursor:'pointer', fontFamily:'inherit', transition:'all .15s' }}
                    onMouseEnter={e => { e.target.style.borderColor=C.gold; e.target.style.color=C.gold; }}
                    onMouseLeave={e => { e.target.style.borderColor=C.border; e.target.style.color=C.muted; }}
                    onClick={() => runDemo(n)}>{n}</button>
                ))}
              </div>

              {loading && (
                <div style={{ textAlign:'center', padding:'40px 0' }}>
                  <div style={{ width:32, height:32, borderRadius:'50%', border:`3px solid ${C.border}`, borderTop:`3px solid ${C.gold}`, animation:'spin .75s linear infinite', margin:'0 auto 14px' }} />
                  <div style={{ fontSize:13, color:C.muted }}>Scanning niche intel and generating your brief...</div>
                </div>
              )}
              {error && <div style={{ color:C.red, fontSize:13, marginTop:12 }}>{error}</div>}
            </div>

            {briefData && <BriefEmail data={briefData} niche={demoNiche} active={animActive} />}

            {briefData && (
              <div className="fu" style={{ textAlign:'center', marginTop:28, padding:'20px', backgroundColor:C.goldDim, border:`1px solid ${C.goldBorder}`, borderRadius:10 }}>
                <div style={{ fontSize:14, fontWeight:700, color:C.gold, marginBottom:6 }}>This hits your inbox every Monday at 7am.</div>
                <div style={{ fontSize:13, color:C.mid, marginBottom:14 }}>Start your Monday Brief subscription — $29/month, cancel anytime.</div>
                <button style={btn} onClick={() => document.getElementById('waitlist')?.scrollIntoView({behavior:'smooth'})}>
                  Join Waitlist to Get Early Access →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Compare */}
        <div style={{ padding:'72px 24px', borderTop:`1px solid ${C.border}` }} id="compare">
          <div style={{ maxWidth:860, margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:40 }}>
              <div style={{ fontSize:10, fontWeight:700, color:C.gold, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:14 }}>Why Not Just Use...</div>
              <h2 style={{ fontSize:'clamp(26px,3.8vw,40px)', fontWeight:900, letterSpacing:'-1px' }}>We built what they wouldn't.</h2>
            </div>
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                <thead>
                  <tr style={{ borderBottom:`2px solid ${C.border}` }}>
                    {['Feature','DownRange Creator','TubeLab','VidIQ','On Your Own'].map((h,i) => (
                      <th key={h} style={{ padding:'12px 16px', textAlign:i===0?'left':'center', color:i===1?C.gold:C.muted, fontWeight:700, fontSize:12, letterSpacing:'0.05em', textTransform:'uppercase', backgroundColor:i===1?C.goldDim:'transparent' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Outdoor niche data','✓ Deep','~ Generic','~ Generic','✗'],
                    ['Weekly email brief','✓ Every Monday','✗ Login required','✗ Login required','✗'],
                    ['Firearms compliance','✓ Built-in','✗','✗','Maybe'],
                    ['Next video brief','✓ Specific + hooks','Browse yourself','Basic ideas','Hours of work'],
                    ['Sponsor deal tools','✓ Included','✗','✗','✗'],
                    ['Brand directory','✓ 400+ creators','✗','✗','✗'],
                    ['Monthly price','$29–49','$29','$17–33','~$0 (time)'],
                  ].map((row, ri) => (
                    <tr key={ri} style={{ borderBottom:`1px solid ${C.border}`, backgroundColor:ri%2===0?'transparent':C.s1 }}>
                      {row.map((cell, ci) => (
                        <td key={ci} style={{ padding:'11px 16px', textAlign:ci===0?'left':'center', color:ci===1?C.text:cell==='✓'||cell?.startsWith('✓')?C.green:cell==='✗'?C.muted:C.mid, fontWeight:ci===1?600:400, backgroundColor:ci===1?C.goldDim:'transparent', fontSize:ci===0?13:14 }}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Suite */}
        <div style={{ backgroundColor:C.s1, borderTop:`1px solid ${C.border}`, padding:'72px 24px' }} id="suite">
          <div style={{ maxWidth:960, margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:44 }}>
              <div style={{ fontSize:10, fontWeight:700, color:C.gold, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:14 }}>The Suite</div>
              <h2 style={{ fontSize:'clamp(26px,3.8vw,40px)', fontWeight:900, letterSpacing:'-1px', marginBottom:14 }}>Four tools. One niche. Your unfair advantage.</h2>
              <p style={{ fontSize:15, color:C.muted, maxWidth:500, margin:'0 auto', lineHeight:1.7 }}>Launch pricing locked for founding members. All four products available when you join.</p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:14 }}>
              {[
                { icon:'📬', name:'Monday Brief', tag:'START HERE', price:'$29', sub:'/mo', featured:true, desc:'Your weekly niche intelligence brief delivered every Monday at 7am. No dashboard. No login. Just the intel.', items:['Weekly outlier scan (5 videos)','Pattern analysis (title, timing, thumbnail)','Your next video brief + hooks','Niche health score','Trending topics'] },
                { icon:'🔭', name:'Niche Intel', tag:'', price:'$49', sub:'/mo', featured:false, desc:'Full outlier detection dashboard for your niche. Real-time data, competitor tracking, content gap analysis.', items:['Unlimited niche scans','Competitor channel tracking','Content gap detection','Title formula library','On-demand briefs'] },
                { icon:'🤝', name:'Sponsor Deals', tag:'', price:'$39', sub:'/mo', featured:false, desc:'Know your market rate. Generate pro media kits. Pitch outdoor and firearms brands with confidence.', items:['Auto rate calculator','Media kit generator','Firearms brand templates','Outreach CRM','Deal pipeline tracking'] },
                { icon:'🏷️', name:'Brand Directory', tag:'FOR BRANDS', price:'$199', sub:'/mo', featured:false, desc:'For outdoor and firearms brands: find, vet, and contact the right YouTube creators. Direct access, no agency.', items:['400+ verified creators','Engagement analytics','Direct contact info','Niche & audience filters','New creators monthly'] },
              ].map(({ icon, name, tag, price, sub, featured, desc, items }) => (
                <div key={name} style={{ backgroundColor:featured?C.s2:C.s2, border:`1px solid ${featured?C.goldBorder:C.border}`, borderRadius:11, padding:'24px 22px', position:'relative', overflow:'hidden' }}>
                  {tag && <div style={{ position:'absolute', top:0, right:0, backgroundColor:C.gold, color:'#000', fontSize:9, fontWeight:800, letterSpacing:'0.08em', padding:'4px 10px', borderBottomLeftRadius:8 }}>{tag}</div>}
                  <div style={{ fontSize:26, marginBottom:14 }}>{icon}</div>
                  <div style={{ fontSize:16, fontWeight:800, color:C.text, marginBottom:6 }}>{name}</div>
                  <div style={{ marginBottom:12 }}>
                    <span style={{ fontSize:26, fontWeight:900, color:featured?C.gold:C.text, letterSpacing:'-1px' }}>{price}</span>
                    <span style={{ fontSize:12, color:C.muted, marginLeft:3 }}>{sub}</span>
                  </div>
                  <div style={{ fontSize:12, color:C.muted, lineHeight:1.65, marginBottom:16 }}>{desc}</div>
                  <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:14 }}>
                    {items.map(f => (
                      <div key={f} style={{ display:'flex', gap:8, alignItems:'flex-start', marginBottom:7 }}>
                        <span style={{ color:C.gold, fontSize:11, marginTop:1, flexShrink:0 }}>✓</span>
                        <span style={{ fontSize:12, color:C.mid, lineHeight:1.4 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Who it's for */}
        <div style={{ borderTop:`1px solid ${C.border}`, padding:'64px 24px' }}>
          <div style={{ maxWidth:800, margin:'0 auto', textAlign:'center' }}>
            <div style={{ fontSize:10, fontWeight:700, color:C.gold, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:14 }}>Who It's For</div>
            <h2 style={{ fontSize:'clamp(24px,3.5vw,38px)', fontWeight:900, letterSpacing:'-1px', marginBottom:36 }}>If you make content in these spaces — this is yours.</h2>
            <div style={{ display:'flex', flexWrap:'wrap', gap:10, justifyContent:'center' }}>
              {['Firearms instructors','Hunting channels','Outdoor adventure','2A advocates','Gear reviewers','CCW instructors','Bowhunters','Waterfowl hunters','Long-range shooting','Survival & prepping','Turkey hunting','Deer hunting','FFL dealers','Competitive shooters','Knife & EDC','Fly fishing & fishing','Hiking & trails','Bushcraft'].map(t => (
                <div key={t} style={{ fontSize:13, fontWeight:600, color:C.mid, backgroundColor:C.s1, border:`1px solid ${C.border}`, padding:'8px 16px', borderRadius:6 }}>{t}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Waitlist */}
        <div style={{ backgroundColor:C.s1, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, padding:'80px 24px' }} id="waitlist">
          <div style={{ maxWidth:580, margin:'0 auto', textAlign:'center' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:10, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:C.gold, backgroundColor:C.goldDim, border:`1px solid ${C.goldBorder}`, padding:'5px 13px', borderRadius:4, marginBottom:24 }}>
              <div style={{ width:5, height:5, borderRadius:'50%', backgroundColor:C.green, animation:'pulse 2s ease infinite' }} />
              {count} outdoor creators already waiting
            </div>
            <h2 style={{ fontSize:'clamp(28px,4vw,46px)', fontWeight:900, letterSpacing:'-1.5px', marginBottom:14 }}>Get founding member access.</h2>
            <p style={{ fontSize:16, color:C.muted, lineHeight:1.65, maxWidth:440, margin:'0 auto 32px' }}>
              Founding members lock in the lowest pricing forever. We launch Monday Brief first — join now and you'll be in the first batch.
            </p>
            {!joined ? (
              <>
                <div style={{ display:'flex', gap:10, maxWidth:420, margin:'0 auto', flexWrap:'wrap', justifyContent:'center' }}>
                  <input style={inp} type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key==='Enter' && joinWaitlist()} />
                  <button style={btn} onClick={joinWaitlist}>Join Waitlist →</button>
                </div>
                <p style={{ fontSize:11, color:C.muted, marginTop:14 }}>No spam. No credit card. Founding price locked when you join.</p>
              </>
            ) : (
              <div style={{ backgroundColor:C.greenDim, border:`1px solid ${C.greenBorder}`, borderRadius:10, padding:'22px 28px', maxWidth:400, margin:'0 auto' }}>
                <div style={{ fontSize:20, fontWeight:800, color:C.green, marginBottom:8 }}>✓ You're in.</div>
                <div style={{ fontSize:14, color:C.mid, lineHeight:1.65 }}>You're #{count} on the list. We'll email you when Monday Brief goes live — before we open to the public.</div>
              </div>
            )}
          </div>
        </div>

        <footer style={{ padding:'28px 36px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, fontWeight:800 }}>
            <div style={{ width:6, height:6, borderRadius:'50%', backgroundColor:C.gold }} />
            DownRange<span style={{ color:C.gold }}>Creator</span>
          </div>
          <div style={{ fontSize:12, color:C.muted }}>YouTube intel for the niche nobody built for.</div>
          <div style={{ fontSize:11, color:C.muted }}>© 2026 DownRange Co. · Washington State</div>
        </footer>
      </div>
    </>
  );
}
