import type { routerDataTree } from "../HeaderNav.tsx";
import { useDispatch } from "react-redux";
import { setHeaderDropDownStatus } from "../../../redux/dropDown/dropDownSlice.tsx";

export function HeaderLevelZero({ theRouterData }: { theRouterData: routerDataTree }) {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(setHeaderDropDownStatus(theRouterData.key));
        return;
      }}
    >
      {theRouterData.korean}
    </button>
  );
}
