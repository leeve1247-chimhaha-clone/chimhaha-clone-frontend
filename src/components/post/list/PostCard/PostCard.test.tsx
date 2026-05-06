import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { PostCard } from "./PostCard.tsx";
import type { PostProps } from "../PostProps.tsx";
import { renderWithProviders } from "../../../../test/testUtils.tsx";
import { mswServer, http, HttpResponse } from "../../../../test/mswServer.ts";
import { CData } from "../../../../../credential/data.ts";

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

function renderInRouter(ui: React.ReactNode) {
  return renderWithProviders(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("PostCard", () => {
  it("renders title, username and view count", () => {
    renderInRouter(<PostCard post={makePost({ title: "안녕", views: 99 })} />);

    expect(screen.getByText("안녕")).toBeInTheDocument();
    expect(screen.getByText("tester")).toBeInTheDocument();
    expect(screen.getByText("99")).toBeInTheDocument();
  });

  it("links to /<category>/<postId>", () => {
    renderInRouter(
      <PostCard post={makePost({ category: "qna", postId: 42 })} />,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/qna/42");
  });

  it("renders the like count when likes > 0", () => {
    renderInRouter(<PostCard post={makePost({ likes: 5 })} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("does not render the like count when likes is 0", () => {
    renderInRouter(<PostCard post={makePost({ likes: 0, views: 12 })} />);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("renders the thumbnail image when titleImageFileName is set", async () => {
    const fileName = "abc.png";
    mswServer.use(
      http.get(`${CData.local_backend}/get/thumbnail-src-url`, ({ request }) => {
        const url = new URL(request.url);
        expect(url.searchParams.get("filename")).toBe(fileName);
        return HttpResponse.text("https://cdn.example/abc.png");
      }),
    );

    const { container } = renderInRouter(
      <PostCard post={makePost({ titleImageFileName: fileName })} />,
    );

    await waitFor(() => {
      const img = container.querySelector("img");
      expect(img).not.toBeNull();
      expect(img).toHaveAttribute("src", "https://cdn.example/abc.png");
    });
  });
});
