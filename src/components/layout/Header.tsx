
import { useState } from 'react';
import { Bell, Brain, HelpCircle, Search, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search feature",
      description: "Patient search will be implemented in the next version.",
    });
  };

  const handleNotificationClick = () => {
    toast({
      title: "No new notifications",
      description: "You're all caught up!"
    });
  };

  const handleHelpClick = () => {
    toast({
      title: "Help Center",
      description: "Contextual help features will be available in the next version."
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You have been successfully logged out."
    });
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-palette-navy/90 border-b border-slate-200/50 dark:border-slate-700/50 px-4 py-3 sm:px-6 medical-glass shadow-sm">
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className="p-1 rounded-md bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div className="font-semibold text-lg text-primary">Neuro</div>
            <div className="font-medium text-lg">View</div>
          </div>
        </div>
        
        <form onSubmit={handleSearch} className="hidden md:flex max-w-sm items-center space-x-2 mx-4 flex-1">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients..."
              className="h-9 pl-10 pr-4 border-slate-200 dark:border-slate-700 focus-visible:ring-primary bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" size="sm" variant="ghost" className="hover:bg-primary/10">
            <Search className="h-4 w-4" />
          </Button>
        </form>
        
        <div className="flex items-center space-x-1 sm:space-x-3">
          <Button variant="ghost" size="icon" onClick={handleNotificationClick} className="hover:bg-primary/10 rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={handleHelpClick} className="hover:bg-primary/10 rounded-full">
            <HelpCircle className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" onClick={() => navigate('/settings')} className="hover:bg-primary/10 rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative h-8 rounded-full ml-2">
                <span className="sr-only">User menu</span>
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary">
                  <User className="h-4 w-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-slate-200 dark:border-slate-700 shadow-lg animation-fade-in">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer hover:bg-primary/10">Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer hover:bg-primary/10">Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer hover:bg-primary/10">Activity Log</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer hover:bg-primary/10">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
