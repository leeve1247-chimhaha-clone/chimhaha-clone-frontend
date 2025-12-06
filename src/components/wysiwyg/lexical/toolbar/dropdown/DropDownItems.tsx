import type { ReactNode } from "react";
import { useMyDropDownContext } from "./DropDownContext.tsx";

export function DropDownItems({ onClick, className, children }: {
  onClick: () => void,
  className: string,
  children: ReactNode
}) {
  const { toggle } = useMyDropDownContext();
  return (
    <button
      onClick={
        () => {
          onClick();
          toggle();
        }}
      className={className}
    >
      {children}
    </button>);
}