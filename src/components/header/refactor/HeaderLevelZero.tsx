import type {routerDataTree} from "../main/nav/HeaderNav.tsx";
import {useDispatch, useSelector} from "react-redux";
import {setHeaderDropDownStatus} from "../../../redux/dropDown/dropDownSlice.tsx";
import type {RootState} from "../../../redux/store.tsx";
import {chevronDownCircleOutline, chevronUpCircleOutline} from "ionicons/icons";
import {IonIcon} from "@ionic/react";

export function HeaderLevelZero({ theRouterData }: { theRouterData: routerDataTree }) {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state.headerDropDownStatus.value);

  function handleDropDownStatus() {
    return () => {
      if (selector === "" || selector !== theRouterData.key) {
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
      {selector === theRouterData.key && <IonIcon icon={chevronUpCircleOutline} />}
      {selector !== theRouterData.key && <IonIcon icon={chevronDownCircleOutline} />}
    </button>
  );
}
