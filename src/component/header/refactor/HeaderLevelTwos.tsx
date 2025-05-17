import type { routerDataTree } from "../HeaderNav.tsx";
import style from "./HeaderLevelTwos.module.css";
import { HeaderLevelTwo } from "./HeaderLevelTwo.tsx";

export function HeaderLevelTwos({ theRouterDataList }: { theRouterDataList: routerDataTree[] }) {
  return (
    <div className={style.container}>
      {theRouterDataList?.map((theRouterData: routerDataTree) => {
        return <HeaderLevelTwo key={theRouterData.key} theRouterData={theRouterData} />;
      })}
    </div>
  );
}
