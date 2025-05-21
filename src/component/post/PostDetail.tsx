import { useLoaderData } from "react-router";
import { LoaderFunctionArgs, useNavigate } from "react-router-dom";
import axios from "axios";
import { ImageData } from "../../../credential/data.ts";
import { timeAgo } from "../../utils/CreatedDate.tsx";
import Quill from "quill";
import { useRef, useState } from "react";
import { PostEditor } from "./PostEditor.tsx";
import { CommentProps } from "../comment/CommentComponent.tsx";
import { useAuth } from "react-oidc-context";
import { deletePost, likePost } from "../../utils/savePost.ts";
import { PostDetailComment } from "../comment/PostDetailComment.tsx";
import cssClass from "./PostDetail.module.css";
import { PostCategory } from "../../utils/PostCategory.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { faEye, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";
import { Modal } from "../modal/Modal.tsx";
import type { PostDetailProps } from "./PostDetailProps.tsx";

export async function postDetailLoader({ params }: LoaderFunctionArgs) {
  const axiosResponse = await axios.get(ImageData.baseUrl + "/posts/detail?num=" + params.postId);
  const postDetailData = axiosResponse.data as PostDetailProps;
  postDetailData.createdDate = timeAgo(postDetailData.createdDate);

  return postDetailData;
}
export function PostDetail() {
  const initialData = useLoaderData() as PostDetailProps;
  const [data, setData] = useState(initialData);
  const quillRef = useRef<Quill>(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function navToEditPage() {
    navigate("edit");
  }

  async function likeThisPost() {
    if (auth.user?.access_token === undefined) return;
    const axiosResponse = await likePost({
      postId: data.postId,
      access_token: auth.user.access_token,
    });
    setData((prevData) => ({
      ...prevData,
      likes: axiosResponse.data,
    }));
  }

  async function deleteAndGoToHome() {
    if (auth.user?.access_token === undefined) return;
    await deletePost({
      postId: data.postId,
      access_token: auth.user.access_token,
    });
    navigate("/new");
  }

  function handleDataReceived(data: CommentProps) {
    setData((prevData) => ({
      ...prevData,
      comments: [...prevData.comments, data],
    }));
  }

  return (
    <div className={cssClass.postContainer}>
      <div className={cssClass.postNavigate}>{`침착맨 전체 게시글 >`}</div>
      <div className={cssClass.postHeader}>
        <div className={cssClass.postHeader2}>
          <div className={cssClass.postCategory}>{PostCategory[data.category]}</div>
          <div className={cssClass.postTitle}>{data.title}</div>
        </div>
        <div className={cssClass.postHeader3}>
          <div className={cssClass.postHeader3left}>
            <div>{data.username}</div>
            <FontAwesomeIcon className={cssClass.dot} icon={faCircle} />
            <div>{data.createdDate}</div>
            <FontAwesomeIcon className={cssClass.dot} icon={faCircle} />
            <FontAwesomeIcon icon={faEye} />
            <div>{data.views}</div>
            <FontAwesomeIcon className={cssClass.dot} icon={faCircle} />
            <FontAwesomeIcon className={cssClass.likes} icon={faThumbsUp} />
            <div className={cssClass.likes}>{data.likes}</div>
          </div>
          <div className={cssClass.postHeader3Right}>
            <div className={cssClass.modalOpenContainer}>
              <button
                className={cssClass.options}
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
              <Modal className={cssClass.modal} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <button onClick={navToEditPage}> 수정 </button>
                <button onClick={deleteAndGoToHome}> 삭제 </button>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <div>
        <PostEditor ref={quillRef} defaultValue={data.content} />
        {auth.user?.profile.sub === data.userAuthId && (
          <div className={cssClass.postBody}>
            <button className={cssClass.postBodyButton} onClick={likeThisPost}>
              <div>좋아요</div>
              <div>👍</div>
            </button>
          </div>
        )}
      </div>
      <PostDetailComment postId={data.postId} comments={data.comments} handleDataReceived={handleDataReceived} />
    </div>
  );
}
