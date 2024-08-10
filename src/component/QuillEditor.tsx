// src/component/QuillEditor.tsx
import { forwardRef, MutableRefObject, useEffect, useRef } from "react";
import Quill from "quill";
import Delta from "quill-delta";
import 'quill/dist/quill.snow.css';
import './QuillEditor.css'; // Import the custom CSS

interface EditorProps {
  defaultValue: Delta;
}

export const QuillEditor = forwardRef<Quill, EditorProps>(
  (
    {
      defaultValue,
    }: EditorProps,
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const defaultValueRef = useRef(defaultValue);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container?.appendChild(
        container.ownerDocument.createElement("div"),
      );
      if (!editorContainer) return;
      const quill = new Quill(editorContainer, {
        theme: "snow",
        modules: {
          toolbar: [['bold', 'italic'], ['link', 'image']]
        }
      });

      (ref as MutableRefObject<Quill>).current = quill;

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      return () => {
        (ref as MutableRefObject<Quill | null>).current = null;
        if (container) {
          container.innerHTML = "";
        }
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  },
);