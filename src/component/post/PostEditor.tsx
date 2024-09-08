import Quill from "quill";
import { forwardRef, useEffect } from "react";
import "../WYSIWYGEditor.css";
import Icons from "quill/ui/icons";
import { svgs } from "../../utils/svgs.tsx";
import Delta from "quill-delta";
import axios from "axios";
import { RData } from "../../credential/data.ts";
import { store } from "../../utils/redux/store.ts";

type IconsType = typeof Icons;
interface ExtendedIcons extends IconsType {
  undo?: string;
  redo?: string;
}

interface EditorProps {
  defaultValue?: Delta;
  editState?: boolean;
}

export const PostEditor = forwardRef<Quill, EditorProps>(
  ({ defaultValue, editState }, quillRef) => {
    useEffect(() => {
      if (quillRef === null || typeof quillRef === "function") return;
      const container = document.getElementById("editor") as HTMLElement;
      const toolbarOptions = {
        container: [
          [{ font: [] }],
          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          ["link", "image", "video"], // 추후 구현 예정
          ["bold", "italic", "underline", "strike"], // toggled buttons

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          ["clean"], // remove formatting button
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
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
            if (quillRef.current !== null) imageHandler(quillRef.current);
          },
        },
      };
      const extendedIcons: ExtendedIcons = Icons;
      extendedIcons.undo = svgs["arrow-rotate-left"];
      extendedIcons.redo = svgs["arrow-rotate-right"];

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
    }, [quillRef]);

    return <div id="editor" style={{ height: "400px" }} />; // Ensure the editor has a height
  },
);

function imageHandler(quill: Quill) {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();
  input.addEventListener("change", async () => {
    try {
      const file = input.files ? input.files[0] : "";
      const formData = new FormData();
      formData.append("file", file);
      const axiosResponse = await axios.post(
        RData.baseUrl + "/upload/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${store.getState().token}`,
          },
        },
      );
      const range = quill.getSelection();
      if (range?.index !== undefined)
        quill.insertEmbed(range?.index, "image", axiosResponse.data);
    } catch (error) {}
  });
}
