
import { useState, useEffect } from "react";
import { Diff, Eye, RotateCcw, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface ReportVersionComparisonProps {
  versionIds: string[];
}

interface ReportVersionData {
  id: string;
  version: number;
  date: string;
  content: {
    diagnosis: string;
    findings: string;
    recommendations: string;
  }
}

export function ReportVersionComparison({ versionIds }: ReportVersionComparisonProps) {
  const [versionData, setVersionData] = useState<ReportVersionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"side-by-side" | "unified">("side-by-side");
  const { toast } = useToast();
  
  useEffect(() => {
    // Reset state when version IDs change
    setIsLoading(true);
    
    // Simulate loading version data
    const timer = setTimeout(() => {
      const mockData: ReportVersionData[] = [
        {
          id: "v5",
          version: 5,
          date: "2025-04-10T14:30:00",
          content: {
            diagnosis: "Confirmed Parkinson's Disease (Stage 2)",
            findings: "MRI shows characteristic changes in substantia nigra. Patient exhibits resting tremor in right hand, bradykinesia, and mild rigidity.",
            recommendations: "Begin treatment with Levodopa 100mg three times daily. Physical therapy twice weekly. Follow-up in 1 month to assess medication response."
          }
        },
        {
          id: "v4",
          version: 4,
          date: "2025-04-08T11:15:00",
          content: {
            diagnosis: "Suspected Parkinson's Disease",
            findings: "Patient exhibits resting tremor in right hand, bradykinesia, and mild rigidity. Awaiting MRI confirmation.",
            recommendations: "Schedule MRI brain scan. Consider starting Levodopa if confirmed. Physical therapy evaluation recommended."
          }
        },
        {
          id: "v3",
          version: 3,
          date: "2025-04-05T09:45:00",
          content: {
            diagnosis: "Possible Parkinson's Disease vs. Essential Tremor",
            findings: "Patient reports progressive tremor in right hand for 6 months, worse at rest. Some slowness of movement noted.",
            recommendations: "Neurological consultation. Consider MRI and DaTscan."
          }
        },
        {
          id: "v2",
          version: 2,
          date: "2025-03-30T16:20:00",
          content: {
            diagnosis: "Tremor of unknown etiology",
            findings: "Patient presents with right hand tremor, duration approximately 6 months. No family history of movement disorders.",
            recommendations: "Monitor symptoms. Return if worsening. Basic blood work to rule out metabolic causes."
          }
        },
        {
          id: "v1",
          version: 1,
          date: "2025-03-28T10:00:00",
          content: {
            diagnosis: "Initial evaluation - movement disorder",
            findings: "Patient reports shaking in right hand. Otherwise neurological exam normal.",
            recommendations: "Basic blood work. Return for follow-up in 2 weeks."
          }
        }
      ];
      
      // Filter to only include the versions we want to compare
      const filteredData = mockData.filter(data => versionIds.includes(data.id));
      setVersionData(filteredData);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [versionIds]);
  
  const handleRestoreVersion = (versionId: string) => {
    toast({
      title: "Version Restored",
      description: `Report has been restored to version ${
        versionData.find(v => v.id === versionId)?.version || ""
      }`,
    });
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Version Comparison</h3>
          <Skeleton className="h-9 w-32" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4 space-y-4">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          
          <div className="border rounded-md p-4 space-y-4">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    );
  }
  
  if (versionData.length === 0) {
    return (
      <div className="text-center py-12">
        <History className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
        <h3 className="mt-4 text-lg font-medium">No versions selected</h3>
        <p className="text-sm text-muted-foreground">
          Please select at least one version to view.
        </p>
      </div>
    );
  }
  
  if (versionData.length === 1) {
    // Only one version selected - show it without comparison
    const version = versionData[0];
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Version {version.version}</h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleRestoreVersion(version.id)}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Restore this version
          </Button>
        </div>
        
        <div className="border rounded-md p-4 space-y-4">
          <div>
            <h4 className="font-medium mb-2">Diagnosis</h4>
            <p>{version.content.diagnosis}</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Findings</h4>
            <p>{version.content.findings}</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Recommendations</h4>
            <p>{version.content.recommendations}</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Two versions selected - show comparison
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h3 className="text-lg font-medium">Version Comparison</h3>
        
        <div className="flex items-center gap-2">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
            <TabsList>
              <TabsTrigger value="side-by-side" className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>Side by side</span>
              </TabsTrigger>
              <TabsTrigger value="unified" className="flex items-center gap-1">
                <Diff className="h-4 w-4" />
                <span>Unified</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {viewMode === "side-by-side" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {versionData.map((version) => (
            <div key={version.id} className="border rounded-md p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Version {version.version}</h4>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleRestoreVersion(version.id)}
                >
                  <RotateCcw className="mr-1 h-3 w-3" />
                  Restore
                </Button>
              </div>
              
              <div>
                <h5 className="font-medium text-sm mb-1">Diagnosis</h5>
                <p className="text-sm">{version.content.diagnosis}</p>
              </div>
              
              <div>
                <h5 className="font-medium text-sm mb-1">Findings</h5>
                <p className="text-sm">{version.content.findings}</p>
              </div>
              
              <div>
                <h5 className="font-medium text-sm mb-1">Recommendations</h5>
                <p className="text-sm">{version.content.recommendations}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border rounded-md p-4 space-y-6">
          <div>
            <h4 className="font-medium mb-3">Diagnosis</h4>
            <div className="space-y-2">
              {versionData.map((version) => (
                <div key={version.id} className="p-2 rounded border">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium">Version {version.version}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(version.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">{version.content.diagnosis}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Findings</h4>
            <div className="space-y-2">
              {versionData.map((version) => (
                <div key={version.id} className="p-2 rounded border">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium">Version {version.version}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(version.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">{version.content.findings}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Recommendations</h4>
            <div className="space-y-2">
              {versionData.map((version) => (
                <div key={version.id} className="p-2 rounded border">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium">Version {version.version}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(version.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">{version.content.recommendations}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
