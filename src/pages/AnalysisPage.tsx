
import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { ImageUploader } from "@/components/analysis/ImageUploader";
import { AnalysisResult } from "@/components/analysis/AnalysisResult";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

// Placeholder images for demo
const placeholderRetina = "https://www.researchgate.net/publication/343321384/figure/fig1/AS:918275507351553@1595950741268/Diabetic-retinopathy-Color-fundus-photographs-show-A-mild-nonproliferative-diabetic.jpg";
const placeholderHeatmap = "https://www.researchgate.net/publication/343321384/figure/fig2/AS:918275507351555@1595950741310/Heat-maps-showing-areas-of-interest-attention-of-the-CNN-for-classification-of-nonproli.jpg";

export default function AnalysisPage() {
  const { toast } = useToast();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [analysisStatus, setAnalysisStatus] = useState<"idle" | "processing" | "complete">("idle");
  
  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
    setAnalysisStatus("processing");
    
    // Simulate AI processing time
    setTimeout(() => {
      setAnalysisStatus("complete");
      toast({
        title: "Analysis complete",
        description: "AI diagnostic analysis has been completed successfully."
      });
    }, 3000);
  };

  return (
    <div>
      <PageHeader
        title="Image Analysis"
        description="Upload and analyze retinal images with AI-assistance"
        helpContent="Upload a high-quality retinal image to receive AI-assisted diagnostic analysis. The system supports fundus, OCT, and other retinal imaging formats."
      />

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <ImageUploader onImageUpload={handleImageUpload} />
        </div>
        
        <div>
          {analysisStatus === "idle" && (
            <div className="h-full flex items-center justify-center text-center p-8 bg-muted/30 rounded-lg border border-dashed">
              <div className="space-y-2">
                <h3 className="font-medium">No Active Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Upload an image to start the analysis process
                </p>
              </div>
            </div>
          )}
          
          {analysisStatus === "processing" && (
            <div className="h-full flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg border border-dashed">
              <LoadingSpinner size="lg" className="mb-4" />
              <h3 className="font-medium">Processing Image</h3>
              <p className="text-sm text-muted-foreground mt-2">
                The AI is analyzing the retinal image
              </p>
              <div className="w-full max-w-xs bg-muted rounded-full h-2 mt-4">
                <div className="bg-medical-400 h-2 rounded-full animate-pulse-medical" style={{ width: "70%" }}></div>
              </div>
            </div>
          )}
          
          {analysisStatus === "complete" && (
            <AnalysisResult
              patientName="John Doe"
              analysisDate="April 8, 2025"
              originalImage={placeholderRetina}
              heatmapImage={placeholderHeatmap}
              aiDiagnosis="Moderate Diabetic Retinopathy (NPDR Stage 3) with signs of Diabetic Macular Edema (DME). Multiple microaneurysms visible in the posterior pole. Several dot and blot hemorrhages present. Evidence of hard exudates in the macular region suggesting DME. No signs of neovascularization or vitreous hemorrhage. Recommend referral to retina specialist within 1-2 weeks."
              confidence={92}
            />
          )}
        </div>
      </div>
    </div>
  );
}
