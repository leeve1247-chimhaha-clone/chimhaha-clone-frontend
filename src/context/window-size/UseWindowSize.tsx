import { useContext } from "react";

import { WindowSizeContext } from "./WindowSizeContext.tsx";
import type { WindowSize } from "./WindowSizeProvider.tsx";

export function useWindowSize(): WindowSize {
  const context = useContext(WindowSizeContext);
  if (!context) {
    throw new Error("useWindowSize must be used within a WindowSizeProvider");
  }
  return context;
}
