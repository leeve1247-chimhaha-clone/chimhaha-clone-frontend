import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import styles from "./PopularComponent.module.css";
import { PostCardLightWeight } from "./PostCard/PostCardLightWeight.tsx";
import axios from "axios";
import type { PostProps } from "./PostProps.tsx";
import { CData } from "../../../../credential/data.ts";
import { Record } from "react-bootstrap-icons";

type Period = "daily" | "weekly" | "monthly" | "all";
export function PopularComponent() {
  const { data, error } = useQuery({ queryKey: queryKeys.PopularPostList, queryFn: fetchPopularPostList });
  async function fetchPopularPostList() {
    return axios
      .get<Record<Period, PostProps[]>>(CData.local_backend + "/popular_posts")
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return undefined;
      });
  }

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
