import cssClass from "../Header.module.css";
import { HeaderTitle } from "./title/HeaderTitle.tsx";
import { HeaderNav } from "./nav/HeaderNav.tsx";
import { Login } from "../../login/Login.tsx";

export function HeaderMain() {
  return (
    <div className={cssClass.subContainer}>
      <div>
        <div className={cssClass.headerMainLeft}>
          <HeaderTitle />
          <HeaderNav />
        </div>
        <div className={cssClass.headerMainRight}>
          <Login />
        </div>
      </div>
    </div>
  );
}
