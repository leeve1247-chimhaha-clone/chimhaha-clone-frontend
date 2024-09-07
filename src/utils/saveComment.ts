import axios from "axios";
import { RData } from "../credential/data.ts";
import Delta from "quill-delta";

interface SaveCommentProps {
  postId: string;
  comment?: Delta;
  user?: string;
  access_token?: string;
  commentId?: string;
}

export async function saveComment({
  postId,
  comment,
  user,
  access_token,
  commentId,
}: SaveCommentProps) {
  if (comment) {
    const deltaJson = JSON.stringify({
      content: comment,
      postId: postId,
      user: user,
      commentId: commentId ?? null,
    });
    await axios.post(RData.baseUrl + "/save/comment", deltaJson, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  }
}
