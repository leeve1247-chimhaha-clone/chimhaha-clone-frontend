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
  fetchThumbNailUrl(fileName: string): Promise<string | undefined> {
    return axios
      .get<string>(CData.local_backend + "/get/thumbnail-src-url?filename=" + fileName)
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return undefined;
      });
  },

  getPresignedPost(file: File, accessToken: string): Promise<PresignedPostProps> {
    return axios
      .get<PresignedPostProps>(CData.local_backend + "/get/presigned-post", {
        headers: {
          "Content-Type": "application/json",
          "X-File-MimeType": file.type,
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data);
  },
};
