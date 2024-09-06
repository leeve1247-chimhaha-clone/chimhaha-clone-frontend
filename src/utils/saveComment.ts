import axios from "axios";
import { RData } from "../credential/data.ts";
import { PostDetailProps } from "../component/PostDetail.tsx";
import Delta from "quill-delta";

export async function saveComment(
  commentDelta?: Delta,
  data?: PostDetailProps,
  userSub?: string,
  userToken?: string,
) {
  if (commentDelta) {
    const deltaJson = JSON.stringify({
      content: commentDelta,
      postId: data?.postId,
      user: userSub,
    });
    await axios.post(
      RData.baseUrl + "/save/comment",
      deltaJson,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
  }
}