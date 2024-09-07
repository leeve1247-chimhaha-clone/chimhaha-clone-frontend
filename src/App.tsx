import { HeaderMain } from "./component/HeaderMain.tsx";
import { HeaderSub } from "./component/HeaderSub.tsx";
import { HeaderNav } from "./component/HeaderNav.tsx";
import { Outlet } from "react-router";
import Quill from "quill";
import { ImageBlot } from "./utils/ImageBlot.ts";

export function App() {
  const RegisteredBlot = Quill.import('blots/block/embed');
  if (RegisteredBlot === ImageBlot) {
  } else {
    Quill.register(ImageBlot);
  }
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