
import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { NotificationList } from "@/components/notifications/NotificationList";
import { NotificationFilters } from "@/components/notifications/NotificationFilters";
import { Card, CardContent } from "@/components/ui/card";

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  
  return (
    <div className="space-y-4">
      <PageHeader 
        title="Notifications" 
        description="View and manage your system notifications"
        helpContent="Notifications are generated when new images are uploaded, results are ready, or other important events occur."
      />
      
      <Card>
        <CardContent className="p-6">
          <NotificationFilters currentFilter={filter} onFilterChange={setFilter} />
          <NotificationList filter={filter} />
        </CardContent>
      </Card>
    </div>
  );
}
