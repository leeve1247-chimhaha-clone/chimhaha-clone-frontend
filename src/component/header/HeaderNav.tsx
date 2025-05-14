import cssClass from "./HeaderNav.module.css";
import { setHeaderDropDownStatus } from "../../utils/redux/dropDownSlice.tsx";
import { useDispatch } from "react-redux";
import { HeaderLevelZero } from "./HeaderLevelZero.tsx";

export function HeaderNav() {
  const dispatch = useDispatch();
  return (
    <>
      <div className={cssClass.navContainer}>
        <div className={cssClass.list}>
          <button
            onClick={() => {
              dispatch(setHeaderDropDownStatus(""));
            }}
          >
            인기글
          </button>
          <button
            onClick={() => {
              dispatch(setHeaderDropDownStatus(""));
            }}
          >
            전체글
          </button>
          <HeaderLevelZero />
        </div>
      </div>
    </>
  );
}
