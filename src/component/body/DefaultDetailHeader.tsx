import type { PostDetailProps } from "../post/PostDetailProps.tsx";
import cssClass from "../post/PostDetail.module.css";
import { Dot, HandThumbsUp } from "react-bootstrap-icons";
import { timeAgo } from "../../utils/CreatedDate.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { Modal } from "../modal/Modal.tsx";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";
import { useState } from "react";

export function DefaultDetailHeader({ korean, data }: { korean: string | undefined; data: PostDetailProps }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  function openModal(){
    setIsModalOpen(true)
  }
  function closeModal(){
    setIsModalOpen(false)
  }


  return (
    <div className={cssClass.postHeader}>
      <div className={cssClass.postNavigate}>{`${korean} 게시글 >`}</div>
      <div className={cssClass.postHeader2}>
        <div className={cssClass.postCategory}>{korean}</div>
        <div className={cssClass.postTitle}>{data.title}</div>
      </div>
      <div className={cssClass.postHeader3}>
        <div className={cssClass.postHeader3left}>
          <div>{data.username}</div>
          <Dot className={cssClass.dot} />
          <div>{timeAgo(data.createdDate)}</div>
          <Dot className={cssClass.dot} />
          <FontAwesomeIcon icon={faEye} />
          <div>{data.views}</div>
          <Dot className={cssClass.dot} />
          <HandThumbsUp className={cssClass.likes} />
          <div className={cssClass.likes}>{data.likes}</div>
        </div>
        <div>
          <div className={cssClass.modalOpenContainer}>
            <button className={cssClass.options} onClick={openModal}>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
            <Modal className={cssClass.modal} isOpen={isModalOpen} onClose={closeModal}>
              <button>수정</button>
              <button>삭제</button>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
