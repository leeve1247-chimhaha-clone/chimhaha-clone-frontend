import { useAuth } from "react-oidc-context";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setLikes } from "../../../redux/post/detail/defaultPostDetailSlice.tsx";
import type { RootState } from "../../../redux/store.tsx";
import { postApi } from "../../../api/postApi.ts";

interface SubmitLikeButtonProps {
  className?: string;
}

export function PostSubmitLikeButton({ className }: SubmitLikeButtonProps) {
  const auth = useAuth();
  const { postId } = useParams();
  const likes = useSelector((state: RootState) => state.defaultPostDetailStatus.likes);
  const dispatch = useDispatch();

  async function likePost() {
    if (!postId || !auth?.user?.access_token) return;
    const newLikes = await postApi.likePost(postId, auth.user.access_token);
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
