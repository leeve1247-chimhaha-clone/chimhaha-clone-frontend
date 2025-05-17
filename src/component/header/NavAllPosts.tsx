import { useDispatch } from "react-redux";
import { setHeaderDropDownStatus } from "../../redux/dropDown/dropDownSlice.tsx";

export function NavAllPosts() {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(setHeaderDropDownStatus(""));
      }}
    >
      전체글
    </button>
  );
}
