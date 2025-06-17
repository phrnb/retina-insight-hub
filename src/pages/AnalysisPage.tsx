
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { ImageUploader } from "@/components/analysis/ImageUploader";
import { AnalysisResult } from "@/components/analysis/AnalysisResult";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

// Placeholder images for demo
const placeholderRetina = "https://www.researchgate.net/publication/343321384/figure/fig1/AS:918275507351553@1595950741268/Diabetic-retinopathy-Color-fundus-photographs-show-A-mild-nonproliferative-diabetic.jpg";
const placeholderHeatmap = "https://www.researchgate.net/publication/343321384/figure/fig2/AS:918275507351555@1595950741310/Heat-maps-showing-areas-of-interest-attention-of-the-CNN-for-classification-of-nonproli.jpg";

// Sample patient data
const samplePatients = [
  { id: "PN-2025-001", name: "Иван Петров", age: 67 },
  { id: "PN-2025-002", name: "Анна Смирнова", age: 54 },
  { id: "PN-2025-003", name: "Роберт Иванов", age: 72 },
  { id: "PN-2025-004", name: "Екатерина Васильева", age: 45 },
  { id: "PN-2025-005", name: "Михаил Семенов", age: 61 },
  { id: "PN-2025-006", name: "Елена Давыдова", age: 58 },
  { id: "PN-2025-007", name: "Дмитрий Николаев", age: 49 },
  { id: "PN-2025-008", name: "Ольга Кузнецова", age: 63 },
];

// Различные офтальмологические диагнозы
const possibleDiagnoses = [
  {
    diagnosis: "Умеренная диабетическая ретинопатия (НПДР, стадия 3) с признаками диабетического макулярного отека (ДМО). Множественные микроаневризмы видны в заднем полюсе. Присутствуют несколько точечных и пятнистых кровоизлияний. Признаки твердых экссудатов в области макулы указывают на ДМО. Нет признаков неоваскуляризации или витреального кровоизлияния. Рекомендуется направление к специалисту по сетчатке в течение 1-2 недель.",
    confidence: 92
  },
  {
    diagnosis: "Открытоугольная глаукома средней степени тяжести. Наблюдается увеличение экскавации диска зрительного нерва с соотношением C/D 0.7. Истончение нейроретинального ободка в верхней и нижней височных областях. Перипапиллярная атрофия RNFL соответствует характерным глаукоматозным изменениям. Рекомендуется измерение внутриглазного давления и периметрия для подтверждения диагноза.",
    confidence: 88
  },
  {
    diagnosis: "Возрастная макулярная дегенерация (ВМД) в промежуточной стадии. Множественные средние друзы (>63 мкм) распределены в макулярной области. Наблюдаются пигментные изменения в фовеальной области. Нет признаков неоваскуляризации или географической атрофии. Рекомендуется регулярное наблюдение каждые 6 месяцев и тест Амслера для домашнего мониторинга.",
    confidence: 85
  },
  {
    diagnosis: "Центральная серозная хориоретинопатия (ЦСХ). Наблюдается субретинальная жидкость в области фовеа с характерным \"куполообразным\" отслоением нейросенсорной сетчатки. Точка протечки видна в области RPE. Отсутствуют твердые экссудаты или кровоизлияния. Состояние может разрешиться спонтанно, но рекомендуется наблюдение в течение 3-4 месяцев.",
    confidence: 90
  },
  {
    diagnosis: "Гипертоническая ретинопатия 2 степени. Генерализованное сужение артериол с признаками артериовенозного нипинга (симптом Салюса-Гунна). Наблюдаются медно-проволочные рефлексы артериол. Несколько точечных кровоизлияний в среднем слое сетчатки. Нет признаков отека диска зрительного нерва или твердых экссудатов. Рекомендуется контроль артериального давления.",
    confidence: 87
  },
  {
    diagnosis: "Норма. Здоровая сетчатка без патологических изменений. Диск зрительного нерва имеет четкие границы и нормальную окраску. Соотношение C/D составляет 0.3. Макулярная область без друз или пигментных изменений. Сосудистая архитектура в пределах нормы с хорошим артериовенозным соотношением. Рекомендуется регулярный профилактический осмотр через 1-2 года.",
    confidence: 95
  }
];

export default function AnalysisPage() {
  const { toast } = useToast();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [analysisStatus, setAnalysisStatus] = useState<"idle" | "processing" | "complete">("idle");
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [currentDiagnosis, setCurrentDiagnosis] = useState<any>(null);
  
  useEffect(() => {
    if (selectedPatientId) {
      const patient = samplePatients.find(p => p.id === selectedPatientId);
      setSelectedPatient(patient);
    } else {
      setSelectedPatient(null);
    }
  }, [selectedPatientId]);

  const handleImageUpload = (file: File) => {
    if (!selectedPatientId) {
      toast({
        title: "Выберите пациента",
        description: "Пожалуйста, выберите пациента перед загрузкой изображения.",
        variant: "destructive"
      });
      return;
    }
    
    setUploadedImage(file);
    setAnalysisStatus("processing");
    
    // Генерируем случайный диагноз
    const randomDiagnosis = possibleDiagnoses[Math.floor(Math.random() * possibleDiagnoses.length)];
    
    // Simulate AI processing time
    setTimeout(() => {
      setCurrentDiagnosis(randomDiagnosis);
      setAnalysisStatus("complete");
      toast({
        title: "Анализ завершен",
        description: "ИИ-диагностический анализ успешно выполнен."
      });
    }, 3000);
  };

  return (
    <div>
      <PageHeader
        title="Анализ изображений"
        description="Загрузка и анализ снимков сетчатки с помощью ИИ"
        helpContent="Загрузите качественное изображение сетчатки для получения диагностического анализа с помощью ИИ. Система поддерживает фундус-снимки, ОКТ и другие форматы визуализации сетчатки."
      />

      <div className="mb-8">
        <Card className="p-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patient-select">Выберите пациента</Label>
              <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                <SelectTrigger id="patient-select" className="w-full md:w-80">
                  <SelectValue placeholder="Выберите пациента" />
                </SelectTrigger>
                <SelectContent>
                  {samplePatients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name} ({patient.id}, {patient.age} л.)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedPatient && (
                <div className="text-sm text-muted-foreground mt-2">
                  Анализ будет выполнен для пациента: <span className="font-medium">{selectedPatient.name}</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <ImageUploader onImageUpload={handleImageUpload} />
        </div>
        
        <div>
          {analysisStatus === "idle" && (
            <div className="h-full flex items-center justify-center text-center p-8 bg-muted/30 rounded-lg border border-dashed">
              <div className="space-y-2">
                <h3 className="font-medium">Нет активного анализа</h3>
                <p className="text-sm text-muted-foreground">
                  Выберите пациента и загрузите изображение, чтобы начать процесс анализа
                </p>
              </div>
            </div>
          )}
          
          {analysisStatus === "processing" && (
            <div className="h-full flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg border border-dashed">
              <LoadingSpinner size="lg" className="mb-4" />
              <h3 className="font-medium">Обработка изображения</h3>
              <p className="text-sm text-muted-foreground mt-2">
                ИИ анализирует снимок сетчатки для {selectedPatient?.name}
              </p>
              <div className="w-full max-w-xs bg-muted rounded-full h-2 mt-4">
                <div className="bg-medical-400 h-2 rounded-full animate-pulse-medical" style={{ width: "70%" }}></div>
              </div>
            </div>
          )}
          
          {analysisStatus === "complete" && selectedPatient && currentDiagnosis && (
            <AnalysisResult
              patientName={selectedPatient.name}
              analysisDate={new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
              originalImage={placeholderRetina}
              heatmapImage={placeholderHeatmap}
              aiDiagnosis={currentDiagnosis.diagnosis}
              confidence={currentDiagnosis.confidence}
            />
          )}
        </div>
      </div>
    </div>
  );
}
