import { describe, it, expect } from "vitest";
import { accountSlice, setNickName } from "./accountSlice.tsx";
import { accountInitialState } from "./accountInitialState.tsx";

describe("accountSlice", () => {
  const reducer = accountSlice.reducer;

  it("returns initial state for unknown action", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(accountInitialState);
  });

  it("setNickName stores the payload on state.nickName", () => {
    const next = reducer(accountInitialState, setNickName("foo"));
    expect(next.nickName).toBe("foo");
  });
});
