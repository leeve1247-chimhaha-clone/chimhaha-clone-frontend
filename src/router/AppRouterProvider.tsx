import { Suspense } from "react";
import { convertToRouteObjects } from "./convertToRouteObjects.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../react-query/queryKeys.tsx";
import { categoryApi } from "../api/categoryApi.ts";

export function AppRouterProvider() {
  const { data, error, isLoading } = useQuery({ queryKey: queryKeys.RouterDataFlat, queryFn: categoryApi.fetchRouterDataFlat });
  if (error) return <div>error</div>;
  if (isLoading) return <div>라우트 준비 중...</div>;
  if (!data) return <div>데이터 준비 중...</div>;
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <RouterProvider router={createBrowserRouter(convertToRouteObjects(data))} />
    </Suspense>
  );
}
