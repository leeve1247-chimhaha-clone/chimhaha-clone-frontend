import { useNavigate } from "react-router-dom";
import styles from "./DefaultBody.module.css";
import { DefaultPostComponent } from "./DefaultPostComponent.tsx";
import axios from "axios";
import { CData } from "../../../credential/data.ts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../react-query/queryKeys.tsx";
import { useMatches, useParams } from "react-router";
import type { RawRouteConfig } from "../../router/convertToRouteObjects.tsx";
import type { PostItemProps } from "./PostItemProps.tsx";

export function DefaultBody() {
  const navigate = useNavigate();
  useParams();
  const matches = useMatches();
  const category = matches[1].pathname.substring(1, matches[1].pathname.length);
  const { data, isLoading, error } = useQuery({ queryKey: [...queryKeys.PostList, category], queryFn: fetchPostList });
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData<RawRouteConfig[]>(queryKeys.RouterDataFlat);
  async function fetchPostList() {
    return axios
      .get<PostItemProps[]>(CData.local_backend + "/posts?category=" + category)
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
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data === undefined) return <div>No data</div>;
  if (queryData === undefined) return <div>캐시 불러오는 중...</div>;
  const korean = queryData.find((x) => x.key === category)?.korean;
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.h2}>{`${korean !== undefined ? korean : "???"} 게시판`}</h2>
        <div>
          {data.map((post, index) => (
            <DefaultPostComponent key={index} post={post} />
          ))}
        </div>
        <div className={styles.tailContainer}>
          <button onClick={goToSubmit} className={styles.button}>
            글쓰기
          </button>
        </div>
      </div>
    </>
  );
}
