
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  FileImage, 
  Activity, 
  Send, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight  
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive: boolean;
  isCollapsed: boolean;
}

function SidebarItem({ icon: Icon, label, to, isActive, isCollapsed }: SidebarItemProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={to}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            )}
          >
            <Icon className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium">{label}</span>}
          </Link>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

export function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/" },
    { icon: Users, label: "Patients", to: "/patients" },
    { icon: FileImage, label: "Analysis", to: "/analysis" },
    { icon: Activity, label: "Results", to: "/results" },
    { icon: Send, label: "Reports", to: "/reports" },
  ];

  return (
    <div 
      className={cn(
        "bg-sidebar relative h-screen flex flex-col border-r border-sidebar-border transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center">
            <div className="rounded-md bg-medical-300 p-1">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="ml-2 font-semibold text-sidebar-foreground text-lg">RetinaScan</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
            isCollapsed ? "mx-auto" : "ml-auto"
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
              isActive={location.pathname === item.to}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <nav className="space-y-1">
          <SidebarItem
            icon={Settings}
            label="Settings"
            to="/settings"
            isActive={location.pathname === "/settings"}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={HelpCircle}
            label="Help"
            to="/help"
            isActive={location.pathname === "/help"}
            isCollapsed={isCollapsed}
          />
        </nav>
      </div>
    </div>
  );
}
