
import { useState, useEffect } from "react";
import { Calendar, Clock, User, FileEdit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface ReportVersion {
  id: string;
  version: number;
  date: string;
  author: string;
  changeDescription: string;
  isCurrent: boolean;
}

interface ReportVersionTimelineProps {
  reportId?: string;
  onVersionSelect: (versionIds: string[]) => void;
}

export function ReportVersionTimeline({ reportId, onVersionSelect }: ReportVersionTimelineProps) {
  const [versions, setVersions] = useState<ReportVersion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  
  useEffect(() => {
    // Simulate loading report versions
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      const mockVersions = [
        {
          id: "v5",
          version: 5,
          date: "2025-04-10T14:30:00",
          author: "Dr. Sarah Johnson",
          changeDescription: "Final diagnosis after confirming with MRI results",
          isCurrent: true
        },
        {
          id: "v4",
          version: 4,
          date: "2025-04-08T11:15:00",
          author: "Dr. Sarah Johnson",
          changeDescription: "Updated treatment plan based on patient response",
          isCurrent: false
        },
        {
          id: "v3",
          version: 3,
          date: "2025-04-05T09:45:00",
          author: "Dr. David Miller",
          changeDescription: "Added detailed neurological assessment notes",
          isCurrent: false
        },
        {
          id: "v2",
          version: 2,
          date: "2025-03-30T16:20:00",
          author: "Dr. Sarah Johnson",
          changeDescription: "Preliminary diagnosis based on symptoms",
          isCurrent: false
        },
        {
          id: "v1",
          version: 1,
          date: "2025-03-28T10:00:00",
          author: "Dr. Sarah Johnson",
          changeDescription: "Initial report creation",
          isCurrent: false
        }
      ];
      
      setVersions(mockVersions);
      setIsLoading(false);
      
      // Auto-select the current version
      const currentVersion = mockVersions.find(v => v.isCurrent);
      if (currentVersion) {
        setSelectedVersions([currentVersion.id]);
        onVersionSelect([currentVersion.id]);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [reportId, onVersionSelect]);
  
  const handleVersionSelect = (versionId: string) => {
    // If already selected, remove it
    if (selectedVersions.includes(versionId)) {
      const newSelected = selectedVersions.filter(id => id !== versionId);
      setSelectedVersions(newSelected);
      onVersionSelect(newSelected);
      return;
    }
    
    // Maximum 2 versions can be selected for comparison
    if (selectedVersions.length >= 2) {
      const newSelected = [...selectedVersions.slice(1), versionId];
      setSelectedVersions(newSelected);
      onVersionSelect(newSelected);
    } else {
      const newSelected = [...selectedVersions, versionId];
      setSelectedVersions(newSelected);
      onVersionSelect(newSelected);
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Report Versions</h3>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Report Versions</h3>
        <p className="text-sm text-muted-foreground">
          {selectedVersions.length === 0 
            ? "Select version to view" 
            : selectedVersions.length === 1 
              ? "Select another version to compare" 
              : "Comparing 2 versions"}
        </p>
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 top-6 bottom-10 w-0.5 bg-muted"></div>
        
        {/* Version items */}
        <div className="space-y-6">
          {versions.map((version) => (
            <div key={version.id} className="flex items-start gap-4">
              <Button
                variant={selectedVersions.includes(version.id) ? "secondary" : "outline"}
                size="icon"
                className={`relative z-10 h-10 w-10 rounded-full ${
                  version.isCurrent ? "border-primary border-2" : ""
                }`}
                onClick={() => handleVersionSelect(version.id)}
              >
                <FileEdit className="h-5 w-5" />
              </Button>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">
                    Version {version.version}
                    {version.isCurrent && (
                      <Badge variant="outline" className="ml-2">
                        Current
                      </Badge>
                    )}
                  </h4>
                </div>
                
                <p className="text-sm">{version.changeDescription}</p>
                
                <div className="flex flex-wrap gap-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{version.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(version.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>
                      {new Date(version.date).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-xs h-7 ${
                    selectedVersions.includes(version.id) ? "opacity-100" : "opacity-0 hover:opacity-100"
                  }`}
                  onClick={() => handleVersionSelect(version.id)}
                >
                  {selectedVersions.includes(version.id) 
                    ? "Deselect" 
                    : "Select for comparison"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
