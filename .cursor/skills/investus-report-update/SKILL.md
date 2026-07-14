---
name: investus-report-update
description: >-
  Investus 일일 리포트 업데이트 규칙. 리포트 추가, report-update,
  SEED_REPORTS, charts SVG, 종토방/애널 포스트, 01.investus 리포트
  폴더 스크린샷 반영 시 반드시 사용한다.
---

# Investus 리포트 업데이트 스킬

리포트 날짜 세트를 추가할 때 **항상** 이 스킬 + `.claude/commands/report-update.md` 전체 순서를 따른다.

## 핵심 원칙

1. **글(본문) vs 이미지 역할 분리**
   - **리포트 본문(`lib/reports.ts` body)**: 상세 설명·배경·출처·**투자시사점**을 충분히 채운다.
   - **SVG 이미지**: 모바일에서도 **딱 한눈에** 이해. 큰 숫자·아이콘·그래프 + **무슨 의미인지 알 수 있는 라벨·한 줄 설명**.

2. **SVG 글 분량 = “적당히” (중요)**
   - ❌ **너무 요약** → 숫자/`BUY`/`OUTPERFORM`만 덩그러니 → 초보가 맥락을 모름
   - ❌ **너무 많음** → 문단·긴 불릿 가득 → 모바일에서 읽기 어려움
   - ✅ **한눈 이해**: 히어로 숫자 + **그게 무엇인지** (라벨) + **왜 중요한지 한 줄** + 카드 2~4개
   - 테스트: 이미지를 3초만 보고 “무슨 뉴스인지” 말할 수 있어야 한다
   - 예: `$460`만 ❌ → `$460` + `BofA 목표가` + `BUY 재확인 · Robotaxi ~52%` ✅

3. **본문에 투자시사점 필수**
   - 모든 개별 리포트 `body` / `bodyEn`에 `■ 투자시사점` (EN: `■ Investment Implications`)
   - “그래서 주가/섹터에 뭐가 중요한지” 2~4줄

4. **SVG는 2026-07-02 스타일**
   - 레퍼런스: `public/charts/*20260702*.svg`
   - 큰 히어로 숫자(60~130px) + 아이콘 + 2열 카드 + 시각 블록
   - 상세 배경·긴 시사점 → 본문. SVG에는 **한 줄짜리 맥락**까지는 OK

5. **한장요약 SVG**
   - 항목당: 헤드라인 + 키 숫자 + **의미 있는 서브 한 줄** (암호처럼 줄이지 말 것)

## 실행 체크리스트 (빠지면 미완성)

1. `01.investus 리포트/` 원본 스크린샷 Read로 팩트 추출
2. SVG KO+EN — **7/2 비주얼 + 한눈 이해(적당히)**
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
| 숫자만 덩그러니 (맥락 없음) | 숫자 + 라벨 + 한 줄 의미 |
| 문단·긴 불릿 가득 | 아이콘 + 2~4개 KPI 카드 |
| 글자만 가득 찬 캔버스 | 그래프·레인지바·대비 색 블록 |
| 시사점을 SVG에만 쓰기 | 시사점은 **본문**, SVG는 핵심 한눈 |

## 본문 최소 구조 (개별 리포트)

```
■ 핵심 사실
■ (선택) 배경 / 스펙 / 출처 상세
■ 투자시사점    ← 필수
```

## 참고 파일

- 워크플로: `.claude/commands/report-update.md`
- 비주얼 레퍼런스: `public/charts/*20260702*.svg`
- 룰: `.cursor/rules/investus-report-update.mdc`
