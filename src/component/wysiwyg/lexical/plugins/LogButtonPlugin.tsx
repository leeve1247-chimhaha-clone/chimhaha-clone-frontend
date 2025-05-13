import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";

export default function LogButtonPlugin() {
    const [editor] = useLexicalComposerContext();

    const handleClick = () => {
        const editorState = editor.getEditorState();
        editorState.read(() => {
            const json = editorState.toJSON();
            const blob = new Blob([JSON.stringify(json, null, 2)], {
                type: "application/json",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "data.json"; // 다운로드할 파일 이름
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url); // URL 해제
        });
    };

    return (
        <button onClick={handleClick} style={{ margin: '8px', padding: '4px 8px' }}>
            콘솔에 상태 출력
        </button>
    );
}
