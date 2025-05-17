import type { TheRouterData } from "../HeaderNav.tsx";
import { HeaderLevelOne } from "./HeaderLevelOne.tsx";

interface HeaderLevelOnesProps {
  children?: TheRouterData[];
}

export function HeaderLevelOnes({ children }: HeaderLevelOnesProps) {
  return (
    <>
      <div>HeaderLevelOne</div>
      <div>
        {children?.map((theRouterData: TheRouterData) => {
          return <HeaderLevelOne key={theRouterData.key} theRouterData={theRouterData} />;
        })}
      </div>
    </>
  );
}
