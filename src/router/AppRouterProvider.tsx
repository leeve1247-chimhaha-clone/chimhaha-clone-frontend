import { Suspense, useEffect, useState } from "react";
import { convertToRouteObjects, type RawRouteConfig } from "./convertToRouteObjects.tsx";
import axios from "axios";
import { CData } from "../../credential/data.ts";
import { createBrowserRouter, RouterProvider } from "react-router";

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
        router={router}
      />
    </Suspense>
  );
}
