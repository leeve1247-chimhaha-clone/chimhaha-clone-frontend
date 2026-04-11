import { useAuth } from "react-oidc-context";
import { useMatches, useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { postApi } from "../../../api/postApi.ts";

export function PostSubmitDeleteButton() {
  const auth = useAuth();
  const { postId } = useParams();
  const matches = useMatches();
  const category = matches[1].pathname.substring(1, matches[1].pathname.length);
  const navigate = useNavigate();

  async function handleButton() {
    if (!postId || !auth.user?.access_token) return;
    await postApi.deletePost(postId, auth.user.access_token);
    navigate("/" + category);
  }

  return <button onClick={handleButton}>삭제</button>;
}
