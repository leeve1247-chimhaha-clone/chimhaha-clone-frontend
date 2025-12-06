import { createCommand, type LexicalCommand } from "lexical";

export const UPLOAD_IMAGES_COMMAND: LexicalCommand<File[]> = createCommand('UPLOAD_IMAGES_COMMAND');