import cssClass from "./HeaderDropDown.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store.tsx";
import { HeaderDropDownCategory } from "./HeaderDropDownCategory.tsx";

export default function HeaderDropDown() {
  const headerDropDownStatus = useSelector((state: RootState) => state.headerDropDownStatus.value);

  if (headerDropDownStatus === "") {
    return <></>;
  }
  return (
    <div className={cssClass.background}>
      <div>{HeaderDropDownCategory[headerDropDownStatus].name}</div>
      <div>{HeaderDropDownCategory[headerDropDownStatus].message}</div>
      <div>
        <div />
      </div>
    </div>
  );
}
