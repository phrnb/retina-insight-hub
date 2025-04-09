
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, UserPlus, Filter, FileText, Calendar, Brain } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { ContextualHelp } from "@/components/common/ContextualHelp";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample patient data
const samplePatients = [
  { id: "PN-2025-001", name: "John Doe", age: 67, lastVisit: "2025-04-02", diagnosis: "Multiple Sclerosis", status: "Stable" },
  { id: "PN-2025-002", name: "Sarah Miller", age: 54, lastVisit: "2025-04-01", diagnosis: "Alzheimer's Disease", status: "Deteriorating" },
  { id: "PN-2025-003", name: "Robert Johnson", age: 72, lastVisit: "2025-03-28", diagnosis: "Parkinson's Disease", status: "Stable" },
  { id: "PN-2025-004", name: "Emily Wilson", age: 45, lastVisit: "2025-03-25", diagnosis: "Epilepsy", status: "Improving" },
  { id: "PN-2025-005", name: "Michael Brown", age: 61, lastVisit: "2025-03-20", diagnosis: "Stroke Recovery", status: "Stable" },
  { id: "PN-2025-006", name: "Jennifer Davis", age: 58, lastVisit: "2025-03-18", diagnosis: "Brain Tumor", status: "Critical" },
  { id: "PN-2025-007", name: "David Thompson", age: 49, lastVisit: "2025-03-15", diagnosis: "Migraine", status: "Stable" },
  { id: "PN-2025-008", name: "Lisa Martinez", age: 63, lastVisit: "2025-03-12", diagnosis: "Dementia", status: "Deteriorating" },
];

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(samplePatients);
  const [activeTab, setActiveTab] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = samplePatients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Stable":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Stable</Badge>;
      case "Improving":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Improving</Badge>;
      case "Deteriorating":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Deteriorating</Badge>;
      case "Critical":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Critical</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Patient Management" 
        description="View and manage neurological patient records"
      />
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </form>
        
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>All Patients</DropdownMenuItem>
              <DropdownMenuItem>Recent Patients</DropdownMenuItem>
              <DropdownMenuItem>Critical Patients</DropdownMenuItem>
              <DropdownMenuItem>By Diagnosis</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="flex gap-2">
            <UserPlus className="h-4 w-4" />
            New Patient
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Neurological Patient List</span>
            <ContextualHelp
              title="Patient Management"
              content="View all patients, search by name or ID, and add new patient records. Click on a patient row to view their complete medical history and brain scans."
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setActiveTab} className="mb-4">
            <TabsList>
              <TabsTrigger value="all">All Patients</TabsTrigger>
              <TabsTrigger value="critical">Critical</TabsTrigger>
              <TabsTrigger value="stable">Stable</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <TableRow key={patient.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{patient.id}</TableCell>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.lastVisit}</TableCell>
                      <TableCell>{patient.diagnosis}</TableCell>
                      <TableCell>{getStatusBadge(patient.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Brain className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No patients found matching your search
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
            <div>Showing {filteredPatients.length} of {samplePatients.length} patients</div>
            <div className="flex items-center gap-4">
              <div>
                <span className="font-medium">Page</span> 1 of 1
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" disabled>&lt;</Button>
                <Button variant="outline" size="sm" disabled>&gt;</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
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
    </div>
  );
}
