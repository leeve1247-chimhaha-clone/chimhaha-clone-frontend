import type { CommentProps } from "../comment/CommentComponent.tsx";
import type { SerializedEditorState } from "lexical";

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
