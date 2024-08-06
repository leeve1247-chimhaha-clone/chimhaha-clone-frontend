import { NavLink } from "react-router-dom";
import cssClass from "./HeaderMain.module.css";
import { Search } from "./Search.tsx";

export function HeaderMain({}) {
  return (
    <section className = {cssClass.sectionContainer}>
      <NavLink className={cssClass.title} to={"/"}>
        <h1>
          침하하
          <span className={cssClass.small}>βeta</span>
        </h1>
      </NavLink>
      <Search/>
    </section>
  );
}
