import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Printer, Share2, Eye, Edit, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { ContextualHelp } from "@/components/common/ContextualHelp";
import { useToast } from "@/hooks/use-toast";

// Sample reports data
const sampleReports = [
  {
    id: "RPT-2025-001",
    patientId: "PT-2025-001",
    patientName: "John Doe",
    type: "Diagnostic Summary",
    generatedDate: "2025-04-02",
    generatedBy: "Dr. Smith",
  },
  {
    id: "RPT-2025-002",
    patientId: "PT-2025-001",
    patientName: "John Doe",
    type: "Treatment Plan",
    generatedDate: "2025-04-02",
    generatedBy: "Dr. Smith",
  },
  {
    id: "RPT-2025-003",
    patientId: "PT-2025-002",
    patientName: "Sarah Miller",
    type: "Diagnostic Summary",
    generatedDate: "2025-04-01",
    generatedBy: "Dr. Johnson",
  },
  {
    id: "RPT-2025-004",
    patientId: "PT-2025-003",
    patientName: "Robert Johnson",
    type: "Follow-up Analysis",
    generatedDate: "2025-03-28",
    generatedBy: "Dr. Wilson",
  }
];

export default function ReportsPage() {
  const { toast } = useToast();

  const handleView = (reportId: string) => {
    toast({
      title: "Просмотр отчета",
      description: `Открываем отчет ${reportId}`,
    });
  };

  const handleEdit = (reportId: string) => {
    toast({
      title: "Редактирование отчета",
      description: `Редактируем отчет ${reportId}`,
    });
  };

  const handlePrint = (reportId: string) => {
    toast({
      title: "Печать отчета",
      description: `Отправляем на печать отчет ${reportId}`,
    });
  };

  const handleDownload = (reportId: string) => {
    toast({
      title: "Загрузка отчета",
      description: `Скачиваем отчет ${reportId} в формате PDF`,
    });
  };

  const handleShare = (reportId: string) => {
    toast({
      title: "Поделиться отчетом",
      description: `Делимся отчетом ${reportId} с коллегами`,
    });
  };

  const handleDelete = (reportId: string) => {
    toast({
      title: "Удаление отчета",
      description: `Отчет ${reportId} отправлен в корзину`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Медицинские отчеты"
        description="Создание и управление диагностическими отчетами пациентов"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Созданные отчеты</span>
            <ContextualHelp
              title="Управление отчетами"
              content="Просматривайте все созданные отчеты, скачивайте их в различных форматах или безопасно делитесь ими с пациентами или другими медицинскими работниками."
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Все отчеты</TabsTrigger>
              <TabsTrigger value="diagnostic">Диагностические</TabsTrigger>
              <TabsTrigger value="treatment">Планы лечения</TabsTrigger>
              <TabsTrigger value="followup">Контрольные</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID отчета</TableHead>
                      <TableHead>Пациент</TableHead>
                      <TableHead>Тип</TableHead>
                      <TableHead>Дата создания</TableHead>
                      <TableHead>Создал</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>{report.patientName}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.generatedDate}</TableCell>
                        <TableCell>{report.generatedBy}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleView(report.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleEdit(report.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handlePrint(report.id)}
                            >
                              <Printer className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleDownload(report.id)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleShare(report.id)}
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              onClick={() => handleDelete(report.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="diagnostic">
              <div className="p-4 text-center text-muted-foreground border rounded-md">
                Filter applied for diagnostic reports
              </div>
            </TabsContent>
            
            <TabsContent value="treatment">
              <div className="p-4 text-center text-muted-foreground border rounded-md">
                Filter applied for treatment plans
              </div>
            </TabsContent>
            
            <TabsContent value="followup">
              <div className="p-4 text-center text-muted-foreground border rounded-md">
                Filter applied for follow-up reports
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
