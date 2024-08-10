import { createBrowserRouter } from "react-router-dom";
import { App } from "./App.tsx";
import { Login } from "./page/Login.tsx";
import { Post } from "./page/Post.tsx";
import { New } from "./page/head/New.tsx";
import { Chim } from "./page/head/Chim.tsx";
import { Humor } from "./page/head/Humor.tsx";
import { Hobby } from "./page/head/Hobby.tsx";
import { Life } from "./page/head/Life.tsx";
import { Sports } from "./page/head/Sports.tsx";
import { Best } from "./page/head/Best.tsx";
import { Internet } from "./page/head/Internet.tsx";
import { Check } from "./page/head/Check.tsx";
import { GoodsReview } from "./page/head/GoodsReview.tsx";
import { Management } from "./page/head/Management.tsx";
import { Fakemon } from "./page/head/Fakemon.tsx";
import { Report } from "./page/head/Report.tsx";

export const ROUTES = {
  About: "about",
  Chim: "chim",
  Contact: "contact",
  Hobby: "hobby",
  Home: "/",
  Humor: "humor",
  Internet: "internet",
  Life: "life",
  Login: "login",
  Management: "management",
  New: "new",
  Post: "post",
  Sports: "sports",
  Best: "best",
  Fakemon: "fakemon",
  GoodsReview: "goods-review",
  Check: "check",
  Report: "report"
};

export const router = createBrowserRouter([
  {
    path: ROUTES.Home,
    element: <App />,
    children: [
      { path: ROUTES.Login, element: <Login />, },
      { path: ROUTES.Post, element: <Post />, }, // 글쓰기
      { path: ROUTES.Best, element: <Best /> }, // 인기글
      {
        path: ROUTES.New,
        children: [
          { index: true, element: <New />, }, // 전체글
          { path: ROUTES.Chim, element: <Chim /> }, //
          { path: ROUTES.Humor, element: <Humor /> },
          { path: ROUTES.Sports, element: <Sports />, },
          { path: ROUTES.Hobby, element: <Hobby /> },
          { path: ROUTES.Internet, element: <Internet/>}
        ],
      },
      { path: ROUTES.Life, element: <Life /> },
      { path: ROUTES.Check, element:<Check/>},
      { path: ROUTES.GoodsReview , element: <GoodsReview/>},
      { path: ROUTES.Management, element: <Management/>},
      { path: ROUTES.Fakemon, element: <Fakemon/>},
      { path: ROUTES.Report, element: <Report/>}
    ],
  },
]);
