import { $getNodeByKey, CLICK_COMMAND, COMMAND_PRIORITY_LOW, DRAGSTART_COMMAND, type NodeKey } from "lexical";

import { type JSX, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { ImageResizer } from "../resizer/ImageResizer.tsx";
import { $isImageNode } from "../../nodes/ImageNode.tsx";
import { LazyImage } from "../lazyImage/LazyImage.tsx";
import { useLexicalEditable } from "@lexical/react/useLexicalEditable";
import style from "./ImageComponent.module.css";

export default function ImageComponent(
    {
        src,
        altText,
        width,
        height,
        maxWidth,
        nodeKey
    }: {
        altText: string;
        height: "inherit" | number;
        maxWidth: number;
        nodeKey: NodeKey;
        resizable: boolean;
        src: string;
        width: "inherit" | number;
    }): JSX.Element {
    const imageRef = useRef<null | HTMLImageElement>(null);
    const [isSelected, setSelected, clearSelection] =
        useLexicalNodeSelection(nodeKey);
    const [editor] = useLexicalComposerContext();
    const [isResizing, setIsResizing] = useState<boolean>(false);
    const isEditable = useLexicalEditable();

    const onResizeStart = () => {
        setIsResizing(true);
    };

    const onResizeEnd = (
        nextWidth: 'inherit' | number,
        nextHeight: 'inherit' | number,
    ) => {
        // Delay hiding the resize bars for click case
        setTimeout(() => {
            setIsResizing(false);
        }, 200);

        editor.update(() => {
            const node = $getNodeByKey(nodeKey);
            if ($isImageNode(node)) {
                node.setWidthAndHeight(nextWidth, nextHeight);
            }
        });
    };

    const onClick = useCallback(
        (payload: MouseEvent) => {
            const event = payload;
            if (isResizing) {
                return true;
            }
            if (event.target === imageRef.current) {
                if (event.shiftKey) {
                    setSelected(!isSelected);
                } else {
                    clearSelection();
                    setSelected(true);
                }
                return true;
            }
            return false;
        },
        [isResizing, isSelected, setSelected, clearSelection],
    );

    useEffect(() => {
        const unregister = mergeRegister(

            editor.registerCommand<MouseEvent>(
                CLICK_COMMAND,
                onClick,
                COMMAND_PRIORITY_LOW,
            ),
            editor.registerCommand(
                DRAGSTART_COMMAND,
                (event) => {
                    if (event.target === imageRef.current) {
                        // TODO This is just a temporary workaround for FF to behave like other browsers.
                        // Ideally, this handles drag & drop too (and all browsers).
                        event.preventDefault();
                        return true;
                    }
                    return false;
                },
                COMMAND_PRIORITY_LOW,
            ),
        );

        return () => {
            unregister();
        };

    }, [
        clearSelection,
        editor,
        isSelected,
        nodeKey,
        onClick,
        setSelected,
    ])

    const draggable = isSelected;
    const isFocused = (isSelected || isResizing) && isEditable;

    return (
        <Suspense fallback={null}>
            <>
                <div draggable={draggable}>
                    <LazyImage
                        className={`${isFocused ? style.focused : ""}`}
                        src={src}
                        altText={altText}
                        imageRef={imageRef}
                        width={width}
                        height={height}
                        maxWidth={maxWidth} onError={function (): void {
                        throw new Error("Function not implemented.");
                    }} />
                </div>
                {isFocused && (
                    <ImageResizer
                        imageRef={imageRef}
                        maxWidth={maxWidth}
                        onResizeStart={onResizeStart}
                        onResizeEnd={onResizeEnd}
                        editor={editor}
                    />
                )}
            </>
        </Suspense>
    );
}
