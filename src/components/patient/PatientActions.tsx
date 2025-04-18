
import { Button } from "@/components/ui/button";
import { FileText, Brain, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface PatientActionsProps {
  patientId: string;
}

export function PatientActions({ patientId }: PatientActionsProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewRecords = () => {
    navigate(`/patients/${patientId}/records`);
  };

  const handleViewAnalysis = () => {
    navigate(`/analysis/${patientId}`);
  };

  const handleSchedule = () => {
    navigate(`/patients/${patientId}/schedule`);
  };

  return (
    <div className="flex justify-end gap-2">
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleViewRecords}>
        <FileText className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleViewAnalysis}>
        <Brain className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSchedule}>
        <Calendar className="h-4 w-4" />
      </Button>
    </div>
  );
}
