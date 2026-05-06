import { describe, it, expect } from "vitest";
import {
  commentRootComponentSlice,
  setCommentPage,
  setFocusedButton,
  setEditableCommentId,
  setCommentLike,
  initComments,
} from "./commentRootComponentSlice.tsx";
import { commentRootComponentInitialState } from "./commentRootComponentInitialState.tsx";

describe("commentRootComponentSlice", () => {
  const reducer = commentRootComponentSlice.reducer;

  it("returns initial state for unknown action", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(
      commentRootComponentInitialState,
    );
  });

  it("setCommentPage stores the payload on state.commentPage", () => {
    const next = reducer(commentRootComponentInitialState, setCommentPage(3));
    expect(next.commentPage).toBe(3);
  });

  it("setFocusedButton stores the payload on state.focusedButton", () => {
    const next = reducer(
      commentRootComponentInitialState,
      setFocusedButton("reply"),
    );
    expect(next.focusedButton).toBe("reply");
  });

  it("setEditableCommentId stores the payload on state.editableCommentId", () => {
    const next = reducer(
      commentRootComponentInitialState,
      setEditableCommentId("c-42"),
    );
    expect(next.editableCommentId).toBe("c-42");
  });

  it("setCommentLike updates a per-comment entry in state.commentLikes", () => {
    const next = reducer(
      commentRootComponentInitialState,
      setCommentLike({ commentId: "c-1", likes: 7, selfLiked: true }),
    );
    expect(next.commentLikes["c-1"]).toEqual({ likes: 7, selfLiked: true });
  });

  it("setCommentLike preserves entries for other commentIds", () => {
    const first = reducer(
      commentRootComponentInitialState,
      setCommentLike({ commentId: "c-1", likes: 1, selfLiked: false }),
    );
    const next = reducer(
      first,
      setCommentLike({ commentId: "c-2", likes: 2, selfLiked: true }),
    );
    expect(next.commentLikes["c-1"]).toEqual({ likes: 1, selfLiked: false });
    expect(next.commentLikes["c-2"]).toEqual({ likes: 2, selfLiked: true });
  });

  it("initComments resets state to initial values", () => {
    const dirty = reducer(
      commentRootComponentInitialState,
      setCommentPage(99),
    );
    const reset = reducer(dirty, initComments());
    expect(reset).toEqual(commentRootComponentInitialState);
  });
});
