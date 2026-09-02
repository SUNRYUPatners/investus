/* KR / Safe / KR-RE topics for 2026-09-03 */
module.exports = function registerTopics(add) {

add('summary-kr', 'ROWS', 'KOSPI', {
  headline: '2026.09.03 한국장 한장 요약',
  rows: [
    { color:'#ef4444', fill:'#1a0a0a', right:'-3.99%', title:'코스피가 6,562.72로 3.99% 급락했습니다', sub:'유가·금리 충격·외국인·기관 대량 매도가 겹친 날입니다.' },
    { color:'#22d3ee', fill:'#06171c', right:'~2.4조', title:'외국인 순매도 약 1.92~2.44조 원, 기관 약 2.43조 원', sub:'개인 순매수 약 2.3조 원과 엇갈린 수급입니다.' },
    { color:'#60a5fa', fill:'#0a1420', right:'-4%', title:'삼성 -4.02%·하이닉스 -4.73%·LGES -5.31%·현대 -5.62%', sub:'반도체·완성차·2차전지 동반 약세입니다.' },
    { color:'#f59e0b', fill:'#1a1205', right:'$91+', title:'WTI $91+·미 10년물 4.80%·중동 유가 충격', sub:'글로벌 리스크오프가 한국장에 전달됐습니다.' },
    { color:'#4ade80', fill:'#061209', right:'9/3', title:'미국 사이버캡 행사·9/4 고용·9/15 FOMC', sub:'글로벌 테크·매크로 일정이 겹칩니다.' },
  ],
  caption: '더 볼 것: KOSPI 6562.72 -3.99% · 외국인 1.9~2.4조 · Samsung -4.02% · WTI $91+ · 10yr 4.8%',
}, {
  headline: '2026.09.03 Korea Market Snapshot',
  rows: [
    { color:'#ef4444', fill:'#1a0a0a', right:'-3.99%', title:'KOSPI fell 3.99% to 6,562.72 on macro 충격', sub:'Oil, rates, and heavy foreign/institution selling.' },
    { color:'#22d3ee', fill:'#06171c', right:'~2.4T', title:'Foreigners net sold ~1.92-2.44T won; institutions ~2.43T', sub:'Individuals net bought ~2.3T won.' },
    { color:'#60a5fa', fill:'#0a1420', right:'Chips', title:'Samsung -4.02%, SK Hynix -4.73%, LGES -5.31%, Hyundai -5.62%', sub:'Semis, batteries, and autos weak together.' },
    { color:'#f59e0b', fill:'#1a1205', right:'$91+', title:'WTI $91+ and US 10yr 4.80% on 중동·유가 충격', sub:'Global risk-off hit Korea.' },
    { color:'#4ade80', fill:'#061209', right:'9/3', title:'US Cybercab event, Sept 4 jobs, Sept 15 FOMC', sub:'Cross-asset calendar cluster.' },
  ],
  caption: 'Watch: KOSPI 6562.72 -3.99% · 외국인 1.9~2.4조 · Samsung -4.02% · WTI $91+ · 10yr 4.8%',
});

function krDetail(slug, badge, titleKo, hero, sub, footer) {
  add(slug, 'L1', 'SEC', {
    badge, title: titleKo,
    heroIcon: '📉', heroBig: hero,
    heroSub: sub,
    cards: [
      { icon:'📉', big: hero, mid:'등락', sub:'유가·금리·수급 충격' },
      { icon:'🛢️', big:'$91+', mid:'WTI', sub:'중동·유가 변수' },
      { icon:'📊', big:'4.80%', mid:'10년물', sub:'할인율·금리' },
    ],
    quote: '유가·금리 충격 구간에서는 분기 실적보다 수급·매크로를 먼저 추적하시기 바랍니다. 코스피 -3.99%와 외국인 대량 매도가 같은 날이면 다음 날 수급이 더 중요합니다.',
    noteSub: '급락 다음 날 외국인 순매도가 이어지는지 확인하시기 바랍니다. WTI·10년물·환율을 한 표에 두시고, 9/3 Cybercab·9/15 FOMC 일정을 같이 적으시면 됩니다. 충격 구간에서는 레버리지를 보수적으로 두시기 바랍니다.',
    footer,
  }, {
    badge, title: titleKo,
    heroIcon: '📉', heroBig: hero,
    heroSub: sub,
    cards: [
      { icon:'📉', big: hero, mid:'Move', sub:'Oil/rates/flows 충격' },
      { icon:'🛢️', big:'$91+', mid:'WTI', sub:'중동·유가' },
      { icon:'📊', big:'4.80%', mid:'10yr', sub:'할인율' },
    ],
    quote: 'In oil/rates shocks, track flows and macro before quarterly prints. After a -3.99% KOSPI day, next-day foreign flows matter most.',
    noteSub: 'Watch if foreign selling continues. Log WTI, 10yr, and FX together. Size down leverage into Sept 15 FOMC and the Sept 3 Cybercab headline day.',
    footer,
  });
}

krDetail('samsung-oil-kr', '삼성전자', '삼성전자가 -4.02% 250,500원으로 유가·금리 충격에 약세였습니다', '-4.02%', '250,500원·외국인 대량 매도·WTI $91+·10년 4.8%.', '삼성전자 · -4.02%');
krDetail('skhynix-oil-kr', 'SK하이닉스', 'SK하이닉스가 -4.73% 1,613,000원으로 급락했습니다', '-4.73%', '1,613,000원·성장주 베타·외국인 매도.', 'SK하이닉스 · -4.73%');
krDetail('lges-oil-kr', 'LG에너지솔루션', 'LG에너지솔루션이 -5.31%로 2차전지가 크게 약세였습니다', '-5.31%', '유가·금리·성장주 약세·2차전지 베타.', 'LGES · -5.31%');
krDetail('hyundai-oil-kr', '현대차', '현대차가 -5.62%로 완성차 업종이 유가 충격에 약세였습니다', '-5.62%', 'WTI $91+·원가·금리·수출주 심리.', '현대차 · -5.62%');
krDetail('kospi-flow-kr', '코스피', '코스피 6,562.72(-3.99%)·외국인·기관 대량 매도', '-3.99%', '6,562.72·외국인 1.9~2.4조·기관 2.43조·개인 +2.3조.', '코스피 · 수급');

add('summary-safe', 'ROWS', 'MACRO', {
  headline: '2026.09.03 안전자산 한장 요약',
  rows: [
    { color:'#f59e0b', fill:'#1a1205', right:'$91+', title:'WTI $91+·10년물 4.80%·코스피 -3.99%', sub:'유가·금리 충격가 공통 변수입니다.' },
    { color:'#facc15', fill:'#1a1600', right:'~3600', title:'금 ~3,550~3,650달러·지정학 헤지', sub:'실질금리·DXY와 연동됩니다.' },
    { color:'#f7931a', fill:'#1a0f00', right:'약10.6만$', title:'비트코인 10.5~10.7만 달러·리스크오프 조정', sub:'ETF 유입·청산·금리 변수.' },
    { color:'#94a3b8', fill:'#0f1419', right:'DXY', title:'달러인덱스·은·WTI 개별 추적', sub:'자산별 메모를 분리하시기 바랍니다.' },
  ],
  caption: 'WTI $91+ · 10yr 4.8% · 금 3550~3650$ · 비트코인 10.5~10.7만$ · KOSPI -3.99%',
}, {
  headline: '2026.09.03 Safe-haven Snapshot',
  rows: [
    { color:'#f59e0b', fill:'#1a1205', right:'$91+', title:'WTI $91+, 10yr 4.80%, KOSPI -3.99%', sub:'Oil/rates 충격 is the common driver.' },
    { color:'#facc15', fill:'#1a1600', right:'~3600', title:'Gold ~3550-3650 on geopolitics', sub:'Real yields and DXY matter.' },
    { color:'#f7931a', fill:'#1a0f00', right:'약10.6만$', title:'비트코인 10.5~10.7만$ risk-off dip', sub:'ETF flows and liquidations matter.' },
    { color:'#94a3b8', fill:'#0f1419', right:'DXY', title:'달러·은·유가 개별 추적', sub:'리스크온·오프 메모 분리.' },
  ],
  caption: 'WTI $91+ · 10yr 4.8% · 금 3550~3650$ · 비트코인 10.5~10.7만$',
});

krDetail('btc-safe', '비트코인', '비트코인 10.5~10.7만 달러·리스크오프 조정', '약10.6만$', '직전 10.8만$ 대비·ETF·금리·청산.', '비트코인 · safe');
krDetail('gold-safe', '금', '금 ~3,550~3,650달러·유가·지정학', '~3600', '실질금리·DXY·중동 충격.', '금 · safe');
krDetail('wti-oil-safe', 'WTI', 'WTI $91+·인플레·금리·코스피 충격', '$91+', '중동·공급·성장주 약세.', 'WTI · safe');
krDetail('dxy-safe', '달러', '달러인덱스·유가·금리 연동', '달러', '원·달러·신흥국·비트코인 변수.', '달러 · safe');
krDetail('silver-safe', '은', '은·금은비·산업 수요', '금은비', '금 연동+PMI·유가.', '은 · safe');

add('summary-krre', 'ROWS', 'POLICY', {
  headline: '2026.09.03 부동산 한장 요약',
  rows: [
    { color:'#a78bfa', fill:'#120b1f', right:'정책', title:'공급·LTV·DSR·전세대출 규제 유지', sub:'정책은 수요를 직접 제한합니다.' },
    { color:'#f59e0b', fill:'#1a1205', right:'$91+', title:'WTI $91+·10년 4.8%·코스피 -3.99%', sub:'주담대·실수요 심리 변수.' },
    { color:'#fb923c', fill:'#1a0d02', right:'전세', title:'전세·매매 관망·협상력 변화', sub:'9/15 FOMC 전후 점검.' },
  ],
  caption: 'Policy/supply · oil/rates 충격 · jeonse/sale watch · FOMC 9/15',
}, {
  headline: '2026.09.03 Korea RE Snapshot',
  rows: [
    { color:'#a78bfa', fill:'#120b1f', right:'Policy', title:'Supply rhetoric, LTV/DSR, jeonse loan rules', sub:'Policy caps demand directly.' },
    { color:'#f59e0b', fill:'#1a1205', right:'$91+', title:'WTI $91+, 10yr 4.8%, KOSPI -3.99%', sub:'Mortgage sentiment variable.' },
    { color:'#fb923c', fill:'#1a0d02', right:'Jeonse', title:'Jeonse/sale caution into FOMC', sub:'Check post-FOMC mood.' },
  ],
  caption: 'Policy · macro 충격 · jeonse/sale · FOMC',
});

krDetail('jeonse-krre', '전세', '전세 시장·금리 충격·전세대출', '관망', 'LTV·DSR·입주 물량·FOMC.', '전세 · kr-re');
krDetail('sale-krre', '매매', '매매 시장·주담대·실수요 관망', '관망', 'WTI·10년물·wealth effect.', '매매 · kr-re');
krDetail('policy-krre', '정책', '공급·대출 규제·매크로 충격', '규제', '공급 수사 vs LTV·DSR 실행.', '정책 · kr-re');

};
