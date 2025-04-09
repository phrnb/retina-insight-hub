
import { useState } from "react";
import { Eye, EyeOff, Save, Download, Share2, FileEdit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface AnalysisResultProps {
  patientName: string;
  analysisDate: string;
  originalImage: string;
  heatmapImage: string;
  aiDiagnosis: string;
  confidence: number;
}

export function AnalysisResult({
  patientName,
  analysisDate,
  originalImage,
  heatmapImage,
  aiDiagnosis,
  confidence,
}: AnalysisResultProps) {
  const { toast } = useToast();
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [doctorNotes, setDoctorNotes] = useState("");
  const [finalDiagnosis, setFinalDiagnosis] = useState(aiDiagnosis);

  const handleSave = () => {
    setEditMode(false);
    toast({
      title: "Diagnosis saved",
      description: "Your changes have been saved successfully."
    });
  };

  const handleExport = () => {
    toast({
      title: "Report exported",
      description: "Diagnostic report has been exported as PDF."
    });
  };

  const handleShare = () => {
    toast({
      title: "Share options",
      description: "Sharing functionality will be available in the next version."
    });
  };

  const getConfidenceColor = () => {
    if (confidence >= 90) return "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400";
    if (confidence >= 75) return "text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400";
    return "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>Patient: {patientName} • {analysisDate}</CardDescription>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getConfidenceColor()}`}>
            {confidence}% Confidence
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Retinal Image</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHeatmap(!showHeatmap)}
            >
              {showHeatmap ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Hide Overlay
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Show Overlay
                </>
              )}
            </Button>
          </div>
          
          <div className="aspect-video relative overflow-hidden rounded-lg border bg-muted">
            <img
              src={originalImage}
              alt="Retinal scan"
              className="object-contain w-full h-full"
            />
            {showHeatmap && (
              <div className="heatmap-overlay">
                <img
                  src={heatmapImage}
                  alt="AI analysis heatmap"
                  className="object-contain w-full h-full"
                />
              </div>
            )}
          </div>
        </div>

        <Tabs defaultValue="diagnosis" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
            <TabsTrigger value="notes">Doctor's Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="diagnosis" className="space-y-4">
            <div className="space-y-2 mt-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">AI-Generated Diagnosis</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                  onClick={() => setEditMode(!editMode)}
                >
                  <FileEdit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
              
              {editMode ? (
                <div className="space-y-4">
                  <Textarea
                    value={finalDiagnosis}
                    onChange={(e) => setFinalDiagnosis(e.target.value)}
                    className="min-h-[150px]"
                  />
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setEditMode(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-muted/50 p-4 rounded-md whitespace-pre-line">
                  {finalDiagnosis}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="notes" className="space-y-4">
            <div className="space-y-2 mt-3">
              <h3 className="font-medium">Clinical Notes</h3>
              <Textarea
                placeholder="Add your clinical notes here..."
                value={doctorNotes}
                onChange={(e) => setDoctorNotes(e.target.value)}
                className="min-h-[150px]"
              />
              <Button onClick={handleSave} className="mt-2">
                <Save className="mr-2 h-4 w-4" />
                Save Notes
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </CardFooter>
    </Card>
  );
}
