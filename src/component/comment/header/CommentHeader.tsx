import cssClass from "../CommentComponent.module.css";
import { CommentHeaderLeft } from "./CommentHeaderLeft.tsx";
import { CommentHeaderRight } from "./CommentHeaderRight.tsx";
import type { CommentProps } from "../CommentProps.tsx";

export function CommentHeader(props: {
  comment: CommentProps;
  onClick: () => void;
  modalOpen: boolean;
  onClose: () => void
}) {
  return (
    <div className={cssClass.commentHeaderContainer}>
      <CommentHeaderLeft username={props.comment.username} date={props.comment.lastEditedDate}
                         likes={props.comment.likes} />
      <CommentHeaderRight onClick={props.onClick} isModalOpen={props.modalOpen} onClose={props.onClose} />
    </div>
  );
}
