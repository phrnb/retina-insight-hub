
import { Button } from "@/components/ui/button";
import { FileText, Brain, Calendar, Edit, Trash2, Phone, Mail } from "lucide-react";
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
    toast({
      title: "Просмотр записей",
      description: `Открываем медицинские записи пациента ${patientId}`,
    });
  };

  const handleViewAnalysis = () => {
    navigate(`/analysis/${patientId}`);
    toast({
      title: "Анализ данных",
      description: `Переходим к анализу данных пациента ${patientId}`,
    });
  };

  const handleSchedule = () => {
    navigate(`/patients/${patientId}/schedule`);
    toast({
      title: "Запись на прием",
      description: `Планируем встречу с пациентом ${patientId}`,
    });
  };

  const handleEdit = () => {
    toast({
      title: "Редактирование",
      description: `Редактируем данные пациента ${patientId}`,
    });
  };

  const handleCall = () => {
    toast({
      title: "Звонок пациенту",
      description: `Звоним пациенту ${patientId}`,
    });
  };

  const handleEmail = () => {
    toast({
      title: "Отправка email",
      description: `Отправляем письмо пациенту ${patientId}`,
    });
  };

  const handleDelete = () => {
    toast({
      title: "Удаление записи",
      description: `Пациент ${patientId} перемещен в архив`,
      variant: "destructive",
    });
  };

  return (
    <div className="flex justify-end gap-1">
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleViewRecords}>
        <FileText className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleViewAnalysis}>
        <Brain className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSchedule}>
        <Calendar className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleEdit}>
        <Edit className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCall}>
        <Phone className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleEmail}>
        <Mail className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 text-red-600 hover:text-red-700" 
        onClick={handleDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
