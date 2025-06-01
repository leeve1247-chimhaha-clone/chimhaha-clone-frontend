import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import { CData } from "../../../../credential/data.ts";
import axios from "axios";

import type { DefaultPostDetailProps } from "./DefaultPostDetailProps.tsx";
import cssClass from "./DefaultDetailBody.module.css";
import { Lexical } from "../../wysiwyg/lexical/Lexical.tsx";
import { DefaultDetailHeader } from "./DefaultDetailHeader.tsx";
import { CommentRootComponent } from "../../comment/CommentRootComponent.tsx";
import { useAuth } from "react-oidc-context";
import { SignedInFeaturesComponent } from "./SignedInFeaturesComponent.tsx";

export function DefaultDetailBody() {
  const { postId } = useParams();
  const auth = useAuth();
  const access_token = auth?.user?.access_token;

  async function fetchPostDetail() {
    return axios.get<DefaultPostDetailProps>(CData.local_backend + "/posts/detail?num=" + postId).then((res) => {
      return res.data;
    });
  }

  const { data, error, isLoading } = useQuery({
    queryKey: [...queryKeys.PostDetail, postId],
    queryFn: fetchPostDetail,
  });
  if (error) return <div>Error: {error.message}</div>;
  if (data === undefined) return <div>No data</div>;
  return (
    <>
      <div className={cssClass.postContainer}>
        <DefaultDetailHeader data={data} />
        <>
          {isLoading && <div>Loading...</div>}
          {!isLoading && <Lexical readOnly={true} postId={postId} />}
        </>
        {access_token && <SignedInFeaturesComponent />}
        <CommentRootComponent />
      </div>
    </>
  );
}
