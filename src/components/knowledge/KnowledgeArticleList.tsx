
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KnowledgeArticleCard } from "./KnowledgeArticleCard";
import { Skeleton } from "@/components/ui/skeleton";

interface KnowledgeArticleListProps {
  category: string;
}

export function KnowledgeArticleList({ category }: KnowledgeArticleListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState<any[]>([]);
  
  useEffect(() => {
    // Simulate loading articles based on selected category
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      const mockArticles = [
        {
          id: "1",
          title: "Understanding MRI in Neurological Diagnosis",
          excerpt: "A comprehensive guide to interpreting MRI scans for neurological conditions.",
          imageUrl: "https://placehold.co/600x400?text=MRI+Guide",
          category: "imaging",
          tags: ["MRI", "Diagnosis", "Tutorial"],
          date: "2025-03-15",
          readTime: "8 min",
          type: "article"
        },
        {
          id: "2",
          title: "Early Indicators of Alzheimer's Disease",
          excerpt: "Learn to identify the early signs of Alzheimer's through brain imaging and cognitive tests.",
          imageUrl: "https://placehold.co/600x400?text=Alzheimers",
          category: "alzheimers",
          tags: ["Alzheimer's", "Early Detection", "Cognitive Decline"],
          date: "2025-04-02",
          readTime: "12 min",
          type: "article"
        },
        {
          id: "3",
          title: "Parkinson's Disease: The Role of Dopamine",
          excerpt: "Explore how dopamine deficiency affects brain function in Parkinson's disease patients.",
          imageUrl: "https://placehold.co/600x400?text=Parkinsons",
          category: "parkinsons",
          tags: ["Parkinson's", "Dopamine", "Neurotransmitters"],
          date: "2025-03-28",
          readTime: "10 min",
          type: "video"
        },
        {
          id: "4",
          title: "Post-Stroke Rehabilitation Protocols",
          excerpt: "Evidence-based rehabilitation strategies for improved outcomes after stroke.",
          imageUrl: "https://placehold.co/600x400?text=Stroke+Rehab",
          category: "stroke",
          tags: ["Stroke", "Rehabilitation", "Recovery"],
          date: "2025-04-05",
          readTime: "15 min",
          type: "protocol"
        },
        {
          id: "5",
          title: "Epilepsy: Classification and Treatment",
          excerpt: "A guide to recognizing different types of seizures and appropriate interventions.",
          imageUrl: "https://placehold.co/600x400?text=Epilepsy",
          category: "epilepsy",
          tags: ["Epilepsy", "Seizures", "Treatment"],
          date: "2025-03-10",
          readTime: "9 min",
          type: "article"
        },
      ];
      
      const filtered = category === "all" 
        ? mockArticles 
        : mockArticles.filter(article => article.category === category);
        
      setArticles(filtered);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [category]);
  
  // Filter by search term
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search articles..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs value={viewType} onValueChange={(value) => setViewType(value as "grid" | "list")}>
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {isLoading ? (
        viewType === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border rounded-md p-4">
                <Skeleton className="h-40 w-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="border rounded-md p-4 flex">
                <Skeleton className="h-24 w-24 mr-4" />
                <div className="flex-1">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
          <h3 className="mt-4 text-lg font-medium">No articles found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className={viewType === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4" 
          : "space-y-4 mt-4"
        }>
          {filteredArticles.map((article) => (
            <KnowledgeArticleCard
              key={article.id}
              article={article}
              viewType={viewType}
            />
          ))}
        </div>
      )}
    </div>
  );
}
