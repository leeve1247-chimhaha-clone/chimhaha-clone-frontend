import cssClass from "../CommentComponent.module.css";

export function DefaultCommentTail(props: { likeThisComment: () => Promise<void>; openReplyEditor?: () => void })
{
  return (
    <div className={cssClass.DefaultCommentTail}>
      <div className={cssClass.button} onClick={props.openReplyEditor}>답글</div>
      <button className={cssClass.button} onClick={props.likeThisComment}>등록</button>
    </div>
  );
}
