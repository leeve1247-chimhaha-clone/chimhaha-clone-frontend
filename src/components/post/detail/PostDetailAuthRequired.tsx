import styles from "./PostDetail.module.css";
import { PostSubmitLikeButton } from "../submit/PostSubmitLikeButton.tsx";
import { ArrowLeft, ArrowRight, BookmarkFill, ListTask } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import { postApi } from "../../../api/postApi.ts";

interface PostDetailAuthRequiredProps {
  category: string;
  postId: string;
}

export function PostDetailAuthRequired({ category, postId }: PostDetailAuthRequiredProps) {
  const navigate = useNavigate();
  const { data: postList } = useQuery({
    queryKey: [...queryKeys.PostList, category],
    queryFn: () => postApi.fetchPostList(category),
  });

  const currentIndex = postList?.findIndex((p) => String(p.postId) === postId) ?? -1;
  const prevPost = currentIndex > 0 ? postList?.[currentIndex - 1] : undefined;
  const nextPost =
    postList && currentIndex >= 0 && currentIndex < postList.length - 1
      ? postList[currentIndex + 1]
      : undefined;

  return (
    <>
      <div className={styles.containerRow}>
        <PostSubmitLikeButton className={styles.button} />
        <button className={styles.button}>싫어요</button>
      </div>
      <div className={styles.containerRow}>
        <button className={styles.button}>
          <BookmarkFill />
          스크랩 추가
        </button>
      </div>
      <div className={styles.containerRow2}>
        <button
          className={styles.button}
          disabled={!prevPost}
          onClick={() => prevPost && navigate(`/${category}/${prevPost.postId}`)}
        >
          <ArrowLeft />
          이전글
        </button>
        <button
          className={styles.button}
          onClick={() => navigate(`/${category}`)}
        >
          <ListTask />
          목록
        </button>
        <button
          className={styles.button}
          disabled={!nextPost}
          onClick={() => nextPost && navigate(`/${category}/${nextPost.postId}`)}
        >
          <ArrowRight />
          다음글
        </button>
      </div>
    </>
  );
}
