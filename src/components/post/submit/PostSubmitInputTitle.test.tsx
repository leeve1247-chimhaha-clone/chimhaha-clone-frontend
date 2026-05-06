import { describe, it, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PostSubmitInputTitle } from "./PostSubmitInputTitle.tsx";
import {
  makeTestQueryClient,
  makeTestStore,
  renderWithProviders,
  setLocationSearch,
} from "../../../test/testUtils.tsx";
import { queryKeys } from "../../../react-query/queryKeys.tsx";

describe("PostSubmitInputTitle", () => {
  beforeEach(() => {
    setLocationSearch("");
  });

  it("renders the placeholder", () => {
    renderWithProviders(<PostSubmitInputTitle />);
    expect(screen.getByPlaceholderText("제목을 입력하세요")).toBeInTheDocument();
  });

  it("typing updates the displayed value", async () => {
    const user = userEvent.setup();
    renderWithProviders(<PostSubmitInputTitle />);

    const input = screen.getByPlaceholderText<HTMLInputElement>("제목을 입력하세요");
    await user.type(input, "안녕하세요");

    expect(input.value).toBe("안녕하세요");
  });

  it("blur dispatches setTitle with the current value", async () => {
    const user = userEvent.setup();
    const store = makeTestStore();
    renderWithProviders(<PostSubmitInputTitle />, { store });

    const input = screen.getByPlaceholderText("제목을 입력하세요");
    await user.type(input, "Hello");
    await user.tab();

    expect(store.getState().submitPostStatus.title).toBe("Hello");
  });

  it("Enter key dispatches setTitle with the current value", async () => {
    const user = userEvent.setup();
    const store = makeTestStore();
    renderWithProviders(<PostSubmitInputTitle />, { store });

    const input = screen.getByPlaceholderText("제목을 입력하세요");
    await user.type(input, "World{Enter}");

    expect(store.getState().submitPostStatus.title).toBe("World");
  });

  it("dispatches setTitle from cached PostDetail when ?postId is present", () => {
    setLocationSearch("?postId=42");

    const queryClient = makeTestQueryClient();
    queryClient.setQueryData([...queryKeys.PostDetail, "42"], {
      title: "기존 제목",
      username: "u",
      postId: "42",
      userAuthId: "uid",
      likes: 0,
      views: 0,
      category: "free",
      createdDate: "",
      content: { root: {} },
      comments: [],
      selfLiked: false,
    });

    const store = makeTestStore();
    renderWithProviders(<PostSubmitInputTitle />, { store, queryClient });

    expect(store.getState().submitPostStatus.title).toBe("기존 제목");
    const input = screen.getByPlaceholderText<HTMLInputElement>("제목을 입력하세요");
    expect(input.value).toBe("기존 제목");
  });
});
