import { NavLink } from "react-router-dom";
import styles from "../../Header.module.css";

export function HeaderTitle() {
  return (
    <NavLink className={styles.headerTitleContainer} to={"/"}>
      <div className={styles.headerTitle}>침하하</div>
      <div className={styles.headerSmall}>clone</div>
    </NavLink>
  );
}
