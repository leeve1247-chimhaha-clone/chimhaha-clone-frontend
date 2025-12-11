import type { LexicalEditor } from "lexical";
import { type BaseSyntheticEvent, type RefObject, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CData } from "../../../../credential/data.ts";
import { useAuth } from "react-oidc-context";
import { useLocation, useMatches } from "react-router";
import { setCategory } from "../../../redux/post/submit/submitPostSlice.tsx";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import styles from "./PostSubmit.module.css";
import { clearImageSrcInEditorState } from "./functions/clearImageSrcInEditorState.ts";
import { isEmpty } from "./functions/isEmpty.ts";
import type { RootState } from "../../../redux/store.tsx";

export interface PresignedPostProps {
  url: string;
  fields: {
    key: string;
    policy: string;
    [key:string]: string
  };
}

export function PostSubmitPostButton({ ref }: { ref: RefObject<LexicalEditor | undefined> }) {
  const selector = useSelector((state: RootState) => state.submitPostStatus);
  const dispatch = useDispatch();
  const matches = useMatches();
  const auth = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get("postId");
  const [selectedFile, setSelectedFile] = useState<File|null>(null);
  const [presignedData, setPresignedData] = useState<PresignedPostProps|null>(null);

  if (selector.category === undefined) {
    const category = matches[1].pathname.substring(1, matches[1].pathname.length);
    dispatch(setCategory(category));
  }

  function editPost() {
    if (ref.current === undefined) return;
    const editor = ref.current;
    editor.read(() => {
      const editorState = editor.getEditorState();
      const content = editorState.toJSON();
      if (isEmpty(content)) return;
      if (matches.length < 2) return;
      clearImageSrcInEditorState(content);

      const postData = {
        title: selector.title,
        category: selector.category,
        content: content,
        postId: postId
      };

      const access_token = auth?.user?.access_token;
      axios
        .post(CData.local_backend + "/update", postData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`
          }
        })
        .then(async (r) => {
          await queryClient.invalidateQueries({ queryKey: [...queryKeys.PostDetail, postId] });
          navigate("/" + selector.category + "/" + r.data);
        });
    });
  }

  function submitPost() {
    if (ref.current === undefined) return;
    const editor = ref.current;
    editor.read(() => {
      const editorState = editor.getEditorState();
      const content = editorState.toJSON();
      if (isEmpty(content)) return;
      if (matches.length < 2) return;
      clearImageSrcInEditorState(content);
      const postData = {
        title: selector.title,
        category: selector.category,
        content: content
      };

      const access_token = auth?.user?.access_token;
      axios
        .post(CData.local_backend + "/save", postData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`
          }
        })
        .then((r) => {
          navigate("/" + selector.category + "/" + r.data);
        });
    });
  }

  function getPresignedPost() {
    axios.get<PresignedPostProps>(CData.local_backend + "/get/presigned-post", {
      headers: {
        "Content-Type": "application/json",
        "X-File-MimeType": selectedFile?.type,
        Authorization: `Bearer ${auth.user?.access_token}`
      }
    }).then((r) => {
      setPresignedData(r.data);
    });
  }

  function getOnChange() {
    return (event:BaseSyntheticEvent) => {
      console.log(event)
      console.log(event.target.files);
      console.log("Hello");
      setSelectedFile(event.target.files[0])
    };
  }

  function postImage() {
    const formData = new FormData();
    if (presignedData?.fields == undefined) return;
    const fields = presignedData?.fields;

    const {key, ...rest} = fields;
    formData.append('key', key);
    Object.entries(rest).forEach(([key, value])=>{
      formData.append(key, value)
    })

    if (!selectedFile) return;
    formData.append('Content-Type', selectedFile.type)
    formData.append('file', selectedFile)
    axios.post(presignedData?.url, formData).then(r => console.log(r.status)).catch(a=>console.log(a));
  }

  return (
    <>
      <button className={styles.buttonApply}
              onClick={getPresignedPost}
      >Get Presigned Post
      </button>
      <input
        type={"file"}
        onChange={getOnChange()}
      ></input>
      <button className={styles.buttonApply}
      onClick={()=>{postImage()}}>Post To Bucket Yeah
      </button>

      {(postId === undefined || postId === null) && (
        <button className={styles.buttonApply} onClick={submitPost}>
          등록
        </button>
      )}
      {postId !== undefined && postId !== null && (
        <button className={styles.buttonApply} onClick={editPost}>
          수정
        </button>
      )}
    </>
  );
}
