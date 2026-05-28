import axios from "axios";
import { CData } from "../../credential/data.ts";

export interface NotificationDto {
  id: number;
  type: string;
  postId: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}

export const notificationApi = {
  async fetchMyNotifications(accessToken: string): Promise<NotificationDto[]> {
    const res = await axios.get<NotificationDto[]>(CData.local_notif + "/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  },

  async markRead(id: number, accessToken: string): Promise<void> {
    await axios.patch(CData.local_notif + "/" + id + "/read", null, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};
