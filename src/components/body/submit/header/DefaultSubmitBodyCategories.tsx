import styles from "../DefaultSubmitBody.module.css";

export function DefaultSubmitBodyCategories() {
  return (
    <div className={styles.headerSpaceBetween}>
      <div className={styles.category}>대분류</div>
      <div className={styles.category}>소분류</div>
    </div>
  );
}
