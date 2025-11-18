import { useNavigate } from "react-router-dom";
import styles from "./PostListComponent.module.css";
import { PostCard } from "./PostCard/PostCard.tsx";
import axios from "axios";
import { CData } from "../../../../credential/data.ts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import { useMatches } from "react-router";
import type { RawRouteConfig } from "../../../router/convertToRouteObjects.tsx";
import type { PostProps } from "./PostProps.tsx";
import { PostListYoutubeCards } from "./YoutubeCard/PostListYoutubeCards.tsx";
import { NoticeListComponent } from "./NoticeListComponent.tsx";

export function PostListComponents() {
  const navigate = useNavigate();
  const matches = useMatches();
  const category = matches[1].pathname.substring(1, matches[1].pathname.length);
  const { data, error } = useQuery({ queryKey: [...queryKeys.PostList, category], queryFn: fetchPostList });
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData<RawRouteConfig[]>(queryKeys.RouterDataFlat);

  async function fetchPostList() {
    return axios
      .get<PostProps[]>(CData.local_backend + "/posts?category=" + category)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return undefined;
      });
  }

  function goToSubmit() {
    navigate("submit");
  }

  if (error) return <div>Error: {error.message}</div>;
  if (data === undefined) return <div>No data</div>;
  if (queryData === undefined) return <div>캐시 불러오는 중...</div>;
  const korean = queryData.find((x) => x.key === category)?.korean;
  return (
    <>
      <div className={styles.container}>
        <PostListYoutubeCards/>
        <NoticeListComponent/>
        {korean !== undefined && <h2 className={styles.h2}>{korean} 게시판</h2>}
        {category.toLowerCase() === "all" && <h2 className={styles.h2}>전체 게시판</h2>}
        {category.toLowerCase() === "" && <h2 className={styles.h2}>인기 게시판</h2>}
        <div>
          {data.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>

        {category.toLowerCase() !== "" && (
          <div className={styles.tailContainer}>
            <button onClick={goToSubmit} className={styles.button}>
              글쓰기
            </button>
          </div>
        )}
      </div>
    </>
  );
}
