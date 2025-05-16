
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddPatientForm } from "./AddPatientForm";

interface PatientFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  onPatientAdded?: (patient: any) => void;
}

export function PatientFilters({ 
  searchQuery, 
  setSearchQuery, 
  handleSearch, 
  onPatientAdded 
}: PatientFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
      <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
        <Input
          placeholder="Поиск пациентов..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </form>
      
      <div className="flex space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Фильтр
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Все пациенты</DropdownMenuItem>
            <DropdownMenuItem>Последние пациенты</DropdownMenuItem>
            <DropdownMenuItem>Критические пациенты</DropdownMenuItem>
            <DropdownMenuItem>По диагнозу</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AddPatientForm onPatientAdded={onPatientAdded} />
      </div>
    </div>
  );
}
