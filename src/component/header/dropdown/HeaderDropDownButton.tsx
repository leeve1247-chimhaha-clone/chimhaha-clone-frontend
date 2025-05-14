import { HeaderDropDownCategory } from "./HeaderDropDownCategory.tsx";
import { useDispatch, useSelector } from "react-redux";
import { setHeaderDropDownStatus } from "../../../redux/dropDownSlice.tsx";
import { RootState } from "../../../redux/store.tsx";
import cssClass from "./HeaderDropDownButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown, faCircleChevronUp } from "@fortawesome/free-solid-svg-icons";

export default function HeaderDropDownButton({ category }: { category: keyof typeof HeaderDropDownCategory }) {
  const headerDropDownCategoryElement = HeaderDropDownCategory[category];
  const headerDropDownStatus = useSelector((state: RootState) => state.headerDropDownStatus.value);
  const dispatch = useDispatch();

  if (headerDropDownStatus === category) {
    return (
      <>
        <button
          className={cssClass.button}
          onClick={() => {
            dispatch(setHeaderDropDownStatus(""));
            return;
          }}
        >
          {headerDropDownCategoryElement.name}
          <div className={cssClass.icon}>
            <FontAwesomeIcon icon={faCircleChevronUp} />
          </div>
        </button>
      </>
    );
  }

  return (
    <button
      className={cssClass.button}
      onClick={() => {
        dispatch(setHeaderDropDownStatus(category));
        return;
      }}
    >
      {headerDropDownCategoryElement.name}
      <div className={cssClass.icon} >
        <FontAwesomeIcon icon={faCircleChevronDown} />
      </div>
    </button>
  );
}

//
