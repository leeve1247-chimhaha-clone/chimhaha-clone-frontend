import { createBrowserRouter } from "react-router-dom";
import { App } from "./App.tsx";
import { Post } from "./page/Post.tsx";
import { New } from "./page/head/New.tsx";
import { PostDetail, postDetailLoader } from "./component/post/PostDetail.tsx";
import { PostUpdateEditor, postUpdateEditorLoader } from "./component/post/PostUpdateEditor.tsx";

export const ROUTES = {
  Home: "/",
  New: "/new",
  Post: "/post",
};

export const router = createBrowserRouter([
  {
    path: ROUTES.Home,
    element: <App />,
    children: [
      { path: ROUTES.Post, element: <Post /> }, // 글쓰기
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
        ],
      },
    ],
  },
]);
