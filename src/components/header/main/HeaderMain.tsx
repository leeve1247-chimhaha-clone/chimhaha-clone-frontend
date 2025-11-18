import styles from "../Header.module.css";
import { HeaderTitle } from "./title/HeaderTitle.tsx";
import { HeaderNav } from "./nav/HeaderNav.tsx";
import { Account } from "../../login/Account.tsx";

export function HeaderMain() {
  return (
    <div className={`${styles.subContainer} ${styles.subContainerFirst}`}>
      <div>
        <div className={styles.headerMainLeft}>
          <HeaderTitle />
          <HeaderNav />
        </div>
        <div className={styles.headerMainRight}>
          <Account />
        </div>
      </div>
    </div>
  );
}
