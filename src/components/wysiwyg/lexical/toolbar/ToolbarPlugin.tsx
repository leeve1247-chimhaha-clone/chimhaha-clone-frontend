/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowClockwise,
  ArrowCounterclockwise,
  Justify,
  TextCenter,
  TextLeft,
  TextRight,
  TypeBold,
  TypeItalic,
  TypeStrikethrough,
  TypeUnderline
} from "react-bootstrap-icons";
import style from "./ToolbarPlugin.module.css";
import { DropDown } from "./dropdown/DropDown.tsx";

const LowPriority = 1;

function Divider() {
    return <div className={style.divider}/>;
}

export default function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();
    const toolbarRef = useRef(null);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);

    const $updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            // Update text format
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));
            setIsStrikethrough(selection.hasFormat('strikethrough'));
        }
    }, []);

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({editorState}) => {
                editorState.read(() => {
                    $updateToolbar();
                });
            }),
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                (_payload, _newEditor) => {
                    $updateToolbar();
                    return false;
                },
                LowPriority,
            ),
            editor.registerCommand(
                CAN_UNDO_COMMAND,
                (payload) => {
                    setCanUndo(payload);
                    return false;
                },
                LowPriority,
            ),
            editor.registerCommand(
                CAN_REDO_COMMAND,
                (payload) => {
                    setCanRedo(payload);
                    return false;
                },
                LowPriority,
            ),
        );
    }, [editor, $updateToolbar]);

    return (
        <div className={style.toolbar} ref={toolbarRef}>
            <DropDown/>
            <Divider/>
            <button
                disabled={!canUndo}
                onClick={() => {
                    editor.dispatchCommand(UNDO_COMMAND, undefined);
                }}
                className={`${style.toolbarItemButton} ${style.Spaced}`}
            >
                <ArrowCounterclockwise className={style.toolbarItemIcon}/>
            </button>
            <button
                disabled={!canRedo}
                onClick={() => {
                    editor.dispatchCommand(REDO_COMMAND, undefined);
                }}
                className={style.toolbarItemButton}
            >
                <ArrowClockwise className={style.toolbarItemIcon}/>
            </button>
            <Divider/>
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
                }}
                className={`${style.toolbarItemButton} ${style.spaced} ${isBold ? style.active : ''}`}
            >
                <TypeBold className={style.toolbarItemIcon}/>
            </button>
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
                }}
                className={`${style.toolbarItemButton} ${style.spaced} ${isItalic ? style.active : ''}`}
            >
                <TypeItalic className={style.toolbarItemIcon}/>
            </button>
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
                }}
                className={`${style.toolbarItemButton} ${style.spaced} ${isUnderline ? style.active : ''}`}>
                <TypeUnderline className={style.toolbarItemIcon}/>
            </button>
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
                }}
                className={`${style.toolbarItemButton} ${style.spaced} ${isStrikethrough ? style.active : ''}`}
            >
                <TypeStrikethrough className={style.toolbarItemIcon}/>

            </button>
            <Divider/>
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
                }}
                className={`${style.toolbarItemButton} ${style.Spaced}`}
            >
                <TextLeft className={style.toolbarItemIcon}/>
            </button>
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
                }}
                className={`${style.toolbarItemButton} ${style.Spaced}`}
            >
                <TextCenter className={style.toolbarItemIcon}/>
            </button>
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
                }}
                className={`${style.toolbarItemButton} ${style.Spaced}`}
            >
                <TextRight className={style.toolbarItemIcon}/>
            </button>
            <button onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
            }} className={style.toolbarItemButton}>
                <Justify className={style.toolbarItemIcon}/>
            </button>
        </div>
    );
}
