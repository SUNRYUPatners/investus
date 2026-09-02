#!/usr/bin/env node
/** 2026-09-03 wallPosts · wallPosts-markets · analystPosts-markets */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

const T03SEP = 1788390000000; // 2026.09.03 08:00 KST
const T03 = T03SEP;

function patchWallPosts() {
  let c = read('lib/wallPosts.ts');
  if (c.includes('T03SEP')) {
    console.log('wallPosts: T03SEP already present');
    return;
  }
  c = c.replace(
    'const T02SEP = 1788303600000; // 2026.09.02 08:00 KST',
    'const T03SEP = 1788390000000; // 2026.09.03 08:00 KST\nconst T02SEP = 1788303600000; // 2026.09.02 08:00 KST',
  );
  c = c.replace('export const LATEST_UPDATE = T02SEP;', 'export const LATEST_UPDATE = T03SEP;');
  const posts = `  // ── 2026-09-03 신규 ────────────────
  { id: 1195, symbol: "MACRO", nickname: "익명_4872", holdingLabel: "관심종목",
    content: "9/3 한장: 사이버캡 5:45PM·중국 86,166·우버 10%·NVDA 물리AI·구글 TPU·F14·10년 4.80%·연금 112%",
    createdAt: T03SEP + 8*60_000, likes: 10, comments: 1 },
  { id: 1196, symbol: "TSLA", nickname: "익명_4889", holdingLabel: "관심종목",
    content: "오늘 오스틴 5:45 PM ET 사이버캡 행사입니다. V15 무인 시승·플릿 대량 투입 기대가 최대인 날이에요",
    createdAt: T03SEP + 16*60_000, likes: 11, comments: 2 },
  { id: 1197, symbol: "TSLA", nickname: "익명_4906", holdingLabel: "관심종목",
    content: "중국 8월 도매 86,166대(+3.57%)·소매 27,249·수출 58,917. 미국 행사랑 축이 완전히 다르네요",
    createdAt: T03SEP + 24*60_000, likes: 12, comments: 1 },
  { id: 1198, symbol: "UBER", nickname: "익명_4923", holdingLabel: "관심종목",
    content: "우버 10% 감원·로bo 100억$+ 투자 보도가 사이버캡 행사랑 같은 날이에요. 플랫폼 vs OEM fleet",
    createdAt: T03SEP + 32*60_000, likes: 13, comments: 2 },
  { id: 1199, symbol: "NVDA", nickname: "익명_4940", holdingLabel: "관심종목",
    content: "물리 AI가 디지털 AI보다 10배·로봇 10년 1,000억$·제조업 미국 복귀. 사이버캡이 소비자 facing 예시",
    createdAt: T03SEP + 40*60_000, likes: 14, comments: 1 },
  { id: 1200, symbol: "GOOGL", nickname: "익명_4957", holdingLabel: "관심종목",
    content: "TPU 2027년 840억·2028년 1,080억$ 전망 상향(기존 620/790억). AI 가속기 수요 재평가",
    createdAt: T03SEP + 48*60_000, likes: 15, comments: 2 },
  { id: 1201, symbol: "SPCX", nickname: "익명_4974", holdingLabel: "관심종목",
    content: "F14 V3 20~60기 operational·HLS hatch mockup·Mechazilla 사진. 9/15 발사 cadence 같이 봐야죠",
    createdAt: T03SEP + 56*60_000, likes: 10, comments: 1 },
  { id: 1202, symbol: "SPCX", nickname: "익명_4991", holdingLabel: "관심종목",
    content: "2027년 AI 전력 15GW 부족·1.2GW 발전·구글·앤스로픽 임대. 전력이 칩만큼 관문",
    createdAt: T03SEP + 64*60_000, likes: 11, comments: 2 },
  { id: 1203, symbol: "TSLA", nickname: "익명_5008", holdingLabel: "관심종목",
    content: "기가 텍사스: 사이버캡 시험·생산·칩 fab 기초·Cortex 2 Megapacks·옵티머스 N Campus 철골",
    createdAt: T03SEP + 72*60_000, likes: 12, comments: 1 },
  { id: 1204, symbol: "TSLA", nickname: "익명_5025", holdingLabel: "관심종목",
    content: "FSD 프랑스 화상회의·도로 2대 시험·EU 승인 수주 내. 미국 사이버캡이랑 규제 트랙 분리",
    createdAt: T03SEP + 80*60_000, likes: 13, comments: 2 },
  { id: 1205, symbol: "MACRO", nickname: "익명_5042", holdingLabel: "관심종목",
    content: "10년물 4.80%·30년 ~5.30%·신용 리스크 불안. FOMC 9/15 전 할인율 변수",
    createdAt: T03SEP + 88*60_000, likes: 14, comments: 1 },
  { id: 1206, symbol: "MACRO", nickname: "익명_5059", holdingLabel: "관심종목",
    content: "연금 충당률 112%·2001년 이후 최고·98백분위. de-risking flow 변수",
    createdAt: T03SEP + 96*60_000, likes: 15, comments: 2 },
  { id: 1207, symbol: "AAPL", nickname: "익명_5076", holdingLabel: "관심종목",
    content: "캐시 우드, 고점에서 애플 AI disruption 리스크 경고. Siri·Services AI 일정이 관건",
    createdAt: T03SEP + 104*60_000, likes: 10, comments: 1 },
  { id: 1208, symbol: "TSLA", nickname: "익명_5093", holdingLabel: "관심종목",
    content: "배터리 블로그: 2,850억 mi 자발적 화재 0·4680·8년 70% 보증. 로bo fleet 안전 논거",
    createdAt: T03SEP + 112*60_000, likes: 11, comments: 2 },
  { id: 1209, symbol: "TSLA", nickname: "익명_5110", holdingLabel: "관심종목",
    content: "ARK 사이버캡 TAM 30~60× vs 우버 탄력성. 오늘 행사가 모델 가정 검증일",
    createdAt: T03SEP + 120*60_000, likes: 12, comments: 1 },
`;
  const comments = `  // ── 2026-09-03 신규 댓글 ────────────────
  1195: [
    { id: 1, nickname: "익명_6195", holdingLabel: "관심종목", content: "9/3 한장에 사이버캡·중국·우버·금리까지 정리 감사합니다", createdAt: T03SEP + 8*60_000 + 3*60_000, likes: 4 },
  ],
  1196: [
    { id: 1, nickname: "익명_6196", holdingLabel: "관심종목", content: "5:45 PM ET 행사 후 무인 영상 나오면 바로 확인할게요", createdAt: T03SEP + 16*60_000 + 3*60_000, likes: 4 },
    { id: 2, nickname: "익명_6296", holdingLabel: "관심종목", content: "플릿 flooding이 말인지 숫자인지 구분해서 봐야겠네요", createdAt: T03SEP + 16*60_000 + 6*60_000, likes: 5 },
  ],
  1197: [
    { id: 1, nickname: "익명_6197", holdingLabel: "관심종목", content: "수출 58,917이 크네요. 내수랑 분리 추적해야죠", createdAt: T03SEP + 24*60_000 + 3*60_000, likes: 4 },
  ],
  1198: [
    { id: 1, nickname: "익명_6198", holdingLabel: "관심종목", content: "감원+로bo capex가 같은 날이면 비용 구조 재편 신호 같아요", createdAt: T03SEP + 32*60_000 + 3*60_000, likes: 4 },
    { id: 2, nickname: "익명_6298", holdingLabel: "관심종목", content: "사이버캡 행사랑 겹친 타이밍이 포인트네요", createdAt: T03SEP + 32*60_000 + 6*60_000, likes: 5 },
  ],
  1199: [
    { id: 1, nickname: "익명_6199", holdingLabel: "관심종목", content: "물리 AI 10배는 로bo·공장·자율주행 전부 해당이겠네요", createdAt: T03SEP + 40*60_000 + 3*60_000, likes: 4 },
  ],
  1200: [
    { id: 1, nickname: "익명_6200", holdingLabel: "관심종목", content: "TPU 전망 상향 폭이 꽤 크네요", createdAt: T03SEP + 48*60_000 + 3*60_000, likes: 4 },
    { id: 2, nickname: "익명_6300", holdingLabel: "관심종목", content: "GPU vs TPU capex 같이 추적하겠습니다", createdAt: T03SEP + 48*60_000 + 6*60_000, likes: 5 },
  ],
  1201: [
    { id: 1, nickname: "익명_6201", holdingLabel: "관심종목", content: "V3 20~60기 operational이 핵심 숫자죠", createdAt: T03SEP + 56*60_000 + 3*60_000, likes: 4 },
  ],
  1202: [
    { id: 1, nickname: "익명_6202", holdingLabel: "관심종목", content: "15GW gap이면 전력 capex가 칩만큼 중요하겠네요", createdAt: T03SEP + 64*60_000 + 3*60_000, likes: 4 },
    { id: 2, nickname: "익명_6302", holdingLabel: "관심종목", content: "1.2GW 발전소 일정도 같이 봐야겠어요", createdAt: T03SEP + 64*60_000 + 6*60_000, likes: 5 },
  ],
  1203: [
    { id: 1, nickname: "익명_6203", holdingLabel: "관심종목", content: "칩 fab 기초 공사랑 사이버캡 생산이 같은 캠퍼스네요", createdAt: T03SEP + 72*60_000 + 3*60_000, likes: 4 },
  ],
  1204: [
    { id: 1, nickname: "익명_6204", holdingLabel: "관심종목", content: "EU 승인 수주 내는지 행사 후 확인할게요", createdAt: T03SEP + 80*60_000 + 3*60_000, likes: 4 },
    { id: 2, nickname: "익명_6304", holdingLabel: "관심종목", content: "프랑스 2대 시험이 무인인지 감독인지가 관건", createdAt: T03SEP + 80*60_000 + 6*60_000, likes: 5 },
  ],
  1205: [
    { id: 1, nickname: "익명_6205", holdingLabel: "관심종목", content: "4.80%면 성장주 할인율 부담 커지는 구간이죠", createdAt: T03SEP + 88*60_000 + 3*60_000, likes: 4 },
  ],
  1206: [
    { id: 1, nickname: "익명_6206", holdingLabel: "관심종목", content: "112% 충당률이면 de-risking flow 변수 맞네요", createdAt: T03SEP + 96*60_000 + 3*60_000, likes: 4 },
    { id: 2, nickname: "익명_6306", holdingLabel: "관심종목", content: "2001년 이후 최고라는 게 인상적이에요", createdAt: T03SEP + 96*60_000 + 6*60_000, likes: 5 },
  ],
  1207: [
    { id: 1, nickname: "익명_6207", holdingLabel: "관심종목", content: "고점에서 disruption 경고는 심리적으로 무겁네요", createdAt: T03SEP + 104*60_000 + 3*60_000, likes: 4 },
  ],
  1208: [
    { id: 1, nickname: "익명_6208", holdingLabel: "관심종목", content: "2,850억 mi 0건은 로bo fleet 안전 논거로 쓰이겠네요", createdAt: T03SEP + 112*60_000 + 3*60_000, likes: 4 },
    { id: 2, nickname: "익명_6308", holdingLabel: "관심종목", content: "4680·8년 70% 보증도 fleet 운영에 중요하죠", createdAt: T03SEP + 112*60_000 + 6*60_000, likes: 5 },
  ],
  1209: [
    { id: 1, nickname: "익명_6209", holdingLabel: "관심종목", content: "30~60× TAM은 오늘 행사 숫자로 검증해야겠네요", createdAt: T03SEP + 120*60_000 + 3*60_000, likes: 4 },
  ],
`;
  const postMarker = '  // ── 2026-09-02 신규 ────────────────';
  const commentMarker = '  // ── 2026-09-02 신규 댓글 ────────────────';
  const pi = c.indexOf(postMarker);
  if (pi === -1) throw new Error('wallPosts post marker not found');
  c = c.slice(0, pi) + posts + c.slice(pi);
  const ci = c.indexOf(commentMarker);
  if (ci === -1) throw new Error('wallPosts comment marker not found');
  c = c.slice(0, ci) + comments + c.slice(ci);
  write('lib/wallPosts.ts', c);
  console.log('wallPosts: T03SEP, posts 1195-1209, comments');
}

function patchWallPostsMarkets() {
  let c = read('lib/wallPosts-markets.ts');
  if (c.includes('id: 9054, symbol: "코스피"')) {
    console.log('wallPosts-markets: 9/3 batch already present');
    return;
  }
  if (!c.includes('const T03 =')) {
    c = c.replace(
      'const T02 = 1788303600000; // 2026-09-02 08:00 KST',
      'const T03 = 1788390000000; // 2026-09-03 08:00 KST\nconst T02 = 1788303600000; // 2026-09-02 08:00 KST',
    );
  }
  const krPosts = `  { id: 9054, symbol: "코스피", nickname: "칠천피존버", holdingLabel: "인덱스 보유", content: "6562.72 -3.99% 급락. WTI $91+·10년 4.8%·외국인 1.9~2.4조 매도가 겹친 shock 날이에요", createdAt: T03 - 0, likes: 40, comments: 2, },
  { id: 9055, symbol: "삼성전자", nickname: "반도체장기", holdingLabel: "삼성전자 보유", content: "250,500원 -4.02%. 유가·금리 shock에 반도체가 같이 빠졌어요. 수급보다 매크로가 먼저인 날", createdAt: T03 - 1800000, likes: 32, comments: 2, },
  { id: 9056, symbol: "SK하이닉스", nickname: "HBM러버", holdingLabel: "하이닉스 보유", content: "161.3만원 -4.73%. 성장주 베타에 외국인 대량 매도가 겹쳤습니다", createdAt: T03 - 3600000, likes: 30, comments: 2, },
  { id: 9057, symbol: "LG에너지솔루션", nickname: "배터리존버", holdingLabel: "LG엔솔 관심", content: "-5.31%로 2차전지가 크게 약세. 유가·금리·성장주 약세가 한꺼번에", createdAt: T03 - 5400000, likes: 28, comments: 2, },
  { id: 9058, symbol: "현대차", nickname: "자동차매니아", holdingLabel: "현대차 관심", content: "-5.62%. WTI $91+ shock에 완성차도 약세. 오늘 밤 사이버캡 행사는 별도 변수", createdAt: T03 - 7200000, likes: 27, comments: 2, },
  { id: 9059, symbol: "코스피", nickname: "외국인추적", holdingLabel: "관망", content: "외국인 1.9~2.4조·기관 2.43조 매도 vs 개인 2.3조 매수. shock 다음 날 수급이 더 중요해요", createdAt: T03 - 9000000, likes: 26, comments: 2, },
`;
  const krComments = `  9054: [
    { id: 1, nickname: "수급쟁이", holdingLabel: "관심종목", content: "-3.99%면 shock 맞습니다. 내일 외국인 이어지는지 봐야죠", createdAt: T03 + 600_000, likes: 5 },
    { id: 2, nickname: "유가체크", holdingLabel: "관심종목", content: "WTI $91+가 코스피에 바로 전달됐네요", createdAt: T03 + 1200_000, likes: 4 },
  ],
  9055: [
    { id: 1, nickname: "메모리사이클", holdingLabel: "관심종목", content: "매크로 shock 때는 HBM 테마도 잠깐 뒤로 밀리죠", createdAt: T03 - 1200_000, likes: 5 },
    { id: 2, nickname: "수출통계러", holdingLabel: "관심종목", content: "250,500원 마감 기록해두겠습니다", createdAt: T03 - 900_000, likes: 4 },
  ],
  9056: [
    { id: 1, nickname: "HBM러버", holdingLabel: "관심종목", content: "-4.73%는 베타가 크게 작용한 날", createdAt: T03 - 3000_000, likes: 5 },
    { id: 2, nickname: "이익률체크", holdingLabel: "관심종목", content: "shock 구간에선 분기 실적보다 수급 먼저", createdAt: T03 - 2400_000, likes: 4 },
  ],
  9057: [
    { id: 1, nickname: "배터리존버", holdingLabel: "관심종목", content: "-5.31%는 2차전지 베타가 선명한 날", createdAt: T03 - 4800_000, likes: 5 },
    { id: 2, nickname: "가동률체크", holdingLabel: "관심종목", content: "유가 shock에 LGES도 같이 빠졌네요", createdAt: T03 - 4200_000, likes: 4 },
  ],
  9058: [
    { id: 1, nickname: "자동차매니아", holdingLabel: "관심종목", content: "완성차는 유가·금리 민감도가 높죠", createdAt: T03 - 6600_000, likes: 5 },
    { id: 2, nickname: "미국판매러", holdingLabel: "관심종목", content: "오늘 밤 사이버캡은 별도 트랙", createdAt: T03 - 6000_000, likes: 4 },
  ],
  9059: [
    { id: 1, nickname: "수급파트", holdingLabel: "관심종목", content: "개인 2.3조 매수 vs 외국인·기관 매도 패턴이네요", createdAt: T03 - 8400_000, likes: 4 },
    { id: 2, nickname: "환율데스크", holdingLabel: "관심종목", content: "10년 4.8%·유가·환율 한 표에 적어둘게요", createdAt: T03 - 7800_000, likes: 3 },
  ],
`;
  const safePosts = `  { id: 9146, symbol: "매크로", nickname: "채권덕후", holdingLabel: "관망", content: "WTI $91+·10년 4.80%·코스피 -3.99%. 유가·금리 shock가 공통 변수예요", createdAt: T03 - 0, likes: 30, comments: 2, },
  { id: 9147, symbol: "비트코인", nickname: "온체인러", holdingLabel: "BTC 보유", content: "~106,000달러, 리스크오프 조정. 직전 10.8만$ 대비 소폭 약세 구간", createdAt: T03 - 1800000, likes: 29, comments: 2, },
  { id: 9148, symbol: "금", nickname: "금벌레", holdingLabel: "금 ETF", content: "~3,600달러, 유가·지정학 헤지. 실질금리·DXY 같이 봐야 해요", createdAt: T03 - 3600000, likes: 28, comments: 2, },
  { id: 9149, symbol: "WTI", nickname: "유가러", holdingLabel: "관심", content: "WTI $91+·중동 shock·인플레·금리. 코스피 -3.99%와 같은 날", createdAt: T03 - 5400000, likes: 27, comments: 2, },
  { id: 9150, symbol: "달러인덱스", nickname: "환율보는사람", holdingLabel: "관심", content: "DXY·원·달러·EM 변수. 유가 shock 때 달러 반응은 케이스별", createdAt: T03 - 7200000, likes: 26, comments: 2, },
  { id: 9151, symbol: "은", nickname: "실물러", holdingLabel: "관심", content: "금·은비·산업 수요. 금 ~3600과 PMI·유가 연동", createdAt: T03 - 9000000, likes: 25, comments: 2, },
`;
  const safeComments = `  9146: [
    { id: 1, nickname: "헷지", holdingLabel: "관심종목", content: "유가·금리·코스피 세 줄 같이 기록하겠습니다", createdAt: T03 - 3000_000, likes: 5 },
    { id: 2, nickname: "실질금리", holdingLabel: "관심종목", content: "shock 구간에선 안전자산도 같이 재가격", createdAt: T03 - 2400_000, likes: 4 },
  ],
  9147: [
    { id: 1, nickname: "ETF추적", holdingLabel: "관심종목", content: "10.6만$대와 ETF 순유입 같이 봐야죠", createdAt: T03 - 4800_000, likes: 5 },
    { id: 2, nickname: "헷지", holdingLabel: "관심종목", content: "리스크오프면 청산 변수도", createdAt: T03 - 4200_000, likes: 4 },
  ],
  9148: [
    { id: 1, nickname: "실질금리", holdingLabel: "관심종목", content: "3600달러대면 지정학 헤지 수요 섞인 듯", createdAt: T03 - 6600_000, likes: 5 },
    { id: 2, nickname: "달러보기", holdingLabel: "관심종목", content: "DXY·금 같이 추적", createdAt: T03 - 6000_000, likes: 4 },
  ],
  9149: [
    { id: 1, nickname: "유가러", holdingLabel: "관심종목", content: "$91+면 인플레·금리 변수 같이", createdAt: T03 - 8400_000, likes: 4 },
    { id: 2, nickname: "매크로", holdingLabel: "관심종목", content: "코스피 shock와 같은 날 맞네요", createdAt: T03 - 7800_000, likes: 3 },
  ],
  9150: [
    { id: 1, nickname: "환율데스크", holdingLabel: "관심종목", content: "유가 shock 때 DXY 반응은 케이스별이죠", createdAt: T03 - 10200_000, likes: 5 },
    { id: 2, nickname: "EM체크", holdingLabel: "관심종목", content: "원·달러·EM 같이 기록", createdAt: T03 - 9600_000, likes: 4 },
  ],
  9151: [
    { id: 1, nickname: "실물러", holdingLabel: "관심종목", content: "금 강세 때 은 추격·PMI 둔화면 약세 패턴", createdAt: T03 - 12000_000, likes: 4 },
    { id: 2, nickname: "비율체크", holdingLabel: "관심종목", content: "Au/Ag ratio 추적", createdAt: T03 - 11400_000, likes: 3 },
  ],
`;
  const rePosts = `  { id: 9249, symbol: "정책", nickname: "정책워처", holdingLabel: "관심", content: "공급·LTV·DSR·전세대출 규제 유지. 유가·금리 shock가 주담대 심리 변수", createdAt: T03 - 0, likes: 28, comments: 2, },
  { id: 9250, symbol: "전세", nickname: "전세러", holdingLabel: "관심", content: "전세 관망·입주 물량·FOMC 9/15 전후. shock 구간에선 거래량 먼저", createdAt: T03 - 1200000, likes: 27, comments: 2, },
  { id: 9251, symbol: "매매", nickname: "실수요자", holdingLabel: "관심", content: "WTI $91+·10년 4.8%·wealth effect. 매매 관망 지속", createdAt: T03 - 2400000, likes: 26, comments: 2, },
  { id: 9252, symbol: "서울", nickname: "서울러", holdingLabel: "관심", content: "매크로 shock·정책 규제·전세·매매 관망. 지역별 온도차 분리", createdAt: T03 - 3600000, likes: 25, comments: 2, },
`;
  const reComments = `  9249: [
    { id: 1, nickname: "정책워처", holdingLabel: "관심", content: "공급 수사 vs LTV·DSR 실행 분리", createdAt: T03 + 600_000, likes: 4 },
    { id: 2, nickname: "전세대출", holdingLabel: "관심", content: "유가 shock가 주담대 심리에도", createdAt: T03 + 1200_000, likes: 3 },
  ],
  9250: [
    { id: 1, nickname: "전세러", holdingLabel: "관심", content: "입주 물량·FOMC 전후 점검", createdAt: T03 - 600_000, likes: 4 },
    { id: 2, nickname: "대출상담", holdingLabel: "관심", content: "전세대출 규제가 수요 제한", createdAt: T03 - 300_000, likes: 3 },
  ],
  9251: [
    { id: 1, nickname: "실수요", holdingLabel: "관심", content: "wealth effect에 shock 겹치면 관망", createdAt: T03 - 1800_000, likes: 4 },
    { id: 2, nickname: "세제확인", holdingLabel: "관심", content: "10년 4.8%면 주담대 부담", createdAt: T03 - 1200_000, likes: 3 },
  ],
  9252: [
    { id: 1, nickname: "서울러", holdingLabel: "관심", content: "서울·경기·지방 분리 기록", createdAt: T03 - 3000_000, likes: 4 },
    { id: 2, nickname: "실수요", holdingLabel: "관심", content: "shock 구간에선 거래량 선행", createdAt: T03 - 2400_000, likes: 3 },
  ],
`;
  c = c.replace('export const MOCK_POSTS_KR: Post[] = [\n', `export const MOCK_POSTS_KR: Post[] = [\n${krPosts}`);
  c = c.replace('export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n', `export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n${krComments}`);
  c = c.replace('export const MOCK_POSTS_SAFE: Post[] = [\n', `export const MOCK_POSTS_SAFE: Post[] = [\n${safePosts}`);
  c = c.replace('export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n', `export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n${safeComments}`);
  c = c.replace('export const MOCK_POSTS_KR_RE: Post[] = [\n', `export const MOCK_POSTS_KR_RE: Post[] = [\n${rePosts}`);
  c = c.replace('export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n', `export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n${reComments}`);
  write('lib/wallPosts-markets.ts', c);
  console.log('wallPosts-markets: KR/Safe/KR-RE 9/3 posts');
}

function patchAnalystMarkets() {
  let c = read('lib/analystPosts-markets.ts');
  if (c.includes('2026-09-03T06:00:00.000Z')) {
    console.log('analystPosts-markets: 9/3 already present');
    return;
  }
  const krPosts = `  { id: -2035, alias: "여의도 너구리 #11", symbol: "코스피", content: "9월 3일 코스피 6,562.72(-3.99%)로 WTI $91+·10년물 4.80%·중동 유가 shock에 급락했습니다. 외국인 순매도 약 1.92~2.44조 원, 기관 약 2.43조 원, 개인 순매수 약 2.3조 원입니다. shock 다음 날 수급·유가·금리를 먼저 추적하시기 바랍니다.", likes: 28, comments: 2, created_at: "2026-09-03T06:00:00.000Z", liked: false, },
  { id: -2036, alias: "판교 치타 #22", symbol: "삼성전자", content: "삼성전자 -4.02% 250,500원. 유가·금리 shock에 반도체 대형주가 동반 약세였습니다. shock 구간에서는 분기 실적보다 수급·매크로를 먼저 보시기 바랍니다.", likes: 27, comments: 2, created_at: "2026-09-03T06:08:00.000Z", liked: false, },
  { id: -2037, alias: "삼성동 여우 #08", symbol: "SK하이닉스", content: "SK하이닉스 -4.73% 1,613,000원. 성장주 베타와 외국인 대량 매도가 겹친 날입니다.", likes: 26, comments: 2, created_at: "2026-09-03T06:16:00.000Z", liked: false, },
  { id: -2038, alias: "성수 수달 #35", symbol: "LG에너지솔루션", content: "LG에너지솔루션 -5.31%로 2차전지가 크게 약세. 유가·금리·성장주 약세가 겹쳤습니다.", likes: 25, comments: 2, created_at: "2026-09-03T06:24:00.000Z", liked: false, },
  { id: -2039, alias: "한남 두루미 #17", symbol: "현대차", content: "현대차 -5.62%. WTI $91+ shock에 완성차 업종이 약세. 오늘 밤 미국 사이버캡 행사는 별도 글로벌 변수입니다.", likes: 24, comments: 2, created_at: "2026-09-03T06:32:00.000Z", liked: false, },
  { id: -2040, alias: "잠실 백로 #29", symbol: "코스피", content: "코스피 6,562.72(-3.99%)·외국인 1.9~2.4조·기관 2.43조 매도 vs 개인 2.3조 매수. shock 구간에서는 다음 거래일 외국인 흐름이 더 중요합니다.", likes: 23, comments: 2, created_at: "2026-09-03T06:40:00.000Z", liked: false, },
`;
  const krComments = `  [-2035]: [
    { alias: "수급파트", content: "-3.99% shock 맞습니다. 내일 외국인 이어지는지 봐야죠", created_at: "2026-09-03T06:24:00.000Z" },
    { alias: "유가체크", content: "WTI $91+·10년 4.8% 같이 기록하겠습니다", created_at: "2026-09-03T06:36:00.000Z" },
  ],
  [-2036]: [
    { alias: "메모리사이클", content: "shock 때 HBM 테마도 잠깐 뒤로 밀리죠", created_at: "2026-09-03T06:32:00.000Z" },
    { alias: "수출통계러", content: "250,500원 마감 기록", created_at: "2026-09-03T06:44:00.000Z" },
  ],
  [-2037]: [
    { alias: "HBM러버", content: "-4.73%는 베타가 크게 작용", created_at: "2026-09-03T06:40:00.000Z" },
    { alias: "이익률체크", content: "shock 구간에선 수급 먼저", created_at: "2026-09-03T06:52:00.000Z" },
  ],
  [-2038]: [
    { alias: "배터리존버", content: "-5.31%는 2차전지 베타 선명", created_at: "2026-09-03T06:48:00.000Z" },
    { alias: "가동률체크", content: "유가 shock에 LGES도 약세", created_at: "2026-09-03T07:00:00.000Z" },
  ],
  [-2039]: [
    { alias: "자동차매니아", content: "완성차는 유가·금리 민감", created_at: "2026-09-03T06:56:00.000Z" },
    { alias: "미국판매러", content: "오늘 밤 사이버캡은 별도 트랙", created_at: "2026-09-03T07:08:00.000Z" },
  ],
  [-2040]: [
    { alias: "수급파트", content: "개인 2.3조 vs 외국인·기관 매도", created_at: "2026-09-03T07:04:00.000Z" },
    { alias: "환율데스크", content: "10년 4.8%·유가·환율 한 표", created_at: "2026-09-03T07:16:00.000Z" },
  ],
`;
  const safePosts = `  { id: -2041, alias: "온체인 매 #03", symbol: "매크로", content: "9월 3일 안전자산 한장 요약입니다. WTI $91+·10년물 4.80%·코스피 -3.99% shock. 금 ~3,550~3,650달러, BTC ~105,000~107,000달러, DXY·은·WTI를 분리 추적하시기 바랍니다.", likes: 24, comments: 2, created_at: "2026-09-03T09:00:00.000Z", liked: false, },
  { id: -2042, alias: "금벌레 #17", symbol: "비트코인", content: "비트코인 ~105,000~107,000달러. 리스크오프 조정 구간으로 ETF 유입·청산·금리 변수를 함께 보시기 바랍니다.", likes: 23, comments: 2, created_at: "2026-09-03T09:08:00.000Z", liked: false, },
  { id: -2043, alias: "금벌레 #17", symbol: "금", content: "금 ~3,550~3,650달러. 유가·지정학 헤지와 실질금리·DXY 연동입니다.", likes: 22, comments: 2, created_at: "2026-09-03T09:16:00.000Z", liked: false, },
  { id: -2044, alias: "유가러 #44", symbol: "WTI", content: "WTI $91+·중동 shock·인플레·금리. 코스피 -3.99%와 같은 매크로 shock 날입니다.", likes: 21, comments: 2, created_at: "2026-09-03T09:24:00.000Z", liked: false, },
  { id: -2045, alias: "매크로올빼미 #31", symbol: "달러인덱스", content: "달러인덱스(DXY)·원·달러·EM 변수. 유가 shock 때 달러 반응은 케이스별입니다.", likes: 20, comments: 2, created_at: "2026-09-03T09:32:00.000Z", liked: false, },
  { id: -2046, alias: "실물러 #12", symbol: "은", content: "은·금은비·산업 수요. 금 ~3600과 PMI·유가 연동을 분리 추적하시기 바랍니다.", likes: 19, comments: 2, created_at: "2026-09-03T09:40:00.000Z", liked: false, },
`;
  const safeComments = `  [-2041]: [
    { alias: "헷지", content: "유가·금리·코스피·BTC·금 다섯 줄 기록", created_at: "2026-09-03T09:24:00.000Z" },
    { alias: "실질금리", content: "shock 구간에선 안전자산도 재가격", created_at: "2026-09-03T09:36:00.000Z" },
  ],
  [-2042]: [
    { alias: "ETF추적", content: "10.6만$대와 ETF 순유입", created_at: "2026-09-03T09:32:00.000Z" },
    { alias: "헷지", content: "리스크오프면 청산 변수", created_at: "2026-09-03T09:44:00.000Z" },
  ],
  [-2043]: [
    { alias: "실질금리", content: "3600달러대 지정학 헤지", created_at: "2026-09-03T09:40:00.000Z" },
    { alias: "달러보기", content: "DXY·금 같이 추적", created_at: "2026-09-03T09:52:00.000Z" },
  ],
  [-2044]: [
    { alias: "유가러", content: "$91+면 인플레·금리 변수", created_at: "2026-09-03T09:48:00.000Z" },
    { alias: "매크로", content: "코스피 shock와 같은 날", created_at: "2026-09-03T10:00:00.000Z" },
  ],
  [-2045]: [
    { alias: "환율데스크", content: "유가 shock 때 DXY 케이스별", created_at: "2026-09-03T09:56:00.000Z" },
    { alias: "EM체크", content: "원·달러·EM 기록", created_at: "2026-09-03T10:08:00.000Z" },
  ],
  [-2046]: [
    { alias: "실물러", content: "금 강세·PMI 둔화 패턴", created_at: "2026-09-03T10:04:00.000Z" },
    { alias: "비율체크", content: "Au/Ag ratio 추적", created_at: "2026-09-03T10:16:00.000Z" },
  ],
`;
  const rePosts = `  { id: -2047, alias: "실수요 #05", symbol: "정책", content: "9월 3일 부동산 한장 요약입니다. 공급·LTV·DSR·전세대출 규제 유지. WTI $91+·10년 4.80%·코스피 -3.99% shock가 주담대·실수요 심리 변수입니다.", likes: 22, comments: 2, created_at: "2026-09-03T10:00:00.000Z", liked: false, },
  { id: -2048, alias: "전세러 #09", symbol: "전세", content: "전세 시장 관망·입주 물량·FOMC 9/15 전후. shock 구간에선 거래량이 가격보다 먼저 움직입니다.", likes: 21, comments: 2, created_at: "2026-09-03T10:08:00.000Z", liked: false, },
  { id: -2049, alias: "실수요 #05", symbol: "매매", content: "매매 시장 관망·주담대·wealth effect. WTI·10년물 shock가 실수요 심리를 누릅니다.", likes: 20, comments: 2, created_at: "2026-09-03T10:16:00.000Z", liked: false, },
  { id: -2050, alias: "정책워처 #01", symbol: "정책", content: "공급 확대 수사 vs LTV·DSR 실행. 매크로 shock·9/15 FOMC가 정책 리스크 구간입니다.", likes: 19, comments: 2, created_at: "2026-09-03T10:24:00.000Z", liked: false, },
`;
  const reComments = `  [-2047]: [
    { alias: "정책워처", content: "유가 shock가 주담대 심리에도", created_at: "2026-09-03T10:24:00.000Z" },
    { alias: "전세대출", content: "LTV·DSR·입주 일정", created_at: "2026-09-03T10:36:00.000Z" },
  ],
  [-2048]: [
    { alias: "전세러", content: "입주 물량·FOMC 전후", created_at: "2026-09-03T10:32:00.000Z" },
    { alias: "대출상담", content: "전세대출 규제가 수요 제한", created_at: "2026-09-03T10:44:00.000Z" },
  ],
  [-2049]: [
    { alias: "실수요", content: "wealth effect에 shock 겹치면 관망", created_at: "2026-09-03T10:40:00.000Z" },
    { alias: "세제확인", content: "10년 4.8%면 주담대 부담", created_at: "2026-09-03T10:52:00.000Z" },
  ],
  [-2050]: [
    { alias: "정책워처", content: "공급 수사 vs LTV·DSR 실행", created_at: "2026-09-03T10:48:00.000Z" },
    { alias: "전세러", content: "FOMC 9/15가 정책 리스크", created_at: "2026-09-03T11:00:00.000Z" },
  ],
`;
  c = c.replace('export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n', `export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n${krPosts}`);
  c = c.replace('export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n', `export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n${krComments}`);
  c = c.replace('export const MOCK_ANALYST_POSTS_SAFE: AnalystMockPost[] = [\n', `export const MOCK_ANALYST_POSTS_SAFE: AnalystMockPost[] = [\n${safePosts}`);
  c = c.replace('export const MOCK_ANALYST_COMMENTS_SAFE: Record<number, AnalystMockComment[]> = {\n', `export const MOCK_ANALYST_COMMENTS_SAFE: Record<number, AnalystMockComment[]> = {\n${safeComments}`);
  c = c.replace('export const MOCK_ANALYST_POSTS_KR_RE: AnalystMockPost[] = [\n', `export const MOCK_ANALYST_POSTS_KR_RE: AnalystMockPost[] = [\n${rePosts}`);
  c = c.replace('export const MOCK_ANALYST_COMMENTS_KR_RE: Record<number, AnalystMockComment[]> = {\n', `export const MOCK_ANALYST_COMMENTS_KR_RE: Record<number, AnalystMockComment[]> = {\n${reComments}`);
  write('lib/analystPosts-markets.ts', c);
  console.log('analystPosts-markets: KR/Safe/KR-RE 9/3 analyst posts');
}

patchWallPosts();
patchWallPostsMarkets();
patchAnalystMarkets();
console.log('done');
