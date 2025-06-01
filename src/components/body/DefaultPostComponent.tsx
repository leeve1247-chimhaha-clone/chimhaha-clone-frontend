import cssClass from "./PostComponent.module.css";
import { CreatedDate } from "../../utils/CreatedDate.tsx";
import { NavLink } from "react-router-dom";
import { ImageThumbNail } from "./ImageThumbNail.tsx";
import type { PostItemProps } from "./PostItemProps.tsx";
import { CircleFill, FileEarmarkText, HandThumbsUp } from "react-bootstrap-icons";

export function DefaultPostComponent({ post }: { post: PostItemProps }) {
  const postId = post.postId;
  return (
    <NavLink to={postId?.toString() ?? ""} className={cssClass.postContainer}>
      {post.titleImageFileName ? (
        <ImageThumbNail fileName={post.titleImageFileName} className={cssClass.imageThumbnailContainer} />
      ) : (
        <FileEarmarkText className={cssClass.imageThumbnailContainer} />
      )}
      <div className={cssClass.rightSection}>
        <div className={cssClass.firstLine}>
          <div className={cssClass.title}>{post.title}</div>
          <div className={cssClass.commentsCount}>{post.commentsCount}</div>
        </div>
        <div className={cssClass.secondLine}>
          <div>{post.username}</div>
          <CircleFill className={cssClass.dot} />
          <CreatedDate date={post.createdDate} />
          <CircleFill className={cssClass.dot} />
          <div>{post.views}</div>
          {post.likes > 0 && (
            <>
              <CircleFill className={cssClass.dot} />
              <HandThumbsUp className={cssClass.likes} />
              <div className={cssClass.likes}>{post.likes}</div>
            </>
          )}
        </div>
      </div>
    </NavLink>
  );
}
