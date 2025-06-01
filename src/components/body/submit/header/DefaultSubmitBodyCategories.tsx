import styles from "../DefaultSubmitBody.module.css";
import { ChevronDown } from "react-bootstrap-icons";
import { SubmitBodyMainCategory } from "./SubmitBodyMainCategory.tsx";

export function DefaultSubmitBodyCategories() {
  return (
    <div className={styles.categories}>
      <SubmitBodyMainCategory />
      <button className={`${styles.category} ${styles.categoryInactive}`}>
        <div>카테고리 없음</div>
        <div>
          <ChevronDown />
        </div>
      </button>
    </div>
  );
}
