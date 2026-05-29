import axios from "axios";
import { CData } from "../../credential/data.ts";

export interface PresignedPostProps {
  url: string;
  fields: {
    key: string;
    policy: string;
    [key: string]: string;
  };
  alreadyExists: boolean;
}

export const imageApi = {
  async fetchThumbNailUrl(fileName: string): Promise<string | undefined> {
    try {
      const res = await axios
        .get<string>(CData.image_backend + "/get/thumbnail-src-url?filename=" + fileName);
      return res.data;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  },

  async getPresignedPost(file: File, accessToken: string): Promise<PresignedPostProps> {
    const sha256 = await computeSha256Hex(file);
    const res = await axios
      .get<PresignedPostProps>(CData.image_backend + "/get/presigned-post", {
        headers: {
          "Content-Type": "application/json",
          "X-File-MimeType": file.type,
          "X-File-Sha256": sha256,
          Authorization: `Bearer ${accessToken}`
        }
      });
    return res.data;
  },
};

async function computeSha256Hex(file: File): Promise<string> {
  const source = new Uint8Array(await file.arrayBuffer());
  // Copy into a freshly allocated Uint8Array so its underlying ArrayBuffer
  // belongs to the current realm — some test environments (vitest+jsdom)
  // hand back a Blob-realm ArrayBuffer that crypto.subtle rejects with
  // "2nd argument is not instance of ArrayBuffer".
  const data = new Uint8Array(source.length);
  data.set(source);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(hashBuffer);
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, "0");
  }
  return hex;
}
