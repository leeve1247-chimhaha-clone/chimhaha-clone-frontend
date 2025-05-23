import type { JSX } from "react";
import cssClass from "./Header.module.css";

export function HeaderSub({ category }: { category: JSX.Element }) {
  return (
    <div className={cssClass.subContainer}>
      <div className={cssClass.container1}>{category}</div>
    </div>
  );
}
