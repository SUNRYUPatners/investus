#!/bin/bash
# Weekend & holiday auto report update
# Triggered by macOS crontab on Sat/Sun 08:23 KST

LOG_DIR="/Users/ryu-macmini/.claude/weekend-logs"
mkdir -p "$LOG_DIR"
DATE=$(date +%Y%m%d)
LOG="$LOG_DIR/update-$DATE.log"

echo "[$(date)] Starting weekend report update" >> "$LOG"

cd /Users/investus

/usr/local/bin/claude --print --dangerously-skip-permissions -p "$(cat <<'PROMPT'
주말 자동 리포트 업데이트입니다. 작업 디렉토리: /Users/investus/

오늘 날짜를 확인하고 지난 24~48시간 Tesla(TSLA)·SpaceX(SPCX)·Big Tech(NVDA·AAPL·META·GOOGL·MSFT·AMZN) 주요 뉴스를 검색해서 investus.kr 리포트를 업데이트하고 배포하세요.

작업 순서:
1. WebSearch로 뉴스 검색: "Tesla SpaceX news today", "Big Tech NVDA news today", "Nvidia Apple Meta news" 등
2. 3~8개 주요 토픽 선정 후 팩트 교차 확인 (인과 연결·수치 재검색)
3. /Users/investus/lib/reports.ts — 오늘 날짜 한장요약+토픽 seeds SEED_REPORTS 맨 앞에 prepend
   - images 경로: "/charts/[slug]-YYYYMMDD.png"
   - body 필수: ■ 무슨 일인가요(3문단+) / ■ 조금만 더 알려드리면 / ■ 기관·하우스 뷰
   - body 내 ASCII 큰따옴표(") 절대 금지
4. /Users/investus/public/charts/ — 1080×1350 인스타 카드 SVG 생성 후 sharp로 PNG 변환
   - 인스타 카드: 헤더→아이브로우→HUGE 히어로(100px+)→서브헤드→구분선→시각요소→3 스탯카드→메시지박스→푸터
   - summary-YYYYMMDD.svg/png + -en.svg/png 한장요약 포함
5. /Users/investus/lib/wallPosts.ts — 타임스탬프 상수+LATEST_UPDATE 갱신, 15개 종토방 포스트 prepend
6. /Users/investus/lib/analystPosts.ts — 15개 애널 포스트 prepend + MOCK_ANALYST_COMMENTS 댓글 2개씩
7. /Users/investus/scripts/fix-reports-YYYYMMDD-ko-analyst.js 생성
8. cd /Users/investus && bash scripts/deploy.sh

완료 후 결과 요약 출력.
PROMPT
)" >> "$LOG" 2>&1

echo "[$(date)] Done. Exit code: $?" >> "$LOG"
