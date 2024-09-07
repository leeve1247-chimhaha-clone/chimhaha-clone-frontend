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
      titleImage: titleImage
    });
    try {
      await axios.post(RData.baseUrl + "/save", deltaJson, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      alert("Content saved successfully!");
    } catch (error) {
      alert("Failed to save content.");
    }
  }
}

const findImageUrl = (delta: Delta): string | null => {
  for (const op of delta.ops) {
    if (op.insert && typeof op.insert === 'object' && 'image' in op.insert) {
      return (op.insert.image as any).url.slice(-RData.imageIdLength)
    }
  }
  return null; // Return undefined if no image URL is found
};