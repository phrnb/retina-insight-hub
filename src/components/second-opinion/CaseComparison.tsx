
import { useState, useEffect } from "react";
import { Brain, FileImage, FileText, ArrowLeft, ArrowRight, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface CaseData {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  diagnosis: string;
  findings: string;
  treatment: string;
  outcome: string;
  scanImages: string[];
}

interface CaseComparisonProps {
  currentCaseId?: string;
  comparisonCaseId: string | null;
}

export function CaseComparison({ currentCaseId, comparisonCaseId }: CaseComparisonProps) {
  const [currentCase, setCurrentCase] = useState<CaseData | null>(null);
  const [comparisonCase, setComparisonCase] = useState<CaseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState<"findings" | "images" | "outcomes">("findings");
  const { toast } = useToast();
  
  // Load current case data
  useEffect(() => {
    if (!currentCaseId) return;
    
    setIsLoading(true);
    
    // Simulate API call to get current case
    const timer = setTimeout(() => {
      const mockCurrentCase: CaseData = {
        id: "current",
        patientId: "P78901",
        patientName: "Вильям Браун",
        age: 69,
        gender: "Мужской",
        diagnosis: "Болезнь Альцгеймера (Ранняя стадия)",
        findings: "Пациент демонстрирует легкие когнитивные нарушения, особенно кратковременной памяти. МРТ показывает раннюю атрофию гиппокампа, типичную для болезни Альцгеймера. Результат Mini-Mental State Examination: 24/30. Самостоятельно сообщает о трудностях с выполнением сложных задач и периодической дезориентации.",
        treatment: "Донепезил 5 мг ежедневно, когнитивно-поведенческая терапия, упражнения для памяти.",
        outcome: "Ожидается повторный визит через 3 месяца. Начальный ответ на лечение показывает незначительное улучшение повседневного функционирования.",
        scanImages: [
          "https://placehold.co/600x400?text=МРТ+Скан+1",
          "https://placehold.co/600x400?text=МРТ+Скан+2"
        ]
      };
      
      setCurrentCase(mockCurrentCase);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [currentCaseId]);
  
  // Load comparison case data when selected
  useEffect(() => {
    if (!comparisonCaseId) {
      setComparisonCase(null);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to get comparison case
    const timer = setTimeout(() => {
      const mockComparisonCase: CaseData = {
        id: "case1",
        patientId: "P12345",
        patientName: "Иван Смирнов",
        age: 72,
        gender: "Мужской",
        diagnosis: "Болезнь Альцгеймера (Ранняя стадия)",
        findings: "Пациент имеет легкие нарушения памяти и периодическую спутанность сознания. МРТ показывает раннюю атрофию гиппокампа и легкое расширение желудочков. Результат Mini-Mental State Examination: 25/30. Семья сообщает, что у пациента возникают трудности с управлением финансами, и он иногда теряется в знакомых местах.",
        treatment: "Донепезил 5 мг ежедневно, увеличено до 10 мг через 4 недели. Еженедельная терапия когнитивной стимуляции.",
        outcome: "После 6 месяцев наблюдается стабилизация когнитивных функций с сохранением MMSE на уровне 24/30. Пациент сообщает о повышении уверенности в повседневной деятельности.",
        scanImages: [
          "https://placehold.co/600x400?text=Сравнение+МРТ+1",
          "https://placehold.co/600x400?text=Сравнение+МРТ+2"
        ]
      };
      
      setComparisonCase(mockComparisonCase);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [comparisonCaseId]);
  
  const adoptTreatment = () => {
    if (!comparisonCase) return;
    
    toast({
      title: "План лечения скопирован",
      description: "Выбранный подход к лечению был скопирован для текущего случая."
    });
  };
  
  if (!currentCaseId) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="h-12 w-12 text-muted-foreground opacity-30" />
        <h3 className="mt-4 text-lg font-medium">Текущий случай не выбран</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Пожалуйста, выберите случай для начала сравнения.
        </p>
      </div>
    );
  }
  
  if (!comparisonCaseId) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Brain className="h-12 w-12 text-muted-foreground opacity-30" />
        <h3 className="mt-4 text-lg font-medium">Второе мнение</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Выберите похожий случай из списка для просмотра сравнения.
        </p>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-9 w-32" />
        </div>
        
        <Skeleton className="h-10 w-64 mb-4" />
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Сравнение случаев</h3>
        {tab === "findings" && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={adoptTreatment}
            disabled={!comparisonCase}
          >
            <Copy className="mr-2 h-4 w-4" />
            Использовать этот подход
          </Button>
        )}
      </div>
      
      <Tabs value={tab} onValueChange={(value) => setTab(value as any)} className="mb-2">
        <TabsList>
          <TabsTrigger value="findings">
            <FileText className="h-4 w-4 mr-2" />
            Результаты
          </TabsTrigger>
          <TabsTrigger value="images">
            <FileImage className="h-4 w-4 mr-2" />
            Изображения
          </TabsTrigger>
          <TabsTrigger value="outcomes">
            <ArrowRight className="h-4 w-4 mr-2" />
            Исходы
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {tab === "findings" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h4 className="font-medium">Текущий случай</h4>
              <Badge className="ml-auto">Текущий</Badge>
            </div>
            
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium mb-1">Пациент</h5>
                <p className="text-sm">
                  {currentCase?.patientName}, {currentCase?.age} лет, {currentCase?.gender}
                </p>
              </div>
              
              <div>
                <h5 className="text-sm font-medium mb-1">Диагноз</h5>
                <p className="text-sm">{currentCase?.diagnosis}</p>
              </div>
              
              <div>
                <h5 className="text-sm font-medium mb-1">Клинические результаты</h5>
                <p className="text-sm">{currentCase?.findings}</p>
              </div>
              
              <div>
                <h5 className="text-sm font-medium mb-1">План лечения</h5>
                <p className="text-sm">{currentCase?.treatment}</p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h4 className="font-medium">Случай для сравнения</h4>
              <Badge variant="outline" className="ml-auto">Похожий</Badge>
            </div>
            
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium mb-1">Пациент</h5>
                <p className="text-sm">
                  {comparisonCase?.patientName}, {comparisonCase?.age} лет, {comparisonCase?.gender}
                </p>
              </div>
              
              <div>
                <h5 className="text-sm font-medium mb-1">Диагноз</h5>
                <p className="text-sm">{comparisonCase?.diagnosis}</p>
              </div>
              
              <div>
                <h5 className="text-sm font-medium mb-1">Клинические результаты</h5>
                <p className="text-sm">{comparisonCase?.findings}</p>
              </div>
              
              <div>
                <h5 className="text-sm font-medium mb-1">План лечения</h5>
                <p className="text-sm bg-primary/5 rounded-sm p-1 border-l-2 border-primary">
                  {comparisonCase?.treatment}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {tab === "images" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Изображения текущего случая</h4>
            <div className="space-y-4">
              {currentCase?.scanImages.map((img, idx) => (
                <div key={idx} className="border rounded-md overflow-hidden">
                  <img src={img} alt={`Скан ${idx + 1}`} className="w-full h-auto" />
                  <div className="p-2 bg-muted/30">
                    <p className="text-xs text-center">Скан {idx + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Изображения для сравнения</h4>
            <div className="space-y-4">
              {comparisonCase?.scanImages.map((img, idx) => (
                <div key={idx} className="border rounded-md overflow-hidden">
                  <img src={img} alt={`Сравнение Скан ${idx + 1}`} className="w-full h-auto" />
                  <div className="p-2 bg-muted/30">
                    <p className="text-xs text-center">Скан {idx + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {tab === "outcomes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Текущий случай</h4>
            <div className="p-4 border rounded-md">
              <h5 className="text-sm font-medium mb-2">Ожидаемый исход</h5>
              <p className="text-sm">{currentCase?.outcome}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Случай для сравнения</h4>
            <div className="p-4 border rounded-md">
              <h5 className="text-sm font-medium mb-2">Документированный исход</h5>
              <p className="text-sm">{comparisonCase?.outcome}</p>
              
              <div className="mt-4 p-3 bg-primary/5 rounded-md border border-primary/20">
                <h6 className="text-xs font-medium mb-1">Актуальность исхода</h6>
                <p className="text-xs">
                  У этого пациента была похожая клиническая картина и подход к лечению.
                  Документированный исход предполагает вероятную стабилизацию симптомов
                  при текущем плане лечения.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
