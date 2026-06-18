import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

const C = {
  bg:'#07090B',s1:'#0C0E11',s2:'#111316',s3:'#161A1E',s4:'#1C2026',
  border:'#1C1F24',hi:'#252930',
  gold:'#C8922A',goldDim:'#C8922A18',goldBorder:'#C8922A38',goldLight:'#E4A83C',goldGlow:'#C8922A40',
  green:'#22C55E',greenDim:'#22C55E14',greenBorder:'#22C55E35',
  blue:'#60A5FA',blueDim:'#60A5FA14',
  purple:'#A78BFA',purpleDim:'#A78BFA14',
  text:'#EDE8DF',mid:'#8C8F96',muted:'#52555C',red:'#EF4444',
};

const TICKER=['🎯 "308 deer rifle scope" 5.1× outlier · 8 min ago · Montana channel','📈 Waterfowl decoy setup video 3.8× above avg this week','🔥 Gap: "best budget trail cam under $60" — zero dominant video','⚡ CCW channels: Wed 3pm posting = 2.1× algorithm boost','🎯 "Turkey call comparison" 6.2× in Southeast hunting channels','📊 Long-range shooting content +34% this month · low competition','🔥 Suppressor review niche: 2.9× avg · FFL dealers not posting','⚡ Bowhunting story format outperforming how-to by 1.8×'];
const QUICK=['deer hunting','CCW & concealed carry','waterfowl hunting','long-range shooting','archery & bowhunting'];

function useReveal(t=0.1){const r=useRef(null);const[v,setV]=useState(false);useEffect(()=>{const io=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:t});if(r.current)io.observe(r.current);return()=>io.disconnect();},[]);return[r,v];}
function useLiveCount(b=412){const[n,setN]=useState(b);useEffect(()=>{const t=setInterval(()=>{if(Math.random()>.65)setN(v=>v+1);},9000);return()=>clearInterval(t);},[]);return n;}
function useBar(target,active,delay=200){const[w,setW]=useState(0);useEffect(()=>{if(!active)return;const t=setTimeout(()=>setW(target),delay);return()=>clearTimeout(t);},[target,active,delay]);return w;}

function Dot({color=C.green,pulse=false,size=7}){return<div style={{width:size,height:size,borderRadius:'50%',backgroundColor:color,boxShadow:`0 0 ${size+2}px ${color}`,flexShrink:0,animation:pulse?'pulse 2s ease infinite':'none'}}/>;}
function ConfBar({value,color=C.gold,active,delay=200}){const w=useBar(value,active,delay);return<div style={{height:3,backgroundColor:C.s4,borderRadius:2,overflow:'hidden'}}><div style={{height:'100%',backgroundColor:color,width:`${w}%`,borderRadius:2,transition:'width 1.1s cubic-bezier(.34,1.2,.64,1)',boxShadow:`0 0 6px ${color}50`}}/></div>;}
function Tag({children,color=C.blue}){return<span style={{fontSize:10,fontWeight:700,color,backgroundColor:`${color}15`,border:`1px solid ${color}30`,padding:'2px 7px',borderRadius:3}}>{children}</span>;}

// ── FLOATING THUMBNAIL CARDS ──────────────────────────────────────
const HERO_THUMBS=[
  {title:"I Tested 5 Budget Trail Cams",views:"298K",mult:"5.2×",emoji:"🦌",rot:-7,left:'-60px',top:'12%',delay:0},
  {title:"Why I Switched to Bow Hunting",views:"187K",mult:"3.9×",emoji:"🏹",rot:5,left:'-40px',top:'62%',delay:1.2},
  {title:"Best CCW for Everyday Carry",views:"156K",mult:"3.2×",emoji:"🎯",rot:-4,right:'-50px',top:'8%',delay:0.6},
  {title:"Waterfowl Setup That Changed Everything",views:"128K",mult:"2.8×",emoji:"🦆",rot:6,right:'-40px',top:'58%',delay:1.8},
];
function FloatingThumb({title,views,mult,emoji,rot,left,right,top,delay}){
  return(
    <div style={{position:'absolute',left,right,top,width:170,opacity:0.13,transform:`rotate(${rot}deg)`,animation:`floatThumb 5s ${delay}s ease-in-out infinite`,pointerEvents:'none',zIndex:0}}>
      <div style={{aspectRatio:'16/9',backgroundColor:'#121820',borderRadius:'7px 7px 0 0',border:`1px solid ${C.border}`,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:4}}>
        <span style={{fontSize:26}}>{emoji}</span>
      </div>
      <div style={{backgroundColor:'#0E1115',borderRadius:'0 0 7px 7px',padding:'6px 8px',border:`1px solid ${C.border}`,borderTop:'none'}}>
        <div style={{fontSize:9,fontWeight:700,color:'#D0CEC8',lineHeight:1.35,marginBottom:3}}>{title}</div>
        <div style={{display:'flex',gap:6,alignItems:'center'}}>
          <span style={{fontSize:8,color:'#506070'}}>{views}</span>
          <span style={{fontSize:9,fontWeight:800,color:parseFloat(mult)>=5?C.green:C.gold}}>{mult}</span>
        </div>
      </div>
    </div>
  );
}

// ── THUMBNAIL BLUEPRINT ───────────────────────────────────────────
function ThumbnailBlueprint({concept}){
  const tc=concept||{leftSide:'Product on dark bg',rightSide:'Creator reaction',textOverlay:'BOLD TITLE TEXT',emoji:'🎯'};
  return(
    <div style={{width:'100%',aspectRatio:'16/9',backgroundColor:'#0A0A0E',borderRadius:8,overflow:'hidden',position:'relative',border:`1px solid ${C.border}`}}>
      <div style={{position:'absolute',left:0,top:0,bottom:0,width:'58%',background:'linear-gradient(135deg,#12161A,#1C222A)',display:'flex',alignItems:'center',justifyContent:'center',borderRight:`1px solid ${C.border}`}}>
        <div style={{textAlign:'center'}}><div style={{fontSize:28,marginBottom:6}}>{tc.emoji||'🎯'}</div><div style={{fontSize:9,color:C.muted,maxWidth:80,lineHeight:1.4,textAlign:'center'}}>{tc.leftSide}</div></div>
      </div>
      <div style={{position:'absolute',right:0,top:0,bottom:0,width:'42%',background:'linear-gradient(135deg,#161C20,#242C34)',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{textAlign:'center'}}><div style={{fontSize:22,marginBottom:4}}>😮</div><div style={{fontSize:9,color:C.muted,maxWidth:60,lineHeight:1.4,textAlign:'center'}}>{tc.rightSide}</div></div>
      </div>
      <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'6px 8px',background:'linear-gradient(transparent,rgba(0,0,0,.95))'}}>
        <div style={{fontSize:11,fontWeight:900,color:'#fff',textTransform:'uppercase',letterSpacing:'-0.2px'}}>{tc.textOverlay}</div>
      </div>
      <div style={{position:'absolute',top:6,right:6,backgroundColor:C.gold,color:'#000',fontSize:9,fontWeight:800,padding:'2px 6px',borderRadius:3}}>BLUEPRINT</div>
    </div>
  );
}

// ── MONDAY BRIEF ─────────────────────────────────────────────────
function MondayBriefEmail({data,niche,active}){
  const[copied,setCopied]=useState(false);
  if(!data)return null;
  function copyHook(){if(data.nextVideo?.scriptHook){navigator.clipboard?.writeText(data.nextVideo.scriptHook).catch(()=>{});setCopied(true);setTimeout(()=>setCopied(false),2500);}}
  const SL=({icon,text,extra})=>(
    <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
      <span style={{fontSize:14}}>{icon}</span>
      <span style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:'uppercase',letterSpacing:'0.12em'}}>{text}</span>
      <div style={{flex:1,height:1,backgroundColor:C.border}}/>
      {extra&&<span style={{fontSize:10,color:C.muted}}>{extra}</span>}
    </div>
  );
  return(
    <div style={{backgroundColor:'#09090D',border:`1px solid ${C.border}`,borderRadius:14,overflow:'hidden',marginTop:28}}>
      {/* Chrome */}
      <div style={{backgroundColor:'#0D0F13',borderBottom:`1px solid ${C.border}`,padding:'11px 18px',display:'flex',alignItems:'center',gap:12}}>
        <div style={{display:'flex',gap:6}}>{['#FF5F57','#FFBD2E','#28CA41'].map(c=><div key={c} style={{width:11,height:11,borderRadius:'50%',backgroundColor:c}}/>)}</div>
        <div style={{flex:1,backgroundColor:C.s2,border:`1px solid ${C.border}`,borderRadius:6,padding:'3px 12px',fontSize:11,color:C.muted,textAlign:'center'}}>intel@downrangeintel.com</div>
        <Dot color={C.green} size={6}/>
      </div>
      {/* Header */}
      <div style={{backgroundColor:C.s1,borderBottom:`1px solid ${C.border}`,padding:'14px 22px 12px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
          <div><div style={{fontSize:11,color:C.muted,marginBottom:3}}><strong style={{color:C.mid}}>From: </strong>DownRange Intel &lt;intel@downrangeintel.com&gt;</div><div style={{fontSize:13,fontWeight:700,color:C.text}}>🎯 Monday Brief — {data.niche||niche}</div></div>
          <div style={{textAlign:'right'}}><div style={{fontSize:10,color:C.muted,fontFamily:'monospace'}}>{new Date().toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',year:'numeric'})}</div><div style={{fontSize:10,color:C.muted}}>7:00 AM</div></div>
        </div>
      </div>
      <div style={{padding:'24px 22px'}}>

        {/* 1. Niche Health — compact */}
        <div style={{backgroundColor:C.s2,border:`1px solid ${C.border}`,borderRadius:8,padding:'12px 16px',marginBottom:22,display:'flex',gap:16,alignItems:'center',flexWrap:'wrap'}}>
          <div style={{flex:1,minWidth:140}}>
            <div style={{fontSize:10,color:C.muted,marginBottom:4,textTransform:'uppercase',letterSpacing:'0.08em',fontWeight:700}}>Niche Health — {data.niche}</div>
            <ConfBar value={data.nicheHealth?.score} color={data.nicheHealth?.score>=70?C.green:C.gold} active={active} delay={100}/>
          </div>
          {[[data.nicheHealth?.score,'Score',data.nicheHealth?.score>=70?C.green:C.gold],[data.nicheHealth?.weeklyGrowth||'+7%','This week',C.text],[data.channelsScanned,'Channels',C.mid]].map(([v,l,col])=>(
            <div key={l} style={{textAlign:'center'}}><div style={{fontSize:18,fontWeight:900,color:col,lineHeight:1,letterSpacing:'-0.5px'}}>{v}</div><div style={{fontSize:9,color:C.muted,textTransform:'uppercase',marginTop:2}}>{l}</div></div>
          ))}
        </div>

        {/* 2. THIS WEEK'S VIDEO — hero section */}
        <div style={{backgroundColor:`${C.gold}0A`,border:`1px solid ${C.goldBorder}`,borderRadius:12,padding:'20px 20px',marginBottom:20}}>
          <SL icon="🎯" text="Your Video This Week"/>
          <div style={{fontSize:'clamp(15px,2.5vw,20px)',fontWeight:900,color:C.text,lineHeight:1.25,marginBottom:14,letterSpacing:'-0.5px'}}>"{data.nextVideo?.title}"</div>
          <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:12}}>
            {[['Publish',data.nextVideo?.publishDay],['Length',data.nextVideo?.length],['Time',data.nextVideo?.publishTime],['Viral Score',`${data.nextVideo?.viralScore||86}/100`]].map(([l,v])=>(
              <div key={l} style={{backgroundColor:C.s3,border:`1px solid ${l==='Viral Score'?C.goldBorder:C.border}`,borderRadius:6,padding:'7px 12px',textAlign:'center'}}>
                <div style={{fontSize:9,color:C.muted,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:2}}>{l}</div>
                <div style={{fontSize:12,fontWeight:700,color:l==='Viral Score'?C.gold:C.text}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{fontSize:13,color:C.mid,lineHeight:1.6,borderLeft:`2px solid ${C.goldBorder}`,paddingLeft:12}}>{data.nextVideo?.angle}</div>
        </div>

        {/* 3. Script hook */}
        {data.nextVideo?.scriptHook&&(
          <div style={{backgroundColor:C.s2,border:`1px solid ${C.border}`,borderRadius:10,padding:'18px 18px',marginBottom:20}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12,flexWrap:'wrap',gap:8}}>
              <SL icon="🎙" text="Read This On Camera — First 30 Seconds"/>
              <button onClick={copyHook} style={{fontSize:11,fontWeight:700,color:copied?C.green:C.gold,backgroundColor:copied?C.greenDim:C.goldDim,border:`1px solid ${copied?C.greenBorder:C.goldBorder}`,padding:'5px 12px',borderRadius:5,cursor:'pointer',fontFamily:'inherit',flexShrink:0,marginTop:-8}}>
                {copied?'✓ Copied!':'Copy to clipboard'}
              </button>
            </div>
            <div style={{fontSize:13,color:C.text,lineHeight:1.8,fontStyle:'italic',backgroundColor:`${C.gold}06`,border:`1px solid ${C.goldBorder}`,borderRadius:8,padding:'14px 16px'}}>
              "{data.nextVideo.scriptHook}"
            </div>
            <div style={{fontSize:11,color:C.muted,marginTop:8}}>↳ Open with this verbatim. The first 30 seconds determine whether viewers stay.</div>
          </div>
        )}

        {/* 4. Thumbnail */}
        {data.nextVideo?.thumbnailConcept&&(
          <div style={{marginBottom:20}}>
            <SL icon="🖼" text="Thumbnail Blueprint" extra="Build this in Canva"/>
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

        {/* 5. 4-Week Content Calendar */}
        {data.contentCalendar?.length>0&&(
          <div style={{marginBottom:20}}>
            <SL icon="📅" text="4-Week Content Calendar"/>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {data.contentCalendar.map((w,i)=>(
                <div key={i} style={{display:'grid',gridTemplateColumns:'64px 1fr',gap:12,alignItems:'start',backgroundColor:C.s2,border:`1px solid ${C.border}`,borderRadius:8,padding:'10px 14px'}}>
                  <div style={{textAlign:'center'}}>
                    <div style={{fontSize:10,fontWeight:800,color:C.gold,textTransform:'uppercase',letterSpacing:'0.06em'}}>{w.week}</div>
                    <div style={{fontSize:10,color:C.muted,marginTop:2}}>{w.day}</div>
                  </div>
                  <div>
                    <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:3}}>{w.title}</div>
                    <div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{w.angle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Competitor Pulse */}
        {data.competitorPulse?.length>0&&(
          <div style={{marginBottom:20}}>
            <SL icon="👁" text="Competitor Pulse This Week"/>
            {data.competitorPulse.map((c,i)=>(
              <div key={i} style={{display:'flex',gap:12,alignItems:'flex-start',padding:'9px 0',borderBottom:i<data.competitorPulse.length-1?`1px solid ${C.border}`:'none'}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:600,color:C.text,marginBottom:3}}>{c.channel}</div>
                  <div style={{fontSize:11,color:C.mid,marginBottom:3}}>Posted: "{c.lastVideo}"</div>
                  <div style={{fontSize:11,color:C.muted,fontStyle:'italic'}}>↳ {c.note}</div>
                </div>
                <div style={{textAlign:'right',flexShrink:0}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.text}}>{Math.round((c.views||0)/1000)}K</div>
                  <div style={{fontSize:9,color:C.muted}}>views</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 7. Shorts Ideas */}
        {data.shortsIdeas?.length>0&&(
          <div style={{marginBottom:20}}>
            <SL icon="⚡" text="3 Shorts Repurpose Ideas"/>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {data.shortsIdeas.map((idea,i)=>(
                <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start',backgroundColor:C.s2,border:`1px solid ${C.border}`,borderRadius:7,padding:'10px 14px'}}>
                  <span style={{fontSize:11,fontWeight:800,color:C.purple,fontFamily:'monospace',flexShrink:0,marginTop:1}}>#{i+1}</span>
                  <span style={{fontSize:12,color:C.mid,lineHeight:1.5}}>{idea}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. Trending Questions */}
        {data.trendingQuestions?.length>0&&(
          <div style={{marginBottom:20}}>
            <SL icon="💬" text="What Your Audience Is Asking This Week"/>
            <div style={{display:'flex',flexDirection:'column',gap:7}}>
              {data.trendingQuestions.map((q,i)=>(
                <div key={i} style={{backgroundColor:C.s2,border:`1px solid ${C.border}`,borderRadius:7,padding:'9px 14px',fontSize:12,color:C.mid,display:'flex',gap:8,alignItems:'flex-start'}}>
                  <span style={{color:C.blue,fontSize:11,flexShrink:0,marginTop:1}}>Q</span>
                  <span style={{lineHeight:1.5}}>{q}</span>
                </div>
              ))}
            </div>
            <div style={{fontSize:11,color:C.muted,marginTop:8}}>↳ Answer one of these questions directly in your next video hook. Instant relevance.</div>
          </div>
        )}

        {/* 9. Seasonal Alert */}
        {data.seasonalAlert?.active&&(
          <div style={{backgroundColor:`${C.green}08`,border:`1px solid ${C.greenBorder}`,borderRadius:10,padding:'14px 16px',marginBottom:20}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
              <span style={{fontSize:14}}>🗓</span>
              <span style={{fontSize:10,fontWeight:700,color:C.green,textTransform:'uppercase',letterSpacing:'0.1em'}}>Seasonal Alert</span>
              {data.seasonalAlert.urgency==='High'&&<span style={{fontSize:9,fontWeight:700,backgroundColor:'#EF444420',color:C.red,padding:'1px 6px',borderRadius:3,border:`1px solid ${C.red}40`}}>ACT NOW</span>}
            </div>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:6}}>{data.seasonalAlert.title}</div>
            <div style={{fontSize:12,color:C.muted,lineHeight:1.6}}>{data.seasonalAlert.content}</div>
          </div>
        )}

        {/* 10. Top Outliers — compact reference */}
        <div>
          <SL icon="📈" text="This Week's Top Performers" extra={`Baseline ~${Math.round((data.avgChannelViews||38000)/1000)}K`}/>
          {data.outliers?.slice(0,3).map((v,i)=>(
            <div key={i} style={{display:'flex',gap:10,alignItems:'center',padding:'8px 0',borderBottom:i<2?`1px solid ${C.border}`:'none'}}>
              <span style={{fontSize:11,fontWeight:800,color:parseFloat(v.multiplier)>=5?C.green:C.gold,fontFamily:'monospace',minWidth:32}}>{v.multiplier}</span>
              <span style={{fontSize:12,color:C.text,flex:1}}>{v.title}</span>
              <span style={{fontSize:11,color:C.muted,whiteSpace:'nowrap'}}>{Math.round((v.views||0)/1000)}K</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{marginTop:20,paddingTop:14,borderTop:`1px solid ${C.border}`,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
          <div style={{display:'flex',alignItems:'center',gap:6}}><Dot color={C.gold} size={5}/><span style={{fontSize:11,fontWeight:700,color:C.muted}}>DownRange Intel</span></div>
          <span style={{fontSize:11,color:C.muted}}>Unsubscribe · Preferences</span>
        </div>
      </div>
    </div>
  );
}

// ── COMPARISON ──────────────────────────────────────────────────
function ComparisonSection(){
  const[sel,setSel]=useState('downrange');
  const tools=[{id:'tubelab',label:'TubeLab'},{id:'vidiq',label:'VidIQ'},{id:'downrange',label:'DownRange Intel',featured:true}];
  return(
    <div style={{backgroundColor:C.s1,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,padding:'80px 24px'}} id="compare">
      <div style={{maxWidth:1040,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:40}}>
          <div style={{fontSize:10,fontWeight:700,color:C.gold,letterSpacing:'0.14em',textTransform:'uppercase',marginBottom:14}}>Real Comparison</div>
          <h2 style={{fontSize:'clamp(26px,3.8vw,42px)',fontWeight:900,letterSpacing:'-1.2px',marginBottom:14}}>Same niche. Different experience.</h2>
          <p style={{fontSize:15,color:C.muted,maxWidth:500,margin:'0 auto',lineHeight:1.7}}>Type "deer hunting" into each tool. Here's exactly what you get back — not a feature list, the actual interface.</p>
        </div>

        {/* Time cost bar */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:28}}>
          {[{tool:'TubeLab',hours:'3-4 hrs',label:'To find your own patterns',col:C.red},{tool:'VidIQ',hours:'1-2 hrs',label:'Reviewing & dismissing 50 idea cards',col:'#F59E0B'},{tool:'DownRange Intel',hours:'0 hrs',label:'Brief arrives Monday 7am',col:C.green}].map(({tool,hours,label,col})=>(
            <div key={tool} style={{backgroundColor:C.s2,border:`1px solid ${C.border}`,borderRadius:10,padding:'14px 16px',textAlign:'center'}}>
              <div style={{fontSize:10,color:C.muted,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>{tool}</div>
              <div style={{fontSize:26,fontWeight:900,color:col,letterSpacing:'-1px',lineHeight:1,marginBottom:4}}>{hours}</div>
              <div style={{fontSize:11,color:C.muted}}>{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{display:'flex',gap:8,justifyContent:'center',marginBottom:20,flexWrap:'wrap'}}>
          {tools.map(t=>(
            <button key={t.id} onClick={()=>setSel(t.id)} style={{fontSize:13,fontWeight:700,color:sel===t.id?(t.featured?'#000':C.text):C.muted,backgroundColor:sel===t.id?(t.featured?C.gold:C.s3):C.s2,border:`1px solid ${sel===t.id?(t.featured?C.gold:C.hi):C.border}`,padding:'9px 20px',borderRadius:8,cursor:'pointer',fontFamily:'inherit',transition:'all .15s'}}>
              {t.label}
            </button>
          ))}
        </div>

        {sel==='tubelab'&&<TubeLabMock/>}
        {sel==='vidiq'&&<VidIQMock/>}
        {sel==='downrange'&&<DownRangeMock/>}

        {/* Feature matrix */}
        <div style={{marginTop:28,overflow:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
            <thead>
              <tr style={{borderBottom:`2px solid ${C.border}`}}>
                {['Feature','TubeLab $29/mo','VidIQ $16.58/mo','DownRange Intel $29/mo'].map((h,i)=>(
                  <th key={h} style={{padding:'10px 14px',textAlign:i===0?'left':'center',color:i===3?C.gold:C.muted,fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em',backgroundColor:i===3?C.goldDim:'transparent'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Delivered to your inbox','✗','✗','✓ Monday 7am'],
                ['Script hook (read on camera)','✗','✗','✓ Every week'],
                ['Thumbnail blueprint','✗','✗','✓ Every week'],
                ['4-week content calendar','✗','✗','✓ Every week'],
                ['Competitor pulse','Browse yourself','Partial','✓ 3 channels tracked'],
                ['Shorts repurpose ideas','✗','✗','✓ 3 ideas weekly'],
                ['Seasonal opportunity alerts','✗','✗','✓ Niche-specific'],
                ['Firearms/outdoor niche knowledge','Generic','Generic','✓ Built-in'],
                ['Hours required per week','3-4 hrs','1-2 hrs','0 hrs'],
              ].map((row,ri)=>(
                <tr key={ri} style={{borderBottom:`1px solid ${C.border}`,backgroundColor:ri%2===0?'transparent':C.s1}}>
                  {row.map((cell,ci)=>(
                    <td key={ci} style={{padding:'10px 14px',textAlign:ci===0?'left':'center',color:ci===3?(cell==='✗'?C.muted:C.text):(cell==='✓'||cell?.startsWith('✓'))?C.green:cell==='✗'?C.muted:C.mid,fontWeight:ci===3&&cell!=='✗'?600:400,backgroundColor:ci===3?C.goldDim:'transparent',fontSize:ci===0?12:13}}>
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
  );
}

function TubeLabMock(){
  const videos=[{m:'8.2x',t:'I Found the Best Deer Hunting Spot in America',ch:'OutdoorPassion',v:'2.1M',d:3},{m:'7.1x',t:'10 Deer Hunting Tips That Actually Work',ch:'HunterPro',v:'1.8M',d:7},{m:'6.4x',t:'Budget Deer Rifle That Outshot My $3,000 Setup',ch:'RifleReview',v:'1.4M',d:12},{m:'5.8x',t:'Why I Switched From Rifle to Bow Hunting',ch:'BowLife',v:'1.1M',d:15},{m:'5.1x',t:'The PERFECT Deer Stand Location Formula',ch:'DeerScouts',v:'980K',d:19}];
  return(
    <div style={{backgroundColor:'#0E1115',border:`1px solid #232830`,borderRadius:12,overflow:'hidden'}}>
      <div style={{backgroundColor:'#0A0D10',borderBottom:`1px solid #1A1E24`,padding:'12px 18px',display:'flex',alignItems:'center',gap:10}}>
        <div style={{width:20,height:20,backgroundColor:'#2A6EFF',borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:800,color:'#fff'}}>T</div>
        <span style={{fontSize:13,fontWeight:700,color:'#E8EAF0'}}>Outliers Finder</span>
        <span style={{fontSize:11,color:'#606570',marginLeft:6}}>5,247,832 videos · deer hunting</span>
        <div style={{marginLeft:'auto',display:'flex',gap:8}}>
          {['Niche: All ▼','Multiplier ▼','RPM ▼','Quality ▼','+16 more filters'].map(f=><div key={f} style={{fontSize:10,backgroundColor:'#1A1E24',border:`1px solid #2A2E35`,borderRadius:4,padding:'4px 8px',color:'#8090A0'}}>{f}</div>)}
        </div>
      </div>
      <div style={{maxHeight:280,overflowY:'auto'}}>
        {videos.map((v,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'36px auto 1fr auto',gap:10,padding:'10px 18px',borderBottom:`1px solid #151820`,alignItems:'center'}}>
            <div style={{width:36,height:24,backgroundColor:'#1A1E26',borderRadius:3,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,color:'#404550'}}>▶</div>
            <span style={{fontSize:10,fontWeight:800,color:'#2A6EFF',backgroundColor:'#2A6EFF18',border:'1px solid #2A6EFF30',padding:'2px 6px',borderRadius:3,fontFamily:'monospace',whiteSpace:'nowrap'}}>{v.m}</span>
            <div><div style={{fontSize:12,fontWeight:600,color:'#D0D4DC',marginBottom:2}}>{v.t}</div><div style={{fontSize:10,color:'#606570'}}>{v.ch} · {v.d}d ago</div></div>
            <div style={{textAlign:'right'}}><div style={{fontSize:12,fontWeight:700,color:'#D0D4DC'}}>{v.v}</div><div style={{fontSize:9,color:'#606570'}}>views</div></div>
          </div>
        ))}
      </div>
      <div style={{padding:'10px 18px',backgroundColor:'#0A0D10',borderTop:`1px solid #1A1E24`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:11,color:'#606570'}}>Showing 5 of 5,247,832 results. Browse and find your own patterns.</span>
        <div style={{fontSize:11,color:'#2A6EFF',cursor:'pointer'}}>Load 50 more →</div>
      </div>
      <div style={{padding:'10px 18px',backgroundColor:`${C.red}0A`,borderTop:`1px solid ${C.red}20`,display:'flex',gap:8,alignItems:'center'}}>
        <span>⚠️</span><span style={{fontSize:11,color:C.red}}>No script. No thumbnail brief. No email. No niche expertise. No calendar. You browse, you analyze, you figure it out. 3-4 hrs/week.</span>
      </div>
    </div>
  );
}

function VidIQMock(){
  const ideas=[{s:'Very High',t:'10 Mistakes New Deer Hunters Make (And How to Fix Them)',v:'Est. 45K–120K views'},{s:'High',t:'Best Budget Deer Hunting Setup Under $500 for Beginners',v:'Est. 32K–89K views'},{s:'High',t:'How to Find the Perfect Deer Stand Location Every Time',v:'Est. 28K–74K views'},{s:'Medium',t:'Trail Camera Setup Tips for Early Season Scouting 2026',v:'Est. 18K–45K views'},{s:'Medium',t:'Deer Hunting Gear I Wish I Had When Starting Out',v:'Est. 15K–38K views'}];
  const sc={'Very High':C.green,'High':'#F59E0B','Medium':C.blue};
  return(
    <div style={{backgroundColor:'#0E1115',border:`1px solid #232830`,borderRadius:12,overflow:'hidden'}}>
      <div style={{backgroundColor:'#0A0D10',borderBottom:`1px solid #1A1E24`,padding:'12px 18px',display:'flex',alignItems:'center',gap:10}}>
        <div style={{width:20,height:20,backgroundColor:'#1D9BF0',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:800,color:'#fff'}}>V</div>
        <span style={{fontSize:13,fontWeight:700,color:'#E8EAF0'}}>Daily Ideas</span>
        <span style={{fontSize:10,color:C.green,backgroundColor:`${C.green}18`,padding:'2px 8px',borderRadius:10,fontWeight:700}}>50 new today</span>
        <span style={{fontSize:11,color:'#606570',marginLeft:4}}>Based on your channel · Deer Hunting niche</span>
        <div style={{marginLeft:'auto',fontSize:11,color:'#606570'}}>Same as 20M+ other users</div>
      </div>
      <div style={{maxHeight:280,overflowY:'auto',padding:'12px 18px',display:'flex',flexDirection:'column',gap:10}}>
        {ideas.map((idea,i)=>(
          <div key={i} style={{backgroundColor:'#141820',border:`1px solid #1E2228`,borderRadius:8,padding:'12px 14px',display:'flex',gap:12,alignItems:'flex-start'}}>
            <div style={{flex:1}}>
              <div style={{display:'flex',gap:6,marginBottom:7,flexWrap:'wrap'}}>
                <span style={{fontSize:10,fontWeight:700,color:sc[idea.s]||C.blue,backgroundColor:`${sc[idea.s]||C.blue}18`,padding:'2px 7px',borderRadius:3}}>🔥 {idea.s} Views</span>
              </div>
              <div style={{fontSize:12,fontWeight:600,color:'#D0D4DC',lineHeight:1.4,marginBottom:5}}>{idea.t}</div>
              <div style={{fontSize:11,color:'#606570'}}>{idea.v}</div>
            </div>
            <div style={{display:'flex',gap:6,flexShrink:0,paddingTop:2}}>
              <div style={{fontSize:16,cursor:'pointer',color:C.green}}>✓</div>
              <div style={{fontSize:16,cursor:'pointer',color:C.red}}>✗</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{padding:'10px 18px',backgroundColor:`${C.red}0A`,borderTop:`1px solid ${C.red}20`,display:'flex',gap:8,alignItems:'center'}}>
        <span>⚠️</span><span style={{fontSize:11,color:C.red}}>Every VidIQ user in your niche gets similar cards. No outlier data. No script. No thumbnail. No calendar. No email delivery. 1-2 hrs/week swiping.</span>
      </div>
    </div>
  );
}

function DownRangeMock(){
  return(
    <div style={{backgroundColor:'#09090D',border:`1px solid ${C.goldBorder}`,borderRadius:12,overflow:'hidden'}}>
      <div style={{backgroundColor:'#0D0F13',borderBottom:`1px solid ${C.border}`,padding:'11px 18px',display:'flex',alignItems:'center',gap:12}}>
        <div style={{display:'flex',gap:6}}>{['#FF5F57','#FFBD2E','#28CA41'].map(c=><div key={c} style={{width:11,height:11,borderRadius:'50%',backgroundColor:c}}/>)}</div>
        <div style={{flex:1,backgroundColor:C.s2,border:`1px solid ${C.border}`,borderRadius:6,padding:'3px 12px',fontSize:11,color:C.muted,textAlign:'center'}}>intel@downrangeintel.com</div>
        <Dot color={C.green} size={6}/>
      </div>
      <div style={{backgroundColor:C.s1,borderBottom:`1px solid ${C.border}`,padding:'12px 20px'}}>
        <div style={{fontSize:11,color:C.muted,marginBottom:3}}><strong style={{color:C.mid}}>From: </strong>DownRange Intel — Monday Brief</div>
        <div style={{fontSize:13,fontWeight:700,color:C.text}}>🎯 Monday Brief — Deer Hunting · Week 24</div>
      </div>
      <div style={{padding:'18px 20px'}}>
        <div style={{backgroundColor:C.s2,border:`1px solid ${C.border}`,borderRadius:7,padding:'10px 14px',marginBottom:14,display:'flex',gap:14,alignItems:'center',flexWrap:'wrap'}}>
          <div style={{flex:1}}><div style={{fontSize:9,color:C.muted,marginBottom:5,textTransform:'uppercase',fontWeight:700}}>NICHE HEALTH — Deer Hunting</div><div style={{height:3,backgroundColor:C.s4,borderRadius:2}}><div style={{height:'100%',width:'74%',backgroundColor:C.green,borderRadius:2}}/></div></div>
          <div style={{fontSize:18,fontWeight:900,color:C.green}}>74</div><div style={{fontSize:12,fontWeight:700,color:C.mid}}>+8%</div>
        </div>
        <div style={{backgroundColor:`${C.gold}0A`,border:`1px solid ${C.goldBorder}`,borderRadius:10,padding:'14px 16px',marginBottom:12}}>
          <div style={{fontSize:9,fontWeight:700,color:C.muted,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>🎯 YOUR VIDEO THIS WEEK</div>
          <div style={{fontSize:15,fontWeight:900,color:C.text,lineHeight:1.25,marginBottom:10,letterSpacing:'-0.3px'}}>"I Tested 5 Budget Trail Cams — One Shocked Me"</div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:8}}>
            {[['Post','Wednesday'],['Length','14-16 min'],['Time','3pm EST'],['Score','86/100']].map(([l,v])=>(
              <div key={l} style={{backgroundColor:C.s3,border:`1px solid ${l==='Score'?C.goldBorder:C.border}`,borderRadius:5,padding:'5px 10px',textAlign:'center'}}>
                <div style={{fontSize:9,color:C.muted,textTransform:'uppercase',marginBottom:1}}>{l}</div>
                <div style={{fontSize:11,fontWeight:700,color:l==='Score'?C.gold:C.text}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{backgroundColor:C.s2,border:`1px solid ${C.border}`,borderRadius:8,padding:'11px 14px',marginBottom:12}}>
          <div style={{fontSize:9,fontWeight:700,color:C.muted,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:7}}>🎙 READ THIS ON CAMERA (first 30 sec)</div>
          <div style={{fontSize:12,color:C.text,lineHeight:1.7,fontStyle:'italic'}}>"Most hunters spend $200+ on trail cameras and never capture what they're looking for. Today I'm testing 5 options under $60 — and one of them outperformed my $200 setup..."</div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
          <div style={{backgroundColor:C.s2,border:`1px solid ${C.border}`,borderRadius:7,padding:'10px 12px'}}>
            <div style={{fontSize:9,color:C.muted,textTransform:'uppercase',marginBottom:6}}>📅 4-WEEK CALENDAR</div>
            {['W1: Trail cam comparison','W2: Tree stand setup guide','W3: Shot placement drill','W4: Season recap + tips'].map((w,i)=><div key={i} style={{fontSize:10,color:C.mid,marginBottom:4}}>{w}</div>)}
          </div>
          <div style={{backgroundColor:C.s2,border:`1px solid ${C.border}`,borderRadius:7,padding:'10px 12px'}}>
            <div style={{fontSize:9,color:C.muted,textTransform:'uppercase',marginBottom:6}}>⚡ SHORTS IDEAS</div>
            {['30s: Best trail cam angle tip','30s: Quick shot placement guide','60s: Budget vs expensive cam test'].map((s,i)=><div key={i} style={{fontSize:10,color:C.mid,marginBottom:4}}>{s}</div>)}
          </div>
        </div>
        <div style={{backgroundColor:`${C.green}0A`,border:`1px solid ${C.greenBorder}`,borderRadius:7,padding:'9px 12px'}}>
          <div style={{fontSize:9,color:C.muted,textTransform:'uppercase',marginBottom:5}}>🗓 SEASONAL ALERT</div>
          <div style={{fontSize:11,color:C.text,fontWeight:700,marginBottom:3}}>Early season starts in 6 weeks — post trail cam content NOW</div>
          <div style={{fontSize:10,color:C.muted}}>Pre-season search traffic spikes 3 weeks before opener. Post this week to capture it.</div>
        </div>
      </div>
      <div style={{padding:'10px 18px',backgroundColor:`${C.green}08`,borderTop:`1px solid ${C.greenBorder}`,display:'flex',gap:8,alignItems:'center'}}>
        <span>✅</span><span style={{fontSize:11,color:C.green}}>Delivered Monday 7am. No login. Script hook + thumbnail + calendar + Shorts + seasonal + competitor pulse. 0 hrs/week from you.</span>
      </div>
    </div>
  );
}

// ── MAIN ─────────────────────────────────────────────────────────
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
    }catch{setError('Analysis failed. Try again.');}
    finally{setLoading(false);}
  }

  async function getAccess(){
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
        <title>DownRange Intel — YouTube Intelligence for Outdoor & Firearms Creators</title>
        <meta name="description" content="The Monday Brief for outdoor creators. Weekly outlier scan, script hook, thumbnail blueprint, 4-week calendar, competitor pulse, and Shorts ideas — all delivered to your inbox."/>
        <meta property="og:title" content="DownRange Intel — YouTube Intelligence for Outdoor Creators"/>
        <meta property="og:description" content="Stop using generic tools. Get YouTube intelligence built for your niche."/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' fill='none' stroke='%23C8922A' stroke-width='8'/><line x1='50' y1='10' x2='50' y2='40' stroke='%23C8922A' stroke-width='4'/><line x1='50' y1='60' x2='50' y2='90' stroke='%23C8922A' stroke-width='4'/><line x1='10' y1='50' x2='40' y2='50' stroke='%23C8922A' stroke-width='4'/><line x1='60' y1='50' x2='90' y2='50' stroke='%23C8922A' stroke-width='4'/></svg>"/>
        <style>{`
          *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
          html{-webkit-font-smoothing:antialiased;scroll-behavior:smooth}
          body{background:#07090B;color:#EDE8DF;font-family:'Inter','SF Pro Display',system-ui,sans-serif}
          @keyframes reticle{to{transform:translate(-50%,-50%) rotate(360deg)}}
          @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.35}}
          @keyframes spin{to{transform:rotate(360deg)}}
          @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          @keyframes floatThumb{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
          input:focus{outline:none;border-color:#C8922A70!important;box-shadow:0 0 0 3px #C8922A12}
          button:hover:not(:disabled){opacity:.86;transition:opacity .15s}
          .ch{transition:border-color .2s,box-shadow .2s}.ch:hover{border-color:#C8922A40!important;box-shadow:0 0 24px #C8922A14}
          ::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#1C1F24;border-radius:2px}
        `}</style>
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
            <Dot color={C.gold}/>DownRange<span style={{color:C.gold}}>Intel</span>
          </div>
          <div style={{display:'flex',gap:26,fontSize:13,color:C.muted}}>
            {[['Demo','#demo'],['Compare','#compare'],['Suite','#suite'],['Pricing','#pricing']].map(([l,h])=>(
              <a key={l} href={h} style={{color:C.muted,textDecoration:'none'}} onMouseEnter={e=>e.target.style.color=C.text} onMouseLeave={e=>e.target.style.color=C.muted}>{l}</a>
            ))}
          </div>
          <button style={btnP} onClick={()=>document.getElementById('access')?.scrollIntoView({behavior:'smooth'})}>
            Request Early Access →
          </button>
        </nav>

        {/* HERO — with floating thumbnails */}
        <div style={{position:'relative',overflow:'hidden',borderBottom:`1px solid ${C.border}`}}>
          {/* Grid bg */}
          <div style={{position:'absolute',inset:0,backgroundImage:`linear-gradient(${C.gold}07 1px,transparent 1px),linear-gradient(90deg,${C.gold}07 1px,transparent 1px)`,backgroundSize:'44px 44px',pointerEvents:'none'}}/>
          {/* Forest gradient */}
          <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse 80% 70% at 20% 50%,#0F1A1280,transparent),radial-gradient(ellipse 60% 50% at 50% 0%,${C.gold}10,transparent)`,pointerEvents:'none'}}/>
          {/* Floating thumbnails */}
          {HERO_THUMBS.map((t,i)=><FloatingThumb key={i} {...t}/>)}
          {/* Reticle */}
          <svg width={540} height={540} viewBox="0 0 200 200" style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',opacity:0.04,pointerEvents:'none',animation:'reticle 90s linear infinite'}}>
            {[90,62,34].map(r=><circle key={r} cx="100" cy="100" r={r} fill="none" stroke={C.gold} strokeWidth={r===90?'0.5':'0.3'}/>)}
            <circle cx="100" cy="100" r="3.5" fill="none" stroke={C.gold} strokeWidth="1"/>
            {[['100','10','100','68'],['100','132','100','190'],['10','100','68','100'],['132','100','190','100']].map(([x1,y1,x2,y2],i)=><line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.gold} strokeWidth="0.5"/>)}
          </svg>

          <div ref={heroRef} style={{maxWidth:900,margin:'0 auto',padding:'100px 24px 80px',textAlign:'center',position:'relative',zIndex:1,...anim(heroV)}}>
            {/* Name recommendation callout */}
            <div style={{display:'inline-flex',alignItems:'center',gap:10,backgroundColor:C.s1,border:`1px solid ${C.border}`,borderRadius:8,padding:'8px 14px',marginBottom:28,fontSize:12}}>
              <Dot color={C.green} size={5} pulse/>
              <span style={{color:C.muted}}>Formerly "DownRange Creator" →</span>
              <span style={{color:C.gold,fontWeight:700}}>Now: DownRange Intel</span>
              <span style={{color:C.muted}}>· Preview access open</span>
            </div>

            <h1 style={{fontSize:'clamp(42px,7vw,72px)',fontWeight:900,letterSpacing:'-3px',lineHeight:0.98,marginBottom:26,color:C.text}}>
              YouTube intel<br/><span style={{color:C.gold,filter:`drop-shadow(0 0 30px ${C.goldGlow})`}}>built for your niche.</span>
            </h1>
            <p style={{fontSize:18,color:C.muted,lineHeight:1.7,maxWidth:580,margin:'0 auto 44px'}}>
              TubeLab makes you browse 5M videos yourself. VidIQ gives 20M creators the same idea cards. <strong style={{color:C.text,fontWeight:700}}>DownRange Intel</strong> delivers your specific brief — with a ready-to-read script, thumbnail blueprint, 4-week calendar, and Shorts ideas — every Monday at 7am.
            </p>

            <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:52}}>
              <button style={btnP} onClick={()=>demoRef.current?.scrollIntoView({behavior:'smooth'})}>
                See Monday Brief Live →
              </button>
              <button style={btnG} onClick={()=>document.getElementById('access')?.scrollIntoView({behavior:'smooth'})}>
                Request Early Access
              </button>
            </div>

            <div style={{display:'inline-flex',alignItems:'center',gap:6,backgroundColor:C.goldDim,border:`1px solid ${C.goldBorder}`,borderRadius:8,padding:'10px 18px',fontSize:13,color:C.mid}}>
              <Dot color={C.gold} size={6}/>
              <span>{count} outdoor creators requested early access</span>
              <span style={{color:C.muted}}>·</span>
              <span style={{color:C.gold,fontWeight:700}}>Preview launching soon</span>
            </div>
          </div>
        </div>

        {/* CREATOR MARQUEE */}
        <div style={{backgroundColor:C.s1,borderBottom:`1px solid ${C.border}`,padding:'16px 0',overflow:'hidden'}}>
          <div style={{display:'flex',gap:12,whiteSpace:'nowrap',animation:'marquee 30s linear infinite'}}>
            {[...['Firearms Instructors','Deer Hunters','CCW Instructors','Bowhunters','Long-Range Shooters','Waterfowl Hunters','Turkey Hunters','Survival Creators','Gear Reviewers','2A Advocates','FFL Dealers','Outdoor Guides','Fly Fishermen','Competitive Shooters','Bushcraft','Knife & EDC'],...['Firearms Instructors','Deer Hunters','CCW Instructors','Bowhunters','Long-Range Shooters','Waterfowl Hunters','Turkey Hunters','Survival Creators','Gear Reviewers','2A Advocates','FFL Dealers','Outdoor Guides','Fly Fishermen','Competitive Shooters','Bushcraft','Knife & EDC']].map((t,i)=>(
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
              {[['🎯','No niche knowledge',"They don't know that 'suppressors' and 'silencers' are the same keyword. That deer season drives your content calendar. That certain CCW content gets age-restricted differently."],['🤖','Built for automation',"Every tool testimonial is '$500/day faceless channel.' Their product is designed for AI content farms — not for creators who hunt, shoot, and live this content."],['🔄','Same ideas for everyone',"VidIQ's daily ideas go to 20M+ creators. You're using the same AI suggestions as every competitor in your niche. There's no edge."],['📬','You have to go find it',"TubeLab has 5M+ outliers — but you browse them yourself. We send your intel every Monday. Zero effort on your end."]].map(([icon,title,desc],i)=>(
                <div key={title} className="ch" style={{...anim(probV,i*.08),backgroundColor:C.s1,border:`1px solid ${C.border}`,borderRadius:11,padding:'22px 20px'}}>
                  <div style={{fontSize:26,marginBottom:14}}>{icon}</div>
                  <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:8}}>{title}</div>
                  <div style={{fontSize:13,color:C.muted,lineHeight:1.65}}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div style={{backgroundColor:C.s1,padding:'80px 24px',borderBottom:`1px solid ${C.border}`}}>
          <div style={{maxWidth:820,margin:'0 auto',textAlign:'center'}}>
            <div style={{fontSize:10,fontWeight:700,color:C.gold,letterSpacing:'0.14em',textTransform:'uppercase',marginBottom:14}}>How It Works</div>
            <h2 style={{fontSize:'clamp(26px,3.8vw,42px)',fontWeight:900,letterSpacing:'-1.2px',marginBottom:48}}>Three steps. Zero effort on your end.</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:0}}>
              {[['01','🔒','Set your niche','Tell us your content focus. Deer hunting, CCW, waterfowl. 30 seconds.'],['02','🔭','We scan weekly','We monitor 10+ channels in your niche, detect outliers, and extract patterns.'],['03','📬','Monday at 7am','Full brief in your inbox. Script hook, thumbnail, calendar, Shorts ideas, competitor pulse. Done.']].map(([n,icon,title,desc],i,a)=>(
                <div key={n} style={{padding:'28px',borderRight:i<a.length-1?`1px solid ${C.border}`:'none'}}>
                  <div style={{fontSize:48,fontWeight:900,color:C.goldDim,letterSpacing:'-3px',lineHeight:1,marginBottom:14}}>{n}</div>
                  <div style={{fontSize:24,marginBottom:12}}>{icon}</div>
                  <div style={{fontSize:15,fontWeight:700,color:C.text,marginBottom:10}}>{title}</div>
                  <div style={{fontSize:13,color:C.muted,lineHeight:1.65}}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DEMO */}
        <div ref={demoRef} id="demo" style={{padding:'80px 24px',borderBottom:`1px solid ${C.border}`}}>
          <div style={{maxWidth:720,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:36}}>
              <div style={{fontSize:10,fontWeight:700,color:C.gold,letterSpacing:'0.14em',textTransform:'uppercase',marginBottom:14}}>Live Preview</div>
              <h2 style={{fontSize:'clamp(26px,3.8vw,42px)',fontWeight:900,letterSpacing:'-1.2px',marginBottom:14}}>Monday arrives.<br/>You press record.</h2>
              <p style={{fontSize:15,color:C.muted,lineHeight:1.65,maxWidth:500,margin:'0 auto'}}>Generate a real Monday Brief for your niche. See the script hook, thumbnail blueprint, 4-week calendar, and Shorts ideas — all in one email.</p>
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
                  <button key={n} style={{fontSize:11,fontWeight:600,color:C.muted,backgroundColor:C.s2,border:`1px solid ${C.border}`,padding:'5px 12px',borderRadius:20,cursor:'pointer',fontFamily:'inherit'}}
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
              <div style={{textAlign:'center',marginTop:28,padding:'22px',backgroundColor:C.goldDim,border:`1px solid ${C.goldBorder}`,borderRadius:12}}>
                <div style={{fontSize:15,fontWeight:800,color:C.gold,marginBottom:6}}>This hits your inbox every Monday at 7am.</div>
                <div style={{fontSize:13,color:C.mid,marginBottom:16}}>Join the preview list to be in the first batch.</div>
                <button style={btnP} onClick={()=>document.getElementById('access')?.scrollIntoView({behavior:'smooth'})}>Request Early Access →</button>
              </div>
            )}
          </div>
        </div>

        {/* COMPARISON */}
        <ComparisonSection/>

        {/* SUITE */}
        <div ref={suiteRef} id="suite" style={{padding:'80px 24px',borderBottom:`1px solid ${C.border}`}}>
          <div style={{maxWidth:960,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:44,...anim(suiteV)}}>
              <div style={{fontSize:10,fontWeight:700,color:C.gold,letterSpacing:'0.14em',textTransform:'uppercase',marginBottom:14}}>The Suite</div>
              <h2 style={{fontSize:'clamp(26px,3.8vw,42px)',fontWeight:900,letterSpacing:'-1.2px'}}>Four tools. One niche.</h2>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gridTemplateRows:'auto auto',gap:14}}>
              <div className="ch" style={{...anim(suiteV),gridColumn:'1',gridRow:'1/3',backgroundColor:C.s1,border:`1px solid ${C.goldBorder}`,borderRadius:12,padding:'28px 24px',display:'flex',flexDirection:'column',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:0,right:0,backgroundColor:C.gold,color:'#000',fontSize:9,fontWeight:800,letterSpacing:'0.1em',padding:'4px 11px',borderRadius:'0 12px 0 8px'}}>FLAGSHIP</div>
                <div style={{fontSize:32,marginBottom:16}}>📬</div>
                <div style={{fontSize:18,fontWeight:800,color:C.text,marginBottom:4}}>Monday Brief</div>
                <div style={{fontSize:11,color:C.green,marginBottom:18}}>Preview pricing TBA · founding members first</div>
                <div style={{fontSize:13,color:C.muted,lineHeight:1.65,marginBottom:20,flex:1}}>Your complete weekly intelligence brief — script hook, thumbnail blueprint, 4-week calendar, Shorts ideas, competitor pulse, trending questions, and seasonal alerts. Every Monday at 7am.</div>
                <div style={{display:'flex',flexDirection:'column',gap:8}}>
                  {['Niche outlier scan (5 videos)','Script hook — read it on camera','Thumbnail blueprint with guide','4-week content calendar','Competitor pulse (3 channels)','3 Shorts repurpose ideas','Trending questions in your niche','Seasonal opportunity alerts','Niche health score'].map(f=>(
                    <div key={f} style={{display:'flex',gap:8,alignItems:'flex-start'}}>
                      <span style={{color:C.gold,fontSize:11,marginTop:1,flexShrink:0}}>✓</span>
                      <span style={{fontSize:12,color:C.mid}}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              {[{icon:'🔭',name:'Niche Intel',desc:'On-demand outlier dashboard. Scan any niche, track competitors, title formula library.'},
                {icon:'🤝',name:'Sponsor Deals',desc:'Rate calculator, media kit generator, brand pitch CRM. Know your worth.'},
                {icon:'🏷️',name:'Brand Directory',desc:'For outdoor & firearms brands: find and contact 400+ verified creators.'}].map(({icon,name,desc},i)=>(
                <div key={name} className="ch" style={{...anim(suiteV,.1+i*.06),backgroundColor:C.s1,border:`1px solid ${C.border}`,borderRadius:12,padding:'22px 20px'}}>
                  <div style={{fontSize:26,marginBottom:12}}>{icon}</div>
                  <div style={{fontSize:16,fontWeight:800,color:C.text,marginBottom:6}}>{name}</div>
                  <div style={{fontSize:11,color:C.green,marginBottom:10}}>Pricing TBA</div>
                  <div style={{fontSize:12,color:C.muted,lineHeight:1.65}}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PRICING — preview focus */}
        <div ref={pricingRef} id="pricing" style={{backgroundColor:C.s1,padding:'80px 24px',borderBottom:`1px solid ${C.border}`}}>
          <div style={{maxWidth:680,margin:'0 auto',textAlign:'center'}}>
            <div style={{...anim(pricingV)}}>
              <div style={{fontSize:10,fontWeight:700,color:C.gold,letterSpacing:'0.14em',textTransform:'uppercase',marginBottom:14}}>Preview Pricing</div>
              <h2 style={{fontSize:'clamp(26px,3.8vw,42px)',fontWeight:900,letterSpacing:'-1.2px',marginBottom:14}}>Founding members get the best price. Forever.</h2>
              <p style={{fontSize:15,color:C.muted,maxWidth:480,margin:'0 auto 44px',lineHeight:1.7}}>We're finalizing pricing during the preview phase. Everyone who joins now locks in founding member rates — the lowest we'll ever charge.</p>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:14,...anim(pricingV,.1)}}>
              {[{name:'Monday Brief',preview:'~$29/mo',note:'Weekly email brief',items:['Script hook','Thumbnail blueprint','4-week calendar','Competitor pulse','Shorts ideas','Seasonal alerts']},
                {name:'Niche Intel',preview:'~$49/mo',note:'On-demand dashboard',items:['Everything in Brief','On-demand scans','Competitor tracking','Title formulas']},
                {name:'Full Bundle',preview:'~$69/mo',note:'Best value',badge:'SAVE',items:['Monday Brief','Niche Intel','Sponsor Deals','Priority access']}].map(({name,preview,note,badge,items})=>(
                <div key={name} className="ch" style={{backgroundColor:C.s2,border:`1px solid ${C.border}`,borderRadius:12,padding:'20px 18px',position:'relative',overflow:'hidden'}}>
                  {badge&&<div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',backgroundColor:C.green,color:'#000',fontSize:9,fontWeight:800,padding:'3px 10px',borderRadius:'0 0 6px 6px'}}>{badge}</div>}
                  <div style={{marginTop:badge?14:0}}>
                    <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:4}}>{name}</div>
                    <div style={{fontSize:20,fontWeight:900,color:C.gold,letterSpacing:'-0.8px',marginBottom:3}}>{preview}</div>
                    <div style={{fontSize:10,color:C.muted,marginBottom:14}}>{note} · founding rate</div>
                    <div style={{borderTop:`1px solid ${C.border}`,paddingTop:10}}>
                      {items.map(f=><div key={f} style={{display:'flex',gap:6,marginBottom:6}}><span style={{color:C.gold,fontSize:10,marginTop:1}}>✓</span><span style={{fontSize:11,color:C.mid}}>{f}</span></div>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:20,padding:'14px 20px',backgroundColor:C.goldDim,border:`1px solid ${C.goldBorder}`,borderRadius:10,fontSize:13,color:C.mid}}>
              Preview pricing locks in permanently when you join. Request access below to secure your founding rate.
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div ref={faqRef} style={{padding:'80px 24px',borderBottom:`1px solid ${C.border}`}} id="faq">
          <div style={{maxWidth:680,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:44,...anim(faqV)}}>
              <div style={{fontSize:10,fontWeight:700,color:C.gold,letterSpacing:'0.14em',textTransform:'uppercase',marginBottom:14}}>FAQ</div>
              <h2 style={{fontSize:'clamp(24px,3.5vw,38px)',fontWeight:900,letterSpacing:'-1px'}}>Questions we get asked.</h2>
            </div>
            {[["Is the data real or AI-generated?","The outlier detection uses real YouTube Data API — actual view counts, channel averages, timing patterns. Claude AI analyzes those patterns to generate the written insights, script hooks, and thumbnail blueprints. Real data. AI-assisted writing."],["Why focus only on outdoor, firearms, and hunting?","Because generic tools fail at vertical niches. TubeLab doesn't know that firearms content gets age-gated differently, that deer season affects your content calendar, or that 'suppressors' and 'silencers' are the same search term. We do."],["How is this different from TubeLab?","TubeLab requires you to log in and browse 5M+ videos yourself. We deliver the brief to you. TubeLab has no outdoor niche knowledge. We do. Same price — but we do all the work for you."],["How is this different from VidIQ's daily ideas?","VidIQ's daily ideas go to 20M+ creators. Everyone in your niche gets similar suggestions. We detect actual outliers in your specific niche this week and explain exactly why each one performed — plus give you the script, thumbnail, calendar, and Shorts ideas."],["When does the preview launch?","We're accepting preview requests now and launching in batches. Everyone on the list gets access before we open publicly. Founding pricing locks in on signup."]].map(([q,a],i)=>(
              <FaqItem key={q} q={q} a={a} visible={faqV} delay={i*.07}/>
            ))}
          </div>
        </div>

        {/* EARLY ACCESS CTA — no trial, just preview signup */}
        <div id="access" style={{backgroundColor:C.s1,padding:'88px 24px',borderBottom:`1px solid ${C.border}`,position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse 70% 60% at 50% 100%,${C.gold}12,transparent)`,pointerEvents:'none'}}/>
          <div style={{maxWidth:580,margin:'0 auto',textAlign:'center',position:'relative',zIndex:1}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:11,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:C.gold,backgroundColor:C.goldDim,border:`1px solid ${C.goldBorder}`,padding:'6px 14px',borderRadius:4,marginBottom:24}}>
              <Dot color={C.green} size={6} pulse/>
              {count} outdoor creators requested early access
            </div>
            <h2 style={{fontSize:'clamp(30px,4.5vw,52px)',fontWeight:900,letterSpacing:'-1.8px',marginBottom:16,lineHeight:1.05}}>
              Request early access.
            </h2>
            <p style={{fontSize:16,color:C.muted,lineHeight:1.65,maxWidth:440,margin:'0 auto 32px'}}>
              We're launching in batches. Join the preview list and we'll reach out when your spot opens — with founding member pricing locked in.
            </p>
            {!joined?(
              <>
                <div style={{display:'flex',gap:10,maxWidth:440,margin:'0 auto',flexWrap:'wrap',justifyContent:'center'}}>
                  <input style={inp} type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&getAccess()}/>
                  <button style={btnP} onClick={getAccess}>Request Access →</button>
                </div>
                <div style={{fontSize:12,color:C.muted,marginTop:16}}>No credit card. No commitment. We'll reach out personally when your spot is ready.</div>
              </>
            ):(
              <div style={{backgroundColor:C.greenDim,border:`1px solid ${C.greenBorder}`,borderRadius:12,padding:'24px 28px',maxWidth:400,margin:'0 auto'}}>
                <div style={{fontSize:22,fontWeight:800,color:C.green,marginBottom:8}}>✓ Request received.</div>
                <div style={{fontSize:14,color:C.mid,lineHeight:1.65}}>You're #{count} on the preview list. We'll reach out personally when your spot opens — with founding pricing.</div>
              </div>
            )}
          </div>
        </div>

        <footer style={{padding:'28px 36px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
          <div style={{display:'flex',alignItems:'center',gap:8,fontSize:13,fontWeight:800}}><Dot color={C.gold} size={6}/>DownRange<span style={{color:C.gold}}>Intel</span></div>
          <div style={{fontSize:12,color:C.muted}}>YouTube intelligence for the niche nobody built for.</div>
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
