import { useLocation, useNavigate } from "react-router-dom";
import cssClass from "../../pages/head/New.module.css";
import { PostComponent, type PostItem } from "../post/PostComponent.tsx";
import axios from "axios";
import { CData } from "../../../credential/data.ts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../header/queryKeys.tsx";
import { useMatches } from "react-router";
import type { RawRouteConfig } from "../../router/convertToRouteObjects.tsx";

export function DefaultBody() {
  const navigate = useNavigate();
  const matches = useMatches();
  const category = matches[1].pathname.substring(1, matches[1].pathname.length);
  const { data, isLoading, error } = useQuery({ queryKey: [...queryKeys.PostList, category], queryFn: fetchPostList });
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData<RawRouteConfig[]>(queryKeys.RouterDataFlat);

  async function fetchPostList() {
    return axios
      .get<PostItem[]>(CData.local_backend + "/posts?category=" + category)
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
      <div>
        <h2 className={cssClass.h2}>{`${korean !== undefined? korean : "???"} 게시판`}</h2>
        <section>
          {data.map((post, index) => (
            <PostComponent key={index} post={post} />
          ))}
        </section>
        <div className={cssClass.tailContainer}>
          <button onClick={goToSubmit} className={cssClass.button}>
            글쓰기
          </button>
        </div>
      </div>
    </>
  );
}
