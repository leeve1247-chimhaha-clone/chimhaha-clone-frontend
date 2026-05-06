import { test, expect } from "./fixtures";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_CATEGORY = "STORY"; // mysql-init.sql id=36, key=STORY, korean=이야기 & 썰
const TEST_TITLE = `[E2E] 자동화 테스트 게시글 ${Date.now()}`;
const TEST_CONTENT = "Playwright E2E 테스트로 작성된 게시글입니다.";
const TEST_IMAGE = path.resolve(__dirname, "fixtures/test-image.png");

test.describe("게시글 작성 플로우", () => {
  test("로그인 → 게시글 작성 → 이미지 첨부 → 등록 → 상세 페이지 확인", async ({ page }) => {
    // 1. 게시글 작성 페이지로 이동
    await page.goto(`/${TEST_CATEGORY}/submit`);

    // 로그인 상태 확인 (storageState에서 복원됨)
    await expect(page.getByRole("button", { name: "로그아웃" })).toBeVisible({ timeout: 10000 });

    // 2. 제목 입력
    const titleInput = page.getByPlaceholder("제목을 입력하세요");
    await titleInput.fill(TEST_TITLE);
    await titleInput.press("Enter"); // Redux에 title 반영 (onKeyDown handler)

    // 3. 에디터 본문 입력 (Lexical contenteditable)
    const editor = page.locator('div[contenteditable="true"]');
    await editor.click();
    await editor.type(TEST_CONTENT);

    // 4. 이미지 첨부 (툴바 숨겨진 file input에 직접 파일 설정)
    const fileInput = page.locator('input[type="file"][accept="image/*"]');
    await fileInput.setInputFiles(TEST_IMAGE);

    // 이미지 업로드 완료 대기: presigned PUT 요청이 끝난 후 이미지 src가 data: 에서 http:// 로 변경됨
    await page.waitForResponse(
      (response) => response.url().includes("/get/presigned-post") && response.status() === 200,
      { timeout: 15000 }
    );
    // SeaweedFS 업로드 완료까지 추가 대기
    await page.waitForFunction(
      () => {
        const imgs = document.querySelectorAll('div[contenteditable="true"] img');
        return [...imgs].every((img) => !(img as HTMLImageElement).src.startsWith("data:"));
      },
      { timeout: 15000 }
    );

    // 5. 등록 버튼 클릭 (savePost 응답을 캡처해서 navigate 인자 확인)
    const [saveResponse] = await Promise.all([
      page.waitForResponse(
        (r) => r.url().includes("/save") && r.request().method() === "POST",
        { timeout: 10000 }
      ),
      page.getByRole("button", { name: "등록" }).click(),
    ]);
    const savedPostId = await saveResponse.text();
    console.log("[debug] /save status:", saveResponse.status(), "url:", saveResponse.url());
    console.log("[debug] /save body:", JSON.stringify(savedPostId), "→ navigate:", "/" + TEST_CATEGORY + "/" + savedPostId.trim());
    await page.screenshot({ path: "test-results/debug-after-click.png" });

    // 6. 게시글 상세 페이지로 이동 확인
    await page.waitForURL(new RegExp(`/${TEST_CATEGORY}/\\d+`), { timeout: 15000 });

    // 7. 제목과 본문이 올바르게 표시되는지 확인
    await expect(page.getByText(TEST_TITLE)).toBeVisible();
    await expect(page.getByText(TEST_CONTENT)).toBeVisible();

    // 8. 첨부 이미지가 렌더링되는지 확인
    const uploadedImage = page.locator("img").filter({ hasNot: page.locator("[data-hidden]") }).first();
    await expect(uploadedImage).toBeVisible({ timeout: 10000 });
  });
});
