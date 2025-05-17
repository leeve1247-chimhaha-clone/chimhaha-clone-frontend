import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {useEffect} from "react";
import {isMimeType, mediaFileReader} from "@lexical/utils";
import {INSERT_IMAGE_COMMAND} from "../commands/INSERT_IMAGE_COMMAND.tsx";
import {DRAG_DROP_PASTE} from '@lexical/rich-text';
import {COMMAND_PRIORITY_LOW} from "lexical";
import axios from "axios";
import { CData } from "../../../../../credential/data.ts";
import type { presignedUrlProps } from "../../../../App.tsx";

const ACCEPTABLE_IMAGE_TYPES = [
    'image/',
    'image/heic',
    'image/heif',
    'image/gif',
    'image/webp',
];

async function getPresignedUrl() : Promise<presignedUrlProps | undefined> {
    return await axios.get<presignedUrlProps>(CData.local_backend + "/get/presigned-url").then(
      (res) => {
          return {
              url: res.data.url,
              fileName: res.data.fileName,
          }
      },
      (error) => {
          console.error(error);
          return undefined;
      },
    );
}

async function putImageTo(urlForPut: presignedUrlProps, file: File): Promise<string> {
    return await axios
      .put(CData.local_image_uri+"/"+urlForPut.url, file, {
          headers: {
              "Content-Type": file.type,
          },
      }).then(
        (res) => {
            if (res.status === 200) {
                return axios
                  .get(CData.local_backend+"/get/presigned-url2", {
                      params: {
                          filename: urlForPut.fileName,
                      }
                  }).then(
                    (res)=>{
                        return res.data
                    }
                  )
            }
        },
        (error) => {
            console.error(error);
            return undefined;
        },
      )
}

export default function DragAndDropPlugin(): null {
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
                    for (const {file} of filesResult) {
                        /// presignedUrl 절차를 여기서 실행하면 될 듯

                        // get presignedUrl for put
                        const urlForPut = await getPresignedUrl();
                        if (urlForPut === undefined) continue;
                        const result = await putImageTo(urlForPut, file);
                        if (isMimeType(file, ACCEPTABLE_IMAGE_TYPES)) {
                            editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                                altText: file.name,
                                src: CData.local_image_uri+"/"+result,
                            });
                        }
                    }
                })();
                return true;
            },
            COMMAND_PRIORITY_LOW,
        );
    }, [editor]);
    return null;
}
