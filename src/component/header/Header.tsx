import cssClass from "./Header.module.css";
import { HeaderSubCategory } from "./HeaderSubCategory.tsx";
import { HeaderMain } from "./HeaderMain.tsx";
import { HeaderSub } from "./HeaderSub.tsx";

export function Header() {
  return (
    <div className={cssClass.container}>
      <HeaderMain />
      <HeaderSub category={HeaderSubCategory.favorite} />
      <HeaderSub category={HeaderSubCategory.recent} />
    </div>
  );
}
