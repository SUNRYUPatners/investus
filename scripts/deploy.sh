#!/bin/bash
# investus 배포 + 오류 체크 + 리포트 알림 루틴
# 사용법: bash scripts/deploy.sh [--notify] [--notify-title "제목"] [--notify-msg "내용"]
# --notify 플래그 있을 때만 리포트 알림 발송

set -e
cd "$(dirname "$0")/.."

# 인수 파싱
SEND_NOTIFY=false
NOTIFY_TITLE="📋 Investus 리포트 업데이트"
NOTIFY_MSG="새로운 투자 인사이트가 발행됐습니다. 지금 확인하세요."
while [[ $# -gt 0 ]]; do
  case $1 in
    --notify)         SEND_NOTIFY=true ;;
    --notify-title)   NOTIFY_TITLE="$2"; shift ;;
    --notify-msg)     NOTIFY_MSG="$2"; shift ;;
  esac
  shift
done

# .env.local 에서 NOTIFY_SECRET 로드
if [ -f .env.local ]; then
  export $(grep -E "^NOTIFY_SECRET=" .env.local | xargs) 2>/dev/null || true
fi

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

step() { echo -e "\n${YELLOW}[$1/4]${NC} $2"; }
ok()   { echo -e "${GREEN}✓${NC} $1"; }
fail() { echo -e "${RED}✗ $1${NC}"; exit 1; }

# ── 0-A. 미커밋 변경사항 차단 ────────────────────────────────────────────────
if ! git diff --quiet || ! git diff --cached --quiet; then
  fail "미커밋 변경사항이 있습니다. 먼저 git add + git commit 후 배포하세요."
fi
ok "워킹트리 clean"

# ── 0. SW 캐시 키 갱신 (배포마다 새 타임스탬프 → 모든 브라우저 SW 업데이트 강제) ─
NEW_TS=$(node -e "process.stdout.write(String(Date.now()))")
sed -i '' "s/investus-v[0-9]*/investus-v${NEW_TS}/" public/sw.js
ok "SW 캐시 키 갱신: investus-v${NEW_TS}"

# ── 1. TypeScript 타입 체크 ───────────────────────────────────────────────────
step 1 "TypeScript 타입 체크..."
TSC_OUT=$(npx tsc --noEmit 2>&1 || true)
# .next/types는 Next.js 자동 생성 파일 — 실제 코드 오류가 아님
# "error TS" 포함 줄만 추출 후 .next/ 경로 제외
REAL_ERRORS=$(echo "$TSC_OUT" | grep "error TS" | grep -v "\.next/" || true)
if [ -z "$REAL_ERRORS" ]; then
  ok "타입 오류 없음"
else
  echo "$REAL_ERRORS"
  fail "TypeScript 오류 발견 — 배포 중단"
fi

# ── 2. Next.js 빌드 ───────────────────────────────────────────────────────────
step 2 "Next.js 빌드..."
if npm run build 2>&1; then
  ok "빌드 성공"
else
  fail "빌드 실패 — 배포 중단"
fi

# ── 3. Vercel 프로덕션 배포 ───────────────────────────────────────────────────
step 3 "Vercel 프로덕션 배포..."
DEPLOY_OUTPUT=$(npx vercel deploy --prod 2>&1)
echo "$DEPLOY_OUTPUT"

DEPLOY_URL=$(echo "$DEPLOY_OUTPUT" | grep -Eo 'https://[^ ]+\.vercel\.app' | tail -1)
if [ -z "$DEPLOY_URL" ]; then
  fail "배포 URL을 찾을 수 없음 — 배포 로그를 확인하세요"
fi
ok "배포 URL: $DEPLOY_URL"

# ── 4. HTTP 상태 체크 ─────────────────────────────────────────────────────────
step 4 "라이브 사이트 응답 체크..."
sleep 5  # 배포 propagation 대기

HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "$DEPLOY_URL")
if [ "$HTTP_STATUS" = "200" ]; then
  ok "HTTP $HTTP_STATUS — 정상"
else
  fail "HTTP $HTTP_STATUS — 사이트 응답 오류 ($DEPLOY_URL)"
fi

# 주요 API 엔드포인트 체크
API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "$DEPLOY_URL/api/market-data")
if [ "$API_STATUS" = "200" ]; then
  ok "API /market-data HTTP $API_STATUS — 정상"
else
  echo -e "${YELLOW}⚠ API /market-data HTTP $API_STATUS (외부 데이터 의존이므로 무시 가능)${NC}"
fi

echo -e "\n${GREEN}🎉 배포 완료!${NC}"
echo -e "   URL: ${DEPLOY_URL}"

# ── 5. GitHub 자동 푸시 (항상 — 코드 유실 방지) ─────────────────────────────
echo -e "\n${YELLOW}[GitHub 동기화]${NC} 현재 코드 GitHub에 푸시..."
if git push origin main 2>&1; then
  ok "GitHub main 브랜치 동기화 완료 — 코드 유실 없음"
else
  echo -e "${YELLOW}⚠ GitHub 푸시 실패 — 수동으로 git push origin main 실행 필요${NC}"
fi

# ── 6. 리포트 알림 발송 (--notify 플래그 있을 때만) ──────────────────────────
if [ "$SEND_NOTIFY" = "true" ]; then
  echo -e "\n${YELLOW}[5/5]${NC} 리포트 알림 발송 중..."
  NOTIFY_RESULT=$(curl -s -X POST "https://www.investus.kr/api/push/notify" \
    -H "Content-Type: application/json" \
    -H "x-notify-secret: ${NOTIFY_SECRET}" \
    -d "{\"title\":\"${NOTIFY_TITLE}\",\"message\":\"${NOTIFY_MSG}\",\"url\":\"/\"}")
  echo "$NOTIFY_RESULT"
  SENT=$(echo "$NOTIFY_RESULT" | grep -o '"sent":[0-9]*' | grep -o '[0-9]*')
  if [ -n "$SENT" ]; then
    ok "알림 발송 완료 — 구독자 ${SENT}명에게 전송"
  else
    echo -e "${YELLOW}⚠ 알림 발송 결과 확인 불가 (구독자 0명이거나 오류)${NC}"
  fi
fi
