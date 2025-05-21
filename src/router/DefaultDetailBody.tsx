import { useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../component/header/queryKeys.tsx";
import { CData } from "../../credential/data.ts";
import axios from "axios";

import type { PostDetailProps } from "../component/post/PostDetailProps.tsx";
import cssClass from "../component/post/PostDetail.module.css";
import { Lexical } from "../component/wysiwyg/lexical/Lexical.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { timeAgo } from "../utils/CreatedDate.tsx";
import { Dot, HandThumbsUp } from "react-bootstrap-icons";
import { DefaultCommentRootComponent } from "./DefaultCommentRootComponent.tsx";

export function DefaultDetailBody() {
  async function fetchPostDetail() {
    return axios.get<PostDetailProps>(CData.local_backend + "/posts/detail?num=" + postId).then((res) => {
      return res.data;
    });
  }
  const { data, error, isLoading } = useQuery({ queryKey: queryKeys.PostDetail, queryFn: fetchPostDetail });
  const queryClient = useQueryClient();

  const { postId } = useParams();

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (data === undefined) return <div>No data</div>;
  return (
    <>
      <div className={cssClass.postContainer}>
        <div className={cssClass.postNavigate}>{`침착맨 전체 게시글 >`}</div>
        <div className={cssClass.postHeader}>
          <div className={cssClass.postHeader2}>
            <div className={cssClass.postCategory}>헤헤</div>
            <div className={cssClass.postTitle}>{data.title}</div>
          </div>
        </div>
        <div className={cssClass.postHeader3}>
          <div className={cssClass.postHeader3left}>
            <div>{data.username}</div>
            <Dot className={cssClass.dot} />
            <div>{timeAgo(data.createdDate)}</div>
            <Dot className={cssClass.dot} />
            <FontAwesomeIcon icon={faEye} />
            <div>{data.views}</div>
            <Dot className={cssClass.dot} />
            <HandThumbsUp className={cssClass.likes} />
            <div className={cssClass.likes}>{data.likes}</div>
          </div>
        </div>
      </div>
      <div className={cssClass.postContainer}>
        {isLoading && <div>Loading...</div>}
        {!isLoading && <Lexical readOnly={true} initSerializedEditorState={data?.content} />}
      </div>
      <DefaultCommentRootComponent postId={Number(data.postId)} comments={data?.comments} />
    </>
  );
}
