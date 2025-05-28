import { Outlet } from "react-router";
import { Header } from "./components/header/Header.tsx";

export interface presignedUrlProps {
  url: string;
  fileName: string;
}

export function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2021. All rights reserved.</p>
      </footer>
    </>
  );
}
