import { test as base, expect } from "@playwright/test";
import fs from "fs";
import { TOKEN_CACHE_PATH, type TokenResponse } from "./global-setup";

const AUTHORITY = "https://localhost:8090/realms/clone";
const CLIENT_ID = "localhost";
const OIDC_STORAGE_KEY = `oidc.user:${AUTHORITY}:${CLIENT_ID}`;

function decodeJwtPayload(token: string): Record<string, unknown> {
  const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(Buffer.from(base64, "base64").toString("utf-8")) as Record<string, unknown>;
}

// oidc 인증 상태를 sessionStorage에 주입하는 커스텀 page 픽스처
export const test = base.extend<{ page: ReturnType<typeof base>["page"] }>({
  page: async ({ page }, use) => {
    const tokenRaw = fs.readFileSync(TOKEN_CACHE_PATH, "utf-8");
    const token = JSON.parse(tokenRaw) as TokenResponse;
    const profile = decodeJwtPayload(token.id_token);

    const oidcUser = {
      id_token: token.id_token,
      session_state: token.session_state ?? "",
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      token_type: token.token_type,
      scope: token.scope,
      profile,
      expires_at: Math.floor(Date.now() / 1000) + token.expires_in,
    };

    // addInitScript: 페이지 스크립트보다 먼저 실행 → oidc-client-ts 초기화 전에 sessionStorage 세팅
    await page.addInitScript(
      ({ key, value }: { key: string; value: unknown }) => {
        sessionStorage.setItem(key, JSON.stringify(value));
      },
      { key: OIDC_STORAGE_KEY, value: oidcUser }
    );

    await use(page);
  },
});

export { expect };
