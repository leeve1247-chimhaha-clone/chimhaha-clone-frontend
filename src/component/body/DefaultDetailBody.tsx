import { useMatches, useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../header/queryKeys.tsx";
import { CData } from "../../../credential/data.ts";
import axios from "axios";

import type { PostDetailProps } from "../post/PostDetailProps.tsx";
import cssClass from "../post/PostDetail.module.css";
import { Lexical } from "../wysiwyg/lexical/Lexical.tsx";
import { DefaultCommentRootComponent } from "../comment/refactor/DefaultCommentRootComponent.tsx";
import type { RawRouteConfig } from "../../router/convertToRouteObjects.tsx";
import { DefaultDetailHeader } from "./DefaultDetailHeader.tsx";

export function DefaultDetailBody() {
  const { postId } = useParams();
  async function fetchPostDetail() {
    return axios.get<PostDetailProps>(CData.local_backend + "/posts/detail?num=" + postId).then((res) => {
      return res.data;
    });
  }
  const { data, error, isLoading } = useQuery({ queryKey: [...queryKeys.PostDetail, postId], queryFn: fetchPostDetail });
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData<RawRouteConfig[]>(queryKeys.RouterDataFlat);
  const matches = useMatches();
  const category = matches[1].pathname.substring(1, matches[1].pathname.length);
  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (data === undefined) return <div>No data</div>;
  if (queryData === undefined) return <div>캐시 불러오는 중...</div>;
  const korean = queryData.find((x) => x.key === category)?.korean;

  return (
    <>
      <div className={cssClass.postContainer}>
        <DefaultDetailHeader korean={korean} data={data} />
        <>
          {isLoading && <div>Loading...</div>}
          {!isLoading && <Lexical readOnly={true} postId={postId} />}
        </>
        <DefaultCommentRootComponent postId={Number(data.postId)} comments={data?.comments} />
      </div>
    </>
  );
}
