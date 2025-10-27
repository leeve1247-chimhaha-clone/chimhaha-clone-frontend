// Context 생성
import { type ReactNode, useEffect, useState } from "react";
import { WindowSizeContext as WindowSizeContext1 } from "./WindowSizeContext.tsx";

export interface WindowSize {
  width: number;
  height: number;
}

interface WindowSizeProviderProps {
  children: ReactNode;
}

export function WindowSizeProvider({ children }:WindowSizeProviderProps) {
  const [size, setSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    let timeoutId: number | null = null;

    const handleResize = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 100); // 100ms debounce
    };

    window.addEventListener('resize', handleResize);
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <WindowSizeContext1 value={size}>
      {children}
    </WindowSizeContext1>
  );
}
