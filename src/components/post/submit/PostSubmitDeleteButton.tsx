import { CData } from "../../../../credential/data.ts";
import axios from "axios";
import { useAuth } from "react-oidc-context";
import { useMatches, useParams } from "react-router";
import { useNavigate } from "react-router-dom";

export function PostSubmitDeleteButton() {
  const auth = useAuth();
  const { postId } = useParams();
  const matches = useMatches();
  const category = matches[1].pathname.substring(1, matches[1].pathname.length);
  const navigate = useNavigate();

  async function handleButton() {
    const jsonData = JSON.stringify({
      postId: postId,
    });
    await axios
      .post<number>(CData.local_backend + "/delete", jsonData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      })
      .then((res) => res.data)
      .catch(() => undefined);
    navigate("/" + category);
  }

  return <button onClick={handleButton}>삭제</button>;
}
