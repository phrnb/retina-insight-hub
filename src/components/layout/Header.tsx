
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
import { useApi } from "@/pages/Index";

export function Header() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { updateToken } = useApi();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Поиск...",
      description: `Поиск: ${searchQuery}`
    });
  };

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  const handleHelpClick = () => {
    navigate('/help');
  };

  const handleLogout = () => {
    // Set a demo token to keep the app functional while testing
    updateToken("demo-token");
    toast({
      title: "Демо режим",
      description: "Навигация включена для демонстрационных целей."
    });
    // Don't navigate away - stay on current page
    // navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-palette-charcoal/90 border-b border-slate-200/50 dark:border-slate-700/50 px-4 py-3 sm:px-6 medical-glass shadow-sm">
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className="p-1 rounded-md bg-palette-mauve/10">
              <Brain className="h-5 w-5 text-palette-mauve" />
            </div>
            <div className="font-semibold text-lg text-palette-mauve">Нейро</div>
            <div className="font-medium text-lg">Вью</div>
          </div>
        </div>
        
        <form onSubmit={handleSearch} className="hidden md:flex max-w-sm items-center space-x-2 mx-4 flex-1">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск пациентов..."
              className="h-9 pl-10 pr-4 border-slate-200 dark:border-slate-700 focus-visible:ring-palette-mauve bg-white/50 dark:bg-palette-charcoal/50 backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" size="sm" variant="ghost" className="hover:bg-palette-mauve/10">
            <Search className="h-4 w-4" />
          </Button>
        </form>
        
        <div className="flex items-center space-x-1 sm:space-x-3">
          <Button variant="ghost" size="icon" onClick={handleNotificationClick} className="hover:bg-palette-mauve/10 rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={handleHelpClick} className="hover:bg-palette-mauve/10 rounded-full">
            <HelpCircle className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" onClick={() => navigate('/settings')} className="hover:bg-palette-mauve/10 rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative h-8 rounded-full ml-2">
                <span className="sr-only">Меню пользователя</span>
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-palette-mauve/10 text-palette-mauve">
                  <User className="h-4 w-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/90 dark:bg-palette-charcoal/90 backdrop-blur-md border-slate-200 dark:border-slate-700 shadow-lg animation-fade-in">
              <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer hover:bg-palette-mauve/10">Профиль</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer hover:bg-palette-mauve/10">Настройки</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer hover:bg-palette-mauve/10">Журнал активности</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer hover:bg-palette-mauve/10">Выйти</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
