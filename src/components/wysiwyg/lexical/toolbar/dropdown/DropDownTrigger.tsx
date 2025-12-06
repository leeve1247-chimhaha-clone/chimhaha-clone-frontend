import style from "../ToolbarPlugin.module.css";
import type { ReactNode } from "react";
import { useMyDropDownContext } from "./DropDownContext.tsx";
import { ChevronUp, ChevronDown } from "lucide-react";

export function DropDownTrigger({children}:{children:ReactNode}) {
  const controller = useMyDropDownContext();
  return (
    <button
      ref={controller.triggerRef}
      onClick={controller.toggle}
      className={`${style.toolbarItemButton}`}
      aria-expanded={controller.isOpen} // 접근성 추가
    >
      {children}
      {controller.isOpen && <ChevronUp className={`${style.toolbarItemIcon} ${style.toolbarDropDownChevron}`}/>}
      {!controller.isOpen && <ChevronDown className={`${style.toolbarItemIcon}  ${style.toolbarDropDownChevron}`}/>}
    </button>
  );
}