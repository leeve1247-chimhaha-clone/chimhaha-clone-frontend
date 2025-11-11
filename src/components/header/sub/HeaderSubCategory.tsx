import { ClockFill, StarFill } from "react-bootstrap-icons";
import styles from "../Header.module.css";

export const HeaderSubCategory = {
  favorite: (
    <div className={styles.bContainer}>
      <StarFill />
      즐겨찾기
    </div>
  ),
  recent: (
    <div className={styles.bContainer}>
      <ClockFill />
      최근방문
    </div>
  ),
};
