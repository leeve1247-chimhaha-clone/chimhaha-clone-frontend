import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $createRangeSelection,
  $getSelection,
  $insertNodes,
  $isNodeSelection,
  $isRootOrShadowRoot,
  $setSelection,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  DRAGOVER_COMMAND,
  DRAGSTART_COMMAND,
  DROP_COMMAND,
  getDOMSelectionFromTarget,
  type LexicalEditor
} from "lexical";
import { type ReactNode, useEffect } from "react";

import { INSERT_IMAGE_COMMAND } from "../commands/INSERT_IMAGE_COMMAND.tsx";
import { $createImageNode, $isImageNode, ImageNode, type ImagePayload } from "../nodes/ImageNode.tsx";

export type InsertImagePayload = Readonly<ImagePayload>;

export default function ImagesPlugin({
                                         captionsEnabled
                                     }: {
    captionsEnabled?: boolean;
}): ReactNode | null {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!editor.hasNodes([ImageNode])) {
            throw new Error('ImagesPlugin: ImageNode not registered on editor');
        }

        return mergeRegister(
            editor.registerCommand<InsertImagePayload>(
                INSERT_IMAGE_COMMAND,
                (payload) => {
                    const imageNode = $createImageNode(payload);
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
                    return $onDragStart(event);
                },
                COMMAND_PRIORITY_HIGH,
            ),
            editor.registerCommand<DragEvent>(
                DRAGOVER_COMMAND,
                () => {
                    return $onDragover();
                },
                COMMAND_PRIORITY_LOW,
            ),
            editor.registerCommand<DragEvent>(
                DROP_COMMAND,
                (event) => {
                    return $onDrop(event, editor);
                },
                COMMAND_PRIORITY_HIGH,
            ),
        );
    }, [captionsEnabled, editor]);

    return null;
}

const TRANSPARENT_IMAGE =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const img = document.createElement('img');
img.src = TRANSPARENT_IMAGE;

function $onDragStart(event: DragEvent): boolean {
    const node = $getImageNodeInSelection();
    if (!node) {
        return false;
    }
    const dataTransfer = event.dataTransfer;
    if (!dataTransfer) {
        return false;
    }
    dataTransfer.setData('text/plain', '_');
    dataTransfer.setDragImage(img, 0, 0);
    dataTransfer.setData(
        'application/x-lexical-drag',
        JSON.stringify({
            data: {
                altText: node.__altText,
                height: node.__height,
                maxWidth: node.__maxWidth,
                src: node.__src,
                width: node.__width,
            },
            type: 'image',
        }),
    );

    return true;
}

function $onDragover(): boolean {
    const node = $getImageNodeInSelection();
    if (!node) {
        return false;
    }
    // if (!canDropImage(event)) {
    //     event.preventDefault();
    // }
    return true;
}

function getDragImageData(event: DragEvent): null | InsertImagePayload {
    const dragData = event.dataTransfer?.getData('application/x-lexical-drag');
    if (!dragData) {
        return null;
    }
    const {type, data} = JSON.parse(dragData);
    if (type !== 'image') {
        return null;
    }

    return data;
}

function $onDrop(event: DragEvent, editor: LexicalEditor): boolean {
    const node = $getImageNodeInSelection();
    if (!node) {
        return false;
    }
    const data = getDragImageData(event);
    if (!data) {
        return false;
    }
    event.preventDefault();

    const range = getDragSelection(event);
    node.remove();
    const rangeSelection = $createRangeSelection();
    if (range !== null && range !== undefined) {
        rangeSelection.applyDOMRange(range);
    }
    $setSelection(rangeSelection);
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, data);

    return true;
}

function $getImageNodeInSelection(): ImageNode | null {
    const selection = $getSelection();
    if (!$isNodeSelection(selection)) {
        return null;
    }
    const nodes = selection.getNodes();
    const node = nodes[0];
    return $isImageNode(node) ? node : null;
}


interface MyDragEvent extends DragEvent{
    rangeOffset?: number;
    rangeParent?: Node;
}

function getDragSelection(event: MyDragEvent): Range | null | undefined {
    let range;
    const domSelection = getDOMSelectionFromTarget(event.target);
    if (document.caretPositionFromPoint) {
        const pos = document.caretPositionFromPoint(event.clientX, event.clientY);
        if (pos){
            range = document.createRange();
            range.setStart(pos.offsetNode, pos.offset);
        }
    } else if (event.rangeParent && domSelection !== null) {
        domSelection.collapse(event.rangeParent, event.rangeOffset || 0);
        range = domSelection.getRangeAt(0);
    } else {
        throw Error(`Cannot get the selection when dragging`);
    }
    return range;
}
