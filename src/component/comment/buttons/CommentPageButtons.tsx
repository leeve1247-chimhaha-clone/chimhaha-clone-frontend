import style from "../CommentComponent.module.css";

export function CommentPageButtons({ pageSize, handleCommentPage }: {
  pageSize: number;
  handleCommentPage?: (pageNum: number) => void
}) {
  if (handleCommentPage === undefined) return <></>;
  return (
    <div className={style.commentPageButtons}>
      {Array.from({ length: pageSize }).map((_, index) => (
        <button key = {index} className={style.commentPageButton}
          onClick={() => {
            handleCommentPage(index + 1);
          }}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
