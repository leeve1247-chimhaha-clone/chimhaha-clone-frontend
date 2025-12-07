import style from "./ToolbarPlugin.module.css";
import { type ReactNode, useId } from "react";
import { INSERT_IMAGE_COMMAND } from "../image/commands/INSERT_IMAGE_COMMAND.tsx";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export function ToolBarInput({ children }: { children: ReactNode }) {
  const htmlForId = useId();
  const [editor] = useLexicalComposerContext();

  function loadImage(files: FileList | null) {
    const reader = new FileReader();
    reader.onload = function() {
      if (typeof reader.result === "string") {
        editor.dispatchCommand(INSERT_IMAGE_COMMAND, {src: reader.result, altText:"123123", maxWidth:1500});
      }
    };
    if (files !== null) {
      reader.readAsDataURL(files[0]);
    }
  }

  return (
    <label htmlFor={htmlForId}>
      <div className={`${style.toolbarItemButton}`}>
        {children}
        <input id={htmlForId}
               type="file"
               accept="image/*"
               className={style.hiddenInput}
               onChange={(e) => {
                 loadImage(e.target.files);
               }}
        />
      </div>
    </label>
  );
}