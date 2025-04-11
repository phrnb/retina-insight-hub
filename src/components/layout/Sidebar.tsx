
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
  ChevronRight,
  Brain,
  Bell,
  BookOpen,
  History,
  HeartPulse
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive: boolean;
  isCollapsed: boolean;
}

function SidebarItem({ icon: Icon, label, to, isActive, isCollapsed }: SidebarItemProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={to}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              isActive
                ? "bg-palette-beige/20 text-palette-beige"
                : "text-sidebar-foreground hover:bg-palette-beige/10 hover:text-palette-beige"
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

  const mainItems = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/" },
    { icon: Users, label: "Patients", to: "/patients" },
    { icon: FileImage, label: "Analysis", to: "/analysis" },
    { icon: Activity, label: "Results", to: "/results" },
    { icon: Send, label: "Reports", to: "/reports" },
  ];
  
  const featureItems = [
    { icon: Bell, label: "Notifications", to: "/notifications" },
    { icon: BookOpen, label: "Knowledge Base", to: "/knowledge" },
    { icon: HeartPulse, label: "Second Opinion", to: "/second-opinion" }
  ];

  return (
    <div 
      className={cn(
        "bg-palette-navy relative h-screen flex flex-col border-r border-palette-mauve/30 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center">
            <div className="rounded-md bg-palette-beige p-1">
              <Brain className="h-6 w-6 text-palette-navy" />
            </div>
            <span className="ml-2 font-semibold text-palette-beige text-lg">NeuroView</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "text-palette-beige hover:bg-palette-beige/10 hover:text-white",
            isCollapsed ? "mx-auto" : "ml-auto"
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {mainItems.map((item) => (
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
        
        {!isCollapsed && (
          <div className="px-3 pt-5 pb-2">
            <div className="text-xs font-semibold text-palette-gray/70 uppercase tracking-wider">
              Additional Features
            </div>
          </div>
        )}
        
        <nav className="space-y-1 px-2">
          {featureItems.map((item) => (
            <SidebarItem
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
              isActive={location.pathname.startsWith(item.to)}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-palette-mauve/30">
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
