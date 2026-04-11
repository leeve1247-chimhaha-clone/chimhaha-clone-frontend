import axios from "axios";
import { CData } from "../../credential/data.ts";
import type { CommentProps } from "../components/comment/CommentProps.tsx";
import type { SerializedEditorState, SerializedLexicalNode } from "lexical";

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
  async fetchCommentPageSize(postId: string | undefined): Promise<number | void> {
    try {
      const res = await axios
        .get<number>(CData.local_backend + "/get/comment/page-size", {
          params: { postId }
        });
      return res.data;
    } catch (data) {
      return console.error(data);
    }
  },

  async fetchCommentPage(postId: string | undefined, pageNum: number | undefined): Promise<CommentProps[] | void> {
    try {
      const res = await axios
        .get<CommentProps[]>(CData.local_backend + "/get/comment/page", {
          params: {
            postId,
            pageNum: pageNum !== undefined && pageNum !== 0 ? String(pageNum) : String(1)
          }
        });
      return res.data;
    } catch (data) {
      return console.error(data);
    }
  },

  async saveComment(commentData: SaveCommentData, accessToken: string): Promise<number | undefined> {
    try {
      const res = await axios
        .post<number>(CData.local_backend + "/save/comment", commentData, {
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

  async deleteComment(commentData: DeleteCommentData, accessToken: string): Promise<number | undefined> {
    try {
      const res = await axios
        .post<number>(CData.local_backend + "/delete/comment", commentData, {
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

  async updateComment(commentData: {
    postId: string;
    commentId: string;
    content: SerializedEditorState<SerializedLexicalNode>
  }, accessToken: string): Promise<number | undefined> {
    try {
      const res = await axios
        .post<number>(CData.local_backend + "/update/comment", commentData, {
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

  async likeComment(commentId: string, accessToken: string): Promise<number> {
    const res = await axios
      .post<number>(CData.local_backend + "/comments/like", { commentId }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      });
    return res.data;
  },
};
