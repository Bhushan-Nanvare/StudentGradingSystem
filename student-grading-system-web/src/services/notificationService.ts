import api from "@/lib/axios";
import type { Notification, CreateNotificationRequest } from "@/types/notification";

export const getMyNotifications = async (): Promise<Notification[]> => {
  const response = await api.get("/notifications");
  return response.data;
};

export const markAsRead = async (id: number): Promise<void> => {
  await api.put(`/notifications/${id}/read`);
};

export const markAllAsRead = async (): Promise<void> => {
  await api.put("/notifications/read-all");
};

export const sendNotification = async (data: CreateNotificationRequest): Promise<void> => {
  await api.post("/notifications", data);
};
