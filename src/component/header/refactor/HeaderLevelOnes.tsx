import type { routerDataTree } from "../HeaderNav.tsx";
import { HeaderLevelOne } from "./HeaderLevelOne.tsx";
import style from "./HeaderLevelOnes.module.css";

interface HeaderLevelOnesProps {
  routerDataList?: routerDataTree[];
}

export function HeaderLevelOnes({ routerDataList }: HeaderLevelOnesProps) {
  return (
    <div className={style.container}>
      <div className={style.subContainer}>
        {routerDataList?.map((theRouterData: routerDataTree) => {
          return <HeaderLevelOne key={theRouterData.key} theRouterData={theRouterData} />;
        })}
      </div>
    </div>
  );
}
