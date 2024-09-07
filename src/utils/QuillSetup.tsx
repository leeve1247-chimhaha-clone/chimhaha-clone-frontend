import { ImageBlot } from "./ImageBlot.ts";
import Quill from "quill";
import React, { useEffect } from "react";

interface QuillSetupProps {
  children : React.ReactNode
}
export function QuillSetup({children}: QuillSetupProps) {
  useEffect(() => {
    const RegisteredBlot = Quill.import("blots/block/embed");
    if (RegisteredBlot !== ImageBlot) {
      Quill.register(ImageBlot);
    }
  }, []);
  return <>{children}</>;
}