import type {SerializedEditorState} from "lexical";

export interface CommentProps {
  username?: string;
  content: SerializedEditorState;
  id: string;
  likes: number;
  lastEditedDate: string;
  children?: CommentProps[];
  selfLiked: boolean;
}
