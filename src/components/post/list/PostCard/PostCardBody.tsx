import type { PostProps } from "../PostProps.tsx";
import styles from "./PostCard.module.css";
import { CircleFill } from "react-bootstrap-icons";
import { CreatedDate } from "../../../../utils/CreatedDate.tsx";
import { PostCardLikes } from "./PostCardLikes.tsx";

export function PostCardBody({ post }: { post: PostProps }) {
  return (
    <div className={styles.rightSection}>
      <div className={styles.firstLine}>
        <div className={styles.title}>{post.title}</div>
        <div className={styles.commentsCount}>{post.commentsCount}</div>
      </div>
      <div className={styles.secondLine}>
        <div>{post.username}</div>
        <CircleFill className={styles.dot} />
        <CreatedDate date={post.createdDate} />
        <CircleFill className={styles.dot} />
        <div>{post.views}</div>
        <PostCardLikes post={post} />
      </div>
    </div>
  );
}
