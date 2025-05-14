import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { componentMap, convertToRouteObjects, RawRouteConfig } from "./convertToRouteObjects.tsx";
import axios from "axios";
import { CData } from "../../credential/data.ts";

export interface RouteConfig {
  path: string;
  component: keyof typeof componentMap;
  children?: RouteConfig[];
}

export function AppRouterProvider() {
  const [router, setRouter] = useState<ReturnType<typeof createBrowserRouter> | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    axios
      .get<RawRouteConfig[]>(CData.local_backend + "/post-categories/flat")
      .then((res) => {
        const routeObjects = convertToRouteObjects(res.data);
        setRouter(
          createBrowserRouter(routeObjects, {
            // until when React Router v7 is released.
            future: {
              v7_relativeSplatPath: true,
            },
          }),
        );
      })
      .catch((err) => {
        console.error(err);
        setError("라우트를 불러오는 데 실패했습니다.");
      });
  }, []);

  if (error) return <div>{error}</div>;
  if (!router) return <div>라우트 준비 중...</div>;

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <RouterProvider
        // until when React Router v7 is released.
        future={{
          v7_startTransition: true,
        }}
        router={router}
      />
    </Suspense>
  );
}
