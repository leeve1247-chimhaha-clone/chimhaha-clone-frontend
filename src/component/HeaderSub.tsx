import cssClass from "./HeaderSub.module.css";
import { NavLink } from "react-router-dom";

export function HeaderSub() {
  return (
    <section className={cssClass.section}>
      <ul className={cssClass.list}>
        <li>알림 표시</li>
        <li>마이페이지</li>
        <li>포인트</li>
        <NavLink to={"login"}>로그인</NavLink>
      </ul>
    </section>
  );
}
