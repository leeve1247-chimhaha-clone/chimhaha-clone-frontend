import cssClass from "./PostDetail.module.css";
import { SubmitLikeButton } from "../../body/submit/SubmitLikeButton.tsx";
import { ArrowLeft, ArrowRight, BookmarkFill, ListTask } from "react-bootstrap-icons";

export function PostDetailAuthRequired() {
  return (
    <>
      <div className={cssClass.containerRow}>
        <SubmitLikeButton className={cssClass.button} />
        <button className={cssClass.button}>싫어요</button>
      </div>
      <div className={cssClass.containerRow}>
        <button className={cssClass.button}>
          <BookmarkFill />
          스크랩 추가
        </button>
      </div>
      <div className={cssClass.containerRow2}>
        <button className={cssClass.button}>
          <ArrowLeft />
          이전글
        </button>
        <button className={cssClass.button}>
          <ListTask />
          목록
        </button>
        <button className={cssClass.button}>
          <ArrowRight />
          다음글
        </button>
      </div>
    </>
  );
}
