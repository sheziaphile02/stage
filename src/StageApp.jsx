import { useState, useEffect, useRef, useMemo } from "react";

// ================================================================
//  S T A G E  v2.0  —  Church AV Software
//  Built for the Lord's Church
// ================================================================

const GF = `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;700&family=JetBrains+Mono:wght@400;600&display=swap');`;

// ── HYMN LIBRARY ─────────────────────────────────────────────────
const HYMNS = [
  { id:1, title:"Amazing Grace", lyrics:`[Verse 1]\nAmazing grace how sweet the sound\nThat saved a wretch like me\nI once was lost but now am found\nWas blind but now I see\n\n[Verse 2]\n'Twas grace that taught my heart to fear\nAnd grace my fears relieved\nHow precious did that grace appear\nThe hour I first believed\n\n[Verse 3]\nThrough many dangers toils and snares\nI have already come\n'Tis grace has brought me safe thus far\nAnd grace will lead me home\n\n[Chorus]\nMy chains are gone I've been set free\nMy God my Savior has ransomed me\nAnd like a flood His mercy reigns\nUnending love amazing grace` },
  { id:2, title:"Holy Holy Holy", lyrics:`[Verse 1]\nHoly holy holy Lord God Almighty\nEarly in the morning our song shall rise to Thee\nHoly holy holy merciful and mighty\nGod in three persons blessed Trinity\n\n[Verse 2]\nHoly holy holy all the saints adore Thee\nCasting down their golden crowns around the glassy sea\nCherubim and seraphim falling down before Thee\nWhich wert and art and evermore shalt be\n\n[Verse 3]\nHoly holy holy though the darkness hide Thee\nThough the eye of sinful man Thy glory may not see\nOnly Thou art holy there is none beside Thee\nPerfect in power in love and purity` },
  { id:3, title:"Blessed Assurance", lyrics:`[Verse 1]\nBlessed assurance Jesus is mine\nO what a foretaste of glory divine\nHeir of salvation purchase of God\nBorn of His Spirit washed in His blood\n\n[Chorus]\nThis is my story this is my song\nPraising my Savior all the day long\nThis is my story this is my song\nPraising my Savior all the day long\n\n[Verse 2]\nPerfect submission perfect delight\nVisions of rapture now burst on my sight\nAngels descending bring from above\nEchoes of mercy whispers of love` },
  { id:4, title:"It Is Well With My Soul", lyrics:`[Verse 1]\nWhen peace like a river attendeth my way\nWhen sorrows like sea billows roll\nWhatever my lot Thou hast taught me to say\nIt is well it is well with my soul\n\n[Chorus]\nIt is well with my soul\nIt is well it is well with my soul\n\n[Verse 2]\nThough Satan should buffet though trials should come\nLet this blest assurance control\nThat Christ hath regarded my helpless estate\nAnd hath shed His own blood for my soul` },
  { id:5, title:"What a Friend We Have in Jesus", lyrics:`[Verse 1]\nWhat a friend we have in Jesus\nAll our sins and griefs to bear\nWhat a privilege to carry\nEverything to God in prayer\nO what peace we often forfeit\nO what needless pain we bear\nAll because we do not carry\nEverything to God in prayer\n\n[Verse 2]\nHave we trials and temptations\nIs there trouble anywhere\nWe should never be discouraged\nTake it to the Lord in prayer\nCan we find a friend so faithful\nWho will all our sorrows share\nJesus knows our every weakness\nTake it to the Lord in prayer` },
  { id:6, title:"The Old Rugged Cross", lyrics:`[Verse 1]\nOn a hill far away stood an old rugged cross\nThe emblem of suffering and shame\nAnd I love that old cross where the dearest and best\nFor a world of lost sinners was slain\n\n[Chorus]\nSo I'll cherish the old rugged cross\nTill my trophies at last I lay down\nI will cling to the old rugged cross\nAnd exchange it some day for a crown\n\n[Verse 2]\nO that old rugged cross so despised by the world\nHas a wondrous attraction for me\nFor the dear Lamb of God left His glory above\nTo bear it to dark Calvary` },
  { id:7, title:"To God Be the Glory", lyrics:`[Verse 1]\nTo God be the glory great things He hath done\nSo loved He the world that He gave us His Son\nWho yielded His life an atonement for sin\nAnd opened the lifegate that all may go in\n\n[Chorus]\nPraise the Lord praise the Lord\nLet the earth hear His voice\nPraise the Lord praise the Lord\nLet the people rejoice\nO come to the Father through Jesus the Son\nAnd give Him the glory great things He hath done` },
  { id:8, title:"Be Thou My Vision", lyrics:`[Verse 1]\nBe Thou my vision O Lord of my heart\nNaught be all else to me save that Thou art\nThou my best thought by day or by night\nWaking or sleeping Thy presence my light\n\n[Verse 2]\nBe Thou my wisdom and Thou my true word\nI ever with Thee and Thou with me Lord\nThou my great Father I Thy true son\nThou in me dwelling and I with Thee one\n\n[Verse 3]\nHigh King of Heaven my victory won\nMay I reach Heaven's joys O bright Heaven's Sun\nHeart of my own heart whatever befall\nStill be my vision O Ruler of all` },
  { id:9, title:"Crown Him With Many Crowns", lyrics:`[Verse 1]\nCrown Him with many crowns\nThe Lamb upon His throne\nHark how the heavenly anthem drowns\nAll music but its own\nAwake my soul and sing\nOf Him who died for thee\nAnd hail Him as thy matchless King\nThrough all eternity\n\n[Verse 2]\nCrown Him the Lord of life\nWho triumphed o'er the grave\nAnd rose victorious in the strife\nFor those He came to save` },
  { id:10, title:"Come Thou Fount", lyrics:`[Verse 1]\nCome Thou Fount of every blessing\nTune my heart to sing Thy grace\nStreams of mercy never ceasing\nCall for songs of loudest praise\nTeach me some melodious sonnet\nSung by flaming tongues above\nPraise the mount I'm fixed upon it\nMount of Thy redeeming love\n\n[Verse 2]\nHere I raise my Ebenezer\nHither by Thy help I'm come\nAnd I hope by Thy good pleasure\nSafely to arrive at home\nJesus sought me when a stranger\nWandering from the fold of God` },
  { id:11, title:"Rock of Ages", lyrics:`[Verse 1]\nRock of ages cleft for me\nLet me hide myself in Thee\nLet the water and the blood\nFrom Thy riven side which flowed\nBe of sin the double cure\nCleanse me from its guilt and power\n\n[Verse 2]\nNot the labor of my hands\nCan fulfill Thy law's demands\nCould my zeal no respite know\nCould my tears forever flow\nAll for sin could not atone\nThou must save and Thou alone` },
  { id:12, title:"All Hail the Power", lyrics:`[Verse 1]\nAll hail the power of Jesus' name\nLet angels prostrate fall\nBring forth the royal diadem\nAnd crown Him Lord of all\n\n[Verse 2]\nYe chosen seed of Israel's race\nYe ransomed from the fall\nHail Him who saves you by His grace\nAnd crown Him Lord of all\n\n[Verse 3]\nO that with yonder sacred throng\nWe at His feet may fall\nWe'll join the everlasting song\nAnd crown Him Lord of all` },
  { id:13, title:"How Firm a Foundation", lyrics:`[Verse 1]\nHow firm a foundation ye saints of the Lord\nIs laid for your faith in His excellent word\nWhat more can He say than to you He hath said\nTo you who for refuge to Jesus have fled\n\n[Verse 2]\nFear not I am with thee O be not dismayed\nFor I am thy God and will still give thee aid\nI'll strengthen thee help thee and cause thee to stand\nUpheld by My righteous omnipotent hand` },
  { id:14, title:"O For a Thousand Tongues", lyrics:`[Verse 1]\nO for a thousand tongues to sing\nMy great Redeemer's praise\nThe glories of my God and King\nThe triumphs of His grace\n\n[Verse 2]\nJesus the name that charms our fears\nThat bids our sorrows cease\n'Tis music in the sinner's ears\n'Tis life and health and peace\n\n[Verse 3]\nHe breaks the power of canceled sin\nHe sets the prisoner free\nHis blood can make the foulest clean\nHis blood availed for me` },
  { id:15, title:"Fairest Lord Jesus", lyrics:`[Verse 1]\nFairest Lord Jesus\nRuler of all nature\nO Thou of God and man the Son\nThee will I cherish\nThee will I honor\nThou my soul's glory joy and crown\n\n[Verse 2]\nFair are the meadows\nFairer still the woodlands\nRobed in the blooming garb of spring\nJesus is fairer\nJesus is purer\nWho makes the woeful heart to sing` },
];

// ── OFFLINE BIBLE ────────────────────────────────────────────────
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

// ── THEMES ───────────────────────────────────────────────────────
const THEMES = {
  midnight: { name:"Midnight", bg:"#07070f", surf:"#0f0f1c", surf2:"#17172a", acc:"#e8b84b", text:"#e8e8f4", muted:"rgba(255,255,255,0.32)", bdr:"rgba(255,255,255,0.07)" },
  royal:    { name:"Royal",    bg:"#080010", surf:"#100020", surf2:"#180030", acc:"#c8a0ff", text:"#f0eaff", muted:"rgba(240,234,255,0.32)", bdr:"rgba(200,160,255,0.1)" },
  ocean:    { name:"Ocean",    bg:"#01080f", surf:"#03162a", surf2:"#052040", acc:"#00d4f0", text:"#e0f4ff", muted:"rgba(224,244,255,0.32)", bdr:"rgba(0,212,240,0.1)" },
  dawn:     { name:"Dawn",     bg:"#0f0700", surf:"#1c1000", surf2:"#281800", acc:"#ff9940", text:"#fff0e0", muted:"rgba(255,240,224,0.32)", bdr:"rgba(255,153,64,0.1)" },
  light:    { name:"Light",    bg:"#f0ede8", surf:"#ffffff", surf2:"#f5f2ee", acc:"#2a4a7a", text:"#1a1a2e", muted:"rgba(26,26,46,0.4)", bdr:"rgba(0,0,0,0.08)" },
};

// ── ANIMATED BACKGROUNDS ─────────────────────────────────────────
function Clouds() {
  const c = useMemo(()=>Array.from({length:12},(_,i)=>({ top:`${8+(i*7)%80}%`, w:70+((i*41)%150), h:35+((i*27)%60), dur:20+((i*9)%25), delay:-((i*11)%28), op:0.6+((i*3)%4)*0.1 })),[]);
  return (
    <div style={{position:"absolute",inset:0,overflow:"hidden",background:"linear-gradient(180deg,#0d2444,#1a5090,#4a9ad4)"}}>
      {c.map((x,i)=><div key={i} style={{position:"absolute",top:x.top,width:x.w,height:x.h,background:"rgba(255,255,255,0.88)",borderRadius:"50%",opacity:x.op,filter:"blur(3px)",boxShadow:`${x.w*0.3}px 0 0 ${x.w*0.15}px rgba(255,255,255,0.7)`,animation:`stgCloud ${x.dur}s ${x.delay}s infinite linear`}}/>)}
    </div>
  );
}
function Stars() {
  const s = useMemo(()=>Array.from({length:130},(_,i)=>({ l:`${(i*7.3+2)%100}%`, t:`${(i*4.9+1)%100}%`, sz:1+((i*3)%3), dur:2+((i*1.4)%4), dl:-((i*0.8)%4), op:0.2+((i*7)%7)*0.1 })),[]);
  return (
    <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 30%,#0a0a2a,#020210)"}}>
      {s.map((x,i)=><div key={i} style={{position:"absolute",left:x.l,top:x.t,width:x.sz,height:x.sz,borderRadius:"50%",background:"#fff",opacity:x.op,animation:`stgStar ${x.dur}s ${x.dl}s infinite ease-in-out`}}/>)}
    </div>
  );
}
function Rain() {
  const d = useMemo(()=>Array.from({length:60},(_,i)=>({ l:`${(i*1.67)%100}%`, h:10+((i*4)%20), dur:0.4+((i*0.04)%0.8), dl:-((i*0.09)%1.5), op:0.25+((i*9)%6)*0.08 })),[]);
  return (
    <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#080e18,#0f1e2e)"}}>
      {d.map((x,i)=><div key={i} style={{position:"absolute",left:x.l,top:0,width:1,height:x.h,background:"rgba(160,210,255,0.8)",opacity:x.op,transform:"rotate(10deg)",animation:`stgRain ${x.dur}s ${x.dl}s infinite linear`}}/>)}
    </div>
  );
}
function Waterfall() {
  const s = useMemo(()=>Array.from({length:40},(_,i)=>({ l:`${1+(i*2.5)%97}%`, w:2+((i*4)%7), dur:0.7+((i*0.05)%1.3), dl:-((i*0.12)%2.5), op:0.3+((i*9)%6)*0.09 })),[]);
  return (
    <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#081808,#0f2810,#162a10)"}}>
      {s.map((x,i)=><div key={i} style={{position:"absolute",left:x.l,top:0,bottom:0,width:x.w,background:"linear-gradient(180deg,transparent,rgba(180,230,255,0.65),rgba(255,255,255,0.5),rgba(180,230,255,0.4),transparent)",opacity:x.op,filter:"blur(0.5px)",animation:`stgWater ${x.dur}s ${x.dl}s infinite linear`}}/>)}
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:60,background:"rgba(180,230,255,0.1)",filter:"blur(10px)"}}/>
    </div>
  );
}
function Sunrise() {
  const rays = useMemo(()=>Array.from({length:12},(_,i)=>i),[]);
  return (
    <div style={{position:"absolute",inset:0,animation:"stgDawn 18s infinite ease-in-out"}}>
      <div style={{position:"absolute",bottom:"15%",left:"50%",transform:"translateX(-50%)",width:240,height:240,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,210,80,0.7),rgba(255,130,0,0.4) 40%,transparent 70%)",animation:"stgSun 5s infinite ease-in-out"}}/>
      {rays.map(i=><div key={i} style={{position:"absolute",bottom:"15%",left:"50%",width:2,height:`${25+i*3}%`,background:"linear-gradient(0deg,rgba(255,200,60,0.35),transparent)",transformOrigin:"bottom center",transform:`translateX(-50%) rotate(${i*30}deg)`,animation:`stgRay 4s ${i*0.3}s infinite ease-in-out`}}/>)}
    </div>
  );
}
function OceanBg() {
  const waves = useMemo(()=>Array.from({length:5},(_,i)=>i),[]);
  return (
    <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#020c1a,#041828,#063060)"}}>
      {waves.map(i=><div key={i} style={{position:"absolute",bottom:`${i*10}%`,left:"-30%",width:"160%",height:50+i*20,background:`rgba(${20+i*12},${80+i*25},${160+i*18},${0.25+i*0.08})`,borderRadius:"40%",animation:`stgWave ${5+i*2}s ${-i*1.8}s infinite linear`}}/>)}
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

// ── STYLES ───────────────────────────────────────────────────────
const makeCSS = (t) => `
${GF}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{overflow:hidden;background:${t.bg};}
@keyframes stgCloud{from{transform:translateX(110vw)}to{transform:translateX(-320px)}}
@keyframes stgStar{0%,100%{opacity:0.1}50%{opacity:1}}
@keyframes stgRain{from{transform:translateY(-30px) rotate(10deg)}to{transform:translateY(100vh) rotate(10deg)}}
@keyframes stgWater{from{transform:translateY(-100%)}to{transform:translateY(100vh)}}
@keyframes stgDawn{0%{background:radial-gradient(ellipse at 50% 100%,#280010,#080020,#00000a)}30%{background:radial-gradient(ellipse at 50% 100%,#cc3300,#660a00,#0a0025)}55%{background:radial-gradient(ellipse at 50% 100%,#ffaa00,#ff6600 20%,#882200 45%,#1a1060)}80%{background:radial-gradient(ellipse at 50% 100%,#ffd060,#ff9933 20%,#4488cc 55%,#1a2a80)}100%{background:radial-gradient(ellipse at 50% 100%,#280010,#080020,#00000a)}}
@keyframes stgSun{0%,100%{transform:translateX(-50%) scale(1);opacity:0.7}50%{transform:translateX(-50%) scale(1.15);opacity:1}}
@keyframes stgRay{0%,100%{opacity:0.25}50%{opacity:0.65}}
@keyframes stgWave{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes pDot{0%,80%,100%{transform:scale(0.5);opacity:0.3}40%{transform:scale(1);opacity:1}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0.4}}
.app{width:100vw;height:100vh;background:${t.bg};color:${t.text};font-family:'Lato',sans-serif;display:flex;flex-direction:column;overflow:hidden;user-select:none;}
.hdr{height:54px;min-height:54px;background:${t.surf};border-bottom:1px solid ${t.bdr};display:flex;align-items:center;padding:0 20px;gap:14px;z-index:100;}
.logo{font-family:'Cinzel',serif;font-size:20px;font-weight:700;color:${t.acc};letter-spacing:6px;text-transform:uppercase;}
.tabs{display:flex;gap:2px;}
.tab{padding:6px 16px;border-radius:6px;border:none;cursor:pointer;font-family:'Lato',sans-serif;font-size:13px;font-weight:700;background:transparent;color:${t.muted};transition:all 0.15s;}
.tab:hover{color:${t.text};}
.tab.on{background:rgba(255,255,255,0.06);color:${t.acc};border:1px solid rgba(255,255,255,0.1);}
.hdr-r{display:flex;align-items:center;gap:8px;margin-left:auto;}
.content{flex:1;display:flex;overflow:hidden;}
.lp{width:255px;min-width:255px;background:${t.surf};border-right:1px solid ${t.bdr};display:flex;flex-direction:column;overflow:hidden;}
.rp{width:265px;min-width:265px;background:${t.surf};border-left:1px solid ${t.bdr};display:flex;flex-direction:column;overflow:hidden;}
.stage{flex:1;display:flex;flex-direction:column;overflow:hidden;}
.ps{padding:13px;border-bottom:1px solid ${t.bdr};}
.ps.grow{flex:1;display:flex;flex-direction:column;}
.pl{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:${t.muted};margin-bottom:8px;font-family:'JetBrains Mono',monospace;}
.sc{overflow-y:auto;flex:1;}
.sc::-webkit-scrollbar{width:3px;}
.sc::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px;}
.inp{width:100%;padding:8px 10px;border-radius:6px;border:1px solid ${t.bdr};background:rgba(255,255,255,0.04);color:${t.text};font-family:'Lato',sans-serif;font-size:13px;outline:none;transition:border-color 0.2s;}
.inp:focus{border-color:${t.acc};}
.inp::placeholder{color:${t.muted};}
textarea.inp{resize:none;line-height:1.65;}
.btn{padding:7px 13px;border-radius:6px;border:1px solid ${t.bdr};background:${t.surf2};color:${t.text};cursor:pointer;font-family:'Lato',sans-serif;font-size:12px;font-weight:700;transition:all 0.15s;white-space:nowrap;}
.btn:hover{background:rgba(255,255,255,0.1);}
.btn.ac{background:rgba(255,255,255,0.05);border-color:${t.acc};color:${t.acc};}
.btn.ac:hover{background:rgba(255,255,255,0.1);}
.btn.red{border-color:rgba(255,80,80,0.3);color:#ff8888;background:rgba(255,60,60,0.06);}
.btn.red:hover{background:rgba(255,60,60,0.15);}
.btn.full{width:100%;text-align:center;}
.btn.lg{padding:10px 16px;font-size:13px;}
.bk-btn{padding:6px 13px;border-radius:6px;border:1px solid rgba(255,70,70,0.3);background:rgba(255,50,50,0.08);color:#ff8888;cursor:pointer;font-size:12px;font-weight:700;font-family:'Lato',sans-serif;letter-spacing:1px;transition:all 0.15s;}
.bk-btn:hover,.bk-btn.on{background:rgba(255,50,50,0.25);color:#ff4444;box-shadow:0 0 14px rgba(255,50,50,0.3);}
.li{padding:9px 11px;border-radius:7px;margin-bottom:5px;border:1px solid ${t.bdr};cursor:pointer;transition:all 0.15s;background:rgba(255,255,255,0.02);}
.li:hover{border-color:rgba(255,255,255,0.18);background:rgba(255,255,255,0.04);}
.li.on{border-color:${t.acc};background:rgba(255,255,255,0.05);}
.li-title{font-size:12px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.li-sub{font-size:11px;color:${t.muted};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:2px;}
.li-num{font-size:10px;color:${t.muted};font-family:'JetBrains Mono',monospace;margin-bottom:2px;}
.svc-li{padding:8px 11px;border-radius:7px;margin-bottom:5px;border:1px solid ${t.bdr};display:flex;align-items:center;gap:8px;cursor:pointer;transition:all 0.15s;}
.svc-li:hover{border-color:rgba(255,255,255,0.18);}
.svc-li.on{border-color:${t.acc};background:rgba(255,255,255,0.04);}
.svc-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.svc-title{font-size:12px;font-weight:700;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.svc-acts{display:flex;gap:3px;opacity:0;transition:opacity 0.15s;}
.svc-li:hover .svc-acts{opacity:1;}
.mb{width:22px;height:22px;border-radius:4px;border:1px solid ${t.bdr};background:transparent;color:${t.muted};cursor:pointer;font-size:11px;display:flex;align-items:center;justify-content:center;transition:all 0.15s;}
.mb:hover{color:${t.text};background:rgba(255,255,255,0.08);}
.dsp{flex:1;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#020208;}
.dsp-c{position:relative;z-index:2;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:50px 70px;text-align:center;}
.ctrlbar{height:50px;min-height:50px;background:${t.surf};border-top:1px solid ${t.bdr};display:flex;align-items:center;padding:0 14px;gap:8px;}
.dt{font-family:'Cinzel',serif;font-size:clamp(28px,4.5vw,64px);font-weight:700;color:#fff;margin-bottom:18px;line-height:1.2;text-shadow:0 2px 40px rgba(0,0,0,0.9);}
.db{font-family:'Lato',sans-serif;font-size:clamp(13px,1.7vw,20px);color:rgba(255,255,255,0.82);line-height:1.9;white-space:pre-wrap;text-shadow:0 1px 20px rgba(0,0,0,0.7);}
.dv{font-family:'Cinzel',serif;font-style:italic;font-size:clamp(20px,3.2vw,48px);font-weight:600;color:#fff;line-height:1.6;text-shadow:0 0 50px rgba(255,255,255,0.12),0 2px 30px rgba(0,0,0,0.85);}
.dr{margin-top:24px;font-family:'JetBrains Mono',monospace;font-size:15px;letter-spacing:3px;}
.acc-line{width:56px;height:3px;border-radius:2px;margin:0 auto 20px;}
.sec-tag{font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:4px;text-transform:uppercase;opacity:0.75;padding:6px 0;}
.ly-past{font-size:15px;color:rgba(255,255,255,0.2);font-weight:300;transition:all 0.4s;padding:4px 0;}
.ly-cur{font-family:'Cinzel',serif;font-size:clamp(24px,3.8vw,52px);font-weight:700;color:#fff;transform:scale(1.04);text-shadow:0 0 50px rgba(255,255,255,0.2),0 2px 30px rgba(0,0,0,0.85);animation:fadeUp 0.3s ease;transition:all 0.4s;padding:6px 0;cursor:pointer;}
.ly-nxt{font-size:18px;color:rgba(255,255,255,0.48);transition:all 0.4s;padding:4px 0;cursor:pointer;}
.ly-far{font-size:13px;color:rgba(255,255,255,0.12);font-weight:300;transition:all 0.4s;padding:3px 0;cursor:pointer;}
.prg{flex:1;height:3px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden;}
.prg-f{height:100%;border-radius:2px;transition:width 0.4s ease;}
.beat{display:flex;gap:4px;align-items:flex-end;height:26px;}
.beat-b{width:4px;border-radius:2px;transition:height 0.15s ease;}
.timer{font-family:'JetBrains Mono',monospace;font-size:36px;font-weight:600;color:${t.acc};text-align:center;letter-spacing:3px;margin-bottom:8px;}
.pk{padding:4px 9px;border-radius:5px;border:1px solid ${t.bdr};background:transparent;font-size:11px;cursor:pointer;font-family:'Lato',sans-serif;font-weight:700;color:${t.muted};transition:all 0.15s;}
.pk:hover{color:${t.text};}
.pk.on{border-color:${t.acc};color:${t.acc};background:rgba(255,255,255,0.04);}
.vli{padding:8px 10px;border-radius:6px;margin-bottom:4px;border:1px solid ${t.bdr};cursor:pointer;transition:all 0.15s;}
.vli:hover{border-color:rgba(255,255,255,0.18);}
.vli.on{border-color:${t.acc};}
.vref{font-size:11px;color:${t.acc};font-family:'JetBrains Mono',monospace;margin-bottom:2px;}
.vprev{font-size:11px;color:${t.muted};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.live-b{padding:3px 9px;border-radius:4px;background:rgba(255,50,50,0.15);border:1px solid rgba(255,80,80,0.35);color:#ff8888;font-size:10px;font-family:'JetBrains Mono',monospace;letter-spacing:2px;font-weight:700;animation:blink 2s infinite;}
.row{display:flex;gap:6px;align-items:center;}
.f1{flex:1;}
.g6{display:flex;flex-direction:column;gap:6px;}
.g8{display:flex;flex-direction:column;gap:8px;}
.mt8{margin-top:8px;}
.mt10{margin-top:10px;}
.sm{font-size:12px;color:${t.muted};}
.smm{font-size:11px;color:${t.muted};font-family:'JetBrains Mono',monospace;}
.div{border:none;border-top:1px solid ${t.bdr};margin:10px 0;}
input[type=range]{accent-color:${t.acc};flex:1;}
.dot{width:8px;height:8px;border-radius:50%;background:${t.acc};animation:pDot 1.2s infinite ease-in-out;}
.dot:nth-child(2){animation-delay:.2s}.dot:nth-child(3){animation-delay:.4s}
.bg-up{width:100%;height:48px;border-radius:6px;border:1px dashed ${t.bdr};background:rgba(255,255,255,0.02);display:flex;align-items:center;justify-content:center;font-size:11px;color:${t.muted};cursor:pointer;transition:border-color 0.15s;position:relative;overflow:hidden;}
.bg-up:hover{border-color:rgba(255,255,255,0.2);}
`;

// ── HELPERS ───────────────────────────────────────────────────────
function loadLS(key, def) { try { const v=localStorage.getItem(key); return v?JSON.parse(v):def; } catch { return def; } }
function saveLS(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }

const DEF_FOLDERS = [
  { id:1, name:"Sunday Morning", icon:"☀️", items:[] },
  { id:2, name:"Wednesday Study", icon:"📖", items:[] },
  { id:3, name:"Youth Service",   icon:"⚡", items:[] },
  { id:4, name:"Christmas",       icon:"✨", items:[] },
  { id:5, name:"Easter",          icon:"🌸", items:[] },
];

// ── MAIN COMPONENT ────────────────────────────────────────────────
export default function StageApp() {
  const [themeKey, setThemeKey] = useState("midnight");
  const t = THEMES[themeKey];
  const [mode, setMode] = useState("service");
  const [bgType, setBgType] = useState("clouds");
  const [customBg, setCustomBg] = useState(null);
  const [blackout, setBlackout] = useState(false);

  // Folders
  const [folders, setFolders] = useState(() => loadLS("stage-folders2", DEF_FOLDERS));
  const [selFolder, setSelFolder] = useState(0);
  const [liveIdx, setLiveIdx] = useState(null);
  const [newFolder, setNewFolder] = useState("");

  // Live display
  const [live, setLive] = useState({ type:"blank" });
  const pushLive = (update) => setLive(update);

  // Music
  const [customSongs, setCustomSongs] = useState(() => loadLS("stage-songs2", []));
  const [selSong, setSelSong] = useState(HYMNS[0]);
  const [songTitle, setSongTitle] = useState(HYMNS[0].title);
  const [lyrics, setLyrics] = useState(HYMNS[0].lyrics);
  const [lyricIdx, setLyricIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(3);
  const [beats, setBeats] = useState([18,30,12,38,20,26,16,34]);
  const [hymnQ, setHymnQ] = useState("");
  const lyricTmr = useRef(null);
  const beatTmr = useRef(null);

  // Bible
  const [bibleQ, setBibleQ] = useState("John 3:16");
  const [bibleVer, setBibleVer] = useState("web");
  const [bibleRes, setBibleRes] = useState(null);
  const [bibleLoad, setBibleLoad] = useState(false);
  const [bibleErr, setBibleErr] = useState("");
  const [selVerse, setSelVerse] = useState(null);

  // Slides
  const [slides, setSlides] = useState([
    {id:1,title:"Welcome",body:"Welcome to Sunday Service\nWe are glad you are here",notes:"Greet congregation warmly."},
    {id:2,title:"Announcements",body:"• Bible Study — Wednesday 7PM\n• Prayer Meeting — Friday 6PM\n• Youth Group — Saturday 3PM",notes:""},
    {id:3,title:"Today's Message",body:"Sermon title here",notes:"Hand over to pastor."},
  ]);
  const [curSlide, setCurSlide] = useState(0);
  const [slideNotes, setSlideNotes] = useState(slides[0].notes);
  const [timerSec, setTimerSec] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const timerRef = useRef(null);

  // Persist
  useEffect(() => { saveLS("stage-folders2", folders); }, [folders]);
  useEffect(() => { saveLS("stage-songs2", customSongs); }, [customSongs]);

  // Timer
  useEffect(() => {
    if (timerOn) { timerRef.current = setInterval(() => setTimerSec(s => s+1), 1000); }
    else { clearInterval(timerRef.current); }
    return () => clearInterval(timerRef.current);
  }, [timerOn]);
  const fmt = s => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  // Slides
  const goSlide = (i) => { setCurSlide(i); setSlideNotes(slides[i]?.notes||""); pushLive({type:"slide",title:slides[i]?.title,body:slides[i]?.body}); };
  const updSlide = (f,v) => setSlides(sl => sl.map((s,i) => i===curSlide ? {...s,[f]:v} : s));

  // Karaoke
  const lines = lyrics.split("\n").map(l => l.trim());
  const isSec = (l) => l.startsWith("[") && l.endsWith("]");

  const stopPlay = () => { setPlaying(false); clearInterval(lyricTmr.current); clearInterval(beatTmr.current); };

  const startPlay = () => {
    if (playing) { stopPlay(); return; }
    setPlaying(true);
    setLyricIdx(0);
    pushLive({type:"lyric", text:lines[0], isSec:isSec(lines[0]), songTitle});
    const ms = Math.max(700, 4500 - speed*550);
    lyricTmr.current = setInterval(() => {
      setLyricIdx(prev => {
        const next = prev + 1;
        if (next >= lines.length) { stopPlay(); return prev; }
        pushLive({type:"lyric", text:lines[next], isSec:isSec(lines[next]), songTitle});
        return next;
      });
    }, ms);
    beatTmr.current = setInterval(() => {
      setBeats(Array.from({length:8}, () => Math.random()*26+4));
    }, 200);
  };

  useEffect(() => () => { clearInterval(lyricTmr.current); clearInterval(beatTmr.current); }, []);

  const loadSong = (s) => { stopPlay(); setSelSong(s); setSongTitle(s.title); setLyrics(s.lyrics); setLyricIdx(0); };
  const saveSong = () => {
    const ex = customSongs.find(s => s.title.toLowerCase()===songTitle.toLowerCase());
    if (ex) setCustomSongs(c => c.map(x => x.id===ex.id ? {...x,lyrics} : x));
    else setCustomSongs(c => [...c, {id:Date.now(), title:songTitle, lyrics}]);
  };
  const manualLine = (i) => { setLyricIdx(i); pushLive({type:"lyric", text:lines[i], isSec:isSec(lines[i]), songTitle}); };
  const filtHymns = HYMNS.filter(h => h.title.toLowerCase().includes(hymnQ.toLowerCase()));
  const progress = lines.length > 1 ? (lyricIdx/(lines.length-1))*100 : 0;

  // Bible
  const fetchVerse = async (ref) => {
    if (!ref.trim()) return;
    setBibleLoad(true); setBibleErr(""); setBibleRes(null); setSelVerse(null);
    try {
      const r = await fetch(`https://bible-api.com/${encodeURIComponent(ref)}?translation=${bibleVer}`);
      const d = await r.json();
      if (d.error) throw new Error();
      const v = {text:d.text.trim(), ref:d.reference};
      setBibleRes(v);
      pushLive({type:"verse", text:v.text, ref:v.ref});
    } catch { setBibleErr("Not found. Try: John 3:16"); }
    setBibleLoad(false);
  };
  const selectVerse = (v) => { setSelVerse(v); setBibleRes(null); pushLive({type:"verse", text:v.text, ref:v.ref}); };

  // Service folders
  const curFolder = folders[selFolder] || {items:[]};
  const addToSvc = (item) => setFolders(f => f.map((fl,i) => i===selFolder ? {...fl,items:[...fl.items,{...item,id:Date.now()}]} : fl));
  const remFromSvc = (id) => setFolders(f => f.map((fl,i) => i===selFolder ? {...fl,items:fl.items.filter(x=>x.id!==id)} : fl));
  const moveItem = (idx,dir) => {
    const its=[...curFolder.items]; const ni=idx+dir;
    if(ni<0||ni>=its.length) return;
    [its[idx],its[ni]]=[its[ni],its[idx]];
    setFolders(f => f.map((fl,i) => i===selFolder ? {...fl,items:its} : fl));
  };
  const goLive = (item,idx) => {
    setLiveIdx(idx);
    if (item.type==="song") { loadSong({title:item.title,lyrics:item.lyrics}); setMode("music"); }
    else pushLive({type:item.type, title:item.title, body:item.body||"", text:item.text, ref:item.ref});
  };
  const addFolder = () => { if(!newFolder.trim())return; setFolders(f=>[...f,{id:Date.now(),name:newFolder,icon:"📁",items:[]}]); setNewFolder(""); };
  const typeCol = { song:t.acc, verse:"#60c090", slide:"#6090cc", blank:"rgba(255,255,255,0.2)" };

  // Custom BG
  const handleBg = (e) => { const f=e.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=ev=>setCustomBg(ev.target.result); r.readAsDataURL(f); };

  // Visible lyric lines
  const visLines = lines.map((l,i)=>({l,i})).filter(({i})=>{ const d=i-lyricIdx; return d>=-2&&d<=5; });

  // Render display
  const renderDisplay = () => (
    <div className="dsp">
      {customBg
        ? <div style={{position:"absolute",inset:0,backgroundImage:`url(${customBg})`,backgroundSize:"cover",backgroundPosition:"center",filter:"brightness(0.45)"}}/>
        : <AnimBg type={bgType}/>
      }
      {blackout && <div style={{position:"absolute",inset:0,background:"#000",zIndex:50}}/>}
      <div className="dsp-c">

        {mode==="presentation" && (()=>{
          const sl=slides[curSlide]||{};
          return <>
            <div className="dt" style={{textShadow:`0 0 40px ${t.acc}55,0 2px 30px rgba(0,0,0,0.9)`}}>{sl.title}</div>
            {sl.title&&sl.body&&<div className="acc-line" style={{background:t.acc,boxShadow:`0 0 10px ${t.acc}`}}/>}
            <div className="db">{sl.body}</div>
          </>;
        })()}

        {mode==="music" && (
          <div style={{width:"100%",maxWidth:840,textAlign:"center"}}>
            {!playing&&lyricIdx===0
              ? <div style={{color:"rgba(255,255,255,0.18)",fontFamily:"'Cinzel',serif",fontSize:22}}>Ready · {songTitle}</div>
              : visLines.map(({l,i}) => isSec(l)
                  ? <div key={i} className="sec-tag" style={{color:t.acc}}>{l.slice(1,-1)}</div>
                  : <div key={i} className={`ly-${i<lyricIdx?"past":i===lyricIdx?"cur":i===lyricIdx+1?"nxt":"far"}`} onClick={()=>manualLine(i)}>{l||"\u00a0"}</div>
              )
            }
          </div>
        )}

        {mode==="bible" && (()=>{
          const v=bibleRes||selVerse;
          if (bibleLoad) return <div className="row" style={{gap:8,justifyContent:"center"}}><div className="dot"/><div className="dot"/><div className="dot"/></div>;
          if (v) return <>
            <div className="dv" style={{textShadow:`0 0 50px ${t.acc}44`}}>"{v.text}"</div>
            <div className="dr" style={{color:t.acc}}>— {v.ref}</div>
          </>;
          return <div style={{fontFamily:"'Cinzel',serif",fontSize:24,color:"rgba(255,255,255,0.12)"}}>Search a Bible verse</div>;
        })()}

        {mode==="service" && live.type==="slide" && <>
          <div className="dt" style={{textShadow:`0 0 40px ${t.acc}55`}}>{live.title}</div>
          {live.title&&live.body&&<div className="acc-line" style={{background:t.acc}}/>}
          <div className="db">{live.body}</div>
        </>}
        {mode==="service" && live.type==="verse" && <>
          <div className="dv" style={{textShadow:`0 0 50px ${t.acc}44`}}>"{live.text}"</div>
          <div className="dr" style={{color:t.acc}}>— {live.ref}</div>
        </>}
        {mode==="service" && (live.type==="blank"||!live.type) &&
          <div style={{color:"rgba(255,255,255,0.07)",fontFamily:"'Cinzel',serif",fontSize:14,letterSpacing:6}}>STAGE · READY</div>
        }
      </div>
    </div>
  );

  return (
    <>
      <style>{makeCSS(t)}</style>
      <div className="app">

        {/* HEADER */}
        <div className="hdr">
          <div className="logo">Stage</div>
          <div className="tabs">
            {[["service","⬡ Service"],["presentation","◧ Slides"],["music","♪ Music"],["bible","✝ Bible"]].map(([m,lb])=>(
              <button key={m} className={`tab ${mode===m?"on":""}`} onClick={()=>setMode(m)}>{lb}</button>
            ))}
          </div>
          <div className="hdr-r">
            <button className={`bk-btn ${blackout?"on":""}`} onClick={()=>setBlackout(b=>!b)}>⬛ BLACKOUT</button>
          </div>
        </div>

        {/* SERVICE MODE */}
        {mode==="service" && (
          <div className="content">
            <div className="lp">
              <div className="ps">
                <div className="pl">Folders</div>
                <div className="sc" style={{maxHeight:200}}>
                  {folders.map((f,i)=>(
                    <div key={f.id} className={`li ${i===selFolder?"on":""}`} onClick={()=>setSelFolder(i)}>
                      <div className="row"><span>{f.icon}</span><span className="li-title f1">{f.name}</span><span className="smm">{f.items.length}</span></div>
                    </div>
                  ))}
                </div>
                <div className="div"/>
                <div className="g6">
                  <input className="inp" value={newFolder} onChange={e=>setNewFolder(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addFolder()} placeholder="New folder name..."/>
                  <button className="btn ac full" onClick={addFolder}>+ Create Folder</button>
                </div>
              </div>
              <div className="ps grow">
                <div className="pl">Add to Service</div>
                <div className="g6">
                  <button className="btn full" onClick={()=>addToSvc({type:"song",title:HYMNS[0].title,lyrics:HYMNS[0].lyrics})}>+ Add Hymn</button>
                  <button className="btn full" onClick={()=>addToSvc({type:"verse",title:BIBLE[0].ref,ref:BIBLE[0].ref,text:BIBLE[0].text})}>+ Add Bible Verse</button>
                  <button className="btn full" onClick={()=>addToSvc({type:"slide",title:"New Slide",body:""})}>+ Add Slide</button>
                  <button className="btn full" onClick={()=>addToSvc({type:"blank",title:"Blank Screen"})}>+ Blank Screen</button>
                </div>
                <div className="div"/>
                <div className="sm" style={{lineHeight:1.9}}>💡 Click item to go live<br/>↑↓ arrows to reorder<br/>✕ to remove from service</div>
              </div>
            </div>

            <div className="stage">
              {renderDisplay()}
              <div className="ctrlbar">
                {liveIdx!==null&&<span className="live-b">LIVE</span>}
                <button className="btn" onClick={()=>{if(liveIdx>0)goLive(curFolder.items[liveIdx-1],liveIdx-1);}}>← Prev</button>
                <span className="sm" style={{minWidth:56,textAlign:"center"}}>{liveIdx!=null?`${liveIdx+1}/${curFolder.items.length}`:"-"}</span>
                <button className="btn ac" onClick={()=>{const ni=(liveIdx??-1)+1;if(ni<curFolder.items.length)goLive(curFolder.items[ni],ni);}}>Next →</button>
                <div className="f1"/>
                <button className="btn" onClick={()=>pushLive({type:"blank"})}>Clear Screen</button>
              </div>
            </div>

            <div className="rp">
              <div className="ps"><div className="pl">{curFolder.name}</div></div>
              <div className="sc ps" style={{flex:1,paddingTop:8}}>
                {curFolder.items.length===0&&<div className="sm" style={{textAlign:"center",padding:20,lineHeight:2}}>Empty. Add items from left panel.</div>}
                {curFolder.items.map((item,idx)=>(
                  <div key={item.id} className={`svc-li ${liveIdx===idx?"on":""}`} onClick={()=>goLive(item,idx)}>
                    <div className="svc-dot" style={{background:typeCol[item.type]||"#888"}}/>
                    <span className="svc-title">{item.title}</span>
                    <div className="svc-acts">
                      <button className="mb" onClick={e=>{e.stopPropagation();moveItem(idx,-1);}}>↑</button>
                      <button className="mb" onClick={e=>{e.stopPropagation();moveItem(idx,1);}}>↓</button>
                      <button className="mb" style={{color:"#ff8888"}} onClick={e=>{e.stopPropagation();remFromSvc(item.id);}}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PRESENTATION MODE */}
        {mode==="presentation" && (
          <div className="content">
            <div className="lp">
              <div className="ps">
                <div className="pl">Slides</div>
                <div className="row mt8">
                  <button className="btn f1" onClick={()=>setSlides(s=>[...s,{id:Date.now(),title:`Slide ${s.length+1}`,body:"",notes:""}])}>+ Add</button>
                  <button className="btn red" onClick={()=>{if(slides.length<=1)return;const n=slides.filter((_,i)=>i!==curSlide);setSlides(n);setCurSlide(Math.min(curSlide,n.length-1));}}>Del</button>
                </div>
              </div>
              <div className="sc" style={{flex:1,padding:8}}>
                {slides.map((sl,i)=>(
                  <div key={sl.id} className={`li ${i===curSlide?"on":""}`} onClick={()=>goSlide(i)}>
                    <div className="li-num">#{String(i+1).padStart(2,"0")}</div>
                    <div className="li-title">{sl.title||"Untitled"}</div>
                    <div className="li-sub">{sl.body?.split("\n")[0]}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="stage">
              {renderDisplay()}
              <div className="ctrlbar">
                <button className="btn" onClick={()=>goSlide(Math.max(0,curSlide-1))}>← Prev</button>
                <span className="sm" style={{minWidth:56,textAlign:"center"}}>{curSlide+1}/{slides.length}</span>
                <button className="btn ac" onClick={()=>goSlide(Math.min(slides.length-1,curSlide+1))}>Next →</button>
                <div className="f1"/>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:timerSec>3600?"#ff6060":t.acc,minWidth:56,letterSpacing:2}}>{fmt(timerSec)}</div>
                <button className="btn" onClick={()=>setTimerOn(!timerOn)}>{timerOn?"⏸":"▶"}</button>
                <button className="btn" onClick={()=>{setTimerSec(0);setTimerOn(false);}}>↺</button>
              </div>
            </div>

            <div className="rp">
              <div className="ps">
                <div className="pl">Edit Slide</div>
                <div className="g8">
                  <input className="inp" value={slides[curSlide]?.title||""} onChange={e=>updSlide("title",e.target.value)} placeholder="Title..."/>
                  <textarea className="inp" rows={4} value={slides[curSlide]?.body||""} onChange={e=>updSlide("body",e.target.value)} placeholder="Content..."/>
                </div>
              </div>
              <div className="ps grow">
                <div className="pl">Speaker Notes</div>
                <textarea className="inp" style={{flex:1,resize:"none"}} value={slideNotes} onChange={e=>{setSlideNotes(e.target.value);updSlide("notes",e.target.value);}} placeholder="Private notes..."/>
              </div>
            </div>
          </div>
        )}

        {/* MUSIC MODE */}
        {mode==="music" && (
          <div className="content">
            <div className="lp">
              <div className="ps">
                <div className="pl">Hymn Library</div>
                <input className="inp mt8" value={hymnQ} onChange={e=>setHymnQ(e.target.value)} placeholder="Search hymns..."/>
              </div>
              <div className="sc" style={{flex:1,padding:8}}>
                <div className="smm" style={{padding:"2px 2px 6px",letterSpacing:2}}>BUILT-IN ({filtHymns.length})</div>
                {filtHymns.map(h=>(
                  <div key={h.id} className={`li ${selSong?.id===h.id?"on":""}`} onClick={()=>loadSong(h)}>
                    <div className="row">
                      <div className="li-title f1">{h.title}</div>
                      <button className="mb" title="Add to service" onClick={e=>{e.stopPropagation();addToSvc({type:"song",title:h.title,lyrics:h.lyrics});}}>+</button>
                    </div>
                  </div>
                ))}
                {customSongs.length>0&&<>
                  <div className="smm" style={{padding:"10px 2px 6px",letterSpacing:2}}>MY SONGS</div>
                  {customSongs.map(s=>(
                    <div key={s.id} className={`li ${selSong?.id===s.id?"on":""}`} onClick={()=>loadSong(s)}>
                      <div className="row">
                        <div className="li-title f1">{s.title}</div>
                        <button className="mb" style={{color:"#ff8888"}} onClick={e=>{e.stopPropagation();setCustomSongs(c=>c.filter(x=>x.id!==s.id));}}>✕</button>
                      </div>
                    </div>
                  ))}
                </>}
              </div>
            </div>

            <div className="stage">
              {renderDisplay()}
              <div className="ctrlbar">
                <button className={`btn lg ${playing?"red":"ac"}`} onClick={startPlay}>{playing?"⏹ Stop":"▶ Start"}</button>
                {playing&&<>
                  <button className="btn" onClick={()=>manualLine(Math.max(0,lyricIdx-1))}>↑</button>
                  <button className="btn" onClick={()=>manualLine(Math.min(lines.length-1,lyricIdx+1))}>↓</button>
                  <div className="prg"><div className="prg-f" style={{width:`${progress}%`,background:`linear-gradient(90deg,${t.acc},rgba(255,255,255,0.5))`}}/></div>
                  <div className="beat">{beats.map((h,i)=><div key={i} className="beat-b" style={{height:h,background:`linear-gradient(0deg,${t.acc},rgba(255,255,255,0.5))`}}/>)}</div>
                </>}
                <div className="f1"/>
                <span className="smm" style={{color:t.acc}}>{songTitle}</span>
              </div>
            </div>

            <div className="rp">
              <div className="ps">
                <div className="pl">Song Editor</div>
                <div className="g8">
                  <input className="inp" value={songTitle} onChange={e=>setSongTitle(e.target.value)} placeholder="Song title..."/>
                  <textarea className="inp" rows={9} value={lyrics} onChange={e=>setLyrics(e.target.value)} placeholder={"Paste lyrics here...\n\n[Verse 1]\nLine 1\nLine 2\n\n[Chorus]\nLine 1"}/>
                </div>
                <div className="row mt8">
                  <button className="btn ac f1" onClick={saveSong}>💾 Save</button>
                  <button className="btn f1" onClick={()=>addToSvc({type:"song",title:songTitle,lyrics})}>+ Service</button>
                </div>
              </div>
              <div className="ps">
                <div className="pl">Scroll Speed</div>
                <div className="row mt8">
                  <span className="sm">Slow</span>
                  <input type="range" min="1" max="7" value={speed} onChange={e=>setSpeed(Number(e.target.value))}/>
                  <span className="sm">Fast</span>
                  <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:t.acc,minWidth:16}}>{speed}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BIBLE MODE */}
        {mode==="bible" && (
          <div className="content">
            <div className="lp">
              <div className="ps">
                <div className="pl">Translation</div>
                <div className="row mt8" style={{flexWrap:"wrap",gap:4}}>
                  {["web","kjv","asv","bbe"].map(v=>(
                    <button key={v} className={`pk ${bibleVer===v?"on":""}`} onClick={()=>setBibleVer(v)}>{v.toUpperCase()}</button>
                  ))}
                </div>
              </div>
              <div className="ps">
                <div className="pl">Online Search</div>
                <div className="g8 mt8">
                  <input className="inp" value={bibleQ} onChange={e=>setBibleQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&fetchVerse(bibleQ)} placeholder="e.g. John 3:16"/>
                  <button className="btn ac full lg" onClick={()=>fetchVerse(bibleQ)}>{bibleLoad?"Searching...":"Search"}</button>
                  {bibleErr&&<div style={{fontSize:12,color:"#ff8888"}}>{bibleErr}</div>}
                  {bibleRes&&<button className="btn full" onClick={()=>addToSvc({type:"verse",title:bibleRes.ref,ref:bibleRes.ref,text:bibleRes.text})}>+ Add to Service</button>}
                </div>
              </div>
              <div className="ps grow">
                <div className="pl">Offline Verses ({BIBLE.length})</div>
                <div className="sc mt8">
                  {BIBLE.map((v,i)=>(
                    <div key={i} className={`vli ${selVerse?.ref===v.ref?"on":""}`} onClick={()=>selectVerse(v)}>
                      <div className="vref">{v.ref}</div>
                      <div className="vprev">{v.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="stage">
              {renderDisplay()}
              <div className="ctrlbar">
                {(bibleRes||selVerse)&&<span className="smm" style={{color:t.acc}}>{(bibleRes||selVerse).ref}</span>}
                <div className="f1"/>
                {(bibleRes||selVerse)&&<button className="btn" onClick={()=>addToSvc({type:"verse",title:(bibleRes||selVerse).ref,ref:(bibleRes||selVerse).ref,text:(bibleRes||selVerse).text})}>+ Add to Service</button>}
              </div>
            </div>

            <div className="rp">
              <div className="ps">
                <div className="pl">Theme</div>
                <div className="row mt8" style={{flexWrap:"wrap",gap:4}}>
                  {Object.entries(THEMES).map(([k,v])=>(
                    <button key={k} className={`pk ${themeKey===k?"on":""}`} onClick={()=>setThemeKey(k)}>{v.name}</button>
                  ))}
                </div>
              </div>
              <div className="ps">
                <div className="pl">Stage Background</div>
                <div className="row mt8" style={{flexWrap:"wrap",gap:4}}>
                  {[["none","⬛ None"],["clouds","☁ Clouds"],["stars","✦ Stars"],["rain","🌧 Rain"],["waterfall","💧 Falls"],["sunrise","🌅 Sunrise"],["ocean","🌊 Ocean"]].map(([id,lb])=>(
                    <button key={id} className={`pk ${bgType===id&&!customBg?"on":""}`} onClick={()=>{setBgType(id);setCustomBg(null);}}>{lb}</button>
                  ))}
                </div>
                <div className="div"/>
                <label className="bg-up" style={{cursor:"pointer",border:`1px dashed ${customBg?t.acc:"rgba(255,255,255,0.1)"}`}}>
                  {customBg?<span style={{color:t.acc}}>📷 Custom Image ✓</span>:<span>📷 Upload Custom Background</span>}
                  <input type="file" accept="image/*" style={{display:"none"}} onChange={handleBg}/>
                </label>
                {customBg&&<button className="btn red full mt8" onClick={()=>setCustomBg(null)}>Remove Custom Image</button>}
              </div>
              <div className="ps">
                <div className="pl">Translations</div>
                <div className="g6" style={{fontSize:11,color:t.muted,lineHeight:1.9}}>
                  <div><b style={{color:t.acc}}>WEB</b> — World English Bible</div>
                  <div><b style={{color:t.acc}}>KJV</b> — King James Version</div>
                  <div><b style={{color:t.acc}}>ASV</b> — American Standard</div>
                  <div><b style={{color:t.acc}}>BBE</b> — Basic English Bible</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM BAR */}
        {mode!=="bible" && (
          <div style={{background:t.surf,borderTop:`1px solid ${t.bdr}`,padding:"7px 16px",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
            <span className="smm">THEME:</span>
            {Object.entries(THEMES).map(([k,v])=>(
              <button key={k} className={`pk ${themeKey===k?"on":""}`} onClick={()=>setThemeKey(k)}>{v.name}</button>
            ))}
            <span className="smm" style={{marginLeft:6}}>BG:</span>
            {[["none","⬛"],["clouds","☁"],["stars","✦"],["rain","🌧"],["waterfall","💧"],["sunrise","🌅"],["ocean","🌊"]].map(([id,ic])=>(
              <button key={id} className={`pk ${bgType===id&&!customBg?"on":""}`} onClick={()=>{setBgType(id);setCustomBg(null);}}>{ic}</button>
            ))}
            <label className={`pk ${customBg?"on":""}`} style={{cursor:"pointer"}}>
              📷 {customBg?"Custom ✓":"Upload"}
              <input type="file" accept="image/*" style={{display:"none"}} onChange={handleBg}/>
            </label>
          </div>
        )}

      </div>
    </>
  );
}
