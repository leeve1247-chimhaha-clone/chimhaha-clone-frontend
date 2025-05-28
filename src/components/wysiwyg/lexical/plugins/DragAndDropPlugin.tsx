import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { isMimeType, mediaFileReader } from "@lexical/utils";
import { INSERT_IMAGE_COMMAND } from "../commands/INSERT_IMAGE_COMMAND.tsx";
import { DRAG_DROP_PASTE } from "@lexical/rich-text";
import { COMMAND_PRIORITY_LOW } from "lexical";
import axios from "axios";
import { CData } from "../../../../../credential/data.ts";
import type { presignedUrlProps } from "../../../../App.tsx";
import { useAuth } from "react-oidc-context";

const ACCEPTABLE_IMAGE_TYPES = ["image/", "image/heic", "image/heif", "image/gif", "image/webp"];

async function getPresignedUrl(access_token: string): Promise<presignedUrlProps | undefined> {
  return await axios
    .get<presignedUrlProps>(CData.local_backend + "/get/presigned-url", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then(
      (res) => {
        return {
          url: res.data.url,
          fileName: res.data.fileName,
        };
      },
      (error) => {
        console.error(error);
        return undefined;
      },
    );
}

async function putImageTo(urlForPut: presignedUrlProps, file: File, access_token: string): Promise<string> {
  return await axios
    .put(CData.local_image_uri + "/" + urlForPut.url, file, {
      headers: {
        "Content-Type": file.type,
      },
    })
    .then(
      (res) => {
        if (res.status === 200) {
          return axios
            .get(CData.local_backend + "/get/src-url", {
              headers:{
                Authorization: `Bearer ${access_token}`,
              },
              params: {
                filename: urlForPut.fileName,
              },
            })
            .then((res) => {
              return res.data;
            });
        }
      },
      (error) => {
        console.error(error);
        return undefined;
      },
    );
}

export default function DragAndDropPlugin(): null {
  const auth = useAuth();
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerCommand(
      DRAG_DROP_PASTE,
      (files) => {
        (async () => {
          const filesResult = await mediaFileReader(
            files,
            [ACCEPTABLE_IMAGE_TYPES].flatMap((x) => x),
          );
          for (const { file } of filesResult) {
            // get presignedUrl for put
            const access_token = auth.user?.access_token;
            if (access_token === undefined) return;
            const urlForPut = await getPresignedUrl(access_token);
            if (urlForPut === undefined) return;
            const result = await putImageTo(urlForPut, file, access_token);
            if (isMimeType(file, ACCEPTABLE_IMAGE_TYPES)) {
              editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                altText: urlForPut.fileName,
                src: CData.local_image_uri + "/" + result,
              });
            }
          }
        })();
        return true;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [auth.user?.access_token, editor]);
  return null;
}
