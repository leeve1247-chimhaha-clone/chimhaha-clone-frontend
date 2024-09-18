import { NavLink } from "react-router-dom";
import cssClass from "./HeaderMain.module.css";
import { HeaderSearch } from "./HeaderSearch.tsx";

export function HeaderMain() {
  return (
    <div className={cssClass.sectionContainer}>
      <NavLink className={cssClass.title} to={"/new"}>
        <div className={cssClass.h1}>침하하</div>
        <div className={cssClass.small}>clone</div>
      </NavLink>
      <HeaderSearch />
    </div>
  );
}
