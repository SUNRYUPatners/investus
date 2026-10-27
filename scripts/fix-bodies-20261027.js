#!/usr/bin/env node
// Fix body structures for 2026-10-27 seeds
// Adds ■ 기관·하우스 뷰, removes ■ 투자 시사점, ensures 3 paras in ■ 무슨 일인가요
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const filePath = path.join(ROOT, 'lib/reports.ts');
let c = fs.readFileSync(filePath, 'utf8');

// Finds a seed's body field and replaces its content (between the quotes)
// newBodyText: plain JS string (with real \n chars). Will be JSON-encoded.
function replaceBody(seedId, newBodyText) {
  const seedMarker = `    id: "${seedId}",`;
  const seedIdx = c.indexOf(seedMarker);
  if (seedIdx === -1) throw new Error(`seed ${seedId} not found`);

  const bodyStart = c.indexOf('    body: "', seedIdx);
  if (bodyStart === -1) throw new Error(`body not found for ${seedId}`);

  const bodyContentStart = bodyStart + '    body: "'.length;
  // Body ends with `",\n    titleEn:` or `",\n    bodyEn:`
  let bodyEnd = c.indexOf('",\n    titleEn:', bodyContentStart);
  if (bodyEnd === -1) bodyEnd = c.indexOf('",\n    bodyEn:', bodyContentStart);
  if (bodyEnd === -1) throw new Error(`body end not found for ${seedId}`);

  const encoded = JSON.stringify(newBodyText).slice(1, -1); // strip outer quotes
  c = c.slice(0, bodyContentStart) + encoded + c.slice(bodyEnd);
  console.log(`✓ Fixed body for ${seedId}`);
}

// ── seed-2114: Anthropic S-1 ─────────────────────────────────────
// Issues: ■ 무슨 일인가요 only 1 para, no ■ 조금만 더 알려드리면, no ■ 기관·하우스 뷰
replaceBody('seed-2114', `■ 무슨 일인가요

Claude AI를 운영하는 Anthropic이 기업공개(IPO)를 위해 S-1 서류를 제출했습니다. 이 서류는 SEC(미국 증권거래위원회)에 공개되어 누구나 볼 수 있습니다. 그 안에 담긴 컴퓨팅 계약 내역이 AI 업계 역사상 전례 없는 규모임이 확인됐습니다.

가장 핵심은 SpaceXAI(SpaceX의 완전 소유 자회사, 구 xAI LLC)와의 $120.5B 계약입니다. Anthropic은 NVIDIA GPU로 구동되는 SpaceX 컴퓨팅 자원에 2029년까지 최대 $120.5B를 지출하기로 했으며, 전체 용량 배달 완료 후 월 약 $3.1B입니다. 이는 SEC 제출 법적 서류로 확인된 사실로, 루머가 아닙니다.

Amazon과는 $110.0B, 10년 비해약 계약을 맺었습니다. 2026년 5월부터 2036년 4월까지 최소 $110.0B를 Amazon에 지불하며, Amazon의 미이행 시에만 해지 가능합니다. AMD와는 $20B+의 Helios 랙 스케일 시스템 공급 계약을 체결했습니다. 세 계약 합산 $250B+는 단일 AI 기업이 공개한 컴퓨팅 공약 중 사상 최대입니다.

■ 조금만 더 알려드리면

Anthropic 재무 현황도 주목할 부분입니다. H1 2026 매출이 $16.3B으로 2025년 연간 $4.6B의 3.5배를 상반기 6개월에 달성했습니다. 연환산 ARR은 약 $32.6B이며 영업손실은 $693M으로 매출 대비 -4.3%, 거의 손익분기 수준입니다. 순손실 $80.7B은 전환사채·파생부채 공정가치 변동(-$72.4B) 때문으로, 비현금 회계 항목입니다.

SpaceXAI는 Elon Musk가 2023년 창립한 xAI LLC가 SpaceX에 합병되며 이름이 바뀐 것입니다. 따라서 이 계약은 Anthropic(Claude AI)이 SpaceX의 자회사 컴퓨팅 인프라를 임차하는 구도입니다. AI 업계에서 경쟁 관계에 있는 Claude(Anthropic)와 Grok(SpaceX xAI) 간의 복잡한 인프라 공유입니다. 비해약 기간은 2027년 1월, 3월까지이며 이후 90일 통보로 해지 가능하나, 이미 $120.5B 공약이 시작된 후에는 사실상 계약 유지 인센티브가 큽니다.

■ 기관·하우스 뷰

번스타인은 Anthropic S-1의 SpaceX $120.5B 계약 공개가 SPCX와 NVDA 투자 케이스를 공식 문서 수준으로 격상시켰다고 분석합니다. AI 컴퓨팅 수요 가시성이 최고 수준이며, Anthropic 외 다른 고객의 SpaceX 컴퓨팅 채택이 추가 확인되면 SpaceX 기업가치 재평가 폭이 커진다고 봅니다. SpaceX SPCX와 NVDA 모두 매수 의견을 유지합니다.

웨드부시 댄 아이브스는 NVIDIA의 SpaceX 단일 고객 lock-in이 Blackwell(GB300)에서 2027년 Rubin 아키텍처로 이어지는 수요 연속성을 보장한다고 봅니다. 월 $3.1B가 2029년까지 잠긴 계약은 NVDA 데이터센터 사업부 추정치를 대폭 상향해야 하는 근거라고 강조합니다. 두 집의 시각을 합산하지 않고 각각의 전제 위에서 봅니다.

investus.kr SRP 최고투자책임자 발행`);

// ── seed-2115: SpaceX NVDA Capex ─────────────────────────────────
// Issue: no ■ 기관·하우스 뷰, ■ 투자 시사점 banned
replaceBody('seed-2115', `■ 무슨 일인가요

SpaceX AI 컴퓨팅 인프라의 분기별 CAPEX(자본지출) 추이 분석이 공개됐습니다. 실적 데이터와 가이던스를 바탕으로 2026~2027년 SpaceX 컴퓨팅 투자 규모를 추정한 것으로, NVIDIA의 수혜 규모가 특히 주목됩니다.

분기별 총 컴퓨팅 CAPEX 추이:
- Q1'26 실적: $7.7B
- Q2'26 실적: $16B
- Q3'26 실적: $16B
- Q4'26 가이던스: $40B
- Q1'27 예상: $70B
- Q2'27 예상: $110B
- Q3'27 예상: $120B
- Q4'27 예상: $130B

각 분기에서 NVIDIA 몫(GPU 공급분):
- Q1'26: $13B
- Q2'26: $14B
- Q3'26: $14B
- Q4'26: $33B
- Q1'27: $60B
- Q2'27: $98B
- Q3'27: $107B
- Q4'27: $116B

■ 2027년 +10GW 증설 계획

SpaceX는 2027년 한 해에만 +10GW의 컴퓨팅 용량을 추가하는 계획을 세우고 있습니다. 분기당 2.0~2.9GW를 추가하는 페이스입니다.

GW(기가와트) 단위의 컴퓨팅이란 데이터센터 전력 소비 기준입니다. 10GW는 세계 최대 규모의 AI 컴퓨팅 클러스터를 뜻합니다. 현재 Microsoft, Google, Meta 각사의 연간 데이터센터 전력 소비가 수 GW 수준인데, SpaceX가 2027년 한 해에 더하려는 10GW는 기존 Big Tech 전체 설비에 맞먹는 엄청난 규모입니다.

■ MACROHARD 캠퍼스

이 컴퓨팅 인프라를 수용할 물리적 시설로 'MACROHARD'라는 이름의 대규모 캠퍼스 건설이 확인됐습니다. 항공 사진에서 건물 지붕에 'MACROHARD'라는 글자가 새겨진 거대한 시설이 포착됐습니다. MACROHARD는 Microsoft(Micro + Soft)에 대비한 Macro + Hard의 조어로, SpaceX 특유의 작명 센스를 보여줍니다. 렌더링 이미지에서는 MACROHARD와 MACROHARDER라고 쓰인 복수의 건물이 넓은 부지에 배치된 대형 컴퓨팅 캠퍼스 계획이 확인됩니다.

■ 조금만 더 알려드리면

Anthropic의 $120.5B 계약(별도 리포트 참조)이 이 CAPEX의 일부를 설명합니다. Anthropic 외에도 다른 AI 기업들이 SpaceX 컴퓨팅을 사용하거나 계약 중이라면, 실제 수요 파이프라인은 더 클 수 있습니다.

분기 CAPEX가 Q4'26 $40B에서 Q1'27 $70B으로 한 분기 만에 75% 증가하는 것은 매우 가파른 증가입니다. 이 가이던스는 SpaceX 내부 계획을 반영하므로 실현 가능성이 높은 것으로 봅니다. NVDA 89% 점유율은 Blackwell(GB300, GB200)과 2027년 Rubin 아키텍처가 이 수요를 순차적으로 충족하는 구조입니다.

■ 기관·하우스 뷰

모건스탠리 아담 조너스는 SpaceX에 오버웨이트와 목표 주가 $300을 제시합니다. 분기 CAPEX $130B(Q4'27) 예상은 AI 컴퓨팅 사업이 우주·Starlink와 함께 SpaceX의 세 번째 수익 축으로 확립되는 데이터입니다. $300은 우주·Starlink 중심 가정으로, AI 수익 본격화 시 재검토 대상이라고 밝혔습니다.

웨드부시 댄 아이브스는 NVDA의 SpaceX 분기 $116B 단독 수주가 데이터센터 매출 추정치를 대폭 상향해야 하는 근거라고 봅니다. SpaceX 단일 고객만으로도 NVDA 연간 GPU 매출의 상당 부분이 설명되는 구조이며, Blackwell에서 Rubin으로 이어지는 수요 연속성이 NVDA 장기 투자 케이스의 핵심이라고 강조합니다. 두 집의 시각을 합산하지 않고 각각의 전제 위에서 봅니다.

investus.kr SRP 최고투자책임자 발행`);

// ── seed-2116: Tesla FSD Turo ─────────────────────────────────────
// Issues: ■ 무슨 일인가요 2 paras (needs 3), no ■ 기관·하우스 뷰, ■ 투자 시사점 banned
replaceBody('seed-2116', `■ 무슨 일인가요

Tesla FSD(Full Self-Driving, 완전자율주행)가 Turo 렌탈카 플랫폼을 통해 10월 28일부터 정식 서비스를 시작합니다. Turo는 개인이 자신의 차량을 다른 사람에게 빌려주는 P2P(개인 간) 차량 공유 플랫폼입니다. 미국 최대 규모의 P2P 렌탈카 서비스로, 수십만 대의 차량이 등록돼 있습니다.

Turo CEO Andre Haddad가 이번 서비스 출시를 공식 확인했습니다. 핵심 내용은 세 가지입니다. 첫째, Turo 플랫폼에서 FSD가 활성화된 Tesla를 검색하고 예약할 수 있게 됩니다. 둘째, 이미 수천 대(thousands)의 FSD 활성화 Tesla가 Turo에 등록돼 있습니다. 셋째, 렌탈 차량 오너는 FSD 요금을 통해 추가 수익을 창출할 수 있습니다.

서비스 개방 이전부터 수천 대가 등록된 것은 실제 수요가 존재한다는 신호입니다. 오너 입장에서 주차장에 세워두는 대신 FSD 기능으로 추가 수익을 올릴 수 있으니 동기가 충분합니다. 렌탈 이용자는 일반 Tesla가 아닌 FSD 활성화 Tesla를 경험할 기회를 얻습니다.

■ 무엇이 달라지나요

이번 Turo 출시는 Tesla FSD 생태계에서 몇 가지 중요한 변화를 의미합니다.

첫째, FSD 수익화 채널이 확장됩니다. 기존에 FSD는 Tesla 차량 구매자가 월 구독(월 $99~199)이나 일회성 구매($8,000~12,000)로 이용하는 방식이었습니다. Turo를 통해 개인 차량 소유자가 FSD 기능을 렌탈 서비스화할 수 있게 됩니다. FSD 오너가 없는 날 차를 Turo에 올리면, 렌탈 이용자가 자율주행 경험을 하고 오너는 추가 수입을 얻는 구조입니다.

둘째, Tesla의 FSD 사용 데이터가 대폭 증가합니다. Turo에서 렌탈된 Tesla FSD 차량들은 다양한 운전자가 다양한 환경에서 운행하게 됩니다. 이 데이터는 Tesla의 FSD AI 모델 학습에 활용돼 성능 향상에 기여합니다.

셋째, Waymo와의 경쟁 구도에서 차별화됩니다. Waymo는 자체 보유 차량만으로 로보택시 서비스를 운영합니다. Tesla는 개인 소유 차량도 네트워크에 포함시키는 방식으로, 차량 수를 빠르게 확장할 수 있는 구조입니다.

■ 조금만 더 알려드리면

현재 Turo에 이미 수천 대의 FSD 활성화 Tesla가 등록돼 있다는 점이 중요합니다. 서비스 출시 이전부터 이미 오너들이 준비를 마쳤다는 것으로, 실제 수요가 존재한다는 신호입니다.

렌탈 이용자 입장에서도 일반 Tesla가 아닌 FSD 활성화 Tesla를 경험할 기회가 생깁니다. FSD를 직접 경험한 이용자가 향후 Tesla 구매 또는 FSD 구독으로 전환할 가능성이 높아집니다. 이는 FSD 마케팅 채널 역할도 합니다.

단, 이번 서비스는 오너가 FSD 기능을 제공하는 형태입니다. 완전 무인 자율주행 렌탈(운전자 없이 차가 스스로 찾아오는 방식)은 아닙니다. Tesla Cybercab 로보택시 서비스와는 구분됩니다. Cybercab이 Turo 네트워크에 합류하는 날이 진짜 게임체인저입니다.

■ 기관·하우스 뷰

웨드부시 댄 아이브스는 Tesla FSD의 Turo 출시를 FSD 수익화 채널 다각화의 첫 번째 P2P 사례로 봅니다. 소규모지만 FSD가 개인-렌탈 생태계에 침투하는 방향성이 Cybercab 로보택시 확장 논리와 일치한다고 강조합니다. 목표 주가 $600을 유지하며, Turo 파트너십 확대와 Cybercab 플랫폼 합류 시점을 FSD 수익화 가속 지표로 모니터링한다고 밝혔습니다.

아크인베스트는 Tesla FSD의 P2P 채널 진입이 Robotaxi 사업의 네트워크 효과를 키우는 구조라고 분석합니다. 개인 소유 차량이 공유 플랫폼으로 연결될수록 Tesla FSD 총 주행 데이터가 급증해 경쟁사와의 기술 격차가 벌어진다는 입장입니다. 두 시각을 합산하지 않고 각각의 전제 위에서 봅니다.

investus.kr SRP 최고투자책임자 발행`);

// ── seed-2117: Tesla revenue per second ──────────────────────────
// Issues: no ■ 조금만 더 알려드리면, no ■ 기관·하우스 뷰, ■ 무슨 일인가요 2 paras, ■ 투자 시사점 banned
replaceBody('seed-2117', `■ 무슨 일인가요

Tesla의 TTM(지난 12개월 실적) Q3 2026 기준 초당 매출을 분석한 데이터가 주목받고 있습니다. 초당 매출이란 연간 총매출을 일년의 초(秒) 수인 31,536,000으로 나눈 값입니다. Tesla의 성장 속도를 직관적으로 느낄 수 있는 지표입니다.

연도별 초당 매출 추이:
- 2011년: $6.38/초 (TTM Q3 기준, 연환산 약 $201M)
- 2016년: $188.01/초 (연환산 약 $5.93B)
- 2021년: $1,485.61/초 (연환산 약 $46.8B)
- 2026년: $3,284.18/초 (연환산 약 $103.6B)

5년 단위 성장 배수를 보면 흥미로운 패턴이 있습니다. 2011→2016: 29.5배, 2016→2021: 7.9배, 2021→2026: 2.2배로 배수 자체는 빠르게 둔화하고 있습니다. 이는 기저 효과로, 2011년 $200M 기반에서의 성장이 2021년 이후 $47B 기반에서의 성장보다 배수로 크게 나타나는 것은 당연합니다.

■ 조금만 더 알려드리면

초당 $3,284 = 분당 $197,051 = 시간당 $11.82M = 하루 $283.8M = 연간 $103.6B입니다. 즉 Tesla는 2026년 기준으로 매일 약 2,837억 원(한화 기준)의 매출을 올리고 있습니다.

절대 증가액을 보면 반대 양상입니다. 2011→2016: +$5.73B, 2016→2021: +$40.87B, 2021→2026: +$56.8B로 오히려 매 5년 커지고 있습니다. 성장 배수 둔화와 절대 증가액 확대가 동시에 일어나는 것이 성숙기 대형 성장주의 특징입니다.

이 성장은 Tesla의 사업 구조 다각화를 반영합니다. 2021년까지는 자동차 매출이 거의 전부였지만, 2026년에는 에너지 저장(Megapack), Autopilot/FSD 소프트웨어, 서비스 부문이 성장에 기여하고 있습니다. FSD 구독 수익이 본격화되면 초당 매출의 마진 구조도 개선됩니다.

■ 기관·하우스 뷰

웨드부시 댄 아이브스는 현재 $103.6B 연매출 기반에서 FSD 구독·Cybercab 로보택시·Optimus 로봇 레이어가 추가되면 2030년대 초 성장 배수가 다시 높아질 수 있다고 봅니다. 세 사업의 합산 연매출 $30~50B 추가가 현실화된다면 초당 매출 $5,000+(연환산 $158B)도 달성 가능한 구도라며 목표 주가 $600을 유지합니다.

모건스탠리 아담 조너스는 $415 기본 시나리오에서 현 매출 성장 배수 2.2배를 성숙 기업 수준으로 봅니다. FSD 수익화 속도가 성장 배수 회복의 관건이며, 기본 시나리오($415)는 FSD가 점진 수익화되는 경우, 상방 시나리오($610)는 Robotaxi 대규모 수익화 성공 케이스라고 구분합니다. 두 목표가를 합산하지 않습니다.

investus.kr SRP 최고투자책임자 발행`);

// ── seed-2118: Microsoft 60k buyouts ─────────────────────────────
// Issues: ■ 무슨 일인가요 2 paras (needs 3), no ■ 기관·하우스 뷰, ■ 투자 시사점 banned
replaceBody('seed-2118', `■ 무슨 일인가요

Microsoft가 전체 직원 약 22만명 중 6만명에게 희망퇴직(buyout) 패키지를 제시하고 있습니다. 대상은 미국·캐나다·인도·영국의 부사장(VP)급 이하 직원으로, 데이터센터·판매·마케팅 부서에 집중됩니다. 회사는 이번 구조조정의 공식 이유를 '인공지능 시대를 위한 인력 재편(retool its workforce for the artificial intelligence era)'이라고 명시했습니다.

6만명은 전체 직원의 27%에 해당하는 대규모 구조조정입니다. 이는 Big Tech 역사상 가장 대규모 AI 전환 인력 조정 중 하나입니다. 자발적 희망퇴직(voluntary buyout)이라 강제 해고와는 다르지만, 수락하지 않을 경우 향후 조직 변화의 압박을 받을 수 있습니다.

대상 부서인 데이터센터 운영, 영업, 마케팅은 AI 도구(Copilot, Azure OpenAI Service 등)로 업무 상당 부분이 자동화될 수 있는 직군입니다. Microsoft는 2025년에도 AI 재편을 이유로 약 10,000명을 감원한 바 있어, 이번 6만명 희망퇴직은 중기 전략으로 이어지는 연속적 조치입니다.

■ 조금만 더 알려드리면

Microsoft는 2024~2025년에도 수천 명 규모의 인력 조정을 단행했지만, 이번 6만명 희망퇴직은 차원이 다른 규모입니다. 회사의 AI 전략과 직접 연결된 구조조정이라는 점이 핵심입니다.

Big Tech의 AI 전환 구조조정은 Microsoft에 앞서 Google과 Meta에서도 진행됐습니다. Google은 일부 직군에서 AI 효율화를 이유로 채용 동결과 인력 감축을 실시했고, Meta는 AI 연구·개발 집중을 위해 비핵심 사업부 인력을 조정했습니다. Microsoft가 최초로 "AI 대체"를 공개 성명에 명시했다는 점이 업계 흐름에서 구분됩니다.

비용 구조 측면에서 6만명 감원은 연간 수십억 달러 수준의 인건비 절감을 의미합니다. 평균 연봉 $150,000를 기준으로 단순 계산하면 연간 $90억 달러(약 12.4조원) 절감 효과입니다. 실제로는 퇴직금·이행 비용이 단기에 발생하고 절감 효과는 수년에 걸쳐 실현됩니다.

■ 기관·하우스 뷰

웨드부시 댄 아이브스는 Microsoft의 6만명 희망퇴직이 AI Copilot과 Azure OpenAI 매출 성장이 인건비 절감으로 이어지는 '이중 AI 혜택' 구조라고 분석합니다. AI로 매출을 만들고 AI로 비용을 줄이는 구조가 확립되면 영업이익률이 2027년부터 뚜렷하게 개선될 것으로 보며, 목표 주가 $600을 제시합니다.

JP모건은 이번 구조조정이 Microsoft의 AI 전환 속도를 반영하며 중기 마진 개선 스토리를 지지한다고 봅니다. 단기적으로 퇴직금 비용이 EPS를 압박하지만, 2027년 이후 순편익이 가시화되는 구도입니다. 두 집의 시각을 합산하지 않고 각각의 가정 위에서 봅니다.

investus.kr SRP 최고투자책임자 발행`);

// ── seed-2119: NeoCloud Debt/Equity ──────────────────────────────
// Issues: no ■ 기관·하우스 뷰, ■ 투자 시사점 banned
replaceBody('seed-2119', `■ 무슨 일인가요

AI 인프라 클라우드 기업(NeoCloud) 7개사의 총부채비율(Total Debt/Equity Ratio) 비교가 주목받고 있습니다. 부채비율은 기업이 자본 대비 얼마나 많은 부채를 보유하는지를 나타내며, 높을수록 공격적인 레버리지 전략을 구사 중임을 의미합니다.

7개사 부채비율 현황:
- WYFI: 0.95배 (저부채·안전)
- NBIS: 0.97배 (저부채·안전)
- IREN: 1.87배 (중간)
- DOCN(DigitalOcean): 2.13배 (고부채)
- ORCL(Oracle): 2.32배 (고부채)
- HUT: 4.58배 (매우 고부채)
- CRWV(CoreWeave): 10.27배 (초고레버리지)

CoreWeave는 자본의 10배를 넘는 부채를 안고 공격적으로 AI GPU 클라우드 인프라를 구축하고 있습니다. 반면 WYFI와 NBIS는 1배 이하의 안정적 재무구조를 유지합니다.

■ 조금만 더 알려드리면

NeoCloud란 Amazon Web Services(AWS), Microsoft Azure, Google Cloud 등 전통 하이퍼스케일러와 달리 AI 전용 GPU 컴퓨팅 인프라에 집중한 신생 클라우드 기업들을 통칭합니다. 2023년 NVIDIA GPU 수요 폭증과 함께 부상했으며, CoreWeave·Lambda·Crusoe 등이 대표적입니다.

CoreWeave(CRWV)가 10.27배 부채비율을 감수하는 이유는 AI 컴퓨팅 수요가 공급을 압도하는 현재 사이클에서 최대한 빠르게 용량을 확보하려는 전략입니다. 실제로 CoreWeave는 Microsoft, OpenAI 등 대형 AI 기업과 장기 공급 계약을 체결하며 공격적 성장을 이어가고 있습니다.

그러나 Elon Musk가 '200개 이상의 NeoCloud가 붕괴할 것'이라고 경고한 바 있습니다. SpaceX가 자체 AI 컴퓨팅 인프라를 구축하며 Anthropic($120.5B) 등 대형 고객을 흡수하는 구도에서, 규모가 작은 NeoCloud는 고객 확보와 자금 조달 모두에서 압박을 받게 됩니다. 높은 부채비율은 계약 이행 실패 시 부채 상환 압력이 극도로 커지는 리스크를 수반합니다.

■ 기관·하우스 뷰

JP모건은 NeoCloud 섹터에서 고레버리지 기업(CRWV 등)에 선별적 접근을 권고합니다. CoreWeave의 10.27배 부채비율은 장기 계약이 뒷받침될 때만 정당화되며, 계약 현황 공시와 수주 파이프라인을 지속 모니터링해야 한다고 봅니다. WYFI·NBIS 같은 저레버리지 NeoCloud는 SpaceX 독식 시나리오에서도 상대적으로 안전하다고 평가합니다.

번스타인은 SpaceX AI 컴퓨팅 독식 속도가 빨라질수록 중소 NeoCloud의 고객 확보 경쟁이 격화된다고 분석합니다. CoreWeave 등 초고레버리지 플레이어는 고리스크-고리턴 구조로, 투자 기간 내 SpaceX 독식이 전면화되면 구조적 위기가 올 수 있다고 경고합니다. 두 집의 시각을 합산하지 않고 각각의 전제 위에서 봅니다.

investus.kr SRP 최고투자책임자 발행`);

fs.writeFileSync(filePath, c);
console.log('\n✓ fix-bodies-20261027 complete — all 6 seed bodies updated');
