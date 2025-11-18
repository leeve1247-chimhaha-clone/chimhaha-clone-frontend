import { useQueryClient } from "@tanstack/react-query";
import type { PostProps } from "./PostProps.tsx";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import styles from "./PopularComponent.module.css";
import { PostCardLightWeight } from "./PostCard/PostCardLightWeight.tsx";

export function PopularComponent() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<PostProps[]>([...queryKeys.PostList, ""]);
  if (data === undefined) {
    return <></>;
  }
  return <>
    <div className={styles.row}>
      <h2 className={styles.h2}>전체 인기글</h2>{/*일간*/}
      <h2>|</h2>
      <h2 className={styles.h2}>주간</h2>
      <h2>|</h2>
      <h2 className={styles.h2}>월간</h2>
      <h2>|</h2>
      <h2 className={styles.h2}>박물관</h2>
    </div>
    <div>
      {data.map((post, index) => (
        <PostCardLightWeight key={index} post={post} />
      ))}
    </div>
  </>;
}
