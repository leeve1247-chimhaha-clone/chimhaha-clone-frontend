import { describe, it, expect } from "vitest";
import {
  defaultPostDetailSlice,
  setLikes,
} from "./defaultPostDetailSlice.tsx";
import { defaultPostDetailInitialState } from "./defaultPostDetailInitialState.tsx";

describe("defaultPostDetailSlice", () => {
  const reducer = defaultPostDetailSlice.reducer;

  it("returns initial state for unknown action", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(
      defaultPostDetailInitialState,
    );
  });

  it("setLikes stores likes count and selfLiked flag", () => {
    const next = reducer(
      defaultPostDetailInitialState,
      setLikes({ likes: 5, selfLiked: true }),
    );
    expect(next.likes).toEqual({ likes: 5, selfLiked: true });
  });

  it("setLikes overwrites previous value", () => {
    const first = reducer(
      defaultPostDetailInitialState,
      setLikes({ likes: 5, selfLiked: true }),
    );
    const next = reducer(first, setLikes({ likes: 4, selfLiked: false }));
    expect(next.likes).toEqual({ likes: 4, selfLiked: false });
  });
});
