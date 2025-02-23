import Quill from "quill";
import { forwardRef, useEffect } from "react";
import "../WYSIWYGEditor.css";
import Delta from "quill-delta";
import axios from "axios";
import { ImageData } from "../../../credential/data.ts";
import { useAuth } from "react-oidc-context";


interface EditorProps {
  defaultValue?: Delta;
  editState?: boolean;
}

export const PostEditor = forwardRef<Quill, EditorProps>(({ defaultValue, editState }, quillRef) => {
  const authedHeaders = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${useAuth().user?.access_token}`,
  };
  useEffect(() => {
    if (quillRef === null || typeof quillRef === "function") return;
    const container = document.getElementById("editor") as HTMLElement;
    const toolbarOptions = {
      container: [
        [{ font: [] }],
        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        ["image"],
        ["bold", "italic", "underline", "strike"], // toggled buttons

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        ["clean"], // remove formatting button
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["undo", "redo"],
      ],
      handlers: {
        undo: function () {
          quillRef.current?.history.undo();
        },
        redo: function () {
          quillRef.current?.history.redo();
        },
        image: function () {
          if (quillRef.current !== null) imageHandler(quillRef.current, authedHeaders);
        },
      },
    };

    // 1. read
    if (container && !quillRef.current) {
      if (!editState && defaultValue !== undefined) {
        quillRef.current = new Quill(container, { readOnly: true });
        quillRef.current.setContents(defaultValue);
      } else {
        // 2. create
        quillRef.current = new Quill(container, {
          modules: {
            history: {
              delay: 1000,
              maxStack: 100,
              userOnly: false,
            },
            toolbar: toolbarOptions,
          },
          theme: "snow",
        });
        // 3. update
        if (editState && defaultValue !== undefined) {
          quillRef.current.setContents(defaultValue);
        }
      }
    }
  }, [defaultValue, editState, quillRef]);

  return <div id="editor" style={{ height: "400px" }} />; // Ensure the editor has a height
});

function imageHandler(quill: Quill, authedHeaders: Record<string, string>) {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();
  input.addEventListener("change", async () => {
    try {
      const file = input.files ? input.files[0] : "";
      const formData = new FormData();
      formData.append("file", file);
      const axiosResponse = await axios.post(ImageData.baseUrl + "/upload/image", formData, {
        headers: authedHeaders,
      });
      const range = quill.getSelection();
      if (range?.index !== undefined) quill.insertEmbed(range?.index, "image", axiosResponse.data);
    } catch (error) {
      console.error(error);
    }
  });
}
