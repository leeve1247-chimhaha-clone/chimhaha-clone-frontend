import style from "../CommentComponent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import type { CommentComponentDispatch, CommentComponentState } from "../redux/DefaultSubmitBodyStore.tsx";
import { setCommentPage, setFocusedButton } from "../redux/commentComponentReducer.tsx";

function CommentPageButton({ pageNum, id }: { pageNum: number; id?: string }) {
  const dispatch = useDispatch<CommentComponentDispatch>();
  const focusedButton = useSelector((state: CommentComponentState) => state.commentComponentState.focusedButton);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current !== null && focusedButton == id) {
      ref.current.scrollIntoView({ behavior: "instant", block: "center" });
      dispatch(setFocusedButton(undefined));
    }
  }, [dispatch, focusedButton, id]);

  return (
    <button
      ref={ref}
      className={style.commentPageButton}
      onClick={() => {
        dispatch(setCommentPage(pageNum));
        dispatch(setFocusedButton(id));
      }}
    >
      {pageNum}
    </button>
  );
}

export function CommentPageButtons({ pageSize, id }: { pageSize: number; id?: string }) {
  return (
    <div className={style.commentPageButtons}>
      {Array.from({ length: pageSize }).map((_, index) => (
        <CommentPageButton key={index} pageNum={index + 1} id={`${id}${index + 1}`} />
      ))}
    </div>
  );
}
