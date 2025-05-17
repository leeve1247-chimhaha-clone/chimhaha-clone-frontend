import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router";

export function DefaultBody(props: { routerKey: string }) {
  const navigate = useNavigate();
  return (<>
    <div> Unknown component: {props.routerKey}</div>
    <button onClick={()=>{navigate("submit")}}>Submit</button>
  </>);
}
