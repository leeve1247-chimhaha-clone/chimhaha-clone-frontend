import cssClass from "./CommentComponent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";
import { Modal } from "../modal/Modal.tsx";

export function DefaultCommentHeaderRight(props: { onClick: () => void; isModalOpen: boolean; onClose: () => void }) {
  return (
    <div className={cssClass.commentHeaderContainerRight}>
      {
        <div className={cssClass.modalOpenContainer}>
          <button className={cssClass.options} onClick={props.onClick}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
          <Modal className={cssClass.modal} isOpen={props.isModalOpen} onClose={props.onClose}>
            <button>수정</button>
            <button>삭제</button>
          </Modal>
        </div>
      }
    </div>
  );
}
