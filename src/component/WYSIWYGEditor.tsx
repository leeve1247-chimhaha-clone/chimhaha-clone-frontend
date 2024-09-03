import Quill from "quill";
import { forwardRef, useEffect } from "react";
import "./WYSIWYGEditor.css";
import Icons from "quill/ui/icons";
import { svgs } from "../utils/svgs.tsx";

type IconsType = typeof Icons;
interface ExtendedIcons extends IconsType {
  undo?: string;
  redo?: string;
}

export const WYSIWYGEditor = forwardRef<Quill>((_props, quillRef) => {
  useEffect(() => {
    if (quillRef === null || typeof quillRef === "function") return;
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
      handlers: {
        undo: function () {
          quillRef.current?.history.undo();
        },
        redo: function () {
          quillRef.current?.history.redo();
        },
      },
    };
    const extendedIcons: ExtendedIcons = Icons;
    extendedIcons.undo = svgs["arrow-rotate-left"];
    extendedIcons.redo = svgs["arrow-rotate-right"];

    if (container && !quillRef.current) {
      // quillRef.current 가 null 이면 새로운 Quill 인스턴스를 생성합니다. 이미 있으면 아무것도 하지 않습니다.
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
});
