
import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { ReportVersionTimeline } from "@/components/reports/ReportVersionTimeline";
import { ReportVersionComparison } from "@/components/reports/ReportVersionComparison";
import { Card, CardContent } from "@/components/ui/card";

export default function ReportHistoryPage() {
  const { reportId } = useParams<{ reportId: string }>();
  const [selectedVersionIds, setSelectedVersionIds] = useState<string[]>([]);
  
  return (
    <div className="space-y-4">
      <PageHeader 
        title="Report History" 
        description={`Version history for Report #${reportId || 'Unknown'}`}
        helpContent="View and compare different versions of this report over time."
      />
      
      <Card>
        <CardContent className="p-6">
          <ReportVersionTimeline 
            reportId={reportId} 
            onVersionSelect={(versionIds) => setSelectedVersionIds(versionIds)} 
          />
        </CardContent>
      </Card>
      
      {selectedVersionIds.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <ReportVersionComparison versionIds={selectedVersionIds} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
