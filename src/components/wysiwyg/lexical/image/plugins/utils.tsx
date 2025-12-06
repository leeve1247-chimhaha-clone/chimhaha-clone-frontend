import {ImageNode} from "../nodes/ImageNode.tsx";
import {$createRangeSelection, $getSelection, $isNodeSelection, $setSelection, type LexicalEditor} from "lexical";
import type {InsertImagePayload} from "./ImagePlugin.tsx";
import {INSERT_IMAGE_COMMAND} from "../commands/INSERT_IMAGE_COMMAND.tsx";
import {isImageNode} from "../nodes/utils.tsx";

export function getImageNodeInSelection(): ImageNode | null {
  const selection = $getSelection();
  if (!$isNodeSelection(selection)) {
    return null;
  }
  const nodes = selection.getNodes();
  const node = nodes[0];
  return isImageNode(node) ? node : null;
}

function createBlankImg() {
  const TRANSPARENT_IMAGE =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  const img = document.createElement('img');
  img.src = TRANSPARENT_IMAGE;
  return img;
}

export function onDragStart(event: DragEvent): boolean {
  const img = createBlankImg();
  const node = getImageNodeInSelection();
  const dataTransfer = event.dataTransfer;
  if (!node || !dataTransfer) {
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

export function onDragover(): boolean {
  return !!getImageNodeInSelection();
}

export function getDragImageData(event: DragEvent): null | InsertImagePayload {
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

export function getDragSelection(event: DragEvent): Range | null | undefined {
  let range;
  if (document.caretPositionFromPoint) {
    const pos = document.caretPositionFromPoint(event.clientX, event.clientY);
    if (pos) {
      range = document.createRange();
      range.setStart(pos.offsetNode, pos.offset);
    }
  } else {
    throw Error(`Cannot get the selection when dragging`);
  }
  return range;
}

export function onDrop(event: DragEvent, editor: LexicalEditor): boolean {
  const node = getImageNodeInSelection();
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