import cssClass from "./HeaderNav.module.css";
import { HeaderLevelZeroes } from "./refactor/HeaderLevelZeroes.tsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CData } from "../../../credential/data.ts";
import { queryKeys } from "./queryKeys.tsx";
import { NavPopularPosts } from "./NavPopularPosts.tsx";
import { NavAllPosts } from "./NavAllPosts.tsx";

export interface routerDataTree {
  id: number;
  level: number;
  key: string;
  korean: string;
  children: routerDataTree[];
  theRouterData?: routerDataTree;
}

export function HeaderNav() {
  const { data, error, isLoading } = useQuery({ queryKey: queryKeys.routerDataTree, queryFn: fetchRouterDataList });
  async function fetchRouterDataList() {
    return axios
      .get<routerDataTree[]>(CData.local_backend + "/post-categories")
      .then((response) => {
        // console.log("Data fetched successfully:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data === undefined) return <div>No data</div>;
  return (
    <>
      <div className={cssClass.navContainer}>
        <div className={cssClass.list}>
          <NavPopularPosts />
          <NavAllPosts />
          <HeaderLevelZeroes theRouterDataList={data}/>
        </div>
      </div>
    </>
  );
}
