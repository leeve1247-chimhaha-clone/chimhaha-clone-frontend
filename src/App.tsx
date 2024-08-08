import { HeaderMain } from './component/HeaderMain.tsx';
import { HeaderSub } from './component/HeaderSub.tsx';
import { HeaderNav } from './component/HeaderNav.tsx';
import { PostForm } from "./component/PostForm";

function App() {
  return (
    <>
      <header>
        <HeaderSub />
        <HeaderMain />
        <HeaderNav />
      </header>
      <main>
        <PostForm />
      </main>
      <footer>
        <p>© 2021. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;