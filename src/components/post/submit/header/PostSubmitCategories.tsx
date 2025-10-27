import styles from "../PostSubmit.module.css";
import {ChevronDown} from "react-bootstrap-icons";
import {PostSubmitMainCategory} from "./PostSubmitMainCategory.tsx";

export function PostSubmitCategories() {
  return (
    <div className={styles.categories}>
      <PostSubmitMainCategory />
      <button className={`${styles.category} ${styles.categoryInactive}`}>
        <div>카테고리 없음</div>
        <div>
          <ChevronDown />
        </div>
      </button>
    </div>
  );
}
