import style from "./ImageComponent.module.css";
import { type RefObject } from "react";

interface NewComponentProps {
  uploadRef: RefObject<HTMLDivElement | null>;
}

export function ImageUploadIndicator({ uploadRef }: NewComponentProps) {
  return <div
    ref = {uploadRef}
    className={style.uploading}
  >업로드중</div>;
}