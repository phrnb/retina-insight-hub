
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, CheckCircle, CircleDot } from "lucide-react";

interface NotificationFiltersProps {
  currentFilter: "all" | "unread" | "read";
  onFilterChange: (filter: "all" | "unread" | "read") => void;
}

export function NotificationFilters({ currentFilter, onFilterChange }: NotificationFiltersProps) {
  return (
    <div className="mb-6">
      <Tabs value={currentFilter} onValueChange={(value) => onFilterChange(value as any)}>
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>All</span>
          </TabsTrigger>
          <TabsTrigger value="unread" className="flex items-center gap-2">
            <CircleDot className="h-4 w-4" />
            <span>Unread</span>
          </TabsTrigger>
          <TabsTrigger value="read" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Read</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
