import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("react-oidc-context");
vi.mock("../../wysiwyg/lexical/Lexical.tsx", () => ({
  Lexical: () => <div data-testid="lexical-mock" />,
}));
vi.mock("../../comment/CommentRootComponent.tsx", () => ({
  CommentRootComponent: () => <div data-testid="comment-root-mock" />,
}));

import { PostDetail } from "./PostDetail.tsx";
import {
  makeTestQueryClient,
  mockUseAuth,
  renderWithRouter,
} from "../../../test/testUtils.tsx";
import { mswServer, http, HttpResponse } from "../../../test/mswServer.ts";
import { CData } from "../../../../credential/data.ts";
import { queryKeys } from "../../../react-query/queryKeys.tsx";

const BACKEND = CData.local_backend;

const samplePost = {
  postId: "42",
  title: "안녕 디테일",
  username: "tester",
  userAuthId: "uid-1",
  likes: 3,
  views: 100,
  category: "free",
  createdDate: new Date(Date.now() - 60_000).toISOString(),
  content: { root: {} },
  comments: [],
  selfLiked: false,
};

function renderPostDetail({ authenticated = false } = {}) {
  mockUseAuth(
    authenticated
      ? { isAuthenticated: true, user: { access_token: "tok" } as never }
      : { isAuthenticated: false, user: undefined },
  );
  const queryClient = makeTestQueryClient();
  queryClient.setQueryData(queryKeys.RouterDataFlat, [
    { key: "free", korean: "자유" },
  ]);
  return renderWithRouter({
    queryClient,
    initialEntries: ["/free/42"],
    routes: [
      {
        path: "/",
        children: [
          {
            path: ":category",
            children: [{ path: ":postId", element: <PostDetail /> }],
          },
        ],
      },
    ],
  });
}

describe("PostDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the post title and child placeholders on a 200 response", async () => {
    mswServer.use(
      http.get(`${BACKEND}/posts/detail`, ({ request }) => {
        expect(new URL(request.url).searchParams.get("num")).toBe("42");
        return HttpResponse.json(samplePost);
      }),
    );

    renderPostDetail();

    expect(await screen.findByText("안녕 디테일")).toBeInTheDocument();
    expect(screen.getByTestId("lexical-mock")).toBeInTheDocument();
    expect(screen.getByTestId("comment-root-mock")).toBeInTheDocument();
  });

  it("renders an error message when the fetch fails", async () => {
    mswServer.use(
      http.get(`${BACKEND}/posts/detail`, () =>
        HttpResponse.json({}, { status: 500 }),
      ),
    );

    renderPostDetail();

    await waitFor(() => {
      expect(screen.getByText(/^Error:/)).toBeInTheDocument();
    });
  });

  it("renders the auth-only block when the user is authenticated", async () => {
    mswServer.use(
      http.get(`${BACKEND}/posts/detail`, () => HttpResponse.json(samplePost)),
      http.get(`${BACKEND}/posts`, () => HttpResponse.json([])),
    );

    renderPostDetail({ authenticated: true });

    await screen.findByText("안녕 디테일");
    expect(screen.getByText("스크랩 추가")).toBeInTheDocument();
    expect(screen.getByText("싫어요")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /이전글/ })).toBeDisabled();
    expect(screen.getByRole("button", { name: /다음글/ })).toBeDisabled();
  });

  it("hides the auth-only block when the user is not authenticated", async () => {
    mswServer.use(
      http.get(`${BACKEND}/posts/detail`, () => HttpResponse.json(samplePost)),
    );

    renderPostDetail({ authenticated: false });

    await screen.findByText("안녕 디테일");
    expect(screen.queryByText("스크랩 추가")).not.toBeInTheDocument();
    expect(screen.queryByText("싫어요")).not.toBeInTheDocument();
  });

  function renderWithCachedList(currentPostId: string) {
    mswServer.use(
      http.get(`${BACKEND}/posts/detail`, () => HttpResponse.json(samplePost)),
    );
    mockUseAuth({ isAuthenticated: true, user: { access_token: "tok" } as never });
    const queryClient = makeTestQueryClient();
    queryClient.setQueryData(queryKeys.RouterDataFlat, [
      { key: "free", korean: "자유" },
    ]);
    queryClient.setQueryData(["PostList", "free"], [
      { postId: 41, category: "free", title: "이전 게시글" },
      { postId: 42, category: "free", title: "현재 게시글" },
      { postId: 43, category: "free", title: "다음 게시글" },
    ]);
    return renderWithRouter({
      queryClient,
      initialEntries: [`/free/${currentPostId}`],
      routes: [
        {
          path: "/",
          children: [
            {
              path: ":category",
              children: [{ path: ":postId", element: <PostDetail /> }],
            },
          ],
        },
      ],
    });
  }

  it("navigates to the previous post when the prev button is clicked", async () => {
    const { router } = renderWithCachedList("42");
    await screen.findByText("안녕 디테일");

    const prevButton = screen.getByRole("button", { name: /이전글/ });
    expect(prevButton).not.toBeDisabled();

    await userEvent.setup().click(prevButton);
    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/free/41");
    });
  });

  it("navigates to the next post when the next button is clicked", async () => {
    const { router } = renderWithCachedList("42");
    await screen.findByText("안녕 디테일");

    const nextButton = screen.getByRole("button", { name: /다음글/ });
    expect(nextButton).not.toBeDisabled();

    await userEvent.setup().click(nextButton);
    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/free/43");
    });
  });

  it("navigates to the category list when the list button is clicked", async () => {
    const { router } = renderWithCachedList("42");
    await screen.findByText("안녕 디테일");

    await userEvent.setup().click(screen.getByRole("button", { name: /목록/ }));
    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/free");
    });
  });
});
