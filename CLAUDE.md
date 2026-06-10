@AGENTS.md

# ⚠️ 절대 금지 명령어 (관리자 명시 승인 없이 절대 실행 불가)

아래 명령어는 **관리자가 명시적으로 두 번 확인한 경우에만** 실행할 수 있다.
Claude가 임의로 판단해서 실행하면 코드 전체가 롤백되는 참사가 발생한다.

```
git reset --hard         ← 절대 금지
git reset --soft         ← 관리자 승인 필요
git push --force         ← 절대 금지 (git hook이 차단함)
git push -f              ← 절대 금지
git rebase               ← 관리자 승인 필요
git checkout -- .        ← 절대 금지
git restore .            ← 절대 금지
git clean -fd            ← 절대 금지
git stash drop           ← 관리자 승인 필요
vercel rollback          ← 관리자 명시 승인 두 번 필요
```

위 명령어 실행 전 반드시 관리자에게 "이 명령어를 실행하면 X가 삭제됩니다. 진행하시겠습니까?" 라고 먼저 물어봐야 한다.

---

# 수정 후 필수 루틴 (매 수정마다 반드시 실행)

코드를 수정할 때마다 아래 순서를 **빠짐없이** 실행한다.

## 순서

```
1. git add <수정된 파일들>
2. git commit -m "설명"
3. bash scripts/deploy.sh        ← TypeScript 체크 + 빌드 + Vercel 배포 + GitHub 푸시 자동
```

`scripts/deploy.sh`가 자동으로:
1. 미커밋 변경사항 차단 (clean 상태만 배포)
2. `npx tsc --noEmit` — TypeScript 타입 오류 체크
3. `npm run build` — Next.js 빌드 오류 체크
4. `npx vercel deploy --prod` — 프로덕션 배포
5. `curl` — HTTP 200 응답 확인
6. **`git push origin main`** — GitHub 자동 동기화 (롤백 방지 핵심)

## 수동으로 할 경우

```bash
npx tsc --noEmit          # 타입 오류 없어야 함
npm run build             # 빌드 성공해야 함
npx vercel deploy --prod  # 프로덕션 배포
git push origin main      # ← 반드시 GitHub에도 푸시
```

## GitHub 동기화가 왜 중요한가

Vercel은 GitHub에 연결되어 있다. 로컬 코드를 Vercel에만 배포하고 GitHub에 안 올리면,
Vercel이 어떤 이유로든 GitHub에서 재배포 트리거를 받으면 → **구버전으로 롤백**된다.
따라서 **모든 배포는 반드시 GitHub 푸시까지 완료**해야 배포가 안전하게 유지된다.

---

# 롤백 방지 설정 현황

## Git Hook (로컬)
- `.git/hooks/pre-push` 설치됨
- `git push --force` → 자동 차단
- `main` 브랜치 삭제 → 자동 차단

## GitHub 브랜치 보호 (원격)
- `main` 브랜치 force push 비허용 ✓
- `main` 브랜치 삭제 비허용 ✓

## Vercel 롤백 방지
- Vercel 대시보드에서의 롤백은 기술적으로 막을 수 없음
- 단, GitHub을 항상 최신 상태로 유지하면 롤백돼도 즉시 복구 가능
- Vercel 롤백 버튼 클릭 전 반드시 관리자(나) 직접 승인 필요

---

# 배포 후 체크리스트

- [ ] 메인 페이지(/) HTTP 200
- [ ] 모바일·데스크탑 레이아웃 이상 없음
- [ ] 콘솔 오류 없음 (빌드 출력 기준)
- [ ] 수정된 기능 직접 확인
- [ ] `git log --oneline -3` 으로 최신 커밋 확인

## 오류 발생 시

- TypeScript 오류 → 오류 수정 후 재배포, 절대 `// @ts-ignore` 로 무시하지 말 것
- 빌드 오류 → 원인 파악 후 수정, 빌드 통과 전에는 배포 중단
- HTTP 오류 → Vercel 배포 로그 확인 (`npx vercel logs`)
