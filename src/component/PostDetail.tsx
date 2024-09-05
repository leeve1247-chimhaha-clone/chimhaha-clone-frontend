import { ShouldRevalidateFunctionArgs, useLoaderData } from "react-router";
import { LoaderFunctionArgs } from "react-router-dom";
import axios from "axios";
import { RData } from "../credential/data.ts";
import { timeAgo } from "./CreatedDate.tsx";
import Quill from "quill";
import Delta from "quill-delta";
import { useRef } from "react";
import { WYSIWYGEditor } from "./WYSIWYGEditor.tsx";
import { CommentEditor } from "./CommentEditor.tsx";
import { useAuth } from "react-oidc-context";

export function PostDetail() {
  const data = useLoaderData() as PostDetailProps;
  const quillRef = useRef<Quill>(null);
  const commentRef = useRef<Quill>(null);
  const auth = useAuth()

  const saveComment = async () => {
    if (quillRef.current) {
      const delta = quillRef.current.getContents();
      const deltaJson = JSON.stringify({
        content: delta,
        postId: data.postId
      });
      try {
        await axios.post(RData.baseUrl+"/save/comment", deltaJson, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${auth.user?.access_token}`,
            }
          }
        );
        alert("Comment saved successfully!");
      } catch (error) {
        console.error("Error saving content:", error);
        alert("Failed to save content.");
      }
    }
  };

  return (
    <>
      <h1>인기글</h1>
      <h1>디테일</h1>
      <WYSIWYGEditor ref={quillRef} defaultValue={data.content} />
      <h1>이하 댓글 창</h1>
      <CommentEditor ref={commentRef}/>
      <button onClick={saveComment}>댓글 입력</button>
    </>
  );
}

interface PostDetailProps {
  title: string;
  username: string;
  postId: number;
  likes: number;
  views: number;
  category: string;
  createdDate: string;
  content: Delta;
}

export async function postDetailLoader({ params }: LoaderFunctionArgs) {
  const axiosResponse = await axios.get(
    RData.baseUrl + "/posts/detail?num=" + params.postId,
  );
  const postDetailData = axiosResponse.data as PostDetailProps;
  postDetailData.createdDate = timeAgo(postDetailData.createdDate);

  return postDetailData;
}

export function postDetailShouldRevalidate({
  currentParams,
  nextParams,
}: ShouldRevalidateFunctionArgs) {
  return currentParams.postId !== nextParams.postId;
}
