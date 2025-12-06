import style from "../ToolbarPlugin.module.css";
import type { ReactNode } from "react";
import { useMyDropDownContext } from "./DropDownContext.tsx";

export function DropDownTrigger({children}:{children:ReactNode}) {
  const controller = useMyDropDownContext();
  return (
    <button
      ref={controller.triggerRef}
      onClick={controller.toggle}
      className={`${style.toolbarItemButton} ${style.Spaced}`}
      aria-expanded={controller.isOpen} // 접근성 추가
    >
      {children}
    </button>
  );
}