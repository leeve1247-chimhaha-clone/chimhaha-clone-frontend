import styles from "./PostDetail.module.css";
import { PostSubmitLikeButton } from "../submit/PostSubmitLikeButton.tsx";
import { ArrowLeft, ArrowRight, BookmarkFill, ListTask } from "react-bootstrap-icons";

export function PostDetailAuthRequired() {
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
        <button className={styles.button}>
          <ArrowLeft />
          이전글
        </button>
        <button className={styles.button}>
          <ListTask />
          목록
        </button>
        <button className={styles.button}>
          <ArrowRight />
          다음글
        </button>
      </div>
    </>
  );
}
