import style from "./CommentComponent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { setCommentPage, setFocusedButton } from "../../redux/comment/commentRootComponentSlice.tsx";
import { queryKeys } from "../../react-query/queryKeys.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Dot } from "react-bootstrap-icons";
import type { RootState } from "../../redux/store.tsx";

function CommentPageButton({ pageNum, id }: { pageNum: number; id?: string }) {
  const dispatch = useDispatch();
  const focusedButton = useSelector((state: RootState) => state.commentRootComponentStatus.focusedButton);
  const ref = useRef<HTMLButtonElement>(null);
  const commentPage = Number(useSelector((state: RootState) => state.commentRootComponentStatus.commentPage));

  useEffect(() => {
    if (ref.current !== null && focusedButton == id) {
      ref.current.scrollIntoView({ behavior: "instant", block: "center" });
      dispatch(setFocusedButton(undefined));
    }
  }, [dispatch, focusedButton, id]);
  if (commentPage === pageNum) {
    return <div className={style.commentPageDiv}>{pageNum}</div>;
  }

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

function NewComponent() {
  return (
    <>
      <Dot />
      <Dot />
      <Dot />
    </>
  );
}

function CommentPageInput({commentPageSize}:{commentPageSize:number}) {
  return (
    <div className={style.commentPageInput}>
      <input type="number" min = {1} max = {commentPageSize} step = {1}/>
      <button className={style.commentPageButton}>이동</button>
    </div>
  );
}

export function CommentPageButtons({ pageSize, id }: { pageSize: number; id?: string }) {
  // TODO: 5개 이하 => 1 2 3 4 5

  // TODO: 6 개 이상이지만 현재 페이지 1~5 => 1,2,3,4,5 맨뒤, [] 수치 입력값
  // TODO: 6 개 이상이지만 마지막 페이지 맨앞 n-4, n-3, n-2, n-1, n [] 수치 입력값
  const commentPage = Number(useSelector((state: RootState) => state.commentRootComponentStatus.commentPage));
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const commentPageSize = Number(queryClient.getQueryData<number>([...queryKeys.CommentPageSize, postId]));
  if (commentPageSize <= 6)
    return (
      <div className={style.spaceBetween}>
        <div className={style.commentPageButtons}>
          {Array.from({ length: pageSize }).map((_, index) => (
            <CommentPageButton key={index} pageNum={index + 1} id={`${id}${index + 1}`} />
          ))}
        </div>
      </div>
    );

  if (commentPage >= 1 && commentPage <= 4) {
    return (
      <div className={style.spaceBetween}>
        <div className={style.commentPageButtons}>
          {Array.from({ length: 5 }).map((_, index) => (
            <CommentPageButton key={index} pageNum={index + 1} id={`${id}${index + 1}`} />
          ))}
          <NewComponent />
          <NewComponent />
          <CommentPageButton pageNum={commentPageSize - 1} id={`${id}${3}`} />
          <CommentPageButton pageNum={commentPageSize} id={`${id}${4}`} />
        </div>
        <CommentPageInput commentPageSize={commentPageSize} />
      </div>
    );
  }

  if (commentPage <= commentPageSize && commentPageSize - 3 <= commentPage) {
    return (
      <div className={style.spaceBetween}>
        <div className={style.commentPageButtons}>
          <CommentPageButton pageNum={1} id={`${id}${1}`} />
          <CommentPageButton pageNum={2} id={`${id}${2}`} />
          <NewComponent />
          <NewComponent />
          <CommentPageButton pageNum={commentPageSize - 4} id={`${id}${commentPageSize - 4}`} />
          <CommentPageButton pageNum={commentPageSize - 3} id={`${id}${commentPageSize - 3}`} />
          <CommentPageButton pageNum={commentPageSize - 2} id={`${id}${commentPageSize - 2}`} />
          <CommentPageButton pageNum={commentPageSize - 1} id={`${id}${commentPageSize - 1}`} />
          <CommentPageButton pageNum={commentPageSize} id={`${id}${commentPageSize}`} />
        </div>
        <CommentPageInput commentPageSize={commentPageSize} />
      </div>
    );
  }

  // 6 개 이상 => 처음, 옆, 중앙, 직후, 맨뒤, [] 수치 입력값
  return (
    <div className={style.spaceBetween}>
      <div className={style.commentPageButtons}>
        <CommentPageButton pageNum={1} id={`${id}${1}`} />
        <CommentPageButton pageNum={2} id={`${id}${2}`} />
        <NewComponent />
        <CommentPageButton pageNum={commentPage - 1} id={`${id}${commentPage - 1}`} />
        <CommentPageButton pageNum={commentPage} id={`${id}${commentPage}`} />
        <CommentPageButton pageNum={commentPage + 1} id={`${id}${commentPage + 1}`} />
        <NewComponent />
        <CommentPageButton pageNum={commentPageSize - 1} id={`${id}${commentPageSize - 1}`} />
        <CommentPageButton pageNum={commentPageSize} id={`${id}${commentPageSize}`} />
      </div>
      <CommentPageInput commentPageSize={commentPageSize} />
    </div>
  );
}
