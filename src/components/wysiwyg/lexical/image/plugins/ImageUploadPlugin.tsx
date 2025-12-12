import { type JSX, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { $getNodeByKey, COMMAND_PRIORITY_EDITOR, type NodeKey } from "lexical";
import { UPLOAD_IMAGE_COMMAND } from "../commands/UPLOAD_IMAGE_COMMAND.tsx";
import { isImageNode } from "../nodes/utils.tsx";
import { CData } from "../../../../../../credential/data.ts";
import axios from "axios";
import { type AuthContextProps, useAuth } from "react-oidc-context";
import type { PresignedPostProps } from "../../../../post/submit/PostSubmitPostButton.tsx";
import { ImageStatus } from "../nodes/ImageStatus.tsx";
import { ImageNode } from "../nodes/ImageNode.tsx";

export interface UpdateImagePayload {
  nodeKey: NodeKey;
  src: string;
}

async function changeSrcToServerUrl({ src, auth }: { src: string, auth: AuthContextProps }): Promise<string> {
  if (src.startsWith(CData.object_storage_image_uri)) return src;
  const file = await getFileFrom(src);
  if (file === null) return src;
  const presignedPostProps = await getPresignedPostProps(file, auth);
  return postImage({ presignedData: presignedPostProps, file: file });
}

async function getFileFrom(src: string) {
  try {
    const response = await axios.get<Blob>(src, {
      responseType: "blob"
    });
    const blob = response.data;
    const ext = blob.type.split("/")[1];
    const fileName = `downloaded_image.${ext}`;
    return new File([blob], fileName, { type: blob.type });
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function getPresignedPostProps(file: File, auth: AuthContextProps) {
  const r = await axios.get<PresignedPostProps>(CData.local_backend + "/get/presigned-post", {
    headers: {
      "Content-Type": "application/json",
      "X-File-MimeType": file?.type,
      Authorization: `Bearer ${auth.user?.access_token}`
    }
  });
  return r.data;

}

async function postImage({ presignedData, file }: { presignedData: PresignedPostProps, file: File }) {
  const formData = new FormData();
  if (presignedData?.fields == undefined) throw new Error("Failed to post Image");
  const fields = presignedData?.fields;

  const { key, ...rest } = fields;
  formData.append("key", key);
  Object.entries(rest).forEach(([key, value]) => {
    formData.append(key, value);
  });

  if (!file) throw new Error("Failed to post Image");
  formData.append("Content-Type", file.type);
  formData.append("file", file);
  try {
    await axios.post<string>(presignedData?.url, formData);
    return presignedData?.url + key;
  } catch {
    throw new Error("Failed to post Image");
  }
}

export function ImagesUploadPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const auth = useAuth();

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand<UpdateImagePayload>(
        UPLOAD_IMAGE_COMMAND,
        ({ nodeKey, src }) => {
          (async () => {
            try {
              if (src.startsWith(CData.object_storage_image_uri)) return;
              editor.update(() => {
                const node = $getNodeByKey(nodeKey);
                if (isImageNode(node)) {
                  node.setStatus(ImageStatus.Uploading);
                }
              });
              const serverSrc = await changeSrcToServerUrl({ src, auth });
              editor.update(() => {
                const node = $getNodeByKey(nodeKey);
                if (isImageNode(node)) {
                  node.setSrc(serverSrc);
                  node.setStatus(ImageStatus.Uploaded);
                }
              });
            } catch (e) {
              console.error(e);
              editor.update(() => {
                const node = $getNodeByKey(nodeKey);
                if (isImageNode(node)) node.setStatus(ImageStatus.Error);
              });
            }
          })();
          return true;
        },
        COMMAND_PRIORITY_EDITOR
      ),
      editor.registerNodeTransform(ImageNode, (node) => {
        if (node.getStatus() === ImageStatus.Local) {
          editor.dispatchCommand(UPLOAD_IMAGE_COMMAND, { nodeKey: node.getKey(), src: node.getSrc() });
        }
      })
    );
  }, [auth, editor]);

  return null;
}