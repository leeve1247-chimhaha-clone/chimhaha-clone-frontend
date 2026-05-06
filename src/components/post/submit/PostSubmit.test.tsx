import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const { lexicalState } = vi.hoisted(() => ({
  lexicalState: {
    json: {
      root: {
        type: "root",
        children: [
          { type: "paragraph", children: [{ type: "text", text: "hi" }] },
        ],
      },
    } as unknown,
  },
}));

const NON_EMPTY_JSON_DEFAULT = lexicalState.json;

vi.mock("react-oidc-context");
vi.mock("../../wysiwyg/lexical/Lexical.tsx", () => ({
  Lexical: ({
    ref,
  }: {
    ref?: { current: unknown } | ((value: unknown) => void);
  }) => {
    const fakeEditor = {
      read: (fn: () => void) => fn(),
      getEditorState: () => ({ toJSON: () => lexicalState.json }),
    };
    if (typeof ref === "function") {
      ref(fakeEditor);
    } else if (ref) {
      ref.current = fakeEditor;
    }
    return <div data-testid="lexical-mock" />;
  },
}));
vi.mock("./header/PostSubmitHeader.tsx", () => ({
  PostSubmitHeader: () => <div data-testid="header-mock" />,
}));

import { PostSubmit } from "./PostSubmit.tsx";
import {
  makeTestQueryClient,
  mockUseAuth,
  renderWithRouter,
} from "../../../test/testUtils.tsx";
import { mswServer, http, HttpResponse } from "../../../test/mswServer.ts";
import { CData } from "../../../../credential/data.ts";
import { setTitle } from "../../../redux/post/submit/submitPostSlice.tsx";
import { postApi } from "../../../api/postApi.ts";
import EMPTY_EDITOR_STATE_JSON from "../../../../public/empty_editor_state.json";

const BACKEND = CData.local_backend;

interface RenderOpts {
  authenticated?: boolean;
  postId?: string;
}

function renderSubmit({ authenticated = false, postId }: RenderOpts = {}) {
  mockUseAuth(
    authenticated
      ? { isAuthenticated: true, user: { access_token: "tok" } as never }
      : { isAuthenticated: false, user: undefined },
  );
  const queryClient = makeTestQueryClient();
  const path = postId ? `/free/submit?postId=${postId}` : "/free/submit";
  return renderWithRouter({
    queryClient,
    initialEntries: [path],
    routes: [
      {
        path: "/",
        children: [
          {
            path: ":category",
            children: [{ path: "submit", element: <PostSubmit /> }],
          },
        ],
      },
    ],
  });
}

describe("PostSubmit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    lexicalState.json = NON_EMPTY_JSON_DEFAULT;
  });

  it("renders the 등록 button + header/editor mocks in create mode", async () => {
    renderSubmit();

    expect(
      await screen.findByRole("button", { name: "등록" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "수정" }),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("header-mock")).toBeInTheDocument();
    expect(screen.getByTestId("lexical-mock")).toBeInTheDocument();
  });

  it("renders the 수정 button when postId is in the query string and fetch succeeds", async () => {
    mswServer.use(
      http.get(`${BACKEND}/posts/detail`, ({ request }) => {
        expect(new URL(request.url).searchParams.get("num")).toBe("42");
        return HttpResponse.json({
          postId: "42",
          title: "기존 글",
          username: "u",
          userAuthId: "uid",
          likes: 0,
          views: 0,
          category: "free",
          createdDate: "",
          content: { root: {} },
          comments: [],
          selfLiked: false,
        });
      }),
    );

    renderSubmit({ postId: "42" });

    expect(
      await screen.findByRole("button", { name: "수정" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "등록" }),
    ).not.toBeInTheDocument();
  });

  it("renders an error fallback when fetching the post detail fails in edit mode", async () => {
    mswServer.use(
      http.get(`${BACKEND}/posts/detail`, () =>
        HttpResponse.json({}, { status: 500 }),
      ),
    );

    renderSubmit({ postId: "42" });

    expect(await screen.findByText("error")).toBeInTheDocument();
  });

  it("calls /save with the redux title and routed category when 등록 is clicked", async () => {
    let capturedBody: { title: string; category: string } | undefined;
    mswServer.use(
      http.post(`${BACKEND}/save`, async ({ request }) => {
        expect(request.headers.get("authorization")).toBe("Bearer tok");
        capturedBody = (await request.json()) as {
          title: string;
          category: string;
        };
        return HttpResponse.text("99");
      }),
    );

    const { store } = renderSubmit({ authenticated: true });
    store.dispatch(setTitle("내 제목"));

    const button = await screen.findByRole("button", { name: "등록" });
    await userEvent.click(button);

    await waitFor(() => {
      expect(capturedBody?.title).toBe("내 제목");
      expect(capturedBody?.category).toBe("free");
    });
  });

  it("does not call /save when the user is not authenticated", async () => {
    const saveSpy = vi.spyOn(postApi, "savePost");

    const { store } = renderSubmit({ authenticated: false });
    store.dispatch(setTitle("내 제목"));

    const button = await screen.findByRole("button", { name: "등록" });
    await userEvent.click(button);

    expect(saveSpy).not.toHaveBeenCalled();
  });

  it("does not call /save when the title is empty", async () => {
    const saveSpy = vi.spyOn(postApi, "savePost");

    renderSubmit({ authenticated: true });

    const button = await screen.findByRole("button", { name: "등록" });
    await userEvent.click(button);

    expect(saveSpy).not.toHaveBeenCalled();
  });

  it("does not call /save when the editor content is empty", async () => {
    const saveSpy = vi.spyOn(postApi, "savePost");
    lexicalState.json = EMPTY_EDITOR_STATE_JSON;

    const { store } = renderSubmit({ authenticated: true });
    store.dispatch(setTitle("내 제목"));

    const button = await screen.findByRole("button", { name: "등록" });
    await userEvent.click(button);

    expect(saveSpy).not.toHaveBeenCalled();
  });
});
