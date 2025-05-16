
import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { SimilarCasesList } from "@/components/second-opinion/SimilarCasesList";
import { CaseComparison } from "@/components/second-opinion/CaseComparison";
import { Card, CardContent } from "@/components/ui/card";

export default function SecondOpinionPage() {
  const { caseId } = useParams<{ caseId: string }>();
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  
  return (
    <div className="space-y-4">
      <PageHeader 
        title="Второе мнение" 
        description="ИИ-анализ похожих клинических случаев"
        helpContent="Эта страница показывает случаи с аналогичными паттернами для помощи в проверке диагноза."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <CardContent className="p-4">
            <SimilarCasesList 
              currentCaseId={caseId} 
              onCaseSelect={setSelectedCaseId} 
            />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <CaseComparison 
              currentCaseId={caseId} 
              comparisonCaseId={selectedCaseId} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
