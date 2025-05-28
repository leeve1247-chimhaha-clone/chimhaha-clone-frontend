import { NavLink } from "react-router-dom";
import cssClass from "../../Header.module.css";

export function HeaderTitle() {
  return (
    <NavLink className={cssClass.headerTitleContainer} to={"/"}>
      <div className={cssClass.headerTitle}>침하하</div>
      <div className={cssClass.headerSmall}>clone</div>
    </NavLink>
  );
}
