import { useRef } from "react";
import Quill from "quill";
import axios from "axios";
import { WYSIWYGEditor } from "./WYSIWYGEditor.tsx";
import cssStyle from "./PostForm.module.css";
import { RData } from "../credential/data.ts";
import { useAuth } from "react-oidc-context";

export function PostForm() {
  const quillRef = useRef<Quill>(null);
  const title = useRef<HTMLInputElement>(null);
  const auth = useAuth();

  const saveContent = async () => {
    if (quillRef.current) {
      const delta = quillRef.current.getContents();
      const titleText = title.current?.value;
      const deltaJson = JSON.stringify({
        category: "BEST",
        content: delta,
        title: titleText,
        user: auth?.user?.profile?.sub,
      });
      console.log(auth?.user?.profile?.sub)
      console.log(deltaJson);
      console.log(titleText)
      console.log(auth.user?.access_token)
      try {
        await axios.post(RData.baseUrl+"/save", deltaJson, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${auth.user?.access_token}`,
            }
          }
        );
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
      <input className={cssStyle.title} placeholder={"안녕? 난 제목이라고 해"} ref={title} type="text"/>
      <div>
        <WYSIWYGEditor ref={quillRef} />
        <button onClick={saveContent}>Save Content</button>
      </div>
    </>
  );
}
