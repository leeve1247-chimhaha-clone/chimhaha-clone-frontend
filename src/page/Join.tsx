import { HeaderSub } from "../component/header/HeaderSub.tsx";
import { HeaderMain } from "../component/header/HeaderMain.tsx";
import { HeaderNav } from "../component/header/HeaderNav.tsx";

export function Register(){
    return (
      <>
        <header>
          <HeaderSub />
          <HeaderMain />
          <HeaderNav />
        </header>
        <div>
          <h1>회원가입</h1>

        </div>
        <footer>
          <p>© 2021. All rights reserved.</p>
        </footer>
      </>
    );
}