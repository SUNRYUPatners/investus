import { chromium } from "playwright";

const SITE = "https://investus.kr";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();

  await page.goto(`${SITE}/more`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(2000);

  // 로그인 폼 열기
  await page.getByRole("button", { name: /로그인/i }).first().click();
  await page.waitForTimeout(1000);

  // 비밀번호 찾기 버튼 (모든 버튼 확인)
  const allBtns = await page.locator("button").allInnerTexts();
  console.log("버튼 목록:", allBtns.join(" | "));

  // "비밀번호 찾기" 텍스트가 포함된 버튼 클릭
  const forgotBtn = page.locator("button", { hasText: "비밀번호 찾기" });
  const cnt = await forgotBtn.count();
  console.log("비밀번호 찾기 버튼 수:", cnt);

  if (cnt > 0) {
    await forgotBtn.first().click();
    await page.waitForTimeout(800);

    // 이메일 입력
    await page.locator('input[type="email"]').fill("sunryupatners@gmail.com");

    // 모든 버튼 다시 확인
    const btns2 = await page.locator("button").allInnerTexts();
    console.log("재설정 폼 버튼들:", btns2.join(" | "));

    // 제출 — type=submit 또는 "재설정 메일 보내기" 텍스트
    const submitBtn = page.locator("button").filter({ hasText: /재설정|보내기|메일/ }).first();
    const submitCnt = await submitBtn.count();
    console.log("제출 버튼 수:", submitCnt);

    if (submitCnt > 0) {
      await submitBtn.click({ timeout: 5000 });
      await page.waitForTimeout(3000);

      const body = await page.locator("body").innerText();
      const success = body.includes("발송") || body.includes("이메일") || body.includes("보냈") || body.includes("확인");
      console.log(success ? "✅ PASS — 재설정 이메일 발송 완료" : "❌ FAIL");
      console.log("결과:", body.slice(0, 300));
    } else {
      // 폼에서 직접 submit 이벤트
      await page.locator("form").last().press("Enter");
      await page.waitForTimeout(3000);
      const body = await page.locator("body").innerText();
      console.log("Enter 후 결과:", body.slice(0, 300));
    }
  }

  await browser.close();
})();
