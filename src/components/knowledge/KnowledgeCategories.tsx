
import { Eye, BookOpen, Search, FileText, BookmarkPlus, Activity, AlertTriangle, Microscope, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface KnowledgeCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", name: "All Resources", icon: BookOpen },
  { id: "glaucoma", name: "Glaucoma", icon: Eye },
  { id: "retinopathy", name: "Diabetic Retinopathy", icon: AlertTriangle },
  { id: "amd", name: "Age-Related Macular Degeneration", icon: Eye },
  { id: "cataract", name: "Cataract", icon: Eye },
  { id: "imaging", name: "Ocular Imaging Techniques", icon: Microscope },
  { id: "protocols", name: "Clinical Protocols", icon: FileText },
  { id: "research", name: "Latest Research", icon: Search },
  { id: "statistics", name: "Eye Disease Statistics", icon: BarChart },
  { id: "recent", name: "Recently Added", icon: BookmarkPlus },
];

export function KnowledgeCategories({ selectedCategory, onCategoryChange }: KnowledgeCategoriesProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Categories</h3>
      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-1">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onCategoryChange(category.id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {category.name}
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
