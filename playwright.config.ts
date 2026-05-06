import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  retries: 0,
  workers: 1,

  use: {
    baseURL: "http://localhost:5173",
    ignoreHTTPSErrors: true, // Keycloak self-signed cert
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "setup",
      testMatch: "**/*.setup.ts",
    },
    {
      name: "e2e",
      use: {
        ...devices["Desktop Chrome"],
        // 인증은 fixtures.ts의 addInitScript 방식으로 처리 (sessionStorage → storageState 미지원)
      },
      dependencies: ["setup"],
    },
  ],

  globalSetup: "./tests/e2e/global-setup.ts",
});
