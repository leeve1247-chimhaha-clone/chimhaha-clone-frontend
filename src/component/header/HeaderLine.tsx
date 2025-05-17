import cssClass from "./HeaderLine.module.css";
import type { ReactNode } from "react";

export default function HeaderLine({ children }: { children: ReactNode }) {
  return <div className={cssClass.container}>{children}</div>;
}
