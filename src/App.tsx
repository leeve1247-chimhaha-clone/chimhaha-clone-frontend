import { HeaderMain } from "./component/header/HeaderMain.tsx";
import { HeaderSub } from "./component/header/HeaderSub.tsx";
import { HeaderNav } from "./component/header/HeaderNav.tsx";



function App() {
    return (
      <>
          <header>
              <HeaderSub />
              <HeaderMain/>
              <HeaderNav />
          </header>
        <body>

        </body>
        <footer>
          <p>© 2021. All rights reserved.</p>
        </footer>
      </>
    );
}

export default App;
