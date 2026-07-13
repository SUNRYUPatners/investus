---
name: investus-report-update
description: >-
  Investus 일일 리포트 업데이트 규칙. 리포트 추가, report-update,
  SEED_REPORTS, charts SVG, 종토방/애널 포스트, 01.investus 리포트
  폴더 스크린샷 반영 시 반드시 사용한다.
---

# Investus 리포트 업데이트 스킬

리포트 날짜 세트를 추가할 때 **항상** 이 스킬 + `.claude/commands/report-update.md` 전체 순서를 따른다.

## 핵심 원칙 (사용자 요청 — 내일부터 필수)

1. **글(본문) vs 이미지 역할 분리**
   - **리포트 본문(`lib/reports.ts` body)**: 상세 설명·배경·출처·**투자시사점**을 충분히 채운다.
   - **SVG 이미지**: 모바일에서도 초보가 **한눈에** 이해하도록 **큰 숫자·아이콘·그래프·카드** 위주. **긴 글·문장 나열 금지**.

2. **본문에 투자시사점 필수**
   - 모든 개별 리포트 `body` / `bodyEn`에 `■ 투자시사점` (EN: `■ Investment Implications`) 섹션을 넣는다.
   - 단순 사실 나열만 하고 끝내지 않는다. "그래서 주가/섹터/포지션에 뭐가 중요한지" 2~4줄로 명확히.

3. **SVG는 2026-07-02 스타일 고수**
   - 레퍼런스: `public/charts/*20260702*.svg` (예: `tsla-q2-delivery-day-20260702.svg`, `spcx-wedbush-150-20260702.svg`, `summary-20260702.svg`)
   - **큰 히어로 숫자** (60~130px), 아이콘/이모지, 2열 카드, 막대·레인지처럼 **시각 블록**
   - 카드당 핵심 **지표·키워드 1개**
   - 긴 불릿·문단·설명문 → 본문으로 이동
   - 모바일 가독성: 글자 밀도 낮게, 대비 높게, 여백 확보

4. **한장요약 SVG**
   - 항목당: 짧은 헤드라인 + 우측/하단 **키 숫자 1개** (+ 한 줄 서브)
   - 문장형 설명 여러 줄 금지

## 실행 체크리스트 (빠지면 미완성)

1. `01.investus 리포트/` 원본 스크린샷 Read로 팩트 추출
2. SVG KO+EN — **7/2 비주얼 스타일**
3. `lib/reports.ts` seed + tickers — **본문 충실 + 투자시사점**
4. `lib/wallPosts.ts` 글/댓글 + `LATEST_UPDATE`
5. `lib/analystPosts.ts` 개별 리포트마다 1개 이상
6. `scripts/export-report-pngs.js` PAIRS (오늘 date만)
7. `node scripts/export-report-pngs.js` (**`--all` 금지**)
8. 팩트체크: 스크린샷 재 Read 후 수치 1:1 대조
9. commit + `bash scripts/deploy.sh` (필요 시 `--notify`)

## SVG 금지 / 권장

| 금지 | 권장 |
|------|------|
| 문단·긴 불릿을 이미지에 넣기 | 히어로 `$460`, `52%`, `$138.99` |
| 설명형 문장 여러 줄 | 아이콘 + 2~4개 KPI 카드 |
| 글자만 가득 찬 1080 캔버스 | 그래프·레인지바·대비 색 블록 |
| "투자시사점"을 SVG에만 쓰기 | 시사점은 **본문**에, SVG는 숫자 |

## 본문 최소 구조 (개별 리포트)

```
■ 핵심 사실
■ (선택) 배경 / 스펙 / 출처 상세
■ 투자시사점    ← 필수
```

영문은 동일 구조 `Key Facts` → `Investment Implications`.

## 참고 파일

- 워크플로 상세: `.claude/commands/report-update.md`
- 비주얼 레퍼런스: `public/charts/*20260702*.svg`
- 룰: `.cursor/rules/investus-report-update.mdc`
