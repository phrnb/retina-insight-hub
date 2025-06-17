
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

export default function EditPatientPage() {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [patientData, setPatientData] = useState({
    name: "John Doe",
    age: "67",
    phone: "+1 (555) 123-4567",
    email: "john.doe@email.com",
    address: "123 Main St, City, State 12345",
    diagnosis: "Multiple Sclerosis",
    status: "Stable",
    notes: "Patient shows stable condition with regular medication adherence."
  });

  const handleSave = () => {
    toast({
      title: "Пациент обновлен",
      description: `Данные пациента ${patientId} успешно сохранены`,
    });
    navigate("/patients");
  };

  const handleCancel = () => {
    navigate("/patients");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Редактирование пациента ${patientId}`}
        description="Изменение данных пациента"
      />

      <Card>
        <CardHeader>
          <CardTitle>Основная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">ФИО пациента</Label>
              <Input
                id="name"
                value={patientData.name}
                onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Возраст</Label>
              <Input
                id="age"
                type="number"
                value={patientData.age}
                onChange={(e) => setPatientData({ ...patientData, age: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                value={patientData.phone}
                onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={patientData.email}
                onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Адрес</Label>
              <Input
                id="address"
                value={patientData.address}
                onChange={(e) => setPatientData({ ...patientData, address: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="diagnosis">Диагноз</Label>
              <Input
                id="diagnosis"
                value={patientData.diagnosis}
                onChange={(e) => setPatientData({ ...patientData, diagnosis: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Статус</Label>
              <Select value={patientData.status} onValueChange={(value) => setPatientData({ ...patientData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Stable">Стабильное</SelectItem>
                  <SelectItem value="Improving">Улучшение</SelectItem>
                  <SelectItem value="Deteriorating">Ухудшение</SelectItem>
                  <SelectItem value="Critical">Критическое</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Заметки</Label>
              <Textarea
                id="notes"
                value={patientData.notes}
                onChange={(e) => setPatientData({ ...patientData, notes: e.target.value })}
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
