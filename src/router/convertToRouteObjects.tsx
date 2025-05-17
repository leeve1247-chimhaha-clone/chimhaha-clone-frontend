import type { RouteObject } from "react-router";
import { App } from "../App.tsx";

// export const componentMap = {
//   Page1: lazy(() => import("../pages/Page1.tsx")),
//   Page2: lazy(() => import("../pages/Page2.tsx")),
// };

export interface RawRouteConfig {
  id: number;
  level: number;
  key: string;
  korean: string;
  children: RawRouteConfig[];
}

export function convertToRouteObjects(routes: RawRouteConfig[]): RouteObject[] {
  const children = routes.map(({ key }) => {
    return {
      path: `/${key}`,
      element: <div> Unknown component: {key}</div>,
    };
  });
  return [
    {
      path: "/",
      element: <App />,
      children: children,
    },
  ];
}
