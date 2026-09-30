---
name: investus-card-news
description: >-
  인스타 업로드용 카드뉴스 한 장과 본문을 만든다. 카드뉴스 뽑아줘, 카드뉴스,
  인스타 카드, 인스타 업로드용 이미지라고 하면 사용. 이미지는 instagram/ 폴더에만
  저장하고 사이트·public·배포에는 넣지 않는다.
---

# 카드뉴스

`카드뉴스 뽑아줘`이면 이 순서를 끝까지 한다. 사이트 리포트 SVG(`public/charts`)와 다른 산출물이다.

## 하지 말 것

- `public/`에 넣지 않는다. `scripts/deploy.sh`로 이 이미지를 배포하지 않는다.
- 아파트 LAP 로고·캐릭터·계정명을 카드에 넣지 않는다. 형식만 따른다.
- 숫자를 지어내지 않는다. 그날 `lib/reports.ts`에 있는 사실만 쓴다.
- `적었습니다` `적혔습니다` `글이 있습니다` `속보가 있습니다` `캡처에 없습니다` 금지.

## 범위

말이 없으면 **가장 최근 미국 리포트의 테슬라·스페이스X만** 한 장. 날짜·종목·시장을 지정하면 그것만.

## 저장

- PNG: `/Users/investus/instagram/YYYYMMDD-주제.png`
- 원본 SVG도 같은 폴더. 이 폴더는 `.gitignore`의 `/instagram/`이다.
- SVG는 파이썬으로 UTF-8 저장한다. 에디터 쓰기는 한글이 깨진다.
- PNG는 크롬 헤드리스로 뽑는다.

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --hide-scrollbars \
  --window-size=1080,1350 \
  --screenshot="/Users/investus/instagram/YYYYMMDD-주제.png" \
  "file:///Users/investus/instagram/YYYYMMDD-주제.svg"
```

뽑은 PNG를 읽어 글자 깨짐·잘림·칸 밖 넘침이 있으면 고친 뒤 다시 뽑는다.

## 카드 (1080×1350)

레퍼런스: `instagram/20260930-tsla-spcx.png`

- 흰 바탕. 왼쪽 위 `* YYYY년 M월 D일 리포트`. 오른쪽 위 검은 알약 `INVESTUS`.
- 큰 검은 제목 두 줄. 명사로 끊는다. 예: `오늘` / `테슬라·스페이스X`
- 제목 아래 검은 알약 2~3개. 한 줄 숫자.
- 가로 막대 6~7개. 왼쪽 검은 칸(항목+큰 숫자), 오른쪽 회색 칸(한 줄 제목+보조).
- 가장 큰 숫자 한 막대만 빨강 `#e10600`.
- 맨 아래 작은 회색 한 줄 + `investus.kr · 투자 권유가 아닙니다`
- 글꼴: `Apple SD Gothic Neo`

## 채팅에 줄 본문

아파트 LAP 글처럼 이모지 제목, 짧은 줄, `→` 로 숫자만. 문단으로 풀지 않는다. 끝에 해시태그 5개 안팎.

```
🚗 오늘 테슬라·스페이스X

감독 완전자율주행
8월 27일 기준 150억 마일
→ 전체 15,007,023,418마일
→ 도시 5,843,156,839마일

#테슬라 #스페이스X #FSD #투자 #인베스터스
```

답은 저장 경로와 붙여 넣을 본문으로 끝낸다.
