import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

const C = {
  bg:'#07090B', s1:'#0C0E11', s2:'#111316', s3:'#161A1E', s4:'#1C2026',
  border:'#1C1F24', hi:'#252930',
  gold:'#C8922A', goldDim:'#C8922A18', goldBorder:'#C8922A38', goldLight:'#E4A83C', goldGlow:'#C8922A40',
  green:'#22C55E', greenDim:'#22C55E14', greenBorder:'#22C55E35',
  blue:'#60A5FA', blueDim:'#60A5FA14',
  purple:'#A78BFA', purpleDim:'#A78BFA14',
  text:'#EDE8DF', mid:'#8C8F96', muted:'#52555C', red:'#EF4444',
};

const TICKER = ['🎯 "308 deer rifle scope" — 5.1× outlier · 8 min ago · Montana channel','📈 Waterfowl decoy setup video trending 3.8× above avg this week','🔥 Gap confirmed: "best budget trail cam under $60" — zero dominant video','⚡ CCW instructor channels: Wednesday 3pm posting = 2.1× algorithm boost','🎯 "Turkey call comparison" hitting 6.2× in Southeast hunting channels','📊 Long-range shooting content surging +34% this month · low competition','🔥 Suppressor review niche: 2.9× avg · FFL dealers not posting consistently'];
const QUICK = ['deer hunting','CCW & concealed carry','waterfowl hunting','long-range shooting','archery & bowhunting'];

function useReveal(t=0.1){const r=useRef(null);const[v,setV]=useState(false);useEffect(()=>{const io=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:t});if(r.current)io.observe(r.current);return()=>io.disconnect();},[]);return[r,v];}
function useLiveCount(base=412){const[n,setN]=useState(base);useEffect(()=>{const t=setInterval(()=>{if(Math.random()>.65)setN(v=>v+1);},9000);return()=>clearInterval(t);},[]);return n;}
function useBar(target,active,delay=200){const[w,setW]=useState(0);useEffect(()=>{if(!active)return;const t=setTimeout(()=>setW(target),delay);return()=>clearTimeout(t);},[target,active,delay]);return w;}

function Dot({color=C.green,pulse=false,size=7}){return<div style={{width:size,height:size,borderRadius:'50%',backgroundColor:color,boxShadow:`0 0 ${size+2}px ${color}`,flexShrink:0,animation:pulse?'pulse 2s ease infinite':'none'}}/>;}
function ConfBar({value,color=C.gold,active,delay=200}){const w=useBar(value,active,delay);return<div style={{height:3,backgroundColor:C.s4,borderRadius:2,overflow:'hidden'}}><div style={{height:'100%',backgroundColor:color,width:`${w}%`,borderRadius:2,transition:'width 1.1s cubic-bezier(.34,1.2,.64,1)',boxShadow:`0 0 6px ${color}50`}}/></div>;}

// ── THUMBNAIL BLUEPRINT ──────────────────────────────────────────
function ThumbnailBlueprint({concept}){
  const tc=concept||{leftSide:'Product on dark bg',rightSide:'Creator reaction',textOverlay:'BOLD TITLE TEXT',emoji:'🎯'};
  return(
    <div style={{width:'100%',aspectRatio:'16/9',backgroundColor:'#0A0A0E',borderRadius:8,overflow:'hidden',position:'relative',border:`1px solid ${C.border}`}}>
      <div style={{position:'absolute',left:0,top:0,bottom:0,width:'58%',background:'linear-gradient(135deg,#12161A 0%,#1C222A 100%)',display:'flex',alignItems:'center',justifyContent:'center',borderRight:`1px solid ${C.border}`}}>
        <div style={{textAlign:'center'}}><div style={{fontSize:28,marginBottom:6}}>{tc.emoji||'🎯'}</div><div style={{fontSize:9,color:C.muted,maxWidth:80,lineHeight:1.4,textAlign:'center'}}>{tc.leftSide}</div></div>
      </div>
      <div style={{position:'absolute',right:0,top:0,bottom:0,width:'42%',background:'linear-gradient(135deg,#161C20 0%,#242C34 100%)',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{textAlign:'center'}}><div style={{fontSize:22,marginBottom:4}}>😮</div><div style={{fontSize:9,color:C.muted,maxWidth:60,lineHeight:1.4,textAlign:'center'}}>{tc.rightSide}</div></div>
      </div>
      <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'6px 8px',background:'linear-gradient(transparent,rgba(0,0,0,.95))'}}>
        <div style={{fontSize:11,fontWeight:900,color:'#fff',textTransform:'uppercase',letterSpacing:'-0.2px'}}>{tc.textOverlay}</div>
      </div>
      <div style={{position:'absolute',top:6,right:6,backgroundColor:C.gold,color:'#000',fontSize:9,fontWeight:800,padding:'2px 6px',borderRadius:3,letterSpacing:'0.05em'}}>BLUEPRINT</div>
    </div>
  );
}

// ── REDESIGNED MONDAY BRIEF ──────────────────────────────────────
// Philosophy: Action first. Evidence second. One insight per section.
function MondayBriefEmail({data,niche,active}){
  const[copied,setCopied]=useState(false);
  if(!data)return null;

  function copyHook(){
    if(data.nextVideo?.scriptHook){
      navigator.clipboard?.writeText(data.nextVideo.scriptHook).catch(()=>{});
      setCopied(true);setTimeout(()=>setCopied(false),2500);
    }
  }

  const SectionLabel=({icon,text,right})=>(
    <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:16}}>
      <span style={{fontSize:14}}>{icon}</span>
      <span style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:'uppercase',letterSpacing:'0.12em'}}>{text}</span>
      <div style={{flex:1,height:1,backgroundColor:C.border}}/>
      {right&&<span style={{fontSize:10,color:C.muted}}>{right}</span>}
    </div>
  );

  const mult=data.outliers?.[0]?.multiplier||'5.2x';
  const multCol=parseFloat(mult)>=5?C.green:C.gold;

  return(
    <div style={{backgroundColor:'#09090D',border:`1px solid ${C.border}`,borderRadius:14,overflow:'hidden',marginTop:28}}>
      {/* Mac chrome */}
      <div style={{backgroundColor:'#0D0F13',borderBottom:`1px solid ${C.border}`,padding:'11px 18px',display:'flex',alignItems:'center',gap:12}}>
        <div style={{display:'flex',gap:6}}>{['#FF5F57','#FFBD2E','#28CA41'].map(c=><div key={c} style={{width:11,height:11,borderRadius:'50%',backgroundColor:c}}/>)}</div>
        <div style={{flex:1,backgroundColor:C.s2,border:`1px solid ${C.border}`,borderRadius:6,padding:'3px 12px',fontSize:11,color:C.muted,textAlign:'center'}}>intel@downrangecreator.com</div>
        <Dot color={C.green} size={6}/>
      </div>

      {/* Email meta */}
      <div style={{backgroundColor:C.s1,borderBottom:`1px solid ${C.border}`,padding:'14px 22px 12px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
          <div>
            <div style={{fontSize:11,color:C.muted,marginBottom:3}}><strong style={{color:C.mid}}>From: </strong>DownRange Creator &lt;intel@downrangecreator.com&gt;</div>
            <div style={{fontSize:13,fontWeight:700,color:C.text}}>🎯 Your Monday Brief — {data.niche||niche}</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:10,color:C.muted,fontFamily:'monospace'}}>{new Date().toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',year:'numeric'})}</div>
            <div style={{fontSize:10,color:C.muted}}>7:00 AM</div>
          </div>
        </div>
      </div>

      <div style={{padding:'26px 24px'}}>

        {/* ── SECTION 1: Niche Health — compact strip ── */}
        <div style={{backgroundColor:C.s2,border:`1px solid ${C.border}`,borderRadius:8,padding:'12px 16px',marginBottom:26,display:'flex',alignItems:'center',gap:16,flexWrap:'wrap'}}>
          <div style={{flex:1,minWidth:160}}>
            <div style={{fontSize:10,color:C.muted,marginBottom:4,textTransform:'uppercase',letterSpacing:'0.08em',fontWeight:700}}>Niche Health — {data.niche}</div>
            <ConfBar value={data.nicheHealth?.score} color={data.nicheHealth?.score>=70?C.green:C.gold} active={active} delay={100}/>
          </div>
          <div style={{display:'flex',gap:20,flexWrap:'wrap'}}>
            <div style={{textAlign:'center'}}><div style={{fontSize:20,fontWeight:900,color:data.nicheHealth?.score>=70?C.green:C.gold,lineHeight:1}}>{data.nicheHealth?.score}</div><div style={{fontSize:9,color:C.muted,textTransform:'uppercase'}}>{data.nicheHealth?.label}</div></div>
            <div style={{textAlign:'center'}}><div style={{fontSize:16,fontWeight:800,color:C.text,lineHeight:1}}>{data.nicheHealth?.weeklyGrowth||'+7%'}</div><div style={{fontSize:9,color:C.muted,textTransform:'uppercase'}}>This week</div></div>
            <div style={{textAlign:'center'}}><div style={{fontSize:16,fontWeight:800,color:C.text,lineHeight:1}}>{data.channelsScanned}</div><div style={{fontSize:9,color:C.muted,textTransform:'uppercase'}}>Channels</div></div>
          </div>
        </div>

        {/* ── SECTION 2: YOUR VIDEO THIS WEEK — THE HERO ── */}
        <div style={{backgroundColor:`${C.gold}0A`,border:`1px solid ${C.goldBorder}`,borderRadius:12,padding:'22px 20px',marginBottom:22}}>
          <SectionLabel icon="🎯" text="Your Video This Week"/>
          <div style={{fontSize:'clamp(16px,2.5vw,22px)',fontWeight:900,color:C.text,lineHeight:1.25,marginBottom:14,letterSpacing:'-0.5px'}}>
            "{data.nextVideo?.title}"
          </div>
          <div style={{display:'flex',gap:16,flexWrap:'wrap',marginBottom:14}}>
            {[['Publish',data.nextVideo?.publishDay],['Length',data.nextVideo?.length],['Time',data.nextVideo?.publishTime]].map(([l,v])=>(
              <div key={l} style={{backgroundColor:C.s3,border:`1px solid ${C.border}`,borderRadius:6,padding:'7px 12px',minWidth:80,textAlign:'center'}}>
                <div style={{fontSize:10,color:C.muted,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:2}}>{l}</div>
                <div style={{fontSize:13,fontWeight:700,color:C.text}}>{v}</div>
              </div>
            ))}
            <div style={{backgroundColor:C.s3,border:`1px solid ${C.goldBorder}`,borderRadius:6,padding:'7px 12px',minWidth:80,textAlign:'center'}}>
              <div style={{fontSize:10,color:C.muted,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:2}}>Viral Score</div>
              <div style={{fontSize:13,fontWeight:700,color:C.gold}}>{data.nextVideo?.viralScore||86}/100</div>
            </div>
          </div>
          <div style={{fontSize:13,color:C.mid,lineHeight:1.65,borderLeft:`2px solid ${C.goldBorder}`,paddingLeft:12}}>
            {data.nextVideo?.angle}
          </div>
        </div>

        {/* ── SECTION 3: Script Hook — isolated, ready to read ── */}
        {data.nextVideo?.scriptHook&&(
          <div style={{backgroundColor:C.s2,border:`1px solid ${C.border}`,borderRadius:12,padding:'20px 20px',marginBottom:22}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14,flexWrap:'wrap',gap:8}}>
              <SectionLabel icon="🎙" text="Read This On Camera — First 30 Seconds"/>
              <button onClick={copyHook} style={{fontSize:11,fontWeight:700,color:copied?C.green:C.gold,backgroundColor:copied?C.greenDim:C.goldDim,border:`1px solid ${copied?C.greenBorder:C.goldBorder}`,padding:'5px 12px',borderRadius:5,cursor:'pointer',fontFamily:'inherit',flexShrink:0,marginTop:-8}}>
                {copied?'✓ Copied!':'Copy to clipboard'}
              </button>
            </div>
            <div style={{fontSize:14,color:C.text,lineHeight:1.8,fontStyle:'italic',backgroundColor:`${C.gold}06`,border:`1px solid ${C.goldBorder}`,borderRadius:8,padding:'16px 18px',position:'relative'}}>
              <span style={{position:'absolute',top:10,left:12,fontSize:24,color:C.goldBorder,lineHeight:1,fontStyle:'normal',fontWeight:900}}>"</span>
              <div style={{paddingLeft:18}}>"{data.nextVideo.scriptHook}"</div>
            </div>
            <div style={{fontSize:11,color:C.muted,marginTop:10}}>↳ Open with this hook verbatim. The first 30 seconds determine whether viewers stay.</div>
          </div>
        )}

        {/* ── SECTION 4: Thumbnail Blueprint ── */}
        {data.nextVideo?.thumbnailConcept&&(
          <div style={{marginBottom:22}}>
            <SectionLabel icon="🖼" text="Thumbnail Blueprint" right="Build this in Canva"/>
            <ThumbnailBlueprint concept={data.nextVideo.thumbnailConcept}/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginTop:10}}>
              {[['Left side',data.nextVideo.thumbnailConcept.leftSide],['Right side',data.nextVideo.thumbnailConcept.rightSide],['Text overlay',data.nextVideo.thumbnailConcept.textOverlay]].map(([l,v])=>(
                <div key={l} style={{backgroundColor:C.s2,border:`1px solid ${C.border}`,borderRadius:6,padding:'8px 10px'}}>
                  <div style={{fontSize:9,color:C.muted,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:3}}>{l}</div>
                  <div style={{fontSize:11,color:C.text,lineHeight:1.4}}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SECTION 5: Why it works (compact) ── */}
        {data.nextVideo?.reasons?.length>0&&(
          <div style={{marginBottom:22}}>
            <SectionLabel icon="📊" text="Why This Will Perform"/>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {data.nextVideo.reasons.map((r,i)=>(
                <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start',backgroundColor:C.s2,border:`1px solid ${C.border}`,borderRadius:7,padding:'10px 14px'}}>
                  <span style={{color:C.gold,fontSize:12,fontFamily:'monospace',fontWeight:700,flexShrink:0,marginTop:1}}>0{i+1}</span>
                  <span style={{fontSize:12,color:C.mid,lineHeight:1.55}}>{r}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SECTION 6: This week's outliers — compact reference ── */}
        <div style={{marginBottom:6}}>
          <SectionLabel icon="📈" text="This Week's Top Performers" right={`Baseline: ~${Math.round((data.avgChannelViews||38000)/1000)}K avg`}/>
          {data.outliers?.slice(0,3).map((v,i)=>(
            <div key={i} style={{display:'flex',gap:10,alignItems:'center',padding:'8px 0',borderBottom:i<2?`1px solid ${C.border}`:'none'}}>
              <span style={{fontSize:11,fontWeight:800,color:parseFloat(v.multiplier)>=5?C.green:parseFloat(v.multiplier)>=3.5?C.gold:C.blue,backgroundColor:`${parseFloat(v.multiplier)>=5?C.green:parseFloat(v.multiplier)>=3.5?C.gold:C.blue}18`,padding:'2px 7px',borderRadius:3,whiteSpace:'nowrap',fontFamily:'monospace'}}>{v.multiplier}</span>
              <span style={{fontSize:12,color:C.text,flex:1,lineHeight:1.35}}>{v.title}</span>
              <span style={{fontSize:11,color:C.muted,whiteSpace:'nowrap'}}>{Math.round((v.views||0)/1000)}K</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{marginTop:22,paddingTop:14,borderTop:`1px solid ${C.border}`,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
          <div style={{display:'flex',alignItems:'center',gap:6}}><Dot color={C.gold} size={5}/><span style={{fontSize:11,fontWeight:700,color:C.muted}}>DownRange Creator</span></div>
          <span style={{fontSize:11,color:C.muted}}>Unsubscribe · Manage preferences</span>
        </div>
      </div>
    </div>
  );
}

// ── COMPARISON SECTION — Real product mockups ────────────────────
// Based on actual research: TubeLab = database browser, VidIQ = daily idea cards
function ComparisonSection({active}){
  const [selected,setSelected]=useState('downrange');

  const tools=[
    {id:'tubelab',label:'TubeLab',price:'$29/mo',tagline:'5M+ videos to browse yourself'},
    {id:'vidiq',label:'VidIQ',price:'From $16.58/mo',tagline:'50 daily idea cards'},
    {id:'downrange',label:'DownRange Creator',price:'$29/mo',tagline:'Brief delivered to you',featured:true},
  ];

  return(
    <div style={{backgroundColor:C.s1,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,padding:'80px 24px'}}>
      <div style={{maxWidth:1040,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:40}}>
          <div style={{fontSize:10,fontWeight:700,color:C.gold,letterSpacing:'0.14em',textTransform:'uppercase',marginBottom:14}}>Real Comparison</div>
          <h2 style={{fontSize:'clamp(26px,3.8vw,42px)',fontWeight:900,letterSpacing:'-1.2px',marginBottom:14}}>Same niche. Different results.</h2>
          <p style={{fontSize:15,color:C.muted,maxWidth:500,margin:'0 auto',lineHeight:1.7}}>Here's exactly what you get from each tool when you type "deer hunting." Not a feature list — the actual interface.</p>
        </div>

        {/* Tab selector */}
        <div style={{display:'flex',gap:8,justifyContent:'center',marginBottom:24,flexWrap:'wrap'}}>
          {tools.map(t=>(
            <button key={t.id} onClick={()=>setSelected(t.id)} style={{fontSize:13,fontWeight:700,color:selected===t.id?(t.featured?'#000':C.text):C.muted,backgroundColor:selected===t.id?(t.featured?C.gold:C.s3):C.s2,border:`1px solid ${selected===t.id?(t.featured?C.gold:C.hi):C.border}`,padding:'9px 18px',borderRadius:8,cursor:'pointer',fontFamily:'inherit',transition:'all .15s'}}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Mockup display */}
        <div style={{position:'relative'}}>
          {selected==='tubelab'&&<TubeLabMockup/>}
          {selected==='vidiq'&&<VidIQMockup/>}
          {selected==='downrange'&&<DownRangeMockup/>}
        </div>

        {/* Bottom verdict row */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginTop:20}}>
          {[
            {id:'tubelab',verdict:'You search 5M+ videos and build your own patterns.',pain:'No email. No niche knowledge. No script. Just a library.',col:C.muted},
            {id:'vidiq',verdict:'You get 50 generic idea cards every day to swipe.',pain:'Same AI suggestions as 20M other creators. No outlier data.',col:C.muted},
            {id:'downrange',verdict:'Your brief arrives Monday at 7am. You just press record.',pain:'Niche-specific intel. Script hook. Thumbnail blueprint.',col:C.gold,win:true},
          ].map(({id,verdict,pain,col,win})=>(
            <div key={id} onClick={()=>setSelected(id)} style={{backgroundColor:win?`${C.gold}08`:C.s2,border:`1px solid ${win?C.goldBorder:C.border}`,borderRadius:10,padding:'16px 16px',cursor:'pointer',transition:'all .15s',opacity:selected===id?1:0.7}}>
              <div style={{fontSize:13,fontWeight:700,color:win?C.gold:C.text,marginBottom:6,lineHeight:1.4}}>{verdict}</div>
              <div style={{fontSize:11,color:C.muted,lineHeight:1.55}}>{pain}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TubeLabMockup(){
  const videos=[
    {mult:'8.2x',title:'I Found the Best Deer Hunting Spot in America',ch:'OutdoorPassion',views:'2.1M',days:3,niche:'Hunting'},
    {mult:'7.1x',title:'10 Deer Hunting Tips That Actually Work',ch:'HunterPro',views:'1.8M',days:7,niche:'Outdoor'},
    {mult:'6.4x',title:'Budget Deer Rifle That Outshot My $3,000 Setup',ch:'RifleReview',views:'1.4M',days:12,niche:'Firearms'},
    {mult:'5.8x',title:'Why I Switched From Rifle to Bow Hunting',ch:'BowLife',views:'1.1M',days:15,niche:'Hunting'},
    {mult:'5.1x',title:'The PERFECT Deer Stand Location Formula',ch:'DeerScouts',views:'980K',days:19,niche:'Deer'},
    {mult:'4.7x',title:'Best Trail Camera Under $100 (Tested 12 Cams)',ch:'GearTest',views:'890K',days:22,niche:'Gear'},
  ];
  return(
    <div style={{backgroundColor:'#0E1115',border:`1px solid #232830`,borderRadius:12,overflow:'hidden',fontFamily:'inherit'}}>
      {/* Header */}
      <div style={{backgroundColor:'#0A0D10',borderBottom:`1px solid #1A1E24`,padding:'14px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:20,height:20,backgroundColor:'#2A6EFF',borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:800,color:'#fff'}}>T</div>
          <span style={{fontSize:14,fontWeight:700,color:'#E8EAF0'}}>Outliers Finder</span>
          <span style={{fontSize:11,color:'#606570',marginLeft:8}}>5,247,832 videos</span>
        </div>
        <div style={{display:'flex',gap:8}}>
          <div style={{fontSize:11,backgroundColor:'#1A1E24',border:`1px solid #2A2E35`,borderRadius:5,padding:'5px 10px',color:'#8090A0'}}>Niche: All ▼</div>
          <div style={{fontSize:11,backgroundColor:'#1A1E24',border:`1px solid #2A2E35`,borderRadius:5,padding:'5px 10px',color:'#8090A0'}}>Multiplier ▼</div>
          <div style={{fontSize:11,backgroundColor:'#1A1E24',border:`1px solid #2A2E35`,borderRadius:5,padding:'5px 10px',color:'#8090A0'}}>RPM ▼</div>
          <div style={{fontSize:11,backgroundColor:'#1A1E24',border:`1px solid #2A2E35`,borderRadius:5,padding:'5px 10px',color:'#8090A0'}}>+17 filters</div>
        </div>
      </div>
      {/* Search */}
      <div style={{padding:'12px 20px',borderBottom:`1px solid #1A1E24`,backgroundColor:'#0C0F13'}}>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <div style={{flex:1,backgroundColor:'#161A20',border:`1px solid #2A2E35`,borderRadius:6,padding:'8px 12px',fontSize:13,color:'#8090A0',display:'flex',alignItems:'center',gap:8}}>
            <span style={{fontSize:14,color:'#404550'}}>🔍</span>deer hunting
          </div>
          <div style={{fontSize:12,backgroundColor:'#2A6EFF',color:'#fff',padding:'8px 16px',borderRadius:6,fontWeight:700,cursor:'pointer'}}>Search</div>
        </div>
      </div>
      {/* Results */}
      <div style={{maxHeight:320,overflowY:'auto'}}>
        {videos.map((v,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'40px auto 1fr auto auto',gap:12,padding:'11px 20px',borderBottom:`1px solid #151820`,alignItems:'center'}}>
            <div style={{width:40,height:28,backgroundColor:'#1A1E26',borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,color:'#404550'}}>▶</div>
            <span style={{fontSize:11,fontWeight:800,color:'#2A6EFF',backgroundColor:'#2A6EFF18',border:'1px solid #2A6EFF30',padding:'2px 7px',borderRadius:3,whiteSpace:'nowrap',fontFamily:'monospace'}}>{v.mult}</span>
            <div>
              <div style={{fontSize:12,fontWeight:600,color:'#D0D4DC',lineHeight:1.3,marginBottom:3}}>{v.title}</div>
              <div style={{fontSize:10,color:'#606570'}}>{v.ch} · {v.days}d ago · {v.niche}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:13,fontWeight:700,color:'#D0D4DC'}}>{v.views}</div>
              <div style={{fontSize:10,color:'#606570'}}>views</div>
            </div>
            <div style={{display:'flex',gap:6}}>
              <div style={{width:24,height:24,backgroundColor:'#1A1E24',border:`1px solid #2A2E35`,borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,cursor:'pointer',color:'#606570'}}>💾</div>
              <div style={{width:24,height:24,backgroundColor:'#1A1E24',border:`1px solid #2A2E35`,borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,cursor:'pointer',color:'#606570'}}>↗</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{padding:'12px 20px',backgroundColor:'#0A0D10',borderTop:`1px solid #1A1E24`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:11,color:'#606570'}}>Showing 6 of 5,247,832 results</span>
        <div style={{fontSize:12,backgroundColor:'#1A1E24',border:`1px solid #2A2E35`,borderRadius:5,padding:'6px 14px',color:'#8090A0',cursor:'pointer'}}>Load 50 more →</div>
      </div>
      <div style={{padding:'12px 20px',backgroundColor:`${C.red}08`,borderTop:`1px solid ${C.red}20`,display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontSize:13}}>⚠️</span>
        <span style={{fontSize:11,color:'#F87171'}}>No script. No thumbnail brief. No email delivery. You must log in and browse to find your patterns manually.</span>
      </div>
    </div>
  );
}

function VidIQMockup(){
  const ideas=[
    {score:'Very High',title:'Best Deer Hunting Rifles for Beginners in 2026',views:'Est. 45K–120K views',tag:'Trending'},
    {score:'High',title:'10 Mistakes New Deer Hunters Make (And How to Fix Them)',views:'Est. 32K–89K views',tag:'Evergreen'},
    {score:'High',title:'How to Find the Perfect Deer Stand Location',views:'Est. 28K–74K views',tag:'Seasonal'},
    {score:'Medium',title:'Trail Camera Setup Tips for Early Season Scouting',views:'Est. 18K–45K views',tag:'Gear'},
    {score:'Medium',title:'Deer Hunting Gear I Wish I Had When Starting',views:'Est. 15K–38K views',tag:'Beginner'},
  ];
  const scoreCol={[`Very High`]:C.green,[`High`]:'#F59E0B',[`Medium`]:C.blue};
  return(
    <div style={{backgroundColor:'#0E1115',border:`1px solid #232830`,borderRadius:12,overflow:'hidden',fontFamily:'inherit'}}>
      {/* Header */}
      <div style={{backgroundColor:'#0A0D10',borderBottom:`1px solid #1A1E24`,padding:'14px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:20,height:20,backgroundColor:'#1D9BF0',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:800,color:'#fff'}}>V</div>
          <span style={{fontSize:14,fontWeight:700,color:'#E8EAF0'}}>Daily Ideas</span>
          <span style={{fontSize:10,color:'#22C55E',backgroundColor:'#22C55E18',padding:'2px 8px',borderRadius:10,fontWeight:700,marginLeft:4}}>50 new today</span>
        </div>
        <span style={{fontSize:11,color:'#606570'}}>Monday, Jun 16</span>
      </div>
      <div style={{padding:'10px 20px',backgroundColor:'#0C0F13',borderBottom:`1px solid #1A1E24`}}>
        <span style={{fontSize:12,color:'#606570'}}>Personalized for your channel · Powered by machine learning · Based on your recent uploads</span>
      </div>
      {/* Idea cards */}
      <div style={{padding:'14px 20px',display:'flex',flexDirection:'column',gap:10,maxHeight:320,overflowY:'auto'}}>
        {ideas.map((idea,i)=>(
          <div key={i} style={{backgroundColor:'#141820',border:`1px solid #1E2228`,borderRadius:9,padding:'14px 16px',display:'flex',gap:12,alignItems:'flex-start'}}>
            <div style={{flex:1}}>
              <div style={{display:'flex',gap:6,alignItems:'center',marginBottom:8,flexWrap:'wrap'}}>
                <span style={{fontSize:10,fontWeight:700,color:scoreCol[idea.score]||C.blue,backgroundColor:`${scoreCol[idea.score]||C.blue}18`,padding:'2px 7px',borderRadius:3}}>🔥 {idea.score} Views</span>
                <span style={{fontSize:10,color:'#606570',backgroundColor:'#1A1E24',padding:'2px 7px',borderRadius:3}}>{idea.tag}</span>
              </div>
              <div style={{fontSize:13,fontWeight:600,color:'#D0D4DC',lineHeight:1.4,marginBottom:6}}>{idea.title}</div>
              <div style={{fontSize:11,color:'#606570'}}>{idea.views}</div>
            </div>
            <div style={{display:'flex',flex:'column',gap:6,flexShrink:0,paddingTop:4}}>
              <div style={{fontSize:18,cursor:'pointer',color:'#22C55E'}}>✓</div>
              <div style={{fontSize:18,cursor:'pointer',color:'#F87171'}}>✗</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{padding:'10px 20px',backgroundColor:'#0A0D10',borderTop:`1px solid #1A1E24`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:11,color:'#606570'}}>+45 more ideas available</span>
        <span style={{fontSize:11,color:'#1D9BF0',cursor:'pointer'}}>View all ideas →</span>
      </div>
      <div style={{padding:'12px 20px',backgroundColor:`${C.red}08`,borderTop:`1px solid ${C.red}20`,display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontSize:13}}>⚠️</span>
        <span style={{fontSize:11,color:'#F87171'}}>These same ideas go to 20M+ VidIQ users. No outlier detection. No script hook. No thumbnail blueprint. No email delivery.</span>
      </div>
    </div>
  );
}

function DownRangeMockup(){
  return(
    <div style={{backgroundColor:'#09090D',border:`1px solid ${C.goldBorder}`,borderRadius:12,overflow:'hidden'}}>
      {/* Chrome */}
      <div style={{backgroundColor:'#0D0F13',borderBottom:`1px solid ${C.border}`,padding:'11px 18px',display:'flex',alignItems:'center',gap:12}}>
        <div style={{display:'flex',gap:6}}>{['#FF5F57','#FFBD2E','#28CA41'].map(c=><div key={c} style={{width:11,height:11,borderRadius:'50%',backgroundColor:c}}/>)}</div>
        <div style={{flex:1,backgroundColor:C.s2,border:`1px solid ${C.border}`,borderRadius:6,padding:'3px 12px',fontSize:11,color:C.muted,textAlign:'center'}}>intel@downrangecreator.com</div>
        <Dot color={C.green} size={6}/>
      </div>
      {/* Email preview */}
      <div style={{backgroundColor:C.s1,borderBottom:`1px solid ${C.border}`,padding:'12px 20px'}}>
        <div style={{fontSize:11,color:C.muted,marginBottom:3}}><strong style={{color:C.mid}}>From: </strong>DownRange Creator &lt;intel@downrangecreator.com&gt;</div>
        <div style={{fontSize:13,fontWeight:700,color:C.text}}>🎯 Your Monday Brief — Deer Hunting</div>
      </div>
      <div style={{padding:'20px'}}>
        {/* Health strip */}
        <div style={{backgroundColor:C.s2,border:`1px solid ${C.border}`,borderRadius:7,padding:'10px 14px',marginBottom:16,display:'flex',alignItems:'center',gap:14}}>
          <div style={{flex:1}}><div style={{fontSize:10,color:C.muted,marginBottom:5}}>NICHE HEALTH — Deer Hunting</div><div style={{height:3,backgroundColor:C.s4,borderRadius:2}}><div style={{height:'100%',width:'74%',backgroundColor:C.green,borderRadius:2}}/></div></div>
          <div style={{fontSize:18,fontWeight:900,color:C.green}}>74</div>
          <div style={{fontSize:12,fontWeight:700,color:C.mid}}>+8% ↑</div>
        </div>
        {/* YOUR VIDEO */}
        <div style={{backgroundColor:`${C.gold}0A`,border:`1px solid ${C.goldBorder}`,borderRadius:10,padding:'16px 16px',marginBottom:14}}>
          <div style={{fontSize:9,fontWeight:700,color:C.muted,textTransform:'uppercase',letterSpacing:'0.12em',marginBottom:10}}>🎯 YOUR VIDEO THIS WEEK</div>
          <div style={{fontSize:16,fontWeight:900,color:C.text,lineHeight:1.25,marginBottom:12,letterSpacing:'-0.3px'}}>"I Tested 5 Budget Trail Cams — One Shocked Me"</div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {[['Post','Wednesday'],['Length','14-16 min'],['Time','3pm EST'],['Score','86/100']].map(([l,v])=>(
              <div key={l} style={{backgroundColor:C.s3,border:`1px solid ${C.border}`,borderRadius:5,padding:'5px 10px',textAlign:'center'}}>
                <div style={{fontSize:9,color:C.muted,textTransform:'uppercase',marginBottom:1}}>{l}</div>
                <div style={{fontSize:11,fontWeight:700,color:l==='Score'?C.gold:C.text}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Script hook */}
        <div style={{backgroundColor:C.s2,border:`1px solid ${C.border}`,borderRadius:8,padding:'12px 14px',marginBottom:14}}>
          <div style={{fontSize:9,fontWeight:700,color:C.muted,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>🎙 READ THIS ON CAMERA (first 30 seconds)</div>
          <div style={{fontSize:12,color:C.text,lineHeight:1.7,fontStyle:'italic'}}>"Most hunters spend $200 or more on trail cameras and never capture what they're actually looking for. Today I'm testing 5 budget options under $60..."</div>
        </div>
        {/* Top outliers compact */}
        <div>
          <div style={{fontSize:9,fontWeight:700,color:C.muted,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>📈 THIS WEEK'S TOP OUTLIERS</div>
          {[['5.2x','I Tested 5 Budget Trail Cams...','298K'],['3.9x','Why I Switched From Rifle to Bow','187K'],['3.2x','10 Deer Scouting Mistakes','152K']].map(([m,t,v],i)=>(
            <div key={i} style={{display:'flex',gap:8,alignItems:'center',padding:'6px 0',borderBottom:i<2?`1px solid ${C.border}`:'none'}}>
              <span style={{fontSize:10,fontWeight:800,color:parseFloat(m)>=5?C.green:C.gold,fontFamily:'monospace'}}>{m}</span>
              <span style={{fontSize:11,color:C.text,flex:1}}>{t}</span>
              <span style={{fontSize:10,color:C.muted}}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{padding:'12px 20px',backgroundColor:`${C.green}08`,borderTop:`1px solid ${C.green}20`,display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontSize:13}}>✅</span>
        <span style={{fontSize:11,color:C.green}}>Delivered to your inbox Monday 7am. Niche-specific. Includes script hook + thumbnail blueprint. No login required.</span>
      </div>
    </div>
  );
}

// ── MAIN PAGE ────────────────────────────────────────────────────
export default function Home(){
  const[niche,setNiche]=useState('');
  const[loading,setLoading]=useState(false);
  const[briefData,setBriefData]=useState(null);
  const[animActive,setAnimActive]=useState(false);
  const[email,setEmail]=useState('');
  const[joined,setJoined]=useState(false);
  const[error,setError]=useState('');
  const count=useLiveCount(412);
  const demoRef=useRef(null);

  const[heroRef,heroV]=useReveal(0.1);
  const[probRef,probV]=useReveal(0.1);
  const[howRef,howV]=useReveal(0.1);
  const[suiteRef,suiteV]=useReveal(0.1);
  const[pricingRef,pricingV]=useReveal(0.1);
  const[faqRef,faqV]=useReveal(0.1);

  async function runDemo(n){
    const q=(n||niche).trim();
    if(!q)return;
    setNiche(q);setLoading(true);setBriefData(null);setAnimActive(false);setError('');
    try{
      const res=await fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({niche:q})});
      if(!res.ok)throw new Error();
      const data=await res.json();
      setBriefData(data);
      setTimeout(()=>setAnimActive(true),150);
    }catch{setError('Analysis failed. Please try again.');}
    finally{setLoading(false);}
  }

  async function joinTrial(){
    if(!email.includes('@'))return;
    try{await fetch('/api/waitlist',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,niche})});}catch{}
    setJoined(true);
  }

  const anim=(v,d=0)=>({opacity:v?1:0,transform:v?'translateY(0)':'translateY(22px)',transition:`opacity .65s ${d}s ease,transform .65s ${d}s ease`});
  const btnP={fontSize:14,fontWeight:700,color:'#000',backgroundColor:C.gold,padding:'14px 28px',borderRadius:8,border:'none',cursor:'pointer',fontFamily:'inherit',letterSpacing:'0.02em',boxShadow:`0 4px 20px ${C.goldGlow}`};
  const btnG={fontSize:14,fontWeight:600,color:C.mid,backgroundColor:'transparent',padding:'14px 28px',borderRadius:8,border:`1px solid ${C.border}`,cursor:'pointer',fontFamily:'inherit'};
  const inp={flex:1,minWidth:200,padding:'14px 16px',fontSize:14,backgroundColor:C.s2,border:`1px solid ${C.border}`,borderRadius:8,color:C.text,fontFamily:'inherit',outline:'none'};

  return(
    <>
      <Head>
        <title>DownRange Creator — YouTube Intelligence for Outdoor & Firearms Creators</title>
        <meta name="description" content="Weekly channel briefs, outlier detection, and sponsor deal tools built for firearms, hunting, and outdoor YouTube creators. 7-day free trial."/>
        <meta property="og:title" content="DownRange Creator — YouTube Intel for Outdoor Creators"/>
        <meta property="og:description" content="Stop using generic tools. Get YouTube intelligence built for your niche."/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' fill='none' stroke='%23C8922A' stroke-width='8'/><line x1='50' y1='10' x2='50' y2='40' stroke='%23C8922A' stroke-width='4'/><line x1='50' y1='60' x2='50' y2='90' stroke='%23C8922A' stroke-width='4'/><line x1='10' y1='50' x2='40' y2='50' stroke='%23C8922A' stroke-width='4'/><line x1='60' y1='50' x2='90' y2='50' stroke='%23C8922A' stroke-width='4'/></svg>"/>
        <style>{`*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{-webkit-font-smoothing:antialiased;scroll-behavior:smooth}body{background:#07090B;color:#EDE8DF;font-family:'Inter','SF Pro Display',system-ui,sans-serif}@keyframes reticle{to{transform:translate(-50%,-50%) rotate(360deg)}}@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.35}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}input:focus{outline:none;border-color:#C8922A70!important;box-shadow:0 0 0 3px #C8922A12}button:hover:not(:disabled){opacity:.86;transition:opacity .15s}.ch{transition:border-color .2s,box-shadow .2s}.ch:hover{border-color:#C8922A40!important;box-shadow:0 0 24px #C8922A14}::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#1C1F24;border-radius:2px}`}</style>
      </Head>
      <div style={{minHeight:'100vh',backgroundColor:C.bg}}>

        {/* TICKER */}
        <div style={{backgroundColor:'#08090D',borderBottom:`1px solid ${C.border}`,padding:'9px 0',overflow:'hidden'}}>
          <div style={{display:'flex',gap:60,whiteSpace:'nowrap',animation:'ticker 36s linear infinite',fontSize:11,color:C.mid}}>
            {[...TICKER,...TICKER].map((t,i)=><span key={i} style={{flexShrink:0}}>{t}</span>)}
          </div>
        </div>

        {/* NAV */}
        <nav style={{borderBottom:`1px solid ${C.border}`,padding:'15px 36px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,backgroundColor:`${C.bg}F4`,backdropFilter:'blur(16px)',zIndex:50}}>
          <div style={{display:'flex',alignItems:'center',gap:9,fontSize:15,fontWeight:800,letterSpacing:'-0.3px'}}>
            <Dot color={C.gold}/>DownRange<span style={{color:C.gold}}>Creator</span>
          </div>
          <div style={{display:'flex',gap:26,fontSize:13,color:C.muted}}>
            {[['Demo','#demo'],['Compare','#compare'],['Suite','#suite'],['Pricing','#pricing']].map(([l,h])=>(
              <a key={l} href={h} style={{color:C.muted,textDecoration:'none'}}
                onMouseEnter={e=>e.target.style.color=C.text}
                onMouseLeave={e=>e.target.style.color=C.muted}>{l}</a>
            ))}
          </div>
          <button style={btnP} onClick={()=>document.getElementById('trial')?.scrollIntoView({behavior:'smooth'})}>
            Start Free Trial →
          </button>
        </nav>

        {/* HERO */}
        <div style={{position:'relative',overflow:'hidden',borderBottom:`1px solid ${C.border}`}}>
          <div style={{position:'absolute',inset:0,backgroundImage:`linear-gradient(${C.gold}07 1px,transparent 1px),linear-gradient(90deg,${C.gold}07 1px,transparent 1px)`,backgroundSize:'44px 44px',pointerEvents:'none'}}/>
          <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse 60% 50% at 50% 0%,${C.gold}10,transparent)`,pointerEvents:'none'}}/>
          <div ref={heroRef} style={{maxWidth:900,margin:'0 auto',padding:'100px 24px 80px',textAlign:'center',position:'relative',zIndex:1,...anim(heroV)}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:11,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:C.gold,backgroundColor:C.goldDim,border:`1px solid ${C.goldBorder}`,padding:'6px 14px',borderRadius:4,marginBottom:30}}>
              <Dot color={C.green} size={6} pulse/>
              {count} outdoor creators on the waitlist · 7-day free trial
            </div>
            <h1 style={{fontSize:'clamp(42px,7vw,72px)',fontWeight:900,letterSpacing:'-3px',lineHeight:0.98,marginBottom:26,color:C.text}}>
              YouTube intel<br/><span style={{color:C.gold,filter:`drop-shadow(0 0 30px ${C.goldGlow})`}}>built for your niche.</span>
            </h1>
            <p style={{fontSize:18,color:C.muted,lineHeight:1.7,maxWidth:580,margin:'0 auto 44px'}}>
              TubeLab makes you browse 5M videos yourself. VidIQ gives 20M creators the same idea cards. <strong style={{color:C.text,fontWeight:700}}>DownRange Creator</strong> delivers your specific brief — with a ready-to-read script — every Monday at 7am.
            </p>
            <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:52}}>
              <button style={btnP} onClick={()=>demoRef.current?.scrollIntoView({behavior:'smooth'})}>See Monday Brief Live →</button>
              <button style={btnG} onClick={()=>document.getElementById('trial')?.scrollIntoView({behavior:'smooth'})}>Start 7-Day Free Trial</button>
            </div>
            <div style={{display:'flex',justifyContent:'center',gap:0,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,padding:'20px 0'}}>
              {[['No credit card','to start'],['7 days','completely free'],['Your niche','not generic'],['Monday 7am','in your inbox']].map(([n,l],i,a)=>(
                <div key={n} style={{textAlign:'center',padding:'0 28px',borderRight:i<a.length-1?`1px solid ${C.border}`:'none'}}>
                  <div style={{fontSize:15,fontWeight:800,color:C.gold,marginBottom:2}}>{n}</div>
                  <div style={{fontSize:11,color:C.muted}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <svg width={520} height={520} viewBox="0 0 200 200" style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',opacity:0.04,pointerEvents:'none',animation:'reticle 90s linear infinite'}}>
            {[90,62,34].map(r=><circle key={r} cx="100" cy="100" r={r} fill="none" stroke={C.gold} strokeWidth={r===90?'0.5':'0.3'}/>)}
            <circle cx="100" cy="100" r="3.5" fill="none" stroke={C.gold} strokeWidth="1"/>
            {[['100','10','100','68'],['100','132','100','190'],['10','100','68','100'],['132','100','190','100']].map(([x1,y1,x2,y2],i)=><line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.gold} strokeWidth="0.5"/>)}
          </svg>
        </div>

        {/* CREATOR MARQUEE */}
        <div style={{backgroundColor:C.s1,borderBottom:`1px solid ${C.border}`,padding:'18px 0',overflow:'hidden'}}>
          <div style={{display:'flex',gap:12,whiteSpace:'nowrap',animation:'marquee 30s linear infinite'}}>
            {[...['Firearms Instructors','Deer Hunters','CCW Instructors','Bowhunters','Long-Range Shooters','Waterfowl Hunters','Turkey Hunters','Survival Creators','Gear Reviewers','2A Advocates','FFL Dealers','Outdoor Guides','Fly Fishermen','Competitive Shooters','Bushcraft Creators','Hunting Channels'],...['Firearms Instructors','Deer Hunters','CCW Instructors','Bowhunters','Long-Range Shooters','Waterfowl Hunters','Turkey Hunters','Survival Creators','Gear Reviewers','2A Advocates','FFL Dealers','Outdoor Guides','Fly Fishermen','Competitive Shooters','Bushcraft Creators','Hunting Channels']].map((t,i)=>(
              <div key={i} style={{flexShrink:0,fontSize:12,fontWeight:600,color:C.muted,backgroundColor:C.s2,border:`1px solid ${C.border}`,padding:'7px 16px',borderRadius:6}}>{t}</div>
            ))}
          </div>
        </div>

        {/* PROBLEM */}
        <div ref={probRef} style={{padding:'80px 24px',borderBottom:`1px solid ${C.border}`}}>
          <div style={{maxWidth:920,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:48,...anim(probV)}}>
              <div style={{fontSize:10,fontWeight:700,color:C.gold,letterSpacing:'0.14em',textTransform:'uppercase',marginBottom:14}}>The Problem</div>
              <h2 style={{fontSize:'clamp(28px,4vw,44px)',fontWeight:900,letterSpacing:'-1.2px',marginBottom:14}}>Generic tools for generic creators.</h2>
              <p style={{fontSize:15,color:C.muted,maxWidth:520,margin:'0 auto',lineHeight:1.7}}>Your niche has specific terminology, compliance issues, seasonal patterns, and audience behavior that generic tools completely ignore.</p>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:14}}>
              {[['🎯','No niche knowledge',"They don't know that 'suppressors' and 'silencers' are the same keyword. That deer season affects your editorial calendar. That certain CCW content gets age-restricted."],['🤖','Built for automation',"Every tool testimonial is '$500/day faceless channel.' Their product is designed for AI content farms — not for creators who hunt, shoot, and live this content."],['🔄','Same ideas, everywhere',"VidIQ's daily ideas go to 20M+ creators. You're using the same suggestions as every competitor in your niche. There's no edge in a generic tool."],['📬','You have to go find it',"TubeLab has 5M+ outliers — but you have to log in and browse them yourself. We eliminate that friction. Your intel shows up every Monday at 7am."]].map(([i,t,d],idx)=>(
                <div key={t} className="ch" style={{...anim(probV,idx*.08),backgroundColor:C.s1,border:`1px solid ${C.border}`,borderRadius:11,padding:'22px 20px'}}>
                  <div style={{fontSize:26,marginBottom:14}}>{i}</div>
                  <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:8}}>{t}</div>
                  <div style={{fontSize:13,color:C.muted,lineHeight:1.65}}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div ref={howRef} style={{backgroundColor:C.s1,padding:'80px 24px',borderBottom:`1px solid ${C.border}`}}>
          <div style={{maxWidth:820,margin:'0 auto',textAlign:'center'}}>
            <div style={{...anim(howV)}}>
              <div style={{fontSize:10,fontWeight:700,color:C.gold,letterSpacing:'0.14em',textTransform:'uppercase',marginBottom:14}}>How Monday Brief Works</div>
              <h2 style={{fontSize:'clamp(26px,3.8vw,42px)',fontWeight:900,letterSpacing:'-1.2px',marginBottom:48}}>Three steps. Zero effort on your end.</h2>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:0}}>
              {[['01','🔒','Connect your niche','Tell us your focus. Deer hunting, CCW, waterfowl. 30 seconds.'],['02','🔭','We scan every week','We monitor 10+ channels, detect outliers, and extract patterns automatically.'],['03','📬','Monday at 7am','Full brief in your inbox. Outliers, script hook, thumbnail blueprint, and your next video. Done.']].map(([n,icon,title,desc],i,a)=>(
                <div key={n} style={{...anim(howV,.1+i*.12),padding:'28px 28px',borderRight:i<a.length-1?`1px solid ${C.border}`:'none'}}>
                  <div style={{fontSize:48,fontWeight:900,color:C.goldDim,letterSpacing:'-3px',lineHeight:1,marginBottom:14}}>{n}</div>
                  <div style={{fontSize:24,marginBottom:12}}>{icon}</div>
                  <div style={{fontSize:15,fontWeight:700,color:C.text,marginBottom:10}}>{title}</div>
                  <div style={{fontSize:13,color:C.muted,lineHeight:1.65}}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MONDAY BRIEF DEMO */}
        <div ref={demoRef} id="demo" style={{padding:'80px 24px',borderBottom:`1px solid ${C.border}`}}>
          <div style={{maxWidth:720,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:36}}>
              <div style={{fontSize:10,fontWeight:700,color:C.gold,letterSpacing:'0.14em',textTransform:'uppercase',marginBottom:14}}>Live Preview</div>
              <h2 style={{fontSize:'clamp(26px,3.8vw,42px)',fontWeight:900,letterSpacing:'-1.2px',marginBottom:14}}>Monday arrives.<br/>You press record.</h2>
              <p style={{fontSize:15,color:C.muted,lineHeight:1.65,maxWidth:480,margin:'0 auto'}}>Generate a real Monday Brief for any niche below. Every section — script hook, thumbnail blueprint, next video — is exactly what you'd receive.</p>
            </div>
            <div style={{backgroundColor:C.s1,border:`1px solid ${C.border}`,borderRadius:12,padding:'24px'}}>
              <div style={{display:'flex',gap:10,marginBottom:14,flexWrap:'wrap'}}>
                <input style={inp} placeholder="Your content niche — e.g. 'deer hunting' or 'CCW training'" value={niche} onChange={e=>setNiche(e.target.value)} onKeyDown={e=>e.key==='Enter'&&!loading&&runDemo()}/>
                <button style={{...btnP,padding:'14px 20px',whiteSpace:'nowrap',opacity:loading||!niche.trim()?0.5:1}} onClick={()=>runDemo()} disabled={loading||!niche.trim()}>
                  {loading?'Generating...':'Generate Brief →'}
                </button>
              </div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                <span style={{fontSize:11,color:C.muted,alignSelf:'center'}}>Try:</span>
                {QUICK.map(n=>(
                  <button key={n} style={{fontSize:11,fontWeight:600,color:C.muted,backgroundColor:C.s2,border:`1px solid ${C.border}`,padding:'5px 12px',borderRadius:20,cursor:'pointer',fontFamily:'inherit',transition:'all .15s'}}
                    onMouseEnter={e=>{e.target.style.borderColor=C.gold;e.target.style.color=C.gold;}}
                    onMouseLeave={e=>{e.target.style.borderColor=C.border;e.target.style.color=C.muted;}}
                    onClick={()=>runDemo(n)}>{n}</button>
                ))}
              </div>
              {loading&&<div style={{textAlign:'center',padding:'48px 0'}}><div style={{width:36,height:36,borderRadius:'50%',border:`3px solid ${C.border}`,borderTop:`3px solid ${C.gold}`,animation:'spin .75s linear infinite',margin:'0 auto 16px'}}/><div style={{fontSize:13,color:C.muted}}>Scanning niche intelligence...</div></div>}
              {error&&<div style={{color:C.red,fontSize:13,marginTop:12}}>{error}</div>}
            </div>
            {briefData&&<MondayBriefEmail data={briefData} niche={niche} active={animActive}/>}
            {briefData&&(
              <div style={{textAlign:'center',marginTop:28,padding:'24px',backgroundColor:C.goldDim,border:`1px solid ${C.goldBorder}`,borderRadius:12}}>
                <div style={{fontSize:16,fontWeight:800,color:C.gold,marginBottom:8}}>This hits your inbox every Monday at 7am.</div>
                <div style={{fontSize:13,color:C.mid,marginBottom:18}}>Start your 7-day free trial — no credit card required.</div>
                <button style={btnP} onClick={()=>document.getElementById('trial')?.scrollIntoView({behavior:'smooth'})}>Start Free Trial → No Credit Card</button>
              </div>
            )}
          </div>
        </div>

        {/* COMPARISON */}
        <div id="compare"><ComparisonSection/></div>

        {/* SUITE — Bento */}
        <div ref={suiteRef} id="suite" style={{padding:'80px 24px',borderBottom:`1px solid ${C.border}`}}>
          <div style={{maxWidth:960,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:44,...anim(suiteV)}}>
              <div style={{fontSize:10,fontWeight:700,color:C.gold,letterSpacing:'0.14em',textTransform:'uppercase',marginBottom:14}}>The Suite</div>
              <h2 style={{fontSize:'clamp(26px,3.8vw,42px)',fontWeight:900,letterSpacing:'-1.2px'}}>Four tools. One niche. One subscription.</h2>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gridTemplateRows:'auto auto',gap:14}}>
              <div className="ch" style={{...anim(suiteV,0),gridColumn:'1',gridRow:'1/3',backgroundColor:C.s1,border:`1px solid ${C.goldBorder}`,borderRadius:12,padding:'28px 24px',display:'flex',flexDirection:'column',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:0,right:0,backgroundColor:C.gold,color:'#000',fontSize:9,fontWeight:800,letterSpacing:'0.1em',padding:'4px 11px',borderRadius:'0 12px 0 8px'}}>MOST POPULAR</div>
                <div style={{fontSize:32,marginBottom:16}}>📬</div>
                <div style={{fontSize:18,fontWeight:800,color:C.text,marginBottom:4}}>Monday Brief</div>
                <div style={{fontSize:26,fontWeight:900,color:C.gold,letterSpacing:'-1px',marginBottom:4}}>$29<span style={{fontSize:14,fontWeight:600,color:C.muted}}>/mo</span></div>
                <div style={{fontSize:11,color:C.green,marginBottom:18}}>7-day free trial · no credit card</div>
                <div style={{fontSize:13,color:C.muted,lineHeight:1.65,marginBottom:20,flex:1}}>Your weekly intelligence brief delivered Monday 7am. Outliers, patterns, thumbnail blueprint, and a ready-to-read script hook. No dashboard. No login. Just results.</div>
                <div style={{display:'flex',flexDirection:'column',gap:8}}>
                  {['Niche outlier scan (5 videos)','Script hook — read it on camera','Thumbnail blueprint with instructions','Content gap detection','Niche health score weekly','Pattern breakdown (title, timing, thumbnail)'].map(f=>(
                    <div key={f} style={{display:'flex',gap:8,alignItems:'flex-start'}}>
                      <span style={{color:C.gold,fontSize:11,marginTop:1,flexShrink:0}}>✓</span>
                      <span style={{fontSize:12,color:C.mid}}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              {[{icon:'🔭',name:'Niche Intel',price:'$49',desc:'Full outlier dashboard. On-demand scans, competitor tracking, title formula library, content gap alerts.'},
                {icon:'🤝',name:'Sponsor Deals',price:'$39',desc:'Auto rate calculator, media kit generator, brand pitch CRM. Know your worth. Get paid properly.'},
                {icon:'🏷️',name:'Brand Directory',price:'$199',desc:'For outdoor & firearms brands: find, vet, and contact 400+ verified YouTube creators. Direct access.'}].map(({icon,name,price,desc},i)=>(
                <div key={name} className="ch" style={{...anim(suiteV,.1+i*.06),backgroundColor:C.s1,border:`1px solid ${C.border}`,borderRadius:12,padding:'22px 20px'}}>
                  <div style={{fontSize:26,marginBottom:12}}>{icon}</div>
                  <div style={{fontSize:16,fontWeight:800,color:C.text,marginBottom:4}}>{name}</div>
                  <div style={{fontSize:22,fontWeight:900,color:C.text,letterSpacing:'-0.8px',marginBottom:12}}>{price}<span style={{fontSize:13,fontWeight:600,color:C.muted}}>/mo</span></div>
                  <div style={{fontSize:12,color:C.muted,lineHeight:1.65}}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PRICING */}
        <div ref={pricingRef} id="pricing" style={{backgroundColor:C.s1,padding:'80px 24px',borderBottom:`1px solid ${C.border}`}}>
          <div style={{maxWidth:720,margin:'0 auto',textAlign:'center'}}>
            <div style={{...anim(pricingV)}}>
              <div style={{fontSize:10,fontWeight:700,color:C.gold,letterSpacing:'0.14em',textTransform:'uppercase',marginBottom:14}}>Pricing</div>
              <h2 style={{fontSize:'clamp(26px,3.8vw,42px)',fontWeight:900,letterSpacing:'-1.2px',marginBottom:14}}>Start free. Stay because it works.</h2>
              <p style={{fontSize:15,color:C.muted,maxWidth:460,margin:'0 auto 44px',lineHeight:1.7}}>Every plan starts with a 7-day free trial. No credit card. Founding members lock in this pricing forever.</p>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:14,...anim(pricingV,.1)}}>
              {[{name:'Monday Brief',price:'$29',highlight:true,badge:'START HERE',items:['Weekly email brief','Outlier detection','Script hooks','Thumbnail blueprint','Niche health score']},
                {name:'Niche Intel',price:'$49',items:['Everything in Brief','On-demand scans','Competitor tracking','Title formula library','Content gap alerts']},
                {name:'Full Bundle',price:'$79',saveBadge:'SAVE $18',items:['Monday Brief','Niche Intel','Sponsor Deals','Priority support','Early feature access']}].map(({name,price,highlight,badge,saveBadge,items})=>(
                <div key={name} className="ch" style={{backgroundColor:C.s2,border:`1px solid ${highlight?C.goldBorder:C.border}`,borderRadius:12,padding:'22px 20px',position:'relative',overflow:'hidden'}}>
                  {badge&&<div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',backgroundColor:C.gold,color:'#000',fontSize:9,fontWeight:800,padding:'3px 10px',borderRadius:'0 0 6px 6px',letterSpacing:'0.08em'}}>{badge}</div>}
                  {saveBadge&&<div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',backgroundColor:C.green,color:'#000',fontSize:9,fontWeight:800,padding:'3px 10px',borderRadius:'0 0 6px 6px'}}>{saveBadge}</div>}
                  <div style={{marginTop:badge||saveBadge?14:0}}>
                    <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:6}}>{name}</div>
                    <div style={{fontSize:28,fontWeight:900,color:highlight?C.gold:C.text,letterSpacing:'-1px',marginBottom:4}}>{price}<span style={{fontSize:13,color:C.muted,fontWeight:600}}>/mo</span></div>
                    <div style={{fontSize:11,color:C.green,marginBottom:14}}>✓ 7-day free trial</div>
                    <div style={{borderTop:`1px solid ${C.border}`,paddingTop:12}}>
                      {items.map(f=><div key={f} style={{display:'flex',gap:7,marginBottom:7,alignItems:'flex-start'}}><span style={{color:C.gold,fontSize:10,marginTop:1}}>✓</span><span style={{fontSize:12,color:C.mid}}>{f}</span></div>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:20,fontSize:13,color:C.muted}}>No credit card to start. Cancel anytime. Founding price locked forever when you join.</div>
          </div>
        </div>

        {/* FAQ */}
        <div ref={faqRef} id="faq" style={{padding:'80px 24px',borderBottom:`1px solid ${C.border}`}}>
          <div style={{maxWidth:680,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:44,...anim(faqV)}}>
              <div style={{fontSize:10,fontWeight:700,color:C.gold,letterSpacing:'0.14em',textTransform:'uppercase',marginBottom:14}}>FAQ</div>
              <h2 style={{fontSize:'clamp(24px,3.5vw,38px)',fontWeight:900,letterSpacing:'-1px'}}>Questions we get asked.</h2>
            </div>
            {[["Is the data real or AI-generated?","The outlier detection uses real YouTube Data API — actual view counts, channel averages, timing patterns. Claude AI analyzes those patterns to generate the written insights, script hooks, and thumbnail blueprints. Real data. AI-assisted writing."],["What if my niche is very specific — e.g., turkey hunting in the Southeast?","That's exactly what we're built for. The more specific your niche, the more useful DownRange Creator becomes. Generic tools fail at this. We don't. Enter 'turkey hunting Southeast' and that's exactly what we scan."],["How is this different from TubeLab?","TubeLab requires you to log in and browse 5M+ videos yourself. We deliver the brief to you. TubeLab has zero niche-specific knowledge about firearms or outdoor content. We do. And the price is the same — $29/month."],["How is this different from VidIQ's daily ideas?","VidIQ generates generic idea cards from machine learning. Every VidIQ user in your niche gets similar suggestions. We detect actual outlier videos in your specific niche this week and explain exactly why each one performed. Different product entirely."],["What happens after the 7-day trial?","You get billed monthly at your plan's founding rate. You can cancel before day 7 with zero charge. We'll send you a reminder email on day 5."]].map(([q,a],i)=>(
              <FaqItem key={q} q={q} a={a} visible={faqV} delay={i*.07}/>
            ))}
          </div>
        </div>

        {/* TRIAL CTA */}
        <div id="trial" style={{backgroundColor:C.s1,padding:'88px 24px',borderBottom:`1px solid ${C.border}`,position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse 70% 60% at 50% 100%,${C.gold}12,transparent)`,pointerEvents:'none'}}/>
          <div style={{maxWidth:580,margin:'0 auto',textAlign:'center',position:'relative',zIndex:1}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:11,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:C.gold,backgroundColor:C.goldDim,border:`1px solid ${C.goldBorder}`,padding:'6px 14px',borderRadius:4,marginBottom:24}}>
              <Dot color={C.green} size={6} pulse/>
              {count} creators already on the list
            </div>
            <h2 style={{fontSize:'clamp(30px,4.5vw,52px)',fontWeight:900,letterSpacing:'-1.8px',marginBottom:16,lineHeight:1.05}}>Start your 7-day free trial.</h2>
            <p style={{fontSize:16,color:C.muted,lineHeight:1.65,maxWidth:440,margin:'0 auto 32px'}}>No credit card. No commitment. Your first Monday Brief lands in your inbox within 7 days. If it doesn't change how you create — cancel. No questions.</p>
            {!joined?(
              <>
                <div style={{display:'flex',gap:10,maxWidth:440,margin:'0 auto',flexWrap:'wrap',justifyContent:'center'}}>
                  <input style={inp} type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&joinTrial()}/>
                  <button style={btnP} onClick={joinTrial}>Start Free Trial →</button>
                </div>
                <div style={{display:'flex',justifyContent:'center',gap:20,marginTop:16,flexWrap:'wrap'}}>
                  {['No credit card','7 days free','Cancel anytime','Founder pricing'].map(t=>(
                    <span key={t} style={{fontSize:12,color:C.muted,display:'flex',alignItems:'center',gap:5}}><span style={{color:C.green}}>✓</span>{t}</span>
                  ))}
                </div>
              </>
            ):(
              <div style={{backgroundColor:C.greenDim,border:`1px solid ${C.greenBorder}`,borderRadius:12,padding:'24px 28px',maxWidth:400,margin:'0 auto'}}>
                <div style={{fontSize:22,fontWeight:800,color:C.green,marginBottom:8}}>✓ You're in.</div>
                <div style={{fontSize:14,color:C.mid,lineHeight:1.65}}>You're #{count} on the list. Your first Monday Brief lands before the end of the week.</div>
              </div>
            )}
          </div>
        </div>

        <footer style={{padding:'28px 36px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
          <div style={{display:'flex',alignItems:'center',gap:8,fontSize:13,fontWeight:800}}><Dot color={C.gold} size={6}/>DownRange<span style={{color:C.gold}}>Creator</span></div>
          <div style={{fontSize:12,color:C.muted}}>YouTube intel for the niche nobody built for.</div>
          <div style={{fontSize:11,color:C.muted}}>© 2026 DownRange Co. · Washington State</div>
        </footer>
      </div>
    </>
  );
}

function FaqItem({q,a,visible,delay}){
  const[open,setOpen]=useState(false);
  return(
    <div style={{borderBottom:`1px solid ${C.border}`,opacity:visible?1:0,transform:visible?'translateY(0)':'translateY(16px)',transition:`opacity .6s ${delay}s ease,transform .6s ${delay}s ease`}}>
      <button onClick={()=>setOpen(o=>!o)} style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'18px 0',backgroundColor:'transparent',border:'none',cursor:'pointer',fontFamily:'inherit',textAlign:'left',gap:16}}>
        <span style={{fontSize:14,fontWeight:600,color:C.text,lineHeight:1.4}}>{q}</span>
        <span style={{color:C.gold,fontSize:18,flexShrink:0,transform:open?'rotate(45deg)':'none',transition:'transform .2s'}}>+</span>
      </button>
      {open&&<div style={{fontSize:13,color:C.muted,lineHeight:1.75,paddingBottom:18}}>{a}</div>}
    </div>
  );
}
