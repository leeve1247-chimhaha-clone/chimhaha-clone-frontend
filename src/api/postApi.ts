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
  async fetchPostList(category: string): Promise<PostProps[] | undefined> {
    try {
      const res = await axios
        .get<PostProps[]>(CData.local_backend + "/posts?category=" + category);
      return res.data;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },

  async fetchPostDetail(postId: string | undefined): Promise<PostDetailProps | ""> {
    if (postId === undefined || postId === null) return Promise.resolve("");
    const res = await axios
      .get<PostDetailProps>(CData.local_backend + "/posts/detail?num=" + postId);
    return res.data;
  },

  async savePost(postData: SavePostData, accessToken: string): Promise<string> {
    const res = await axios
      .post<string>(CData.local_backend + "/save", postData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      });
    return res.data;
  },

  async updatePost(postData: UpdatePostData, accessToken: string): Promise<string> {
    const res = await axios
      .post<string>(CData.local_backend + "/update", postData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      });
    return res.data;
  },

  async likePost(postId: string, accessToken: string): Promise<number | undefined> {
    try {
      const res = await axios
        .post<number>(CData.local_backend + "/posts/like", JSON.stringify({ postId }), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        });
      return res.data;
    } catch {
      return undefined;
    }
  },

  async deletePost(postId: string, accessToken: string): Promise<number | undefined> {
    try {
      const res = await axios
        .post<number>(CData.local_backend + "/delete", JSON.stringify({ postId }), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        });
      return res.data;
    } catch {
      return undefined;
    }
  },

  async fetchPopularPostList(): Promise<Record<Period, PostProps[]> | undefined> {
    try {
      const res = await axios
        .get<Record<Period, PostProps[]>>(CData.local_backend + "/popular_posts");
      return res.data;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },
};
