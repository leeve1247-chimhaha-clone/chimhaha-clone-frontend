import { describe, it, expect } from "vitest";
import { themeSlice, setTheme } from "./themeSlice.tsx";
import { themeInitialState } from "./themeInitialState.tsx";

describe("themeSlice", () => {
  const reducer = themeSlice.reducer;

  it("returns initial state for unknown action", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(themeInitialState);
  });

  it("setTheme stores the payload on state.theme", () => {
    const next = reducer(themeInitialState, setTheme("dark"));
    expect(next.theme).toBe("dark");
  });
});
