import type { TheRouterData } from "../HeaderNav.tsx";
import { HeaderLevelZero } from "./HeaderLevelZero.tsx";

export function HeaderLevelZeroes({ theRouterDataList }: { theRouterDataList: TheRouterData[] }) {
  return <>{theRouterDataList?.map((theRouterData: TheRouterData) =>
    <HeaderLevelZero key={theRouterData.key} theRouterData={theRouterData}/>)}
  </>;
}
