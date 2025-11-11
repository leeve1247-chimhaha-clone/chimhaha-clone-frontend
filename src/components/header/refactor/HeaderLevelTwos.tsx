import type { routerDataTree } from "../main/nav/HeaderNav.tsx";
import styles from "./HeaderLevelTwos.module.css";
import { HeaderLevelTwo } from "./HeaderLevelTwo.tsx";

export function HeaderLevelTwos({ theRouterDataList }: { theRouterDataList: routerDataTree[] }) {
  return (
    <div className={styles.container}>
      {theRouterDataList?.map((theRouterData: routerDataTree) => {
        return <HeaderLevelTwo key={theRouterData.key} theRouterData={theRouterData} />;
      })}
    </div>
  );
}
