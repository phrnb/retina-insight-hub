
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PatientStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Patient Demographics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/20 rounded-md flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Age distribution chart</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Diagnosis Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/20 rounded-md flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Diagnosis pie chart</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
