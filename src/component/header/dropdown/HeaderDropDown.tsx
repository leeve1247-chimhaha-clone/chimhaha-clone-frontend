import cssClass from "./HeaderDropDown.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/redux/store.tsx";
import DropDownGrid from "./DropDownGrid.tsx";
import DropDownElement from "./DropDownElement.tsx";
import { HeaderDropDownCategory } from "./HeaderDropDownCategory.tsx";



export default function HeaderDropDown() {
  const headerDropDownStatus = useSelector((state: RootState) => state.headerDropDownStatus.value);

  if (headerDropDownStatus === "") {
    return <></>;
  }
  return (
    <div className={cssClass.background}>
      <div>
      {HeaderDropDownCategory[headerDropDownStatus].name}
      </div>
      <div>
      {HeaderDropDownCategory[headerDropDownStatus].message}
      </div>
      <DropDownGrid row={2} col={5}>
        <DropDownElement group={headerDropDownStatus} />
      </DropDownGrid>
    </div>
  );
}
