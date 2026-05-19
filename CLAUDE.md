@AGENTS.md

# 작업 완료 후 배포 루틴

코드 수정이 포함된 작업을 완료한 뒤에는 반드시 아래 순서로 배포하고 오류를 확인한다.

## 자동 루틴 (scripts/deploy.sh)

```bash
bash scripts/deploy.sh
```

이 스크립트가 순서대로 실행한다:
1. `npx tsc --noEmit` — TypeScript 타입 오류 체크
2. `npm run build` — Next.js 빌드 오류 체크
3. `npx vercel deploy --prod` — 프로덕션 배포
4. `curl` — 라이브 URL HTTP 200 응답 확인

## 수동으로 할 경우 순서

```bash
npx tsc --noEmit          # 타입 오류 없어야 함
npm run build             # 빌드 성공해야 함
npx vercel deploy --prod  # 프로덕션 배포
```

## 배포 후 체크리스트

- [ ] 메인 페이지(/) HTTP 200
- [ ] 모바일·데스크탑 레이아웃 이상 없음
- [ ] 콘솔 오류 없음 (빌드 출력 기준)
- [ ] 수정된 기능 직접 확인

## 오류 발생 시

- TypeScript 오류 → 오류 수정 후 재배포, 절대 `// @ts-ignore` 로 무시하지 말 것
- 빌드 오류 → 원인 파악 후 수정, 빌드 통과 전에는 배포 중단
- HTTP 오류 → Vercel 배포 로그 확인 (`npx vercel logs`)
