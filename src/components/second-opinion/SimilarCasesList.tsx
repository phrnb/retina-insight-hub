
import { useState, useEffect } from "react";
import { Search, ArrowUpDown, Brain } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SimilarCase {
  id: string;
  patientId: string;
  patientName: string;
  diagnosis: string;
  similarity: number;
  date: string;
  age: number;
  gender: string;
}

interface SimilarCasesListProps {
  currentCaseId?: string;
  onCaseSelect: (caseId: string | null) => void;
}

export function SimilarCasesList({ currentCaseId, onCaseSelect }: SimilarCasesListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"similarity" | "date">("similarity");
  const [cases, setCases] = useState<SimilarCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate loading similar cases
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      const mockCases: SimilarCase[] = [
        {
          id: "case1",
          patientId: "P12345",
          patientName: "John Smith",
          diagnosis: "Alzheimer's Disease (Early Stage)",
          similarity: 96,
          date: "2025-03-15",
          age: 72,
          gender: "Male"
        },
        {
          id: "case2",
          patientId: "P23456",
          patientName: "Maria Garcia",
          diagnosis: "Alzheimer's Disease with vascular components",
          similarity: 89,
          date: "2025-02-28",
          age: 68,
          gender: "Female"
        },
        {
          id: "case3",
          patientId: "P34567",
          patientName: "Robert Johnson",
          diagnosis: "Early Onset Alzheimer's",
          similarity: 84,
          date: "2025-01-20",
          age: 61,
          gender: "Male"
        },
        {
          id: "case4",
          patientId: "P45678",
          patientName: "Emily Chen",
          diagnosis: "Alzheimer's Disease (Moderate)",
          similarity: 78,
          date: "2025-03-01",
          age: 74,
          gender: "Female"
        },
        {
          id: "case5",
          patientId: "P56789",
          patientName: "David Wilson",
          diagnosis: "Alzheimer's with Parkinsonism",
          similarity: 72,
          date: "2025-02-10",
          age: 70,
          gender: "Male"
        }
      ];
      
      setCases(mockCases);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [currentCaseId]);
  
  const handleCaseSelect = (caseId: string) => {
    if (selectedCaseId === caseId) {
      setSelectedCaseId(null);
      onCaseSelect(null);
    } else {
      setSelectedCaseId(caseId);
      onCaseSelect(caseId);
    }
  };
  
  const sortedCases = [...cases].sort((a, b) => {
    if (sortBy === "similarity") {
      return b.similarity - a.similarity;
    } else {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });
  
  const filteredCases = sortedCases.filter(c => 
    c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Similar Cases</h3>
      
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search cases..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {filteredCases.length} cases found
          </p>
          
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
            <SelectTrigger className="w-40 h-8 text-xs">
              <div className="flex items-center gap-1">
                <ArrowUpDown className="h-3 w-3" />
                <span>Sort by: <SelectValue /></span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="similarity">Similarity</SelectItem>
              <SelectItem value="date">Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="border rounded-md p-3">
              <div className="flex justify-between items-start mb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-12" />
              </div>
              <Skeleton className="h-3 w-40 mb-1" />
              <Skeleton className="h-3 w-32 mb-2" />
              <Skeleton className="h-2 w-24" />
            </div>
          ))}
        </div>
      ) : filteredCases.length === 0 ? (
        <div className="text-center py-8">
          <Brain className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
          <h3 className="mt-3 text-sm font-medium">No similar cases found</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Try adjusting your search criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-3 mt-1">
          {filteredCases.map((case_) => (
            <Button
              key={case_.id}
              variant="outline"
              className={`w-full p-3 h-auto justify-start flex-col items-start ${
                selectedCaseId === case_.id ? "border-primary bg-primary/5" : ""
              }`}
              onClick={() => handleCaseSelect(case_.id)}
            >
              <div className="flex justify-between items-start w-full mb-1">
                <div className="font-medium text-sm">{case_.patientName}</div>
                <Badge variant={selectedCaseId === case_.id ? "default" : "secondary"} className="ml-auto">
                  {case_.similarity}% match
                </Badge>
              </div>
              <p className="text-xs text-left mb-1">{case_.diagnosis}</p>
              <div className="flex gap-2 text-xs text-muted-foreground">
                <span>ID: {case_.patientId}</span>
                <span>•</span>
                <span>{new Date(case_.date).toLocaleDateString()}</span>
              </div>
              <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                <span>Age: {case_.age}</span>
                <span>•</span>
                <span>Gender: {case_.gender}</span>
              </div>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
