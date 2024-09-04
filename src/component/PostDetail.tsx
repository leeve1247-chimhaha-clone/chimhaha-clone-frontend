import { ShouldRevalidateFunctionArgs, useLoaderData } from "react-router";
import { LoaderFunctionArgs } from "react-router-dom";
import axios from "axios";
import { RData } from "../credential/data.ts";
import { timeAgo } from "./CreatedDate.tsx";
import Quill from "quill";
import Delta from "quill-delta";
import { useRef } from "react";
import { WYSIWYGEditor } from "./WYSIWYGEditor.tsx";

export function PostDetail() {
  const data = useLoaderData() as PostDetailProps;
  const quillRef = useRef<Quill>(null);
  return (
    <>
      <h1>인기글</h1>
      <h1>디테일</h1>
      <WYSIWYGEditor ref={quillRef} defaultValue={data.content} />
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
