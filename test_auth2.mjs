import { chromium } from "playwright";
import { writeFileSync } from "fs";

const SITE = "https://investus.kr";
const SS_DIR = "/tmp/auth_screenshots";
import { mkdirSync } from "fs";
try { mkdirSync(SS_DIR); } catch {}

let ssIdx = 0;
async function ss(page, name) {
  const path = `${SS_DIR}/${String(++ssIdx).padStart(2,"0")}_${name}.png`;
  await page.screenshot({ path, fullPage: false });
  console.log(`  📸 ${path}`);
}

function log(msg) { console.log(`[${new Date().toISOString().slice(11,19)}] ${msg}`); }

async function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

async function newPage(browser) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  return { ctx, page };
}

// ── TEST 1: 이메일 회원가입 ──────────────────────────────
async function testEmailSignup(browser) {
  log("═══ TEST 1: 이메일 회원가입 ═══");
  const { ctx, page } = await newPage(browser);
  await page.goto(`${SITE}/more`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await wait(2000);
  await ss(page, "01_more_initial");

  // 회원가입 버튼 찾기
  const allBtns = await page.locator("button").allInnerTexts();
  log(`  버튼 목록: ${allBtns.join(" | ")}`);

  const signupBtn = page.getByRole("button", { name: /회원가입/i });
  await signupBtn.click();
  await wait(1000);
  await ss(page, "02_signup_form");

  // form 내 필드 확인
  const inputs = await page.locator("input").all();
  log(`  인풋 수: ${inputs.length}`);
  for (const inp of inputs) {
    const t = await inp.getAttribute("type");
    log(`    - input type="${t}"`);
  }

  // 이용약관 체크박스
  const cb = page.locator('input[type="checkbox"]');
  if (await cb.count() > 0) { await cb.first().check(); log("  체크박스 체크 완료"); }

  const email = `autotest_${Date.now()}@yopmail.com`;
  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[type="password"]').fill("Test1234!!");
  await ss(page, "03_signup_filled");

  // 제출 버튼 — type="submit" 또는 텍스트 기반
  const submitBtn = page.locator('button[type="submit"]').or(
    page.getByRole("button", { name: /가입|회원가입|확인|제출/i })
  ).first();
  log(`  제출 버튼 텍스트: ${await submitBtn.innerText().catch(() => "N/A")}`);
  await submitBtn.click({ timeout: 10000 });
  await wait(3000);
  await ss(page, "04_signup_result");

  const bodyText = await page.locator("body").innerText();
  log(`  결과 화면:\n    ${bodyText.slice(0, 300).replace(/\n/g, "\n    ")}`);

  await ctx.close();
}

// ── TEST 2: 잘못된 비밀번호 로그인 ──────────────────────
async function testWrongLogin(browser) {
  log("═══ TEST 2: 잘못된 비밀번호 로그인 ═══");
  const { ctx, page } = await newPage(browser);
  await page.goto(`${SITE}/more`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await wait(2000);

  await page.getByRole("button", { name: /로그인/i }).first().click();
  await wait(800);
  await ss(page, "05_login_form");

  await page.locator('input[type="email"]').fill("sunryupatners@gmail.com");
  await page.locator('input[type="password"]').fill("WrongPass999!!");

  const submitBtn = page.locator('button[type="submit"]').or(
    page.getByRole("button", { name: /로그인|확인/i })
  ).first();
  await submitBtn.click({ timeout: 10000 });
  await wait(2500);
  await ss(page, "06_login_wrong_result");

  const bodyText = await page.locator("body").innerText();
  const hasError = bodyText.includes("올바르지") || bodyText.includes("오류") || bodyText.includes("실패") || bodyText.includes("잘못");
  log(`  에러 표시: ${hasError ? "✅ 있음" : "❌ 없음"}`);
  log(`  결과:\n    ${bodyText.slice(0, 200).replace(/\n/g, "\n    ")}`);

  await ctx.close();
}

// ── TEST 3: Google 소셜 로그인 버튼 ─────────────────────
async function testGoogleBtn(browser) {
  log("═══ TEST 3: Google OAuth 버튼 클릭 ═══");
  const { ctx, page } = await newPage(browser);
  await page.goto(`${SITE}/more`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await wait(2000);

  const googleBtn = page.getByRole("button", { name: /google/i }).first();
  log(`  버튼 텍스트: ${await googleBtn.innerText().catch(() => "N/A")}`);
  await googleBtn.click();

  try {
    await page.waitForURL(/accounts\.google\.com|supabase\.co/, { timeout: 8000 });
    const url = page.url();
    log(`  ✅ 리다이렉트 성공 → ${url.slice(0, 80)}`);
  } catch {
    await ss(page, "07_google_fail");
    log(`  ❌ 리다이렉트 실패. URL: ${page.url()}`);
  }

  await ctx.close();
}

// ── TEST 4: Kakao 소셜 로그인 버튼 ──────────────────────
async function testKakaoBtn(browser) {
  log("═══ TEST 4: Kakao OAuth 버튼 클릭 ═══");
  const { ctx, page } = await newPage(browser);
  await page.goto(`${SITE}/more`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await wait(2000);

  const kakaoBtn = page.getByRole("button", { name: /카카오/i }).first();
  await kakaoBtn.click();

  try {
    await page.waitForURL(/kauth\.kakao\.com|supabase\.co/, { timeout: 8000 });
    log(`  ✅ 리다이렉트 성공 → ${page.url().slice(0, 80)}`);
  } catch {
    await ss(page, "08_kakao_fail");
    log(`  ❌ 실패. URL: ${page.url()}`);
  }

  await ctx.close();
}

// ── TEST 5: Naver 소셜 로그인 버튼 ──────────────────────
async function testNaverBtn(browser) {
  log("═══ TEST 5: Naver OAuth 버튼 클릭 ═══");
  const { ctx, page } = await newPage(browser);
  await page.goto(`${SITE}/more`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await wait(2000);

  const naverBtn = page.getByRole("button", { name: /네이버/i }).first();
  await naverBtn.click();

  try {
    await page.waitForURL(/nid\.naver\.com|investus\.kr\/api\/auth\/naver/, { timeout: 10000 });
    const url = page.url();
    if (url.includes("nid.naver.com")) {
      log(`  ✅ 네이버 로그인 페이지 도달 → ${url.slice(0, 80)}`);
    } else {
      log(`  ⚠️  중간 URL: ${url}`);
    }
  } catch {
    await ss(page, "09_naver_fail");
    log(`  ❌ 실패. URL: ${page.url()}`);
  }

  await ctx.close();
}

// ── TEST 6: 비밀번호 재설정 이메일 ──────────────────────
async function testPasswordReset(browser) {
  log("═══ TEST 6: 비밀번호 재설정 이메일 발송 ═══");
  const { ctx, page } = await newPage(browser);
  await page.goto(`${SITE}/more`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await wait(2000);

  await page.getByRole("button", { name: /로그인/i }).first().click();
  await wait(800);

  // 비밀번호 찾기 링크
  const forgotBtn = page.getByRole("button", { name: /비밀번호.*찾|찾기|재설정/i });
  if (await forgotBtn.count() > 0) {
    await forgotBtn.first().click();
    await wait(500);
    await page.locator('input[type="email"]').fill("sunryupatners@gmail.com");

    const submitBtn = page.locator('button[type="submit"]').first();
    await submitBtn.click({ timeout: 10000 });
    await wait(2500);
    await ss(page, "10_reset_result");

    const bodyText = await page.locator("body").innerText();
    log(`  결과:\n    ${bodyText.slice(0, 200).replace(/\n/g, "\n    ")}`);
  } else {
    log("  ⚠️  비밀번호 찾기 버튼 없음");
  }

  await ctx.close();
}

// ── MAIN ─────────────────────────────────────────────────
(async () => {
  log("Chromium 시작...");
  const browser = await chromium.launch({ headless: true });

  try {
    await testEmailSignup(browser);
    await testWrongLogin(browser);
    await testGoogleBtn(browser);
    await testKakaoBtn(browser);
    await testNaverBtn(browser);
    await testPasswordReset(browser);
  } catch(e) {
    console.error("치명적 오류:", e);
  } finally {
    await browser.close();
    log("완료");
  }
})();
