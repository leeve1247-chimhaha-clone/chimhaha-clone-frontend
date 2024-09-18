import { useRef } from "react";
import Quill from "quill";
import { PostEditor } from "./PostEditor.tsx";
import cssStyle from "./PostForm.module.css";
import { useAuth } from "react-oidc-context";
import { savePost } from "../../utils/savePost.ts";
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
    navigate("/new/" + axiosResponse?.data);
  }
  function cancelPostContent() {
    navigate("/new");
  }

  return (
    <div className={cssStyle.container}>
      <div className={cssStyle.title}> 카테고리 </div>
      <input className={cssStyle.title} placeholder={"제목을 입력하세요"} ref={title} type="text" />
      <div className={cssStyle.body}>
        <PostEditor ref={quillRef} />
      </div>
      <div className={cssStyle.tail}>
        <button className={cssStyle.buttonCancel} onClick={cancelPostContent}>
          취소
        </button>
        <button className={cssStyle.buttonApply} onClick={sendPostContent}>
          글쓰기
        </button>
      </div>
    </div>
  );
}
