import type { CommentProps } from "../CommentComponent.tsx";
import cssClass from "../CommentComponent.module.css";
import { DefaultCommentHeaderLeft } from "./DefaultCommentHeaderLeft.tsx";
import { DefaultCommentHeaderRight } from "./DefaultCommentHeaderRight.tsx";

export function DefaultCommentHeader(props: {
  comment: CommentProps;
  onClick: () => void;
  modalOpen: boolean;
  onClose: () => void
}) {
  return (
    <div className={cssClass.commentHeaderContainer}>
      <DefaultCommentHeaderLeft username={props.comment.username} date={props.comment.lastEditedDate}
                                likes={props.comment.likes} />
      <DefaultCommentHeaderRight onClick={props.onClick} isModalOpen={props.modalOpen} onClose={props.onClose} />
    </div>
  );
}
