import type { RouteObject } from "react-router";
import { App } from "../App.tsx";
import { DefaultBody } from "../component/body/DefaultBody.tsx";
import { DefaultSubmitBody } from "../component/body/DefaultSubmitBody.tsx";

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
  const children = routes
    .map<RouteObject>(({ key }) => {
      return {
        path: `/${key}`,
        children: [
          {
            path: "",
            element: <DefaultBody />,
          },
          {
            path: "submit",
            element: <DefaultSubmitBody />,
          },
        ],
      };
    })
    .concat({
      path: "/ALL",
      element: <DefaultBody />,
    });
  return [
    {
      path: "/",
      element: <App />,
      children: children,
    },
  ];
}
