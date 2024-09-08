import { createBrowserRouter } from "react-router-dom";
import { App } from "./App.tsx";
import { Post } from "./page/Post.tsx";
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
import { New } from "./page/head/New.tsx";
import { PostDetail, postDetailLoader } from "./component/post/PostDetail.tsx";
import {
  PostUpdateEditor,
  postUpdateEditorLoader,
} from "./component/post/PostUpdateEditor.tsx";

export const ROUTES = {
  Chim: "chim",
  Contact: "contact",
  Hobby: "hobby",
  Home: "/",
  Humor: "humor",
  Internet: "internet",
  Life: "life",
  Login: "login",
  Management: "management",
  New: "/new",
  Post: "/post",
  Sports: "sports",
  Best: "best",
  Fakemon: "fakemon",
  GoodsReview: "goods-review",
  Check: "check",
  Report: "report",
};

export const router = createBrowserRouter([
  {
    path: ROUTES.Home,
    element: <App />,
    children: [
      { path: ROUTES.Post, element: <Post /> }, // 글쓰기
      {
        path: ROUTES.Best,
        children: [
          { index: true, element: <Best /> },
          {
            path: ":postId",
            loader: postDetailLoader,
            element: <PostDetail />,
          },
        ],
      },
      {
        path: ROUTES.New,
        children: [
          { index: true, element: <New /> }, // 전체글
          {
            path: ":postId",
            loader: postDetailLoader,
            element: <PostDetail />,
          },
          {
            path: ":postId/edit",
            loader: postUpdateEditorLoader,
            element: <PostUpdateEditor />,
          },
          { path: ROUTES.Chim, element: <Chim /> }, //침착맨
          { path: ROUTES.Humor, element: <Humor /> }, //웃음
          { path: ROUTES.Sports, element: <Sports /> }, //스포츠
          { path: ROUTES.Hobby, element: <Hobby /> }, // 취미
          { path: ROUTES.Internet, element: <Internet /> }, //인방
        ],
      },
      { path: ROUTES.Life, element: <Life /> }, //일상(익명)
      { path: ROUTES.Check, element: <Check /> }, //소원의 돌
      { path: ROUTES.GoodsReview, element: <GoodsReview /> }, //구쭈
      { path: ROUTES.Management, element: <Management /> }, //행정실
      { path: ROUTES.Fakemon, element: <Fakemon /> }, // 짭켓몬
      { path: ROUTES.Report, element: <Report /> }, //신고/건의
    ],
  },
]);
