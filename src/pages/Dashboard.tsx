
import { Activity, FileImage, Users, Clock, Zap, BrainCircuit, ArrowUpRight, Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { PatientCard } from "@/components/dashboard/PatientCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContextualHelp } from "@/components/common/ContextualHelp";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from "recharts";

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
        title="Dashboard" 
        description="Welcome back, Dr. Smith"
        helpContent="This dashboard provides an overview of your recent patients, scans, and activities in the EyeView system."
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
          title="Eye Scans Analyzed"
          value="138"
          icon={<Eye className="h-5 w-5" />}
          description="Last 30 days"
          trend={{ value: 8, isPositive: true }}
          helpContent="Total number of eye scan analyses performed in the last 30 days."
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
          icon={<Zap className="h-5 w-5" />}
          description="0.3s improvement"
          trend={{ value: 7, isPositive: true }}
          helpContent="Average time to process an eye scan and return analysis results."
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium">
              Weekly Scan Analysis
            </CardTitle>
            <ContextualHelp 
              title="Weekly Analysis"
              content="This chart shows the number of eye scans analyzed each day of the current week."
            />
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyScans}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded p-2 shadow">
                            <p className="font-medium">{`${payload[0].payload.day}: ${payload[0].value} scans`}</p>
                          </div>
                        );
                      }
                      return null;
                    }} 
                  />
                  <Bar dataKey="scans" fill="#6E59A5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium">
              Diagnosis Distribution
            </CardTitle>
            <ContextualHelp 
              title="Diagnosis Distribution"
              content="Distribution of diagnoses across all patients in the current month."
            />
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={diagnosisDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {diagnosisDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded p-2 shadow">
                            <p className="font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
                          </div>
                        );
                      }
                      return null;
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {diagnosisDistribution.map((item, index) => (
                  <div key={item.name} className="flex items-center text-xs">
                    <div 
                      className="w-3 h-3 mr-1 rounded-sm" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium">
              Monthly Analytics
            </CardTitle>
            <ContextualHelp 
              title="Monthly Analytics"
              content="Comparison of completed vs pending analyses over recent months."
            />
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded p-2 shadow">
                            <p className="font-medium">{payload[0].payload.month}</p>
                            <p className="text-sm text-primary">Completed: {payload[0].value}</p>
                            <p className="text-sm text-muted-foreground">Pending: {payload[1].value}</p>
                          </div>
                        );
                      }
                      return null;
                    }} 
                  />
                  <Area type="monotone" dataKey="completed" stroke="#6E59A5" fill="#9b87f5" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="pending" stroke="#E5DEFF" fill="#E5DEFF" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 mr-1 rounded-sm bg-primary" />
                <span>Completed</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 mr-1 rounded-sm bg-muted" />
                <span>Pending</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium">
              Diagnostic Accuracy Trend
            </CardTitle>
            <ContextualHelp 
              title="Accuracy Trend"
              content="Trend of diagnostic accuracy over recent months."
            />
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={accuracyTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded p-2 shadow">
                            <p className="font-medium">{payload[0].payload.month}</p>
                            <p className="text-sm">{`Accuracy: ${payload[0].value}%`}</p>
                          </div>
                        );
                      }
                      return null;
                    }} 
                  />
                  <Line type="monotone" dataKey="accuracy" stroke="#6E59A5" strokeWidth={2} dot={{ fill: "#6E59A5" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
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
