import styles from "./PostListComponent.module.css";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import type { RawRouteConfig } from "../../../router/convertToRouteObjects.tsx";
import { PostListYoutubeCards } from "./YoutubeCard/PostListYoutubeCards.tsx";
import { NoticeListComponent } from "./NoticeListComponent.tsx";
import { PopularComponent } from "./PopularComponent.tsx";

export function PostPopularListComponents() {
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData<RawRouteConfig[]>(queryKeys.RouterDataFlat);

  if (queryData === undefined) return <div>캐시 불러오는 중...</div>;
  return (
    <>
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
  );
}
