import styles from "../DefaultSubmitBody.module.css";
import { DefaultSubmitBodyCategories } from "./DefaultSubmitBodyCategories.tsx";
import { InputTitle } from "../InputTitle.tsx";

export function DefaultSubmitBodyHeader() {
  return (
    <>
      <DefaultSubmitBodyCategories />
      <div className={styles.headerLeftAlign}>인기글 허용</div>
      <InputTitle />
    </>
  );
}
