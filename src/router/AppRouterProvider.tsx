import { Suspense } from "react";
import { convertToRouteObjects, type RawRouteConfig } from "./convertToRouteObjects.tsx";
import axios from "axios";
import { CData } from "../../credential/data.ts";
import { createBrowserRouter, RouterProvider } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../react-query/queryKeys.tsx";

export function AppRouterProvider() {
  const { data, error, isLoading } = useQuery({ queryKey: queryKeys.RouterDataFlat, queryFn: fetchRouterDataFlat });
  async function fetchRouterDataFlat() {
    return axios.get<RawRouteConfig[]>(CData.local_backend + "/post-categories/flat").then((res) => {
      return res.data;
    });
  }
  if (error) return <div>error</div>;
  if (isLoading) return <div>라우트 준비 중...</div>;
  if (!data) return <div>데이터 준비 중...</div>;
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <RouterProvider router={createBrowserRouter(convertToRouteObjects(data))} />
    </Suspense>
  );
}
