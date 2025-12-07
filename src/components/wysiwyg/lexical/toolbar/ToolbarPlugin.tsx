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
import style from "./ToolbarPlugin.module.css";
import { DropDownTrigger } from "./dropdown/DropDownTrigger.tsx";
import { DropDownMenu } from "./dropdown/DropDownMenu.tsx";
import { DropDown } from "./dropdown/DropDown.tsx";
import { DropDownItems } from "./dropdown/DropDownItems.tsx";
import {
  ALargeSmall,
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Baseline,
  Bold,
  Highlighter,
  Image,
  Italic,
  Link,
  List,
  ListIndentDecrease,
  ListIndentIncrease,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Type,
  Underline,
  Undo2,
  Video
} from "lucide-react";
import { ToolBarInput } from "./ToolBarInput.tsx";

const LowPriority = 1;

function Divider() {
  return <div className={style.divider} />;
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
  const [elementType, setElementType] = useState("left");

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setElementType(selection.anchor.getNode().getTopLevelElementOrThrow().getFormatType());
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
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
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  return (
    <div className={style.toolbar} ref={toolbarRef}>
      <DropDown>
        <DropDownTrigger><Type className={style.toolbarItemIcon} /></DropDownTrigger>
        <DropDownMenu>
          <DropDownItems onClick={() => {
            console.log(123);
          }} className={`${style.toolbarItemButton}`}>b</DropDownItems>
        </DropDownMenu>
      </DropDown>
      <button
        className={`${style.toolbarItemButton}`}
      >
        <ALargeSmall className={style.toolbarItemIcon} />
      </button>
      <Divider />
      <ToolBarInput>
        <Image className={style.toolbarItemIcon} />
      </ToolBarInput>
      <button
        className={`${style.toolbarItemButton}`}
      >
        <Video className={style.toolbarItemIcon} />
      </button>
      <button
        className={`${style.toolbarItemButton}`}
      >
        <Link className={style.toolbarItemIcon} />
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={`${style.toolbarItemButton} ${isBold ? style.active : ""}`}
      >
        <Bold className={style.toolbarItemIcon} />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className={`${style.toolbarItemButton} ${isItalic ? style.active : ""}`}
      >
        <Italic className={style.toolbarItemIcon} />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        className={`${style.toolbarItemButton} ${isUnderline ? style.active : ""}`}>
        <Underline className={style.toolbarItemIcon} />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        className={`${style.toolbarItemButton} ${isStrikethrough ? style.active : ""}`}
      >
        <Strikethrough className={style.toolbarItemIcon} />
      </button>
      <Divider />
      <button
        className={`${style.toolbarItemButton}`}
      >
        <Baseline className={style.toolbarItemIcon} />
      </button>
      <button
        className={`${style.toolbarItemButton}`}
      >
        <Highlighter className={style.toolbarItemIcon} />
      </button>
      <button
        className={`${style.toolbarItemButton}`}
      >
        <RemoveFormatting className={style.toolbarItemIcon} />
      </button>
      <Divider />
      <DropDown>
        <DropDownTrigger>
          {["left", ""].includes(elementType) && <AlignLeft className={style.toolbarItemIcon} />}
          {elementType == "center" && <AlignCenter className={style.toolbarItemIcon} />}
          {elementType == "right" && <AlignRight className={style.toolbarItemIcon} />}
          {elementType == "justify" && <AlignJustify className={style.toolbarItemIcon} />}
        </DropDownTrigger>
        <DropDownMenu>
          <DropDownItems
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
            }}
            className={`${style.toolbarItemButton}`}
          >
            <AlignLeft className={style.toolbarItemIcon} />
          </DropDownItems>
          <DropDownItems
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
            }}
            className={`${style.toolbarItemButton}`}
          >
            <AlignCenter className={style.toolbarItemIcon} />
          </DropDownItems>
          <DropDownItems
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
            }}
            className={`${style.toolbarItemButton}`}
          >
            <AlignRight className={style.toolbarItemIcon} />
          </DropDownItems>
          <DropDownItems onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
          }} className={style.toolbarItemButton}>
            <AlignJustify className={style.toolbarItemIcon} />
          </DropDownItems>
        </DropDownMenu>
      </DropDown>
      <button
        className={`${style.toolbarItemButton}`}
      ><ListOrdered className={style.toolbarItemIcon} /></button>
      <button
        className={`${style.toolbarItemButton}`}
      ><List className={style.toolbarItemIcon} /></button>
      <button
        className={`${style.toolbarItemButton}`}
      ><ListIndentIncrease className={style.toolbarItemIcon} /></button>
      <button
        className={`${style.toolbarItemButton}`}
      ><ListIndentDecrease className={style.toolbarItemIcon} /></button>
      <Divider />
      <button
        className={`${style.toolbarItemButton}`}
      ><Quote className={style.toolbarItemIcon} /></button>
      <button
        className={`${style.toolbarItemButton}`}
      ><Minus className={style.toolbarItemIcon} /></button>
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className={`${style.toolbarItemButton}`}
      >
        <Undo2 className={style.toolbarItemIcon} />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className={style.toolbarItemButton}
      >
        <Redo2 className={style.toolbarItemIcon} />
      </button>
    </div>
  );
}
