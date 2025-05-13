import {createCommand, LexicalCommand} from "lexical";
import {InsertImagePayload} from "../plugins/ImagePlugin.tsx";

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> = createCommand(
    "INSERT_IMAGE_COMMAND"
);
