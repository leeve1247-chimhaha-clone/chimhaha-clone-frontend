import type { PostProps } from "../PostProps.tsx";
import { NavLink } from "react-router-dom";
import styles from "./NoticeCard.module.css";
import { CreatedDate } from "../../../../utils/CreatedDate.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../react-query/queryKeys.tsx";
import type { RawRouteConfig } from "../../../../router/convertToRouteObjects.tsx";
import { ChatDots, CircleFill, Eye, HandThumbsUp } from "react-bootstrap-icons";

export function NoticeCard({ post }: { post: PostProps }) {
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData<RawRouteConfig[]>(queryKeys.RouterDataFlat);
  const postId = post.postId;
  const category = post.category;
  const link = "/" + category + "/" + postId;
  if (!queryData) return;
  const filter = queryData.filter((rawRouteConfig) => rawRouteConfig.key === category);
  const korean = filter[0].korean;
  return (
    <NavLink to={link} className={styles.noticeBox}>
      <div className={styles.noticeBoxElementHead}>
        <div className={styles.category}>{korean}</div>
        <div className={styles.title}>{post.title}</div>
        <div className={styles.commentsCount}><ChatDots/>{post.commentsCount}</div>
      </div>
      <div className={styles.noticeBoxElementTail}>
        <div className={styles.likes}><HandThumbsUp/>{post.likes}</div>
        <div className={styles.userName}>{post.username}</div>
        <CircleFill className={styles.dot} />
        <div className={styles.views}><Eye/>{post.views}</div>
        <CircleFill className={styles.dot} />
        <div className={styles.time}>
          <CreatedDate date={post.createdDate} />
        </div>
      </div>
    </NavLink>
  );
}
