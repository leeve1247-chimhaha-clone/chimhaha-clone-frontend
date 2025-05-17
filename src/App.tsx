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

interface presignedUrlProps {
  url: string;
  fileName: string;
}

export function App() {
  const [putImageUrl, setPutImageUrl] = useState<string>("");
  const [filename, setFilename] = useState<string>("");

  const [getImageUrl, setGetImageUrl] = useState<string>("");

  async function getPresignedUrlPut() {
    return await axios.get<presignedUrlProps>(CData.local_backend + "/get/presigned-url").then(
      (res) => {
        console.log(res.data);
        setPutImageUrl(res.data.url);
        setFilename(res.data.fileName);
      },
      (error) => {
        console.error(error);
      },
    );
  }

  async function putImage() {
    const response = await fetch("../public/green.png");
    const blob = await response.blob();
    return await axios
      .put(CData.local_image_uri + "/" + putImageUrl, blob, {
        headers: {
          "Content-Type": "image/png",
        },
      })
      .then(
        (res) => {
          if (res.status === 200) {
            console.log(filename);
            return axios
              .get(CData.local_backend + "/get/presigned-url2", {
                params: {
                  filename: filename,
                },
              })
              .then(
                (res) => {
                  console.log(res.data);
                  setGetImageUrl(res.data);
                },
                (error) => {
                  console.error(error);
                },
              );
          }
        },
        (error) => {
          console.error(error);
        },
      );
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
          <button onClick={getPresignedUrlPut}>Get Presigned URL</button>
          <div>{putImageUrl}</div>
          <button onClick={putImage}>Post presigned Image</button>
          <div>{getImageUrl}</div>
          <img src={CData.local_image_uri + "/" + getImageUrl} />
        </div>
      </main>
      <footer>
        <p>© 2021. All rights reserved.</p>
      </footer>
    </>
  );
}
