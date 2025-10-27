import type {routerDataTree} from "../main/nav/HeaderNav.tsx";
import {useNavigate} from "react-router-dom";
import {setHeaderDropDownStatus} from "../../../redux/dropDown/dropDownSlice.tsx";
import {useDispatch} from "react-redux";

export function HeaderLevelTwo({ theRouterData }: { theRouterData: routerDataTree }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div key={theRouterData.key}>
      <button onClick = {()=>{
        navigate('/' + theRouterData.key);
        dispatch(setHeaderDropDownStatus(""));
      }}>{theRouterData.korean}</button>
    </div>
  );
}
