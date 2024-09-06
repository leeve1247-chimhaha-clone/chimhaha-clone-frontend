import { useLoaderData } from "react-router";
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
import { MutableRefObject } from "react";
import { CommentComponent } from "./CommentComponent.tsx";

export function PostDetail() {
  const data = useLoaderData() as PostDetailProps;
  const quillRef = useRef<Quill>(null);
  const commentRef: MutableRefObject<Quill | null> = useRef<Quill>(null);
  const auth = useAuth();
  const [isCommentEditorShown, setIsCommentEditorShown] = useState(false);
  console.log(data.comments);

  async function saveComment() {
    if (commentRef.current) {
      const delta = commentRef.current.getContents();
      const deltaJson = JSON.stringify({
        content: delta,
        postId: data.postId,
        user: auth?.user?.profile.sub,
      });
      const axiosResponse = await axios.post(RData.baseUrl + "/save/comment", deltaJson, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      data.comments = axiosResponse.data.comments
      setIsCommentEditorShown(false);
    }
  }

  function showCommentEditor() {
    setIsCommentEditorShown(true);
  }
  function closeCommentEditor() {
    commentRef.current = null;
    setIsCommentEditorShown(false);
  }

  return (
    <>
      <h1>인기글</h1>
      <h1>디테일</h1>
      <WYSIWYGEditor ref={quillRef} defaultValue={data.content} />
      <h1>이하 댓글 창</h1>
      {data.comments.map((comment, index) => (
        <CommentComponent
          key = {index.toString()}
          content={comment.content}
          commentId={comment.id}
        />
      ))}
      <h1>댓글 창 종료..!</h1>
      {isCommentEditorShown ? (
        <>
          <CommentEditor
            ref={commentRef}
            isCommentEditorShown={isCommentEditorShown}
          />
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

interface CommentProps {
  username: string;
  content: Delta;
  id: string;
  children?: CommentProps[];
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
