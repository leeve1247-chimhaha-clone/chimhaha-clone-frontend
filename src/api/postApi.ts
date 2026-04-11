import axios from "axios";
import { CData } from "../../credential/data.ts";
import type { PostProps } from "../components/post/list/PostProps.tsx";
import type { PostDetailProps } from "../components/post/detail/PostDetailProps.tsx";
import type { SerializedEditorState } from "lexical";

type Period = "daily" | "weekly" | "monthly" | "all";

interface SavePostData {
  title: string;
  category: string;
  content: SerializedEditorState;
}

interface UpdatePostData extends SavePostData {
  postId: string | null;
}

export const postApi = {
  fetchPostList(category: string): Promise<PostProps[] | undefined> {
    return axios
      .get<PostProps[]>(CData.local_backend + "/posts?category=" + category)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        return undefined;
      });
  },

  fetchPostDetail(postId: string | undefined): Promise<PostDetailProps | ""> {
    if (postId === undefined || postId === null) return Promise.resolve("");
    return axios
      .get<PostDetailProps>(CData.local_backend + "/posts/detail?num=" + postId)
      .then((res) => res.data);
  },

  savePost(postData: SavePostData, accessToken: string): Promise<string> {
    return axios
      .post<string>(CData.local_backend + "/save", postData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data);
  },

  updatePost(postData: UpdatePostData, accessToken: string): Promise<string> {
    return axios
      .post<string>(CData.local_backend + "/update", postData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data);
  },

  likePost(postId: string, accessToken: string): Promise<number | undefined> {
    return axios
      .post<number>(CData.local_backend + "/posts/like", JSON.stringify({ postId }), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data)
      .catch(() => undefined);
  },

  deletePost(postId: string, accessToken: string): Promise<number | undefined> {
    return axios
      .post<number>(CData.local_backend + "/delete", JSON.stringify({ postId }), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data)
      .catch(() => undefined);
  },

  fetchPopularPostList(): Promise<Record<Period, PostProps[]> | undefined> {
    return axios
      .get<Record<Period, PostProps[]>>(CData.local_backend + "/popular_posts")
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        return undefined;
      });
  },
};
