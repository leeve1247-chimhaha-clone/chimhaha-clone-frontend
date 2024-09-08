import { useLoaderData } from "react-router";
import { LoaderFunctionArgs } from "react-router-dom";
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
  console.log(data.userAuthId);
  return (
    <>
      <h1>인기글</h1>
      <h1>디테일</h1>
      <PostEditor ref={quillRef} defaultValue={data.content} />
      {auth.user?.profile.sub === data.userAuthId && (
        <div>
          <button>수정</button>
          <button>삭제</button>
        </div>
      )}
      <div>--------------임시 구분선-------------</div>
      {data.comments.map((comment, index) => (
        <CommentComponent
          postId={data?.postId}
          key={index.toString()}
          comment={comment}
        />
      ))}
      <h1>댓글 창 종료..!</h1>
      <CommentEditorComponent postId={data?.postId}>
        댓글 달기
      </CommentEditorComponent>
    </>
  );
}
