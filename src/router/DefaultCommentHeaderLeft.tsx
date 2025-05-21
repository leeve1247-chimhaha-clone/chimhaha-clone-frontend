import cssClass from "../component/comment/CommentComponent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { CreatedDate } from "../utils/CreatedDate.tsx";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

export function DefaultCommentHeaderLeft(props: { username: string | undefined; date: string; likes: number }) {
  return (
    <div className={cssClass.commentHeaderContainerLeft}>
      <div className={cssClass.username}>{props.username}</div>
      <FontAwesomeIcon className={cssClass.dot} icon={faCircle} />
      <div className={cssClass.date}>
        <CreatedDate date={props.date} />
      </div>
      {!(props.likes === 0) && (
        <>
          <FontAwesomeIcon className={cssClass.dot} icon={faCircle} />
          <div className={cssClass.likes}>
            <FontAwesomeIcon icon={faThumbsUp} />
            <> {props.likes}</>
          </div>
        </>
      )}
    </div>
  );
}
