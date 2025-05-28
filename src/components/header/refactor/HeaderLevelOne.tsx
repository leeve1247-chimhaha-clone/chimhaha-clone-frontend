import type { routerDataTree } from "../main/nav/HeaderNav.tsx";
import { HeaderLevelTwos } from "./HeaderLevelTwos.tsx";
import style from "./HeaderLevelOne.module.css";

export function HeaderLevelOne({ theRouterData }: { theRouterData: routerDataTree }) {
  return (
    <div className={style.itemWrapper}>
      <div>{theRouterData.korean}</div>
      <HeaderLevelTwos theRouterDataList={theRouterData.children} />
    </div>
  );
}
