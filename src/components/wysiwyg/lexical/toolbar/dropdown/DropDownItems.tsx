import { createPortal } from "react-dom";
import style from "../ToolbarPlugin.module.css";
import type { Coords } from "./utils.tsx";
import React from "react";

export function DropDownItems({ coords, dropDownRef }: {
  coords: Coords,
  dropDownRef: React.RefObject<HTMLDivElement|null>
}){
  return createPortal(
    <div
      ref = {dropDownRef}
      className={`${style.toolbarDropDown}`}
      style={{
        top: coords.top,
        left: coords.left,
      }}
    >
      <button
        className={`${style.toolbarItemButton} ${style.toolbarDropDownItem}`}
      >1</button>
      <button
        className={`${style.toolbarItemButton} ${style.toolbarDropDownItem}`}
      >1</button>
      <button
        className={`${style.toolbarItemButton} ${style.toolbarDropDownItem}`}
      >1</button>
    </div>
    ,document.body)
}