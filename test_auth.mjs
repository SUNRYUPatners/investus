import { chromium } from "playwright";

const SITE = "https://investus.kr";
const TEST_EMAIL = `test_${Date.now()}@yopmail.com`;
const TEST_PW = "TestPass123!";

async function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function log(msg) {
  console.log(`[${new Date().toISOString().slice(11, 19)}] ${msg}`);
}

async function openMorePage(browser) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") log(`  CONSOLE ERROR: ${m.text()}`);
  });
  await page.goto(`${SITE}/more`, { waitUntil: "networkidle" });
  return { ctx, page };
}

async function openLoginForm(page, mode = "signup") {
  // 회원가입 or 로그인 버튼 클릭
  const btn = page.locator(`button`).filter({ hasText: mode === "signup" ? "회원가입" : "로그인" }).first();
  await btn.click();
  await wait(500);
}

async function fillEmailPw(page, email, pw) {
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', pw);
}

// ────────────────────────────────────────────────
// TEST 1: 이메일 회원가입 (신규)
// ────────────────────────────────────────────────
async function testEmailSignup(browser) {
  log("═══ TEST 1: 이메일 회원가입 ═══");
  const { ctx, page } = await openMorePage(browser);

  await openLoginForm(page, "signup");

  // 이용약관 동의
  const checkbox = page.locator('input[type="checkbox"]').first();
  if (await checkbox.isVisible()) await checkbox.check();

  await fillEmailPw(page, TEST_EMAIL, TEST_PW);
  await page.click('button[type="submit"]');
  await wait(2000);

  // 확인 이메일 안내 화면이 뜨는지
  const confirmText = await page.locator("text=이메일을 확인해주세요").isVisible().catch(() => false)
    || await page.locator("text=confirm_email").isVisible().catch(() => false)
    || await page.locator("text=인증 링크").isVisible().catch(() => false)
    || await page.locator("text=링크를 클릭").isVisible().catch(() => false);

  if (confirmText) {
    log("  ✅ PASS — 회원가입 성공, 이메일 인증 안내 표시됨");
  } else {
    const bodyText = await page.locator("body").innerText().catch(() => "");
    const error = await page.locator("text=오류").isVisible().catch(() => false)
      || await page.locator('[style*="ef4444"]').isVisible().catch(() => false);
    if (error) {
      const errEl = page.locator('[style*="ef4444"]').first();
      const errMsg = await errEl.innerText().catch(() => "");
      log(`  ❌ FAIL — 에러 메시지: ${errMsg || "알 수 없음"}`);
    } else {
      log(`  ⚠️  UNKNOWN — 예상 화면 없음. 현재 URL: ${page.url()}`);
      log(`  화면 텍스트 일부: ${bodyText.slice(0, 200)}`);
    }
  }

  await ctx.close();
}

// ────────────────────────────────────────────────
// TEST 2: 이미 있는 이메일로 재가입 시도
// ────────────────────────────────────────────────
async function testDuplicateSignup(browser) {
  log("═══ TEST 2: 중복 이메일 회원가입 (에러 처리) ═══");
  const { ctx, page } = await openMorePage(browser);

  await openLoginForm(page, "signup");
  const checkbox = page.locator('input[type="checkbox"]').first();
  if (await checkbox.isVisible()) await checkbox.check();

  await fillEmailPw(page, "sunryupatners@gmail.com", TEST_PW); // 기존 계정
  await page.click('button[type="submit"]');
  await wait(2000);

  const errVisible = await page.locator('[style*="ef4444"]').isVisible().catch(() => false);
  if (errVisible) {
    const msg = await page.locator('[style*="ef4444"]').first().innerText().catch(() => "");
    log(`  ✅ PASS — 중복 에러 정상 표시: "${msg}"`);
  } else {
    log("  ❌ FAIL — 중복 에러 메시지 없음");
  }

  await ctx.close();
}

// ────────────────────────────────────────────────
// TEST 3: 잘못된 비밀번호로 로그인
// ────────────────────────────────────────────────
async function testWrongPassword(browser) {
  log("═══ TEST 3: 잘못된 비밀번호 로그인 ═══");
  const { ctx, page } = await openMorePage(browser);

  await openLoginForm(page, "login");
  await fillEmailPw(page, "sunryupatners@gmail.com", "WrongPass999!");
  await page.click('button[type="submit"]');
  await wait(2000);

  const errVisible = await page.locator('[style*="ef4444"]').isVisible().catch(() => false);
  if (errVisible) {
    const msg = await page.locator('[style*="ef4444"]').first().innerText().catch(() => "");
    log(`  ✅ PASS — 오류 표시: "${msg}"`);
  } else {
    log("  ❌ FAIL — 에러 메시지 없음");
  }

  await ctx.close();
}

// ────────────────────────────────────────────────
// TEST 4: Google OAuth 버튼 클릭 → 리다이렉트 확인
// ────────────────────────────────────────────────
async function testGoogleOAuth(browser) {
  log("═══ TEST 4: Google OAuth 리다이렉트 ═══");
  const { ctx, page } = await openMorePage(browser);

  // 퀵 소셜 버튼 (페이지 하단)
  const googleBtn = page.locator('button').filter({ hasText: "Google" }).first();
  await googleBtn.click();
  await wait(3000);

  const url = page.url();
  if (url.includes("accounts.google.com")) {
    log(`  ✅ PASS — Google 로그인 페이지로 정상 리다이렉트`);
    log(`  URL: ${url.slice(0, 80)}...`);
  } else if (url.includes("supabase.co")) {
    log(`  ⚠️  Supabase 중간 페이지: ${url.slice(0, 80)}`);
  } else {
    log(`  ❌ FAIL — 예상치 못한 URL: ${url}`);
  }

  await ctx.close();
}

// ────────────────────────────────────────────────
// TEST 5: Kakao OAuth 버튼 클릭 → 리다이렉트 확인
// ────────────────────────────────────────────────
async function testKakaoOAuth(browser) {
  log("═══ TEST 5: Kakao OAuth 리다이렉트 ═══");
  const { ctx, page } = await openMorePage(browser);

  const kakaoBtn = page.locator('button').filter({ hasText: "카카오" }).first();
  await kakaoBtn.click();
  await wait(3000);

  const url = page.url();
  if (url.includes("kauth.kakao.com")) {
    log(`  ✅ PASS — 카카오 로그인 페이지로 정상 리다이렉트`);
  } else {
    log(`  ❌ FAIL — URL: ${url}`);
  }

  await ctx.close();
}

// ────────────────────────────────────────────────
// TEST 6: Naver OAuth 버튼 클릭 → 리다이렉트 확인
// ────────────────────────────────────────────────
async function testNaverOAuth(browser) {
  log("═══ TEST 6: Naver OAuth 리다이렉트 ═══");
  const { ctx, page } = await openMorePage(browser);

  const naverBtn = page.locator('button').filter({ hasText: "네이버" }).first();
  await naverBtn.click();
  await wait(4000);

  const url = page.url();
  if (url.includes("nid.naver.com")) {
    log(`  ✅ PASS — 네이버 로그인 페이지로 정상 리다이렉트`);
  } else if (url.includes("investus.kr/api/auth/naver")) {
    log(`  ⚠️  서버 API 라우트에서 멈춤: ${url}`);
  } else {
    log(`  ❌ FAIL — URL: ${url}`);
  }

  await ctx.close();
}

// ────────────────────────────────────────────────
// TEST 7: 비밀번호 찾기 이메일 발송
// ────────────────────────────────────────────────
async function testPasswordReset(browser) {
  log("═══ TEST 7: 비밀번호 찾기 이메일 발송 ═══");
  const { ctx, page } = await openMorePage(browser);

  await openLoginForm(page, "login");
  // 비밀번호 찾기 링크
  const resetLink = page.locator("button").filter({ hasText: "비밀번호" }).last();
  await resetLink.click();
  await wait(500);

  await page.fill('input[type="email"]', "sunryupatners@gmail.com");
  await page.click('button[type="submit"]');
  await wait(2000);

  const sent = await page.locator("text=발송").isVisible().catch(() => false)
    || await page.locator("text=이메일").isVisible().catch(() => false)
    || await page.locator("text=재설정").isVisible().catch(() => false);

  if (sent) {
    log(`  ✅ PASS — 재설정 이메일 발송 완료 화면`);
  } else {
    const url = page.url();
    log(`  ⚠️  결과 불명확. URL: ${url}`);
  }

  await ctx.close();
}

// ────────────────────────────────────────────────
// MAIN
// ────────────────────────────────────────────────
(async () => {
  log("Playwright 브라우저 시작...");
  const browser = await chromium.launch({ headless: true });

  try {
    await testEmailSignup(browser);
    await testDuplicateSignup(browser);
    await testWrongPassword(browser);
    await testGoogleOAuth(browser);
    await testKakaoOAuth(browser);
    await testNaverOAuth(browser);
    await testPasswordReset(browser);
  } finally {
    await browser.close();
    log("브라우저 종료");
  }
})();
