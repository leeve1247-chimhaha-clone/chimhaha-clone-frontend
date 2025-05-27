import cssClass from "../CommentComponent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";
import { Modal } from "../../modal/Modal.tsx";
import { useDispatch } from "react-redux";
import type { CommentRootComponentDispatch } from "../redux/root/commentRootComponentStore.tsx";
import { setEditableCommentId, setInitialCommentState } from "../redux/root/commentRootComponentSlice.tsx";
import { useState } from "react";
import type { CommentProps } from "../CommentProps.tsx";

export function CommentHeaderRight(props: { onClick: () => void; isModalOpen: boolean; onClose: () => void; comment?: CommentProps }) {
  const dispatch = useDispatch<CommentRootComponentDispatch>();
  const[modalOpen, setModalOpen] = useState(false)

  function handleEditableCommentId(){
    dispatch(setEditableCommentId(props.comment?.id))
    dispatch(setInitialCommentState(props.comment?.content))
  }

  function handleModalOpen(){
    setModalOpen(true)
  }

  function handleModalClose(){
    setModalOpen(false)
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
            <button>삭제</button>
          </Modal>
        </div>
      }
    </div>
  );
}
