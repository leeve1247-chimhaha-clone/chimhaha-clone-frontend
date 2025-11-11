import cssClass from "../CommentComponent.module.css";
import { CreatedDate } from "../../../utils/CreatedDate.tsx";
import { Dot, HandThumbsUp } from "react-bootstrap-icons";

export function CommentHeaderLeft(props: { username: string | undefined; date: string; likes: number; setLikes?: (arg: number) => void }) {
  return (
    <div className={cssClass.commentHeaderContainerLeft}>
      <div className={cssClass.username}>{props.username}</div>
      <Dot className={cssClass.dot} />
      <div className={cssClass.date}>
        <CreatedDate date={props.date} />
      </div>
      {props.likes !== 0 && (
        <>
          <Dot className={cssClass.dot} />
          <div className={cssClass.likes}>
            <HandThumbsUp />
            <> {props.likes}</>
          </div>
        </>
      )}
    </div>
  );
}
