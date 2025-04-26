import axios from "axios";
import { ImageData } from "../../credential/data.ts";
import Quill from "quill";
import Delta from "quill-delta";

interface savePostProps {
  quill: Quill | null;
  titleText: string | undefined;
  user: string | undefined;
  access_token: string | undefined;
}
interface updatePostProps extends savePostProps {
  postId: string;
}

export async function savePost({
  quill,
  titleText,
  user,
  access_token,
}: savePostProps) {
  if (quill) {
    const delta = quill.getContents();
    const titleImage = parseImageUrl(delta);
    const deltaJson = JSON.stringify({
      category: "BEST",
      content: delta,
      title: titleText,
      user: user,
      titleImage: titleImage,
    });
    return await axios.post(ImageData.baseUrl + "/save", deltaJson, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  }
}

export interface RemovePostProps {
  postId: string;
  access_token: string;
}

export async function deletePost({ postId, access_token }: RemovePostProps) {
  const deltaJson = JSON.stringify({
    postId: postId,
  });
  return await axios.post(ImageData.baseUrl + "/delete", deltaJson, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function likePost({ postId, access_token}: RemovePostProps) {
  const deltaJson = JSON.stringify({
    num: postId,
  });
  return await axios.post(ImageData.baseUrl + "/posts/like", deltaJson, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function updatePost({
  postId,
  quill,
  titleText,
  user,
  access_token,
}: updatePostProps) {
  if (quill) {
    const delta = quill.getContents();
    const titleImage = parseImageUrl(delta);
    const deltaJson = JSON.stringify({
      postId: postId,
      category: "BEST",
      content: delta,
      title: titleText,
      user: user,
      titleImage: titleImage,
    });
    return await axios.post(ImageData.baseUrl + "/update", deltaJson, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  }
}

function parseImageUrl(delta: Delta): [(string | null), Delta] {
  let titleImageUrl: string | null = null;
  delta.ops.forEach((op => {
    if (op.insert && typeof op.insert === "object" && "image" in op.insert) {
      const url = op.insert.image as string;
      const result = url.match(/\/([^/?]+)\?/);
      if (result) {
        op.insert.image = result[1];
        if (titleImageUrl === null){
          titleImageUrl = result[1];
        }
      }
    }
  }))
  return [titleImageUrl, delta]; // Return undefined if no image URL is found
}
