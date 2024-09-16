import { useRef, useState } from "react";
import Quill from "quill";
import { CommentUpdateEditor } from "./CommentUpdateEditor.tsx";
import { CommentEditorComponent } from "./CommentEditorComponent.tsx";
import cssClass from "./CommentComponent.module.css";
import Delta from "quill-delta";
import { useAuth } from "react-oidc-context";
import {
  deleteComment,
  likeComment,
  updateComment,
} from "../../utils/saveComment.ts";

interface CommentComponentProps {
  postId: string;
  key: string;
  comment: CommentProps;
}

export interface CommentProps {
  username?: string;
  content: Delta;
  id: string;
  likes: string;
  children?: CommentProps[];
}

export function CommentComponent({
  postId,
  comment: initComment,
}: CommentComponentProps) {
  const commentRef = useRef<Quill>(null);
  const auth = useAuth();
  const [comment, setComment] = useState(initComment);
  const [isEdit, setIsEdit] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  async function likeThisComment() {
    if (!auth.isAuthenticated) return;
    const axiosResponse = await likeComment({
      commentId: comment.id,
      access_token: auth.user?.access_token!,
    });
    setComment((prevData) => ({
      ...prevData,
      likes: axiosResponse.data,
    }));
  }

  function handleDataReceived(data: CommentProps) {
    setComment((prevData) => ({
      ...prevData,
      children: [...(prevData.children || []), data],
    }));
  }

  function editThisComment() {
    commentRef.current;
    setIsEdit(true);
  }

  function cancelEditThisComment() {
    setIsEdit(false);
  }

  async function sendEditedComment() {
    const axiosResponse = await updateComment({
      access_token: auth.user?.access_token!,
      comment: commentRef.current?.getContents(),
      commentId: comment.id,
    });

    if (axiosResponse?.data.content !== null) {
      setComment((prevState) => ({
        ...prevState,
        content: axiosResponse?.data.content,
      }));
      setIsEdit(false);
    }
  }

  async function deleteThisComment() {
    const axiosResponse = await deleteComment({
      access_token: auth.user?.access_token!,
      commentId: comment.id,
    });
    if (axiosResponse?.data.id !== null) {
      setComment((prevState) => ({
        ...prevState,
        content: axiosResponse?.data.content,
      }));
    }
    setIsRemoved(true);
  }

  return (
    <div>
      <CommentUpdateEditor
        ref={commentRef}
        defaultValue={comment.content}
        commentId={comment.id}
        editState={isEdit}
        removedState={isRemoved}
      />
      {!isEdit && !isRemoved && (
        <div className={cssClass.buttons}>
          <div>{comment.likes}</div>
          <button onClick={likeThisComment}>좋아요</button>
          <button onClick={editThisComment}>수정</button>
          <button onClick={deleteThisComment}>삭제</button>
        </div>
      )}
      {isEdit && !isRemoved && (
        <div className={cssClass.buttons}>
          <button onClick={cancelEditThisComment}>취소</button>
          <button onClick={sendEditedComment}>입력</button>
        </div>
      )}
      <CommentEditorComponent
        onDataReceived={handleDataReceived}
        postId={postId}
        commentId={comment.id}
      >
        답글 달기
      </CommentEditorComponent>

      <div className={cssClass.termToLeft}>
        {comment.children !== undefined && comment.children?.length !== 0 ? (
          comment.children.map((child, index) => (
            <CommentComponent
              key={index.toString()}
              postId={postId}
              comment={child}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
