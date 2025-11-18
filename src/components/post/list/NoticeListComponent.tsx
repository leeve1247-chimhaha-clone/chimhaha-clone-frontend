import type { PostProps } from "./PostProps.tsx";
import styles from "./NoticeListComponent.module.css";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import axios from "axios";
import { CData } from "../../../../credential/data.ts";
import { NoticeCard } from "./NoticeCard/NoticeCard.tsx";

interface NoticeListComponentProps {
  long?: boolean;
}

export function NoticeListComponent({ long }: NoticeListComponentProps) {
  async function fetchNoticeList(): Promise<PostProps[] | undefined> {
    return axios
      .get<PostProps[]>(CData.local_backend + "/posts?category=notice")
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return undefined;
      });
  }

  const { data: notices, error: notices_error } = useQuery({
    queryKey: queryKeys.NoticeList,
    queryFn: fetchNoticeList
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
