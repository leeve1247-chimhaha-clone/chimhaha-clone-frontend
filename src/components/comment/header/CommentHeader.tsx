import cssClass from "../CommentComponent.module.css";
import { CommentHeaderLeft } from "./CommentHeaderLeft.tsx";
import { CommentHeaderRight } from "./CommentHeaderRight.tsx";
import type { CommentProps } from "../CommentProps.tsx";
import { useDispatch, useSelector } from "react-redux";
import { setCommentLike } from "../../../redux/comment/commentRootComponentSlice.tsx";
import type { RootState } from "../../../redux/store.tsx";

export function CommentHeader(props: { comment: CommentProps; onClick: () => void; modalOpen: boolean; onClose: () => void }) {

  const dispatch = useDispatch();
  const likesData = useSelector((state: RootState) => state.commentRootComponentStatus.commentLikes[String(props.comment.id)]);
  if (likesData === undefined) {
    dispatch(setCommentLike({ commentId: String(props.comment.id), likes: props.comment.likes, selfLiked: props.comment.selfLiked }))
  }
  return (
    <div className={cssClass.commentHeaderContainer}>
      <CommentHeaderLeft username={props.comment.username} date={props.comment.lastEditedDate} likes={likesData?.likes === undefined ? 0 : likesData.likes} />
      <CommentHeaderRight comment={props.comment} onClick={props.onClick} isModalOpen={props.modalOpen} onClose={props.onClose} />
    </div>
  );
}
