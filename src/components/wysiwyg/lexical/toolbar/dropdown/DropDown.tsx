import { type ReactNode } from "react";
import { DropDownContext } from "./DropDownContext.tsx";
import { useDropdown } from "./utils.tsx";

export function DropDown({ children }: { children: ReactNode }) {
  const dropdown = useDropdown();
  return(
  <DropDownContext.Provider value = {dropdown}>
    {children}
  </DropDownContext.Provider>
  )
}