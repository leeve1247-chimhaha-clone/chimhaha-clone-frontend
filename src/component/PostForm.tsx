import Delta from "quill-delta";
import { QuillEditor } from "./QuillEditor.tsx";
import { useRef } from "react";
import Quill from "quill";
import axios from "axios";

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
      <QuillEditor ref={quillRef} defaultValue={new Delta()} />
      <div>
        <button onClick={saveContent}>Save Content</button>
      </div>
    </>
  );
}
