import styles from "./PostListComponent.module.css";
import { PostCard } from "./PostCard/PostCard.tsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import { useMatches } from "react-router";
import type { RawRouteConfig } from "../../../router/convertToRouteObjects.tsx";
import { PostListYoutubeCards } from "./YoutubeCard/PostListYoutubeCards.tsx";
import { NoticeListComponent } from "./NoticeListComponent.tsx";
import { useAuth } from "react-oidc-context";
import { PopularComponent } from "./PopularComponent.tsx";
import { PostButton } from "./PostButton.tsx";
import { postApi } from "../../../api/postApi.ts";

export function PostListComponents() {
  const matches = useMatches();
  const category = matches[1].pathname.substring(1, matches[1].pathname.length);
  const { data, error } = useQuery({ queryKey: [...queryKeys.PostList, category], queryFn: () => postApi.fetchPostList(category) });
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData<RawRouteConfig[]>(queryKeys.RouterDataFlat);
  const auth = useAuth();

  if (error) return <div>Error: {error.message}</div>;
  if (data === undefined) return <div>No data</div>;
  if (queryData === undefined) return <div>캐시 불러오는 중...</div>;
  const korean = queryData.find((x) => x.key === category)?.korean;
  return (
    <>
      {category.toLowerCase() === "" && <>
        <div className={styles.container}>
          <PostListYoutubeCards />
          <div className={styles.row}>
            <h2 className={styles.h2}>공지</h2><h2 className={styles.mark}>!</h2>
          </div>
          <NoticeListComponent />
        </div>
        <div className={styles.container}>
          <PopularComponent />
        </div>
      </>
      }

      {category.toLowerCase() !== "" && <>
        <div className={styles.container}>
          <h2 className={styles.h2}>{korean} 게시판</h2>
          <div><NoticeListComponent long={true} />
            {data.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
          {auth.isAuthenticated && (
            <PostButton />
          )}
        </div>
      </>}
    </>
  );
}
