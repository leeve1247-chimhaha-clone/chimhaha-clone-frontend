import styles from "../PostSubmit.module.css";
import { PostSubmitCategories } from "./PostSubmitCategories.tsx";
import { PostSubmitInputTitle } from "../PostSubmitInputTitle.tsx";

export function PostSubmitHeader() {
  return (
    <>
      <PostSubmitCategories />
      <div className={styles.headerLeftAlign}>인기글 허용</div>
      <PostSubmitInputTitle />
    </>
  );
}
