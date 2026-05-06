import "@testing-library/jest-dom/vitest";
import { afterEach, beforeAll, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import { mswServer } from "./src/test/mswServer.ts";

beforeAll(() => mswServer.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  cleanup();
  mswServer.resetHandlers();
});
afterAll(() => mswServer.close());
