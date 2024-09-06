import axios from "axios";
import { RData } from "../credential/data.ts";
import Delta from "quill-delta";

export async function saveComment(
  postId: string,
  commentDelta?: Delta,
  userSub?: string,
  userToken?: string,
  commentId?: string,
) {
  if (commentDelta) {
    const deltaJson = JSON.stringify({
      content: commentDelta,
      postId: postId,
      user: userSub,
      commentId: commentId ?? null
    });
    await axios.post(RData.baseUrl + "/save/comment", deltaJson, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
  }
}
