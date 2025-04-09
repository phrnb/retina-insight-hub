
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, UserPlus, Filter } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { ContextualHelp } from "@/components/common/ContextualHelp";

// Sample patient data
const samplePatients = [
  { id: "PT-2025-001", name: "John Doe", age: 67, lastVisit: "2025-04-02", diagnosis: "Diabetic Retinopathy" },
  { id: "PT-2025-002", name: "Sarah Miller", age: 54, lastVisit: "2025-04-01", diagnosis: "Age-related Macular Degeneration" },
  { id: "PT-2025-003", name: "Robert Johnson", age: 72, lastVisit: "2025-03-28", diagnosis: "Glaucoma" },
  { id: "PT-2025-004", name: "Emily Wilson", age: 45, lastVisit: "2025-03-25", diagnosis: "Retinal Detachment" },
  { id: "PT-2025-005", name: "Michael Brown", age: 61, lastVisit: "2025-03-20", diagnosis: "Diabetic Retinopathy" },
];

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(samplePatients);

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

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Patient Management" 
        description="View and manage patient records"
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
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            New Patient
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Patient List</span>
            <ContextualHelp
              title="Patient Management"
              content="View all patients, search by name or ID, and add new patient records. Click on a patient row to view their complete medical history and retinal scans."
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Diagnosis</TableHead>
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
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No patients found matching your search
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
