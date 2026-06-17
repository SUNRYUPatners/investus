@AGENTS.md

# 🚨 절대 금지 명령어 — Claude가 절대로 임의 실행 불가

아래 명령어는 **관리자가 채팅에서 "확인합니다"를 세 번 명시한 경우에만** 실행할 수 있다.
Claude가 스스로 판단해서 실행하면 코드 전체가 롤백되는 참사가 발생한다.
"이게 더 효율적"이라는 판단으로도 절대 실행 불가.

```
git reset --hard         ← 절대 금지 (영구 코드 유실 위험)
git reset --soft         ← 관리자 3번 확인 필요
git push --force         ← 절대 금지 (git hook이 차단 + GitHub 보호)
git push -f              ← 절대 금지
git rebase               ← 관리자 3번 확인 필요
git checkout -- .        ← 절대 금지
git restore .            ← 절대 금지
git clean -fd            ← 절대 금지
git stash drop           ← 관리자 3번 확인 필요
vercel rollback          ← 절대 금지 (관리자 3번 확인 + 별도 사유 필요)
npx vercel deploy --prod ← deploy.sh 없이 단독 실행 절대 금지 (GitHub 미동기화로 자동 롤백 발생)
```

## 롤백 요청 프로세스 (이것도 절대 임의 실행 불가)

관리자가 롤백을 원할 경우 아래 절차를 반드시 따른다:
1. Claude가 "어떤 커밋으로 롤백할지, 어떤 결과가 발생하는지" 먼저 설명
2. 관리자가 "확인합니다 1" 명시
3. Claude가 "이 작업은 되돌릴 수 없습니다. 정말 진행하시겠습니까?" 재확인
4. 관리자가 "확인합니다 2" 명시
5. Claude가 "최종 확인: [커밋 해시] → 롤백 실행하겠습니다" 공지
6. 관리자가 "확인합니다 3" 명시 후에만 실행

위 6단계 없이는 어떤 형태의 롤백도 실행하지 않는다.

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
- **`npx vercel deploy --prod` 단독 실행 절대 금지** — GitHub 미동기화 → 나중에 GitHub push 시 자동 구버전 롤백 발생 (실제 발생한 사고)
- **반드시 `bash scripts/deploy.sh`** — Vercel 배포 + GitHub 푸시 동시에 보장
- Vercel 대시보드 롤백 버튼: 기술적으로 차단 불가 → 관리자가 직접 클릭하는 것이므로 관리자 책임
- `vercel rollback` CLI: Claude가 실행하려면 위 6단계 프로세스 필수
- GitHub이 항상 최신 = Vercel 롤백 후 `bash scripts/deploy.sh` 한 번으로 즉시 복구 가능

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
