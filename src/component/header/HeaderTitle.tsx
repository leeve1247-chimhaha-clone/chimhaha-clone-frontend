import { NavLink } from "react-router-dom";
import cssClass from "./HeaderMain.module.css";

export function HeaderTitle() {
  return (
    <NavLink className={cssClass.container} to={"/new"}>
      <div className={cssClass.title}>침하하</div>
      <div className={cssClass.small}>clone</div>
    </NavLink>
  );
}
