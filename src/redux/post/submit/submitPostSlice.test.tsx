import { describe, it, expect } from "vitest";
import {
  submitPostSlice,
  setTitle,
  setCategory,
  initSubmits,
} from "./submitPostSlice.tsx";
import { submitPostInitialState } from "./submitPostInitialState.tsx";

describe("submitPostSlice", () => {
  const reducer = submitPostSlice.reducer;

  it("returns initial state for unknown action", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(submitPostInitialState);
  });

  it("setTitle stores the payload on state.title", () => {
    const next = reducer(submitPostInitialState, setTitle("Hello"));
    expect(next.title).toBe("Hello");
  });

  it("setCategory stores the payload on state.category", () => {
    const next = reducer(submitPostInitialState, setCategory("free"));
    expect(next.category).toBe("free");
  });

  it("initSubmits resets state to initial values", () => {
    const dirty = reducer(submitPostInitialState, setTitle("dirty"));
    expect(dirty.title).toBe("dirty");

    const reset = reducer(dirty, initSubmits());
    expect(reset).toEqual(submitPostInitialState);
  });
});
