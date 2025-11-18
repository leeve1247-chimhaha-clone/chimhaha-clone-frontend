import styles from "./PostCard.module.css";
import { NavLink } from "react-router-dom";
import type { PostProps } from "../PostProps.tsx";
import { PostCardHeader } from "./PostCardHeader.tsx";
import { PostCardBody } from "./PostCardBody.tsx";

export function PostCard({ post }: { post: PostProps }) {
  const postId = post.postId;
  const category = post.category;
  const link = '/' + category + '/' + postId;
  return (
    <NavLink to={link} className={styles.postContainer}>
      <PostCardHeader post={post} />
      <PostCardBody post={post} />
    </NavLink>
  );
}
