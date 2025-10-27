import type {routerDataTree} from "../main/nav/HeaderNav.tsx";
import {HeaderLevelOne} from "./HeaderLevelOne.tsx";
import styles from "./HeaderLevelOnes.module.css";

interface HeaderLevelOnesProps {
  routerDataList?: routerDataTree[];
}

export function HeaderLevelOnes({ routerDataList }: HeaderLevelOnesProps) {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        {routerDataList?.map((theRouterData: routerDataTree) => {
          return <HeaderLevelOne key={theRouterData.key} theRouterData={theRouterData} />;
        })}
      </div>
    </div>
  );
}
