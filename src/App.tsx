import { Outlet, useMatches, useParams } from "react-router";
import { Header } from "./components/header/Header.tsx";
import { useEffect, useRef } from "react";
import type { Params, UIMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initComments } from "./redux/comment/commentRootComponentSlice.tsx";
import { initSubmits } from "./redux/post/submit/submitPostSlice.tsx";

export interface presignedUrlProps {
  url: string;
  fileName: string;
}

export function App() {
  const params = useParams();
  const matches = useMatches();
  const ref = useRef<{
    params: Params<string>;
    matches: UIMatch[];
  }>(undefined);
  const dispatch = useDispatch();

  function isSubmitPage(matches: UIMatch[] | undefined) {
    if (matches === undefined) return false;
    if (matches.length < 3) return false;
    return matches[2].pathname.substring(matches[1].pathname.length, matches[2].pathname.length) === "/submit";
  }

  useEffect(() => {
    const prevParams = ref.current?.params;
    const prevMatches = ref.current?.matches;
    if (prevParams ? prevParams["postId"] : undefined !== params["postId"]) {
      dispatch(initComments());
    }
    if (isSubmitPage(prevMatches) && !isSubmitPage(matches)) {
      dispatch(initSubmits());
    }
    ref.current = { params: params, matches: matches };
  }, [dispatch, matches, params]);

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
