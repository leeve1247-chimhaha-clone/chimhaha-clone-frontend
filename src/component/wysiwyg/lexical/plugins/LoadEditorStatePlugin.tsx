import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {useEffect} from "react";
import savedEditorState from "../sample.json";

export function LoadEditorStatePlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!savedEditorState) return;
        const loadState = async () => {
            const newEditorState = editor.parseEditorState(JSON.stringify(savedEditorState));
            // setEditorState를 비동기적으로 처리하여 렌더링을 방해하지 않도록 합니다.
            await new Promise((resolve) => setTimeout(resolve, 0));
            editor.setEditorState(newEditorState);
        };

        loadState(); // 비동기적으로 상태를 로드하고 설정합니다.
    }, [editor]);

    return null;
}
