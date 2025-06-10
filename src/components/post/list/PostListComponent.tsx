import styles from "./PostListComponent.module.css";
import { CreatedDate } from "../../../utils/CreatedDate.tsx";
import { NavLink } from "react-router-dom";
import { ImageThumbNail } from "./ImageThumbNail.tsx";
import type { PostListComponentProps } from "./PostListComponentProps.tsx";
import { CircleFill, FileEarmarkText, HandThumbsUp } from "react-bootstrap-icons";

export function PostListComponent({ post }: { post: PostListComponentProps }) {
  const postId = post.postId;
  return (
    <NavLink to={postId?.toString() ?? ""} className={styles.postContainer}>
      {post.titleImageFileName ? (
        <ImageThumbNail fileName={post.titleImageFileName} className={styles.imageThumbnailContainer} />
      ) : (
        <FileEarmarkText className={styles.imageThumbnailContainer} />
      )}
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
          {post.likes > 0 && (
            <>
              <CircleFill className={styles.dot} />
              <HandThumbsUp className={styles.likes} />
              <div className={styles.likes}>{post.likes}</div>
            </>
          )}
        </div>
      </div>
    </NavLink>
  );
}
