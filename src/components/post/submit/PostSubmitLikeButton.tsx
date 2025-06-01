import axios from "axios";
import { ImageData } from "../../../../credential/data.ts";
import { useAuth } from "react-oidc-context";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setLikes } from "../../../redux/post/detail/defaultPostDetailSlice.tsx";
import type { RootState } from "../../../redux/store.tsx";

interface SubmitLikeButtonProps {
  className?: string;
}

export function PostSubmitLikeButton({ className }: SubmitLikeButtonProps) {
  const auth = useAuth();
  const { postId } = useParams();
  const likes = useSelector((state: RootState) => state.defaultPostDetailStatus.likes);
  const dispatch = useDispatch();

  async function likePost() {
    const deltaJson = JSON.stringify({
      postId: postId,
    });
    const newLikes = await axios
      .post<number>(ImageData.baseUrl + "/posts/like", deltaJson, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.user?.access_token}`,
        },
      })
      .then((res) => res.data)
      .catch(() => undefined);

    dispatch(
      setLikes({
        likes: newLikes ? newLikes : 0,
        selfLiked: likes?.selfLiked !== true,
      }),
    );
  }

  if (likes === undefined) return <></>;
  return (
    <>
      {likes.selfLiked && <button className={className} onClick={likePost}>좋아요 취소</button>}
      {!likes.selfLiked && <button className={className} onClick={likePost}>좋아요</button>}
    </>
  );
}
