# /report-export — 리포트 PNG 내보내기

오늘 날짜 리포트의 SVG 파일을 PNG로 변환해 `/Users/ryu-macmini/Desktop/investus/01.investus 리포트/` 폴더에 저장한다.

## 규칙

1. `scripts/export-report-pngs.js`의 `PAIRS` 배열에 오늘 날짜(`YYYYMMDD`) 항목이 있는지 확인한다.
2. 없으면 먼저 추가하고 저장한다.
3. `node scripts/export-report-pngs.js` **인수 없이** 실행한다 — 오늘 날짜만 자동 필터링.
4. **`--all` 플래그 절대 사용 금지** — 이전 날짜 이미지까지 전부 재내보내기됨.
5. UTC/KST 차이로 0개 출력 시 → `--all` 대신 PAIRS의 `date` 필드(KST 날짜)를 확인.
6. 결과를 보고한다: 성공/실패 수와 파일명 목록.

## 출력 파일명 규칙

- 한국어판: `KO_<label>_<date>.png`
- 영어판: `EN_<label>_<date>.png`

예시: `KO_SPCX_IPO첫날_20260613.png`, `EN_6월13일_요약_20260613.png`

## 이모지 크래시 처리

macOS librsvg/Pango는 일부 이모지에서 크래시가 발생한다.
`export-report-pngs.js`의 `stripEmoji()` 함수가 자동으로 처리한다.
SVG 원본 파일은 변경되지 않는다.
