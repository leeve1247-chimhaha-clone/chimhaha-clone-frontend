import { useDispatch } from "react-redux";
import { setHeaderDropDownStatus } from "../../redux/dropDown/dropDownSlice.tsx";

export function NavPopularPosts() {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(setHeaderDropDownStatus(""));
      }}
    >
      인기글
    </button>
  );
}
