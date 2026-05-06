import { describe, it, expect } from "vitest";
import { dropDownSlice, setHeaderDropDownStatus } from "./dropDownSlice.tsx";
import { dropDownInitialState } from "./dropDownInitialState.tsx";

describe("dropDownSlice", () => {
  const reducer = dropDownSlice.reducer;

  it("returns initial state for unknown action", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(dropDownInitialState);
  });

  it("setHeaderDropDownStatus stores the payload on state.value", () => {
    const next = reducer(dropDownInitialState, setHeaderDropDownStatus("open"));
    expect(next.value).toBe("open");
  });
});
