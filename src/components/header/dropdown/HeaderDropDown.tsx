import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { type routerDataTree } from "../main/nav/HeaderNav.tsx";
import { HeaderLevelOnes } from "./HeaderLevelOnes.tsx";
import styles from "./HeaderDropDown.module.css";
import { queryKeys } from "../../../react-query/queryKeys.tsx";

export default function HeaderDropDown() {
  const headerDropDownStatus = useSelector((state: RootState) => state.headerDropDownStatus.value);
  const routerDataList = useQueryClient().getQueryData<routerDataTree[]>(queryKeys.routerDataTree);

  if (headerDropDownStatus === "") {
    return <></>;
  }

  const selectedMenu = routerDataList?.find(routerData => routerData.key === headerDropDownStatus);
  if (selectedMenu) {
    return (
      <div className={styles.background}>
        <HeaderLevelOnes routerDataList={selectedMenu.children} />
      </div>
    );
  }
  return <div>There is no Keys in</div>;
}
