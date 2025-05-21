import Delta from "quill-delta";
import { CommentProps } from "../comment/CommentComponent.tsx";
import type { SerializedEditorState } from "lexical";

export interface PostDetailProps {
  title: string;
  username: string;
  postId: string;
  userAuthId: string;
  likes: number;
  views: number;
  category: string;
  createdDate: string;
  content: SerializedEditorState;
  comments: CommentProps[];
}
