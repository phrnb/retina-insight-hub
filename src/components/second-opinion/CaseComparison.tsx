
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
        patientName: "William Brown",
        age: 69,
        gender: "Male",
        diagnosis: "Alzheimer's Disease (Early Stage)",
        findings: "Patient exhibits mild cognitive impairment, particularly in short-term memory. MRI shows early hippocampal atrophy typical of Alzheimer's disease. Mini-Mental State Examination score: 24/30. Self-reported difficulty with complex tasks and occasional disorientation.",
        treatment: "Donepezil 5mg daily, cognitive behavioral therapy, memory exercises.",
        outcome: "Pending follow-up in 3 months. Initial response to treatment shows slight improvement in daily function.",
        scanImages: [
          "https://placehold.co/600x400?text=MRI+Scan+1",
          "https://placehold.co/600x400?text=MRI+Scan+2"
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
        patientName: "John Smith",
        age: 72,
        gender: "Male",
        diagnosis: "Alzheimer's Disease (Early Stage)",
        findings: "Patient presents with mild memory impairment and occasional confusion. MRI shows early hippocampal atrophy and mild ventricular enlargement. Mini-Mental State Examination score: 25/30. Family reports patient has difficulty managing finances and occasionally gets lost in familiar places.",
        treatment: "Donepezil 5mg daily, increased to 10mg after 4 weeks. Weekly cognitive stimulation therapy.",
        outcome: "After 6 months, stabilization of cognitive function with MMSE maintained at 24/30. Patient reports improved confidence in daily activities.",
        scanImages: [
          "https://placehold.co/600x400?text=Comparison+MRI+1",
          "https://placehold.co/600x400?text=Comparison+MRI+2"
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
      title: "Treatment Plan Copied",
      description: "The selected treatment approach has been copied to the current case."
    });
  };
  
  if (!currentCaseId) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="h-12 w-12 text-muted-foreground opacity-30" />
        <h3 className="mt-4 text-lg font-medium">No current case selected</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Please select a case to begin comparison.
        </p>
      </div>
    );
  }
  
  if (!comparisonCaseId) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Brain className="h-12 w-12 text-muted-foreground opacity-30" />
        <h3 className="mt-4 text-lg font-medium">Second Opinion</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Select a similar case from the list to view comparison.
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
        <h3 className="text-lg font-medium">Case Comparison</h3>
        {tab === "findings" && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={adoptTreatment}
            disabled={!comparisonCase}
          >
            <Copy className="mr-2 h-4 w-4" />
            Adopt Treatment Approach
          </Button>
        )}
      </div>
      
      <Tabs value={tab} onValueChange={(value) => setTab(value as any)} className="mb-2">
        <TabsList>
          <TabsTrigger value="findings">
            <FileText className="h-4 w-4 mr-2" />
            Findings
          </TabsTrigger>
          <TabsTrigger value="images">
            <FileImage className="h-4 w-4 mr-2" />
            Images
          </TabsTrigger>
          <TabsTrigger value="outcomes">
            <ArrowRight className="h-4 w-4 mr-2" />
            Outcomes
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {tab === "findings" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h4 className="font-medium">Current Case</h4>
              <Badge className="ml-auto">Current</Badge>
            </div>
            
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium mb-1">Patient</h5>
                <p className="text-sm">
                  {currentCase?.patientName}, {currentCase?.age} years, {currentCase?.gender}
                </p>
              </div>
              
              <div>
                <h5 className="text-sm font-medium mb-1">Diagnosis</h5>
                <p className="text-sm">{currentCase?.diagnosis}</p>
              </div>
              
              <div>
                <h5 className="text-sm font-medium mb-1">Clinical Findings</h5>
                <p className="text-sm">{currentCase?.findings}</p>
              </div>
              
              <div>
                <h5 className="text-sm font-medium mb-1">Treatment Plan</h5>
                <p className="text-sm">{currentCase?.treatment}</p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h4 className="font-medium">Comparison Case</h4>
              <Badge variant="outline" className="ml-auto">Similar</Badge>
            </div>
            
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium mb-1">Patient</h5>
                <p className="text-sm">
                  {comparisonCase?.patientName}, {comparisonCase?.age} years, {comparisonCase?.gender}
                </p>
              </div>
              
              <div>
                <h5 className="text-sm font-medium mb-1">Diagnosis</h5>
                <p className="text-sm">{comparisonCase?.diagnosis}</p>
              </div>
              
              <div>
                <h5 className="text-sm font-medium mb-1">Clinical Findings</h5>
                <p className="text-sm">{comparisonCase?.findings}</p>
              </div>
              
              <div>
                <h5 className="text-sm font-medium mb-1">Treatment Plan</h5>
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
            <h4 className="font-medium mb-3">Current Case Images</h4>
            <div className="space-y-4">
              {currentCase?.scanImages.map((img, idx) => (
                <div key={idx} className="border rounded-md overflow-hidden">
                  <img src={img} alt={`Scan ${idx + 1}`} className="w-full h-auto" />
                  <div className="p-2 bg-muted/30">
                    <p className="text-xs text-center">Scan {idx + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Comparison Case Images</h4>
            <div className="space-y-4">
              {comparisonCase?.scanImages.map((img, idx) => (
                <div key={idx} className="border rounded-md overflow-hidden">
                  <img src={img} alt={`Comparison Scan ${idx + 1}`} className="w-full h-auto" />
                  <div className="p-2 bg-muted/30">
                    <p className="text-xs text-center">Scan {idx + 1}</p>
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
            <h4 className="font-medium mb-3">Current Case</h4>
            <div className="p-4 border rounded-md">
              <h5 className="text-sm font-medium mb-2">Expected Outcome</h5>
              <p className="text-sm">{currentCase?.outcome}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Comparison Case</h4>
            <div className="p-4 border rounded-md">
              <h5 className="text-sm font-medium mb-2">Documented Outcome</h5>
              <p className="text-sm">{comparisonCase?.outcome}</p>
              
              <div className="mt-4 p-3 bg-primary/5 rounded-md border border-primary/20">
                <h6 className="text-xs font-medium mb-1">Outcome Relevance</h6>
                <p className="text-xs">
                  This patient had a similar presentation and treatment approach.
                  The documented outcome suggests a likely stabilization of symptoms
                  with the current treatment plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
