import cssClass from "../CommentComponent.module.css";
import { CommentHeaderLeft } from "./CommentHeaderLeft.tsx";
import { CommentHeaderRight } from "./CommentHeaderRight.tsx";
import type { CommentProps } from "../CommentProps.tsx";
import { useDispatch, useSelector } from "react-redux";
import type {
  CommentRootComponentDispatch,
  CommentRootComponentState
} from "../redux/root/commentRootComponentStore.tsx";
import { setCommentLike } from "../redux/root/commentRootComponentSlice.tsx";

export function CommentHeader(props: { comment: CommentProps; onClick: () => void; modalOpen: boolean; onClose: () => void }) {

  const dispatch = useDispatch<CommentRootComponentDispatch>();
  const likes = useSelector((state: CommentRootComponentState) => state.commentComponentState.commentLikes[String(props.comment.id)]);
  if (likes === undefined) {
    dispatch(setCommentLike({ commentId: String(props.comment.id), likes: props.comment.likes }))
  }
  return (
    <div className={cssClass.commentHeaderContainer}>
      <CommentHeaderLeft username={props.comment.username} date={props.comment.lastEditedDate} likes={likes} />
      <CommentHeaderRight comment={props.comment} onClick={props.onClick} isModalOpen={props.modalOpen} onClose={props.onClose} />
    </div>
  );
}
