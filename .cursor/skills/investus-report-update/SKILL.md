---
name: investus-report-update
description: >-
  Investus 일일 리포트 업데이트 규칙. 리포트 추가, report-update,
  SEED_REPORTS, charts SVG, 종토방/애널 포스트, 01.investus 리포트
  폴더 스크린샷 반영 시 반드시 사용한다.
---

# Investus 리포트 업데이트 스킬

리포트 날짜 세트를 추가할 때 **항상** 이 스킬 + `.claude/commands/report-update.md` 전체 순서를 따른다.

## SVG 이미지 — 규칙이 아니라 "레퍼런스 파일을 직접 보고 따라 만든다" (2026-07-15 업데이트)

과거에 폰트 크기·박스 위치 등을 숫자로 규정한 세부 규칙들은 **전부 폐기**한다.
대신 아래 **3개 날짜의 실제 SVG 파일을 Read로 직접 열어서** 그 스타일/밀도/구조를 그대로 따라 만든다.

**필수 레퍼런스 (매번 새 리포트 만들기 전에 최소 1~2개씩 Read로 열어볼 것):**
- `public/charts/*20260702*.svg`
- `public/charts/*20260703*.svg`
- `public/charts/*20260704*.svg`

이 3개 날짜는 서로 스타일이 조금씩 다르다 (색 테마, 배경 그리드, 카드 배치, bottom stat row 유무 등). 그날 다룰 소재의 성격에 맞게 **가장 비슷한 레퍼런스를 골라 구조를 베낀다** — 완전히 새로운 레이아웃을 창작하지 않는다.

**레퍼런스에서 확인되는 공통 특징 (참고용, 강제 규칙 아님):**
- 제목 26~38px, 히어로 숫자/텍스트 44~130px — 텍스트는 크고 선명하게
- 카드형 KPI 블록 여러 개 (2~3열 그리드), 배경색·강조색은 티커/주제별로 통일된 팔레트
- **"투자 시사점" / "Investment Implications" 박스는 이미지 안에 넣어도 된다** (7/4 `tsla-fsd-manslaughter-20260704.svg` 참고) — 단 본문(`lib/reports.ts`의 body/bodyEn)에도 반드시 동일 섹션을 채운다
- 카드/박스로 캔버스 하단까지 densely 채움 — 빈 공백을 남기지 않음
- 하단에 요약 caption 한 줄 + `investus.kr SRP 최고투자책임자 발행` 트레이드마크

**작업 순서:**
1. 오늘 다룰 소재들을 확인
2. 위 3개 날짜 폴더에서 소재 성격이 비슷한 SVG 1~2개를 Read로 열어 구조 확인
3. 그 구조(섹션 개수, 폰트 크기, 카드 배치, 색 사용법)를 그대로 이번 소재 데이터로 채워서 생성
4. 완성 후 sharp로 PNG 렌더링해서 실제로 눈으로 확인 (잘림/오버플로 체크)

## 본문(body) 원칙 — 변경 없음

1. **본문(`lib/reports.ts` body/bodyEn)에는 상세 설명·배경·출처·투자시사점을 충분히 채운다.**
2. 모든 개별 리포트에 `■ 투자시사점` (EN: `■ Investment Implications`) 필수 — SVG에 넣었더라도 본문에도 반드시 있어야 함.

## 한장요약 SVG

- 핵심 위주로 구성하되, 7/3·7/4 요약본처럼 카드/그리드로 **화면을 densely 채우는 것**이 기본값
- 레퍼런스: `public/charts/summary-20260702.svg`, `summary-20260703.svg`, `summary-20260704.svg`

## 실행 체크리스트 (빠지면 미완성)

1. `01.investus 리포트/` 원본 스크린샷 Read로 팩트 추출
2. **7/2~7/4 SVG 중 비슷한 소재를 Read로 열어보고** 그 구조를 따라 SVG KO+EN 작성
3. `lib/reports.ts` seed + tickers — **본문 충실 + 투자시사점**
4. `lib/wallPosts.ts` 글/댓글 + `LATEST_UPDATE`
5. `lib/analystPosts.ts` 개별 리포트마다 1개 이상
6. `scripts/export-report-pngs.js` PAIRS (오늘 date만)
7. `node scripts/export-report-pngs.js` (**`--all` 금지**)
8. 팩트체크: 스크린샷 재 Read 후 수치 1:1 대조
9. PNG 렌더링해서 실제 눈으로 레이아웃 확인 (잘림/빈공간 체크)
10. commit + `bash scripts/deploy.sh` (필요 시 `--notify`)

## 본문 최소 구조 (개별 리포트)

```
■ 핵심 사실
■ (선택) 배경 / 스펙 / 출처 상세
■ 투자시사점    ← 필수 (SVG에도 넣을 수 있지만 본문에는 항상 있어야 함)
```

## 참고 파일

- 워크플로: `.claude/commands/report-update.md`
- **비주얼 레퍼런스 (직접 Read할 것): `public/charts/*20260702*.svg`, `*20260703*.svg`, `*20260704*.svg`**
- 룰: `.cursor/rules/investus-report-update.mdc`
