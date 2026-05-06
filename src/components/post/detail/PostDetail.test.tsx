import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";

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
    );

    renderPostDetail({ authenticated: true });

    await screen.findByText("안녕 디테일");
    expect(screen.getByText("스크랩 추가")).toBeInTheDocument();
    expect(screen.getByText("싫어요")).toBeInTheDocument();
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
});
