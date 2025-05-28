import type { RouteObject } from "react-router";
import { App } from "../App.tsx";
import { DefaultBody } from "../components/body/DefaultBody.tsx";
import { DefaultSubmitBody } from "../components/body/submit/DefaultSubmitBody.tsx";
import { DefaultDetailBody } from "../components/post/detail/DefaultDetailBody.tsx";

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
        path: `:${key}`,
        children: [
          {
            path: "",
            element: <DefaultBody />,
          },
          {
            path: "submit",
            element: <DefaultSubmitBody />,
          },
          {
            path: ":postId",
            element: <DefaultDetailBody />,
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
