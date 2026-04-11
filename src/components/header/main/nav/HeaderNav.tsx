import styles from "./HeaderNav.module.css";
import { HeaderLevelZeroes } from "./HeaderLevelZeroes.tsx";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../react-query/queryKeys.tsx";
import { NavPopularPosts } from "./NavPopularPosts.tsx";
import { NavAllPosts } from "./NavAllPosts.tsx";
import { categoryApi } from "../../../../api/categoryApi.ts";

export interface routerDataTree {
  id: number;
  level: number;
  key: string;
  korean: string;
  children: routerDataTree[];
  theRouterData?: routerDataTree;
}

export function HeaderNav() {
  const { data, error } = useQuery({ queryKey: queryKeys.routerDataTree, queryFn: categoryApi.fetchRouterDataTree });

  if (error) return <div>Error: {error.message}</div>;
  if (data === undefined) return <div>No data</div>;
  return (
    <>
      <div className={styles.navContainer}>
        <div className={styles.list}>
          <NavPopularPosts />
          <NavAllPosts />
          <HeaderLevelZeroes theRouterDataList={data} />
          <button className={styles.myButton}/>
        </div>
      </div>
    </>
  );
}
