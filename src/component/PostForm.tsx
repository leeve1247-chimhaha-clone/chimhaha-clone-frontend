import { useRef } from "react";
import Quill from "quill";
import { WYSIWYGEditor } from "./WYSIWYGEditor.tsx";
import cssStyle from "./PostForm.module.css";
import { useAuth } from "react-oidc-context";
import { savePost } from "../utils/savePost.ts";
import { useNavigate } from "react-router-dom";

export function PostForm() {
  const quillRef = useRef<Quill>(null);
  const title = useRef<HTMLInputElement>(null);
  const auth = useAuth();
  const navigate = useNavigate();

  async function sendPostContent() {
    const axiosResponse = await savePost({
      quill: quillRef.current,
      titleText: title.current?.value,
      user: auth?.user?.profile?.sub,
      access_token: auth.user?.access_token,
    });
    navigate("/new/" + axiosResponse?.data)
  }

  return (
    <>
      <div className={cssStyle.title}> 카테고리 </div>
      <input
        className={cssStyle.title}
        placeholder={"안녕? 난 제목이라고 해"}
        ref={title}
        type="text"
      />
      <div>
        <WYSIWYGEditor ref={quillRef} />
        <button onClick={sendPostContent}>Save Content</button>
      </div>
    </>
  );
}
