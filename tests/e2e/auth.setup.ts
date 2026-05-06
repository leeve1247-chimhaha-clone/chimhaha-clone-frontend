import { test as setup, expect } from "@playwright/test";
import fs from "fs";
import { TOKEN_CACHE_PATH, type TokenResponse } from "./global-setup";

const AUTH_FILE = "tests/e2e/.auth/user.json";
const AUTHORITY = "https://localhost:8090/realms/clone";
const CLIENT_ID = "localhost";

// oidc-client-ts 가 sessionStorage 에 저장하는 키 형식
const OIDC_STORAGE_KEY = `oidc.user:${AUTHORITY}:${CLIENT_ID}`;

function decodeJwtPayload(token: string): Record<string, unknown> {
  const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(Buffer.from(base64, "base64").toString("utf-8")) as Record<string, unknown>;
}

setup.setTimeout(30000);

setup("토큰 주입으로 로그인 상태 설정", async ({ page }) => {
  const tokenRaw = fs.readFileSync(TOKEN_CACHE_PATH, "utf-8");
  const token = JSON.parse(tokenRaw) as TokenResponse;

  const profile = decodeJwtPayload(token.id_token);

  const oidcUser = {
    id_token: token.id_token,
    session_state: token.session_state,
    access_token: token.access_token,
    refresh_token: token.refresh_token,
    token_type: token.token_type,
    scope: token.scope,
    profile,
    expires_at: Math.floor(Date.now() / 1000) + token.expires_in,
  };

  // 앱 페이지 로드 후 sessionStorage 에 토큰 주입
  await page.goto("/");
  await page.evaluate(
    ({ key, value }) => sessionStorage.setItem(key, JSON.stringify(value)),
    { key: OIDC_STORAGE_KEY, value: oidcUser }
  );

  // 페이지 리로드 → react-oidc-context 가 sessionStorage 에서 토큰을 읽어 로그인 상태로 전환
  await page.reload();

  await expect(page.getByRole("button", { name: "로그아웃" })).toBeVisible({ timeout: 10000 });

  await page.context().storageState({ path: AUTH_FILE });
});
