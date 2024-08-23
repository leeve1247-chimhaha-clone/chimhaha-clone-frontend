import { useRef } from "react";
import Quill from "quill";
import axios from "axios";
import { WYSIWYGEditor } from "./WYSIWYGEditor.tsx";
import cssStyle from "./PostForm.module.css";

export function PostForm() {
  const quillRef = useRef<Quill>(null);
  const title = useRef<HTMLInputElement>(null);

  const saveContent = async () => {
    if (quillRef.current) {
      const delta = quillRef.current.getContents();
      const titleText = title.current?.value;
      const deltaJson = JSON.stringify({
        content: delta,
        title: titleText,
        category: "category",
        user: "tempUser",
      });

      try {
        await axios.post("/localhost:8080/save", {
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
      <div className={cssStyle.title}> 카테고리 </div>
      <input className={cssStyle.title} placeholder={"안녕? 난 제목이라고 해"}/>
      <div>
        <WYSIWYGEditor ref={quillRef} />
        <button onClick={saveContent}>Save Content</button>
      </div>
    </>
  );
}
