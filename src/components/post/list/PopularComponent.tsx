import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import styles from "./PopularComponent.module.css";
import { PostCardLightWeight } from "./PostCard/PostCardLightWeight.tsx";
import { postApi } from "../../../api/postApi.ts";

export function PopularComponent() {
  const { data, error } = useQuery({ queryKey: queryKeys.PopularPostList, queryFn: postApi.fetchPopularPostList });

  if (error) return <div>Error: {error.message}</div>;
  if (data === undefined) return <div>No data</div>;
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
      {data["daily"].map((post, index) => (
        <PostCardLightWeight key={index} post={post} />
      ))}
    </div>
  </>;
}
