import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen } from "@testing-library/react";

vi.mock("react-oidc-context");
vi.mock("./NoticeListComponent.tsx", () => ({
  NoticeListComponent: ({ long }: { long?: boolean }) => (
    <div data-testid={long ? "notice-list-long" : "notice-list"} />
  ),
}));
vi.mock("./PopularComponent.tsx", () => ({
  PopularComponent: () => <div data-testid="popular" />,
}));
vi.mock("./YoutubeCard/PostListYoutubeCards.tsx", () => ({
  PostListYoutubeCards: () => <div data-testid="youtube-cards" />,
}));

import { PostListComponents } from "./PostListComponents.tsx";
import {
  makeTestQueryClient,
  mockUseAuth,
  renderWithRouter,
} from "../../../test/testUtils.tsx";
import { mswServer, http, HttpResponse } from "../../../test/mswServer.ts";
import { CData } from "../../../../credential/data.ts";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import type { PostProps } from "./PostProps.tsx";

const BACKEND = CData.local_backend;

function makePost(overrides: Partial<PostProps> = {}): PostProps {
  return {
    title: "샘플 글",
    content: "",
    username: "tester",
    status: "ok",
    views: 12,
    category: "free",
    post: "",
    createdDate: new Date(Date.now() - 60_000).toISOString(),
    likes: 0,
    postId: 7,
    ...overrides,
  };
}

interface RenderOpts {
  authenticated?: boolean;
  path?: string;
  withRouterCache?: boolean;
}

function renderList({
  authenticated = false,
  path = "/free",
  withRouterCache = true,
}: RenderOpts = {}) {
  mockUseAuth(
    authenticated
      ? { isAuthenticated: true, user: { access_token: "tok" } as never }
      : { isAuthenticated: false, user: undefined },
  );
  const queryClient = makeTestQueryClient();
  if (withRouterCache) {
    queryClient.setQueryData(queryKeys.RouterDataFlat, [
      { key: "free", korean: "자유" },
    ]);
  }
  return renderWithRouter({
    queryClient,
    initialEntries: [path],
    routes: [
      {
        path: "/",
        children: [
          { index: true, element: <PostListComponents /> },
          { path: ":category", element: <PostListComponents /> },
        ],
      },
    ],
  });
}

describe("PostListComponents", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the board header and post cards on /:category (unauthenticated)", async () => {
    mswServer.use(
      http.get(`${BACKEND}/posts`, ({ request }) => {
        expect(new URL(request.url).searchParams.get("category")).toBe("free");
        return HttpResponse.json([
          makePost({ title: "첫 글", postId: 1 }),
          makePost({ title: "둘째 글", postId: 2 }),
        ]);
      }),
    );

    renderList({ path: "/free" });

    expect(await screen.findByText("자유 게시판")).toBeInTheDocument();
    expect(screen.getByText("첫 글")).toBeInTheDocument();
    expect(screen.getByText("둘째 글")).toBeInTheDocument();
    expect(screen.queryByText("글쓰기")).not.toBeInTheDocument();
    expect(screen.getByTestId("notice-list-long")).toBeInTheDocument();
  });

  it("renders the 글쓰기 button when authenticated", async () => {
    mswServer.use(
      http.get(`${BACKEND}/posts`, () =>
        HttpResponse.json([makePost({ title: "글", postId: 1 })]),
      ),
    );

    renderList({ authenticated: true, path: "/free" });

    expect(await screen.findByText("자유 게시판")).toBeInTheDocument();
    expect(screen.getByText("글쓰기")).toBeInTheDocument();
  });

  it("renders the home blocks (youtube/notice/popular) on /", async () => {
    mswServer.use(
      http.get(`${BACKEND}/posts`, () => HttpResponse.json([])),
    );

    renderList({ path: "/" });

    expect(await screen.findByTestId("youtube-cards")).toBeInTheDocument();
    expect(screen.getByTestId("notice-list")).toBeInTheDocument();
    expect(screen.getByTestId("popular")).toBeInTheDocument();
    expect(screen.queryByText("자유 게시판")).not.toBeInTheDocument();
  });

  it("shows 'No data' when fetchPostList resolves to undefined", async () => {
    mswServer.use(
      http.get(`${BACKEND}/posts`, () =>
        HttpResponse.json({}, { status: 500 }),
      ),
    );

    renderList({ path: "/free" });

    expect(await screen.findByText("No data")).toBeInTheDocument();
  });

  it("shows the cache-loading placeholder when RouterDataFlat is not cached", async () => {
    mswServer.use(
      http.get(`${BACKEND}/posts`, () =>
        HttpResponse.json([makePost({ title: "글", postId: 1 })]),
      ),
    );

    renderList({ path: "/free", withRouterCache: false });

    expect(await screen.findByText("캐시 불러오는 중...")).toBeInTheDocument();
  });
});
