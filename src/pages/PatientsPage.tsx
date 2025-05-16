
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/common/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatientFilters } from "@/components/patient/PatientFilters";
import { PatientTable } from "@/components/patient/PatientTable";
import { PatientStats } from "@/components/patient/PatientStats";
import { Button } from "@/components/ui/button";

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
  const [patients, setPatients] = useState(samplePatients);
  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [activeTab, setActiveTab] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  const handlePatientAdded = (patient: any) => {
    const updatedPatients = [...patients, patient];
    setPatients(updatedPatients);
    setFilteredPatients(updatedPatients);
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
      
      <PatientFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        onPatientAdded={handlePatientAdded}
      />

      <Tabs defaultValue="all" onValueChange={setActiveTab} className="mb-4">
        <TabsList>
          <TabsTrigger value="all">All Patients</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
          <TabsTrigger value="stable">Stable</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>
      </Tabs>

      <PatientTable
        patients={filteredPatients}
        getStatusBadge={getStatusBadge}
      />
      
      <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
        <div>Showing {filteredPatients.length} of {patients.length} patients</div>
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

      <PatientStats />
    </div>
  );
}
