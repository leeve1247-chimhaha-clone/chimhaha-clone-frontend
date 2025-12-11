import { createCommand, type LexicalCommand } from "lexical";
import type { UpdateImagePayload } from "../plugins/ImageUploadPlugin.tsx";

export const UPLOAD_IMAGE_COMMAND: LexicalCommand<UpdateImagePayload> = createCommand('UPLOAD_IMAGE_COMMAND');