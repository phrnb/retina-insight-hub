
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PatientActions } from "./PatientActions";

interface Patient {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  diagnosis: string;
  status: string;
}

interface PatientTableProps {
  patients: Patient[];
  getStatusBadge: (status: string) => JSX.Element;
}

export function PatientTable({ patients, getStatusBadge }: PatientTableProps) {
  return (
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
          {patients.length > 0 ? (
            patients.map((patient) => (
              <TableRow key={patient.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
                <TableCell>{patient.diagnosis}</TableCell>
                <TableCell>{getStatusBadge(patient.status)}</TableCell>
                <TableCell className="text-right">
                  <PatientActions patientId={patient.id} />
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
  );
}
