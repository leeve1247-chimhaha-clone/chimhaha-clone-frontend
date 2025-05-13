import {InitialConfigType} from "@lexical/react/LexicalComposer";
import {ParagraphNode, TextNode} from "lexical";
import {ImageNode} from "../nodes/ImageNode.tsx";
import ExampleTheme from "../ExampleTheme.tsx";

export const editorConfig: InitialConfigType = {
    namespace: 'React.js Demo',
    nodes: [ParagraphNode, TextNode, ImageNode],
    onError(error: Error) {
        throw error;
    },
    theme: ExampleTheme,
};
