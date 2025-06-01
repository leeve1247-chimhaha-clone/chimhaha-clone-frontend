import type { DefaultPostDetailProps } from "./DefaultPostDetailProps.tsx";
import cssClass from "./DefaultDetailBody.module.css";
import { Dot, HandThumbsUp, ThreeDotsVertical } from "react-bootstrap-icons";
import { timeAgo } from "../../../utils/CreatedDate.tsx";
import { Modal } from "../../modal/Modal.tsx";
import { useState } from "react";
import { type UIMatch, useNavigate } from "react-router-dom";
import { useMatches } from "react-router";
import { SubmitDeleteButton } from "../../body/submit/SubmitDeleteButton.tsx";
import { useDispatch, useSelector } from "react-redux";
import { setLikes } from "../../../redux/post/detail/defaultPostDetailSlice.tsx";
import type { RootState } from "../../../redux/store.tsx";
import type { RawRouteConfig } from "../../../router/convertToRouteObjects.tsx";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import { useQueryClient } from "@tanstack/react-query";

function getPostId(matches: UIMatch[]) {
  return matches[matches.length - 1].pathname.substring(matches[matches.length - 2].pathname.length + 1, matches[matches.length - 1].pathname.length);
}

function getCategory(matches: UIMatch[]) {
  return matches[1].pathname.substring(1, matches[1].pathname.length);
}

export function DefaultDetailHeader({data }: { data: DefaultPostDetailProps }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate();
  const matches = useMatches();
  const routerCategory = getCategory(matches);
  const postId = getPostId(matches);
  const likes = useSelector((state:RootState) => state.defaultPostDetailStatus.likes);
  const dispatch = useDispatch()
  const rawRoute = useQueryClient().getQueryData<RawRouteConfig[]>(queryKeys.RouterDataFlat);
  const preRouterKorean = rawRoute?.find((x) => x.key === routerCategory)
  const korean = preRouterKorean?.korean ?? "전체"
  if (likes === undefined) dispatch(setLikes({
    likes: data.likes,
    selfLiked: data.selfLiked
  }))
  function openModal(){
    setIsModalOpen(true)
  }
  function closeModal(){
    setIsModalOpen(false)
  }

  function navigateToEdit(){
    navigate(`/${data.category}/submit?postId=${postId}`)
  }
  if (likes === undefined) return <></>
  return (
    <div className={cssClass.postHeader}>
      <button className={cssClass.postNavigate} onClick={()=>{navigate(`/${routerCategory}`)}}>{`${korean} 게시글 >`}</button>
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
          {/*<FontAwesomeIcon icon={faEye} />*/}
          <div>{data.views}</div>
          <Dot className={cssClass.dot} />
          <HandThumbsUp className={cssClass.likes} />
          <div className={cssClass.likes}>{likes.likes}</div>
        </div>
        <div>
          <div className={cssClass.modalOpenContainer}>
            <button className={cssClass.options} onClick={openModal}>
              <ThreeDotsVertical/>
            </button>
            <Modal className={cssClass.modal} modalOpen={isModalOpen} handleModalClose={closeModal}>
              <button onClick={navigateToEdit}>수정</button>
              <SubmitDeleteButton/>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
