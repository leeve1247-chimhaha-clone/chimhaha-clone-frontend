import type { TheRouterData } from "../HeaderNav.tsx";

export function HeaderLevelOne({ theRouterData }: { theRouterData: TheRouterData }) {
  return <div>{theRouterData.korean}</div>;
}
