import { Activity, FileImage, Users, Clock, Zap, BrainCircuit, ArrowUpRight, Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { PatientCard } from "@/components/dashboard/PatientCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { DateRangeTabs } from "@/components/dashboard/DateRangeTabs";
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
    diagnosis: "Glaucoma • Advanced • Under treatment"
  },
  {
    id: "p2",
    name: "Emma Wilson",
    age: 72,
    lastScan: "Yesterday",
    status: "complete" as const,
    diagnosis: "Diabetic Retinopathy • Mild NPDR • Monitoring"
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
    description: "Uploaded new fundus image for Michael Brown",
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

// Chart data
const diagnosisDistribution = [
  { name: "Glaucoma", value: 35 },
  { name: "Diabetic Retinopathy", value: 28 },
  { name: "AMD", value: 22 },
  { name: "Cataract", value: 15 },
];

const weeklyScans = [
  { day: "Mon", scans: 12 },
  { day: "Tue", scans: 19 },
  { day: "Wed", scans: 15 },
  { day: "Thu", scans: 22 },
  { day: "Fri", scans: 18 },
  { day: "Sat", scans: 8 },
  { day: "Sun", scans: 5 },
];

const monthlyAnalytics = [
  { month: "Jan", completed: 65, pending: 12 },
  { month: "Feb", completed: 72, pending: 8 },
  { month: "Mar", completed: 85, pending: 10 },
  { month: "Apr", completed: 92, pending: 6 },
];

const accuracyTrend = [
  { month: "Jan", accuracy: 88 },
  { month: "Feb", accuracy: 90 },
  { month: "Mar", accuracy: 93 },
  { month: "Apr", accuracy: 95 },
];

const COLORS = ['#6E59A5', '#9b87f5', '#D3E4FD', '#E5DEFF'];

export default function Dashboard() {
  const navigate = useNavigate();
  
  return (
    <div>
      <PageHeader 
        title="Панель управления" 
        description="Добро пожаловать, Доктор Смирнов"
        helpContent="Эта панель управления предоставляет обзор ваших последних пациентов, сканов и активности в системе NeuroView."
      >
        <Button onClick={() => navigate("/analysis")}>Новый анализ</Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Всего пациентов"
          value="254"
          icon={<Users className="h-5 w-5" />}
          description="За последние 30 дней"
          trend={{ value: 12, isPositive: true }}
          helpContent="Общее количество уникальных пациентов под вашим наблюдением за последние 30 дней."
        />
        <StatCard
          title="Сканов проанализировано"
          value="138"
          icon={<Eye className="h-5 w-5" />}
          description="За последние 30 дней"
          trend={{ value: 8, isPositive: true }}
          helpContent="Общее количество анализов сканов глаз, выполненных за последние 30 дней."
        />
        <StatCard
          title="Анализов на этой неделе"
          value="42"
          icon={<Activity className="h-5 w-5" />}
          description="Рост на 7%"
          helpContent="Количество анализов, выполненных на текущей неделе."
        />
        <StatCard
          title="Среднее время обработки"
          value="4.2с"
          icon={<Zap className="h-5 w-5" />}
          description="Улучшение на 0.3с"
          trend={{ value: 7, isPositive: true }}
          helpContent="Среднее время обработки скана глаза и возврата результатов анализа."
        />
      </div>

      <div className="mb-8">
        <DateRangeTabs />
      </div>

      <h2 className="text-xl font-medium mb-4">Последние пациенты</h2>
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
