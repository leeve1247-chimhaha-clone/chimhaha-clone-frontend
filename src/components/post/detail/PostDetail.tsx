import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import styles from "./PostDetail.module.css";
import { Lexical } from "../../wysiwyg/lexical/Lexical.tsx";
import { PostDetailHeader } from "./PostDetailHeader.tsx";
import { CommentRootComponent } from "../../comment/CommentRootComponent.tsx";
import { useAuth } from "react-oidc-context";
import { PostDetailAuthRequired } from "./PostDetailAuthRequired.tsx";
import { postApi } from "../../../api/postApi.ts";

export function PostDetail() {
  const { postId } = useParams();
  const auth = useAuth();
  const access_token = auth?.user?.access_token;

  const { data, error, isLoading } = useQuery({
    queryKey: [...queryKeys.PostDetail, postId],
    queryFn: () => postApi.fetchPostDetail(postId),
  });
  if (error) return <div>Error: {error.message}</div>;
  if (data === undefined) return <div>No data</div>;
  return (
    <>
      <div className={styles.postContainer}>
        <PostDetailHeader data={data} />
        <>
          {isLoading && <div>Loading...</div>}
          {!isLoading && <Lexical readOnly={true} postId={postId} />}
        </>
        {access_token && <PostDetailAuthRequired />}
        <CommentRootComponent />
      </div>
    </>
  );
}
