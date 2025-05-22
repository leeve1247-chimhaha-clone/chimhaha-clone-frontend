import type { PostDetailProps } from "../component/post/PostDetailProps.tsx";
import cssClass from "../component/post/PostDetail.module.css";
import { Dot, HandThumbsUp } from "react-bootstrap-icons";
import { timeAgo } from "../utils/CreatedDate.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

export function DefaultDetailHeader({ korean, data }: { korean: string | undefined; data: PostDetailProps }) {
  return (
    <div className={cssClass.postHeader}>
      <div className={cssClass.postNavigate}>{`${korean} 게시글 >`}</div>
      <div className={cssClass.postHeader2}>
        <div className={cssClass.postCategory}>{korean}</div>
        <div className={cssClass.postTitle}>{data.title}</div>
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
  );
}
