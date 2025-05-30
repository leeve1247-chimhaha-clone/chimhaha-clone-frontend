import { useDispatch } from "react-redux";
import { setHeaderDropDownStatus } from "../../../../redux/dropDown/dropDownSlice.tsx";
import { useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { chevronUpCircleOutline } from "ionicons/icons";

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
      인기글<IonIcon icon={chevronUpCircleOutline} />
    </button>
  );
}
