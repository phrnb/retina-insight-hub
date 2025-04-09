
import { Activity, FileImage, Users, Clock } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { PatientCard } from "@/components/dashboard/PatientCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Mock data
const patients = [
  {
    id: "p1",
    name: "John Doe",
    age: 68,
    lastScan: "Today",
    status: "complete" as const,
    diagnosis: "Diabetic Retinopathy (Moderate) • NPDR Stage 3 • DME Present"
  },
  {
    id: "p2",
    name: "Emma Wilson",
    age: 72,
    lastScan: "Yesterday",
    status: "complete" as const,
    diagnosis: "Age-related Macular Degeneration • Dry AMD • Geographic Atrophy"
  },
  {
    id: "p3",
    name: "Michael Brown",
    age: 56,
    lastScan: "2 days ago",
    status: "pending" as const
  },
  {
    id: "p4",
    name: "Sarah Johnson",
    age: 64,
    lastScan: "3 days ago",
    status: "error" as const
  }
];

const recentActivities = [
  {
    id: "a1",
    type: "diagnosis" as const,
    description: "Completed diagnosis for John Doe",
    timestamp: "10 minutes ago"
  },
  {
    id: "a2",
    type: "upload" as const,
    description: "Uploaded new scan for Michael Brown",
    timestamp: "2 hours ago"
  },
  {
    id: "a3",
    type: "report" as const,
    description: "Generated report for Emma Wilson",
    timestamp: "Yesterday"
  },
  {
    id: "a4",
    type: "patient" as const,
    description: "Added new patient Sarah Johnson",
    timestamp: "3 days ago"
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  
  return (
    <div>
      <PageHeader 
        title="Dashboard" 
        description="Welcome back, Dr. Smith"
        helpContent="This dashboard provides an overview of your recent patients, scans, and activity. Click on any patient card to view their details."
      >
        <Button onClick={() => navigate("/analysis")}>New Analysis</Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Patients"
          value="254"
          icon={<Users className="h-5 w-5" />}
          description="Last 30 days"
          trend={{ value: 12, isPositive: true }}
          helpContent="Total number of unique patients in your care during the last 30 days."
        />
        <StatCard
          title="Analyses Performed"
          value="138"
          icon={<FileImage className="h-5 w-5" />}
          description="Last 30 days"
          trend={{ value: 8, isPositive: true }}
          helpContent="Total number of image analyses performed in the last 30 days."
        />
        <StatCard
          title="Analyses This Week"
          value="42"
          icon={<Activity className="h-5 w-5" />}
          description="7% increase"
          helpContent="Number of analyses performed in the current week."
        />
        <StatCard
          title="Avg Processing Time"
          value="4.2s"
          icon={<Clock className="h-5 w-5" />}
          description="0.3s improvement"
          trend={{ value: 7, isPositive: true }}
          helpContent="Average time to process an image and return analysis results."
        />
      </div>

      <h2 className="text-xl font-medium mb-4">Recent Patients</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {patients.map((patient) => (
          <PatientCard
            key={patient.id}
            id={patient.id}
            name={patient.name}
            age={patient.age}
            lastScan={patient.lastScan}
            status={patient.status}
            diagnosis={patient.diagnosis}
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <RecentActivity activities={recentActivities} />
      </div>
    </div>
  );
}
