import styles from "./Header.module.css";
import { HeaderSubCategory } from "./sub/HeaderSubCategory.tsx";
import { HeaderMain } from "./main/HeaderMain.tsx";
import { HeaderSub } from "./sub/HeaderSub.tsx";
import HeaderDropDown from "./dropdown/HeaderDropDown.tsx";

export function Header() {
    return (
        <div className={styles.container}>
            <HeaderMain/>
            <HeaderSub category={HeaderSubCategory.favorite}/>
            <HeaderSub category={HeaderSubCategory.recent}/>
            <HeaderDropDown/>
        </div>
    );
}
