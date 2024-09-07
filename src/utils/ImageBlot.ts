import { BlockEmbed } from "quill/blots/block";
import axios from "axios";
import { store } from "./redux/store.ts";
import { RData } from "../credential/data.ts";

export class ImageBlot extends BlockEmbed {
  static blotName = "image";
  static tagName = "img";

  static create(value: any) {
    let node = super.create() as any;
    if (value.url == undefined) {
      uploadImageToServer(value).then((r) => {
        node.setAttribute("src", r.data);
      });
    } else {
      node.setAttribute("src", value.url);
    }
    return node;
  }

  static value(node: any) {
    return {
      url: node.getAttribute("src"),
    };
  }
}

async function uploadImageToServer(base64String: string) {
  // Base64 문자열
  const blob = base64ImageToBlob(base64String);
  const formData = new FormData();
  formData.append("file", blob, "image" + blob.type.split("/")[1]);
  return await axios.post(RData.baseUrl + "/upload/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${store.getState().token}`,
    },
  });
}

function base64ImageToBlob(dataString: string) {
  const [header, base64] = dataString.split(",");
  const mimeType = (header.match(/:(.*?);/) ?? ["", ""])[1];
  return base64ToBlob(base64, mimeType);
}

function base64ToBlob(base64: string, mimeType: string) {
  const sliceSize = 512;
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: mimeType });
}
