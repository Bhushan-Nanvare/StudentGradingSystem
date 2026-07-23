import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  sendNotification,
} from "@/services/notificationService";

export const useMyNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getMyNotifications,
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      toast.error("Failed to mark notification as read.");
    },
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("All notifications marked as read.");
    },
    onError: () => {
      toast.error("Failed to mark notifications as read.");
    },
  });
};

export const useSendNotification = () => {
  return useMutation({
    mutationFn: sendNotification,
    onSuccess: () => {
      toast.success("Notification sent successfully.");
    },
    onError: () => {
      toast.error("Failed to send notification.");
    },
  });
};
