import { createPortal } from "react-dom";
import style from "../ToolbarPlugin.module.css";
import { useMyDropDownContext } from "./DropDownContext.tsx";
import type { ReactNode } from "react";

export function DropDownMenu({ children }: { children: ReactNode }) {
  const { isOpen, coords, dropDownRef } = useMyDropDownContext();
  if (!isOpen) return;
  return createPortal(
    <div
      ref={dropDownRef}
      className={`${style.toolbarDropDown}`}
      style={{
        top: coords.top,
        left: coords.left
      }}
    >
      {children}
    </div>
    , document.body);
}