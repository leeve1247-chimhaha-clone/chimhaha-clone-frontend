import { describe, it, expect, beforeEach, vi } from "vitest";
import axios from "axios";
import type { AuthContextProps } from "react-oidc-context";

import { mswServer, http, HttpResponse } from "../../../../../test/mswServer.ts";
import { CData } from "../../../../../../credential/data.ts";
import { imageApi } from "../../../../../api/imageApi.ts";
import { changeSrcToServerUrl } from "./ImageUploadPlugin.tsx";

const BACKEND = CData.local_backend;
const OSS = CData.object_storage_image_uri;

function makeAuth(token?: string): AuthContextProps {
  return { user: token ? { access_token: token } : undefined } as never;
}

function makePngBlob() {
  return new Blob(["x"], { type: "image/png" });
}

describe("changeSrcToServerUrl", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the src unchanged when it already points to object storage", async () => {
    const presignedSpy = vi.spyOn(imageApi, "getPresignedPost");
    const src = `${OSS}/already-uploaded.png`;

    const result = await changeSrcToServerUrl({ src, auth: makeAuth("tok") });

    expect(result).toBe(src);
    expect(presignedSpy).not.toHaveBeenCalled();
  });

  it("returns the src unchanged when fetching the blob fails", async () => {
    const presignedSpy = vi.spyOn(imageApi, "getPresignedPost");
    vi.spyOn(axios, "get").mockRejectedValueOnce(new Error("network"));
    const src = "https://broken.example.com/img.png";

    const result = await changeSrcToServerUrl({ src, auth: makeAuth("tok") });

    expect(result).toBe(src);
    expect(presignedSpy).not.toHaveBeenCalled();
  });

  it("returns the src unchanged when the user is not authenticated", async () => {
    const presignedSpy = vi.spyOn(imageApi, "getPresignedPost");
    vi.spyOn(axios, "get").mockResolvedValueOnce({ data: makePngBlob() });
    const src = "https://images.example.com/img.png";

    const result = await changeSrcToServerUrl({ src, auth: makeAuth() });

    expect(result).toBe(src);
    expect(presignedSpy).not.toHaveBeenCalled();
  });

  it("returns the uploaded URL after the full presigned-post flow", async () => {
    vi.spyOn(axios, "get").mockResolvedValueOnce({ data: makePngBlob() });
    const src = "https://images.example.com/img.png";
    const uploadUrl = `${OSS}/uploads`;
    const key = "abc/photo.png";
    let postedUrl: string | undefined;

    mswServer.use(
      http.get(`${BACKEND}/get/presigned-post`, ({ request }) => {
        expect(request.headers.get("authorization")).toBe("Bearer tok");
        expect(request.headers.get("x-file-mimetype")).toBe("image/png");
        return HttpResponse.json({
          url: uploadUrl,
          fields: { key, policy: "policy", "x-amz-signature": "sig" },
        });
      }),
      http.post(uploadUrl, ({ request }) => {
        postedUrl = request.url;
        return HttpResponse.text("");
      }),
    );

    const result = await changeSrcToServerUrl({
      src,
      auth: makeAuth("tok"),
    });

    expect(postedUrl).toBe(uploadUrl);
    expect(result).toBe(uploadUrl + key);
  });
});
