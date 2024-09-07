import axios from "axios";
import { RData } from "../credential/data.ts";
import Quill from "quill";

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
    const deltaJson = JSON.stringify({
      category: "BEST",
      content: delta,
      title: titleText,
      user: user,
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
      console.error("Error saving content:", error);
      alert("Failed to save content.");
    }
  }
}
