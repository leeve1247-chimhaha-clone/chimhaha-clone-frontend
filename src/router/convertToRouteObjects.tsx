import type { RouteObject } from "react-router";
import { App } from "../App.tsx";
import { PostListComponents } from "../components/post/list/PostListComponents.tsx";
import { PostSubmit } from "../components/post/submit/PostSubmit.tsx";
import { PostDetail } from "../components/post/detail/PostDetail.tsx";

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
            element: <PostListComponents />,
          },
          {
            path: "submit",
            element: <PostSubmit />,
          },
          {
            path: ":postId",
            element: <PostDetail />,
          },
        ],
      };
    })
    .concat({
      path: "/ALL",
      element: <PostListComponents />,
    })
    .concat({
      path: "",
      element: <PostListComponents/>
    })
    .concat({
      path:"/mypage",
      element: <div></div>
    })
  ;

  return [
    {
      path: "/",
      element: <App />,
      children: children,
    },
  ];
}
