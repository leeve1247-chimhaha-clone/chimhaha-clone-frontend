import type { routerDataTree } from "../main/nav/HeaderNav.tsx";
import { HeaderLevelZero } from "./HeaderLevelZero.tsx";

export function HeaderLevelZeroes({ theRouterDataList }: { theRouterDataList: routerDataTree[] }) {
  return <>{theRouterDataList?.map((theRouterData: routerDataTree) =>
    <HeaderLevelZero key={theRouterData.key} theRouterData={theRouterData}/>)}
  </>;
}
