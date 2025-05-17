import type { InsertImagePayload } from "../plugins/ImagePlugin.tsx";
import { createCommand, type LexicalCommand } from "lexical";

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> = createCommand(
    "INSERT_IMAGE_COMMAND"
);
