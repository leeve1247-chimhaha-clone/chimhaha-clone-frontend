import Quill from "quill";
import {forwardRef, useEffect} from "react";
import "./WYSIWYGEditor.css";

export const WYSIWYGEditor = forwardRef<Quill>(
  (_props, quillRef) => {
    useEffect(() => {
      if (quillRef === null || typeof quillRef === "function") return
      const container = document.getElementById("editor") as HTMLElement;
      const toolbarOptions = {
        container: [
          [{ font: [] }],
          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          ["link", "image", "video"],
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
        handler: {
          undo: function () {
            quillRef.current?.history.undo();
          },
          redo: function () {
            quillRef.current?.history.redo();
          },
        },
      };
      if (container && !quillRef.current) {
        // quillRef.current가 null이면 새로운 Quill 인스턴스를 생성합니다. 이미 있으면 아무것도 하지 않습니다.
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
      }
    }, [quillRef]);

    return <div id="editor" style={{ height: "400px" }} />; // Ensure the editor has a height
  },
);
