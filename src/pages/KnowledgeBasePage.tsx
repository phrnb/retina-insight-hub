
import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { KnowledgeCategories } from "@/components/knowledge/KnowledgeCategories";
import { KnowledgeArticleList } from "@/components/knowledge/KnowledgeArticleList";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function KnowledgeBasePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  return (
    <div className="space-y-4">
      <PageHeader 
        title="Ophthalmology Knowledge Base" 
        description="Educational resources, articles and reference materials"
        helpContent="Browse articles, guides, and resources to learn more about different eye conditions, diagnostic methods, and treatment approaches."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-1">
          <CardContent className="p-4">
            <KnowledgeCategories 
              selectedCategory={selectedCategory} 
              onCategoryChange={setSelectedCategory} 
            />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardContent className="p-6">
            <KnowledgeArticleList category={selectedCategory} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
