import { describe, it, expect } from "vitest";
import { postApi } from "./postApi.ts";
import { CData } from "../../credential/data.ts";
import { mswServer, http, HttpResponse } from "../test/mswServer.ts";

const BACKEND = CData.local_backend;

describe("postApi", () => {
  describe("fetchPostList", () => {
    it("returns the array on a 200 response", async () => {
      mswServer.use(
        http.get(`${BACKEND}/posts`, ({ request }) => {
          const url = new URL(request.url);
          expect(url.searchParams.get("category")).toBe("free");
          return HttpResponse.json([
            { postId: "1", title: "first", category: "free" },
            { postId: "2", title: "second", category: "free" },
          ]);
        }),
      );

      const result = await postApi.fetchPostList("free");
      expect(result).toHaveLength(2);
      expect(result?.[0].title).toBe("first");
    });

    it("returns undefined when the server errors", async () => {
      mswServer.use(
        http.get(`${BACKEND}/posts`, () =>
          HttpResponse.json({ message: "boom" }, { status: 500 }),
        ),
      );

      const result = await postApi.fetchPostList("free");
      expect(result).toBeUndefined();
    });
  });

  describe("fetchPostDetail", () => {
    it("resolves to empty string when postId is undefined", async () => {
      const result = await postApi.fetchPostDetail(undefined);
      expect(result).toBe("");
    });

    it("returns the post detail body on a 200 response", async () => {
      mswServer.use(
        http.get(`${BACKEND}/posts/detail`, ({ request }) => {
          const url = new URL(request.url);
          expect(url.searchParams.get("num")).toBe("42");
          return HttpResponse.json({
            postId: "42",
            title: "hello",
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

      const result = await postApi.fetchPostDetail("42");
      expect(result).not.toBe("");
      if (result !== "") {
        expect(result.postId).toBe("42");
        expect(result.title).toBe("hello");
      }
    });
  });

  describe("savePost", () => {
    it("posts to /save with bearer token and returns the body", async () => {
      mswServer.use(
        http.post(`${BACKEND}/save`, async ({ request }) => {
          expect(request.headers.get("authorization")).toBe("Bearer tok-1");
          const body = (await request.json()) as { title: string };
          expect(body.title).toBe("새 글");
          return HttpResponse.text("ok-id");
        }),
      );

      const result = await postApi.savePost(
        { title: "새 글", category: "free", content: { root: {} } as never },
        "tok-1",
      );
      expect(result).toBe("ok-id");
    });
  });

  describe("likePost", () => {
    it("returns the new like count on success", async () => {
      mswServer.use(
        http.post(`${BACKEND}/posts/like`, async ({ request }) => {
          expect(request.headers.get("authorization")).toBe("Bearer tok-2");
          return HttpResponse.json(7);
        }),
      );

      const result = await postApi.likePost("p-1", "tok-2");
      expect(result).toBe(7);
    });

    it("returns undefined on server error", async () => {
      mswServer.use(
        http.post(`${BACKEND}/posts/like`, () =>
          HttpResponse.json({}, { status: 500 }),
        ),
      );

      const result = await postApi.likePost("p-1", "tok-2");
      expect(result).toBeUndefined();
    });
  });
});
