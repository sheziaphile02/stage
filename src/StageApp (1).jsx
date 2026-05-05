import { useState, useEffect, useRef, useMemo, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
//  S T A G E  v2.1  —  Church AV Software
//  Built for the Lord's Church
// ═══════════════════════════════════════════════════════════════

const GF = `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;700&family=JetBrains+Mono:wght@400;600&display=swap');`;

const HYMNS = [
  { id:1, title:"Amazing Grace", lyrics:`[Verse 1]\nAmazing grace how sweet the sound\nThat saved a wretch like me\nI once was lost but now am found\nWas blind but now I see\n\n[Verse 2]\n'Twas grace that taught my heart to fear\nAnd grace my fears relieved\nHow precious did that grace appear\nThe hour I first believed\n\n[Verse 3]\nThrough many dangers toils and snares\nI have already come\n'Tis grace has brought me safe thus far\nAnd grace will lead me home\n\n[Chorus]\nMy chains are gone I've been set free\nMy God my Savior has ransomed me\nAnd like a flood His mercy reigns\nUnending love amazing grace` },
  { id:2, title:"Holy Holy Holy", lyrics:`[Verse 1]\nHoly holy holy Lord God Almighty\nEarly in the morning our song shall rise to Thee\nHoly holy holy merciful and mighty\nGod in three persons blessed Trinity\n\n[Verse 2]\nHoly holy holy all the saints adore Thee\nCasting down their golden crowns around the glassy sea\nCherubim and seraphim falling down before Thee\nWhich wert and art and evermore shalt be\n\n[Verse 3]\nHoly holy holy though the darkness hide Thee\nThough the eye of sinful man Thy glory may not see\nOnly Thou art holy there is none beside Thee\nPerfect in power in love and purity` },
  { id:3, title:"Blessed Assurance", lyrics:`[Verse 1]\nBlessed assurance Jesus is mine\nO what a foretaste of glory divine\nHeir of salvation purchase of God\nBorn of His Spirit washed in His blood\n\n[Chorus]\nThis is my story this is my song\nPraising my Savior all the day long\nThis is my story this is my song\nPraising my Savior all the day long\n\n[Verse 2]\nPerfect submission perfect delight\nVisions of rapture now burst on my sight\nAngels descending bring from above\nEchoes of mercy whispers of love` },
  { id:4, title:"It Is Well With My Soul", lyrics:`[Verse 1]\nWhen peace like a river attendeth my way\nWhen sorrows like sea billows roll\nWhatever my lot Thou hast taught me to say\nIt is well it is well with my soul\n\n[Chorus]\nIt is well with my soul\nIt is well it is well with my soul\n\n[Verse 2]\nThough Satan should buffet though trials should come\nLet this blest assurance control\nThat Christ hath regarded my helpless estate\nAnd hath shed His own blood for my soul` },
  { id:5, title:"What a Friend We Have in Jesus", lyrics:`[Verse 1]\nWhat a friend we have in Jesus\nAll our sins and griefs to bear\nWhat a privilege to carry\nEverything to God in prayer\nO what peace we often forfeit\nO what needless pain we bear\nAll because we do not carry\nEverything to God in prayer\n\n[Verse 2]\nHave we trials and temptations\nIs there trouble anywhere\nWe should never be discouraged\nTake it to the Lord in prayer\nCan we find a friend so faithful\nWho will all our sorrows share\nJesus knows our every weakness\nTake it to the Lord in prayer` },
  { id:6, title:"The Old Rugged Cross", lyrics:`[Verse 1]\nOn a hill far away stood an old rugged cross\nThe emblem of suffering and shame\nAnd I love that old cross where the dearest and best\nFor a world of lost sinners was slain\n\n[Chorus]\nSo I'll cherish the old rugged cross\nTill my trophies at last I lay down\nI will cling to the old rugged cross\nAnd exchange it some day for a crown\n\n[Verse 2]\nO that old rugged cross so despised by the world\nHas a wondrous attraction for me\nFor the dear Lamb of God left His glory above\nTo bear it to dark Calvary` },
  { id:7, title:"To God Be the Glory", lyrics:`[Verse 1]\nTo God be the glory great things He hath done\nSo loved He the world that He gave us His Son\nWho yielded His life an atonement for sin\nAnd opened the lifegate that all may go in\n\n[Chorus]\nPraise the Lord praise the Lord\nLet the earth hear His voice\nPraise the Lord praise the Lord\nLet the people rejoice\nO come to the Father through Jesus the Son\nAnd give Him the glory great things He hath done` },
  { id:8, title:"Be Thou My Vision", lyrics:`[Verse 1]\nBe Thou my vision O Lord of my heart\nNaught be all else to me save that Thou art\nThou my best thought by day or by night\nWaking or sleeping Thy presence my light\n\n[Verse 2]\nBe Thou my wisdom and Thou my true word\nI ever with Thee and Thou with me Lord\nThou my great Father I Thy true son\nThou in me dwelling and I with Thee one\n\n[Verse 3]\nHigh King of Heaven my victory won\nMay I reach Heaven's joys O bright Heaven's Sun\nHeart of my own heart whatever befall\nStill be my vision O Ruler of all` },
  { id:9, title:"Crown Him With Many Crowns", lyrics:`[Verse 1]\nCrown Him with many crowns\nThe Lamb upon His throne\nHark how the heavenly anthem drowns\nAll music but its own\nAwake my soul and sing\nOf Him who died for thee\nAnd hail Him as thy matchless King\nThrough all eternity` },
  { id:10, title:"Come Thou Fount", lyrics:`[Verse 1]\nCome Thou Fount of every blessing\nTune my heart to sing Thy grace\nStreams of mercy never ceasing\nCall for songs of loudest praise\nTeach me some melodious sonnet\nSung by flaming tongues above\nPraise the mount I'm fixed upon it\nMount of Thy redeeming love\n\n[Verse 2]\nHere I raise my Ebenezer\nHither by Thy help I'm come\nAnd I hope by Thy good pleasure\nSafely to arrive at home\nJesus sought me when a stranger\nWandering from the fold of God` },
  { id:11, title:"Rock of Ages", lyrics:`[Verse 1]\nRock of ages cleft for me\nLet me hide myself in Thee\nLet the water and the blood\nFrom Thy riven side which flowed\nBe of sin the double cure\nCleanse me from its guilt and power\n\n[Verse 2]\nNot the labor of my hands\nCan fulfill Thy law's demands\nAll for sin could not atone\nThou must save and Thou alone` },
  { id:12, title:"All Hail the Power", lyrics:`[Verse 1]\nAll hail the power of Jesus' name\nLet angels prostrate fall\nBring forth the royal diadem\nAnd crown Him Lord of all\n\n[Verse 2]\nYe chosen seed of Israel's race\nYe ransomed from the fall\nHail Him who saves you by His grace\nAnd crown Him Lord of all` },
  { id:13, title:"How Firm a Foundation", lyrics:`[Verse 1]\nHow firm a foundation ye saints of the Lord\nIs laid for your faith in His excellent word\nWhat more can He say than to you He hath said\nTo you who for refuge to Jesus have fled\n\n[Verse 2]\nFear not I am with thee O be not dismayed\nFor I am thy God and will still give thee aid` },
  { id:14, title:"O For a Thousand Tongues", lyrics:`[Verse 1]\nO for a thousand tongues to sing\nMy great Redeemer's praise\nThe glories of my God and King\nThe triumphs of His grace\n\n[Verse 2]\nJesus the name that charms our fears\nThat bids our sorrows cease\n'Tis music in the sinner's ears\n'Tis life and health and peace` },
  { id:15, title:"Fairest Lord Jesus", lyrics:`[Verse 1]\nFairest Lord Jesus\nRuler of all nature\nO Thou of God and man the Son\nThee will I cherish\nThee will I honor\nThou my soul's glory joy and crown\n\n[Verse 2]\nFair are the meadows\nFairer still the woodlands\nRobed in the blooming garb of spring\nJesus is fairer\nJesus is purer\nWho makes the woeful heart to sing` },
];

const BIBLE = [
  { ref:"John 3:16", text:"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
  { ref:"Psalm 23:1-3", text:"The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul." },
  { ref:"Romans 8:28", text:"And we know that in all things God works for the good of those who love him, who have been called according to his purpose." },
  { ref:"Philippians 4:13", text:"I can do all this through him who gives me strength." },
  { ref:"Proverbs 3:5-6", text:"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." },
  { ref:"Isaiah 40:31", text:"But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint." },
  { ref:"Jeremiah 29:11", text:"For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future." },
  { ref:"Matthew 11:28", text:"Come to me, all you who are weary and burdened, and I will give you rest." },
  { ref:"John 14:6", text:"Jesus answered, I am the way and the truth and the life. No one comes to the Father except through me." },
  { ref:"Psalm 46:1", text:"God is our refuge and strength, an ever-present help in trouble." },
  { ref:"Isaiah 41:10", text:"So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you." },
  { ref:"Hebrews 11:1", text:"Now faith is confidence in what we hope for and assurance about what we do not see." },
  { ref:"Psalm 118:24", text:"The Lord has done it this very day; let us rejoice today and be glad." },
  { ref:"Galatians 5:22-23", text:"But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control." },
  { ref:"Psalm 150:6", text:"Let everything that has breath praise the Lord. Praise the Lord." },
  { ref:"Matthew 28:19", text:"Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit." },
  { ref:"Revelation 21:4", text:"He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain." },
  { ref:"1 Corinthians 13:4", text:"Love is patient, love is kind. It does not envy, it does not boast, it is not proud." },
  { ref:"Romans 10:9", text:"If you declare with your mouth Jesus is Lord and believe in your heart that God raised him from the dead, you will be saved." },
  { ref:"Ephesians 2:8", text:"For it is by grace you have been saved, through faith, and this is not from yourselves, it is the gift of God." },
];

const THEMES = {
  midnight: { name:"Midnight", bg:"#07070f", surf:"#0f0f1c", surf2:"#17172a", acc:"#e8b84b", text:"#e8e8f4", muted:"rgba(255,255,255,0.32)", bdr:"rgba(255,255,255,0.07)" },
  royal:    { name:"Royal",    bg:"#080010", surf:"#100020", surf2:"#180030", acc:"#c8a0ff", text:"#f0eaff", muted:"rgba(240,234,255,0.32)", bdr:"rgba(200,160,255,0.1)" },
  ocean:    { name:"Ocean",    bg:"#01080f", surf:"#03162a", surf2:"#052040", acc:"#00d4f0", text:"#e0f4ff", muted:"rgba(224,244,255,0.32)", bdr:"rgba(0,212,240,0.1)" },
  dawn:     { name:"Dawn",     bg:"#0f0700", surf:"#1c1000", surf2:"#281800", acc:"#ff9940", text:"#fff0e0", muted:"rgba(255,240,224,0.32)", bdr:"rgba(255,153,64,0.1)" },
  light:    { name:"Light",    bg:"#f0ede8", surf:"#ffffff", surf2:"#f5f2ee", acc:"#2a4a7a", text:"#1a1a2e", muted:"rgba(26,26,46,0.4)", bdr:"rgba(0,0,0,0.08)" },
};

const DEF_FOLDERS = [
  { id:1, name:"Sunday Morning", icon:"☀️", items:[] },
  { id:2, name:"Wednesday Study", icon:"📖", items:[] },
  { id:3, name:"Youth Service", icon:"⚡", items:[] },
  { id:4, name:"Christmas", icon:"✨", items:[] },
  { id:5, name:"Easter", icon:"🌸", items:[] },
];

// ── ANIMATED BACKGROUNDS ─────────────────────────────────────
function Clouds() {
  const c = useMemo(() => Array.from({length:12},(_,i) => ({ top:`${8+(i*7)%80}%`, w:70+((i*41)%150), h:35+((i*27)%60), dur:20+((i*9)%25), delay:-((i*11)%28), op:0.6+((i*3)%4)*0.1 })), []);
  return (
    <div style={{position:"absolute",inset:0,overflow:"hidden",background:"linear-gradient(180deg,#0d2444,#1a5090,#4a9ad4)"}}>
      {c.map((x,i) => <div key={i} style={{position:"absolute",top:x.top,width:x.w,height:x.h,background:"rgba(255,255,255,0.88)",borderRadius:"50%",opacity:x.op,filter:"blur(3px)",boxShadow:`${x.w*0.3}px 0 0 ${x.w*0.15}px rgba(255,255,255,0.7)`,animation:`stgCloud ${x.dur}s ${x.delay}s infinite linear`}}/>)}
    </div>
  );
}
function Stars() {
  const s = useMemo(() => Array.from({length:130},(_,i) => ({ l:`${(i*7.3+2)%100}%`, t:`${(i*4.9+1)%100}%`, sz:1+((i*3)%3), dur:2+((i*1.4)%4), dl:-((i*0.8)%4), op:0.2+((i*7)%7)*0.1 })), []);
  return (
    <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 30%,#0a0a2a,#020210)"}}>
      {s.map((x,i) => <div key={i} style={{position:"absolute",left:x.l,top:x.t,width:x.sz,height:x.sz,borderRadius:"50%",background:"#fff",opacity:x.op,animation:`stgStar ${x.dur}s ${x.dl}s infinite ease-in-out`}}/>)}
    </div>
  );
}
function Rain() {
  const d = useMemo(() => Array.from({length:60},(_,i) => ({ l:`${(i*1.67)%100}%`, h:10+((i*4)%20), dur:0.4+((i*0.04)%0.8), dl:-((i*0.09)%1.5), op:0.25+((i*9)%6)*0.08 })), []);
  return (
    <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#080e18,#0f1e2e)"}}>
      {d.map((x,i) => <div key={i} style={{position:"absolute",left:x.l,top:0,width:1,height:x.h,background:"rgba(160,210,255,0.8)",opacity:x.op,transform:"rotate(10deg)",animation:`stgRain ${x.dur}s ${x.dl}s infinite linear`}}/>)}
    </div>
  );
}
function Waterfall() {
  const s = useMemo(() => Array.from({length:40},(_,i) => ({ l:`${1+(i*2.5)%97}%`, w:2+((i*4)%7), dur:0.7+((i*0.05)%1.3), dl:-((i*0.12)%2.5), op:0.3+((i*9)%6)*0.09 })), []);
  return (
    <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#081808,#0f2810,#162a10)"}}>
      {s.map((x,i) => <div key={i} style={{position:"absolute",left:x.l,top:0,bottom:0,width:x.w,background:"linear-gradient(180deg,transparent,rgba(180,230,255,0.65),rgba(255,255,255,0.5),rgba(180,230,255,0.4),transparent)",opacity:x.op,filter:"blur(0.5px)",animation:`stgWater ${x.dur}s ${x.dl}s infinite linear`}}/>)}
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:60,background:"rgba(180,230,255,0.1)",filter:"blur(10px)"}}/>
    </div>
  );
}
function Sunrise() {
  const rays = useMemo(() => Array.from({length:12},(_,i) => i), []);
  return (
    <div style={{position:"absolute",inset:0,animation:"stgDawn 18s infinite ease-in-out"}}>
      <div style={{position:"absolute",bottom:"15%",left:"50%",transform:"translateX(-50%)",width:240,height:240,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,210,80,0.7),rgba(255,130,0,0.4) 40%,transparent 70%)",animation:"stgSun 5s infinite ease-in-out"}}/>
      {rays.map(i => <div key={i} style={{position:"absolute",bottom:"15%",left:"50%",width:2,height:`${25+i*3}%`,background:"linear-gradient(0deg,rgba(255,200,60,0.35),transparent)",transformOrigin:"bottom center",transform:`translateX(-50%) rotate(${i*30}deg)`,animation:`stgRay 4s ${i*0.3}s infinite ease-in-out`}}/>)}
    </div>
  );
}
function OceanBg() {
  const waves = useMemo(() => Array.from({length:5},(_,i) => i), []);
  return (
    <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#020c1a,#041828,#063060)"}}>
      {waves.map(i => <div key={i} style={{position:"absolute",bottom:`${i*10}%`,left:"-30%",width:"160%",height:50+i*20,background:`rgba(${20+i*12},${80+i*25},${160+i*18},${0.25+i*0.08})`,borderRadius:"40%",animation:`stgWave ${5+i*2}s ${-i*1.8}s infinite linear`}}/>)}
    </div>
  );
}
function AnimBg({ type }) {
  if (type==="clouds") return <Clouds/>;
  if (type==="stars") return <Stars/>;
  if (type==="rain") return <Rain/>;
  if (type==="waterfall") return <Waterfall/>;
  if (type==="sunrise") return <Sunrise/>;
  if (type==="ocean") return <OceanBg/>;
  return null;
}

// ── PROJECTOR VIEW ────────────────────────────────────────────
function ProjectorView() {
  const [live, setLive] = useState(null);
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "stage-live") {
        try { setLive(JSON.parse(e.newValue)); } catch {}
      }
    };
    window.addEventListener("storage", handler);
    try { const cur = localStorage.getItem("stage-live"); if (cur) setLive(JSON.parse(cur)); } catch {}
    return () => window.removeEventListener("storage", handler);
  }, []);

  const tk = live?.theme || "midnight";
  const t = THEMES[tk] || THEMES.midnight;
  const bg = live?.bg || "none";
  const fs = live?.fontSize || 52;

  return (
    <div style={{width:"100vw",height:"100vh",background:t.bg,position:"relative",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",cursor:"none"}}>
      <style>{GF}{ANIM_CSS}</style>
      {live?.customBg
        ? <div style={{position:"absolute",inset:0,backgroundImage:`url(${live.customBg})`,backgroundSize:"cover",backgroundPosition:"center",filter:"brightness(0.45)"}}/>
        : <AnimBg type={bg}/>
      }
      {live?.blackout && <div style={{position:"absolute",inset:0,background:"#000",zIndex:50}}/>}
      <div style={{position:"relative",zIndex:10,textAlign:"center",padding:"60px 80px",maxWidth:1100,width:"100%"}}>
        {!live && <div style={{fontFamily:"'Cinzel',serif",fontSize:24,color:"rgba(255,255,255,0.12)"}}>Waiting for STAGE operator...</div>}
        {live?.type==="lyric" && (
          live.isSection
            ? <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:16,color:t.acc,letterSpacing:5,textTransform:"uppercase",opacity:0.8}}>{live.text.slice(1,-1)}</div>
            : <div style={{fontFamily:"'Cinzel',serif",fontSize:fs,fontWeight:700,color:"#fff",lineHeight:1.35,textShadow:`0 0 60px ${t.acc}99,0 2px 40px rgba(0,0,0,0.9)`}}>{live.text}</div>
        )}
        {live?.type==="slide" && <>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:Math.round(fs*0.85),fontWeight:700,color:"#fff",marginBottom:20,textShadow:`0 0 40px ${t.acc}77`}}>{live.title}</div>
          {live.title&&live.body&&<div style={{width:60,height:3,background:t.acc,margin:"0 auto 24px",borderRadius:2,boxShadow:`0 0 12px ${t.acc}`}}/>}
          <div style={{fontFamily:"'Lato',sans-serif",fontSize:Math.round(fs*0.38),color:"rgba(255,255,255,0.85)",lineHeight:1.85,whiteSpace:"pre-wrap"}}>{live.body}</div>
        </>}
        {live?.type==="verse" && <>
          <div style={{fontFamily:"'Cinzel',serif",fontStyle:"italic",fontSize:Math.round(fs*0.72),fontWeight:600,color:"#fff",lineHeight:1.55,textShadow:`0 0 50px ${t.acc}66`}}>"{live.text}"</div>
          <div style={{marginTop:28,fontFamily:"'JetBrains Mono',monospace",fontSize:15,color:t.acc,letterSpacing:3}}>— {live.ref}</div>
        </>}
      </div>
      {live?.songTitle && live?.type==="lyric" && !live?.isSection && (
        <div style={{position:"absolute",bottom:20,right:28,fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"rgba(255,255,255,0.2)",letterSpacing:2}}>{live.songTitle.toUpperCase()}</div>
      )}
    </div>
  );
}

const ANIM_CSS = `
  @keyframes stgCloud { from{transform:translateX(110vw)} to{transform:translateX(-350px)} }
  @keyframes stgStar  { 0%,100%{opacity:0.1} 50%{opacity:1} }
  @keyframes stgRain  { from{transform:translateY(-30px) rotate(10deg)} to{transform:translateY(101vh) rotate(10deg)} }
  @keyframes stgWater { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
  @keyframes stgWave  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes stgDawn  {
    0%{background:radial-gradient(ellipse at 50% 100%,#200008,#08001a,#000010)}
    30%{background:radial-gradient(ellipse at 50% 100%,#cc2200,#660800,#080018)}
    60%{background:radial-gradient(ellipse at 50% 100%,#ffaa00,#ff6600 15%,#882200 40%,#1a1060 70%)}
    80%{background:radial-gradient(ellipse at 50% 100%,#ffd060,#ff9933 18%,#4488cc 50%,#1a2878 75%)}
    100%{background:radial-gradient(ellipse at 50% 100%,#200008,#08001a,#000010)}
  }
  @keyframes stgSun { 0%,100%{opacity:0.6;transform:translateX(-50%) scale(1)} 50%{opacity:0.95;transform:translateX(-50%) scale(1.18)} }
  @keyframes stgRay { 0%,100%{opacity:0.25} 50%{opacity:0.65} }
  @keyframes stgFade { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes stgDot  { 0%,80%,100%{transform:scale(0.5);opacity:0.3} 40%{transform:scale(1);opacity:1} }
`;

const makeCSS = (t, fs) => `
${GF}${ANIM_CSS}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{overflow:hidden;background:${t.bg};user-select:none}
.app{width:100vw;height:100vh;background:${t.bg};color:${t.text};font-family:'Lato',sans-serif;display:flex;flex-direction:column;overflow:hidden}
.hdr{height:52px;min-height:52px;background:${t.surf};border-bottom:1px solid ${t.bdr};display:flex;align-items:center;padding:0 18px;gap:12px;z-index:200}
.logo{font-family:'Cinzel',serif;font-size:20px;font-weight:700;color:${t.acc};letter-spacing:6px;text-transform:uppercase}
.tabs{display:flex;gap:2px}
.tab{padding:6px 14px;border-radius:6px;border:none;cursor:pointer;font-family:'Lato',sans-serif;font-size:13px;font-weight:700;background:transparent;color:${t.muted};transition:all 0.15s}
.tab:hover{color:${t.text};background:rgba(255,255,255,0.05)}
.tab.on{background:rgba(255,255,255,0.06);color:${t.acc};border:1px solid rgba(255,255,255,0.1)}
.hdr-r{display:flex;align-items:center;gap:6px;margin-left:auto}
.hbtn{padding:5px 12px;border-radius:6px;border:1px solid ${t.bdr};background:${t.surf2};color:${t.muted};cursor:pointer;font-size:12px;font-family:'Lato',sans-serif;font-weight:700;transition:all 0.15s}
.hbtn:hover{color:${t.text}}
.hbtn.acc{border-color:${t.acc};color:${t.acc};background:rgba(255,255,255,0.04)}
.hbtn.blk{border-color:rgba(255,80,80,0.4);color:#ff8888;background:rgba(255,60,60,0.08)}
.hbtn.blk.on{background:rgba(255,60,60,0.25);color:#ff4444;box-shadow:0 0 10px rgba(255,60,60,0.3)}
.content{flex:1;display:flex;overflow:hidden}
.lp{width:255px;min-width:255px;background:${t.surf};border-right:1px solid ${t.bdr};display:flex;flex-direction:column;overflow:hidden}
.rp{width:265px;min-width:265px;background:${t.surf};border-left:1px solid ${t.bdr};display:flex;flex-direction:column;overflow:hidden}
.stage{flex:1;display:flex;flex-direction:column;overflow:hidden}
.ps{padding:12px;border-bottom:1px solid ${t.bdr}}
.ps.grow{flex:1;display:flex;flex-direction:column;border-bottom:none}
.plbl{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${t.muted};margin-bottom:8px;font-family:'JetBrains Mono',monospace}
.scr{overflow-y:auto;flex:1}
.scr::-webkit-scrollbar{width:3px}
.scr::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}
.inp{width:100%;padding:7px 10px;border-radius:6px;border:1px solid ${t.bdr};background:rgba(255,255,255,0.04);color:${t.text};font-family:'Lato',sans-serif;font-size:13px;outline:none;transition:border-color 0.2s}
.inp:focus{border-color:${t.acc}}
.inp::placeholder{color:${t.muted}}
textarea.inp{resize:none;line-height:1.65}
.btn{padding:7px 13px;border-radius:6px;border:1px solid ${t.bdr};background:${t.surf2};color:${t.text};cursor:pointer;font-family:'Lato',sans-serif;font-size:12px;font-weight:700;transition:all 0.15s;white-space:nowrap}
.btn:hover{background:rgba(255,255,255,0.08)}
.btn.acc{background:rgba(255,255,255,0.05);border-color:${t.acc};color:${t.acc}}
.btn.danger{border-color:rgba(255,80,80,0.3);color:#ff8888;background:rgba(255,60,60,0.06)}
.btn.playing{border-color:rgba(255,80,80,0.4);color:#ff8888;background:rgba(255,60,60,0.1)}
.btn.full{width:100%;text-align:center}
.btn.lg{padding:9px 16px;font-size:13px}
.row{display:flex;gap:6px;align-items:center}
.flex1{flex:1}
.g6{display:flex;flex-direction:column;gap:6px}
.g8{display:flex;flex-direction:column;gap:8px}
.mt8{margin-top:8px}
.sm{font-size:12px;color:${t.muted}}
.smm{font-size:11px;color:${t.muted};font-family:'JetBrains Mono',monospace}
.div{border:none;border-top:1px solid ${t.bdr};margin:10px 0}
input[type=range]{accent-color:${t.acc};flex:1;cursor:pointer}
.li{padding:8px 10px;border-radius:6px;margin-bottom:4px;border:1px solid ${t.bdr};cursor:pointer;transition:all 0.15s;display:flex;align-items:center;gap:8px}
.li:hover{border-color:rgba(255,255,255,0.18);background:rgba(255,255,255,0.03)}
.li.on{border-color:${t.acc};background:rgba(255,255,255,0.05)}
.li-name{font-size:12px;font-weight:700;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.li-num{font-size:10px;color:${t.muted};font-family:'JetBrains Mono',monospace;margin-bottom:2px}
.si{padding:8px 10px;border-radius:6px;margin-bottom:4px;border:1px solid ${t.bdr};display:flex;align-items:center;gap:8px;cursor:pointer;transition:all 0.15s}
.si:hover{border-color:rgba(255,255,255,0.15)}
.si.live{border-color:${t.acc};background:rgba(255,255,255,0.05)}
.si-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.si-title{font-size:12px;font-weight:700;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.si-acts{display:flex;gap:3px;opacity:0;transition:opacity 0.15s}
.si:hover .si-acts{opacity:1}
.mbtn{width:22px;height:22px;border-radius:4px;border:1px solid ${t.bdr};background:transparent;color:${t.muted};cursor:pointer;font-size:11px;display:flex;align-items:center;justify-content:center;transition:all 0.15s}
.mbtn:hover{color:${t.text};background:rgba(255,255,255,0.08)}
.disp{flex:1;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#030308}
.disp-c{position:relative;z-index:2;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 80px;text-align:center}
.ctrl{height:52px;min-height:52px;background:${t.surf};border-top:1px solid ${t.bdr};display:flex;align-items:center;padding:0 14px;gap:8px}
.tbar{background:${t.surf};border-top:1px solid ${t.bdr};padding:7px 16px;display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.tbtn{padding:3px 9px;border-radius:5px;border:1px solid ${t.bdr};background:transparent;font-size:11px;cursor:pointer;font-family:'JetBrains Mono',monospace;color:${t.muted};transition:all 0.15s}
.tbtn:hover{color:${t.text}}
.tbtn.on{border-color:${t.acc};color:${t.acc};background:rgba(255,255,255,0.04)}
.vi{padding:8px 10px;border-radius:6px;margin-bottom:4px;border:1px solid ${t.bdr};cursor:pointer;transition:all 0.15s}
.vi:hover{border-color:rgba(255,255,255,0.18)}
.vi.on{border-color:${t.acc}}
.vi-ref{font-size:11px;color:${t.acc};font-family:'JetBrains Mono',monospace;margin-bottom:3px}
.vi-txt{font-size:11px;color:${t.muted};overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.lbadge{padding:3px 9px;border-radius:4px;background:rgba(255,60,60,0.12);border:1px solid rgba(255,80,80,0.3);color:#ff8888;font-size:11px;font-family:'JetBrains Mono',monospace;letter-spacing:2px;font-weight:700}
.dot{width:8px;height:8px;border-radius:50%;background:${t.acc};animation:stgDot 1.2s infinite ease-in-out}
.dot:nth-child(2){animation-delay:0.2s}.dot:nth-child(3){animation-delay:0.4s}
.prog{flex:1;height:3px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden}
.prog-f{height:100%;border-radius:2px;transition:width 0.4s ease}
.beat{display:flex;gap:4px;align-items:flex-end;height:26px}
.beat-b{width:4px;border-radius:2px;transition:height 0.15s ease}
.bgup{width:100%;height:44px;border-radius:6px;border:1px dashed ${t.bdr};background:rgba(255,255,255,0.02);display:flex;align-items:center;justify-content:center;font-size:11px;color:${t.muted};cursor:pointer;position:relative;overflow:hidden}
.bgup img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.5}
.toggle{width:40px;height:22px;border-radius:11px;border:1px solid ${t.bdr};background:rgba(255,255,255,0.06);cursor:pointer;position:relative;transition:all 0.2s;flex-shrink:0}
.toggle.on{background:${t.acc};border-color:${t.acc}}
.toggle::after{content:'';position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:#fff;transition:transform 0.2s}
.toggle.on::after{transform:translateX(18px)}
.spanel{position:fixed;top:0;right:0;bottom:0;width:300px;background:${t.surf};border-left:1px solid ${t.bdr};z-index:500;display:flex;flex-direction:column;box-shadow:-4px 0 20px rgba(0,0,0,0.5)}
.spanel-hdr{padding:16px;border-bottom:1px solid ${t.bdr};display:flex;align-items:center;justify-content:space-between}
.spanel-body{flex:1;overflow-y:auto;padding:16px}
.spanel-body::-webkit-scrollbar{width:3px}
.spanel-body::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}
.srow{margin-bottom:18px}
.slbl{font-size:12px;font-weight:700;color:${t.text};margin-bottom:6px}
.ssub{font-size:11px;color:${t.muted};margin-top:4px;line-height:1.6}
.mp3box{background:rgba(255,255,255,0.03);border:1px solid ${t.bdr};border-radius:8px;padding:12px}
.mp3ttl{font-size:12px;font-weight:700;color:${t.text};margin-bottom:8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mp3seek{flex:1;height:4px;background:rgba(255,255,255,0.1);border-radius:2px;cursor:pointer;position:relative}
.mp3seek-f{height:100%;border-radius:2px;pointer-events:none}
.fstatus{font-size:11px;padding:4px 8px;border-radius:4px;background:rgba(255,255,255,0.04);border:1px solid ${t.bdr};margin-top:6px}
`;

// ── HELPERS ───────────────────────────────────────────────────
const isSec = (l) => l.startsWith("[") && l.endsWith("]");
const fmtTime = (s) => {
  const mins = Math.floor(s / 60);
  const secs = Math.floor(s % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
};
const clamp = (v, mn, mx) => Math.max(mn, Math.min(mx, v));

// ── ROUTER ────────────────────────────────────────────────────
export default function StageApp() {
  if (window.location.pathname === "/projector") return <ProjectorView />;
  return <StageMain />;
}

// ── MAIN ──────────────────────────────────────────────────────
function StageMain() {
  // Settings
  const [showSettings, setShowSettings] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const [fontSize, setFontSize] = useState(52);
  const [themeKey, setThemeKey] = useState("midnight");
  const [bgType, setBgType] = useState("clouds");
  const [customBg, setCustomBg] = useState(null);
  const t = THEMES[themeKey] || THEMES.midnight;

  // App
  const [mode, setMode] = useState("service");
  const [blackout, setBlackout] = useState(false);

  // Live display
  const [liveDisplay, setLiveDisplay] = useState({ type:"blank" });

  const pushLive = useCallback((update) => {
    const next = { ...update, theme: themeKey, bg: bgType, customBg, blackout, fontSize };
    setLiveDisplay(next);
    try { localStorage.setItem("stage-live", JSON.stringify(next)); } catch {}
  }, [themeKey, bgType, customBg, blackout, fontSize]);

  // Sync settings to projector without changing display type
  useEffect(() => {
    try {
      const raw = localStorage.getItem("stage-live");
      if (raw) {
        const parsed = JSON.parse(raw);
        const next = { ...parsed, theme: themeKey, bg: bgType, customBg, blackout, fontSize };
        localStorage.setItem("stage-live", JSON.stringify(next));
        setLiveDisplay(next);
      }
    } catch {}
  }, [themeKey, bgType, customBg, blackout, fontSize]);

  // Folders
  const [folders, setFolders] = useState(() => {
    try { const s = localStorage.getItem("stage-folders"); return s ? JSON.parse(s) : DEF_FOLDERS; } catch { return DEF_FOLDERS; }
  });
  const [selFolder, setSelFolder] = useState(0);
  const [liveIdx, setLiveIdx] = useState(null);
  const [newFolder, setNewFolder] = useState("");
  useEffect(() => { try { localStorage.setItem("stage-folders", JSON.stringify(folders)); } catch {} }, [folders]);

  // Slides
  const [slides, setSlides] = useState([
    { id:1, title:"Welcome", body:"Welcome to Sunday Service\nWe are glad you are here", notes:"Greet congregation." },
    { id:2, title:"Announcements", body:"• Bible Study — Wednesday 7PM\n• Prayer Meeting — Friday 6PM", notes:"" },
    { id:3, title:"Today's Message", body:"Insert sermon title here", notes:"Hand to pastor." },
  ]);
  const [curSlide, setCurSlide] = useState(0);
  const [slideNotes, setSlideNotes] = useState(slides[0].notes);
  const [timerSec, setTimerSec] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerOn) timerRef.current = setInterval(() => setTimerSec(s => s + 1), 1000);
    else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [timerOn]);

  // Music
  const [customSongs, setCustomSongs] = useState(() => {
    try { const s = localStorage.getItem("stage-songs"); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  const [selSong, setSelSong] = useState(HYMNS[0]);
  const [songTitle, setSongTitle] = useState(HYMNS[0].title);
  const [lyricsText, setLyricsText] = useState(HYMNS[0].lyrics);
  const [lyricIdx, setLyricIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [beats, setBeats] = useState([18, 32, 12, 40, 22, 28, 18, 36]);
  const [hymnSearch, setHymnSearch] = useState("");
  const [speed, setSpeed] = useState(3);
  const lyricTimer = useRef(null);
  const beatTimer = useRef(null);
  useEffect(() => { try { localStorage.setItem("stage-songs", JSON.stringify(customSongs)); } catch {} }, [customSongs]);

  // MP3
  const audioRef = useRef(null);
  const [mp3Name, setMp3Name] = useState("");
  const [mp3Url, setMp3Url] = useState(null);
  const [mp3Playing, setMp3Playing] = useState(false);
  const [mp3Volume, setMp3Volume] = useState(0);
  const [mp3Current, setMp3Current] = useState(0);
  const [mp3Duration, setMp3Duration] = useState(0);
  const [fetchStatus, setFetchStatus] = useState("");
  const [manualSearch, setManualSearch] = useState("");

  // Bible
  const [bibleQ, setBibleQ] = useState("John 3:16");
  const [bibleVer, setBibleVer] = useState("web");
  const [bibleResult, setBibleResult] = useState(null);
  const [bibleLoading, setBibleLoading] = useState(false);
  const [bibleErr, setBibleErr] = useState("");
  const [selVerse, setSelVerse] = useState(null);

  const parsedLines = lyricsText.split("\n").map(l => l.trim());

  // ── Slide helpers
  const goSlide = useCallback((i) => {
    const idx = clamp(i, 0, slides.length - 1);
    setCurSlide(idx);
    setSlideNotes(slides[idx]?.notes || "");
    pushLive({ type:"slide", title: slides[idx]?.title || "", body: slides[idx]?.body || "" });
  }, [slides, pushLive]);

  const updSlide = (f, v) => setSlides(sl => sl.map((s, i) => i === curSlide ? { ...s, [f]: v } : s));
  const addSlide = () => setSlides(s => [...s, { id:Date.now(), title:`Slide ${s.length+1}`, body:"", notes:"" }]);
  const delSlide = () => {
    if (slides.length <= 1) return;
    const next = slides.filter((_, i) => i !== curSlide);
    setSlides(next);
    const ni = clamp(curSlide, 0, next.length - 1);
    setCurSlide(ni);
    setSlideNotes(next[ni]?.notes || "");
  };

  // ── Lyric helpers
  const stopKaraoke = useCallback(() => {
    setPlaying(false);
    clearInterval(lyricTimer.current);
    clearInterval(beatTimer.current);
  }, []);

  const sendLine = useCallback((idx, lines, title) => {
    const line = lines[idx];
    if (line !== undefined) {
      pushLive({ type:"lyric", text: line, isSection: isSec(line), songTitle: title });
    }
  }, [pushLive]);

  const moveLyric = useCallback((dir) => {
    setLyricIdx(prev => {
      const next = clamp(prev + dir, 0, parsedLines.length - 1);
      sendLine(next, parsedLines, songTitle);
      return next;
    });
  }, [parsedLines, sendLine, songTitle]);

  const jumpLyric = useCallback((i) => {
    const idx = clamp(i, 0, parsedLines.length - 1);
    setLyricIdx(idx);
    sendLine(idx, parsedLines, songTitle);
  }, [parsedLines, sendLine, songTitle]);

  const startKaraoke = () => {
    if (playing) { stopKaraoke(); return; }
    setPlaying(true);
    setLyricIdx(0);
    sendLine(0, parsedLines, songTitle);
    if (autoScroll) {
      const ms = clamp(4500 - speed * 550, 700, 5000);
      lyricTimer.current = setInterval(() => {
        setLyricIdx(prev => {
          if (prev >= parsedLines.length - 1) { stopKaraoke(); return prev; }
          const next = prev + 1;
          sendLine(next, parsedLines, songTitle);
          return next;
        });
      }, ms);
    }
    beatTimer.current = setInterval(() => {
      setBeats(Array.from({ length: 8 }, () => Math.random() * 26 + 4));
    }, 200);
  };

  useEffect(() => () => { clearInterval(lyricTimer.current); clearInterval(beatTimer.current); }, []);

  const loadSong = (song) => {
    stopKaraoke();
    setSelSong(song);
    setSongTitle(song.title);
    setLyricsText(song.lyrics);
    setLyricIdx(0);
  };

  const saveSong = () => {
    const ex = customSongs.find(s => s.title.toLowerCase() === songTitle.toLowerCase());
    if (ex) setCustomSongs(s => s.map(x => x.id === ex.id ? { ...x, lyrics: lyricsText } : x));
    else setCustomSongs(s => [...s, { id:Date.now(), title: songTitle, lyrics: lyricsText }]);
  };

  const filteredHymns = HYMNS.filter(h => h.title.toLowerCase().includes(hymnSearch.toLowerCase()));

  // ── MP3 helpers
  const handleMp3 = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (mp3Url) URL.revokeObjectURL(mp3Url);
    const url = URL.createObjectURL(file);
    setMp3Url(url);
    setMp3Playing(false);
    setMp3Current(0);
    setMp3Duration(0);
    const raw = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ").trim();
    setMp3Name(raw);
    setSongTitle(raw);
    setFetchStatus("Searching for lyrics...");
    try {
      const parts = raw.split(" ");
      const mid = Math.ceil(parts.length / 2);
      const artist = parts.slice(0, mid).join(" ");
      const song = parts.slice(mid).join(" ") || artist;
      const res = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`);
      const data = await res.json();
      if (data.lyrics) { setLyricsText(data.lyrics); setFetchStatus("✓ Lyrics found automatically"); }
      else setFetchStatus("Not found — search manually below");
    } catch { setFetchStatus("Not found — search manually below"); }
  };

  const fetchLyricsManual = async () => {
    if (!manualSearch.trim()) return;
    setFetchStatus("Searching...");
    try {
      const parts = manualSearch.trim().split(" ");
      const mid = Math.ceil(parts.length / 2);
      const artist = parts.slice(0, mid).join(" ");
      const song = parts.slice(mid).join(" ") || artist;
      const res = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`);
      const data = await res.json();
      if (data.lyrics) { setLyricsText(data.lyrics); setSongTitle(manualSearch.trim()); setFetchStatus("✓ Lyrics found"); }
      else setFetchStatus("Not found — try: Artist Song Title");
    } catch { setFetchStatus("Search failed — check internet"); }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = mp3Volume / 100;
  }, [mp3Volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !mp3Url) return;
    audio.src = mp3Url;
    audio.load();
  }, [mp3Url]);

  const toggleMp3 = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (mp3Playing) { audio.pause(); setMp3Playing(false); }
    else { audio.play().then(() => setMp3Playing(true)).catch(() => {}); }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !mp3Duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    audio.currentTime = ratio * mp3Duration;
    setMp3Current(ratio * mp3Duration);
  };

  // ── Bible
  const fetchVerse = async (ref) => {
    if (!ref.trim()) return;
    setBibleLoading(true); setBibleErr(""); setBibleResult(null); setSelVerse(null);
    try {
      const res = await fetch(`https://bible-api.com/${encodeURIComponent(ref)}?translation=${bibleVer}`);
      const d = await res.json();
      if (d.error) throw new Error(d.error);
      const v = { text: d.text.trim(), ref: d.reference };
      setBibleResult(v);
      pushLive({ type:"verse", text: v.text, ref: v.ref });
    } catch { setBibleErr("Not found. Try: John 3:16"); }
    setBibleLoading(false);
  };

  const pickVerse = (v) => {
    setSelVerse(v);
    setBibleResult(null);
    pushLive({ type:"verse", text: v.text, ref: v.ref });
  };

  // ── Service helpers
  const curFolder = folders[selFolder] || { name:"", items:[] };
  const typeColor = { song: t.acc, verse:"#60c888", slide:"#6090cc", blank:"rgba(255,255,255,0.18)" };

  const addToService = (item) => {
    setFolders(f => f.map((folder, i) => i === selFolder ? { ...folder, items:[...folder.items, { ...item, id:Date.now() }] } : folder));
  };
  const removeFromService = (itemId) => {
    setFolders(f => f.map((folder, i) => i === selFolder ? { ...folder, items: folder.items.filter(x => x.id !== itemId) } : folder));
  };
  const moveItem = (idx, dir) => {
    const items = [...curFolder.items];
    const ni = idx + dir;
    if (ni < 0 || ni >= items.length) return;
    [items[idx], items[ni]] = [items[ni], items[idx]];
    setFolders(f => f.map((folder, i) => i === selFolder ? { ...folder, items } : folder));
  };
  const goLiveItem = (item, idx) => {
    setLiveIdx(idx);
    if (item.type === "song") { loadSong({ title: item.title, lyrics: item.lyrics }); setMode("music"); }
    else if (item.type === "verse") pushLive({ type:"verse", text: item.text, ref: item.ref });
    else if (item.type === "slide") pushLive({ type:"slide", title: item.title, body: item.body || "" });
    else pushLive({ type:"blank" });
  };
  const addFolder = () => {
    if (!newFolder.trim()) return;
    setFolders(f => [...f, { id:Date.now(), name: newFolder.trim(), icon:"📁", items:[] }]);
    setNewFolder("");
  };

  // ── Custom BG
  const handleCustomBg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setCustomBg(ev.target.result);
    reader.readAsDataURL(file);
  };

  const openProjector = () => window.open("/projector", "stage-projector", "width=1280,height=720,toolbar=no,menubar=no");

  // ── Lyric display styles
  const lyricStyle = (i) => {
    const d = i - lyricIdx;
    if (d < 0) return { fontSize:15, color:"rgba(255,255,255,0.18)", fontWeight:300, transform:"scale(0.94)", transition:"all 0.35s ease" };
    if (d === 0) return { fontSize: clamp(fontSize * 0.78, 24, 58), fontFamily:"'Cinzel',serif", fontWeight:700, color:"#fff", transform:"scale(1.04)", textShadow:`0 0 50px ${t.acc}aa,0 2px 30px rgba(0,0,0,0.9)`, animation:"stgFade 0.3s ease", transition:"all 0.35s ease" };
    if (d === 1) return { fontSize:19, color:"rgba(255,255,255,0.45)", fontWeight:400, transition:"all 0.35s ease" };
    return { fontSize:14, color:"rgba(255,255,255,0.12)", fontWeight:300, transition:"all 0.35s ease" };
  };

  const visLines = parsedLines.map((l, i) => ({ l, i })).filter(({ i }) => { const d = i - lyricIdx; return d >= -2 && d <= 5; });
  const progress = parsedLines.length > 1 ? (lyricIdx / (parsedLines.length - 1)) * 100 : 0;

  const fmtT = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  // ── Display renderer
  const renderDisplay = () => (
    <div className="disp">
      {customBg
        ? <div style={{ position:"absolute", inset:0, backgroundImage:`url(${customBg})`, backgroundSize:"cover", backgroundPosition:"center", filter:"brightness(0.45)" }}/>
        : <AnimBg type={bgType}/>
      }
      {blackout && <div style={{ position:"absolute", inset:0, background:"#000", zIndex:50 }}/>}
      <div className="disp-c">
        {mode === "presentation" && (() => {
          const sl = slides[curSlide] || {};
          return (
            <>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize, fontWeight:700, color:"#fff", lineHeight:1.35, textShadow:`0 0 40px ${t.acc}66,0 2px 30px rgba(0,0,0,0.9)`, marginBottom:sl.body?20:0 }}>{sl.title}</div>
              {sl.title && sl.body && <div style={{ width:60, height:3, background:t.acc, margin:"0 auto 22px", borderRadius:2, boxShadow:`0 0 12px ${t.acc}` }}/>}
              <div style={{ fontFamily:"'Lato',sans-serif", fontSize: Math.round(fontSize * 0.36), color:"rgba(255,255,255,0.85)", lineHeight:1.85, whiteSpace:"pre-wrap" }}>{sl.body}</div>
            </>
          );
        })()}
        {mode === "music" && (
          <div style={{ width:"100%", maxWidth:860, textAlign:"center" }}>
            {visLines.length === 0
              ? <div style={{ fontFamily:"'Cinzel',serif", fontSize:22, color:"rgba(255,255,255,0.15)" }}>Ready · {songTitle}</div>
              : visLines.map(({ l, i }) => (
                  isSec(l)
                    ? <div key={i} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, color:t.acc, letterSpacing:4, textTransform:"uppercase", opacity:0.8, padding:"8px 0" }}>{l.slice(1,-1)}</div>
                    : <div key={i} style={{ ...lyricStyle(i), textAlign:"center", padding:"5px 0", cursor:"pointer" }} onClick={() => jumpLyric(i)}>{l || "\u00a0"}</div>
                ))
            }
          </div>
        )}
        {mode === "bible" && (
          bibleLoading
            ? <div style={{ display:"flex", gap:8, justifyContent:"center" }}><div className="dot"/><div className="dot"/><div className="dot"/></div>
            : (bibleResult || selVerse)
              ? <>
                  <div style={{ fontFamily:"'Cinzel',serif", fontStyle:"italic", fontSize: Math.round(fontSize * 0.72), fontWeight:600, color:"#fff", lineHeight:1.55, textShadow:`0 0 50px ${t.acc}55,0 2px 30px rgba(0,0,0,0.9)` }}>"{(bibleResult||selVerse).text}"</div>
                  <div style={{ marginTop:24, fontFamily:"'JetBrains Mono',monospace", fontSize:15, color:t.acc, letterSpacing:3 }}>— {(bibleResult||selVerse).ref}</div>
                </>
              : <div style={{ fontFamily:"'Cinzel',serif", fontSize:22, color:"rgba(255,255,255,0.12)" }}>Search a Bible verse</div>
        )}
        {mode === "service" && liveDisplay.type === "verse" && <>
          <div style={{ fontFamily:"'Cinzel',serif", fontStyle:"italic", fontSize: Math.round(fontSize * 0.72), fontWeight:600, color:"#fff", lineHeight:1.55, textShadow:`0 0 50px ${t.acc}55` }}>"{liveDisplay.text}"</div>
          <div style={{ marginTop:24, fontFamily:"'JetBrains Mono',monospace", fontSize:15, color:t.acc, letterSpacing:3 }}>— {liveDisplay.ref}</div>
        </>}
        {mode === "service" && liveDisplay.type === "slide" && <>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize, fontWeight:700, color:"#fff", marginBottom:20, textShadow:`0 0 40px ${t.acc}66` }}>{liveDisplay.title}</div>
          {liveDisplay.title && liveDisplay.body && <div style={{ width:60, height:3, background:t.acc, margin:"0 auto 22px", borderRadius:2 }}/>}
          <div style={{ fontFamily:"'Lato',sans-serif", fontSize: Math.round(fontSize * 0.36), color:"rgba(255,255,255,0.85)", lineHeight:1.85, whiteSpace:"pre-wrap" }}>{liveDisplay.body}</div>
        </>}
        {mode === "service" && (liveDisplay.type === "blank" || !liveDisplay.type) && (
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:"rgba(255,255,255,0.06)", letterSpacing:5 }}>STAGE · READY</div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <style>{makeCSS(t, fontSize)}</style>
      <audio
        ref={audioRef}
        onTimeUpdate={() => { if (audioRef.current) setMp3Current(audioRef.current.currentTime); }}
        onLoadedMetadata={() => { if (audioRef.current) setMp3Duration(audioRef.current.duration); }}
        onEnded={() => setMp3Playing(false)}
      />

      <div className="app">
        {/* HEADER */}
        <div className="hdr">
          <div className="logo">Stage</div>
          <div className="tabs">
            {[["service","⬡ Service"],["presentation","◧ Slides"],["music","♪ Music"],["bible","✝ Bible"]].map(([m,l]) => (
              <button key={m} className={`tab ${mode===m?"on":""}`} onClick={() => setMode(m)}>{l}</button>
            ))}
          </div>
          <div className="hdr-r">
            <button className={`hbtn blk ${blackout?"on":""}`} onClick={() => setBlackout(b => !b)}>⬛ BLACKOUT</button>
            <button className="hbtn acc" onClick={openProjector}>⛶ Projector</button>
            <button className={`hbtn ${showSettings?"acc":""}`} onClick={() => setShowSettings(s => !s)}>⚙ Settings</button>
          </div>
        </div>

        {/* SERVICE MODE */}
        {mode === "service" && (
          <div className="content">
            <div className="lp">
              <div className="ps">
                <div className="plbl">Service Folders</div>
                <div style={{ maxHeight:210, overflowY:"auto" }}>
                  {folders.map((f, i) => (
                    <div key={f.id} className={`li ${i===selFolder?"on":""}`} onClick={() => setSelFolder(i)}>
                      <span>{f.icon}</span><span className="li-name">{f.name}</span><span className="smm">{f.items.length}</span>
                    </div>
                  ))}
                </div>
                <hr className="div"/>
                <div className="g6">
                  <input className="inp" value={newFolder} onChange={e => setNewFolder(e.target.value)} onKeyDown={e => e.key==="Enter"&&addFolder()} placeholder="New folder name..."/>
                  <button className="btn acc full" onClick={addFolder}>+ Create Folder</button>
                </div>
              </div>
              <div className="ps">
                <div className="plbl">Add to Service</div>
                <div className="g6 mt8">
                  <button className="btn full" onClick={() => addToService({ type:"song", title:HYMNS[0].title, lyrics:HYMNS[0].lyrics, icon:"♪" })}>+ Add Hymn</button>
                  <button className="btn full" onClick={() => addToService({ type:"verse", title:"John 3:16", ref:"John 3:16", text:BIBLE[0].text, icon:"✝" })}>+ Add Bible Verse</button>
                  <button className="btn full" onClick={() => addToService({ type:"slide", title:"New Slide", body:"", icon:"◧" })}>+ Add Slide</button>
                  <button className="btn full" onClick={() => addToService({ type:"blank", title:"Blank Screen", icon:"⬛" })}>+ Blank Screen</button>
                </div>
              </div>
              <div className="ps" style={{ flex:1 }}>
                <div className="sm" style={{ lineHeight:2 }}>💡 Click item to go live<br/>↑↓ reorder · ✕ remove</div>
              </div>
            </div>
            <div className="stage">
              {renderDisplay()}
              <div className="ctrl">
                {liveIdx !== null && <span className="lbadge">LIVE</span>}
                <button className="btn" onClick={() => { if(liveIdx>0) goLiveItem(curFolder.items[liveIdx-1],liveIdx-1); }}>← Prev</button>
                <span className="sm" style={{ minWidth:60, textAlign:"center" }}>{liveIdx!==null?`${liveIdx+1}/${curFolder.items.length}`:"-"}</span>
                <button className="btn acc" onClick={() => { const ni=(liveIdx??-1)+1; if(ni<curFolder.items.length) goLiveItem(curFolder.items[ni],ni); }}>Next →</button>
                <div className="flex1"/>
                <button className="btn" onClick={() => pushLive({ type:"blank" })}>Clear Screen</button>
              </div>
            </div>
            <div className="rp">
              <div className="ps"><div className="plbl">{curFolder.name}</div></div>
              <div className="scr ps" style={{ flex:1, paddingTop:8 }}>
                {curFolder.items.length === 0 && <div className="sm" style={{ textAlign:"center", padding:20 }}>No items yet.<br/>Add from the left panel.</div>}
                {curFolder.items.map((item, idx) => (
                  <div key={item.id} className={`si ${liveIdx===idx?"live":""}`} onClick={() => goLiveItem(item, idx)}>
                    <div className="si-dot" style={{ background: typeColor[item.type] || typeColor.blank }}/>
                    <span className="si-title">{item.icon} {item.title}</span>
                    <div className="si-acts">
                      <button className="mbtn" onClick={e => { e.stopPropagation(); moveItem(idx,-1); }}>↑</button>
                      <button className="mbtn" onClick={e => { e.stopPropagation(); moveItem(idx,1); }}>↓</button>
                      <button className="mbtn" style={{ color:"#ff8888" }} onClick={e => { e.stopPropagation(); removeFromService(item.id); }}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PRESENTATION MODE */}
        {mode === "presentation" && (
          <div className="content">
            <div className="lp">
              <div className="ps">
                <div className="plbl">Slides</div>
                <div className="row mt8">
                  <button className="btn flex1" onClick={addSlide}>+ Add</button>
                  <button className="btn danger" onClick={delSlide}>Delete</button>
                </div>
              </div>
              <div className="scr" style={{ flex:1, padding:8 }}>
                {slides.map((sl, i) => (
                  <div key={sl.id} className={`li ${i===curSlide?"on":""}`} onClick={() => goSlide(i)}>
                    <div><div className="li-num">#{String(i+1).padStart(2,"0")}</div><div className="li-name">{sl.title||"Untitled"}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="stage">
              {renderDisplay()}
              <div className="ctrl">
                <button className="btn" onClick={() => goSlide(0)} title="First slide">⏮</button>
                <button className="btn" onClick={() => goSlide(curSlide-1)}>← Prev</button>
                <span className="sm" style={{ minWidth:60, textAlign:"center" }}>{curSlide+1}/{slides.length}</span>
                <button className="btn acc" onClick={() => goSlide(curSlide+1)}>Next →</button>
                <button className="btn" onClick={() => goSlide(slides.length-1)} title="Last slide">⏭</button>
                <div className="flex1"/>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:14, color: timerSec>3600?"#ff6868":t.acc, minWidth:55, letterSpacing:2 }}>{fmtT(timerSec)}</div>
                <button className="btn" onClick={() => setTimerOn(!timerOn)}>{timerOn?"⏸":"▶"}</button>
                <button className="btn" onClick={() => { setTimerSec(0); setTimerOn(false); }}>↺</button>
              </div>
            </div>
            <div className="rp">
              <div className="ps">
                <div className="plbl">Jump to Any Slide</div>
                <div className="scr mt8" style={{ maxHeight:200 }}>
                  {slides.map((sl, i) => (
                    <div key={sl.id} className={`li ${i===curSlide?"on":""}`} style={{ marginBottom:3 }} onClick={() => goSlide(i)}>
                      <span className="smm" style={{ minWidth:26 }}>#{i+1}</span>
                      <span className="li-name">{sl.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ps">
                <div className="plbl">Edit Slide</div>
                <div className="g8">
                  <input className="inp" value={slides[curSlide]?.title||""} onChange={e => updSlide("title",e.target.value)} placeholder="Title..."/>
                  <textarea className="inp" rows={4} value={slides[curSlide]?.body||""} onChange={e => updSlide("body",e.target.value)} placeholder="Content..."/>
                </div>
              </div>
              <div className="ps grow">
                <div className="plbl">Speaker Notes</div>
                <textarea className="inp" style={{ flex:1, resize:"none" }} value={slideNotes} onChange={e => { setSlideNotes(e.target.value); updSlide("notes",e.target.value); }} placeholder="Private notes..."/>
              </div>
            </div>
          </div>
        )}

        {/* MUSIC MODE */}
        {mode === "music" && (
          <div className="content">
            <div className="lp">
              <div className="ps">
                <div className="plbl">Hymn Library</div>
                <input className="inp mt8" value={hymnSearch} onChange={e => setHymnSearch(e.target.value)} placeholder="Search hymns..."/>
              </div>
              <div className="scr" style={{ flex:1, padding:8 }}>
                <div className="smm" style={{ padding:"2px 2px 6px", letterSpacing:2 }}>HYMNS ({filteredHymns.length})</div>
                {filteredHymns.map(h => (
                  <div key={h.id} className={`li ${selSong?.id===h.id?"on":""}`} onClick={() => loadSong(h)}>
                    <span className="li-name">{h.title}</span>
                    <button className="mbtn" onClick={e => { e.stopPropagation(); addToService({ type:"song", title:h.title, lyrics:h.lyrics, icon:"♪" }); }}>+</button>
                  </div>
                ))}
                {customSongs.length > 0 && <>
                  <div className="smm" style={{ padding:"8px 2px 6px", letterSpacing:2 }}>MY SONGS</div>
                  {customSongs.map(s => (
                    <div key={s.id} className={`li ${selSong?.id===s.id?"on":""}`} onClick={() => loadSong(s)}>
                      <span className="li-name">{s.title}</span>
                      <button className="mbtn" style={{ color:"#ff8888" }} onClick={e => { e.stopPropagation(); setCustomSongs(c => c.filter(x => x.id!==s.id)); }}>✕</button>
                    </div>
                  ))}
                </>}
              </div>
            </div>
            <div className="stage">
              {renderDisplay()}
              <div className="ctrl">
                <button className={`btn lg ${playing?"playing":"acc"}`} onClick={startKaraoke}>{playing?"⏹ Stop":"▶ Start"}</button>
                <button className="btn" title="Previous line" onClick={() => moveLyric(-1)}>↑ Line</button>
                <button className="btn" title="Next line" onClick={() => moveLyric(1)}>↓ Line</button>
                {playing && <>
                  <div className="prog"><div className="prog-f" style={{ width:`${progress}%`, background:`linear-gradient(90deg,${t.acc},${t.acc}88)` }}/></div>
                  <div className="beat">{beats.map((h, i) => <div key={i} className="beat-b" style={{ height:h, background:`linear-gradient(0deg,${t.acc},${t.acc}66)` }}/>)}</div>
                </>}
                <div className="flex1"/>
                <span className="smm" style={{ color:t.acc, maxWidth:140, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{songTitle}</span>
              </div>
            </div>
            <div className="rp">
              {/* MP3 Player */}
              <div className="ps">
                <div className="plbl">MP3 Player</div>
                <div className="mp3box">
                  <label className="btn full" style={{ display:"block", textAlign:"center", cursor:"pointer", marginBottom:8 }}>
                    📁 Upload MP3
                    <input type="file" accept="audio/*" style={{ display:"none" }} onChange={handleMp3}/>
                  </label>
                  {mp3Name && <div className="mp3ttl">♪ {mp3Name}</div>}
                  {mp3Url && <>
                    <div className="row" style={{ marginBottom:8 }}>
                      <button className="btn" style={{ minWidth:44 }} onClick={toggleMp3}>{mp3Playing?"⏸":"▶"}</button>
                      <span className="smm">{fmtTime(mp3Current)}</span>
                      <div className="mp3seek" onClick={handleSeek}>
                        <div className="mp3seek-f" style={{ width:`${mp3Duration?(mp3Current/mp3Duration*100):0}%`, height:4, background:t.acc, borderRadius:2 }}/>
                      </div>
                      <span className="smm">{fmtTime(mp3Duration)}</span>
                    </div>
                    <div className="row">
                      <span className="sm">🔇</span>
                      <input type="range" min={0} max={100} value={mp3Volume} onChange={e => setMp3Volume(Number(e.target.value))}/>
                      <span className="sm">🔊</span>
                      <span className="smm" style={{ color:t.acc, minWidth:30 }}>{mp3Volume}%</span>
                    </div>
                  </>}
                  {fetchStatus && <div className="fstatus" style={{ color: fetchStatus.startsWith("✓")?"#60c888":t.muted }}>{fetchStatus}</div>}
                </div>
                <div className="g6 mt8">
                  <div className="smm" style={{ letterSpacing:1 }}>SEARCH LYRICS</div>
                  <div className="row">
                    <input className="inp flex1" value={manualSearch} onChange={e => setManualSearch(e.target.value)} onKeyDown={e => e.key==="Enter"&&fetchLyricsManual()} placeholder="Artist Song Name..."/>
                    <button className="btn acc" onClick={fetchLyricsManual}>Go</button>
                  </div>
                </div>
              </div>
              {/* Song Editor */}
              <div className="ps">
                <div className="plbl">Song Editor</div>
                <div className="g8">
                  <input className="inp" value={songTitle} onChange={e => setSongTitle(e.target.value)} placeholder="Song title..."/>
                  <textarea className="inp" rows={6} value={lyricsText} onChange={e => setLyricsText(e.target.value)} placeholder={"Paste lyrics...\n[Verse 1]\nLine 1\n[Chorus]\n..."}/>
                </div>
                <div className="row mt8">
                  <button className="btn acc flex1" onClick={saveSong}>💾 Save</button>
                  <button className="btn flex1" onClick={() => addToService({ type:"song", title:songTitle, lyrics:lyricsText, icon:"♪" })}>+ Service</button>
                </div>
              </div>
              {/* Scroll Control */}
              <div className="ps">
                <div className="plbl">Scroll Control</div>
                <div className="row mt8">
                  <span className="sm flex1">Auto Scroll</span>
                  <div className={`toggle ${autoScroll?"on":""}`} onClick={() => setAutoScroll(a => !a)}/>
                </div>
                {autoScroll && (
                  <div className="row mt8">
                    <span className="sm">Slow</span>
                    <input type="range" min={1} max={7} value={speed} onChange={e => setSpeed(Number(e.target.value))}/>
                    <span className="sm">Fast</span>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:t.acc, minWidth:16 }}>{speed}</span>
                  </div>
                )}
                {!autoScroll && <div className="sm mt8" style={{ lineHeight:1.7 }}>Manual mode<br/>Use ↑ ↓ Line buttons or click any lyric line</div>}
              </div>
            </div>
          </div>
        )}

        {/* BIBLE MODE */}
        {mode === "bible" && (
          <div className="content">
            <div className="lp">
              <div className="ps">
                <div className="plbl">Translation</div>
                <div className="row mt8" style={{ flexWrap:"wrap", gap:4 }}>
                  {["web","kjv","asv","bbe"].map(v => (
                    <button key={v} className={`tbtn ${bibleVer===v?"on":""}`} onClick={() => setBibleVer(v)}>{v.toUpperCase()}</button>
                  ))}
                </div>
              </div>
              <div className="ps">
                <div className="plbl">Online Search</div>
                <div className="g8 mt8">
                  <input className="inp" value={bibleQ} onChange={e => setBibleQ(e.target.value)} onKeyDown={e => e.key==="Enter"&&fetchVerse(bibleQ)} placeholder="e.g. John 3:16"/>
                  <button className="btn acc full lg" onClick={() => fetchVerse(bibleQ)}>{bibleLoading?"Searching...":"Search"}</button>
                  {bibleErr && <div style={{ fontSize:12, color:"#ff8888" }}>{bibleErr}</div>}
                  {bibleResult && <button className="btn full" onClick={() => addToService({ type:"verse", title:bibleResult.ref, ref:bibleResult.ref, text:bibleResult.text, icon:"✝" })}>+ Add to Service</button>}
                </div>
              </div>
              <div className="ps grow">
                <div className="plbl">Offline Verses ({BIBLE.length})</div>
                <div className="scr mt8">
                  {BIBLE.map((v, i) => (
                    <div key={i} className={`vi ${selVerse?.ref===v.ref?"on":""}`} onClick={() => pickVerse(v)}>
                      <div className="vi-ref">{v.ref}</div>
                      <div className="vi-txt">{v.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="stage">
              {renderDisplay()}
              <div className="ctrl">
                {(bibleResult||selVerse) && <span className="smm" style={{ color:t.acc }}>{(bibleResult||selVerse).ref} · {bibleVer.toUpperCase()}</span>}
                <div className="flex1"/>
                {(bibleResult||selVerse) && (
                  <button className="btn" onClick={() => addToService({ type:"verse", title:(bibleResult||selVerse).ref, ref:(bibleResult||selVerse).ref, text:(bibleResult||selVerse).text, icon:"✝" })}>+ Add to Service</button>
                )}
              </div>
            </div>
            <div className="rp">
              <div className="ps">
                <div className="plbl">Translations</div>
                <div className="g6" style={{ fontSize:11, color:t.muted, lineHeight:1.9 }}>
                  <div><b style={{ color:t.acc }}>WEB</b> — World English Bible</div>
                  <div><b style={{ color:t.acc }}>KJV</b> — King James Version</div>
                  <div><b style={{ color:t.acc }}>ASV</b> — American Standard</div>
                  <div><b style={{ color:t.acc }}>BBE</b> — Basic English</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* THEME + BG BAR */}
        <div className="tbar">
          <span className="smm">THEME:</span>
          {Object.entries(THEMES).map(([k,v]) => (
            <button key={k} className={`tbtn ${themeKey===k?"on":""}`} onClick={() => setThemeKey(k)}>{v.name}</button>
          ))}
          <span className="smm" style={{ marginLeft:6 }}>BG:</span>
          {[["none","⬛"],["clouds","☁"],["stars","✦"],["rain","🌧"],["waterfall","💧"],["sunrise","🌅"],["ocean","🌊"]].map(([id,icon]) => (
            <button key={id} className={`tbtn ${bgType===id&&!customBg?"on":""}`} onClick={() => { setBgType(id); setCustomBg(null); }}>{icon}</button>
          ))}
          <label className={`tbtn ${customBg?"on":""}`} style={{ cursor:"pointer" }}>
            📷 {customBg?"Custom ✓":"Upload"}
            <input type="file" accept="image/*" style={{ display:"none" }} onChange={handleCustomBg}/>
          </label>
        </div>

        {/* SETTINGS PANEL */}
        {showSettings && (
          <div className="spanel">
            <div className="spanel-hdr">
              <span style={{ fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700, color:t.acc, letterSpacing:3 }}>SETTINGS</span>
              <button className="btn" onClick={() => setShowSettings(false)}>✕ Close</button>
            </div>
            <div className="spanel-body">

              <div className="srow">
                <div className="slbl">Display Font Size</div>
                <div className="row mt8">
                  <span className="sm">Small</span>
                  <input type="range" min={28} max={80} value={fontSize} onChange={e => setFontSize(Number(e.target.value))}/>
                  <span className="sm">Large</span>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:t.acc, minWidth:32 }}>{fontSize}px</span>
                </div>
                <div className="ssub">Controls text size on the projector display</div>
              </div>

              <hr className="div"/>

              <div className="srow">
                <div className="row">
                  <div className="slbl flex1">Auto Scroll Lyrics</div>
                  <div className={`toggle ${autoScroll?"on":""}`} onClick={() => setAutoScroll(a => !a)}/>
                </div>
                <div className="ssub">{autoScroll ? "ON — lyrics scroll at set speed automatically" : "OFF — control each line manually with ↑↓ buttons"}</div>
              </div>

              <hr className="div"/>

              <div className="srow">
                <div className="row">
                  <div className="slbl flex1">Blackout Screen</div>
                  <div className={`toggle ${blackout?"on":""}`} onClick={() => setBlackout(b => !b)}/>
                </div>
                <div className="ssub">Instantly clears projector to black</div>
              </div>

              <hr className="div"/>

              <div className="srow">
                <div className="slbl">App Theme</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:8 }}>
                  {Object.entries(THEMES).map(([k,v]) => (
                    <button key={k} className={`tbtn ${themeKey===k?"on":""}`} onClick={() => setThemeKey(k)}>{v.name}</button>
                  ))}
                </div>
              </div>

              <hr className="div"/>

              <div className="srow">
                <div className="slbl">Stage Background</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:8 }}>
                  {[["none","⬛ None"],["clouds","☁ Clouds"],["stars","✦ Stars"],["rain","🌧 Rain"],["waterfall","💧 Waterfall"],["sunrise","🌅 Sunrise"],["ocean","🌊 Ocean"]].map(([id,label]) => (
                    <button key={id} className={`tbtn ${bgType===id&&!customBg?"on":""}`} onClick={() => { setBgType(id); setCustomBg(null); }}>{label}</button>
                  ))}
                </div>
                <hr className="div"/>
                <label className="bgup">
                  {customBg ? <><img src={customBg} alt="bg"/><span style={{ position:"relative", zIndex:1, fontSize:11, color:"#fff" }}>Custom ✓</span></> : <span>📷 Upload Custom Background</span>}
                  <input type="file" accept="image/*" style={{ display:"none" }} onChange={handleCustomBg}/>
                </label>
                {customBg && <button className="btn danger full mt8" onClick={() => setCustomBg(null)}>Remove Custom</button>}
              </div>

              <hr className="div"/>

              <div className="srow">
                <div className="slbl">About STAGE</div>
                <div style={{ fontSize:12, color:t.muted, lineHeight:1.9, marginTop:6 }}>
                  <div>Version 2.1 — Built for the Lord's Church</div>
                  <div style={{ marginTop:6 }}>Hymn Library · Bible Search · Service Planner · MP3 Player · Animated Backgrounds · Projector Output · Settings</div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </>
  );
}
