import type {SerializedLexicalNode, Spread} from "lexical";

export type SerializedImageNode = Spread<
    {
        altText: string;
        height?: number;
        maxWidth: number;
        src: string;
        width?: number;
        type: string;
        version: 1;
    },
    SerializedLexicalNode
>;