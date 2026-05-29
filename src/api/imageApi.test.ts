import { describe, it, expect } from "vitest";
import { imageApi } from "./imageApi.ts";
import { CData } from "../../credential/data.ts";
import { mswServer, http, HttpResponse } from "../test/mswServer.ts";

const BACKEND = CData.image_backend;

describe("imageApi", () => {
  describe("fetchThumbNailUrl", () => {
    it("returns the URL string on a 200 response", async () => {
      mswServer.use(
        http.get(`${BACKEND}/get/thumbnail-src-url`, ({ request }) => {
          const url = new URL(request.url);
          expect(url.searchParams.get("filename")).toBe("photo.png");
          return HttpResponse.text("https://cdn.example.com/photo.png");
        }),
      );

      const result = await imageApi.fetchThumbNailUrl("photo.png");
      expect(result).toBe("https://cdn.example.com/photo.png");
    });

    it("returns undefined when the server errors", async () => {
      mswServer.use(
        http.get(`${BACKEND}/get/thumbnail-src-url`, () =>
          HttpResponse.json({ message: "boom" }, { status: 500 }),
        ),
      );

      const result = await imageApi.fetchThumbNailUrl("photo.png");
      expect(result).toBeUndefined();
    });
  });

  describe("getPresignedPost", () => {
    it("forwards bearer token, mime type, sha256 hex and returns the presigned payload", async () => {
      const file = new File(["hello"], "photo.png", { type: "image/png" });
      const payload = {
        url: "https://s3.example.com/upload",
        fields: {
          key: "/uploads/photo.png",
          policy: "policy-blob",
          "x-amz-signature": "sig",
        },
        alreadyExists: false,
      };
      let receivedHash: string | null = null;

      mswServer.use(
        http.get(`${BACKEND}/get/presigned-post`, ({ request }) => {
          expect(request.headers.get("authorization")).toBe("Bearer tok-img");
          expect(request.headers.get("x-file-mimetype")).toBe("image/png");
          receivedHash = request.headers.get("x-file-sha256");
          return HttpResponse.json(payload);
        }),
      );

      const result = await imageApi.getPresignedPost(file, "tok-img");
      expect(result).toEqual(payload);
      expect(receivedHash).toMatch(/^[a-f0-9]{64}$/);
    });

    it("returns the dedup response when the backend reports an existing hash", async () => {
      const file = new File(["dup"], "photo.png", { type: "image/png" });
      mswServer.use(
        http.get(`${BACKEND}/get/presigned-post`, () =>
          HttpResponse.json({
            url: "",
            fields: { key: "/existing.png" },
            alreadyExists: true,
          }),
        ),
      );

      const result = await imageApi.getPresignedPost(file, "tok-img");

      expect(result.alreadyExists).toBe(true);
      expect(result.fields.key).toBe("/existing.png");
    });
  });
});
