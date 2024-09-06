import { useLoaderData } from "react-router";
import { LoaderFunctionArgs } from "react-router-dom";
import axios from "axios";
import { RData } from "../credential/data.ts";
import { timeAgo } from "./CreatedDate.tsx";
import Quill from "quill";
import Delta from "quill-delta";
import { useRef } from "react";
import { WYSIWYGEditor } from "./WYSIWYGEditor.tsx";
import { CommentComponent } from "./comment/CommentComponent.tsx";
import { CommentEditorComponent } from "./comment/CommentEditorComponent.tsx";

export function PostDetail() {
  const data = useLoaderData() as PostDetailProps;
  const quillRef = useRef<Quill>(null);
  return (
    <>
      <h1>인기글</h1>
      <h1>디테일</h1>
      <WYSIWYGEditor ref={quillRef} defaultValue={data.content} />
      <h1>이하 댓글 창</h1>
      {data.comments.map((comment, index) => (
        <CommentComponent
          key={index.toString()}
          content={comment.content}
          commentId={comment.id}
        />
      ))}
      <h1>댓글 창 종료..!</h1>
      <CommentEditorComponent postId={data?.postId}>댓글 달기</CommentEditorComponent>
    </>
  );
}

interface CommentProps {
  username: string;
  content: Delta;
  id: string;
  children?: CommentProps[];
}

export interface PostDetailProps {
  title: string;
  username: string;
  postId: string;
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
