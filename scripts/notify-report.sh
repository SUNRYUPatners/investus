#!/bin/bash
# 리포트 발간 알림 스크립트
# Usage: bash scripts/notify-report.sh "제목" "내용" [url]
#
# 환경변수 NOTIFY_SECRET 필요 (또는 .env.local 에서 자동 로드)
# 예시:
#   bash scripts/notify-report.sh "📋 새 리포트" "5월 시장 분석 발행됐습니다" "/insight"

TITLE="${1:-📋 Investus 리포트 업데이트}"
MESSAGE="${2:-새로운 투자 인사이트가 발행됐습니다. 지금 확인하세요!}"
URL="${3:-/insight}"
SITE="https://www.investus.kr"

# NOTIFY_SECRET 없으면 .env.local 에서 읽기
if [ -z "$NOTIFY_SECRET" ] && [ -f ".env.local" ]; then
  NOTIFY_SECRET=$(grep '^NOTIFY_SECRET=' .env.local | cut -d= -f2- | tr -d '"' | tr -d "'")
fi

if [ -z "$NOTIFY_SECRET" ]; then
  echo "❌ NOTIFY_SECRET 환경변수가 없습니다. .env.local 에 NOTIFY_SECRET=... 추가하거나 환경변수로 전달하세요."
  exit 1
fi

echo "🔔 알림 전송 중..."
echo "   제목: $TITLE"
echo "   내용: $MESSAGE"
echo "   URL:  $URL"

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$SITE/api/push/notify" \
  -H "Content-Type: application/json" \
  -H "x-notify-secret: $NOTIFY_SECRET" \
  -d "{\"title\":\"$TITLE\",\"message\":\"$MESSAGE\",\"url\":\"$URL\"}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ 전송 완료: $BODY"
else
  echo "❌ 전송 실패 (HTTP $HTTP_CODE): $BODY"
  exit 1
fi
