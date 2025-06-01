import { useDispatch } from "react-redux";
import { setHeaderDropDownStatus } from "../../../../redux/dropDown/dropDownSlice.tsx";
import { useNavigate } from "react-router-dom";
import { chevronDownCircleOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

export function NavAllPosts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        dispatch(setHeaderDropDownStatus(""));
        navigate("/All");
      }}
    >
      전체글
    </button>
  );
}
