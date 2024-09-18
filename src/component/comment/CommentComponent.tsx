import {useEffect, useRef, useState} from "react";
import Quill from "quill";
import { CommentUpdateEditor } from "./CommentUpdateEditor.tsx";
import { CommentEditorComponent } from "./CommentEditorComponent.tsx";
import cssClass from "./CommentComponent.module.css";
import Delta from "quill-delta";
import { useAuth } from "react-oidc-context";
import { deleteComment, likeComment, updateComment } from "../../utils/saveComment.ts";
import { Modal } from "../modal/Modal.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";
import { CreatedDate } from "../../utils/CreatedDate.tsx";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";

interface CommentComponentProps {
  postId: string;
  key: string;
  comment: CommentProps;
}

export interface CommentProps {
  username?: string;
  content: Delta;
  id: string;
  likes: number;
  lastEditedDate: string;
  children?: CommentProps[];
}

export function CommentComponent({ postId, comment: initComment }: CommentComponentProps) {
  const commentRef = useRef<Quill>(null);
  const auth = useAuth();
  const [comment, setComment] = useState(initComment);
  const [isEdit, setEdit] = useState(false);
  const [isRemoved, setRemoved] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCommentEditorComponentOpen, setCommentEditorComponentOpen] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isElementVisible, setElementVisible] = useState(false);

  useEffect(() => {
    // 요소가 생성된 후에만 스크롤 실행
    if (isElementVisible && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isElementVisible]); // isElementVisible 상태가 변경될 때마다 실행

  function handleCreateElement () {
    setElementVisible(true);
  }


  async function likeThisComment() {
    if (auth.user?.access_token === undefined) return;
    const axiosResponse = await likeComment({
      commentId: comment.id,
      access_token: auth.user?.access_token,
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
    setEdit(true);
    setModalOpen(false);
  }

  function cancelEditThisComment() {
    setEdit(false);
  }

  async function sendEditedComment() {
    if (auth.user?.access_token === undefined) return;
    const axiosResponse = await updateComment({
      access_token: auth.user?.access_token,
      comment: commentRef.current?.getContents(),
      commentId: comment.id,
    });

    if (axiosResponse?.data.content !== null) {
      setComment((prevState) => ({
        ...prevState,
        content: axiosResponse?.data.content,
      }));
      setEdit(false);
    }
  }

  async function deleteThisComment() {
    if (auth.user?.access_token === undefined) return;
    const axiosResponse = await deleteComment({
      access_token: auth.user?.access_token,
      commentId: comment.id,
    });
    if (axiosResponse?.data.id !== null) {
      setComment((prevState) => ({
        ...prevState,
        content: axiosResponse?.data.content,
      }));
    }
    setRemoved(true);
    setModalOpen(false);
  }

  function openReplyEditor() {
    setCommentEditorComponentOpen(true);
    handleCreateElement();
  }
  function closeReplyEditor() {
    setCommentEditorComponentOpen(false);
  }

  return (
    <div className={cssClass.commentContainer}>
      <div className={cssClass.commentHeaderContainer}>
        <div className={cssClass.commentHeaderContainerLeft}>
          <div className={cssClass.username}>{comment.username}</div>
          <FontAwesomeIcon className={cssClass.dot} icon={faCircle} />
          <div className={cssClass.date}>
            <CreatedDate date={comment.lastEditedDate} />
          </div>
          {!(comment.likes === 0) && (
            <>
              <FontAwesomeIcon className={cssClass.dot} icon={faCircle} />
              <div className={cssClass.likes}>
                <FontAwesomeIcon icon={faThumbsUp} />
                <> {comment.likes}</>
              </div>
            </>
          )}
        </div>
        <div className={cssClass.commentHeaderContainerRight}>
          {!isRemoved && (
            <div className={cssClass.modalOpenContainer}>
              <button
                className={cssClass.options}
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
              <Modal className={cssClass.modal} isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <button onClick={editThisComment}>수정</button>
                <button onClick={deleteThisComment}>삭제</button>
              </Modal>
            </div>
          )}
        </div>
      </div>
      <div className={cssClass.commentBodyContainer}>
        <div className={isEdit ? cssClass.editorContainer : cssClass.updateEditorDefault}>
          <CommentUpdateEditor ref={commentRef} defaultValue={comment.content} commentId={comment.id} editState={isEdit} removedState={isRemoved} />
          {isEdit && !isRemoved && (
            <div className={cssClass.editorContainerButton}>
              <button className={cssClass.buttonApply} onClick={sendEditedComment}>
                등록
              </button>
              <button className={cssClass.buttonCancel} onClick={cancelEditThisComment}>
                취소
              </button>
            </div>
          )}
        </div>
        <div className={cssClass.commentTailContainer}>
          {!isCommentEditorComponentOpen && (
            <button className={cssClass.button} onClick={openReplyEditor}>
              답글
            </button>
          )}
          <button className={cssClass.button} onClick={likeThisComment}>
            좋아요
          </button>
        </div>
        <div className={cssClass.termToLeft}>
          {comment.children !== undefined && comment.children?.length !== 0 ? (
            comment.children.map((child, index) => <CommentComponent key={index.toString()} postId={postId} comment={child} />)
          ) : (
            <></>
          )}
        </div>
        {isCommentEditorComponentOpen && (
          <>
            <CommentEditorComponent ref={targetRef}  onDataReceived={handleDataReceived} postId={postId} commentId={comment.id} closeReplyEditor={closeReplyEditor} />
          </>
        )}
      </div>
    </div>
  );
}
