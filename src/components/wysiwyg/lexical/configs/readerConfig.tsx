import {$createParagraphNode, $createTextNode, $getRoot, ParagraphNode, TextNode} from "lexical";
import ExampleTheme from "../ExampleTheme.tsx";
import type { InitialConfigType } from "@lexical/react/LexicalComposer";
import {ImageNode} from "../nodes/ImageNode.tsx";


export const readerConfig : InitialConfigType = {
    namespace: 'React.js Demo',
    nodes: [ParagraphNode, TextNode, ImageNode],
    onError(error: Error) {
        throw error;
    },
    theme: ExampleTheme,
    editable: false,
    editorState: () => {
        const root = $getRoot();
        const paragraph = $createParagraphNode();
        const text = $createTextNode('Hello world');
        paragraph.append(text);
        root.append(paragraph);
    }
};
