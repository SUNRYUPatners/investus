#!/usr/bin/env node
// Chart generator — 2026-10-26 추가 — META FCF · Cybercab 텍사스 · SpaceX 네오클라우드 · Gerstner · Starlink
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../public/charts');
const DATE = '20261026';

function escXml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function wrapText(text, maxVis) {
  function visLen(s){let v=0;for(const ch of s)v+=/[가-힯぀-ヿ一-鿿]/.test(ch)?2:1;return v;}
  const words=text.split(' ');const lines=[];let cur='',curV=0;
  for(const w of words){
    const wv=visLen(w);const sep=cur?1:0;
    if(curV+sep+wv>maxVis&&cur){lines.push(cur);cur=w;curV=wv;}
    else{cur=cur?cur+' '+w:w;curV+=sep+wv;}
  }
  if(cur)lines.push(cur);return lines;
}
function base(f1='#0D1117',f2='#0A0520',a1='#EF4444',a2='#C084FC'){
  return `<defs>
    <linearGradient id="bgG" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="${f1}"/><stop offset="100%" stop-color="${f2}"/>
    </linearGradient>
    <linearGradient id="accentG" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="${a1}"/><stop offset="100%" stop-color="${a2}"/>
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="1080" height="1350" fill="url(#bgG)"/>
  <rect x="0" y="0" width="1080" height="10" fill="url(#accentG)"/>`;
}
function footer(){
  return `<rect x="0" y="1340" width="1080" height="10" fill="url(#accentG)"/>
  <text x="40" y="1333" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">investus.kr · Not investment advice · INVESTUS SRP</text>`;
}
function badge(x,y,w,label,bg,border,tc){
  return `<rect x="${x}" y="${y}" width="${w}" height="40" rx="20" fill="${bg}"/>
  <rect x="${x}" y="${y}" width="${w}" height="40" rx="20" fill="none" stroke="${border}" stroke-width="2"/>
  <text x="${x+w/2}" y="${y+26}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="${tc}">${escXml(label)}</text>`;
}
function statBox(x,y,w,h,top,big,unit,sub,accent='#EF4444'){
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#0F1623" stroke="${accent}" stroke-width="2"/>
  <text x="${x+w/2}" y="${y+34}" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${escXml(top)}</text>
  <text x="${x+w/2}" y="${y+96}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="54" font-weight="900" fill="${accent}">${escXml(big)}</text>
  <text x="${x+w/2}" y="${y+128}" text-anchor="middle" font-family="Arial,sans-serif" font-size="21" fill="#D1D5DB">${escXml(unit)}</text>
  <text x="${x+w/2}" y="${y+158}" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">${escXml(sub)}</text>`;
}
// msgBox: auto-calculates height from line count. Returns {svg, h, nextY}.
function msgBox(y, titleText, lines, accentTop='#F59E0B', borderColor='#92400E'){
  const lh = 34;
  const h = 72 + lines.length * lh + 28;
  const textSvg = lines.map((ln, i) =>
    `<text x="108" y="${y+72+i*lh}" font-family="Arial,sans-serif" font-size="24" fill="${i===lines.length-1?'#FDE68A':'#E5E7EB'}">${escXml(ln)}</text>`
  ).join('');
  const svg = `<rect x="54" y="${y}" width="972" height="${h}" rx="22" fill="#0F0A00" stroke="${borderColor}" stroke-width="2.5"/>
  <line x1="54" y1="${y+48}" x2="1026" y2="${y+48}" stroke="${accentTop}" stroke-width="2"/>
  <text x="108" y="${y+33}" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="${accentTop}">${escXml(titleText)}</text>
  ${textSvg}`;
  return { svg, h, nextY: y + h + 14 };
}

async function save(slug, svg) {
  const svgPath = path.join(OUT, `${slug}.svg`);
  const pngPath = path.join(OUT, `${slug}.png`);
  fs.writeFileSync(svgPath, svg);
  await sharp(Buffer.from(svg)).png().toFile(pngPath);
  console.log(`  ✓ ${slug}.png`);
}

// ── META FCF 첫 적자 ─────────────────────────────────────────
function makeMetaFcf(ko){
  const titleLine = ko ? 'META · Q3 2026' : 'META · Q3 2026';
  const heroMain = ko ? 'FCF 사상 첫 적자' : 'First Negative FCF Ever';
  const heroNum  = ko ? '-$1.2B' : '-$1.2B';
  const msg1lines = ko
    ? ['2012년 상장 이후 처음으로 분기 잉여현금흐름이 마이너스가 됐습니다.',
       'AI 자본지출 $34.9B이 분기 영업현금흐름을 초과한 결과입니다.',
       '매출 $64.6B(+26%), adj EPS $7.40은 컨센서스를 웃돌았습니다.']
    : ['Free cash flow turned negative for the first time since 2012 IPO.',
       'AI capex of $34.9B in a single quarter exceeded operating cash flow.',
       'Revenue $64.6B (+26%), adj EPS $7.40 both beat consensus.'];
  const msg2lines = ko
    ? ['연간 capex 가이던스 $135~145B으로 상향됐습니다.',
       '현금 마이너스가 일회성인지, AI 사이클이 끝나는',
       '2027년까지 지속되는지가 핵심 관전 포인트입니다.']
    : ['Full-year capex guidance raised to $135–145B.',
       'The key question: is this a one-quarter event or will FCF',
       'stay negative until the AI capex cycle peaks in 2027?'];
  const bars = [
    {label:'Q1\'25', val:14.1, pct:85, pos:true},
    {label:'Q2\'25', val:10.9, pct:66, pos:true},
    {label:'Q3\'25', val:16.5, pct:100, pos:true},
    {label:'Q4\'25', val:14.8, pct:90, pos:true},
    {label:'Q1\'26', val:13.2, pct:80, pos:true},
    {label:'Q2\'26', val:9.0,  pct:55, pos:true},
    {label:'Q3\'26', val:-1.2, pct:7,  pos:false},
  ];
  const barW=110, barGap=18, barMaxH=160, barY0=700;
  const totalW=bars.length*(barW+barGap)-barGap;
  const startX=(1080-totalW)/2;
  const barsSvg=bars.map((b,i)=>{
    const x=startX+i*(barW+barGap);
    const h=Math.max(8,b.pct*barMaxH/100);
    const col=b.pos?'#3B82F6':'#EF4444';
    const ty=b.pos?barY0-h:barY0+8;
    const textY=b.pos?barY0-h-12:barY0+h+28;
    const valStr=b.pos?`$${b.val}B`:`-$${Math.abs(b.val)}B`;
    return `<rect x="${x}" y="${ty}" width="${barW}" height="${h}" rx="8" fill="${col}"/>
    <text x="${x+barW/2}" y="${textY}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="21" font-weight="900" fill="${col}">${escXml(valStr)}</text>
    <text x="${x+barW/2}" y="${barY0+26}" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">${escXml(b.label)}</text>`;
  }).join('');
  const chartLabel=ko?'FCF 분기별 추이 (단위: $B)':'Quarterly FCF trend ($B)';

  const m1 = msgBox(916, ko?'🔵 포인트':'🔵 Key Point', msg1lines, '#3B82F6', '#1D4ED8');
  const m2 = msgBox(m1.nextY, ko?'📊 다음 확인':'📊 Next', msg2lines, '#60A5FA', '#1E3A5F');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#0A0A1A','#0A0A0A','#3B82F6','#1D4ED8')}
  ${badge(40,24,120,'META','#1D4ED8','#3B82F6','#fff')}
  <text x="540" y="82" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="30" font-weight="900" fill="#93C5FD">${escXml(titleLine)}</text>
  <text x="540" y="200" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="80" font-weight="900" fill="#EF4444" filter="url(#glow)">${escXml(heroNum)}</text>
  <text x="540" y="268" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="40" font-weight="900" fill="#F87171">${escXml(heroMain)}</text>
  <line x1="54" y1="300" x2="1026" y2="300" stroke="#1D4ED8" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="40" y="345" font-family="Arial,sans-serif" font-size="26" fill="#93C5FD">${escXml(chartLabel)}</text>
  <line x1="40" y1="${barY0}" x2="1040" y2="${barY0}" stroke="#374151" stroke-width="1.5"/>
  ${barsSvg}
  ${statBox(40,740,310,170,ko?'AI 자본지출':'AI Capex','$34.9B',ko?'분기':'quarterly',ko?'전년비 +80%':'YoY +80%','#3B82F6')}
  ${statBox(380,740,310,170,ko?'Q3 매출':'Revenue','$64.6B',ko?'YoY':'YoY',ko?'+26% 성장':'+26% growth','#10B981')}
  ${statBox(720,740,320,170,ko?'연 capex 가이던스':'Annual Capex','$135~','145B',ko?'가이던스 상향':'guidance raised','#F59E0B')}
  ${m1.svg}
  ${m2.svg}
  ${footer()}
</svg>`;
}

// ── Cybercab 텍사스 970대 ────────────────────────────────────
function makeCybercabTexas(ko){
  const heroNum  = ko ? '970대' : '970 Vehicles';
  const heroSub  = ko ? '텍사스 Tesla 로보택시 (10/25 DMV 기준)' : 'Texas Tesla Robotaxi Fleet (DMV as of Oct 25)';
  const msg1lines = ko
    ? ['Cybercab 463대(47.7%) · Model Y 507대(52.3%)',
       '6월 9일 59대에서 4개월 반 만에 16배 성장',
       '10월 한 달만 +78% 증가 (+424대)',
       '오스틴 F1 예선 Cybercab 목격 1,250건 — 사상 최다']
    : ['Cybercabs 463 (47.7%) · Model Y 507 (52.3%)',
       '16x growth from 59 units on Jun 9 in 4.5 months',
       'October alone: +78% increase (+424 units)',
       'Austin F1 qualifying: 1,250 sightings — all-time record'];
  const msg2lines = ko
    ? ['웨이모는 현재 1,207대로 237대 앞서 있습니다.',
       '이 속도가 유지되면 연말~내년 초 역전 가능성이 있습니다.',
       '무인 주행 비율: 오스틴 F1 예선 92.7%(1159/1250)']
    : ['Waymo leads with 1,207 (237 ahead of Tesla).',
       'At this growth rate, Tesla could overtake by late 2026 / early 2027.',
       'Driverless ratio Austin F1: 92.7% (1,159/1,250)'];

  const growthData=[
    {label:'6/9',val:59},{label:'7',val:150},{label:'8',val:320},
    {label:'9',val:490},{label:'10/1',val:546},{label:'10/25',val:970}
  ];
  const maxVal=970;
  const barW=100,barGap=30,barMaxH=200,barY0=760;
  const totalW=growthData.length*(barW+barGap)-barGap;
  const startX=(1080-totalW)/2;
  const growthSvg=growthData.map((b,i)=>{
    const x=startX+i*(barW+barGap);
    const h=Math.round(b.val/maxVal*barMaxH);
    const col=i===growthData.length-1?'#10B981':'#065F46';
    return `<rect x="${x}" y="${barY0-h}" width="${barW}" height="${h}" rx="8" fill="${col}"/>
    <text x="${x+barW/2}" y="${barY0-h-12}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="20" font-weight="900" fill="${col}">${escXml(b.val)}</text>
    <text x="${x+barW/2}" y="${barY0+26}" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#6B7280">${escXml(b.label)}</text>`;
  }).join('');

  const m1 = msgBox(794, ko?'📍 오늘 포인트':'📍 Key Data', msg1lines, '#10B981', '#065F46');
  const m2 = msgBox(m1.nextY, ko?'🏁 웨이모와 비교':'🏁 vs Waymo', msg2lines, '#F59E0B', '#78350F');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#020F0A','#010D08','#10B981','#059669')}
  ${badge(40,24,130,'TSLA','#065F46','#10B981','#A7F3D0')}
  <text x="540" y="160" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="90" font-weight="900" fill="#10B981" filter="url(#glow)">${escXml(heroNum)}</text>
  <text x="540" y="220" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" fill="#A7F3D0">${escXml(heroSub)}</text>
  ${statBox(40,256,240,156,ko?'Cybercab':'Cybercab','463','47.7%',ko?'전체의 절반 육박':'near half of fleet','#10B981')}
  ${statBox(302,256,240,156,ko?'오스틴 F1 목격':'Austin F1','1,250',ko?'건':'sightings',ko?'사상 최다':'all-time record','#34D399')}
  ${statBox(564,256,240,156,ko?'무인 주행':'Driverless','1,159',ko?'건':'sightings',ko?'기존 기록 +26%':'prev record +26%','#6EE7B7')}
  ${statBox(826,256,214,156,ko?'vs 웨이모':'vs Waymo','1,207','Waymo',ko?'237대 앞서':'237 ahead','#F59E0B')}
  <text x="40" y="452" font-family="Arial,sans-serif" font-size="26" fill="#A7F3D0">${ko?'텍사스 플리트 성장 추이':'Texas Fleet Growth'}</text>
  <line x1="40" y1="${barY0}" x2="1040" y2="${barY0}" stroke="#065F46" stroke-width="1.5"/>
  ${growthSvg}
  ${m1.svg}
  ${m2.svg}
  ${footer()}
</svg>`;
}

// ── SpaceX 네오클라우드 붕괴 ─────────────────────────────────
function makeNeoclouds(ko){
  const heroLine = ko ? '네오클라우드 200개 이상' : '200+ Neoclouds';
  const heroSub  = ko ? '붕괴 예고 · SpaceX AI 컴퓨트 독점 가속' : 'Collapse Incoming · SpaceX AI Compute Dominance';
  const msg1lines = ko
    ? ['머스크: 부채시장이 AI 데이터센터 외 기업에 자금줄을 끊었습니다.',
       'SpaceX는 GPU 구매를 위해 400억달러 부채를 이미 조달했습니다.',
       '200개 이상 네오클라우드가 구피 수준의 죽음과 통합에 직면합니다.',
       'SpaceX가 붕괴하는 네오클라우드 GPU를 헐값에 흡수합니다.']
    : ['Musk: debt markets shut off money for non-AI-datacenter companies.',
       'SpaceX closed $40B in debt financing for GPU purchases.',
       '200+ neoclouds face guppy-level death and consolidation.',
       'SpaceX will buy their GPU scraps at distressed prices.'];
  const msg2lines = ko
    ? ['Panke: SpaceX, 7GW 인수로 총 13GW 컴퓨트 달성 전망',
       'Beth Kindig: GB300(블랙웰울트라) 월 20만대씩 배포 예정',
       'SpaceX AI 사업, Q3 전체 매출의 거의 절반(+9배 성장)']
    : ['Panke: SpaceX acquires 7GW from dying neoclouds → total 13GW compute',
       'Beth Kindig: 200K GB300 (Blackwell Ultra) units online per month',
       'SpaceX AI biz: ~half of Q3 revenue, grew 9x YoY'];

  const m1 = msgBox(752, ko?'🔴 시장 구조 변화':'🔴 Market Structure Shift', msg1lines, '#9333EA', '#4C1D95');
  const m2 = msgBox(m1.nextY, ko?'📡 SpaceX AI 컴퓨트 전망':'📡 SpaceX AI Compute Outlook', msg2lines, '#22C55E', '#14532D');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#0D0520','#070212','#9333EA','#6B21A8')}
  ${badge(40,24,130,'SPCX','#4C1D95','#9333EA','#E9D5FF')}
  ${badge(192,24,130,'NVDA','#14532D','#22C55E','#BBF7D0')}
  <text x="540" y="140" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="58" font-weight="900" fill="#C084FC" filter="url(#glow)">${escXml(heroLine)}</text>
  <text x="540" y="200" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" fill="#E9D5FF">${escXml(heroSub)}</text>
  <line x1="54" y1="226" x2="1026" y2="226" stroke="#7C3AED" stroke-width="1.5"/>
  ${statBox(40,246,310,176,ko?'GPU 부채 조달':'GPU Debt','$40B','closed',ko?'투자등급 SpaceX':'investment grade','#9333EA')}
  ${statBox(380,246,310,176,ko?'확보 컴퓨트':'Compute Target','13GW','guaranteed',ko?'7GW 네오클라우드 흡수':'7GW from neoclouds','#A855F7')}
  ${statBox(720,246,320,176,ko?'GB300 배포':'GB300/month','200K',ko?'대/월':'units',ko?'올해 남은 기간':'through year-end','#22C55E')}
  <rect x="54" y="452" width="972" height="280" rx="22" fill="#1A0938" stroke="#7C3AED" stroke-width="2"/>
  <text x="540" y="498" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#C084FC">${ko?'머스크 직접 발언 (10/25/26)':'Musk Direct Quote (Oct 25, 2026)'}</text>
  <line x1="54" y1="510" x2="1026" y2="510" stroke="#7C3AED" stroke-width="1.5"/>
  <text x="80" y="556" font-family="Arial,sans-serif" font-size="24" fill="#E9D5FF">${ko?'"부채시장이 AI 데이터센터 실질매출 없는 기업에':'&quot;Debt markets have almost entirely shut off access'}</text>
  <text x="80" y="590" font-family="Arial,sans-serif" font-size="24" fill="#E9D5FF">${ko?'자금줄을 거의 완전히 끊었다."':'to money for companies without AI datacenter revenue.&quot;'}</text>
  <text x="80" y="634" font-family="Arial,sans-serif" font-size="24" fill="#C084FC">${ko?'"SpaceX는 GPU용 $40B 부채를 조달했다.':'&quot;SpaceX closed $40B of debt for GPUs,'}</text>
  <text x="80" y="668" font-family="Arial,sans-serif" font-size="24" fill="#C084FC">${ko?'우리는 투자등급이고 스타링크·발사 매출이 있다."':'we&apos;re investment grade with Starlink &amp; launch revenue.&quot;'}</text>
  <text x="80" y="712" font-family="Arial,sans-serif" font-size="24" fill="#F87171">${ko?'"200개 이상 네오클라우드가 구피 수준의 죽음을 맞는다."':'&quot;200+ neoclouds will see guppy-level death.&quot;'}</text>
  ${m1.svg}
  ${m2.svg}
  ${footer()}
</svg>`;
}

// ── Brad Gerstner 인수 발언 ──────────────────────────────────
function makeGerstner(ko){
  const heroTop  = ko ? 'Brad Gerstner (Benchmark Capital)' : 'Brad Gerstner · Benchmark Capital';
  const heroMain = ko ? '$420~$550' : '$420–$550';
  const heroSub  = ko ? 'SpaceX가 Tesla를 인수할 수 있다 — CNBC' : 'SpaceX could acquire Tesla — CNBC';
  const msg1lines = ko
    ? ['현재 TSLA 주가(~$379) 대비 최대 45% 프리미엄에 해당합니다.',
       '독립위원회의 대등합병(merger of equals) 탐색과 다른 구도입니다.',
       'SpaceX가 인수 주체, Tesla가 피인수 대상인 시나리오입니다.']
    : ['Up to 45% premium over TSLA\'s price (~$379) at time of comment.',
       'Distinct from the merger-of-equals scenario the independent committees explore.',
       'Scenario: SpaceX as acquirer, Tesla as the acquisition target.'];
  const msg2lines = ko
    ? ['Tesla 주주: 현금 인수 프리미엄이 단기 상승 이벤트.',
       'SpaceX 주주: 대규모 자금 조달과 EV 사업 리스크를 검토해야 합니다.',
       '현재 공식 절차는 독립위원회 탐색 단계 — 확정 조건 없음.']
    : ['Tesla shareholders: acquisition premium = near-term upside event.',
       'SpaceX shareholders: large funding need + EV business risk to assess.',
       'Current official process: independent committee exploration — no firm terms.'];

  const m1 = msgBox(724, ko?'💡 각 주주 입장':'💡 Stakeholder View', msg1lines, '#10B981', '#064E3B');
  const m2 = msgBox(m1.nextY, ko?'⚠️ 확인 필요':'⚠️ To Monitor', msg2lines, '#F59E0B', '#78350F');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#020D0A','#01080A','#10B981','#0D9488')}
  ${badge(40,24,130,'TSLA','#064E3B','#10B981','#A7F3D0')}
  ${badge(192,24,130,'SPCX','#312E81','#6366F1','#C7D2FE')}
  <text x="540" y="86" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#A7F3D0">${escXml(heroTop)}</text>
  <text x="540" y="210" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="110" font-weight="900" fill="#10B981" filter="url(#glow)">${escXml(heroMain)}</text>
  <text x="540" y="270" text-anchor="middle" font-family="Arial,sans-serif" font-size="32" fill="#6EE7B7">${escXml(heroSub)}</text>
  <line x1="54" y1="300" x2="1026" y2="300" stroke="#0D9488" stroke-width="1.5" stroke-dasharray="6,4"/>
  ${statBox(40,320,320,170,ko?'인수가 하단':'Lower Bound','$420','per share',ko?'현재가 +11%':'vs current +11%','#10B981')}
  ${statBox(390,320,300,170,ko?'인수가 상단':'Upper Bound','$550','per share',ko?'현재가 +45%':'vs current +45%','#34D399')}
  ${statBox(720,320,320,170,ko?'발언 시점 TSLA':'TSLA at time','$379','TSLA',ko?'Gerstner CNBC':'Gerstner CNBC','#F59E0B')}
  <rect x="54" y="516" width="972" height="188" rx="22" fill="#021A14" stroke="#0D9488" stroke-width="2"/>
  <text x="540" y="556" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#34D399">${ko?'합병(merger) vs 인수(acquisition) 차이':'Merger vs Acquisition — Key Difference'}</text>
  <line x1="54" y1="568" x2="1026" y2="568" stroke="#0D9488" stroke-width="1.5"/>
  <text x="80" y="612" font-family="Arial,sans-serif" font-size="24" fill="#A7F3D0">${ko?'▸ 독립위원회: 대등합병(비율 협상, 두 회사 병존)':'▸ Independent Committee: merger of equals (ratio negotiation)'}</text>
  <text x="80" y="648" font-family="Arial,sans-serif" font-size="24" fill="#10B981">${ko?'▸ Gerstner 시나리오: SpaceX가 Tesla를 매수(현금 프리미엄)':'▸ Gerstner scenario: SpaceX acquires Tesla (cash premium)'}</text>
  <text x="80" y="684" font-family="Arial,sans-serif" font-size="24" fill="#6B7280">${ko?'두 시나리오는 현재 동시에 거론 중 — 어느 쪽도 확정 아님':'Both scenarios circulating now — neither is confirmed'}</text>
  ${m1.svg}
  ${m2.svg}
  ${footer()}
</svg>`;
}

// ── Starlink 구독자 1360만 ────────────────────────────────────
function makeStarlink(ko){
  const heroNum  = ko ? '1,360만' : '13.6M';
  const heroSub  = ko ? 'Starlink 구독자 (2026년 10월 기준)' : 'Starlink Subscribers (as of Oct 2026)';
  const msg1lines = ko
    ? ['1년 전(2025년 10월): 720만 구독자',
       '1년 만에 +640만 → 89% 증가',
       '월 구독료 $120 기준 연환산 매출 약 $195억',
       'SpaceX $40B 부채 조달의 신용 근거로 작용']
    : ['1 year ago (Oct 2025): 7.2M subscribers',
       '+6.4M in 12 months → +89% YoY growth',
       'At $120/month: ~$19.5B annualized run rate',
       'Underpins SpaceX\'s investment-grade credit for $40B GPU debt'];
  const msg2lines = ko
    ? ['AI 사업이 매출 절반을 차지하는 중에도 구독 기반 반복 매출 확장.',
       'Starlink·발사·AI — 세 수익원이 동시 성장하는 구조입니다.',
       '다음 확인: Q4 2026 가입자 1,500만 돌파 여부']
    : ['AI business near 50% of revenue while subscription base also grows.',
       'Starlink + Launch + AI — three revenue streams growing simultaneously.',
       'Next milestone: 15M subscribers in Q4 2026?'];

  const bars=[
    {label:ko?'\'24 Q4':'\'24 Q4', val:4.6},{label:ko?'\'25 Q1':'\'25 Q1', val:5.5},
    {label:ko?'\'25 Q2':'\'25 Q2', val:6.3},{label:ko?'\'25 Q3':'\'25 Q3', val:7.2},
    {label:ko?'\'25 Q4':'\'25 Q4', val:8.8},{label:ko?'\'26 Q1':'\'26 Q1', val:10.4},
    {label:ko?'\'26 Q2':'\'26 Q2', val:11.9},{label:ko?'\'26 Q3':'\'26 Q3', val:13.6},
  ];
  const maxVal=13.6;
  const barW=96,barGap=18,barMaxH=200,barY0=780;
  const totalW=bars.length*(barW+barGap)-barGap;
  const startX=(1080-totalW)/2;
  const barsSvg=bars.map((b,i)=>{
    const x=startX+i*(barW+barGap);
    const h=Math.round(b.val/maxVal*barMaxH);
    const pct=(i+1)/bars.length;
    const r=Math.round(107+(147-107)*pct);
    const g=Math.round(33+(51-33)*pct);
    const bl=Math.round(234+(234-234)*pct);
    const col=i===bars.length-1?'#7C3AED':`rgba(${r},${g},${bl},0.8)`;
    return `<rect x="${x}" y="${barY0-h}" width="${barW}" height="${h}" rx="8" fill="${col}"/>
    <text x="${x+barW/2}" y="${barY0-h-12}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="19" font-weight="900" fill="${i===bars.length-1?'#C084FC':'#A855F7'}">${escXml(b.val+'M')}</text>
    <text x="${x+barW/2}" y="${barY0+26}" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" fill="#6B7280">${escXml(b.label)}</text>`;
  }).join('');

  const m1 = msgBox(808, ko?'📡 성장 데이터':'📡 Growth Data', msg1lines, '#9333EA', '#4C1D95');
  const m2 = msgBox(m1.nextY, ko?'🚀 SpaceX 수익 구조':'🚀 SpaceX Revenue Structure', msg2lines, '#7C3AED', '#3B0764');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base('#0A0520','#060312','#9333EA','#7C3AED')}
  ${badge(40,24,130,'SPCX','#4C1D95','#9333EA','#E9D5FF')}
  <text x="540" y="160" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="110" font-weight="900" fill="#C084FC" filter="url(#glow)">${escXml(heroNum)}</text>
  <text x="540" y="220" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" fill="#E9D5FF">${escXml(heroSub)}</text>
  ${statBox(40,258,240,156,ko?'전년 구독자':'1 Year Ago','7.2M',ko?'명':'subs',ko?'2025년 10월':'Oct 2025','#6B21A8')}
  ${statBox(306,258,240,156,ko?'YoY 증가':'YoY Growth','+89%','','',ko?'↑':'+6.4M subs','#9333EA')}
  ${statBox(572,258,240,156,ko?'월 구독료':'Monthly Fee','$120','USD',ko?'가정용 기준':'residential','#A855F7')}
  ${statBox(838,258,202,156,ko?'연환산 매출':'Annual Run','$195B','est',ko?'추산':'rough est.','#C084FC')}
  <text x="40" y="454" font-family="Arial,sans-serif" font-size="26" fill="#E9D5FF">${ko?'Starlink 구독자 성장 추이 (백만)':'Subscriber Growth (millions)'}</text>
  <line x1="40" y1="${barY0}" x2="1040" y2="${barY0}" stroke="#4C1D95" stroke-width="1.5"/>
  ${barsSvg}
  ${m1.svg}
  ${m2.svg}
  ${footer()}
</svg>`;
}

(async()=>{
  for(const ko of [true,false]){
    const sfx=ko?'':'-en';
    await save(`meta-fcf-negative-first-time-${DATE}${sfx}`, makeMetaFcf(ko));
    await save(`cybercab-texas-970-austin-f1-record-${DATE}${sfx}`, makeCybercabTexas(ko));
    await save(`spacex-neoclouds-dying-40b-gpu-13gw-${DATE}${sfx}`, makeNeoclouds(ko));
    await save(`gerstner-spacex-acquire-tsla-420-550-${DATE}${sfx}`, makeGerstner(ko));
    await save(`starlink-13-6m-subscribers-89pct-${DATE}${sfx}`, makeStarlink(ko));
  }
  console.log('All addl charts done.');
})();
