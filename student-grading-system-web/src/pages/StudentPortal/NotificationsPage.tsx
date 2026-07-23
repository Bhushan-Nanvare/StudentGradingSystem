import { useMyNotifications, useMarkNotificationRead } from "@/hooks/useNotifications";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Bell, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  const { data, isLoading } = useMyNotifications();
  const markReadMutation = useMarkNotificationRead();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">My Notifications</h1>
      </div>

      <div className="bg-white rounded-lg border shadow-sm divide-y">
        {data?.length === 0 && (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center">
            <Bell className="h-12 w-12 mb-4 text-slate-300" />
            <p>You have no notifications.</p>
          </div>
        )}

        {data?.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-4 flex gap-4 transition-colors ${notification.isRead ? 'bg-white' : 'bg-blue-50/50'}`}
          >
            <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${notification.isRead ? 'bg-transparent' : 'bg-blue-600'}`} />
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className={`font-medium ${notification.isRead ? 'text-slate-700' : 'text-slate-900'}`}>
                  {notification.title}
                </h3>
                <span className="text-xs text-slate-400">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className={`text-sm mt-1 ${notification.isRead ? 'text-slate-500' : 'text-slate-600'}`}>
                {notification.message}
              </p>
              
              {!notification.isRead && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-3 h-8 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-100/50"
                  onClick={() => markReadMutation.mutate(notification.id)}
                  disabled={markReadMutation.isPending}
                >
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  Mark as read
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
