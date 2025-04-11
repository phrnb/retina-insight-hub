
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
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-palette-navy border-b border-palette-gray/20 dark:border-palette-mauve/20 px-4 py-3 sm:px-6 medical-glass">
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-palette-mauve" />
            <div className="font-semibold text-lg text-palette-mauve">Neuro</div>
            <div className="font-medium text-lg">View</div>
          </div>
        </div>
        
        <form onSubmit={handleSearch} className="hidden md:flex max-w-sm items-center space-x-2 mx-4 flex-1">
          <Input
            type="search"
            placeholder="Search patients..."
            className="h-9 border-palette-gray/30 focus-visible:ring-palette-mauve"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" size="sm" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </form>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={handleNotificationClick}>
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={handleHelpClick}>
            <HelpCircle className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
            <Settings className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative h-8 rounded-full">
                <span className="sr-only">User menu</span>
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-palette-beige/20 text-palette-mauve">
                  <User className="h-4 w-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/settings')}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>Activity Log</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
