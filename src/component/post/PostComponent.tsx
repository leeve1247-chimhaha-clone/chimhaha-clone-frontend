import cssClass from "./PostComponent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CreatedDate } from "../../utils/CreatedDate.tsx";
import { Category } from "../Category.tsx";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import {
  faEye,
  faFileLines,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-router-dom";
import { ImageThumbNail } from "../ImageThumbNail.tsx";

export interface PostItem {
  title: string;
  content: string;
  username: string;
  status: string;
  views: number;
  category: string;
  post: string;
  createdDate: string;
  likes: number;
  postId?: number;
  titleImageId?: string;
  commentsCount?: number;
}

export function PostComponent({ post }: { post: PostItem }) {
  const postId = post.postId;
  console.log(post)
  return (
    <NavLink to={postId?.toString() ?? ""} className={cssClass.postContainer}>
      {post.titleImageId ? (
        <ImageThumbNail
          imageId={post.titleImageId}
          className={cssClass.image}
        ></ImageThumbNail>
      ) : (
        <FontAwesomeIcon className={cssClass.image} icon={faFileLines} />
      )}
      <div className={cssClass.rightSection}>
        <div className={cssClass.firstLine}>
          <Category className={cssClass.category} category={post.category} />
          <div className={cssClass.title}>{post.title}</div>
          <div className={cssClass.commentsCount}>{post.commentsCount}</div>
        </div>
        <div className={cssClass.secondLine}>
          <div>{post.username}</div>
          <FontAwesomeIcon className={cssClass.dot} icon={faCircle} />
          <CreatedDate date={post.createdDate} />
          <FontAwesomeIcon className={cssClass.dot} icon={faCircle} />
          <FontAwesomeIcon icon={faEye} />
          <div>{post.views}</div>
          {post.likes > 0 && (
            <>
              <FontAwesomeIcon className={cssClass.dot} icon={faCircle} />
              <FontAwesomeIcon className={cssClass.likes} icon={faThumbsUp} />
              <div className={cssClass.likes}>{post.likes}</div>
            </>
          )}
        </div>
      </div>
    </NavLink>
  );
}
