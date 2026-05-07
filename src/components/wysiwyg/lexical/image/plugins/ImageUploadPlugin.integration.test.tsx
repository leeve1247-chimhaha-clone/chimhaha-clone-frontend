import { describe, it, expect, beforeEach, vi } from "vitest";
import axios from "axios";
import { render, waitFor, act } from "@testing-library/react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, type RefObject } from "react";
import {
  $createParagraphNode,
  $getNodeByKey,
  $getRoot,
  type LexicalEditor,
  ParagraphNode,
  TextNode,
} from "lexical";
import { useAuth } from "react-oidc-context";

import { mswServer, http, HttpResponse } from "../../../../../test/mswServer.ts";
import { CData } from "../../../../../../credential/data.ts";
import { ImageNode } from "../nodes/ImageNode.tsx";
import { ImageStatus } from "../nodes/ImageStatus.tsx";
import { ImagesUploadPlugin } from "./ImageUploadPlugin.tsx";
import { isImageNode } from "../nodes/utils.tsx";

vi.mock("react-oidc-context");

const BACKEND = CData.local_backend;
const OSS = CData.object_storage_image_uri;

function CaptureEditor({
  editorRef,
}: {
  editorRef: RefObject<LexicalEditor | null>;
}) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editorRef.current = editor;
  }, [editor, editorRef]);
  return null;
}

function setupEditor() {
  const editorRef: RefObject<LexicalEditor | null> = { current: null };
  render(
    <LexicalComposer
      initialConfig={{
        namespace: "test",
        nodes: [ParagraphNode, TextNode, ImageNode],
        onError: (e: Error) => {
          throw e;
        },
      }}
    >
      <ImagesUploadPlugin />
      <CaptureEditor editorRef={editorRef} />
    </LexicalComposer>,
  );
  if (!editorRef.current) {
    throw new Error("editor not captured");
  }
  return editorRef.current;
}

describe("ImagesUploadPlugin integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("transitions an ImageNode from Local to Uploaded after a successful upload", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { access_token: "tok" },
    } as never);
    vi.spyOn(axios, "get").mockResolvedValueOnce({
      data: new Blob(["x"], { type: "image/png" }),
    });

    const uploadUrl = `${OSS}/uploads`;
    const key = "abc/photo.png";
    mswServer.use(
      http.get(`${BACKEND}/get/presigned-post`, () =>
        HttpResponse.json({
          url: uploadUrl,
          fields: { key, policy: "p", "x-amz-signature": "s" },
          alreadyExists: false,
        }),
      ),
      http.post(uploadUrl, () => HttpResponse.text("")),
    );

    const editor = setupEditor();
    let nodeKey = "";

    await act(async () => {
      editor.update(() => {
        const para = $createParagraphNode();
        const node = new ImageNode({
          src: "https://images.example.com/img.png",
          altText: "alt",
          maxWidth: 500,
        });
        para.append(node);
        $getRoot().append(para);
        nodeKey = node.getKey();
      });
    });

    await waitFor(() => {
      let foundStatus: ImageStatus | undefined;
      let foundSrc: string | undefined;
      editor.read(() => {
        const node = $getNodeByKey(nodeKey);
        if (isImageNode(node)) {
          foundStatus = node.getStatus();
          foundSrc = node.getSrc();
        }
      });
      expect(foundStatus).toBe(ImageStatus.Uploaded);
      expect(foundSrc).toBe(uploadUrl + key);
    });
  });

  it("transitions an ImageNode to Error when the presigned-post request fails", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { access_token: "tok" },
    } as never);
    vi.spyOn(axios, "get").mockResolvedValueOnce({
      data: new Blob(["x"], { type: "image/png" }),
    });
    mswServer.use(
      http.get(`${BACKEND}/get/presigned-post`, () =>
        HttpResponse.json({}, { status: 500 }),
      ),
    );

    const editor = setupEditor();
    let nodeKey = "";

    await act(async () => {
      editor.update(() => {
        const para = $createParagraphNode();
        const node = new ImageNode({
          src: "https://images.example.com/img.png",
          altText: "alt",
          maxWidth: 500,
        });
        para.append(node);
        $getRoot().append(para);
        nodeKey = node.getKey();
      });
    });

    await waitFor(() => {
      let foundStatus: ImageStatus | undefined;
      editor.read(() => {
        const node = $getNodeByKey(nodeKey);
        if (isImageNode(node)) foundStatus = node.getStatus();
      });
      expect(foundStatus).toBe(ImageStatus.Error);
    });
  });

  it("leaves the src unchanged but transitions to Uploaded when the user has no access token", async () => {
    vi.mocked(useAuth).mockReturnValue({ user: undefined } as never);
    vi.spyOn(axios, "get").mockResolvedValueOnce({
      data: new Blob(["x"], { type: "image/png" }),
    });

    const editor = setupEditor();
    const originalSrc = "https://images.example.com/img.png";
    let nodeKey = "";

    await act(async () => {
      editor.update(() => {
        const para = $createParagraphNode();
        const node = new ImageNode({
          src: originalSrc,
          altText: "alt",
          maxWidth: 500,
        });
        para.append(node);
        $getRoot().append(para);
        nodeKey = node.getKey();
      });
    });

    await waitFor(() => {
      let foundStatus: ImageStatus | undefined;
      let foundSrc: string | undefined;
      editor.read(() => {
        const node = $getNodeByKey(nodeKey);
        if (isImageNode(node)) {
          foundStatus = node.getStatus();
          foundSrc = node.getSrc();
        }
      });
      expect(foundStatus).toBe(ImageStatus.Uploaded);
      expect(foundSrc).toBe(originalSrc);
    });
  });
});
