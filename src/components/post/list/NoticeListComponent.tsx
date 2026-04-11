import styles from "./NoticeListComponent.module.css";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import { NoticeCard } from "./NoticeCard/NoticeCard.tsx";
import { postApi } from "../../../api/postApi.ts";

interface NoticeListComponentProps {
  long?: boolean;
}

export function NoticeListComponent({ long }: NoticeListComponentProps) {
  const { data: notices, error: notices_error } = useQuery({
    queryKey: queryKeys.NoticeList,
    queryFn: () => postApi.fetchPostList("notice"),
  });

  if (notices_error) return <div>Error: {notices_error.message}</div>;
  if (notices === undefined) return <div>No data</div>;

  return <>
    <div className={styles.noticeHead}>
      {notices.map((notice, index) => (
        <NoticeCard long={long} key={index} post={notice} />
      ))}
    </div>
  </>;
}
