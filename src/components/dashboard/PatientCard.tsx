
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Calendar, Clock, ChevronRight } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface PatientCardProps {
  id: string;
  name: string;
  age: number;
  lastScan: string;
  status: "pending" | "complete" | "error";
  diagnosis?: string;
}

export function PatientCard({ id, name, age, lastScan, status, diagnosis }: PatientCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const statusLabels = {
    pending: "Analysis Pending",
    complete: "Analysis Complete",
    error: "Analysis Error",
  };

  const handleCardClick = () => {
    navigate(`/patients/${id}`);
  };

  const handleViewResults = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/results/${id}`);
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 ${
        isHovered ? "shadow-md" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{name}</CardTitle>
          <div className={`analysis-status ${status === "pending" ? "status-pending" : status === "complete" ? "status-complete" : "status-error"}`}>
            {statusLabels[status]}
          </div>
        </div>
        <CardDescription className="flex items-center mt-1">
          <User className="h-3 w-3 mr-1" />
          <span>{age} years</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-1 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Last scan: {lastScan}</span>
          </div>
          {status === "complete" && diagnosis && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="line-clamp-1 font-medium text-sm">
                    {diagnosis}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{diagnosis}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="ml-auto flex items-center text-xs"
          onClick={handleViewResults}
        >
          {status === "complete" ? "View Results" : "View Details"}
          <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
