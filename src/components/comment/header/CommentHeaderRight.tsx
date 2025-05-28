import cssClass from "../CommentComponent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";
import { Modal } from "../../modal/Modal.tsx";
import { useDispatch } from "react-redux";
import { setEditableCommentId, setInitialCommentState } from "../../../redux/comment/commentRootComponentSlice.tsx";
import { useState } from "react";
import type { CommentProps } from "../CommentProps.tsx";
import { SubmitDeleteButton } from "../buttons/SubmitDeleteButton.tsx";
import { useParams } from "react-router";

export function CommentHeaderRight(props: { onClick: () => void; isModalOpen: boolean; onClose: () => void; comment?: CommentProps }) {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { postId } = useParams();
  if (props.comment?.id === undefined) return <></>;
  if (postId === undefined) return <></>;

  function handleEditableCommentId() {
    dispatch(setEditableCommentId(props.comment?.id));
    dispatch(setInitialCommentState(props.comment?.content));
  }

  function handleModalOpen() {
    setModalOpen(true);
  }

  function handleModalClose() {
    setModalOpen(false);
  }

  return (
    <div className={cssClass.commentHeaderContainerRight}>
      {
        <div className={cssClass.modalOpenContainer}>
          <button className={cssClass.options} onClick={handleModalOpen}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
          <Modal className={cssClass.modal} modalOpen={modalOpen} handleModalClose={handleModalClose}>
            <button onClick={handleEditableCommentId}>수정</button>
            <SubmitDeleteButton postId={postId} commentId={props.comment?.id} />
          </Modal>
        </div>
      }
    </div>
  );
}
