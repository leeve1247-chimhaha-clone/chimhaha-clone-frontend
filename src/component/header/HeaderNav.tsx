import cssClass from "./HeaderNav.module.css";
import HeaderDropDownButton from "./dropdown/HeaderDropDownButton.tsx";
import { HeaderDropDownCategoryKeys } from "./dropdown/HeaderDropDownCategory.tsx";
import { setHeaderDropDownStatus } from "../../utils/redux/dropDownSlice.tsx";
import { useDispatch } from "react-redux";

export function HeaderNav() {
  const dispatch = useDispatch();
  return (
    <>
      <div className={cssClass.navContainer}>
        <div className={cssClass.list}>
          <button onClick={()=>{dispatch(setHeaderDropDownStatus(""))}}>인기글</button>
          <button onClick={()=>{dispatch(setHeaderDropDownStatus(""))}}>전체글</button>
          <HeaderDropDownButton category={HeaderDropDownCategoryKeys.topics} />
          <HeaderDropDownButton category={HeaderDropDownCategoryKeys.support} />
          <HeaderDropDownButton category={HeaderDropDownCategoryKeys.event} />
        </div>
      </div>
    </>
  );
}
