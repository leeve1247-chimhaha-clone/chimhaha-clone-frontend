import axios from "axios";
import { CData } from "../../credential/data.ts";

export const accountApi = {
  async fetchNickName(accessToken: string | undefined): Promise<string> {
    const axiosResponse = await axios.get<string>(CData.local_backend + "/getMyNickName", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (axiosResponse.data !== "") {
      return axiosResponse.data;
    }
    return "전문시청팀";
  },
};
