# /report-update — 날짜별 리포트 전체 업데이트 세트

새 날짜의 리포트를 추가할 때 반드시 아래 순서를 **전부** 실행한다. 하나라도 빠지면 미완성이다.

## 실행 순서

### 1. SVG 생성
- `public/charts/` 폴더에 해당 날짜 SVG 파일 생성
- **한국어판 + 영어판(-en suffix) 모두 필수** — 모든 차트에 KO/EN 쌍 생성
- 파일명 규칙: `<종목>-<설명>-<YYYYMMDD>.svg` (영어판: `<종목>-<설명>-<YYYYMMDD>-en.svg`)
- **viewBox 높이 계산 철저히** — 요소 겹침 절대 금지

### 2. lib/reports.ts — seed 추가
- `SEED_REPORTS` 배열에 새 seed 삽입 (pinned 요약 카드가 가장 앞)
- `REPORT_TICKERS` 맵에 seed별 ticker 배열 추가
- 날짜별 섹션 주석으로 구분

### 3. lib/wallPosts.ts — 종토방 글/댓글 추가
- 날짜 타임스탬프 상수 추가 (`const T<DD>J = _now - <n> * 3600_000`)
- `MOCK_POSTS` 배열에 새 날짜 게시글 추가 (ID는 기존 최대값+1부터)
- `MOCK_COMMENTS` 맵에 해당 게시글 댓글 추가
- `LATEST_UPDATE`를 오늘 날짜 타임스탬프로 갱신

### 4. lib/analystPosts.ts — 애널리스트 글/댓글 추가
- `MOCK_ANALYST_POSTS` 배열에 새 날짜 포스트 추가 (id는 음수, 최소값-1부터)
- `MOCK_ANALYST_COMMENTS` 맵에 댓글 추가

### 5. scripts/export-report-pngs.js — PAIRS 추가
- `PAIRS` 배열에 오늘 날짜 항목 추가
- `{ ko: '파일명.svg', en: 'en파일명.svg' or null, label: '라벨', date: 'YYYYMMDD' }` 형식
- 영어판 없으면 `en: null`

### 6. PNG 내보내기 (당일 이미지만)
- `node scripts/export-report-pngs.js` 실행 (**인수 없이** — 오늘 날짜만 자동 필터링)
- **`--all` 플래그 절대 사용 금지** — 이전 날짜 이미지까지 전부 재내보내기되는 낭비
- 스크립트가 오늘 UTC 날짜를 기준으로 필터링. UTC/KST 차이로 0개 출력되면 --all 대신 PAIRS date 필드를 재확인
- `/Users/ryu-macmini/Desktop/investus/01.investus 리포트/` 에 저장 확인

### 7. 커밋 + 배포
```
git add <수정된 파일들>
git commit -m "feat: <날짜> 리포트 추가"
bash scripts/deploy.sh
```

## 중요 규칙
- 1 리포트 = 1 주제 — 하나의 seed에 여러 주제 섞지 않는다
- 날짜별 타임스탬프는 상대 오프셋으로 계산 (`_now - N*3600_000`)
- 배포 전 TypeScript 오류 0개 확인 필수
