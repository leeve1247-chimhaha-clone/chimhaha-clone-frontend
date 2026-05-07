import "@testing-library/jest-dom/vitest";
import { afterEach, beforeAll, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import { webcrypto } from "node:crypto";
import { mswServer } from "./src/test/mswServer.ts";

// jsdom defines globalThis.crypto using its own realm's ArrayBuffer, which
// the Node-side WebCrypto in vitest then rejects with "2nd argument is not
// instance of ArrayBuffer". Force a single realm by always using Node's
// webcrypto in tests.
Object.defineProperty(globalThis, "crypto", {
  value: webcrypto,
  configurable: true,
});

beforeAll(() => mswServer.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  cleanup();
  mswServer.resetHandlers();
});
afterAll(() => mswServer.close());
