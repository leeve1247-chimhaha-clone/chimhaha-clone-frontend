import axios from "axios";
import { ImageData } from "../../../../credential/data.ts";
import { useAuth } from "react-oidc-context";
import { useParams } from "react-router";

export function SubmitLikeButton() {
  const auth = useAuth();
  const { postId } = useParams();

  async function likePost() {
    const deltaJson = JSON.stringify({
      postId: postId,
    });
    return await axios.post(ImageData.baseUrl + "/posts/like", deltaJson, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth?.user?.access_token}`,
      },
    });
  }

  return <button onClick={likePost}>좋아요</button>
}
