
import { useState, useEffect } from "react";
import { Bell, CheckCheck, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Notification = {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "upload" | "result" | "system";
};

interface NotificationListProps {
  filter: "all" | "unread" | "read";
}

export function NotificationList({ filter }: NotificationListProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch notifications
    const timer = setTimeout(() => {
      setNotifications([
        {
          id: "1",
          title: "New Analysis Results",
          message: "MRI analysis for patient John Doe is now available.",
          timestamp: "2025-04-10T10:30:00",
          read: false,
          type: "result"
        },
        {
          id: "2",
          title: "Image Upload Successful",
          message: "5 new MRI scans were successfully uploaded for patient Jane Smith.",
          timestamp: "2025-04-09T16:45:00",
          read: true,
          type: "upload"
        },
        {
          id: "3",
          title: "System Maintenance",
          message: "System will be down for maintenance on April 15 from 2AM to 4AM EST.",
          timestamp: "2025-04-08T09:15:00",
          read: false,
          type: "system"
        }
      ]);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true;
    if (filter === "read") return notification.read;
    if (filter === "unread") return !notification.read;
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4 mt-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-4 border rounded-md">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-full mt-2" />
          </div>
        ))}
      </div>
    );
  }
  
  if (filteredNotifications.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <Bell className="h-12 w-12 mx-auto mb-3 opacity-30" />
        <p>No {filter !== "all" ? filter : ""} notifications found.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4 mt-4">
      {filteredNotifications.length > 0 && filter === "unread" && (
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCheck className="mr-1 h-4 w-4" />
            Mark all as read
          </Button>
        </div>
      )}
      
      {filteredNotifications.map(notification => (
        <div 
          key={notification.id} 
          className={`p-4 border rounded-md ${!notification.read ? 'border-primary/50 bg-primary/5' : 'bg-card'} relative`}
        >
          {!notification.read && (
            <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary"></span>
          )}
          
          <div className="flex items-start gap-3">
            <div className="rounded-full p-2 bg-primary/10 text-primary">
              {notification.type === "upload" && <Eye className="h-4 w-4" />}
              {notification.type === "result" && <Bell className="h-4 w-4" />}
              {notification.type === "system" && <Clock className="h-4 w-4" />}
            </div>
            
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <h4 className="text-sm font-medium">{notification.title}</h4>
                <span className="text-xs text-muted-foreground">
                  {new Date(notification.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
            </div>
          </div>
          
          {!notification.read && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2" 
              onClick={() => markAsRead(notification.id)}
            >
              Mark as read
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
