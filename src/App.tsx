import { Outlet } from "react-router";
import Header from "./component/header/Header.tsx";
import HeaderLine from "./component/header/HeaderLine.tsx";
import { HeaderTitle } from "./component/header/HeaderTitle.tsx";
import { Login } from "./component/header/Login.tsx";
import { HeaderNav } from "./component/header/HeaderNav.tsx";
import HeaderSub from "./component/header/HeaderSub.tsx";
import { HeaderSubCategory } from "./component/header/HeaderSubCategory.tsx";
import HeaderDropDown from "./component/header/dropdown/HeaderDropDown.tsx";
import axios from "axios";
import { useState } from "react";
import { CData } from "../credential/data.ts";
import file from "../public/vite.svg";

export function App() {
  const [state, setState] = useState();

  async function getPresignedUrl() {
    axios
      .get(CData.local_backend+"/get/presigned-url")
      .then((response) => {
        console.log(response.data);
        setState(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function postPresignedUrl() {
    axios.put(CData.local_image_uri+state, file, {
      headers:{
        "Content-Type": "image/svg+xml"
      }
    })
      .then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.error(error);
    })
  }

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
        <div>
          <button onClick={getPresignedUrl}>Get Presigned URL</button>
          <div>{state}</div>
          <button onClick={postPresignedUrl}>Post presigned Image</button>
        </div>
      </main>
      <footer>
        <p>© 2021. All rights reserved.</p>
      </footer>
    </>
  );
}
