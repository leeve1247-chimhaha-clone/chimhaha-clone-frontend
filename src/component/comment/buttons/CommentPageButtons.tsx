import style from "../CommentComponent.module.css";
import { useDispatch } from "react-redux";
import { setCommentPage } from "../redux/commentComponentSlice.tsx";

export function CommentPageButtons({ pageSize }: { pageSize: number}) {
  const dispatch = useDispatch();

  return (
    <div className={style.commentPageButtons}>
      {Array.from({ length: pageSize }).map((_, index) => (
        <button
          key={index}
          className={style.commentPageButton}
          onClick={() => {
            dispatch(setCommentPage(index + 1));
          }}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
