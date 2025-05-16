
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
              "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
              isActive
                ? "bg-white/20 text-white font-medium"
                : "text-sidebar-foreground/90 hover:bg-white/10 hover:text-white"
            )}
          >
            <Icon className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium">{label}</span>}
          </Link>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right" className="bg-white/90 dark:bg-palette-charcoal/90 backdrop-blur-md">
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
    { icon: LayoutDashboard, label: "Панель управления", to: "/" },
    { icon: Users, label: "Пациенты", to: "/patients" },
    { icon: FileImage, label: "Анализ", to: "/analysis" },
    { icon: Activity, label: "Результаты", to: "/results" },
    { icon: Send, label: "Отчеты", to: "/reports" },
  ];
  
  const featureItems = [
    { icon: Bell, label: "Уведомления", to: "/notifications" },
    { icon: BookOpen, label: "База знаний", to: "/knowledge" },
    { icon: HeartPulse, label: "Второе мнение", to: "/second-opinion" }
  ];

  return (
    <div 
      className={cn(
        "bg-palette-mauve relative h-screen flex flex-col border-r border-white/10 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center">
            <div className="rounded-md bg-white/20 p-1.5">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="ml-2 font-semibold text-white text-lg">NeuroView</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "text-white hover:bg-white/10 hover:text-white",
            isCollapsed ? "mx-auto" : "ml-auto"
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
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
          <div className="px-3 pt-6 pb-2">
            <div className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              Дополнительные функции
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
      
      <div className="p-4 border-t border-white/10">
        <nav className="space-y-1">
          <SidebarItem
            icon={Settings}
            label="Настройки"
            to="/settings"
            isActive={location.pathname === "/settings"}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={HelpCircle}
            label="Помощь"
            to="/help"
            isActive={location.pathname === "/help"}
            isCollapsed={isCollapsed}
          />
        </nav>
      </div>
    </div>
  );
}
