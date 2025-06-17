
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/common/PageHeader";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";

export default function EditReportPage() {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [reportData, setReportData] = useState({
    title: "Диагностическое заключение",
    patientName: "John Doe",
    type: "Diagnostic Summary",
    content: "Пациент проходил МРТ исследование головного мозга. Выявлены характерные изменения, соответствующие рассеянному склерозу.",
    conclusion: "Диагноз подтвержден. Рекомендуется продолжение терапии.",
    recommendations: "1. Прием препаратов согласно схеме\n2. Контрольное обследование через 6 месяцев\n3. Физиотерапия"
  });

  const handleSave = () => {
    toast({
      title: "Отчет обновлен",
      description: `Отчет ${reportId} успешно сохранен`,
    });
    navigate("/reports");
  };

  const handleCancel = () => {
    navigate("/reports");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Редактирование отчета ${reportId}`}
        description="Изменение медицинского отчета"
      />

      <Card>
        <CardHeader>
          <CardTitle>Информация об отчете</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Название отчета</Label>
              <Input
                id="title"
                value={reportData.title}
                onChange={(e) => setReportData({ ...reportData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patient">Пациент</Label>
              <Input
                id="patient"
                value={reportData.patientName}
                onChange={(e) => setReportData({ ...reportData, patientName: e.target.value })}
                disabled
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="type">Тип отчета</Label>
              <Select value={reportData.type} onValueChange={(value) => setReportData({ ...reportData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Diagnostic Summary">Диагностическое заключение</SelectItem>
                  <SelectItem value="Treatment Plan">План лечения</SelectItem>
                  <SelectItem value="Follow-up Analysis">Контрольное обследование</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="content">Содержание отчета</Label>
              <Textarea
                id="content"
                value={reportData.content}
                onChange={(e) => setReportData({ ...reportData, content: e.target.value })}
                rows={6}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="conclusion">Заключение</Label>
              <Textarea
                id="conclusion"
                value={reportData.conclusion}
                onChange={(e) => setReportData({ ...reportData, conclusion: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="recommendations">Рекомендации</Label>
              <Textarea
                id="recommendations"
                value={reportData.recommendations}
                onChange={(e) => setReportData({ ...reportData, recommendations: e.target.value })}
                rows={4}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={handleSave} className="flex gap-2">
              <Save className="h-4 w-4" />
              Сохранить
            </Button>
            <Button variant="outline" onClick={handleCancel} className="flex gap-2">
              <ArrowLeft className="h-4 w-4" />
              Отмена
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
