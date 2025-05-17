import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { type routerDataTree } from "../HeaderNav.tsx";
import { HeaderLevelOnes } from "../refactor/HeaderLevelOnes.tsx";
import style from "./HeaderDropDown.module.css";
import { queryKeys } from "../queryKeys.tsx";

export default function HeaderDropDown() {
  const headerDropDownStatus = useSelector((state: RootState) => state.headerDropDownStatus.value);
  const routerDataList = useQueryClient().getQueryData<routerDataTree[]>(queryKeys.routerDataList);

  if (headerDropDownStatus === "") {
    return <></>;
  }

  const selectedMenu = routerDataList?.find(routerData => routerData.key === headerDropDownStatus);
  if (selectedMenu) {
    return (
      <div className={style.background}>
        <HeaderLevelOnes routerDataList={selectedMenu.children} />
      </div>
    );
  }
  return <div>There is no Keys in</div>;
}
