import { HeaderMain } from "./component/header/HeaderMain.tsx";
import { HeaderSub } from "./component/header/HeaderSub.tsx";
import { HeaderNav } from "./component/header/HeaderNav.tsx";
import { Outlet } from "react-router";
export function App() {
  return (
    <>
      <header>
        <HeaderSub />
        <HeaderMain />
        <HeaderNav />
      </header>
      <main>
        <Outlet/>
      </main>
      <footer>
        <p>© 2021. All rights reserved.</p>
      </footer>
    </>
  );
}