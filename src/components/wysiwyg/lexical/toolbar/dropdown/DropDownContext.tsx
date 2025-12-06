import React, { createContext, useContext } from "react";
import type { Coords } from "./utils.tsx";

interface DropDownProps {
  isOpen: boolean;
  coords: Coords;
  triggerRef: React.RefObject<HTMLButtonElement|null>;
  dropDownRef: React.RefObject<HTMLDivElement|null>;
  toggle: () => void
}

export const DropDownContext = createContext<DropDownProps | null>(null);

export const useMyDropDownContext = () => {
  const context = useContext(DropDownContext);
  if (!context) {
    throw new Error('Dropdown 컴포넌트 내부에서만 사용할 수 있습니다.');
  }
  return context;
};