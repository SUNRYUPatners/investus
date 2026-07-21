# 포트원(PortOne V2) 정기결제 셋업 가이드

## 1. 포트원 콘솔에서 준비

**콘솔 접속**: https://admin.portone.io/

### 1-1. 상점 ID 확인
콘솔 상단 좌측 상점 선택 → **상점 정보** 탭 → `상점 ID` 복사
(예: `store-abcd1234-...`)

### 1-2. 결제 연동 채널 생성
- 왼쪽 메뉴 → **결제 연동** → **채널 관리** → **채널 추가**
- **PG사 선택**: 처음이라면 **KG이니시스**(가장 무난) 또는 **토스페이먼츠** 추천
- **결제 방식**: `카드`, `일반결제` + `빌링결제(정기결제)` 모두 체크
- **테스트 모드로 먼저 생성** → 채널키 복사
- 실 운영시 라이브 채널을 별도로 만들어 채널키 교체

### 1-3. API Secret
- 왼쪽 메뉴 → **개발자 콘솔** → **API 시크릿 관리**
- **V2 API 시크릿** 발급 → 복사 (한 번만 노출됨, 안전한 곳에 보관)

### 1-4. 웹훅 설정
- 왼쪽 메뉴 → **결제 연동** → **웹훅 관리** → **웹훅 추가**
- **URL**: `https://www.investus.kr/api/portone/webhook`
- **이벤트 선택**: `Transaction.*` + `BillingKey.*` 전부 체크
- **시크릿** 자동 생성 → 복사

## 2. Vercel 환경변수 등록

Vercel 대시보드 → **Settings** → **Environment Variables** → 다음 4개 추가:

| 변수명 | 값 | 노출 범위 |
|---|---|---|
| `NEXT_PUBLIC_PORTONE_STORE_ID` | `store-xxxxxxxx-...` | Production, Preview |
| `NEXT_PUBLIC_PORTONE_CHANNEL_KEY` | `channel-key-xxxxxxxx-...` | Production, Preview |
| `PORTONE_API_SECRET` | (1-3의 값) | Production, Preview |
| `PORTONE_WEBHOOK_SECRET` | (1-4의 값) | Production, Preview |
| `CRON_SECRET` | 32자 이상 랜덤 문자열 | Production |

- 앞 2개는 클라이언트에도 노출되어야 하므로 `NEXT_PUBLIC_` prefix.
- 뒤 2개는 서버 전용.
- 저장 후 반드시 **재배포**해야 반영됨.

## 3. Supabase 스키마 실행

`supabase/migrations/20260717_portone_subscriptions.sql` 파일 전체 복사 →
Supabase 대시보드 → **SQL Editor** → 새 쿼리 → 붙여넣고 **Run**.

생성되는 테이블:
- `portone_subscriptions` — 정기결제 구독 (billingKey 저장)
- `portone_payments` — 모든 결제 이벤트 로그

## 4. 테스트

### 4-1. 로컬 테스트 (선택)
```bash
cp .env.example .env.local
# .env.local 에 위 4개 값 채우기
npm run dev
```
`http://localhost:3000/subscribe` → **카드로 매달 자동결제** 클릭 →
포트원 테스트 카드 입력 (예: 4092-0230-1234-5678, 12/28, 000, 890101)

### 4-2. 프로덕션 테스트
1. 환경변수 등록 후 재배포
2. `www.investus.kr/subscribe` → 카드 등록
3. 포트원 콘솔 → **결제 내역**에서 실제 결제 확인
4. Supabase → `portone_subscriptions` 테이블에 row 생성 확인
5. Supabase → `auth.users` → 해당 유저 metadata에 `investus_pro: true` 확인

## 5. 연결된 결제 흐름

### `/subscribe` — Investus Pro
- **월간** ₩5,900 / **연간** ₩63,720 (10% 할인)
- 결제수단: 카드 · 카카오페이 · 네이버페이 · 토스페이 (빌링키 자동 연장)
- 계좌이체 없음

### `/buy` — 전자책 (19,900원 일시불)
- 카드결제(포트원)만 지원

### `/creator/[id]` — 크리에이터 구독
- 크리에이터가 설정한 월 구독료로 카드 정기결제

## 6. 재과금 크론
- `vercel.json` → `/api/cron/subscription-recharge` 매일 KST 03:00 실행
- `next_billing_at` 이 오늘 이전인 active 구독을 자동 청구
- 실패 시 `status = 'past_due'` 로 마킹

## 7. 구독 해지 (사용자)
API: `POST /api/portone/cancel-subscription`
```json
{ "subscriptionId": "sub_uuid", "immediate": false }
```
- `immediate: true` → Pro 즉시 해제
- `immediate: false` → 만료일까지 유지, 재과금만 중단

*(해지 UI는 마이페이지 등에 별도 붙여야 함 — Phase 2)*

## 8. 트러블슈팅

**"채널키가 유효하지 않습니다"** → 콘솔에서 채널이 활성 상태인지 확인, 실 운영 채널로 스위치했는지 확인.

**"결제 설정이 아직 준비되지 않았습니다" (UI)** → `NEXT_PUBLIC_PORTONE_*` 환경변수가 배포되지 않음. Vercel 재배포 필요.

**웹훅 401 unauthorized** → `PORTONE_WEBHOOK_SECRET` 이 콘솔의 시크릿과 정확히 일치하는지 확인.

**정기결제(빌링키) 심사** → PG사마다 별도 심사가 필요할 수 있음. KG이니시스는 대개 사업자등록만 있으면 자동 승인, 토스페이먼츠는 심사 있음.
