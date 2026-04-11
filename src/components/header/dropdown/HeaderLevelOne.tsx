import type { routerDataTree } from "../main/nav/HeaderNav.tsx";
import { HeaderLevelTwos } from "./HeaderLevelTwos.tsx";
import styles from "./HeaderLevelOne.module.css";

export function HeaderLevelOne({ theRouterData }: { theRouterData: routerDataTree }) {
  return (
    <div className={styles.itemWrapper}>
      <div>{theRouterData.korean}</div>
      <HeaderLevelTwos theRouterDataList={theRouterData.children} />
    </div>
  );
}
