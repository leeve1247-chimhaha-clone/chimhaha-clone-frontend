import { useLoaderData } from "react-router";
import { LoaderFunctionArgs, useNavigate } from "react-router-dom";
import axios from "axios";
import { RData } from "../../credential/data.ts";
import { timeAgo } from "../../utils/CreatedDate.tsx";
import Quill from "quill";
import Delta from "quill-delta";
import { useRef } from "react";
import { PostEditor } from "./PostEditor.tsx";
import { CommentProps } from "../comment/CommentComponent.tsx";
import { useAuth } from "react-oidc-context";
import cssStyle from "./PostForm.module.css";
import { updatePost } from "../../utils/savePost.ts";

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

export async function postUpdateEditorLoader({ params }: LoaderFunctionArgs) {
  const axiosResponse = await axios.get(
    RData.baseUrl + "/posts/detail?num=" + params.postId,
  );
  const postDetailData = axiosResponse.data as PostDetailProps;
  postDetailData.createdDate = timeAgo(postDetailData.createdDate);
  return postDetailData;
}

export function PostUpdateEditor() {
  const data = useLoaderData() as PostDetailProps;
  const quillRef = useRef<Quill>(null);
  const auth = useAuth();
  const title = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function sendUpdateContent() {
    const axiosResponse = await updatePost({
      postId: data.postId,
      quill: quillRef.current,
      titleText: title.current?.value,
      user: auth?.user?.profile?.sub,
      access_token: auth.user?.access_token,
    });
    navigate("/new/" + axiosResponse?.data);
  }

  return (
    <>
      <h1>하위</h1>
      <div className={cssStyle.title}> 카테고리</div>
      <input
        className={cssStyle.title}
        defaultValue={data.title}
        ref={title}
        type="text"
      />
      <h1>디테일</h1>
      {auth.user?.profile.sub === data.userAuthId && (
        <PostEditor
          ref={quillRef}
          defaultValue={data.content}
          editState={true}
        />
      )}
      <div>
        <button onClick={sendUpdateContent}>Save Content</button>
      </div>
    </>
  );
}
