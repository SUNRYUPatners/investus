// 종토방/애널 글 post-level likes를 한/두자리(1~99)로 낮추기
// 실행: node scripts/lower-post-likes.js
const fs = require('fs');
const path = require('path');

const files = [
  { file: 'lib/wallPosts.ts',    kind: 'wall'    },
  { file: 'lib/analystPosts.ts', kind: 'analyst' },
];

// 결정적 랜덤 (id 기반) — 재생성해도 같은 값
function seededLikes(seed) {
  const s = Math.abs(seed);
  // 1~99 랜덤 (선호도가 있는 자연 분포처럼: 1~20 60%, 21~50 30%, 51~99 10%)
  const r = ((s * 9301 + 49297) % 233280) / 233280;
  if (r < 0.60) return 1 + Math.floor(((s * 17 + 3) % 20));       // 1-20
  if (r < 0.90) return 21 + Math.floor(((s * 23 + 7) % 30));      // 21-50
  return 51 + Math.floor(((s * 31 + 11) % 49));                    // 51-99
}

let totalReplaced = 0;

for (const { file, kind } of files) {
  const fp = path.join(__dirname, '..', file);
  let src = fs.readFileSync(fp, 'utf8');
  let count = 0;

  if (kind === 'wall') {
    // MOCK_POSTS: { id: N, ..., createdAt: ..., likes: NNNN, comments: N }
    src = src.replace(/(\{\s*id:\s*(\d+),[\s\S]*?createdAt:\s*[^,]+,\s*likes:\s*)(\d+)(\s*,\s*comments:\s*\d+\s*\})/g,
      (m, prefix, id, oldLikes, suffix) => {
        const newLikes = seededLikes(parseInt(id));
        count++;
        return prefix + newLikes + suffix;
      });
    // MOCK_COMMENTS: { id: N, nickname: ..., ..., createdAt: ..., likes: NNN }  (no comments field)
    src = src.replace(/(\{\s*id:\s*(\d+),\s*nickname:[\s\S]*?createdAt:\s*[^,]+,\s*likes:\s*)(\d+)(\s*\})/g,
      (m, prefix, id, oldLikes, suffix) => {
        // 댓글은 더 낮게: 1~30
        const s = Math.abs(parseInt(id));
        const newLikes = 1 + ((s * 13 + 7) % 30);
        count++;
        return prefix + newLikes + suffix;
      });
  }

  if (kind === 'analyst') {
    // {  id: -N, ... likes: NNNN, ... created_at: ... }
    src = src.replace(/(\{\s*id:\s*(-?\d+),[\s\S]*?likes:\s*)(\d+)(,\s*comments:\s*\d+,\s*created_at:)/g,
      (m, prefix, id, oldLikes, suffix) => {
        const newLikes = seededLikes(parseInt(id));
        count++;
        return prefix + newLikes + suffix;
      });
  }

  fs.writeFileSync(fp, src);
  console.log(`✅ ${file}: ${count}개 post likes 재설정`);
  totalReplaced += count;
}

console.log(`\n총 ${totalReplaced}개 post likes 변경 완료`);
