import { useRef } from "react";
import Quill from "quill";
import axios from "axios";
import {WYSIWYGEditor} from "./WYSIWYGEditor.tsx";

export function PostForm() {
  const quillRef = useRef<Quill>(null);

  const saveContent = async () => {
    if (quillRef.current) {
      const delta = quillRef.current.getContents();
      const deltaJson = JSON.stringify(delta);

      try {
        await axios.post("/api/save", {
          content: deltaJson,
        });
        alert("Content saved successfully!");
      } catch (error) {
        console.error("Error saving content:", error);
        alert("Failed to save content.");
      }
    }
  };

  return (
    <>
      <div>
        <WYSIWYGEditor />
        <button onClick={saveContent}>Save Content</button>
      </div>
    </>
  );
}
