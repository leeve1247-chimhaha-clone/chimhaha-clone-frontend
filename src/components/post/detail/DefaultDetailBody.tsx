import { useMatches, useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import { CData } from "../../../../credential/data.ts";
import axios from "axios";

import type { DefaultPostDetailProps } from "./DefaultPostDetailProps.tsx";
import cssClass from "./DefaultDetailBody.module.css";
import { Lexical } from "../../wysiwyg/lexical/Lexical.tsx";
import type { RawRouteConfig } from "../../../router/convertToRouteObjects.tsx";
import { DefaultDetailHeader } from "./DefaultDetailHeader.tsx";
import { SubmitLikeButton } from "../../body/submit/SubmitLikeButton.tsx";
import { CommentRootComponent } from "../../comment/CommentRootComponent.tsx";

export function DefaultDetailBody() {
  const { postId } = useParams();
  async function fetchPostDetail() {
    return axios.get<DefaultPostDetailProps>(CData.local_backend + "/posts/detail?num=" + postId).then((res) => {
      return res.data;
    });
  }
  const { data, error, isLoading } = useQuery({ queryKey: [...queryKeys.PostDetail, postId], queryFn: fetchPostDetail });
  const queryClient = useQueryClient();
  const rawRoute = queryClient.getQueryData<RawRouteConfig[]>(queryKeys.RouterDataFlat);
  const matches = useMatches();
  const category = matches[1].pathname.substring(1, matches[1].pathname.length);
  if (error) return <div>Error: {error.message}</div>;
  if (data === undefined) return <div>No data</div>;
  if (rawRoute === undefined) return <div>캐시 불러오는 중...</div>;
  const korean = rawRoute.find((x) => x.key === category)?.korean;
  return (
    <>
      <div className={cssClass.postContainer}>
        <DefaultDetailHeader korean={korean} data={data} />
        <>
          {isLoading && <div>Loading...</div>}
          {!isLoading && <Lexical readOnly={true} postId={postId} />}
        </>
        <div>
          <SubmitLikeButton/>
        </div>
        <CommentRootComponent/>
      </div>
    </>
  );
}
