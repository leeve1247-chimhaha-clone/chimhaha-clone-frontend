import { describe, it, expect } from "vitest";
import { render, waitFor, act } from "@testing-library/react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, type RefObject } from "react";
import {
  type LexicalEditor,
  ParagraphNode,
  TextNode,
  type SerializedEditorState,
} from "lexical";

import { UpdateEditorStatePlugin } from "./UpdateEditorStatePlugin.tsx";
import { queryKeys } from "../../../../react-query/queryKeys.tsx";

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

function makeContent(text: string): SerializedEditorState {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: null,
      children: [
        {
          type: "paragraph",
          format: "",
          indent: 0,
          version: 1,
          direction: null,
          textFormat: 0,
          textStyle: "",
          children: [
            {
              type: "text",
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text,
              version: 1,
            },
          ],
        },
      ],
    },
  } as unknown as SerializedEditorState;
}

function makePostDetail(content: SerializedEditorState) {
  return {
    postId: "42",
    title: "t",
    username: "u",
    userAuthId: "uid",
    likes: 0,
    views: 0,
    category: "free",
    createdDate: "",
    content,
    comments: [],
    selfLiked: false,
  };
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: Infinity, staleTime: Infinity },
    },
  });
}

function getEditorJSON(editor: LexicalEditor) {
  let result = "";
  editor.read(() => {
    result = JSON.stringify(editor.getEditorState().toJSON());
  });
  return result;
}

describe("UpdateEditorStatePlugin", () => {
  it("applies the cached post content to the editor on first mount", async () => {
    const postId = "42";
    const queryClient = makeQueryClient();
    queryClient.setQueryData(
      [...queryKeys.PostDetail, postId],
      makePostDetail(makeContent("원본 내용")),
    );
    const editorRef: RefObject<LexicalEditor | null> = { current: null };

    render(
      <QueryClientProvider client={queryClient}>
        <LexicalComposer
          initialConfig={{
            namespace: "test",
            nodes: [ParagraphNode, TextNode],
            onError: (e: Error) => {
              throw e;
            },
          }}
        >
          <UpdateEditorStatePlugin postId={postId} />
          <CaptureEditor editorRef={editorRef} />
        </LexicalComposer>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(getEditorJSON(editorRef.current!)).toContain("원본 내용");
    });
  });

  it("does not overwrite the editor when queryData reference changes after init", async () => {
    // Regression: previously a refetch updated the cached PostDetail object
    // reference, the useEffect re-fired, and setEditorState reset the editor —
    // making the edit page feel like text input was disabled.
    const postId = "42";
    const queryClient = makeQueryClient();
    queryClient.setQueryData(
      [...queryKeys.PostDetail, postId],
      makePostDetail(makeContent("원본 내용")),
    );
    const editorRef: RefObject<LexicalEditor | null> = { current: null };

    function Tree({ tick }: { tick: number }) {
      void tick;
      return (
        <QueryClientProvider client={queryClient}>
          <LexicalComposer
            initialConfig={{
              namespace: "test",
              nodes: [ParagraphNode, TextNode],
              onError: (e: Error) => {
                throw e;
              },
            }}
          >
            <UpdateEditorStatePlugin postId={postId} />
            <CaptureEditor editorRef={editorRef} />
          </LexicalComposer>
        </QueryClientProvider>
      );
    }

    const { rerender } = render(<Tree tick={0} />);

    await waitFor(() => {
      expect(getEditorJSON(editorRef.current!)).toContain("원본 내용");
    });

    queryClient.setQueryData(
      [...queryKeys.PostDetail, postId],
      makePostDetail(makeContent("덮어쓰기 시도")),
    );
    rerender(<Tree tick={1} />);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    expect(getEditorJSON(editorRef.current!)).toContain("원본 내용");
    expect(getEditorJSON(editorRef.current!)).not.toContain("덮어쓰기 시도");
  });
});
