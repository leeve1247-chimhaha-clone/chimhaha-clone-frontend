import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$wrapNodeInElement, mergeRegister} from "@lexical/utils";
import {
    $createParagraphNode,
    $insertNodes,
    $isRootOrShadowRoot,
    COMMAND_PRIORITY_EDITOR,
    COMMAND_PRIORITY_HIGH,
    COMMAND_PRIORITY_LOW,
    DRAGOVER_COMMAND,
    DRAGSTART_COMMAND,
    DROP_COMMAND
} from "lexical";
import {type JSX, useEffect} from "react";
import {ImageNode} from "../nodes/ImageNode.tsx";
import {INSERT_IMAGE_COMMAND} from "../commands/INSERT_IMAGE_COMMAND.tsx";
import {onDragover, onDragStart, onDrop} from "./utils.tsx";
import type {ImagePayload} from "../nodes/ImagePayload.tsx";

export type InsertImagePayload = Readonly<ImagePayload>;

export default function ImagesPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error('ImagesPlugin: ImageNode not registered on editor');
    }
    return mergeRegister(
      editor.registerCommand<InsertImagePayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = new ImageNode(payload);
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }
          return true;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
      editor.registerCommand<DragEvent>(
        DRAGSTART_COMMAND,
        (event) => {
          return onDragStart(event);
        },
        COMMAND_PRIORITY_HIGH,
      ),
      editor.registerCommand<DragEvent>(
        DRAGOVER_COMMAND,
        () => {
          return onDragover();
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand<DragEvent>(
        DROP_COMMAND,
        (event) => {
          return onDrop(event, editor);
        },
        COMMAND_PRIORITY_HIGH,
      ),
    );
  }, [editor]);
  return null;
}