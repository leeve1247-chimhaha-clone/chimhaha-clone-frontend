import axios from "axios";
import { RData } from "../credential/data.ts";
import Quill from "quill";
import Delta from "quill-delta";

interface savePostProps {
  quill: Quill | null;
  titleText: string | undefined;
  user: string | undefined;
  access_token: string | undefined;
}

export async function savePost({
  quill,
  titleText,
  user,
  access_token,
}: savePostProps) {
  if (quill) {
    const delta = quill.getContents();
    const titleImage = findImageUrl(delta);
    const deltaJson = JSON.stringify({
      category: "BEST",
      content: delta,
      title: titleText,
      user: user,
      titleImage: titleImage,
    });
    return await axios.post(RData.baseUrl + "/save", deltaJson, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  }
}

function findImageUrl(delta: Delta): any {
  for (const op of delta.ops) {
    if (op.insert && typeof op.insert === "object" && "image" in op.insert) {
      const url = (op.insert.image as any).url as string;
      const index = url.indexOf(RData.imagePrefix);
      const result = url.substring(index + RData.imagePrefix.length);
      return result.slice(0);
    }
  }
  return null; // Return undefined if no image URL is found
}
