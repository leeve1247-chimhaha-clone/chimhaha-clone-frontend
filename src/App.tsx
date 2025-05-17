import { Outlet } from "react-router";
import Header from "./component/header/Header.tsx";
import HeaderLine from "./component/header/HeaderLine.tsx";
import { HeaderTitle } from "./component/header/HeaderTitle.tsx";
import { Login } from "./component/header/Login.tsx";
import { HeaderNav } from "./component/header/HeaderNav.tsx";
import HeaderSub from "./component/header/HeaderSub.tsx";
import { HeaderSubCategory } from "./component/header/HeaderSubCategory.tsx";
import HeaderDropDown from "./component/header/dropdown/HeaderDropDown.tsx";

export function App() {
  return (
    <>
      <Header>
        <HeaderLine>
          <HeaderTitle />
          <HeaderNav />
          <Login />
        </HeaderLine>
        <HeaderDropDown />
        <HeaderLine>
          <HeaderSub headerCategory={HeaderSubCategory.favorite} />
        </HeaderLine>
        <HeaderLine>
          <HeaderSub headerCategory={HeaderSubCategory.recent} />
        </HeaderLine>
      </Header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2021. All rights reserved.</p>
      </footer>
    </>
  );
}
