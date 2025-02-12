import { ReactNode } from "react";
import cssClass from "./Header.module.css";

export default function Header({children}: {children: ReactNode}) {
  return <div className={cssClass.container}>
    {children}
  </div>
}
