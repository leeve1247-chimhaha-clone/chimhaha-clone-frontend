import cssClass from "./HeaderNav.module.css";

export function HeaderNav() {
  return <>
    <nav className={cssClass.navContainer}>
      <ul className={cssClass.list}>
        <li>👍인기글</li>
        <li>전체글</li>
        <li>침착맨</li>
        <li>웃음</li>
        <li>스포츠</li>
        <li>취미</li>
        <li>인방</li>
        <li>일상(익명)</li>
        <li>소원의 돌</li>
        <li>구쭈</li>
        <li>행정실</li>
        <li>⭐이벤트</li>
      </ul>
      <div>
        신고/건의
      </div>
    </nav>
  </>;
}