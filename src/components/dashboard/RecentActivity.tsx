
import { Activity, Clock, FileText, Image, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ActivityItem {
  id: string;
  type: "upload" | "diagnosis" | "report" | "patient";
  description: string;
  timestamp: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "upload":
        return <Image className="h-4 w-4" />;
      case "diagnosis":
        return <Activity className="h-4 w-4" />;
      case "report":
        return <FileText className="h-4 w-4" />;
      case "patient":
        return <User className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest actions and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="mr-3 mt-0.5 rounded-md bg-medical-100 p-1.5 text-medical-500">
                {getActivityIcon(activity.type)}
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium leading-none">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <div className="flex justify-center items-center h-24 text-muted-foreground text-sm">
              No recent activity
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
