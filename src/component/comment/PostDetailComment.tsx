import { CommentComponent, CommentProps } from "./CommentComponent.tsx";
import { CommentEditorComponent } from "./CommentEditorComponent.tsx";
import { useAuth } from "react-oidc-context";
import { createContext } from "react";

interface PostDetailCommentProps {
  postId: string;
  comments: CommentProps[];
  handleDataReceived: (arg0: CommentProps) => void;
}

const SelectCommentContext = createContext("");

export function PostDetailComment({
  postId,
  comments,
  handleDataReceived,
}: PostDetailCommentProps) {
  const auth = useAuth();
  return (
    <SelectCommentContext.Provider value={""}>
      {comments.map((comment, index) => (
        <CommentComponent
          postId={postId}
          key={index.toString()}
          comment={comment}
        />
      ))}
      {auth.isAuthenticated && (
        <CommentEditorComponent
          onDataReceived={handleDataReceived}
          postId={postId}/>
      )}
    </SelectCommentContext.Provider>
  );
}
