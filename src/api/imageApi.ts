import axios from "axios";
import { CData } from "../../credential/data.ts";

export interface PresignedPostProps {
  url: string;
  fields: {
    key: string;
    policy: string;
    [key: string]: string;
  };
}

export const imageApi = {
  async fetchThumbNailUrl(fileName: string): Promise<string | undefined> {
    try {
      const res = await axios
        .get<string>(CData.local_backend + "/get/thumbnail-src-url?filename=" + fileName);
      return res.data;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  },

  async getPresignedPost(file: File, accessToken: string): Promise<PresignedPostProps> {
    const res = await axios
      .get<PresignedPostProps>(CData.local_backend + "/get/presigned-post", {
        headers: {
          "Content-Type": "application/json",
          "X-File-MimeType": file.type,
          Authorization: `Bearer ${accessToken}`
        }
      });
    return res.data;
  },
};
