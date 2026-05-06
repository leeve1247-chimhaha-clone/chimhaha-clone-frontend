import { test } from "./fixtures";

test("debug: /save request intercept", async ({ page }) => {
  page.on("request", (req) => {
    if (req.url().includes("/save") && req.method() === "POST") {
      console.log("[intercept] auth:", req.headers()["authorization"]?.substring(0, 60));
      console.log("[intercept] body:", req.postData()?.substring(0, 400));
    }
  });
  page.on("response", async (res) => {
    if (res.url().includes("/save")) {
      const body = await res.text();
      console.log("[intercept] response status:", res.status(), "body:", JSON.stringify(body));
    }
  });

  await page.goto("/STORY/submit");
  await page.waitForSelector('button:has-text("로그아웃")', { timeout: 10000 });
  await page.getByPlaceholder("제목을 입력하세요").fill("debug test");
  await page.getByPlaceholder("제목을 입력하세요").press("Enter");
  await page.locator('div[contenteditable="true"]').click();
  await page.locator('div[contenteditable="true"]').type("debug content");
  await page.getByRole("button", { name: "등록" }).click();
  await page.waitForTimeout(5000);
  console.log("[intercept] final URL:", page.url());
});
