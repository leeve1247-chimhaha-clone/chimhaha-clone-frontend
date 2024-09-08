import { useLoaderData } from "react-router";
import { LoaderFunctionArgs, useNavigate } from "react-router-dom";
import axios from "axios";
import { RData } from "../../credential/data.ts";
import { timeAgo } from "../../utils/CreatedDate.tsx";
import Quill from "quill";
import Delta from "quill-delta";
import { useRef } from "react";
import { PostEditor } from "./PostEditor.tsx";
import {
  CommentComponent,
  CommentProps,
} from "../comment/CommentComponent.tsx";
import { CommentEditorComponent } from "../comment/CommentEditorComponent.tsx";
import { useAuth } from "react-oidc-context";
import { deletePost } from "../../utils/savePost.ts";

export interface PostDetailProps {
  title: string;
  username: string;
  postId: string;
  userAuthId: string;
  likes: number;
  views: number;
  category: string;
  createdDate: string;
  content: Delta;
  comments: CommentProps[];
}

export async function postDetailLoader({ params }: LoaderFunctionArgs) {
  const axiosResponse = await axios.get(
    RData.baseUrl + "/posts/detail?num=" + params.postId,
  );
  const postDetailData = axiosResponse.data as PostDetailProps;
  postDetailData.createdDate = timeAgo(postDetailData.createdDate);

  return postDetailData;
}

export function PostDetail() {
  const data = useLoaderData() as PostDetailProps;
  const quillRef = useRef<Quill>(null);
  const auth = useAuth();
  const navigate = useNavigate();

  function navToEditPage() {
    navigate("edit");
  }

  async function deleteAndGoToHome() {
    if (auth.isAuthenticated)
      await deletePost({
        postId: data.postId,
        access_token: auth.user?.access_token!,
      });
    navigate("/new")
  }

  return (
    <>
      <h1>인기글</h1>
      <h2>{data.title}</h2>
      <div>
        <PostEditor ref={quillRef} defaultValue={data.content} />
        {auth.user?.profile.sub === data.userAuthId && (
          <div>
            <button onClick={navToEditPage}>수정</button>
            <button onClick={deleteAndGoToHome}>삭제</button>
          </div>
        )}
      </div>
      <div>--------------임시 구분선-------------</div>
      {data.comments.map((comment, index) => (
        <CommentComponent
          postId={data?.postId}
          key={index.toString()}
          comment={comment}
        />
      ))}
      <h1>댓글 창 종료..!</h1>
      {auth.isAuthenticated && (
        <CommentEditorComponent postId={data?.postId}>
          댓글 달기
        </CommentEditorComponent>
      )}
    </>
  );
}
