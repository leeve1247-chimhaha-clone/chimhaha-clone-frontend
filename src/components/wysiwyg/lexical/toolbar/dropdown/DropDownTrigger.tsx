import style from "../ToolbarPlugin.module.css";
import type { useDropdown } from "./utils.tsx";

interface TriggerProps {
  controller: ReturnType<typeof useDropdown>;
}

export function DropDownTrigger({ controller }: TriggerProps) {
  return (
    <button
      ref={controller.triggerRef}
      onClick={controller.toggle}
      className={`${style.toolbarItemButton} ${style.Spaced}`}
      aria-expanded={controller.isOpen} // 접근성 추가
    >
      메뉴 열기
    </button>
  );
}