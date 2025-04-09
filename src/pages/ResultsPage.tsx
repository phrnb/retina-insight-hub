
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/common/PageHeader";
import { ContextualHelp } from "@/components/common/ContextualHelp";

// Sample analysis results data
const sampleResults = [
  {
    id: "RES-2025-001",
    patientId: "PT-2025-001",
    patientName: "John Doe",
    date: "2025-04-02",
    imageType: "Fundus",
    diagnosis: "Diabetic Retinopathy",
    confidence: 92,
    severity: "Moderate",
    status: "Reviewed"
  },
  {
    id: "RES-2025-002",
    patientId: "PT-2025-002",
    patientName: "Sarah Miller",
    date: "2025-04-01",
    imageType: "OCT",
    diagnosis: "Age-related Macular Degeneration",
    confidence: 89,
    severity: "Mild",
    status: "Pending Review"
  },
  {
    id: "RES-2025-003",
    patientId: "PT-2025-003",
    patientName: "Robert Johnson",
    date: "2025-03-28",
    imageType: "Fundus",
    diagnosis: "Glaucoma",
    confidence: 94,
    severity: "Severe",
    status: "Reviewed"
  }
];

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState("all");

  // Filter results based on active tab
  const filteredResults = activeTab === "all" 
    ? sampleResults 
    : sampleResults.filter(result => 
        activeTab === "pending" 
          ? result.status === "Pending Review" 
          : result.status === "Reviewed"
      );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Analysis Results" 
        description="View and manage AI analysis results" 
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Diagnostic Results</span>
            <ContextualHelp
              title="Analysis Results"
              content="View all diagnostic results from AI analysis. Filter by status, review pending results, and export finalized diagnoses."
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Results</TabsTrigger>
              <TabsTrigger value="pending">Pending Review</TabsTrigger>
              <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="space-y-4">
              {filteredResults.map((result) => (
                <Card key={result.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{result.patientName}</h3>
                          <Badge variant={result.status === "Reviewed" ? "outline" : "secondary"}>
                            {result.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          ID: {result.patientId} | {result.imageType} | {result.date}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <div className="text-right">
                          <Badge variant={
                            result.severity === "Severe" ? "destructive" : 
                            result.severity === "Moderate" ? "default" : 
                            "outline"
                          }>
                            {result.severity}
                          </Badge>
                          <p className="text-sm font-medium mt-1">{result.diagnosis}</p>
                          <p className="text-xs text-muted-foreground">
                            AI Confidence: {result.confidence}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredResults.length === 0 && (
                <div className="p-4 text-center text-muted-foreground border rounded-md">
                  No {activeTab === "all" ? "" : activeTab} results found
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
