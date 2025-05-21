import cssClass from "../component/comment/CommentComponent.module.css";

export function DefaultCommentTail(props: { likeThisComment: () => Promise<void>; openReplyEditor?: () => void })
{
  return (
    <div className={cssClass.commentTailContainer}>
      <button className={cssClass.button} onClick={props.openReplyEditor}>답글</button>
      <button className={cssClass.button} onClick={props.likeThisComment}>
        좋아요
      </button>
    </div>
  );
}
