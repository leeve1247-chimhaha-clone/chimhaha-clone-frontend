import cssClass from "./Header.module.css";
import { HeaderTitle } from "./HeaderTitle.tsx";
import { HeaderNav } from "./HeaderNav.tsx";
import { Login } from "../login/Login.tsx";

export function HeaderMain() {
  return (
    <div className={cssClass.subContainer}>
      <HeaderTitle />
      <HeaderNav />
      <Login />
    </div>
  );
}
