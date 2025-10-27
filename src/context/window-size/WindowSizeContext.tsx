// Context 생성
import { createContext } from "react";
import type { WindowSize } from "./WindowSizeProvider.tsx";

export const WindowSizeContext = createContext<WindowSize>({ width: 0, height: 0 });
