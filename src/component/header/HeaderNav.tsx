import cssClass from "./HeaderNav.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../router.tsx";

export function HeaderNav() {
  return (
    <>
      <nav className={cssClass.navContainer}>
        <ul className={cssClass.list}>
          <Link to={ROUTES.Best}>👍인기글</Link>
          <Link to={ROUTES.New}>전체글</Link>
          <Link to={ROUTES.New+'/'+ROUTES.Chim}>침착맨</Link>
          <Link to={ROUTES.New+'/'+ROUTES.Humor}>웃음</Link>
          <Link to={ROUTES.New+'/'+ROUTES.Sports}>스포츠</Link>
          <Link to={ROUTES.New+'/'+ROUTES.Hobby}>취미</Link>
          <Link to={ROUTES.New+'/'+ROUTES.Internet}>인방</Link>
          <Link to={ROUTES.Life}>일상(익명)</Link>
          <Link to={ROUTES.GoodsReview}>소원의 돌</Link>
          <Link to={ROUTES.GoodsReview}>구쭈</Link>
          <Link to={ROUTES.Management}>행정실</Link>
          <Link to={ROUTES.Fakemon}>⭐이벤트</Link>
        </ul>
        <Link to = {ROUTES.Report}>신고/건의</Link>
      </nav>
    </>
  );
}
