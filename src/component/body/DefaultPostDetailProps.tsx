import type { SerializedEditorState } from "lexical";
import type { CommentProps } from "../comment/CommentProps.tsx";

export interface DefaultPostDetailProps {
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
