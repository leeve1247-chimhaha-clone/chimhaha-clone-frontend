import { ShouldRevalidateFunctionArgs, useLoaderData } from "react-router";
import { LoaderFunctionArgs } from "react-router-dom";
import axios from "axios";
import { RData } from "../credential/data.ts";
import { timeAgo } from "./CreatedDate.tsx";
import Quill from "quill";
import Delta from "quill-delta";
import { useRef, useState } from "react";
import { WYSIWYGEditor } from "./WYSIWYGEditor.tsx";
import { CommentEditor } from "./CommentEditor.tsx";
import { useAuth } from "react-oidc-context";

export function PostDetail() {
  const data = useLoaderData() as PostDetailProps;
  const quillRef = useRef<Quill>(null);
  const commentRef = useRef<Quill>(null);
  const auth = useAuth();
  const [isCommentEditorShown, setIsCommentEditorShown] = useState(false);

  async function saveComment() {
    if (commentRef.current) {
      const delta = commentRef.current.getContents();
      const deltaJson = JSON.stringify({
        content: delta,
        postId: data.postId,
        user: auth?.user?.profile.sub,
      });
      await axios.post(RData.baseUrl + "/save/comment", deltaJson, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      setIsCommentEditorShown(false);
    }
  }

  function showCommentEditor() {
    setIsCommentEditorShown(true);
  }
  function closeCommentEditor() {
    setIsCommentEditorShown(false);
  }

  return (
    <>
      <h1>인기글</h1>
      <h1>디테일</h1>
      <WYSIWYGEditor ref={quillRef} defaultValue={data.content} />
      <h1>이하 댓글 창</h1>
      {isCommentEditorShown ? (
        <>
          <CommentEditor ref={commentRef} />
          <button onClick={closeCommentEditor}>창 닫기</button>
          <button onClick={saveComment}>댓글 입력</button>
        </>
      ) : (
        <button onClick={showCommentEditor}>
          이 버튼을 눌러야 하위 창이 표시된다구?
        </button>
      )}
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
