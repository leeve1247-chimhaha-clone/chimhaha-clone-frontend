import type { PostProps } from "../PostProps.tsx";
import { CircleFill, HandThumbsUp } from "react-bootstrap-icons";
import styles from "./PostCard.module.css";

export function PostCardLikes({ post }: { post: PostProps }) {
  return (
    <>
      {post.likes > 0 && (
        <>
          <CircleFill className={styles.dot} />
          <HandThumbsUp className={styles.likes} />
          <div className={styles.likes}>{post.likes}</div>
        </>
      )}
    </>
  );
}
