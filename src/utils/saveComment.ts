import axios from "axios";
import { RData } from "../credential/data.ts";
import Delta from "quill-delta";

interface SimpleCommentProps {
  commentId: string;
  access_token: string;
}

interface CreateCommentProps {
  postId: string;
  comment?: Delta;
  access_token?: string;
  commentId?: string;
}

interface UpdateCommentProps extends SimpleCommentProps{
  comment?: Delta;
}

export async function createComment({
  postId,
  comment,
  access_token,
  commentId
}: CreateCommentProps) {
  if (comment) {
    const deltaJson = JSON.stringify({
      content: comment,
      postId: postId,
      commentId: commentId //있을 경우 답글로 처리
    });
    return await axios.post(RData.baseUrl + "/save/comment", deltaJson, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  }
}

export async function updateComment({
  commentId,
  access_token,
  comment,
}: UpdateCommentProps) {
  if (comment) {
    const deltaJson = JSON.stringify({
      category: "BEST",
      content: comment,
      commentId: commentId,
    });
    return await axios.post(RData.baseUrl + "/update/comment", deltaJson, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  }
}

export async function deleteComment({
  commentId,
  access_token,
}: SimpleCommentProps) {
  if (commentId) {
    const deltaJson = JSON.stringify({
      commentId: commentId,
    });
    return await axios.post(RData.baseUrl + "/delete/comment", deltaJson, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  }
}

export async function likeComment({
  commentId,
  access_token,
}: SimpleCommentProps) {
  const deltaJson = JSON.stringify({
    commentId: commentId,
  });
  return await axios.post(RData.baseUrl + "/comments/like", deltaJson, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
}
