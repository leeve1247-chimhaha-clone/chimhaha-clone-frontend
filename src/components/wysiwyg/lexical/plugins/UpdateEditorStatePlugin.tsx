import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {useEffect} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "../../../../react-query/queryKeys.tsx";
import type {PostDetailProps} from "../../../post/detail/PostDetailProps.tsx";

export function UpdateEditorStatePlugin({ postId }: { postId?: string | undefined }) {
  const [editor] = useLexicalComposerContext();
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData<PostDetailProps>([...queryKeys.PostDetail, postId]);
  useEffect(() => {
    if (postId === undefined) return;
    if (queryData === undefined) return;
    queueMicrotask(()=>{
      const editorState = editor.parseEditorState(queryData.content);
      editor.setEditorState(editorState);
    })

  }, [editor, postId, queryData]);
  return null;
}
