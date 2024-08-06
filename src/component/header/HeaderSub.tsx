import cssClass from "./HeaderSub.module.css";

export function HeaderSub() {
  return (
    <section className={cssClass.section}>
    <ul className={cssClass.list}>
      <li>알림 표시</li>
      <li>마이페이지</li>
      <li>포인트</li>
      <li>로그인</li>
    </ul>
    </section>
  );
}
