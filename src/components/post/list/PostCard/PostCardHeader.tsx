import type { PostProps } from "../PostProps.tsx";
import { ImageThumbNail } from "../ImageThumbNail.tsx";
import styles from "../PostListComponent.module.css";
import { FileEarmarkText } from "react-bootstrap-icons";

export function PostCardHeader({ post }: { post: PostProps }) {
  return post.titleImageFileName ? (
    <ImageThumbNail fileName={post.titleImageFileName} className={styles.imageThumbnailContainer} />
  ) : (
    <FileEarmarkText className={styles.imageThumbnailContainer} />
  );
}
