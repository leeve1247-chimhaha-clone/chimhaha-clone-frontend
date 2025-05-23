import type { routerDataTree } from "../main/nav/HeaderNav.tsx";
import { useDispatch, useSelector } from "react-redux";
import { setHeaderDropDownStatus } from "../../../redux/dropDown/dropDownSlice.tsx";
import type { RootState } from "../../../redux/store.tsx";

export function HeaderLevelZero({ theRouterData }: { theRouterData: routerDataTree }) {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state.headerDropDownStatus.value);

  function handleDropDownStatus() {
    return () => {
      if (selector === "") {
        dispatch(setHeaderDropDownStatus(theRouterData.key));
        return;
      }
      if (selector === theRouterData.key) {
        dispatch(setHeaderDropDownStatus(""));
        return;
      }
      return;
    };
  }

  return (
    <button
      onClick={handleDropDownStatus()}>
      {theRouterData.korean}
    </button>
  );
}
