import { HeaderSub } from "../component/HeaderSub.tsx";
import { HeaderMain } from "../component/HeaderMain.tsx";
import { HeaderNav } from "../component/HeaderNav.tsx";

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