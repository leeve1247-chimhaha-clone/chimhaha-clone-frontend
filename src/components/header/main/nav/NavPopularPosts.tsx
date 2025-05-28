import { useDispatch } from "react-redux";
import { setHeaderDropDownStatus } from "../../../../redux/dropDown/dropDownSlice.tsx";
import { useNavigate } from "react-router-dom";
import { ChevronDoubleUp } from "react-bootstrap-icons";

export function NavPopularPosts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        dispatch(setHeaderDropDownStatus(""));
        navigate("/");
      }}
    >
      인기글 <ChevronDoubleUp />
    </button>
  );
}
