import type { TheRouterData } from "../HeaderNav.tsx";
import { HeaderLevelOnes } from "./HeaderLevelOnes.tsx";

export function HeaderLevelZero({theRouterData}: {theRouterData: TheRouterData}) {
  return (
    <div>
      <div>{theRouterData.korean}</div>
      <HeaderLevelOnes children={theRouterData.children}/>
    </div>
  );
}
