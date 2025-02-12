import { ReactNode } from "react";
import cssClass from "./HeaderLine.module.css";
export default function HeaderLine({children}: {children: ReactNode}){
  return <div className={cssClass.container}>{children}</div>
}