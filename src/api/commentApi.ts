import axios from "axios";
import { CData } from "../../credential/data.ts";
import type { CommentProps } from "../components/comment/CommentProps.tsx";
import type { SerializedEditorState } from "lexical";

interface SaveCommentData {
  postId: string;
  commentId?: number;
  content: SerializedEditorState;
}

interface DeleteCommentData {
  postId: string;
  commentId: string;
}

export const commentApi = {
  fetchCommentPageSize(postId: string | undefined): Promise<number | void> {
    return axios
      .get<number>(CData.local_backend + "/get/comment/page-size", {
        params: { postId },
      })
      .then((res) => res.data)
      .catch(console.error);
  },

  fetchCommentPage(postId: string | undefined, pageNum: number | undefined): Promise<CommentProps[] | void> {
    return axios
      .get<CommentProps[]>(CData.local_backend + "/get/comment/page", {
        params: {
          postId,
          pageNum: pageNum !== undefined && pageNum !== 0 ? String(pageNum) : String(1),
        },
      })
      .then((res) => res.data)
      .catch(console.error);
  },

  saveComment(commentData: SaveCommentData, accessToken: string): Promise<number | undefined> {
    return axios
      .post<number>(CData.local_backend + "/save/comment", commentData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data)
      .catch(() => undefined);
  },

  deleteComment(commentData: DeleteCommentData, accessToken: string): Promise<number | undefined> {
    return axios
      .post<number>(CData.local_backend + "/delete/comment", commentData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data)
      .catch(() => undefined);
  },

  updateComment(commentData: SaveCommentData & { commentId: string }, accessToken: string): Promise<number | undefined> {
    return axios
      .post<number>(CData.local_backend + "/update/comment", commentData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data)
      .catch(() => undefined);
  },

  likeComment(commentId: string, accessToken: string): Promise<number> {
    return axios
      .post<number>(CData.local_backend + "/comments/like", { commentId }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data);
  },
};
